def startBar = HighestAll(BarNumber()) - 30;
def endBar = HighestAll(BarNumber()) - 10;
def middleBar = (startBar + endBar) / 2;
def bottomPrice = 407;
def topPrice = 413;
def middlePrice = (topPrice + bottomPrice) / 2;

# Draw horizontal line (base of the triangle)
plot BottomLine = if BarNumber() >= startBar and BarNumber() <= endBar then topPrice else Double.NaN;
BottomLine.SetPaintingStrategy(PaintingStrategy.Line);
BottomLine.SetDefaultColor(color.green);
BottomLine.SetLineWeight(5);

plot Triangle2A = if BarNumber() >= startBar and BarNumber() <= middleBar then topPrice - (topPrice - middlePrice) * (BarNumber() - startBar) / (middleBar - startBar) else Double.NaN;
Triangle2A.SetPaintingStrategy(PaintingStrategy.Line);
Triangle2A.SetDefaultColor(color.green);
Triangle2A.SetLineWeight(5);

plot Triangle2B = if BarNumber() >= middleBar and BarNumber() <= endBar then middlePrice + (topPrice - middlePrice) * (BarNumber() - middleBar) / (endBar - middleBar) else Double.NaN;
Triangle2B.SetPaintingStrategy(PaintingStrategy.Line);
Triangle2B.SetDefaultColor(color.green);
Triangle2B.SetLineWeight(5);

addcloud(Triangle2B, BottomLine, color.magenta, color.magenta);
addcloud(Triangle2A, BottomLine, color.magenta, color.magenta);

#def startBar = HighestAll(BarNumber()) - 30;
#def endBar = HighestAll(BarNumber()) - 10;
def bottomPrice2 = 411;
def topPrice2 = 414;

# Draw horizontal line (base of the triangle)
plot BottomLine2 = if BarNumber() >= startBar and BarNumber() <= endBar then bottomPrice2 else Double.NaN;
BottomLine2.SetPaintingStrategy(PaintingStrategy.Line);
BottomLine2.SetDefaultColor(color.green);
BottomLine2.SetLineWeight(5);

# Draw inclined lines (sides of the triangle)
#def middleBar = (startBar + endBar) / 2;
plot LeftSide = if BarNumber() >= startBar and BarNumber() <= middleBar then bottomPrice2 + (topPrice2 - bottomPrice2) * (BarNumber() - startBar) / (middleBar - startBar) else Double.NaN;
LeftSide.SetPaintingStrategy(PaintingStrategy.Line);
LeftSide.SetDefaultColor(color.green);
LeftSide.SetLineWeight(5);

plot RightSide = if BarNumber() >= middleBar and BarNumber() <= endBar then topPrice2 - (topPrice2 - bottomPrice2) * (BarNumber() - middleBar) / (endBar - middleBar) else Double.NaN;
RightSide.SetPaintingStrategy(PaintingStrategy.Line);
RightSide.SetDefaultColor(color.green);
RightSide.SetLineWeight(5);

#def RightSide = if BarNumber() >= middleBar and BarNumber() <= endBar then topPrice2 - (topPrice2 - bottomPrice2) * (BarNumber() - middleBar) / (endBar - middleBar) else Double.NaN;

addcloud(RightSide, BottomLine2, color.magenta, color.magenta);
addcloud(LeftSide, BottomLine2, color.magenta, color.magenta);
