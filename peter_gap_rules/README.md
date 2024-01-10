# Peter Gap Rules Experimental

This monitors for rare gap plays on SPY. Must use on 30min Chart with Extended hours turned off.
The code is not finished. Dont trust the Bubbles on the chart, they repaint and are always wrong.

######
######

![image](https://github.com/2187Nick/thinkscript/assets/75052782/3e0d386c-0cae-48a5-b6da-590c24a289c2)


> Chart requirements for optimal use:
```bash

  Aggregation Period: 30 Minute

  Extended hours turned off
  
```

######
######
Peter Gap Rule #1. If we are in an "UP" cycle on 30min and Daily.

    1. Price gaps down. Atleast $1.
    2. Opening Market breadth is roughly not less than -1500
    There is potential for the gap to fill.
    
######
######
Peter Gap Rule #2. If we are in an "UP" cycle on 30min and Daily.

    1. Price gaps up. Atleast $2.
    2. MarketForecast breadth is roughly greater than 1200.
    Potential for Low of day in the 1st hour. High of day after 200pm EST.

######
######
Peter Gap Rule #3. If we are in a "DOWN" cycle on 30min and Daily.

    1. Price gaps up. Atleast $1.
    2. Opening Market breadth is roughly less than 1500.
    There is potential for the gap to fill.

######
######
Peter Gap Rule #4. If we are in an "DOWN" cycle on 30min and Daily.

    1. Price gaps down. Atleast $2.
    2. MarketForecast breadth is roughly -1200 or lower.
    Potential for High of day in the 1st hour. Low of day after 200pm EST.


> 🦖  How to use this(layman description):
```bash

  1. Peter Magic.
       
```

