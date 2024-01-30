# Vanna Exposure (Naive)

This calculates Vex per 1% move in the underlying volatility. Based on open interest.

(Currently it only works for option contracts in the current month.)

The VEX is displayed in millions.

VEX based on Open Interest.

Vanna Exposure = Open Interest * Contract Size * Vanna * Spot Price * Underlying Volatility

Total VEX = Call VEX + Put VEX

![image](https://github.com/revelldd/thinkscript/assets/158004168/7a2857be-f690-46ff-91de-d64e32a60cb3)

To install:
  - Click the Trade tab then All Products.
  - Enter SPY and press enter.
  - Click Layout then Customize.
  - Click the scroll icon next to one of the Custom indicators.

![image](https://github.com/revelldd/thinkscript/assets/158004168/e892bba4-ed2b-4c2b-80f4-57abd071079a)

- Give it a name Column name: VEX
- Click thinkScript Editor
- Paste the code. Select Apply and Ok.
- Select the Add Items button. Then Ok and done. 

**** Make sure D (Day) is selected. To the right of the column name.

![image](https://github.com/revelldd/thinkscript/assets/158004168/352debd1-8eb1-451e-be6d-fd95e6eece6b)

![image](https://github.com/2187Nick/thinkscript/assets/75052782/38a6b673-2780-4e1c-a9dd-85299ee37754)
