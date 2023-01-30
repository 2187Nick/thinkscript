🚀 This monitors for large changes in option volume.

Category: Option Volume
![image](https://user-images.githubusercontent.com/75052782/215549096-40627ceb-3cf6-4635-b49c-2b422b92bfa2.png)

Designed for SPY and QQQ.

> Chart requirements for optimal use:
```bash

  Time frame: Any

  Note: This does work on a historical look back.
```


> Settings 👷‍:

```bash

Upper:
  1. Strike Spacing: 1;  (This sets the space between strikes. Ex: Current SPY price is 400. It will monitor calls
     and puts at strikes 398, 399, 400, 401 and 402)
  2. Percent Minimum: 1000; (1000% increase in volume. Adjust this to your level of interest)

 ```



> 🧪 How this works: 

```bash

   Monitors the volume for each strike. Then compares the current period vs the previous period.
   
   A chart bubble will appear at the strike line and stay permanently. Useful for historical lookback.
   
   Labels will appear at the top of the chart only for the current period. Showing the % increase and strike if it meets your minimum. 
   
   
 ```
 
> 🦖 Why this works:
```bash
1 Theory:
  
  Large increase in option volume could give some insight into how market participants are positioning.

  Warning: It is not known if the options are bought or sold.

```
