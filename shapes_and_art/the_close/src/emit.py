"""Write the ThinkScript studies."""
import os, re, sys
import build as B
import scene as S_
from dsl import Emitter, fmt

TITLE = "THE CLOSE"


def header(p):
    P = S_.PARTS
    lines = [
        f"# {TITLE} | part {p + 1} of {P} | Opus 5.5 | 2026-10-01",
        "# A per-pixel ray tracer for thinkorswim. The chart is a framebuffer:",
        "# every scanline is a plot whose colour is solved for every bar - sky",
        "# scattering, sun glow, crepuscular rays, aerial perspective, a Fresnel",
        "# lake, and a glass lensball refracted with Snell's law (exact ray-sphere",
        "# intersection, two refractions, one reflection).",
        "# Nothing is drawn from a picture. The nearest ridgeline IS this chart's",
        "# closing prices, the range behind it is their 34-bar EMA, and the sun",
        "# sets into the deepest notch of that skyline. New data, new sunset.",
        f"# Add all {P} parts to the SAME chart. Each draws every {P}th scanline, so",
        "# any subset still shows the whole picture at lower resolution.",
        "# Best on a 1D 1m chart (600-1000 bars). Fit studies on, no expansion,",
        "# set aspectRatio = chart width / height in pixels to keep the ball round.",
        "",
    ]
    return lines


def base_defs(p):
    t = [
        "declare upper;",
        "declare once_per_bar;",
        "",
        "input canvasBars = 640;",
        "input aspectRatio = 0.92; # chart width / height in pixels (keeps the ball round)",
        "input lineWeight = 5;",
    ]
    if p == 0:
        t += ["input hideCandles = yes;", "input darkBackground = yes;", "input showCaption = yes;"]
    t += [
        "",
        "def bn = BarNumber();",
        "def lastBar = HighestAll(if !IsNaN(close) then bn else 0);",
        "def width = Min(Max(120, Round(canvasBars, 0)), Max(2, lastBar));",
        "def firstBar = lastBar - width + 1;",
        "def x = (bn - firstBar) / Max(1, width - 1);",
        "def act = lastBar >= 2 and x >= 0 and x <= 1;",
        "def win = bn >= firstBar and bn <= lastBar and !IsNaN(close);",
        "def hi = HighestAll(if win then close else Double.NaN);",
        "def lo = LowestAll(if win then close else Double.NaN);",
        "def span = Max(hi - lo, Max(AbsValue(hi + lo) * 0.0005, TickSize() * 8));",
        f"def h = span / {fmt(S_.B1 - S_.B0)};",
        f"def base = lo - {fmt(S_.B0)} * h;",
        "def nan = Double.NaN;",
        "def k0 = bn - firstBar;",
        "def cl = if IsNaN(close) then lo else close;",
        "def emaClose = ExpAverage(cl, 34);",
    ]
    if p == 0:
        t += ["",
              "HidePricePlot(hideCandles);",
              "AssignBackgroundColor(if darkBackground then CreateColor(%d, %d, %d) else Color.CURRENT);" % (30, 20, 44)]
    return t


SCRIPT_COST = int(os.environ.get("SCOST", 20))
SCRIPT_PREFIX = {"Land": "l", "Lake": "k", "LensBall": "b", "MixC": "m"}
TSNAME = {"Land": "TcLand", "Lake": "TcLake", "LensBall": "TcLensBall", "MixC": "TcMix"}


def script_block(name):
    root, params = B.SCRIPTS[name]
    em = Emitter(prefix=SCRIPT_PREFIX[name] + "_", min_cost=SCRIPT_COST)
    em.plan([root])
    lines, (rexpr,) = em.emit([root])
    out = [f"script {TSNAME[name]} {{"] + [f"    input {p} = 0.0;" for p in params]
    out += ["    " + l for l in lines]
    out += [f"    plot res = {rexpr};", "}"]
    return out


