def startBar = HighestAll(BarNumber()) - 30;
def endBar = HighestAll(BarNumber()) - 10;
def bottomPrice = 410;
def topPrice = 413;

# Draw horizontal line (base of the triangle)
plot BottomLine = if BarNumber() >= startBar and BarNumber() <= endBar then bottomPrice else Double.NaN;
BottomLine.SetPaintingStrategy(PaintingStrategy.Line);
BottomLine.SetDefaultColor(color.green);
BottomLine.SetLineWeight(5);

# Draw inclined lines (sides of the triangle)
def middleBar = (startBar + endBar) / 2;
plot LeftSide = if BarNumber() >= startBar and BarNumber() <= middleBar then bottomPrice + (topPrice - bottomPrice) * (BarNumber() - startBar) / (middleBar - startBar) else Double.NaN;
LeftSide.SetPaintingStrategy(PaintingStrategy.Line);
LeftSide.SetDefaultColor(color.green);
LeftSide.SetLineWeight(5);

plot RightSide = if BarNumber() >= middleBar and BarNumber() <= endBar then topPrice - (topPrice - bottomPrice) * (BarNumber() - middleBar) / (endBar - middleBar) else Double.NaN;
RightSide.SetPaintingStrategy(PaintingStrategy.Line);
RightSide.SetDefaultColor(color.green);
RightSide.SetLineWeight(5);
