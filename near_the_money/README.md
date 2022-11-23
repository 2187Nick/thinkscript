🚀 This monitors for a peak in option call premium at the highs and peak in option put premium at the lows.

Category: Mean Reversion

<img src="https://user-images.githubusercontent.com/75052782/203618629-3c0bf2ba-da5e-4a4f-8d98-67cf2a929846.png" width="450" height="800">

Designed for SPY and QQQ.

> Chart requirements for optimal use:
```bash

  Time frame: 1 Day

  Aggregation Period: 1 Minute
```
This does work on a historical look back.



> Settings 👷‍:

```bash

Upper:
  1. Strike Spacing: 1;  (This sets the space between strikes. Ex: Current SPY price is 400. It will monitor calls
     and puts at strikes 398, 399, 400, 401 and 402)
  2. Premium Extreme Level: 1000000;  (This sets the $ amount to exceed for the Alert to activate)

Lower:
  1. Strike Spacing: 1;
  2. Highline Millions: 1000000; (Allows you to plot a red line at the $ value in Millions for calls)
  3. Lowline Millions: -1000000; (Allows you to plot a green line at the $ value in Millions for puts)
 ```




> 🧪 How this works: 

```bash

  Calculates the option premium(purchased or sold) for 5 strikes. ( itm +1, itm, atm, otm, otm +1)
   
   A. Option premium =  Volume x Price.  ( 1 minute volume  x  close price)
   
   Example:   SPY 400 Call Option.  Volume: 1000.  Close Price: $1.50;   Option Premium = $150K.  (For that 1 min period)
  
   B. Sum the Call Option Premium for the 5 strikes. 
    
   C. If the total amount is greater than Premium Extreme Level. Then alert bubble "Sell" will appear on that candle.
 ```
 
> 🦖 Why this works:
```bash
1 Theory:

As the stock price decreases eventually some market participants sell large amounts of puts. Betting that the stock won't continue to decrease.

As the stock price increases eventually some market participants sell large amounts of calls. Betting that the stock won't continue to increase.

Warning: If it is not in a mean reverting day. Then you can easily get ran over. 

```
