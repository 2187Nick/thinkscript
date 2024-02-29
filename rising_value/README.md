## Working out the kinks. Testing and feedback. V3 will be improved.

## 🚀 Rising Value V2 Feb 28, 2024

Category: Option Volatility

```
## Stock Up and Put Value Up == Potential Bear Divergence.

## Stock Down and Call Value Up === Potential Bull Divergence.
```

"O" indicates alert generated at open of candle
"C" indicates the alert generated at close of candle.


# SPY
![image](https://github.com/2187Nick/thinkscript/assets/75052782/c84f08a2-b86b-4ad1-9cf6-a0de93fc3ff5)


# SPX
![image](https://github.com/2187Nick/thinkscript/assets/75052782/e376ee2a-966a-4fc0-a525-6c7b5ce01387)



> Chart requirements for optimal use:
```bash

  Time frame: 1 Day

  Aggregation Period: 1 Minute
  
```




> Settings 👷‍:

```bash

  1. Lookback Period End: 15; It will monitor this number of bars in history.
  (It compares the current open price to each open price for previous 15 candles.)
  (It compares the current close price to each close price for previous 15 candles.)
  2. Lookback: 3;  This skips the first 3 previous bars. 
  3. Manually Set Expiration = false; (Default this selects current day. Which is good for SPY and QQQ)
        A. Set this to true and then set the Expiration in #3.
  4. Expiration_YYMMDD = 240315;
  5. Strike1 = 510;
  6. Strike2 = 511;
  7. Bull: 🐂;  Add text or emoji. Windows button and period button at same time to get emoji keyboard
  8. Bear: 🐼;


 ```


> 🧪 How this works: 

```bash

  1. You have to manually set the Strikes for now.
  
  2. If the stock price is rising and the put option is also rising then 🐼 bearish divergence.
  
  3. If the stock price is falling and the call option is rising then 🐂 bullish divergence.
  
  4. The manual version of this indicators allows you to set a specific expiration date.

 ```
 
