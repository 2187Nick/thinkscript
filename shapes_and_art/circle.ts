input centerPrice = 410;
input radius = 0.2;
input numberofbars_start = 40; # 40 bars from the right side of your chart.
input numberofbars_end = 10;  # 0 bars from the right side of your chart
def circleStartBar = HighestAll(BarNumber()) - numberofbars_start;
def circleEndBar = HighestAll(BarNumber()) - numberofbars_end;

def bar = BarNumber();
def angleStep = 360 / (circleEndBar - circleStartBar);
def angle = (bar - circleStartBar) * angleStep;

# plot points for full circle
def y = if bar >= circleStartBar and bar <= circleEndBar then centerPrice + radius * Sin(angle * Double.Pi / 360) else Double.NaN;
def y2 = if bar >= circleStartBar and bar <= circleEndBar then centerPrice - radius * Sin(angle * Double.Pi / 360) else Double.NaN;

#plot Circle = y;
#Circle.SetPaintingStrategy(PaintingStrategy.Line);
#Circle.SetDefaultColor(color.cyan);

#plot Circle2 = y2;
#Circle2.SetPaintingStrategy(PaintingStrategy.Line);
#Circle2.SetDefaultColor(color.cyan);

#AddCloud(Circle, Circle2, color.violet, color.violet);

AddChartBubble(bar >= circleStartBar and bar <= circleEndBar, y, "High", Color.green, yes);
AddChartBubble(bar >= circleStartBar and bar <= circleEndBar, y2, "Low", Color.red, no);

input radius2 = 0.1;
def circleStartBar2 = HighestAll(BarNumber()) - 30;
def circleEndBar2 = HighestAll(BarNumber()) - 10;

def angleStep2 = 360 / (circleEndBar2 - circleStartBar2);
def angle2 = (bar - circleStartBar2) * angleStep2;

# plot points for full circle
def y3 = if bar >= circleStartBar2 and bar <= circleEndBar2 then centerPrice + radius2 * Sin(angle2 * Double.Pi / 360) else Double.NaN;
def y4 = if bar >= circleStartBar2 and bar <= circleEndBar2 then centerPrice - radius2 * Sin(angle2 * Double.Pi / 360) else Double.NaN;

#plot Circle3 = y3;
#Circle3.SetPaintingStrategy(PaintingStrategy.Points);
#Circle3.SetDefaultColor(color.green);

#plot Circle4 = y4;
#Circle4.SetPaintingStrategy(PaintingStrategy.Points);
#Circle4.SetDefaultColor(color.green);

#(Circle3, Circle4, color.green, color.green);
