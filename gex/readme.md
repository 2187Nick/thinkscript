# Gamma Exposure (Naive)

This calculates gex per $1 move in the underlying asset. Based on open interest.

(Currently it only works for option contracts in the current month.)

The GEX is displayed in millions.


######
######

GEX:

    Option's Gamma * Contract Size * Open Interest * Spot Price * (-1 if puts)

GEX Live Volume:

    Option's Gamma * Contract Size * Volume * Spot Price * (-1 if puts)


![image](https://github.com/2187Nick/thinkscript/assets/75052782/f10f65f1-8cd4-4dbc-a9e5-1eda8039c3da)

To install:

    # Click the Trade tab then All Products.
    # Enter SPY and press enter.
    # Click Layout then Customize.
    # Click the scroll icon next to one of the Custom indicators.
   ![image](https://github.com/2187Nick/thinkscript/assets/75052782/d5f08b70-562f-4aef-8669-40ea5524da58)

    # Give it a name Column name: GEX
    # Click thinkScript Editor
    # Paste the code. Select Apply and Ok.
    # Select the Add Items button. Then Ok and done. 
   ![image](https://github.com/2187Nick/thinkscript/assets/75052782/ed16a9c6-db13-4070-9a17-1a39bbcf2f8e)


