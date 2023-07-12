# Gamma Exposure (Naive)

This calculates gex per $1 move in the underlying asset. Based on open interest.

Currently setup for SPY and QQQ 0dte contract only.

The GEX is displayed in millions.


######
######

GEX based on Open Interest:

    Option's Gamma * Contract Size * Open Interest * Spot Price
    Total GEX = Call GEX - Put GEX
