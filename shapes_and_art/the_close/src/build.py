import json, math, os
import numpy as np
from dsl import *
import scene as S_
from scene import *
from dsl import fn


def Highest(q, n):
    return mk("fn", (q, C(n)), "Highest")

OUT = os.path.join(os.path.dirname(__file__), "..", "out")
os.makedirs(OUT, exist_ok=True)

# ------------------------------------------------------------------ preview data
DATA = os.environ.get("DATA", "tsla.json")


def load_closes(path, n):
    d = json.load(open(path))
    q = d["chart"]["result"][0]["indicators"]["quote"][0]["close"]
    c = [v for v in q if v]
    return np.array(c[-n:], dtype=float)


CANVAS = 640
NB = CANVAS + 160
close = load_closes(os.path.join(os.path.dirname(__file__), DATA), NB)
NB = len(close)
bn = np.arange(1, NB + 1, dtype=float)
lastBar = NB
width = CANVAS
firstBar = lastBar - width + 1
xarr = (bn - firstBar) / (width - 1)
win = (bn >= firstBar)
hi, lo = close[win].max(), close[win].min()
span = max(hi - lo, abs(hi + lo) * 0.0005)
h = span / (B1 - B0)
base = lo - B0 * h
ema = np.empty(NB); a_ = 2 / 35.0; ema[0] = close[0]
for i in range(1, NB): ema[i] = ema[i - 1] + a_ * (close[i] - ema[i - 1])
ASPECT = float(os.environ.get("ASPECT", 0.92))

ENV = dict(x=xarr, k0=bn - firstBar, cl=close, emaClose=ema, base=base, h=h,
           width=float(width), aspectRatio=ASPECT, bn=bn, nan=np.nan * np.ones(NB))

# ------------------------------------------------------------------ globals
x, k0, cl, ema_v = V("x"), V("k0"), V("cl"), V("emaClose")
baseV, hV, widthV, aspV = V("base"), V("h"), V("width"), V("aspectRatio")

NAMED = []  # (name, node) emitted as named defs in each study header


def named(name, node):
    NAMED.append((name, node))
    return V(name)


uu = named("uu", (x - 0.5) * aspV * S_.S)
uu2 = named("uu2", uu * uu)
nearV = named("nearV", ((cl - baseV) / hV - YH) * S_.S)
midV = named("midV", (((ema_v - baseV) / hV - YH) * 1.08 + 0.040) * S_.S
             + 0.024 * ridge(uu * 8.7 + 0.7) + 0.011 * ridge(uu * 21.0 + 1.9)
             + 0.004 * Sin(uu * 61.0))
farV = named("farV", far_ridge(uu))

# The sun sets into the deepest notch of the skyline left of the ball:
# trailing max over ~the sun's width, minimum inside the search window.
SUN_SPAN = 31
skyline = named("skyline", Highest(Max(nearV, Max(midV, farV)), SUN_SPAN))
inWin = And(x >= 0.14 + SUN_SPAN / 640.0, x <= 0.54)
skyMin = named("skyMin", fn("LowestAll", If(inWin, skyline, V("nan"))))
sunBar = named("sunBar", fn("HighestAll", If(And(inWin, skyline <= skyMin), V("bn"), V("nan")))
               - (SUN_SPAN - 1) / 2.0)
sunU = named("sunU", fn("HighestAll", If(Abs(V("bn") - sunBar) < 0.5, uu, V("nan"))))
sunV = named("sunV", skyMin + 0.30 * SUN_R)
_sl = Sqrt(sunU * sunU + sunV * sunV + 1.0)
sunX, sunY, sunZ = named("sunX", sunU / _sl), named("sunY", sunV / _sl), named("sunZ", 1.0 / _sl)
SUN = (sunX, sunY, sunZ, sunU, sunV)
sunW = named("sunW", Exp((uu - sunU) * (uu - sunU) * -9.0))
_fog = sky(C(0.025), (uu * sunX + 0.025 * sunY + sunZ) / Sqrt(uu2 + 1.0))
fogR, fogG, fogB = (named("fogR", _fog.x), named("fogG", _fog.y),
                    named("fogB", _fog.z))

shift_cache = {}


def shifted(var, name, k):
    if k == 0:
        return var
    key = (name, k)
    if key not in shift_cache:
        off = var[k]
        shift_cache[key] = named(f"{name}{k}", If(fn("IsNaN", off), var, off))
    return shift_cache[key]


# ------------------------------------------------------------------ scripts
def _script(name, params, builder):
    vs = [V(p) for p in params]
    return name, (builder(*vs), params)


SUNP = ["sx", "sy", "sz", "su", "sv"]
SCRIPTS = dict([
    _script("Land", ["lu", "lu2", "lv", "lfr", "lmr", "lnr", "lfr2", "lfg2", "lfb2", "lsw"] + SUNP,
            lambda u, u2, v, fr, mr, nr, a, b, c, sw, *sn: land(u, u2, v, fr, mr, nr, V3(a, b, c), sw, sn)),
    _script("Lake", ["kc", "ku", "ku2", "kv", "kk", "ks", "kp", "su"], lake),
    _script("LensBall", ["bu", "bv", "bcy", "sx", "sy", "sz"],
            lambda u, v, cy, a, b, c: lensball(u, v, cy, (a, b, c))),
    _script("MixC", ["ma", "mb", "mt"], mixp),
])

BALL_D = ball_rows(CAMH, 1.0)
BALL_M = ball_rows(-CAMH, -1.0)
rng = np.random.default_rng(7)


def row_color(k):
    y = (k + 0.5) / NROWS
    v = (y - YH) * S_.S
    if v >= 0:
        c = Call("Land", uu, uu2, v, farV, midV, nearV, fogR, fogG, fogB, sunW, *SUN)
        if k in BALL_D:
            c = Call("MixC", c, Call("LensBall", uu, v, CAMH, *SUN[:3]), ball_alpha(uu, C(v), CAMH))
    else:
        depth = -v
        ph = 1.0 / (depth + 0.012)
        dv = 0.0035 * math.sin(ph * 1.9 + 0.7) * (0.4 + 3.0 * depth)
        ks = int(round(2.0 * (1 + math.sin(ph * 2.7 + 2.0)) * (0.3 + 2.4 * depth)))
        vr = max(depth + dv, 0.0)
        r = Call("Land", uu, uu2, vr, shifted(farV, "farS", ks), shifted(midV, "midS", ks),
                 shifted(nearV, "nearS", ks), fogR, fogG, fogB, sunW, *SUN)
        if k in BALL_M:
            uus = (uu - ks * S_.S * aspV / (widthV - 1.0)) if ks else uu
            r = Call("MixC", r, Call("LensBall", uus, vr, -CAMH, *SUN[:3]), ball_alpha(uus, C(vr), -CAMH))
        c = Call("Lake", r, uu, uu2, v, k0, round(float(rng.uniform(0, 100)), 3),
                 round(float(rng.uniform(0, 6.283)), 3), sunU)
    return y, c


ROWS = [row_color(k) for k in range(NROWS)]
