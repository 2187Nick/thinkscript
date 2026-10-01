"""Tiny expression compiler: builds a hash-consed DAG, folds constants,
emits ThinkScript with common-subexpression defs, and evaluates the very
same DAG with numpy so previews match the emitted code."""
import math
import numpy as np

_intern = {}
_nid = [0]


class N:
    __slots__ = ("op", "a", "v", "id")

    def __init__(self, op, a, v):
        self.op, self.a, self.v = op, a, v
        _nid[0] += 1
        self.id = _nid[0]

    # arithmetic sugar
    def __add__(s, o): return add(s, lift(o))
    def __radd__(s, o): return add(lift(o), s)
    def __sub__(s, o): return sub(s, lift(o))
    def __rsub__(s, o): return sub(lift(o), s)
    def __mul__(s, o): return mul(s, lift(o))
    def __rmul__(s, o): return mul(lift(o), s)
    def __truediv__(s, o): return div(s, lift(o))
    def __rtruediv__(s, o): return div(lift(o), s)
    def __neg__(s): return mul(C(-1.0), s)
    def __lt__(s, o): return mk("lt", (s, lift(o)))
    def __gt__(s, o): return mk("gt", (s, lift(o)))
    def __le__(s, o): return mk("le", (s, lift(o)))
    def __ge__(s, o): return mk("ge", (s, lift(o)))

    def __getitem__(s, k):  # bar offset
        if k == 0:
            return s
        assert s.op == "var"
        return mk("off", (s,), int(k))

    @property
    def isc(s): return s.op == "c"


def mk(op, a=(), v=None):
    key = (op, tuple(x.id for x in a), v)
    n = _intern.get(key)
    if n is None:
        n = N(op, tuple(a), v)
        _intern[key] = n
    return n


def C(v):
    v = float(v)
    if v == 0.0:
        v = 0.0
    return mk("c", (), v)


def V(name):
    return mk("var", (), name)


def lift(o):
    return o if isinstance(o, N) else C(o)


def add(a, b):
    if a.isc and b.isc: return C(a.v + b.v)
    if a.isc and a.v == 0: return b
    if b.isc and b.v == 0: return a
    if b.isc and b.v < 0: return sub(a, C(-b.v))
    if b.op == "mul" and b.a[0].isc and b.a[0].v < 0:
        return sub(a, mul(C(-b.a[0].v), b.a[1]))
    if a.isc:  # keep constants on the right for readability
        return mk("add", (b, a))
    return mk("add", (a, b))


def sub(a, b):
    if a.isc and b.isc: return C(a.v - b.v)
    if b.isc and b.v == 0: return a
    if b.isc and b.v < 0: return add(a, C(-b.v))
    if a is b: return C(0)
    return mk("sub", (a, b))


def mul(a, b):
    if a.isc and b.isc: return C(a.v * b.v)
    if b.isc: a, b = b, a
    if a.isc:
        if a.v == 0: return C(0)
        if a.v == 1: return b
        if b.op == "mul" and b.a[0].isc: return mul(C(a.v * b.a[0].v), b.a[1])
    return mk("mul", (a, b))


def div(a, b):
    if b.isc:
        if a.isc: return C(a.v / b.v)
        if b.v == int(b.v) and abs(b.v) >= 2:
            return mk("div", (a, b))  # exact: keeps Floor() decoding bit-exact
        return mul(C(1.0 / b.v), a)
    if a.isc and b.isc: return C(a.v / b.v)
    return mk("div", (a, b))


_PY = {
    "Sqrt": math.sqrt, "Exp": math.exp, "Sin": math.sin, "Cos": math.cos,
    "AbsValue": abs, "Floor": math.floor, "ATan": math.atan,
    "Min": min, "Max": max, "Sqr": lambda x: x * x,
}


def fn(name, *args):
    args = tuple(lift(x) for x in args)
    if all(x.isc for x in args):
        return C(_PY[name](*[x.v for x in args]))
    if name in ("Min", "Max"):
        a, b = args
        if b.isc: args = (a, b)
        elif a.isc: args = (b, a)
    return mk("fn", args, name)


def Sqrt(x): return fn("Sqrt", x)
def Exp(x):
    x = lift(x)
    if x.isc and x.v < -700: return C(0)
    return fn("Exp", x)
