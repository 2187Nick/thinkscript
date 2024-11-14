# Gamma Exposure (Naive) Multiple Expirations Accumulated

This calculates gex per $1 move in the underlying asset. Based on open interest.

This version allows you to combine multiple expirations.

Currently it will combine the gex per strike for expirations within the next 7 days(including weekends).

Adjust the input: "Number of Days" to control expirations combined.

Only works with SPY and QQQ for now.

It automatically selects todays date for the option contract. 
To change the contract date set ManuallySetExpiration to "true" and type in the date you want.

The GEX is displayed in millions.
![image](https://github.com/user-attachments/assets/c0b5a45a-6b61-4e8f-9e85-b3b546b4e122)

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
