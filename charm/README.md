Coming Soon..


# Gamma Exposure (Naive)

This calculates Charm Exposure per passage of 1 day. (Might add a version that calculates based on passage of 1 hour.) Based on open interest.

(Currently it only works for option contracts in the current month.)

The Charm Exposure is displayed in millions.


######
######

Charm Exposure based on Open Interest:

    Option's Charm * Contract Size * Open Interest * Spot Price
    Total Charm Exposure = Call Charm Exposure - Put Charm Exposure????

Charm Exposure based on Live Volume:

    Option's Charm * Contract Size * Volume * Spot Price
    Total Charm Exposure = Call Charm Exposure - Put Charm Exposure????

![image](https://github.com/2187Nick/thinkscript/assets/75052782/0a8a52b9-c835-4582-a59c-84a66c891a04)

To install:

    # Click the Trade tab then All Products.
    # Enter SPY and press enter.
    # Click Layout then Customize.
    # Click the scroll icon next to one of the Custom indicators.
   ![image](https://github.com/2187Nick/thinkscript/assets/75052782/d5f08b70-562f-4aef-8669-40ea5524da58)

    # Give it a Column name: CharmX or CEX
    # Click thinkScript Editor
    # Paste the code. Select Apply and Ok.
    # Select the Add Items button. Then Ok and done. 
    
    **** Make sure D (Day) is selected. To the right of the column name.
   ![image](https://github.com/2187Nick/thinkscript/assets/75052782/ed16a9c6-db13-4070-9a17-1a39bbcf2f8e)



