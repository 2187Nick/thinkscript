def startBar = HighestAll(BarNumber()) - 20; # -30
def endBar = HighestAll(BarNumber()) - 0;  #- 10
def middleBar = Round((startBar + endBar) / 2, 0);
def bottomPrice = 405;
def topPrice = 415;

# Draw outer triangle
plot TriangleA = if BarNumber() >= startBar and BarNumber() <= middleBar then bottomPrice + (topPrice - bottomPrice) * (BarNumber() - startBar) / (middleBar - startBar) else Double.NaN;
TriangleA.SetPaintingStrategy(PaintingStrategy.line);
TriangleA.SetDefaultColor(color.red);
TriangleA.SetLineWeight(3);

plot TriangleB = if BarNumber() >= middleBar and BarNumber() <= endBar then topPrice - (topPrice - bottomPrice) * (BarNumber() - middleBar) / (endBar - middleBar) else Double.NaN;
TriangleB.SetPaintingStrategy(PaintingStrategy.line);
TriangleB.SetDefaultColor(color.red);
TriangleB.SetLineWeight(3);

# Draw horizontal line (base of the triangle)
plot BottomLine = if BarNumber() >= startBar and BarNumber() <= endBar then bottomPrice else Double.NaN;
BottomLine.SetPaintingStrategy(PaintingStrategy.Line);
BottomLine.SetDefaultColor(color.red);
BottomLine.SetLineWeight(3);

# Draw inner upside-down triangle
def innerStartBar = startBar + (endBar - startBar) / 4;
def innerEndBar = endBar - (endBar - startBar) / 4;
def innerMiddleBar = Round((innerStartBar + innerEndBar) / 2, 0);
def innerBottomPrice = bottomPrice + (topPrice - bottomPrice) / 2;
def innerTopPrice = innerBottomPrice - (topPrice - bottomPrice) / 2;

plot InnerTriangleA = if BarNumber() >= innerStartBar and BarNumber() <= innerMiddleBar then innerBottomPrice - (innerBottomPrice - innerTopPrice) * (BarNumber() - innerStartBar) / (innerMiddleBar - innerStartBar) else Double.NaN;
InnerTriangleA.SetPaintingStrategy(PaintingStrategy.line);
InnerTriangleA.SetDefaultColor(color.red);
InnerTriangleA.SetLineWeight(3);

plot InnerTriangleB = if BarNumber() >= innerMiddleBar and BarNumber() <= innerEndBar then innerTopPrice + (innerBottomPrice - innerTopPrice) * (BarNumber() - innerMiddleBar) / (innerEndBar - innerMiddleBar) else Double.NaN;
InnerTriangleB.SetPaintingStrategy(PaintingStrategy.line);
InnerTriangleB.SetDefaultColor(color.red);
InnerTriangleB.SetLineWeight(3);

# Draw horizontal line (base of the triangle)
plot BottomLine2 = if BarNumber() >= innerStartBar and BarNumber() <= innerEndBar then innerBottomPrice else Double.NaN;
BottomLine2.SetPaintingStrategy(PaintingStrategy.Line);
BottomLine2.SetDefaultColor(color.red);
BottomLine2.SetLineWeight(3);

# ... previous code here ...

# Define properties for the top triangle
def bottomRightTriangleStartBar = middleBar;
#(yes, "bottomRightTriangleStartBar: " + bottomRightTriangleStartBar, color.white);
#addverticalline(barNumber()== bottomRightTriangleStartBar, "",color.white);
def bottomRightTriangleEndBar = endBar;
#addlabel(yes, "bottomRightTriangleEndBar: " + bottomRightTriangleEndBar, color.green);
#addverticalline(barNumber()== bottomRightTriangleEndBar, "",color.green);
def bottomRightTriangleMiddleBar = Round((bottomRightTriangleStartBar + bottomRightTriangleEndBar) / 2, 0);
#addlabel(yes, "bottomRightTriangleMiddleBar: " + bottomRightTriangleMiddleBar, color.yellow);
#addverticalline(barNumber()== bottomRightTriangleMiddleBar, "",color.yellow);
def bottomRightTriangleBottomPrice = 408.75; #412; #topPrice;
#addlabel(yes, "bottomRightTriangleBottomPrice: " + bottomRightTriangleBottomPrice);
def bottomRightTriangleTopPrice = 405; #bottomPrice + (topPrice - bottomPrice) / 2;
#addlabel(yes, "bottomRightTriangleTopPrice: " + bottomRightTriangleTopPrice);

