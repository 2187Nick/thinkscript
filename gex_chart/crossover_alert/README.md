# Gamma Exposure with Crossover Alerts

This gives an alert when the largest gex level changes.

It automatically selects todays date for the option contract. 
To change the contract date set ManuallySetExpiration to "true" and type in the date you want.


The GEX is displayed in millions.

![image](https://github.com/2187Nick/thinkscript/assets/75052782/39a0976c-2c02-440c-8dce-be982c46abc8)



> Chart requirements for optimal use:
```bash

  Time frame: 1 Day

  Aggregation Period: 1 Minute
  
```

######
######

GEX based on Open Interest:

    Option's Gamma * Contract Size * Open Interest * Spot Price
    Total GEX = Call GEX - Put GEX

######
######

> 🦖  How to use this(layman description):
```bash

  1. Large Gamma Exposure strikes can act like a magnet for price.
  2. Gamma increases when price is near the strike.
       
```
