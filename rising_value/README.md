## 🚀 Rising Value. Feb 27, 2024

Category: Option Volatility

![image](https://github.com/2187Nick/thinkscript/assets/75052782/eb95a1ac-a9ca-475c-9c63-6c2e260ef1b2)


> Chart requirements for optimal use:
```bash

  Time frame: 1 Day

  Aggregation Period: 1 Minute
  
```




> Settings 👷‍:

```bash

  1. Lookback: 10;  (It compares the current open price to the close price 10 minutes back)
  2. Manually Set Expiration = false; (Default this selects current day. Which is good for SPY and QQQ)
        A. Set this to true and then set the Expiration in #3.
  3. Expiration_YYMMDD = 230616;
  4. Manually Set Strikes = false; (Default this selects the 2 closest strikes. Which is good for SPY and QQQ)
        A. Set this to true and then set the Strikes in #5 and #6.
  5. Strike1 = 510;
  6. Strike2 = 511;


 ```


> 🧪 How this works: 

```bash

  1. This monitors the 2 strikes closest to current price.
  
  2. If the stock price is rising and the put option is also rising then bearish divergence.
  
  3. If the stock price is falling and the call option is rising then bullish divergence.
  
  4. The manual version of this indicators allows you to set a specific expiration date and strikes

 ```
 