def bottomRightTriangleStartBar2 = Round((bottomRightTriangleStartBar + bottomRightTriangleEndBar) / 2, 0);


# Draw additional upside-down triangle in the top triangle
def bottomRightTriangleInnerStartBar = bottomRightTriangleStartBar + (bottomRightTriangleEndBar - bottomRightTriangleStartBar) / 4;
def bottomRightTriangleInnerEndBar = bottomRightTriangleEndBar - (bottomRightTriangleEndBar - bottomRightTriangleStartBar) / 4;
def bottomRightTriangleInnerMiddleBar = Round((bottomRightTriangleInnerStartBar + bottomRightTriangleInnerEndBar) / 2, 0);

plot bottomRightTriangleInnerA = if BarNumber() >= bottomRightTriangleInnerStartBar and BarNumber() <= bottomRightTriangleInnerMiddleBar then bottomRightTriangleBottomPrice - (bottomRightTriangleBottomPrice - bottomRightTriangleTopPrice) * (BarNumber() - bottomRightTriangleInnerStartBar) / (bottomRightTriangleInnerMiddleBar - bottomRightTriangleInnerStartBar) else Double.NaN;
bottomRightTriangleInnerA.SetPaintingStrategy(PaintingStrategy.line);
bottomRightTriangleInnerA.SetDefaultColor(color.red);
bottomRightTriangleInnerA.SetLineWeight(3);

plot BottomRightTriangleInnerB = if BarNumber() >= bottomRightTriangleInnerMiddleBar and BarNumber() <= bottomRightTriangleInnerEndBar then bottomRightTriangleTopPrice + (bottomRightTriangleBottomPrice - bottomRightTriangleTopPrice) * (BarNumber() - bottomRightTriangleInnerMiddleBar) / (bottomRightTriangleInnerEndBar - bottomRightTriangleInnerMiddleBar) else Double.NaN;
bottomRightTriangleInnerB.SetPaintingStrategy(PaintingStrategy.line);
bottomRightTriangleInnerB.SetDefaultColor(color.red);
bottomRightTriangleInnerB.SetLineWeight(3);

#Draw horizontal line (base of the triangle)
plot BottomLine3 = if BarNumber() >=  Round((bottomRightTriangleStartBar + bottomRightTriangleMiddleBar) / 2, 0) and BarNumber() <  Round((bottomRightTriangleEndBar + bottomRightTriangleMiddleBar) / 2, 0) then bottomRightTriangleBottomPrice-.75 else Double.NaN;
BottomLine3.SetPaintingStrategy(PaintingStrategy.Line);
BottomLine3.SetDefaultColor(color.red);
BottomLine3.SetLineWeight(3);
# Define properties for the bottom left triangle
def bottomLeftTriangleStartBar = startBar;
def bottomLeftTriangleEndBar = middleBar;
def bottomLeftTriangleMiddleBar = Round((bottomLeftTriangleStartBar + bottomLeftTriangleEndBar) / 2, 0);
def bottomLeftTriangleBottomPrice = 408.75;
def bottomLeftTriangleTopPrice = 405;

# Draw additional upside-down triangle in the top triangle
def bottomLeftTriangleInnerStartBar = bottomLeftTriangleStartBar + (bottomLeftTriangleEndBar - bottomLeftTriangleStartBar) / 4;
def bottomLeftTriangleInnerEndBar = bottomLeftTriangleEndBar - (bottomLeftTriangleEndBar - bottomLeftTriangleStartBar) / 4;
def bottomLeftTriangleInnerMiddleBar = Round((bottomLeftTriangleInnerStartBar + bottomLeftTriangleInnerEndBar) / 2, 0);

