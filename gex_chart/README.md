# Gamma Exposure (Naive)

This calculates gex per $1 move in the underlying asset. Based on open interest.

Currently setup for SPY and QQQ 0dte contract only.

The GEX is displayed in millions.

![image](https://github.com/2187Nick/thinkscript/assets/75052782/12cbb105-9158-4b49-beb0-d4ecb3774ba6)



######
######

GEX based on Open Interest:

    Option's Gamma * Contract Size * Open Interest * Spot Price
    Total GEX = Call GEX - Put GEX
