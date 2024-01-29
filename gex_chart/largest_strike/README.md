# Plots Strike with Largest Gamma Exposure (For that Expiration)

This calculates gex per $1 move in the underlying asset. Based on open interest.

It automatically selects todays date for the option contract. 
To change the contract date set ManuallySetExpiration to "true" and type in the date you want.

![image](https://github.com/2187Nick/thinkscript/assets/75052782/34d69d2e-e034-4398-9474-0c589d4480d1)

### SPX Number 1 GEX Strike on ES Chart
![image](https://github.com/2187Nick/thinkscript/assets/75052782/c6c25c7e-a78b-4470-96dc-666e639e138a)



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
