"""Emit the ThinkScript parts and render a TOS-like preview from the DAG."""
import sys, os, math
import numpy as np
from PIL import Image
import build as B
from dsl import Evaluator, Emitter, fmt
import scene as S_

PW, PH = 830, 900  # plot-area pixels of the user's chart
LW = 5
BG = (18, 14, 28)


def eval_rows():
    env = dict(B.ENV)
    ev = Evaluator(env, B.SCRIPTS)
    for name, node in B.NAMED:
        env[name] = np.asarray(ev.ev(node), dtype=float) * np.ones(B.NB)
        ev.memo.clear()
    ev = Evaluator(env, B.SCRIPTS)
    out = []
    for y, node in B.ROWS:
        c = np.asarray(ev.ev(node), dtype=float) * np.ones(B.NB)
        r = np.floor(c / 65536); g = np.floor(c / 256) - r * 256; b = c - np.floor(c / 256) * 256
        out.append((y, np.stack([r, g, b], -1)))
    return out


def raster(rows, parts=None, lw=LW, pw=PW, ph=PH, bg=BG):
    img = np.zeros((ph, pw, 3), np.uint8)
    img[:] = bg
    canvas = slice(B.firstBar - 1, B.lastBar)
    px = np.arange(pw)
    bar = np.minimum((px * B.CANVAS) // pw, B.CANVAS - 1)
    for k, (y, col) in enumerate(rows):
        if parts is not None and (k % S_.PARTS) not in parts:
            continue
        cc = col[canvas]
        if np.isnan(cc).any() or np.isinf(cc).any():
            print('NaN/inf in row', k, np.isnan(cc).sum())
        c = np.nan_to_num(cc, nan=255.0)
        c = np.clip(np.round(c), 0, 255).astype(np.uint8)
        yc = (1 - y) * ph
        y0 = int(round(yc - lw / 2)); y1 = y0 + lw
        y0, y1 = max(0, y0), min(ph, y1)
        if y1 > y0:
            img[y0:y1, :, :] = c[bar][None, :, :]
    return Image.fromarray(img)


if __name__ == "__main__":
    rows = eval_rows()
    tag = sys.argv[1] if len(sys.argv) > 1 else "preview"
    raster(rows).save(os.path.join(B.OUT, f"{tag}.png"))
    raster(rows, parts={0}).save(os.path.join(B.OUT, f"{tag}_part1only.png"))
    print("rows", len(rows), "ball rows", len(B.BALL_D), len(B.BALL_M))