def Sin(x): return fn("Sin", x)
def Cos(x): return fn("Cos", x)
def Abs(x): return fn("AbsValue", x)
def Floor(x): return fn("Floor", x)
def Min(a, b): return fn("Min", a, b)
def Max(a, b): return fn("Max", a, b)
def ATan(x): return fn("ATan", x)
def Clamp(x, lo=0.0, hi=1.0): return Min(Max(x, lo), hi)


def If(c, a, b):
    a, b = lift(a), lift(b)
    if c.isc: return a if c.v else b
    if a is b: return a
    return mk("if", (c, a, b))


def And(a, b): return mk("and", (a, b))


def Call(name, *args):
    return mk("call", tuple(lift(x) for x in args), name)


def smoothstep(e0, e1, x):
    t = Clamp((x - e0) * (1.0 / (e1 - e0)))
    return t * t * (3.0 - 2.0 * t)


def fract(x):
    return x - Floor(x)


class V3:
    """RGB / XYZ triple of nodes."""
    __slots__ = ("x", "y", "z")

    def __init__(s, x, y, z): s.x, s.y, s.z = lift(x), lift(y), lift(z)
    def __add__(s, o): o = v3(o); return V3(s.x + o.x, s.y + o.y, s.z + o.z)
    def __sub__(s, o): o = v3(o); return V3(s.x - o.x, s.y - o.y, s.z - o.z)
    def __mul__(s, o):
        if isinstance(o, V3): return V3(s.x * o.x, s.y * o.y, s.z * o.z)
        return V3(s.x * o, s.y * o, s.z * o)
    __rmul__ = __mul__
    def dot(s, o): return s.x * o.x + s.y * o.y + s.z * o.z
    def t(s): return (s.x, s.y, s.z)


def v3(o):
    if isinstance(o, V3): return o
    if isinstance(o, (tuple, list)): return V3(*o)
    return V3(o, o, o)


def mix(a, b, t):
    a, b = v3(a), v3(b)
    return a + (b - a) * t


# ---------------------------------------------------------------- numpy eval
def _rolling_max(q, n):
    n = int(n)
    q = np.asarray(q, dtype=float)
    out = np.full_like(q, np.nan)
    for i in range(len(q)):
        w = q[max(0, i - n + 1): i + 1]
        out[i] = np.nanmax(w) if np.any(~np.isnan(w)) else np.nan
    return out

class Evaluator:
    def __init__(self, env, scripts=None):
        self.env, self.memo, self.scripts = env, {}, scripts or {}

    def ev(self, n):
        r = self.memo.get(n.id)
        if r is not None:
            return r
        op = n.op
        with np.errstate(all="ignore"):
            if op == "c": r = n.v
            elif op == "var": r = self.env[n.v]
            elif op == "off":
                base = np.asarray(self.ev(n.a[0]), dtype=float)
                r = np.full_like(base, np.nan)
                r[n.v:] = base[:-n.v]
            else:
                a = [self.ev(x) for x in n.a]
                if op == "add": r = a[0] + a[1]
                elif op == "sub": r = a[0] - a[1]
                elif op == "mul": r = a[0] * a[1]
                elif op == "div": r = np.divide(a[0], a[1])
                elif op == "lt": r = np.less(a[0], a[1])
                elif op == "gt": r = np.greater(a[0], a[1])
                elif op == "le": r = np.less_equal(a[0], a[1])
                elif op == "ge": r = np.greater_equal(a[0], a[1])
                elif op == "and": r = np.logical_and(a[0], a[1])
                elif op == "if": r = np.where(a[0], a[1], a[2])
                elif op == "fn":
                    f = {"Sqrt": np.sqrt, "Exp": np.exp, "Sin": np.sin,
                         "Cos": np.cos, "AbsValue": np.abs, "Floor": np.floor,
                         "ATan": np.arctan, "Min": np.minimum,
                         "Max": np.maximum, "IsNaN": np.isnan,
                         "HighestAll": lambda q: np.nanmax(q) * np.ones_like(q),
                         "LowestAll": lambda q: np.nanmin(q) * np.ones_like(q),
                         "Highest": _rolling_max}[n.v]
                    r = f(*a)
                elif op == "call":
                    root, params = self.scripts[n.v]
                    sub_env = dict(zip(params, a))
                    r = Evaluator(sub_env, self.scripts).ev(root)
                else:
                    raise ValueError(op)
        self.memo[n.id] = r
        return r


# ---------------------------------------------------------------- emission
PREC = {"add": 4, "sub": 4, "mul": 5, "div": 5}
SYM = {"add": "+", "sub": "-", "mul": "*", "div": "/",
       "lt": "<", "gt": ">", "le": "<=", "ge": ">="}


