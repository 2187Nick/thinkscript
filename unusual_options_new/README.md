## 🚀 This plots unusual options live. *** Updated Feb 9, 2024

Category: Option Volume

*** The default setting only shows 10 strikes. Adjust the "Strikes" setting to see more than 10 strikes.

![2023-03-23-TOS_CHARTS_2](https://user-images.githubusercontent.com/75052782/227285731-0b805b9a-704c-462f-8780-d08926980c08.png)

## /ES Version. Automatically selects 0dte contract
![image](https://github.com/2187Nick/thinkscript/assets/75052782/25fee2da-6c91-4517-befe-bf9862f69233)


New Features:
1. Set number of strikes to view
2. Ability to manually set expiration date
3. Should run much faster

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
  3. Strikes: 0; (Default is 0. Select up to 20. This will give 40 strikes total)
  4. Roundup: No;  (Set this to "Yes" if you want to adjust the range monitored to higher strikes)
  5. Manually Set Expiration = false; (Default this selects current day. Which is good for SPY and QQQ)
        A. Set this to true and then set the Expiration in #6.
  6. Expiration_YYMMDD = 230616;


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
