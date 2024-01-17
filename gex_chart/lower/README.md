# Gamma Exposure (Naive)

This calculates gex per $1 move in the underlying asset. Based on open interest.

It automatically selects todays date for the option contract. 
To change the contract date set ManuallySetExpiration to "true" and type in the date you want.

The GEX is displayed in millions.

![image](https://github.com/2187Nick/thinkscript/assets/75052782/9827478c-9eeb-4a5d-8a73-fb8c4f22bcd2)


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
