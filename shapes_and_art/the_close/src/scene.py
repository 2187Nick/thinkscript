"""THE CLOSE - scene description in the DSL.

Screen: x in [0,1] (bars), y in [0,1] (rows). Pinhole camera with a shifted
lens so the horizon sits at y = YH. Ray for (x, y): d = norm(uu, v, 1) with
uu = (x - .5) * aspect * S and v = (y - YH) * S.
All shading lives in ThinkScript `script` subroutines; rows only call them.
"""
import math
from dsl import *

NROWS = 200          # total scanlines across all parts
PARTS = 4
S = 0.92             # v-units per unit of canvas height
YH = 0.32            # horizon row
B0, B1 = 0.350, 0.600  # price band for the nearest ridge (canvas units)
PIXV = S / NROWS     # one scanline in v-units

# sun (fixed 3D direction)
SUN_U, SUN_V = -0.160, 0.168
_l = math.sqrt(SUN_U ** 2 + SUN_V ** 2 + 1)
SX, SY, SZ = SUN_U / _l, SUN_V / _l, 1 / _l
SUN_R = 0.030        # angular radius (rad)

# lensball (world units; camera at (0, CAMH, 0) looking +z, water y=0)
CAMH = 0.30
BX, BY, BZ, BR = 1.60, 1.25, 10.0, 1.00
ETA = 1.5

# palette (sRGB 0..1)
ZENITH = (0.055, 0.065, 0.220)
HIGH = (0.360, 0.165, 0.420)
LOW = (0.965, 0.400, 0.300)
HORIZON = (1.000, 0.650, 0.300)
GLOW_W = (1.000, 0.440, 0.120)
GLOW_M = (1.000, 0.780, 0.480)
SUN_C = (1.000, 0.960, 0.860)
DEEP = (0.025, 0.035, 0.080)
RIM = (1.000, 0.620, 0.300)
CL_SHADOW = (0.290, 0.140, 0.300)
CL_LIT = (1.000, 0.600, 0.380)

LAYERS = (  # base colour, fog distance, rim strength
    ((0.400, 0.250, 0.450), 0.45, 0.55),
    ((0.185, 0.105, 0.300), 0.22, 0.75),
    ((0.045, 0.030, 0.080), 0.05, 0.90),
)


def pack(c):
    R = Floor(Clamp(c.x) * 255.0 + 0.5)
    G = Floor(Clamp(c.y) * 255.0 + 0.5)
    B = Floor(Clamp(c.z) * 255.0 + 0.5)
    return R * 65536.0 + G * 256.0 + B


def unpack(cnode):
    r = Floor(cnode / 65536.0)
    g = Floor(cnode / 256.0) - r * 256.0
    b = cnode - Floor(cnode / 256.0) * 256.0
    return V3(r * (1 / 255.0), g * (1 / 255.0), b * (1 / 255.0))


def sky(e, cs):
    """e: sin(elevation) >= 0, cs: cos(angle to sun)."""
    c = mix(HORIZON, LOW, smoothstep(0.0, 0.11, e))
    c = mix(c, HIGH, smoothstep(0.07, 0.33, e))
    c = mix(c, ZENITH, smoothstep(0.24, 0.62, e))
    m = Min(cs - 1.0, 0.0)
    low = Exp(e * -8.0)  # broad glow hugs the horizon
    c = c + v3(GLOW_W) * (Exp(m * 18.0) * 0.60 * low)
    c = c + v3(GLOW_M) * (Exp(m * 240.0) * 0.55)
    c = c + v3(SUN_C) * (Exp(m * 5000.0) * 1.1)
    disk = Clamp((cs - math.cos(SUN_R)) * (1.0 / 0.00011))
    c = mix(c, v3(SUN_C) * 2.2, disk)
    return c


