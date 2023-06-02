# Gamma Exposure (Naive)

This calculates gex per 1% move in the underlying asset.

(Currently it only works for weekly option contracts in the current month.)

The GEX is displayed in millions.


######
######

GEX based on Open Interest:

    Option's Gamma * Contract Size * Open Interest * Spot Price ^2 * .01
    Total GEX = Call GEX - Put GEX

GEX based on Live Volume:

    Option's Gamma * Contract Size * Volume * Spot Price ^2 * .01
    Total GEX = Call GEX - Put GEX
    
![image](https://github.com/2187Nick/thinkscript/assets/75052782/d5ae03c2-86fe-41b0-9a3a-10815b4b2fe5)