def fmt(v):
    if abs(v) < 5e-12:
        return "0"
    if v == int(v) and abs(v) < 1e12:
        return str(int(v))
    s = f"{v:.10g}"
    if "e" in s:
        from decimal import Decimal
        s = format(Decimal(s), "f")
    return s


class Emitter:
    """Emits defs for shared nodes. `names` maps node id -> TS identifier for
    nodes already defined (persisting across rows within one study)."""

    def __init__(self, prefix="q", min_refs=2, min_cost=6):
        self.min_cost = min_cost
        self.names = {}
        self.prefix = prefix
        self.count = 0
        self.min_refs = min_refs

    def _refcount(self, roots):
        rc = {}
        seen = set()
        stack = list(roots)
        order = []
        # iterative post-order
        def visit(n):
            st = [(n, 0)]
            while st:
                node, i = st.pop()
                if i == 0:
                    rc[node.id] = rc.get(node.id, 0) + 1
                    if node.id in seen or node.id in self.names:
                        continue
                    seen.add(node.id)
                    st.append((node, 1))
                    for ch in reversed(node.a):
                        st.append((ch, 0))
                else:
                    order.append(node)
        for r in roots:
            visit(r)
        return rc, order

    def plan(self, all_roots):
        """Count references over a whole study so defs are shared across rows."""
        self.rc, _ = self._refcount(all_roots)

    def emit(self, roots, force_def=()):
        """Returns (lines, [expr strings for roots])."""
        rc, order = self._refcount(roots)
        if getattr(self, "rc", None) is not None:
            rc = {k: max(v, self.rc.get(k, 0)) for k, v in rc.items()}
        lines = []
        forced = {n.id for n in force_def}
        cost = {}
        for n in order:  # post-order: children first; defs cost 0 downstream
            if n.op in ("c", "var", "off"):
                cost[n.id] = 0
                continue
            cst = 1 + sum(0 if ch.id in self.names else cost.get(ch.id, 0) for ch in n.a)
            if n.op == "fn" and n.v in ("Exp", "Sin", "Cos", "Sqrt", "ATan"):
                cst += 3
            cost[n.id] = cst
            r = rc.get(n.id, 0)
            want = (r >= 2 and cst >= self.min_cost) or (r >= 4 and cst >= 2)
            if want or n.id in forced or n.op == "call":
                name = f"{self.prefix}{self.count}"
                self.count += 1
                lines.append(f"def {name} = {self.expr(n)};")
                self.names[n.id] = name
        return lines, [self.expr(r) for r in roots]

    def expr(self, n, top=True):
        if not top and n.id in self.names:
            return self.names[n.id]
        if top and n.id in self.names:
            return self.names[n.id]
        op = n.op
        if op == "c":
            s = fmt(n.v)
            return f"({s})" if s.startswith("-") else s
        if op == "var":
            return n.v
        if op == "off":
            return f"{n.a[0].v}[{n.v}]"
        if op in PREC:
            p = PREC[op]
            l = self._child(n.a[0], p, False)
            r = self._child(n.a[1], p, op in ("sub", "div"))
            return f"{l} {SYM[op]} {r}" if p == 4 else f"{l}*{r}" if op == "mul" else f"{l}/{r}"
        if op in ("lt", "gt", "le", "ge"):
            return f"{self._atom(n.a[0])} {SYM[op]} {self._atom(n.a[1])}"
        if op == "and":
            return f"({self.expr(n.a[0], False)}) and ({self.expr(n.a[1], False)})"
        if op == "if":
            return (f"if {self.expr(n.a[0], False)} then {self.expr(n.a[1], False)}"
                    f" else {self._atom(n.a[2])}")
        if op == "fn":
            return f"{n.v}(" + ", ".join(self.expr(x, False) for x in n.a) + ")"
        if op == "call":
            return f"{n.v}(" + ", ".join(self.expr(x, False) for x in n.a) + ")"
        raise ValueError(op)

    def _atom(self, n):
        s = self.expr(n, False)
        if n.id in self.names or n.op in ("c", "var", "off", "fn", "call"):
            return s
        return f"({s})"

    def _child(self, n, p, right):
        s = self.expr(n, False)
        if n.id in self.names or n.op in ("c", "var", "off", "fn", "call"):
            return s
        cp = PREC.get(n.op, 0)
        if cp < p or (right and cp == p):
            return f"({s})"
        return s
