This monitors for a peak in option call premium at the highs and peak in option put premium at the lows.

<img src="https://user-images.githubusercontent.com/75052782/203618629-3c0bf2ba-da5e-4a4f-8d98-67cf2a929846.png" width="450" height="800">

Designed for SPY and QQQ.

Chart requirements for optimal use:

Time frame: 1 Day
Aggregation Period: 1 Minute

This does work on a historical look back.

Settings:

Upper:
  1. Strike Spacing: 1;  (This sets the space between strikes. Ex: Current SPY price is 400. It will monitor calls
     and puts at strikes 398, 399, 400, 401 and 402)
  2. Premium Extrem Level: 1000000;  (This sets the $ amount to exceed for the Alert to activate)

Lower:
  1. Strike Spacing: 1;
  2. Highline Millions: 1000000; (Allows you to plot a red line at the $ value in Millions for calls)
  3. Lowline Millions: -1000000; (Allows you to plot a green line at the $ value in Millions for puts)

