"""Independent mini thinkScript interpreter (the subset our studies use).
Parses the emitted .ts text, evaluates it over a bar series with numpy and
rasterises plots the way thinkorswim draws them. Used to validate emission."""
import re, sys, json, os
import numpy as np
from PIL import Image

TOK = re.compile(r"""\s*(?:
    (?P<str>"[^"
]*")|
    (?P<num>\d+\.\d*|\.\d+|\d+)|
    (?P<id>[A-Za-z_][A-Za-z0-9_]*(?:\.[A-Za-z_][A-Za-z0-9_]*)?)|
    (?P<op><=|>=|==|!=|[-+*/()<>,;\[\]{}=!])
)""", re.X)


def tokenize(src):
    src = re.sub(r"#[^\n]*", "", src)
    out, i = [], 0
    while i < len(src):
        m = TOK.match(src, i)
        if not m:
            if src[i:].strip() == "": break
            raise SyntaxError(f"bad char at {i}: {src[i:i+30]!r}")
        i = m.end()
        kind = m.lastgroup
        out.append((kind, m.group(kind)))
    return out


class P:
    def __init__(s, toks): s.t, s.i = toks, 0
    def peek(s, k=0): return s.t[s.i + k] if s.i + k < len(s.t) else (None, None)
    def next(s): tok = s.t[s.i]; s.i += 1; return tok
    def expect(s, v):
        k, x = s.next()
        if x != v: raise SyntaxError(f"expected {v!r} got {x!r} near token {s.i}: {s.t[s.i-5:s.i+5]}")
    def accept(s, v):
        if s.peek()[1] == v: s.i += 1; return True
        return False

    # statements
    def program(s):
        stmts = []
        while s.peek()[0] is not None:
            stmts.append(s.stmt())
        return stmts

    def stmt(s):
        k, v = s.peek()
        if v == "declare":
            s.next(); s.next(); s.expect(";"); return ("declare",)
        if v == "input":
            s.next(); _, name = s.next(); s.expect("="); e = s.expr(); s.expect(";")
            return ("input", name, e)
        if v in ("def", "plot"):
            s.next(); _, name = s.next(); s.expect("="); e = s.expr(); s.expect(";")
            return (v, name, e)
        if v == "script":
            s.next(); _, name = s.next(); s.expect("{")
            body = []
            while not s.accept("}"):
                body.append(s.stmt())
            return ("script", name, body)
        # call statement: Name(args); or obj.Method(args);
        e = s.expr(); s.expect(";")
        return ("call", e)

    # expressions
    def expr(s):
        if s.peek()[1] == "if":
            s.next(); c = s.expr(); s.expect("then"); a = s.expr()
            s.expect("else"); b = s.expr()
            return ("if", c, a, b)
        return s.orx()

    def orx(s):
        a = s.andx()
        while s.peek()[1] == "or":
            s.next(); a = ("or", a, s.andx())
        return a

    def andx(s):
        a = s.cmp()
        while s.peek()[1] == "and":
            s.next(); a = ("and", a, s.cmp())
        return a

    def cmp(s):
        a = s.add()
        while s.peek()[1] in ("<", ">", "<=", ">=", "==", "!="):
            op = s.next()[1]; a = (op, a, s.add())
        return a

    def add(s):
        a = s.mul()
        while s.peek()[1] in ("+", "-"):
            op = s.next()[1]; a = (op, a, s.mul())
        return a

    def mul(s):
        a = s.unary()
        while s.peek()[1] in ("*", "/"):
            op = s.next()[1]; a = (op, a, s.unary())
        return a

    def unary(s):
        if s.peek()[1] == "-":
            s.next(); return ("neg", s.unary())
        if s.peek()[1] == "!":
            s.next(); return ("not", s.unary())
        return s.postfix()

    def postfix(s):
        a = s.atom()
        while s.peek()[1] == "[":
            s.next(); k = s.expr(); s.expect("]"); a = ("off", a, k)
        return a

    def atom(s):
        k, v = s.next()
        if k == "num": return ("num", float(v))
        if k == "str": return ("str", v[1:-1])
        if v == "(":
            if s.peek()[1] == "if":
                e = s.expr()
            else:
                e = s.expr()
            s.expect(")"); return e
        if k == "id":
            if v == "if":
                s.i -= 1; return s.expr()
            if s.accept("("):
                args = []
                if not s.accept(")"):
                    while True:
                        args.append(s.expr())
                        if s.accept(")"): break
                        s.expect(",")
                return ("fn", v, args)
            return ("id", v)
        raise SyntaxError(f"unexpected {v!r} at token {s.i}")