plot bottomLeftTriangleInnerA = if BarNumber() >= bottomLeftTriangleInnerStartBar and BarNumber() <= bottomLeftTriangleInnerMiddleBar then bottomLeftTriangleBottomPrice - (bottomLeftTriangleBottomPrice - bottomLeftTriangleTopPrice) * (BarNumber() - bottomLeftTriangleInnerStartBar) / (bottomLeftTriangleInnerMiddleBar - bottomLeftTriangleInnerStartBar) else Double.NaN;
bottomLeftTriangleInnerA.SetPaintingStrategy(PaintingStrategy.line);
bottomLeftTriangleInnerA.SetDefaultColor(color.red);
bottomLeftTriangleInnerA.SetLineWeight(3);

plot bottomLeftTriangleInnerB = if BarNumber() >= bottomLeftTriangleInnerMiddleBar and BarNumber() <= bottomLeftTriangleInnerEndBar then bottomLeftTriangleTopPrice + (bottomLeftTriangleBottomPrice - bottomLeftTriangleTopPrice) * (BarNumber() - bottomLeftTriangleInnerMiddleBar) / (bottomLeftTriangleInnerEndBar - bottomLeftTriangleInnerMiddleBar) else Double.NaN;
bottomLeftTriangleInnerB.SetPaintingStrategy(PaintingStrategy.line);
bottomLeftTriangleInnerB.SetDefaultColor(color.red);
bottomLeftTriangleInnerB.SetLineWeight(3);

# Draw horizontal line (base of the triangle)
plot BottomLine4 = if BarNumber() >=  Round((bottomLeftTriangleStartBar + bottomLeftTriangleMiddleBar) / 2, 0) and BarNumber() <  Round((bottomLeftTriangleEndBar + bottomLeftTriangleMiddleBar) / 2, 0) then bottomLeftTriangleBottomPrice-.75 else Double.NaN;
BottomLine4.SetPaintingStrategy(PaintingStrategy.Line);
BottomLine4.SetDefaultColor(color.red);
BottomLine4.SetLineWeight(3);

# Define properties for the top triangle
def topTriangleStartBar = middleBar - (endBar - startBar) / 4; # Adjusted start bar
def topTriangleEndBar = middleBar + (endBar - startBar) / 4; # Adjusted end bar
def topTriangleMiddleBar = Round((topTriangleStartBar + topTriangleEndBar) / 2, 0);
def topTriangleBottomPrice = bottomPrice + (topPrice - bottomPrice) / 2; # Mid point of the outer triangle
def topTriangleTopPrice = topPrice-1.25;

# Draw additional upside-down triangle in the top triangle
def topTriangleInnerStartBar = topTriangleStartBar + (topTriangleEndBar - topTriangleStartBar) / 4;
def topTriangleInnerEndBar = topTriangleEndBar - (topTriangleEndBar - topTriangleStartBar) / 4;
def topTriangleInnerMiddleBar = Round((topTriangleInnerStartBar + topTriangleInnerEndBar) / 2, 0);

plot topTriangleInnerA = if BarNumber() >= topTriangleInnerStartBar and BarNumber() <= topTriangleInnerMiddleBar then topTriangleTopPrice - (topTriangleTopPrice - topTriangleBottomPrice) * (BarNumber() - topTriangleInnerStartBar) / (topTriangleInnerMiddleBar - topTriangleInnerStartBar) else Double.NaN;
topTriangleInnerA.SetPaintingStrategy(PaintingStrategy.line);
topTriangleInnerA.SetDefaultColor(color.red);
topTriangleInnerA.SetLineWeight(3);

plot topTriangleInnerB = if BarNumber() >= topTriangleInnerMiddleBar and BarNumber() <= topTriangleInnerEndBar then topTriangleBottomPrice + (topTriangleTopPrice - topTriangleBottomPrice) * (BarNumber() - topTriangleInnerMiddleBar) / (topTriangleInnerEndBar - topTriangleInnerMiddleBar) else Double.NaN;
topTriangleInnerB.SetPaintingStrategy(PaintingStrategy.line);
topTriangleInnerB.SetDefaultColor(color.red);
topTriangleInnerB.SetLineWeight(3);

# Draw horizontal line (base of the triangle)
plot BottomLine5 = if BarNumber() >= topTriangleInnerStartBar and BarNumber() <= topTriangleInnerEndBar then topTriangleTopPrice-.75 else Double.NaN;
BottomLine5.SetPaintingStrategy(PaintingStrategy.Line);
BottomLine5.SetDefaultColor(color.red);
BottomLine5.SetLineWeight(3);
