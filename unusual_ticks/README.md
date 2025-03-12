## 🚀 This plots unusual trades

Category: Option/Stock/Futures Volume


## Unusual Option Trade
![image](https://github.com/user-attachments/assets/b55f8db3-3174-436b-bfec-4a980bb91c5c)


## Unusual Stock Trade
![image](https://github.com/user-attachments/assets/c07af788-d7ff-4ba5-a87d-d7147fe28a3d)



> Chart requirements for optimal use:
```bash

  Time Interval: 1 Day
  Aggregation Period: 1 Tick
  
```




> Settings 👷‍:

```bash

  1. Volume Theshold: 100; (This sets the minimum volume size. 1 tick volume)
  2. Dollar Theshold: 10000; (This sets the minimum trade size. 1 tick volume and tick price)



 ```


> 🧪 How this works: 

```bash

  1. This takes the each tick volume and multiplies it by the price.
  
  2. If the $ value of the above is greater than dollar threshold then a bubble will appear. (Green = Potentially Bought. Red = Potentially Sold).
  
  3. If the tick volume  is greater than volume threshold then a bubble will appear. (Green = Potentially Bought. Red = Potentially Sold).
  

 ```
 
> 🦖 How to use this(layman description):
```bash

  1. Allows you to monitor for unusual trades and we guess if it was bought or sold
  2. If current tick is higher than previous tick = Buy
  3. If current tick is lower than previous tick = Sell
  
  
       
```
