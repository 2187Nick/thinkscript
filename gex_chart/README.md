# Gamma Exposure (Naive)

This calculates gex per $1 move in the underlying asset. Based on open interest.

It automatically selects todays date for the option contract. 
To change the contract date set ManuallySetExpiration to "true" and type in the date you want.

*** The default setting only shows 1 strike. Adjust the "Strikes" setting to see more than 1 strike.

The GEX is displayed in millions.

![image](https://github.com/2187Nick/thinkscript/assets/75052782/12cbb105-9158-4b49-beb0-d4ecb3774ba6)


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
