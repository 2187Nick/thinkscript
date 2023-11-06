🚀 This plots the current day's live option volume and plots the open interest total(from yesterday's close).

Category: Option Volume/Open Interest

![image](https://github.com/2187Nick/thinkscript/assets/75052782/373c8362-8aaf-4fe9-b451-6eac606c04df)


Designed for ES and NQ. (Should work for any Futures Contract on the CME)

> Chart requirements for optimal use:
```bash

  Time frame: 1 Day

  Aggregation Period: 1 Minute
  
  Time Axis: Expansion Area: 200 bars to the right
  
```




> Settings 👷‍:

```bash

  1. Symbol: /EW3X23; (You have to manually enter the contract symbol)
  1. Strike Spacing: 5.0;  (This sets the space between strikes. Ex: Current /ES price is 4000. It will monitor calls
     and puts at strikes 3990, 3995, 4000, 4005 and 4010)
  2. Roundup: No;  (Set this to "Yes" if you want to adjust the range monitored to higher strikes)
  3. Shift line right: 10; (This controls where the vertical line will plot on your chart. Larger # pushes it to the right)
  4. Division: 1000; (The volume or open interest is divided by this number. Gives user adjustability depending on chart size)
  5. Space: 0.05; (This sets the space between the call and put bars)
  


 ```


> 🧪 How this works: 

```bash

  1. Volume: Plots the live option volume for each strike.
  
  2. Open Interest: Plots the open interest as of the previous day's close.


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
