# Gamma Exposure (Naive) Live Volume

This calculates gex per $1 move in the underlying asset. Based on volume.

Created upon request. Not sure if this indicator has any value yet. 

It automatically selects todays date for the option contract. 
To change the contract date set ManuallySetExpiration to "true" and type in the date you want.

The GEX is displayed in Thousands.

![image](https://github.com/2187Nick/thinkscript/assets/75052782/d3c2d8ce-5d5a-45f8-be58-68824f705cd7)



> Chart requirements for optimal use:
```bash

  Time frame: 1 Day

  Aggregation Period: 1 Minute
  
```

######
######

GEX based on Volume:

    Option's Gamma * Contract Size * Volume * Spot Price
    Total GEX = Call GEX - Put GEX

######
######

> 🦖  How to use this(layman description):
```bash

  1. To be determined
       
```
