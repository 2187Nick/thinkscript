🚀 This plots unusual options live. *** Decenber 29, 2023

Category: Option Volume

Add both inidicators to the same SPY chart. It will display SPX and SPY large option trades.

![image](https://github.com/2187Nick/thinkscript/assets/75052782/eb67f131-880a-4533-aa26-91a2575ce3d7)


> Chart requirements for optimal use:
```bash

  Time frame: 1 Day

  Aggregation Period: 1 Minute
  
```




> Settings 👷‍:

```bash

  1. Strike Spacing: 1;  (This sets the space between strikes. Ex: Current SPY price is 400. It will monitor calls
     and puts at strikes 398, 399, 400, 401 and 402)
  2. Trade Size Dollar: 200000; (This sets the minimum trade size. 1min option volume * price.)
  3. Strikes: 4; (Default is 0. Select up to 20. This will give 40 strikes total)

  Optional:
  4. Manually Set Expiration = false; (Default this selects current day. Which is good for SPY and QQQ)
        A. Set this to true and then set the Expiration in #6.
  5. Expiration_YYMMDD = 230616;


 ```


> 🧪 How this works: 

```bash

  1. This takes the 1 min volume of each option strike and multiplies it by the option price.
  
  2. If the SPY option trade $ value is greater than $200k then a bubble will appear on the strike line. (Green = Calls. Red = Puts).

  3. If the SPX option trade $ value is greater than $500k then a bubble will appear on the strike line. (Cyan = Calls. Orange = Puts).
  
  3. The option expiration date is automatically set to the current day.
  
  4. The manual version of these indicators allows you to set a specific expiration date.

 ```
 
> 🦖 How to use this(layman description):
```bash

  1. Allows you to monitor for unusual option trades.
  2. Gives you the ability to view the flow of options trades.
  
  Warning: Thinkorswim doesnt let us know if the options are being bought or sold.
       
```
