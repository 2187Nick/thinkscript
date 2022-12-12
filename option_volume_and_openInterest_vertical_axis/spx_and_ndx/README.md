🚀 This plots the current day's live option volume and plots the open interest total(from yesterday's close).

Category: Option Volume/Open Interest


<img src="https://user-images.githubusercontent.com/75052782/207080966-65f7967e-07d9-4a3a-a3c6-bee5139022a3.png" width="450" height="800">

Designed for SPX and NDX

> Chart requirements for optimal use:
```bash

  Time frame: 1 Day

  Aggregation Period: 1 Minute
  
  For SPX add these indicators to /ES chart. For NDX add these indicators to /NQ chart.
  
  Time Axis: Expansion Area: 200 bars to the right
  
```




> Settings 👷‍:

```bash

  1. Strike Spacing: 5;  (This sets the space between strikes. Ex: Current SPX price is 4000. It will monitor calls
     and puts at strikes 3990, 3995, 4000, 4005 and 4010)
  2. Symbol: SPXW; (Use NDXP for NDX options)
  3. Roundup: No;  (Set this to "Yes" if you want to adjust the range monitored to higher strikes)
  4. Shift line right: 10; (This controls where the vertical line will plot on your chart. Larger # pushes it to the right)
  5. Division: 100; (The volume or open interest is divided by this number. Gives user adjustability depending on chart size)
  6. Space: 0.5; (This sets the space between the call and put bars)
  
  Manual Version:
  1. Option series yymmdd: 221226; (Enter the specific expiration date you want to monitor)


 ```


> 🧪 How this works: 

```bash

  1. Volume: Plots the live option volume for each strike.
  
  2. Open Interest: Plots the open interest as of the previous day's close.
  
  3. The option expiration date is automatically set to the current day.(Ideal for SPY and QQQ)
  
  4. The manual version of these indicators allows you to set a specific expiration date.

 ```
 
> 🦖 How to use this(layman description):
```bash

  1. Large one sided open interest levels. When there is a strike with large call open interest compared to put open interest.
     Its possible that dealers are at risk if the equity price starts moving towards that strike.
     a. The dealer previously sold the calls to a trader to collect the premium. The dealer has to protect his position.
     b. As the equity price moves towards this strike price(call option value increases) the dealer would have to buy the equity.
     c. This dynamic can cause these strike levels to act like a magnet. Possible pinning effect.
     d. If the equity price moves above this strike and the dealer doesnt have exposure at higher strikes. 
        Then the dealer doesnt need to continue buying. Which could allow the price to fall back to the strike.
       
```
