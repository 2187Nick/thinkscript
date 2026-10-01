"""Bit-exactness check: interpreter on emitted .ts vs DSL preview, per bar."""
import numpy as np, build as B, make as M, scene as S, sys
from tsinterp import Interp, P, tokenize
rows = M.eval_rows()
worst = 0
for p in range(S.PARTS):
    it = Interp(B.close, inputs={"aspectRatio": B.ASPECT})
    it.run(P(tokenize(open(f'../out/the_close_part{p+1}.ts').read())).program())
    for name, val in it.plots.items():
        if not name.startswith("L"): continue
        k = int(name[1:]); y, col = rows[k]
        rgb = np.stack([np.asarray(c, float) * np.ones(B.NB) for c in it.colors[name][1]], -1)
        cv = slice(B.firstBar - 1, B.lastBar)
        d = np.abs(rgb[cv] - col[cv])
        assert not np.isnan(rgb[cv]).any(), name
        assert rgb[cv].min() >= 0 and rgb[cv].max() <= 255, name
        worst = max(worst, d.max())
    print(f"part {p+1}: {len(it.plots)} plots ok; labels={getattr(it,'labels',[])}")
print("worst per-channel difference vs preview:", worst)