class Interp:
    def __init__(s, close, aspect=0.92, inputs=None):
        s.close = close
        s.nb = len(close)
        s.scripts = {}
        s.vars = {}
        s.plots = {}
        s.colors = {}
        s.weights = {}
        s.inputs_override = inputs or {}
        s.used_fns = set()
        s.aspect = aspect

    def run(s, stmts):
        for st in stmts:
            s.exec(st, s.vars)

    def exec(s, st, scope, script_inputs=None):
        kind = st[0]
        if kind == "declare": return
        if kind == "input":
            name = st[1]
            if script_inputs is not None and name in script_inputs:
                scope[name] = script_inputs[name]
            elif name in s.inputs_override:
                scope[name] = s.inputs_override[name]
            else:
                scope[name] = s.ev(st[2], scope)
            return
        if kind in ("def", "plot"):
            if st[1] in scope and script_inputs is None:
                raise NameError(f"redefinition of {st[1]}")
            scope[st[1]] = np.asarray(s.ev(st[2], scope), dtype=float) * np.ones(s.nb) \
                if not isinstance(s.ev(st[2], scope), np.ndarray) else s.ev(st[2], scope)
            if kind == "plot" and script_inputs is None:
                s.plots[st[1]] = scope[st[1]]
            return
        if kind == "script":
            s.scripts[st[1]] = st[2]; return
        if kind == "call":
            e = st[1]
            assert e[0] == "fn", e
            name = e[1]
            if "." in name:
                obj, meth = name.split(".")
                assert obj in s.plots, f"unknown plot {obj}"
                if meth == "AssignValueColor":
                    s.colors[obj] = s.ev(e[2][0], scope)
                elif meth == "SetLineWeight":
                    s.weights[obj] = float(np.asarray(s.ev(e[2][0], scope)).flat[0])
                elif meth == "SetDefaultColor":
                    s.colors.setdefault(obj, ("fixed", s.ev(e[2][0], scope)))
                elif meth in ("HideBubble", "HideTitle", "SetPaintingStrategy"):
                    pass
                else:
                    raise NameError(meth)
            elif name in ("HidePricePlot", "AssignBackgroundColor", "AddLabel"):
                vals = [s.ev(a, scope) for a in e[2]]
                if name == "AddLabel":
                    s.labels = getattr(s, "labels", []) + [vals[1]]
            else:
                raise NameError(name)
            return
        raise ValueError(kind)

    def ev(s, e, scope):
        k = e[0]
        with np.errstate(all="ignore"):
            if k == "num": return e[1]
            if k == "str": return e[1]
            if k == "id":
                v = e[1]
                if v in scope: return scope[v]
                if v == "close": return s.close
                if v in ("yes",): return 1.0
                if v in ("no",): return 0.0
                if v == "Double.NaN": return np.nan
                if v == "Double.Pi": return np.pi
                if v == "Color.CURRENT": return ("color", None)
                raise NameError(f"undefined identifier {v}")
            if k == "if":
                c = s.ev(e[1], scope)
                a = s.ev(e[2], scope); b = s.ev(e[3], scope)
                if isinstance(a, tuple) or isinstance(b, tuple):
                    return a if np.all(c) else b
                return np.where(np.asarray(c, dtype=bool) & ~np.isnan(np.asarray(c, dtype=float)), a, b)
            if k in ("+", "-", "*", "/", "<", ">", "<=", ">=", "==", "!=", "and", "or"):
                a = s.ev(e[1], scope); b = s.ev(e[2], scope)
                if k == "+" and (isinstance(a, str) or isinstance(b, str)):
                    return str(a) + str(b)
                return {"+": np.add, "-": np.subtract, "*": np.multiply, "/": np.divide,
                        "<": np.less, ">": np.greater, "<=": np.less_equal,
                        ">=": np.greater_equal, "==": np.equal, "!=": np.not_equal,
                        "and": np.logical_and, "or": np.logical_or}[k](a, b)
            if k == "neg": return -np.asarray(s.ev(e[1], scope))
            if k == "not": return np.logical_not(s.ev(e[1], scope))
            if k == "off":
                base = np.asarray(s.ev(e[1], scope), dtype=float) * np.ones(s.nb)
                n = int(s.ev(e[2], scope))
                assert n > 0, "only positive constant offsets expected"
                r = np.full(s.nb, np.nan); r[n:] = base[:-n]; return r
            if k == "fn":
                name, args = e[1], e[2]
                s.used_fns.add(name)
                if name in s.scripts:
                    body = s.scripts[name]
                    params = [st[1] for st in body if st[0] == "input"]
                    vals = [s.ev(a, scope) for a in args]
                    assert len(vals) == len(params), f"{name}: {len(vals)} args for {len(params)} inputs"
                    sub = {}
                    for st in body:
                        s.exec(st, sub, script_inputs=dict(zip(params, vals)))
                    plots = [st[1] for st in body if st[0] == "plot"]
                    return sub[plots[0]]
                A = [s.ev(a, scope) for a in args]
                bn = np.arange(1, s.nb + 1, dtype=float)
                if name == "BarNumber": return bn
                if name == "HighestAll": return np.nanmax(np.asarray(A[0], dtype=float) * np.ones(s.nb))
                if name == "LowestAll": return np.nanmin(np.asarray(A[0], dtype=float) * np.ones(s.nb))
                if name == "IsNaN": return np.isnan(np.asarray(A[0], dtype=float))
                if name == "Min": return np.minimum(A[0], A[1])
                if name == "Max": return np.maximum(A[0], A[1])
                if name == "Round": return np.round(A[0], int(A[1]))
                if name == "AbsValue": return np.abs(A[0])
                if name == "TickSize": return 0.01
                if name == "Sqrt": return np.sqrt(A[0])
                if name == "Exp": return np.exp(A[0])
                if name == "Sin": return np.sin(A[0])
                if name == "Cos": return np.cos(A[0])
                if name == "ATan": return np.arctan(A[0])
                if name == "Floor": return np.floor(A[0])
                if name == "Sqr": return np.square(A[0])
                if name == "ExpAverage":
                    x = np.asarray(A[0], dtype=float) * np.ones(s.nb); n = int(A[1])
                    a = 2.0 / (n + 1); r = np.empty(s.nb); r[0] = x[0]
                    for i in range(1, s.nb): r[i] = r[i - 1] + a * (x[i] - r[i - 1])
                    return r
                if name == "Highest":
                    from dsl import _rolling_max
                    return _rolling_max(np.asarray(A[0], dtype=float) * np.ones(s.nb), int(A[1]))
                if name == "CreateColor": return ("rgb", A)
                if name == "GetSymbol": return "TSLA"
                raise NameError(f"unknown function {name}")
        raise ValueError(k)