def clouds(c, u, v, cs):
    """Sunset streaks, warped bands in sqrt(elevation) so they thin toward
    the horizon without aliasing at ~200 scanlines."""
    q = Sqrt(Max(v, 0.0004))
    n = (0.60 * Sin(q * 41.0 + 1.9 * Sin(u * 2.4 + q * 5.0) + 0.9 * Sin(u * 6.3 + 1.2))
         + 0.40 * Sin(q * 73.0 + u * 3.7 + 2.2 * Sin(u * 1.6 + 0.4)))
    n = n + 0.25 * Sin(u * 11.0 + q * 23.0)
    fade = smoothstep(0.06, 0.17, q) * (1.0 - smoothstep(0.62, 0.78, q))
    dens = smoothstep(0.30, 0.95, n) * fade
    m = Min(cs - 1.0, 0.0)
    lit = Exp(m * 6.0) * 0.9 + 0.1
    cc = mix(CL_SHADOW, CL_LIT, lit)
    cc = cc + v3(GLOW_M) * (Exp(m * 60.0) * 0.6)   # silver lining by the sun
    return mix(c, cc, dens * 0.85)


def rays(c, u, v, cs, sn):
    """Crepuscular rays fanning out from the sun."""
    du = u - sn[3] + 0.00001
    th = ATan((v - sn[4]) / du)
    p = Sin(th * 16.0 + 2.5 * Sin(th * 4.0 + 1.0))
    m = Min(cs - 1.0, 0.0)
    k = Max(p, 0.0) * Exp(m * 13.0) * 0.15 * smoothstep(0.0, 0.05, v)
    return c + v3(GLOW_W) * k


def ridge(t):
    return 1.0 - Abs(Sin(t))


def far_ridge(a):
    """Procedural peaks, tan(elevation) as a function of tan(azimuth)."""
    r = (0.080 + 0.105 * ridge(a * 2.6 + 0.55) + 0.040 * ridge(a * 6.3 + 2.1)
         + 0.018 * ridge(a * 14.1 + 0.4) + 0.007 * Sin(a * 37.0 + 1.0))
    return r


# ----------------------------------------------------------------- Land
def land(u, u2, v, fr, mr, nr, fog, sunw, sn):
    """Colour above the waterline (also used for the mirrored lake ray)."""
    L = Sqrt(u2 + v * v + 1.0)
    e = v / L
    cs = (u * sn[0] + v * sn[1] + sn[2]) / L
    c = sky(e, cs)
    c = rays(c, u, v, cs, sn)
    c = clouds(c, u, v, cs)
    mist = 0.85 + 2.6 * Exp(Max(v, 0.0) * (-1.0 / 0.045))
    for (basec, dist, rim_k), rv in zip(LAYERS, (fr, mr, nr)):
        lc = mix(basec, fog, 1.0 - Exp(mist * -dist))
        dd = rv - v
        rim = Exp(Max(dd, 0.0) * (-1.0 / 0.0065)) * sunw * rim_k
        lc = lc + v3(RIM) * Clamp(rim)
        c = mix(c, lc, Clamp(dd * (1.0 / PIXV) + 0.5))
    c = c + v3(HORIZON) * (Exp(Abs(v) * (-1.0 / 0.012)) * 0.24)
    return pack(c)


# ----------------------------------------------------------------- Lake
def lake(refl_packed, u, u2, v, k0, seed, phase, su):
    refl = unpack(refl_packed)
    depth = 0.0 - v
    L = Sqrt(u2 + v * v + 1.0)
    m = 1.0 - depth / L
    F = 0.02 + 0.98 * m * m * m * m * m
    c = mix(DEEP, refl * 0.92, F)
    w = 0.012 + 0.34 * depth
    du = (u - su) / w
    col = Exp(du * du * -1.0)
    c = c + v3(GLOW_M) * (col * 0.30 * Exp(depth * -7.0))
    hsh = fract(Sin(k0 * 12.9898 + seed) * 43758.5453)
    sp = Clamp((hsh - (1.0 - 0.26 * col)) * 8.0)
    c = c + v3((1.0, 0.80, 0.50)) * (sp * (1.1 * Exp(depth * -3.0) + 0.3))
    f = 9.0 + 60.0 * depth
    c = c * (1.0 + (0.035 + 0.25 * depth) * Sin(u * f + phase))
    return pack(c)


# ----------------------------------------------------------------- Mix
def mixp(a, b, t):
    return pack(mix(unpack(a), unpack(b), t))


