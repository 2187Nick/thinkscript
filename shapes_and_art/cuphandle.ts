input centerPrice = 410;
input radius = 1;
input numberofbars_start_cup = 40; # 40 bars from the right side of your chart.
input numberofbars_end_cup = 10;  # 0 bars from the right side of your chart
def circleStartBar = HighestAll(BarNumber()) - numberofbars_start_cup;
def circleEndBar = HighestAll(BarNumber()) - numberofbars_end_cup;

def bar = BarNumber();
def angleStep = 360 / (circleEndBar - circleStartBar);
def angle = (bar - circleStartBar) * angleStep;

# plot points for full circle
def y = if bar >= circleStartBar and bar <= circleEndBar then centerPrice + radius * Sin(angle * Double.Pi / 360) else Double.NaN;
def cup = if bar >= circleStartBar and bar <= circleEndBar then centerPrice - radius * Sin(angle * Double.Pi / 360) else Double.NaN;

input numberofbars_start_handle = 10; # 40 bars from the right side of your chart.
input numberofbars_end_handle = 3;  # 0 bars from the right side of your chart
def circleStartBar2 = HighestAll(BarNumber()) - numberofbars_start_handle;
def circleEndBar2 = HighestAll(BarNumber()) - numberofbars_end_handle;
def radius_handle = .2;

def angleStep2 = 360 / (circleEndBar2 - circleStartBar2);
def angle2 = (bar - circleStartBar2) * angleStep2;

def handle = if bar >= circleStartBar2 and bar <= circleEndBar2 then centerPrice - radius_handle * Sin(angle2 * Double.Pi / 360) else Double.NaN;

#plot Circle = y;
#Circle.SetPaintingStrategy(PaintingStrategy.Line);
#Circle.SetDefaultColor(color.cyan);

#plot Circle2 = cup;
#Circle2.SetPaintingStrategy(PaintingStrategy.Line);
#Circle2.SetDefaultColor(color.magenta);
#Circle2.SetLineWeight(5);

#AddCloud(Circle, Circle2, color.violet, color.violet);

#AddChartBubble(bar >= circleStartBar and bar <= circleEndBar, y, "Sun", Color.green, yes);
AddChartBubble(bar >= circleStartBar and bar <= circleEndBar, cup, "Cup", Color.red, no);
AddChartBubble(bar >= circleStartBar2+1 and bar <= circleEndBar2, handle, "Handle", Color.yellow, no);

#plot Circle3 = handle;
#Circle3.SetPaintingStrategy(PaintingStrategy.Line);
#Circle3.SetDefaultColor(color.yellow);