BIRDS = [  # x, y, half-span, height (canvas units)
    (0.400, 0.640, 0.0125, 0.0105),
    (0.442, 0.668, 0.0100, 0.0085),
    (0.372, 0.690, 0.0085, 0.0070),
    (0.470, 0.632, 0.0070, 0.0058),
    (0.418, 0.712, 0.0060, 0.0050),
    (0.335, 0.655, 0.0055, 0.0045),
]


def birds():
    out = ["# a few gulls heading home"]
    for i, (bx, by, hw, ht) in enumerate(BIRDS):
        t = f"(x - {fmt(bx)}) / {fmt(hw)}"
        out.append(f"plot Gull{i} = if act and AbsValue(x - {fmt(bx)}) <= {fmt(hw)} then base + h * "
                   f"({fmt(by)} + {fmt(ht)} * (2 * AbsValue({t}) - 1.6 * Sqr({t}))) else nan;")
        out.append(f"Gull{i}.SetDefaultColor(CreateColor(38, 20, 40)); Gull{i}.SetLineWeight(2); "
                   f"Gull{i}.HideBubble(); Gull{i}.HideTitle();")
    return out


def caption():
    return ['AddLabel(showCaption, "THE CLOSE  |  the ridgeline is the closing prices of " + GetSymbol()'
            ' + "  |  ray traced in thinkScript by Opus 5.5", CreateColor(255, 196, 120));']


def part(p):
    em = Emitter(prefix="q")
    rows = [(k, y, node) for k, (y, node) in enumerate(B.ROWS) if k % S_.PARTS == p]
    em.plan([node for _, _, node in rows])
    body = []
    for k, y, node in rows:
        lines, (expr,) = em.emit([node])
        body += lines
        c = em.names.get(node.id) or expr
        nm = f"L{k:03d}"
        body.append(f"plot {nm} = if act then base + h * {fmt(y)} else nan;")
        body.append(f"{nm}.AssignValueColor(CreateColor(Floor({c} / 65536), "
                    f"Floor({c} / 256) - 256 * Floor({c} / 65536), {c} - 256 * Floor({c} / 256)));")
        body.append(f"{nm}.SetLineWeight(lineWeight); {nm}.HideBubble(); {nm}.HideTitle();")
    text = "\n".join(body)
    names = {nm for nm, _ in B.NAMED}
    def refs(s):
        return {w for w in re.findall(r"[A-Za-z_][A-Za-z0-9_]*", s) if w in names}
    needed = refs(text)
    changed = True
    while changed:
        changed = False
        for nm, node in B.NAMED:
            if nm in needed:
                _, (ex,) = Emitter(prefix="z").emit([node])
                new = refs(ex) - needed
                if new:
                    needed |= new; changed = True
    gem = Emitter(prefix="g")
    gem.plan([n for nm, n in B.NAMED if nm in needed])
    named_lines = []
    for nm, node in B.NAMED:
        if nm in needed:
            ls, (ex,) = gem.emit([node])
            named_lines += ls
            named_lines.append(f"def {nm} = {ex};")
            gem.names[node.id] = nm
    out = header(p) + base_defs(p) + [""]
    for sname in B.SCRIPTS:
        if sname + "(" in text:
            out += script_block(sname) + [""]
    out += named_lines + [""] + body + [""] + birds() + [""]
    if p == 0:
        out += caption()
    for a, b in TSNAME.items():
        out = [re.sub(r"\b" + a + r"\(", b + "(", l) for l in out]
    return "\n".join(out)


if __name__ == "__main__":
    tot = 0
    for p in range(S_.PARTS):
        s = part(p)
        fn = os.path.join(B.OUT, f"the_close_part{p + 1}.ts")
        open(fn, "w", newline="\n").write(s)
        n_def = s.count("\ndef ") + s.count("\n    def ")
        print(f"part {p + 1}: {len(s):,} chars, {s.count('plot L')} rows, {n_def} defs, longest line {max(len(l) for l in s.splitlines()):,}")
        tot += len(s)
    print("total", tot)
