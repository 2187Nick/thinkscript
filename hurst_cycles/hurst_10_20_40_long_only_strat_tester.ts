# FLD Cross 10,20 and 40 Day Cycles Strategy Tester Long Only
# @2187Nick
# Use aggregation period: Day. Extended hours on.
declare upper;
declare once_per_bar;
input cycle = {default "TenDay", "TwentyDay", "FortyDay"};
def lookback = if cycle < 1 then 7 else if cycle > 0 and cycle < 2 then 12 else 25;
def displace = if cycle < 1 then 4 else if cycle > 0 and cycle < 2 then 9 else 18; #8
def line_color = if cycle < 1 then 5 else if cycle > 0 and cycle < 2 then 0 else 6;

def currentBarNumber = if !IsNaN(close) then BarNumber() else Double.NaN;
def lastBarNumber = HighestAll(currentBarNumber);
def lookbackBar = lastBarNumber - lookback + 1;

def highest = highest(high,lookback);
def lowest = lowest(low,lookback);

def mostRecentHigh = highest(high,lookback);
def highBarNumber  = CompoundValue(1, if high > mostRecentHigh[1] then currentBarNumber else highBarNumber[1], 0);

def mostRecentLow = lowest(low,lookback);
def lowBarNumber  = CompoundValue(1, if low < mostRecentLow[1] then currentBarNumber else lowBarNumber[1], 0);

#Plots a bubble showing where lookback bar is. 
AddChartBubble(currentBarNumber == lookbackBar, (high + low) / 2, lookback + "\nBar", Color.GRAY, yes);

def DailySMA2 = Average(Fundamental(FundamentalType.HL2, period = AggregationPeriod.DAY)[displace], 1);
plot sma2 = DailySMA2;
sma2.SetDefaultColor(GetColor(line_color));
sma2.SetLineWeight(3);

# Find which ones is the lowest and we measure from there.
#def crossdownlevel = if DailySMA2 <= DailySMA2[1] then DailySMA2 else DailySMA2[1];
def crossdownlevel = (DailySMA2 + DailySMA2[1]) / 2;
# Distance from cycle high to the fld level
def crossdownTGT1 = crossdownlevel - 0.5 * (mostRecentHigh - crossdownlevel);
def crossdownTGT2 = crossdownlevel - (mostRecentHigh - crossdownlevel);

# Check if price crossed the fld level this period
def didwecrossdown = if close[1] > DailySMA2[1] and close < DailySMA2 then crossdownTGT1 else 0;

def doPlot1 = 1;
def crossdown_target1  = CompoundValue(1, if doPlot1 && close < DailySMA2 and didwecrossdown then crossdownTGT1 else crossdown_target1[1], Double.NaN);
def crossdown_target2  = CompoundValue(1, if doPlot1 && close < DailySMA2 and didwecrossdown then crossdownTGT2 else crossdown_target2[1], Double.NaN);
plot crossdownTarget1 = if close < DailySMA2 and crossdown_target1 < DailySMA2 then crossdown_target1 else Double.NaN;
crossdownTarget1.SetDefaultColor(Color.VIOLET);

AddLabel(close < DailySMA2 and close > crossdown_target2, "Target1: " +  Round(crossdown_target1, 1), Color.RED);
AddLabel(close < DailySMA2 and close > crossdown_target2, "Target2: " + Round(crossdown_target2, 1) , Color.RED);
plot crossdownTarget2 = if close < DailySMA2 and crossdown_target1  < DailySMA2 then crossdown_target2 else Double.NaN;
crossdownTarget2.SetDefaultColor(Color.VIOLET);
AddCloud(crossdownTarget2, crossdownTarget1, Color.RED, Color.RED);

def crossuplevel = (DailySMA2 + DailySMA2[1]) / 2;
def crossupTGT1 = 0.5 * (crossuplevel - mostRecentLow) + crossuplevel;
def crossupTGT2 = (crossuplevel - mostRecentLow) + crossuplevel;

# Check if price crossed the fld level this period
def didwecrossup = if close[1] < DailySMA2[1] and close > DailySMA2 then crossupTGT1 else 0;

def crossup_target1  = CompoundValue(1, if doPlot1 && close > DailySMA2 and didwecrossup then crossupTGT1 else crossup_target1[1], Double.NaN);
def crossup_target2  = CompoundValue(1, if doPlot1 && close > DailySMA2 and didwecrossup then crossupTGT2 else crossup_target2[1], Double.NaN);

plot crossupTarget1 = if close > DailySMA2 and crossup_target1 > DailySMA2 then crossup_target1 else Double.NaN;
crossupTarget1.SetDefaultColor(Color.BLUE);

AddLabel(close > DailySMA2 and close < crossup_target2, "Target1: " +  Round(crossup_target1, 1), Color.GREEN);
AddLabel(close > DailySMA2 and close < crossup_target2, "Target2: " + Round(crossup_target2, 1), Color.GREEN);
plot crossupTarget2 = if close > DailySMA2 and crossup_target1 > DailySMA2  then crossup_target2 else Double.NaN;
crossupTarget2.SetDefaultColor(Color.BLUE);

AddCloud(crossupTarget2, crossupTarget1, Color.GREEN, Color.GREEN);

addOrder(OrderType.BUY_TO_OPEN, didwecrossup, close, 100, Color.green, color.green,  "Buy To Open");
addOrder(OrderType.SELL_TO_CLOSE, close >= crossupTarget1, close, 1, Color.green, color.green,  "Sell To Close");
addOrder(OrderType.SELL_TO_CLOSE, high >= crossupTarget1, close, 1, Color.green, color.green,  "Sell To Close");
addOrder(OrderType.SELL_TO_CLOSE, close <= DailySMA2, close, 1, Color.green, color.green,  "Sell To Close");
#addOrder(OrderType.SELL_TO_CLOSE, open <= DailySMA2, close, 1, Color.green, color.green,  "Sell To Close");
#addOrder(OrderType.SELL_TO_CLOSE, low <= DailySMA2, close, 1, Color.green, color.green,  "Sell To Close");

#addOrder(OrderType.SELL_TO_OPEN, didwecrossdown, tickColor = GetColor(6), arrowColor = GetColor(6));
#addOrder(OrderType.SELL_TO_OPEN, didwecrossdown, close, 100, Color.red, color.red,  "Sell To Open");
#addOrder(OrderType.BUY_TO_CLOSE, close <= crossdownTarget1 or close > DailySMA2, close, 1, Color.red, color.red,  "Buy To Close");