def render(files, close, pw=830, ph=900, aspect=0.92, bg=(22, 16, 34)):
    plots = []
    for f in files:
        it = Interp(close, inputs={"aspectRatio": aspect})
        it.run(P(tokenize(open(f).read())).program())
        for name, val in it.plots.items():
            col = it.colors.get(name)
            plots.append((name, val, col, it.weights.get(name, 1)))
        print(f"{os.path.basename(f)}: {len(it.plots)} plots, scripts={list(it.scripts)}, fns={sorted(it.used_fns)}")
    vals = np.concatenate([p[1][~np.isnan(p[1])] for p in plots])
    top, bot = vals.max(), vals.min()
    nb = len(close)
    first = None
    img = np.zeros((ph, pw, 3), np.uint8); img[:] = bg
    # canvas bars: where any plot is defined
    defined = np.zeros(nb, bool)
    for _, v, _, _ in plots: defined |= ~np.isnan(v)
    idx = np.nonzero(defined)[0]
    b0, b1 = idx.min(), idx.max()
    ncan = b1 - b0 + 1
    px = np.arange(pw)
    bar = b0 + np.minimum((px * ncan) // pw, ncan - 1)
    span = (top - bot)
    bad = 0
    for name, v, col, w in plots:
        if col is None or col[0] != "rgb": continue
        rgb = np.stack([np.asarray(c, dtype=float) * np.ones(nb) for c in col[1]], -1)
        seg = rgb[b0:b1 + 1]
        if np.isnan(seg).any() or (seg < 0).any() or (seg > 255).any():
            bad += 1
        vv = v[bar]
        ok = ~np.isnan(vv)
        if not ok.any(): continue
        yc = (top - vv[ok][0]) / span * (ph - 1)
        y0 = int(round(yc - w / 2)); y1 = min(ph, y0 + int(w)); y0 = max(0, y0)
        c = np.clip(np.nan_to_num(rgb[bar], nan=255), 0, 255).astype(np.uint8)
        img[y0:y1, ok, :] = c[ok][None]
    print("rows with out-of-range/NaN colours:", bad)
    im = Image.fromarray(img)
    from PIL import ImageDraw
    dr = ImageDraw.Draw(im)
    for name, v, col, w in plots:
        if col is None or col[0] != "fixed": continue
        rgb = tuple(int(float(np.asarray(c).flat[0])) for c in col[1][1])
        pts = [((i - b0 + 0.5) * pw / ncan, (top - v[i]) / span * (ph - 1))
               for i in range(b0, b1 + 1) if not np.isnan(v[i])]
        if len(pts) > 1: dr.line(pts, fill=rgb, width=int(w))
    return im


if __name__ == "__main__":
    sys.path.insert(0, os.path.dirname(__file__))
    import build as B
    files = sys.argv[2:]
    render(files, B.close, aspect=B.ASPECT).save(sys.argv[1])
