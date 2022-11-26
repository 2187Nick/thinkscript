🚀 This monitors for a peak in option call premium at the highs and peak in option put premium at the lows.

Category: Mean Reversion

<img src="https://user-images.githubusercontent.com/75052782/204099196-525f8456-0a4f-4efd-9325-fc613e5e64b7.png" width="1200" height="800">

Designed for SPX and NDX.

> Chart requirements for optimal use:
```bash

  Time frame: 1 Day

  Aggregation Period: 1 Minute
  
  For SPX add these indicators to /ES chart. For NDX add these indicators to /NQ chart.
  
  Note: This does work on a historical look back.
```




> Settings 👷‍:

```bash

Upper:
  1. Strike Spacing: 25;(This sets the space between strikes. Ex: Current SPX price is 4000. It will monitor calls
     and puts at strikes 3950, 3975, 4000, 4025 and 4050)
  2. Premium Extreme Level: 1000000;  (This sets the $ amount to exceed for the Alert to activate)
  3. Symbol: SPXW; (Use NDXP for NDX options)
  4. Set base strike manually: No; (Default is set to automatically set the base strike. Select Yes to manually set)
  5. Manual base strike: 4025; (If #4 is set to Yes then you can enter the desired base strike)
  

Lower:
  1. Strike Spacing: 1;
  2. Highline Millions: 1000000; (Allows you to plot a red line at the $ value in Millions for calls)
  3. Lowline Millions: -1000000; (Allows you to plot a green line at the $ value in Millions for puts)
  3. Symbol: SPXW; (Use NDXP for NDX options)
  4. Set base strike manually: No; (Default is set to automatically set the base strike. Select Yes to manually set)
  5. Manual base strike: 4025; (If #4 is set to Yes then you can enter the desired base strike)
  
 ```




> 🧪 How this works: 

```bash

  Calculates the option premium(purchased or sold) for 5 strikes. ( itm +1, itm, atm, otm, otm +1)
   
   A. Option premium =  Volume x Price.  ( 1 minute volume  x  close price)
   
   Example:   SPY 400 Call Option.  Volume: 1000.  Close Price: $1.50;   Option Premium = $150K.  (For that 1 min period)
  
   B. Sum the Call Option Premium for the 5 strikes. 
    
   C. If the total amount is greater than Premium Extreme Level. Then alert bubble "Sell" will appear on that candle.
   
   Note: The upper indicator checks if price is moving up by comparing previous close price vs current price. It will only alert a "Sell"
   if we are moving up.  It will fail to alert if that requirement is not met. ( I will improve on this in the future).
   
   Note: I avoid the signals during roughly the first 15 minutes of market open.  
 ```
 
> 🦖 Why this works:
```bash
1 Theory:

As the stock price decreases eventually some market participants sell large amounts of puts. Betting that the stock will not continue to decrease.

As the stock price increases eventually some market participants sell large amounts of calls. Betting that the stock will not continue to increase.

Warning: If it is not a mean reverting day. Then you can easily get ran over. 

```
