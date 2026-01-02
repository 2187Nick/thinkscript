# Gamma Exposure (Naive)

## Update Jan 2, 2026. If the indicators are not working:
```
Turn off "Show Extended-Hours Trading Session"
```
This calculates gex per $1 move in the underlying asset. Based on open interest.

It automatically selects todays date for the option contract. 
To change the contract date set ManuallySetExpiration to "true" and type in the date you want.

The GEX is displayed in millions.

![image](https://github.com/2187Nick/thinkscript/assets/75052782/12cbb105-9158-4b49-beb0-d4ecb3774ba6)

# Only bubbles Version
![image](https://github.com/2187Nick/thinkscript/assets/75052782/cb529cc3-8825-4efa-8ded-9fb833c6ebb0)


# Chart Settings:
* Make sure Time Axis/Expansion Area is not 0. Use 10+.

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
