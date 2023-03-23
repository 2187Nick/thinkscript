🚀 This plots unusual options live

Category: Option Volume

Designed for SPY and QQQ. (Use manual version for any other instrument)

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
  3.  Roundup: No;  (Set this to "Yes" if you want to adjust the range monitored to higher strikes)
  
  Manual Version:
  1. Option series yymmdd: 221125; (Enter the specific expiration date you want to monitor)


 ```


> 🧪 How this works: 

```bash

  1. This takes the 1 min volume of each option strike and multiplies it by the option price.
  
  2. If the $ value of the above is greater than $200k then a bubble will appear on the strike line. (Green = Calls. Red = Puts).
  
  3. The option expiration date is automatically set to the current day.(Ideal for SPY and QQQ)
  
  4. The manual version of these indicators allows you to set a specific expiration date.

 ```
 
> 🦖 How to use this(layman description):
```bash

  1. Allows you to monitor for unusual option trades.
  2. Gives you the ability to view the flow of options trades.
  
  Warning: Thinkorswim doesnt let us know if the options are being bought or sold.
       
```