# ----------------------------------------------------------------- Lensball
def env(d, sn):
    """Environment for secondary rays: sky, sun, procedural ranges, lake."""
    dx, dy, dz = d.t()
    e = Abs(dy)
    hl = Sqrt(Max(dx * dx + dz * dz, 0.000001))
    a = 2.0 * dx / (hl + dz + 0.001)
    cs = dx * sn[0] + e * sn[1] + dz * sn[2]
    c = sky(e, cs)
    el = e / hl
    fr = far_ridge(a) * Exp(a * a * -0.35) - 0.03 * (1.0 - Exp(a * a * -0.35))
    c = mix(c, mix(LAYERS[0][0], c, 0.45), Clamp((fr - el) * 140.0 + 0.5))
    mr = fr * 0.52 + 0.012 * Sin(a * 17.0) - 0.004
    c = mix(c, mix(LAYERS[2][0], c, 0.18), Clamp((mr - el) * 140.0 + 0.5))
    m = 1.0 - e
    m2 = m * m
    fw = 0.02 + 0.98 * m * m2 * m2
    water = mix(DEEP, c * 0.92, fw)
    return mix(c, water, If(dy < 0, 1, 0))


def lensball(u, v, cy, sn):
    L = Sqrt(u * u + v * v + 1.0)
    d = V3(u / L, v / L, 1.0 / L)
    oc = V3(-BX, cy - BY, -BZ)
    b = oc.dot(d)
    c = oc.dot(oc) - BR * BR
    disc = Max(b * b - c, 0.0)
    t = 0.0 - b - Sqrt(disc)
    p = V3(d.x * t - BX, cy + d.y * t - BY, d.z * t - BZ)  # hit - centre
    n = p * (1.0 / BR)
    cosi = Clamp(0.0 - d.dot(n))
    m = 1.0 - cosi
    m2 = m * m
    fres = 0.04 + 0.96 * m * m2 * m2
    r = d + n * (cosi * 2.0)
    eta = 1.0 / ETA
    k = Max(1.0 - eta * eta * (1.0 - cosi * cosi), 0.0)
    t1 = d * eta + n * (eta * cosi - Sqrt(k))
    s = (0.0 - 2.0 * BR) * n.dot(t1)
    p2 = p + t1 * s
    n2 = p2 * (1.0 / BR)
    c2 = t1.dot(n2)
    k2 = Max(1.0 - ETA * ETA * (1.0 - c2 * c2), 0.0)
    t2 = t1 * ETA - n2 * (ETA * c2 - Sqrt(k2))
    col = env(t2, sn) * V3(1.05, 1.08, 1.12) * (1.0 - fres) + env(r, sn) * (fres * 1.2)
    col = col * (0.86 + 0.14 * Clamp(cosi * 3.0))
    return pack(col)


def ball_alpha(u, v, cy):
    """Anti-aliased coverage of the ball (cheap, inline per row)."""
    L = Sqrt(u * u + (v * v + 1.0))
    oc = (-BX, cy - BY, -BZ)
    b = (oc[0] * u + (oc[1] * v + oc[2])) / L
    c = oc[0] ** 2 + oc[1] ** 2 + oc[2] ** 2 - BR * BR
    dist = math.sqrt(oc[0] ** 2 + oc[1] ** 2 + oc[2] ** 2)
    return Clamp((b * b - c) * (1.0 / (2.0 * BR * PIXV * dist)) + 0.5)


def ball_rows(cy, sign):
    """Rows whose scanline can touch the (mirrored) ball."""
    rows = set()
    oc = (-BX, cy - BY, -BZ)
    c = sum(q * q for q in oc) - BR * BR
    for k in range(NROWS):
        y = (k + 0.5) / NROWS
        v = (y - YH) * S * sign
        if sign < 0 and y >= YH:
            continue
        if sign > 0 and y < YH - 0.02:
            continue
        best = -1e9
        for i in range(-60, 61):
            u = BX / BZ + i * 0.004
            L = math.sqrt(u * u + v * v + 1)
            b = (oc[0] * u + oc[1] * v + oc[2]) / L
            best = max(best, b * b - c)
        if best > -2.0 * BR * PIXV * 10 * 2:
            rows.add(k)
    return rows
