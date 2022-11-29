# 🚀 This attempts to plot the Hurst cycle and display the next cycle peak or trough range.

Category: Cycles

To learn more follow the current Hurst Cycles Experts:

https://twitter.com/SentientTrader

https://twitter.com/TradingHurst

<img src="https://user-images.githubusercontent.com/75052782/204443062-7849dd11-9528-4823-9a11-34652f346a6f.png" width="1000" height="750">

> Chart requirements for optimal use:
```bash

  Time frame: Check the notes at the top of each indicator.

  Aggregation Period: Check the notes at the top of each indicator.
  
  Note: This does only displays in the lookback range.
```




> Settings 👷‍:

```bash

Upper:
  1. Lookback: 48;  (This defaults to the current ES cycle length. Adjust as desired.)

 ```




> 🧪 How this works(Most Basic Version): 

![spy_hurst1](https://user-images.githubusercontent.com/75052782/204617147-2ac20707-0721-41fa-a070-24118aca21c0.png)

# Shift the price graph forward in time by half the length of the average cycle.

![spy_hurst3](https://user-images.githubusercontent.com/75052782/204618239-95b0cd04-0cab-4542-85f8-81f9ec80af49.png)
# Measure the distance from the cycle low up to where the graphs intersect. This gives us the potential magnitude of the cycle peak.

```bash

   1. Husrt indentified common cycles and their average wave length.
  
      A. David Hickson(Sentient Trader) extended Hurst model to include more common cycles at different time frames
    
      B. These indicators will use the common wave lengths they identified.
    
   2. When price crosses the projection line the script measures the distance of the price movement. It then adds that amount to the
      current price(or subtracts if we are starting a down cycle).  
   
   3. 50% of the cycle magnitude is used as target 1 and target 2 is the full magnitude.
   
   4. The chart will display this range highlighted in green or red.
   
   Note: Different instruments have different wave lengths. Feel free to dig into Hurst material for more details.
   
 ```
 
> 🦖 Why this works:
```bash
1 Theory:  

```

> 🐰 Down the Rabbit Hole 🐇:

Hurst analyzed price data using Fourier and spectral analysis.

Intro to the Fourier Series and Joseph Fourier:

https://www.youtube.com/playlist?list=PLWMUMyAolbNuWse5uM3HBwkrJEVsWOLd6
