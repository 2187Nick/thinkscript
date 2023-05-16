# Option Volume x Price Plotted Automatically selects current date.
# Twitter @2187Nick

# May 16, 2023Updates: 
# 1. Option to set number of strikes to view.
# 2. Option to manually set expiration date.
# 3. Should run much faster.

declare upper;
declare once_per_bar;
input strikeSpacing = 1.0;
input Tradesize_Dollars = 200000;
input strikes = {default "0", "1", "2", "3", "4", "5", "6", "7", "8", "9",
"10", "11", "12", "13", "14","15", "16", "17", "18", "19", "20"};

input roundup = no; # helpful with stock price below $10

input ManuallySetExpiration = {default "false", "true"};
input Expiration_YYMMDD = 230616;

def CurrentYear = GetYear() - 2000;
def CurrentMonth = GetMonth();
def CurrentDOM = GetDayOfMonth(GetYYYYMMDD());
def DateString_auto = CurrentYear * 10000 + CurrentMonth * 100 + CurrentDOM;

def DateString = if manuallysetexpiration then Expiration_YYMMDD else  DateString_auto;

DefineGlobalColor("CallColor", Color.GREEN);
DefineGlobalColor("PutColor", Color.RED);
AddLabel(yes, AsPrice(DateString) + "C", GlobalColor("CallColor"));
AddLabel(yes, AsPrice(DateString) + "P", GlobalColor("PutColor"));

def agg = AggregationPeriod.DAY;
def openlevel = open(period = agg);
def rounding_factor = if strikeSpacing > 1 and strikeSpacing < 25 then -1 else if strikeSpacing > 24 then -2 else 0;
def floor_or_ceiling =  Round(openlevel, rounding_factor);
def base_strike = floor_or_ceiling;

plot strike_base = base_strike;
plot strike_plus1 = base_strike + strikeSpacing;
plot strike_plus2 = base_strike + strikeSpacing * 2;
plot strike_plus3 = base_strike + strikeSpacing * 3;
plot strike_plus4 = base_strike + strikeSpacing * 4;
plot strike_plus5 = base_strike + strikeSpacing * 5;
plot strike_plus6 = base_strike + strikeSpacing * 6;
plot strike_plus7 = base_strike + strikeSpacing * 7;
plot strike_plus8 = base_strike + strikeSpacing * 8;
plot strike_plus9 = base_strike + strikeSpacing * 9;
plot strike_plus10 = base_strike + strikeSpacing * 10;
plot strike_plus11 = base_strike + strikeSpacing * 11;
plot strike_plus12 = base_strike + strikeSpacing * 12;
plot strike_plus13 = base_strike + strikeSpacing * 13;
plot strike_plus14 = base_strike + strikeSpacing * 14;
plot strike_plus15 = base_strike + strikeSpacing * 15;
plot strike_plus16 = base_strike + strikeSpacing * 16;
plot strike_plus17 = base_strike + strikeSpacing * 17;
plot strike_plus18 = base_strike + strikeSpacing * 18;
plot strike_plus19 = base_strike + strikeSpacing * 19;
plot strike_plus20 = base_strike + strikeSpacing * 20;
plot strike_plus21 = base_strike + strikeSpacing * 21;

plot strike_minus1 = base_strike - strikeSpacing;
plot strike_minus2 = base_strike - strikeSpacing * 2;
plot strike_minus3 = base_strike - strikeSpacing * 3;
plot strike_minus4 = base_strike - strikeSpacing * 4;
plot strike_minus5 = base_strike - strikeSpacing * 5;
plot strike_minus6 = base_strike - strikeSpacing * 6;
plot strike_minus7 = base_strike - strikeSpacing * 7;
plot strike_minus8 = base_strike - strikeSpacing * 8;
plot strike_minus9 = base_strike - strikeSpacing * 9;
plot strike_minus10 = base_strike - strikeSpacing * 10;
plot strike_minus11 = base_strike - strikeSpacing * 11;
plot strike_minus12 = base_strike - strikeSpacing * 12;
plot strike_minus13 = base_strike - strikeSpacing * 13;
plot strike_minus14 = base_strike - strikeSpacing * 14;
plot strike_minus15 = base_strike - strikeSpacing * 15;
plot strike_minus16 = base_strike - strikeSpacing * 16;
plot strike_minus17 = base_strike - strikeSpacing * 17;
plot strike_minus18 = base_strike - strikeSpacing * 18;
plot strike_minus19 = base_strike - strikeSpacing * 19;
plot strike_minus20 = base_strike - strikeSpacing * 20;
plot strike_minus21 = base_strike - strikeSpacing * 21;

### Put Option Volume
def putOptionVolume = if IsNaN(volume("." + GetSymbol() + AsPrice(DateString) + "P" + AsPrice(strike_base))) then 0 else volume("." + GetSymbol() + AsPrice(DateString) + "P" + AsPrice(strike_base));
def putOptionVolume1 =  if strikes < 1 then 0 else if IsNaN(volume("." + GetSymbol() + AsPrice(DateString) + "P" + AsPrice(strike_minus1))) then 0 else volume("." + GetSymbol() + AsPrice(DateString) + "P" + AsPrice(strike_minus1));
def putOptionVolume2 =  if strikes < 2 then 0 else if IsNaN(volume("." + GetSymbol() + AsPrice(DateString) + "P" + AsPrice(strike_minus2))) then 0 else volume("." + GetSymbol() + AsPrice(DateString) + "P" + AsPrice(strike_minus2));
def putOptionVolume3 =  if strikes < 3 then 0 else if IsNaN(volume("." + GetSymbol() + AsPrice(DateString) + "P" + AsPrice(strike_minus3))) then 0 else volume("." + GetSymbol() + AsPrice(DateString) + "P" + AsPrice(strike_minus3));
def putOptionVolume4 = if strikes < 4 then 0 else if isNaN(volume("." + GetSymbol() + AsPrice(DateString) + "P" + AsPrice(strike_minus4))) then 0 else volume("." + GetSymbol() + AsPrice(DateString) + "P" + AsPrice(strike_minus4));
def putOptionVolume5 = if strikes < 5 then 0 else if isNaN(volume("." + GetSymbol() + AsPrice(DateString) + "P" + AsPrice(strike_minus5))) then 0 else volume("." + GetSymbol() + AsPrice(DateString) + "P" + AsPrice(strike_minus5));
def putOptionVolume6 = if strikes < 6 then 0 else if isNaN(volume("." + GetSymbol() + AsPrice(DateString) + "P" + AsPrice(strike_minus6))) then 0 else volume("." + GetSymbol() + AsPrice(DateString) + "P" + AsPrice(strike_minus6));
def putOptionVolume7 = if strikes < 7 then 0 else if isNaN(volume("." + GetSymbol() + AsPrice(DateString) + "P" + AsPrice(strike_minus7))) then 0 else volume("." + GetSymbol() + AsPrice(DateString) + "P" + AsPrice(strike_minus7));
def putOptionVolume8 = if strikes < 8 then 0 else if isNaN(volume("." + GetSymbol() + AsPrice(DateString) + "P" + AsPrice(strike_minus8))) then 0 else volume("." + GetSymbol() + AsPrice(DateString) + "P" + AsPrice(strike_minus8));
def putOptionVolume9 = if strikes < 9 then 0 else if isNaN(volume("." + GetSymbol() + AsPrice(DateString) + "P" + AsPrice(strike_minus9))) then 0 else volume("." + GetSymbol() + AsPrice(DateString) + "P" + AsPrice(strike_minus9));
def putOptionVolume10 = if strikes < 10 then 0 else if isNaN(volume("." + GetSymbol() + AsPrice(DateString) + "P" + AsPrice(strike_minus10))) then 0 else volume("." + GetSymbol() + AsPrice(DateString) + "P" + AsPrice(strike_minus10));
def putOptionVolume11 = if strikes < 11 then 0 else if isNaN(volume("." + GetSymbol() + AsPrice(DateString) + "P" + AsPrice(strike_minus11))) then 0 else volume("." + GetSymbol() + AsPrice(DateString) + "P" + AsPrice(strike_minus11));
def putOptionVolume12 = if strikes < 12 then 0 else if isNaN(volume("." + GetSymbol() + AsPrice(DateString) + "P" + AsPrice(strike_minus12))) then 0 else volume("." + GetSymbol() + AsPrice(DateString) + "P" + AsPrice(strike_minus12));
def putOptionVolume13 = if strikes < 13 then 0 else if isNaN(volume("." + GetSymbol() + AsPrice(DateString) + "P" + AsPrice(strike_minus13))) then 0 else volume("." + GetSymbol() + AsPrice(DateString) + "P" + AsPrice(strike_minus13));
def putOptionVolume14 = if strikes < 14 then 0 else if isNaN(volume("." + GetSymbol() + AsPrice(DateString) + "P" + AsPrice(strike_minus14))) then 0 else volume("." + GetSymbol() + AsPrice(DateString) + "P" + AsPrice(strike_minus14));
def putOptionVolume15 = if strikes < 15 then 0 else if isNaN(volume("." + GetSymbol() + AsPrice(DateString) + "P" + AsPrice(strike_minus15))) then 0 else volume("." + GetSymbol() + AsPrice(DateString) + "P" + AsPrice(strike_minus15));
def putOptionVolume16 = if strikes < 16 then 0 else if isNaN(volume("." + GetSymbol() + AsPrice(DateString) + "P" + AsPrice(strike_minus16))) then 0 else volume("." + GetSymbol() + AsPrice(DateString) + "P" + AsPrice(strike_minus16));
def putOptionVolume17 = if strikes < 17 then 0 else if isNaN(volume("." + GetSymbol() + AsPrice(DateString) + "P" + AsPrice(strike_minus17))) then 0 else volume("." + GetSymbol() + AsPrice(DateString) + "P" + AsPrice(strike_minus17));
def putOptionVolume18 = if strikes < 18 then 0 else if isNaN(volume("." + GetSymbol() + AsPrice(DateString) + "P" + AsPrice(strike_minus18))) then 0 else volume("." + GetSymbol() + AsPrice(DateString) + "P" + AsPrice(strike_minus18));
def putOptionVolume19 = if strikes < 19 then 0 else if isNaN(volume("." + GetSymbol() + AsPrice(DateString) + "P" + AsPrice(strike_minus19))) then 0 else volume("." + GetSymbol() + AsPrice(DateString) + "P" + AsPrice(strike_minus19));
def putOptionVolume20 = if strikes < 20 then 0 else if isNaN(volume("." + GetSymbol() + AsPrice(DateString) + "P" + AsPrice(strike_minus20))) then 0 else volume("." + GetSymbol() + AsPrice(DateString) + "P" + AsPrice(strike_minus20));


def putOptionVolume1a =  if strikes < 1 then 0 else if IsNaN(volume("." + GetSymbol() + AsPrice(DateString) + "P" + AsPrice(strike_plus1))) then 0 else volume("." + GetSymbol() + AsPrice(DateString) + "P" + AsPrice(strike_plus1));
def putOptionVolume2a =  if strikes < 2 then 0 else if IsNaN(volume("." + GetSymbol() + AsPrice(DateString) + "P" + AsPrice(strike_plus2))) then 0 else volume("." + GetSymbol() + AsPrice(DateString) + "P" + AsPrice(strike_plus2));
def putOptionVolume3a =  if strikes < 3 then 0 else if IsNaN(volume("." + GetSymbol() + AsPrice(DateString) + "P" + AsPrice(strike_plus3))) then 0 else volume("." + GetSymbol() + AsPrice(DateString) + "P" + AsPrice(strike_plus3));
def putOptionVolume4a = if strikes < 4 then 0 else if isNaN(volume("." + GetSymbol() + AsPrice(DateString) + "P" + AsPrice(strike_plus4))) then 0 else volume("." + GetSymbol() + AsPrice(DateString) + "P" + AsPrice(strike_plus4));
def putOptionVolume5a = if strikes < 5 then 0 else if isNaN(volume("." + GetSymbol() + AsPrice(DateString) + "P" + AsPrice(strike_plus5))) then 0 else volume("." + GetSymbol() + AsPrice(DateString) + "P" + AsPrice(strike_plus5));
def putOptionVolume6a = if strikes < 6 then 0 else if isNaN(volume("." + GetSymbol() + AsPrice(DateString) + "P" + AsPrice(strike_plus6))) then 0 else volume("." + GetSymbol() + AsPrice(DateString) + "P" + AsPrice(strike_plus6));
def putOptionVolume7a = if strikes < 7 then 0 else if isNaN(volume("." + GetSymbol() + AsPrice(DateString) + "P" + AsPrice(strike_plus7))) then 0 else volume("." + GetSymbol() + AsPrice(DateString) + "P" + AsPrice(strike_plus7));
def putOptionVolume8a = if strikes < 8 then 0 else if isNaN(volume("." + GetSymbol() + AsPrice(DateString) + "P" + AsPrice(strike_plus8))) then 0 else volume("." + GetSymbol() + AsPrice(DateString) + "P" + AsPrice(strike_plus8));
def putOptionVolume9a = if strikes < 9 then 0 else if isNaN(volume("." + GetSymbol() + AsPrice(DateString) + "P" + AsPrice(strike_plus9))) then 0 else volume("." + GetSymbol() + AsPrice(DateString) + "P" + AsPrice(strike_plus9));
def putOptionVolume10a = if strikes < 10 then 0 else if isNaN(volume("." + GetSymbol() + AsPrice(DateString) + "P" + AsPrice(strike_plus10))) then 0 else volume("." + GetSymbol() + AsPrice(DateString) + "P" + AsPrice(strike_plus10));
def putOptionVolume11a = if strikes < 11 then 0 else if isNaN(volume("." + GetSymbol() + AsPrice(DateString) + "P" + AsPrice(strike_plus11))) then 0 else volume("." + GetSymbol() + AsPrice(DateString) + "P" + AsPrice(strike_plus11));
def putOptionVolume12a = if strikes < 12 then 0 else if isNaN(volume("." + GetSymbol() + AsPrice(DateString) + "P" + AsPrice(strike_plus12))) then 0 else volume("." + GetSymbol() + AsPrice(DateString) + "P" + AsPrice(strike_plus12));
def putOptionVolume13a = if strikes < 13 then 0 else if isNaN(volume("." + GetSymbol() + AsPrice(DateString) + "P" + AsPrice(strike_plus13))) then 0 else volume("." + GetSymbol() + AsPrice(DateString) + "P" + AsPrice(strike_plus13));
def putOptionVolume14a = if strikes < 14 then 0 else if isNaN(volume("." + GetSymbol() + AsPrice(DateString) + "P" + AsPrice(strike_plus14))) then 0 else volume("." + GetSymbol() + AsPrice(DateString) + "P" + AsPrice(strike_plus14));
def putOptionVolume15a = if strikes < 15 then 0 else if isNaN(volume("." + GetSymbol() + AsPrice(DateString) + "P" + AsPrice(strike_plus15))) then 0 else volume("." + GetSymbol() + AsPrice(DateString) + "P" + AsPrice(strike_plus15));
def putOptionVolume16a = if strikes < 16 then 0 else if isNaN(volume("." + GetSymbol() + AsPrice(DateString) + "P" + AsPrice(strike_plus16))) then 0 else volume("." + GetSymbol() + AsPrice(DateString) + "P" + AsPrice(strike_plus16));
def putOptionVolume17a = if strikes < 17 then 0 else if isNaN(volume("." + GetSymbol() + AsPrice(DateString) + "P" + AsPrice(strike_plus17))) then 0 else volume("." + GetSymbol() + AsPrice(DateString) + "P" + AsPrice(strike_plus17));
def putOptionVolume18a = if strikes < 18 then 0 else if isNaN(volume("." + GetSymbol() + AsPrice(DateString) + "P" + AsPrice(strike_plus18))) then 0 else volume("." + GetSymbol() + AsPrice(DateString) + "P" + AsPrice(strike_plus18));
def putOptionVolume19a = if strikes < 19 then 0 else if isNaN(volume("." + GetSymbol() + AsPrice(DateString) + "P" + AsPrice(strike_plus19))) then 0 else volume("." + GetSymbol() + AsPrice(DateString) + "P" + AsPrice(strike_plus19));
def putOptionVolume20a = if strikes < 20 then 0 else if isNaN(volume("." + GetSymbol() + AsPrice(DateString) + "P" + AsPrice(strike_plus20))) then 0 else volume("." + GetSymbol() + AsPrice(DateString) + "P" + AsPrice(strike_plus20));

###Call Option Volume
def callOptionVolume = if IsNaN(volume("." + GetSymbol() + AsPrice(DateString) + "C" + AsPrice(strike_base))) then 0 else volume("." + GetSymbol() + AsPrice(DateString) + "C" + AsPrice(strike_base));
def callOptionVolume1 =  if strikes < 1 then 0 else if IsNaN(volume("." + GetSymbol() + AsPrice(DateString) + "C" + AsPrice(strike_plus1))) then 0 else volume("." + GetSymbol() + AsPrice(DateString) + "C" + AsPrice(strike_plus1));
def callOptionVolume2 =  if strikes < 2 then 0 else if IsNaN(volume("." + GetSymbol() + AsPrice(DateString) + "C" + AsPrice(strike_plus2))) then 0 else volume("." + GetSymbol() + AsPrice(DateString) + "C" + AsPrice(strike_plus2));
def callOptionVolume3 =  if strikes < 3 then 0 else if IsNaN(volume("." + GetSymbol() + AsPrice(DateString) + "C" + AsPrice(strike_plus3))) then 0 else volume("." + GetSymbol() + AsPrice(DateString) + "C" + AsPrice(strike_plus3));
def callOptionVolume4 = if strikes < 4 then 0 else if isNaN(volume("." + GetSymbol() + AsPrice(DateString) + "C" + AsPrice(strike_plus4))) then 0 else volume("." + GetSymbol() + AsPrice(DateString) + "C" + AsPrice(strike_plus4));
def callOptionVolume5 = if strikes < 5 then 0 else if isNaN(volume("." + GetSymbol() + AsPrice(DateString) + "C" + AsPrice(strike_plus5))) then 0 else volume("." + GetSymbol() + AsPrice(DateString) + "C" + AsPrice(strike_plus5));
def callOptionVolume6 = if strikes < 6 then 0 else if isNaN(volume("." + GetSymbol() + AsPrice(DateString) + "C" + AsPrice(strike_plus6))) then 0 else volume("." + GetSymbol() + AsPrice(DateString) + "C" + AsPrice(strike_plus6));
def callOptionVolume7 = if strikes < 7 then 0 else if isNaN(volume("." + GetSymbol() + AsPrice(DateString) + "C" + AsPrice(strike_plus7))) then 0 else volume("." + GetSymbol() + AsPrice(DateString) + "C" + AsPrice(strike_plus7));
def callOptionVolume8 = if strikes < 8 then 0 else if isNaN(volume("." + GetSymbol() + AsPrice(DateString) + "C" + AsPrice(strike_plus8))) then 0 else volume("." + GetSymbol() + AsPrice(DateString) + "C" + AsPrice(strike_plus8));
def callOptionVolume9 = if strikes < 9 then 0 else if isNaN(volume("." + GetSymbol() + AsPrice(DateString) + "C" + AsPrice(strike_plus9))) then 0 else volume("." + GetSymbol() + AsPrice(DateString) + "C" + AsPrice(strike_plus9));
def callOptionVolume10 = if strikes < 10 then 0 else if isNaN(volume("." + GetSymbol() + AsPrice(DateString) + "C" + AsPrice(strike_plus10))) then 0 else volume("." + GetSymbol() + AsPrice(DateString) + "C" + AsPrice(strike_plus10));
def callOptionVolume11 = if strikes < 11 then 0 else if isNaN(volume("." + GetSymbol() + AsPrice(DateString) + "C" + AsPrice(strike_plus11))) then 0 else volume("." + GetSymbol() + AsPrice(DateString) + "C" + AsPrice(strike_plus11));
def callOptionVolume12 = if strikes < 12 then 0 else if isNaN(volume("." + GetSymbol() + AsPrice(DateString) + "C" + AsPrice(strike_plus12))) then 0 else volume("." + GetSymbol() + AsPrice(DateString) + "C" + AsPrice(strike_plus12));
def callOptionVolume13 = if strikes < 13 then 0 else if isNaN(volume("." + GetSymbol() + AsPrice(DateString) + "C" + AsPrice(strike_plus13))) then 0 else volume("." + GetSymbol() + AsPrice(DateString) + "C" + AsPrice(strike_plus13));
def callOptionVolume14 = if strikes < 14 then 0 else if isNaN(volume("." + GetSymbol() + AsPrice(DateString) + "C" + AsPrice(strike_plus14))) then 0 else volume("." + GetSymbol() + AsPrice(DateString) + "C" + AsPrice(strike_plus14));
def callOptionVolume15 = if strikes < 15 then 0 else if isNaN(volume("." + GetSymbol() + AsPrice(DateString) + "C" + AsPrice(strike_plus15))) then 0 else volume("." + GetSymbol() + AsPrice(DateString) + "C" + AsPrice(strike_plus15));
def callOptionVolume16 = if strikes < 16 then 0 else if isNaN(volume("." + GetSymbol() + AsPrice(DateString) + "C" + AsPrice(strike_plus16))) then 0 else volume("." + GetSymbol() + AsPrice(DateString) + "C" + AsPrice(strike_plus16));
def callOptionVolume17 = if strikes < 17 then 0 else if isNaN(volume("." + GetSymbol() + AsPrice(DateString) + "C" + AsPrice(strike_plus17))) then 0 else volume("." + GetSymbol() + AsPrice(DateString) + "C" + AsPrice(strike_plus17));
def callOptionVolume18 = if strikes < 18 then 0 else if isNaN(volume("." + GetSymbol() + AsPrice(DateString) + "C" + AsPrice(strike_plus18))) then 0 else volume("." + GetSymbol() + AsPrice(DateString) + "C" + AsPrice(strike_plus18));
def callOptionVolume19 = if strikes < 19 then 0 else if isNaN(volume("." + GetSymbol() + AsPrice(DateString) + "C" + AsPrice(strike_plus19))) then 0 else volume("." + GetSymbol() + AsPrice(DateString) + "C" + AsPrice(strike_plus19));
def callOptionVolume20 = if strikes < 20 then 0 else if isNaN(volume("." + GetSymbol() + AsPrice(DateString) + "C" + AsPrice(strike_plus20))) then 0 else volume("." + GetSymbol() + AsPrice(DateString) + "C" + AsPrice(strike_plus20));

def callOptionVolume1a =  if strikes < 1 then 0 else if IsNaN(volume("." + GetSymbol() + AsPrice(DateString) + "C" + AsPrice(strike_minus1))) then 0 else volume("." + GetSymbol() + AsPrice(DateString) + "C" + AsPrice(strike_minus1));
def callOptionVolume2a =  if strikes < 2 then 0 else if IsNaN(volume("." + GetSymbol() + AsPrice(DateString) + "C" + AsPrice(strike_minus2))) then 0 else volume("." + GetSymbol() + AsPrice(DateString) + "C" + AsPrice(strike_minus2));
def callOptionVolume3a =  if strikes < 3 then 0 else if IsNaN(volume("." + GetSymbol() + AsPrice(DateString) + "C" + AsPrice(strike_minus3))) then 0 else volume("." + GetSymbol() + AsPrice(DateString) + "C" + AsPrice(strike_minus3));
def callOptionVolume4a = if strikes < 4 then 0 else if isNaN(volume("." + GetSymbol() + AsPrice(DateString) + "C" + AsPrice(strike_minus4))) then 0 else volume("." + GetSymbol() + AsPrice(DateString) + "C" + AsPrice(strike_minus4));
def callOptionVolume5a = if strikes < 5 then 0 else if isNaN(volume("." + GetSymbol() + AsPrice(DateString) + "C" + AsPrice(strike_minus5))) then 0 else volume("." + GetSymbol() + AsPrice(DateString) + "C" + AsPrice(strike_minus5));
def callOptionVolume6a = if strikes < 6 then 0 else if isNaN(volume("." + GetSymbol() + AsPrice(DateString) + "C" + AsPrice(strike_minus6))) then 0 else volume("." + GetSymbol() + AsPrice(DateString) + "C" + AsPrice(strike_minus6));
def callOptionVolume7a = if strikes < 7 then 0 else if isNaN(volume("." + GetSymbol() + AsPrice(DateString) + "C" + AsPrice(strike_minus7))) then 0 else volume("." + GetSymbol() + AsPrice(DateString) + "C" + AsPrice(strike_minus7));
def callOptionVolume8a = if strikes < 8 then 0 else if isNaN(volume("." + GetSymbol() + AsPrice(DateString) + "C" + AsPrice(strike_minus8))) then 0 else volume("." + GetSymbol() + AsPrice(DateString) + "C" + AsPrice(strike_minus8));
def callOptionVolume9a = if strikes < 9 then 0 else if isNaN(volume("." + GetSymbol() + AsPrice(DateString) + "C" + AsPrice(strike_minus9))) then 0 else volume("." + GetSymbol() + AsPrice(DateString) + "C" + AsPrice(strike_minus9));
def callOptionVolume10a = if strikes < 10 then 0 else if isNaN(volume("." + GetSymbol() + AsPrice(DateString) + "C" + AsPrice(strike_minus10))) then 0 else volume("." + GetSymbol() + AsPrice(DateString) + "C" + AsPrice(strike_minus10));
def callOptionVolume11a = if strikes < 11 then 0 else if isNaN(volume("." + GetSymbol() + AsPrice(DateString) + "C" + AsPrice(strike_minus11))) then 0 else volume("." + GetSymbol() + AsPrice(DateString) + "C" + AsPrice(strike_minus11));
def callOptionVolume12a = if strikes < 12 then 0 else if isNaN(volume("." + GetSymbol() + AsPrice(DateString) + "C" + AsPrice(strike_minus12))) then 0 else volume("." + GetSymbol() + AsPrice(DateString) + "C" + AsPrice(strike_minus12));
def callOptionVolume13a = if strikes < 13 then 0 else if isNaN(volume("." + GetSymbol() + AsPrice(DateString) + "C" + AsPrice(strike_minus13))) then 0 else volume("." + GetSymbol() + AsPrice(DateString) + "C" + AsPrice(strike_minus13));
def callOptionVolume14a = if strikes < 14 then 0 else if isNaN(volume("." + GetSymbol() + AsPrice(DateString) + "C" + AsPrice(strike_minus14))) then 0 else volume("." + GetSymbol() + AsPrice(DateString) + "C" + AsPrice(strike_minus14));
def callOptionVolume15a = if strikes < 15 then 0 else if isNaN(volume("." + GetSymbol() + AsPrice(DateString) + "C" + AsPrice(strike_minus15))) then 0 else volume("." + GetSymbol() + AsPrice(DateString) + "C" + AsPrice(strike_minus15));
def callOptionVolume16a = if strikes < 16 then 0 else if isNaN(volume("." + GetSymbol() + AsPrice(DateString) + "C" + AsPrice(strike_minus16))) then 0 else volume("." + GetSymbol() + AsPrice(DateString) + "C" + AsPrice(strike_minus16));
def callOptionVolume17a = if strikes < 17 then 0 else if isNaN(volume("." + GetSymbol() + AsPrice(DateString) + "C" + AsPrice(strike_minus17))) then 0 else volume("." + GetSymbol() + AsPrice(DateString) + "C" + AsPrice(strike_minus17));
def callOptionVolume18a = if strikes < 18 then 0 else if isNaN(volume("." + GetSymbol() + AsPrice(DateString) + "C" + AsPrice(strike_minus18))) then 0 else volume("." + GetSymbol() + AsPrice(DateString) + "C" + AsPrice(strike_minus18));
def callOptionVolume19a = if strikes < 19 then 0 else if isNaN(volume("." + GetSymbol() + AsPrice(DateString) + "C" + AsPrice(strike_minus19))) then 0 else volume("." + GetSymbol() + AsPrice(DateString) + "C" + AsPrice(strike_minus19));
def callOptionVolume20a = if strikes < 20 then 0 else if isNaN(volume("." + GetSymbol() + AsPrice(DateString) + "C" + AsPrice(strike_minus20))) then 0 else volume("." + GetSymbol() + AsPrice(DateString) + "C" + AsPrice(strike_minus20));

### Put Option ohlc4
def putOptionohlc4 = if IsNaN(ohlc4("." + GetSymbol() + AsPrice(DateString) + "P" + AsPrice(strike_base))) then 0 else ohlc4("." + GetSymbol() + AsPrice(DateString) + "P" + AsPrice(strike_base));
def putOptionohlc41 =  if strikes < 1 then 0 else if IsNaN(ohlc4("." + GetSymbol() + AsPrice(DateString) + "P" + AsPrice(strike_minus1))) then 0 else ohlc4("." + GetSymbol() + AsPrice(DateString) + "P" + AsPrice(strike_minus1));
def putOptionohlc42 =  if strikes < 2 then 0 else if IsNaN(ohlc4("." + GetSymbol() + AsPrice(DateString) + "P" + AsPrice(strike_minus2))) then 0 else ohlc4("." + GetSymbol() + AsPrice(DateString) + "P" + AsPrice(strike_minus2));
def putOptionohlc43 = if strikes < 3 then 0 else if IsNaN(ohlc4("." + GetSymbol() + AsPrice(DateString) + "P" + AsPrice(strike_minus3))) then 0 else ohlc4("." + GetSymbol() + AsPrice(DateString) + "P" + AsPrice(strike_minus3));
def putOptionohlc44 = if strikes < 4 then 0 else if IsNaN(ohlc4("." + GetSymbol() + AsPrice(DateString) + "P" + AsPrice(strike_minus4))) then 0 else ohlc4("." + GetSymbol() + AsPrice(DateString) + "P" + AsPrice(strike_minus4));
def putOptionohlc45 = if strikes < 5 then 0 else if IsNaN(ohlc4("." + GetSymbol() + AsPrice(DateString) + "P" + AsPrice(strike_minus5))) then 0 else ohlc4("." + GetSymbol() + AsPrice(DateString) + "P" + AsPrice(strike_minus5));
def putOptionohlc46 = if strikes < 6 then 0 else if IsNaN(ohlc4("." + GetSymbol() + AsPrice(DateString) + "P" + AsPrice(strike_minus6))) then 0 else ohlc4("." + GetSymbol() + AsPrice(DateString) + "P" + AsPrice(strike_minus6));
def putOptionohlc47 = if strikes < 7 then 0 else if IsNaN(ohlc4("." + GetSymbol() + AsPrice(DateString) + "P" + AsPrice(strike_minus7))) then 0 else ohlc4("." + GetSymbol() + AsPrice(DateString) + "P" + AsPrice(strike_minus7));
def putOptionohlc48 = if strikes < 8 then 0 else if IsNaN(ohlc4("." + GetSymbol() + AsPrice(DateString) + "P" + AsPrice(strike_minus8))) then 0 else ohlc4("." + GetSymbol() + AsPrice(DateString) + "P" + AsPrice(strike_minus8));
def putOptionohlc49 =if strikes < 9 then 0 else  if IsNaN(ohlc4("." + GetSymbol() + AsPrice(DateString) + "P" + AsPrice(strike_minus9))) then 0 else ohlc4("." + GetSymbol() + AsPrice(DateString) + "P" + AsPrice(strike_minus9));
def putOptionohlc410 = if strikes < 10 then 0 else if IsNaN(ohlc4("." + GetSymbol() + AsPrice(DateString) + "P" + AsPrice(strike_minus10))) then 0 else ohlc4("." + GetSymbol() + AsPrice(DateString) + "P" + AsPrice(strike_minus10));
def putOptionohlc411 = if strikes < 11 then 0 else if IsNaN(ohlc4("." + GetSymbol() + AsPrice(DateString) + "P" + AsPrice(strike_minus11))) then 0 else ohlc4("." + GetSymbol() + AsPrice(DateString) + "P" + AsPrice(strike_minus11));
def putOptionohlc412 = if strikes < 12 then 0 else if IsNaN(ohlc4("." + GetSymbol() + AsPrice(DateString) + "P" + AsPrice(strike_minus12))) then 0 else ohlc4("." + GetSymbol() + AsPrice(DateString) + "P" + AsPrice(strike_minus12));
def putOptionohlc413 = if strikes < 13 then 0 else if IsNaN(ohlc4("." + GetSymbol() + AsPrice(DateString) + "P" + AsPrice(strike_minus13))) then 0 else ohlc4("." + GetSymbol() + AsPrice(DateString) + "P" + AsPrice(strike_minus13));
def putOptionohlc414 = if strikes < 14 then 0 else if IsNaN(ohlc4("." + GetSymbol() + AsPrice(DateString) + "P" + AsPrice(strike_minus14))) then 0 else ohlc4("." + GetSymbol() + AsPrice(DateString) + "P" + AsPrice(strike_minus14));
def putOptionohlc415 = if strikes < 15 then 0 else if IsNaN(ohlc4("." + GetSymbol() + AsPrice(DateString) + "P" + AsPrice(strike_minus15))) then 0 else ohlc4("." + GetSymbol() + AsPrice(DateString) + "P" + AsPrice(strike_minus15));
def putOptionohlc416 = if strikes < 16 then 0 else if IsNaN(ohlc4("." + GetSymbol() + AsPrice(DateString) + "P" + AsPrice(strike_minus16))) then 0 else ohlc4("." + GetSymbol() + AsPrice(DateString) + "P" + AsPrice(strike_minus16));
def putOptionohlc417 = if strikes < 17 then 0 else if IsNaN(ohlc4("." + GetSymbol() + AsPrice(DateString) + "P" + AsPrice(strike_minus17))) then 0 else ohlc4("." + GetSymbol() + AsPrice(DateString) + "P" + AsPrice(strike_minus17));
def putOptionohlc418 = if strikes < 18 then 0 else if IsNaN(ohlc4("." + GetSymbol() + AsPrice(DateString) + "P" + AsPrice(strike_minus18))) then 0 else ohlc4("." + GetSymbol() + AsPrice(DateString) + "P" + AsPrice(strike_minus18));
def putOptionohlc419 = if strikes < 19 then 0 else if IsNaN(ohlc4("." + GetSymbol() + AsPrice(DateString) + "P" + AsPrice(strike_minus19))) then 0 else ohlc4("." + GetSymbol() + AsPrice(DateString) + "P" + AsPrice(strike_minus19));
def putOptionohlc420 = if strikes < 20 then 0 else if IsNaN(ohlc4("." + GetSymbol() + AsPrice(DateString) + "P" + AsPrice(strike_minus20))) then 0 else ohlc4("." + GetSymbol() + AsPrice(DateString) + "P" + AsPrice(strike_minus20));

def putOptionohlc41a = if strikes < 1 then 0 else if IsNaN(ohlc4("." + GetSymbol() + AsPrice(DateString) + "P" + AsPrice(strike_plus1))) then 0 else ohlc4("." + GetSymbol() + AsPrice(DateString) + "P" + AsPrice(strike_plus1));
def putOptionohlc42a = if strikes < 2 then 0 else if IsNaN(ohlc4("." + GetSymbol() + AsPrice(DateString) + "P" + AsPrice(strike_plus2))) then 0 else ohlc4("." + GetSymbol() + AsPrice(DateString) + "P" + AsPrice(strike_plus2));
def putOptionohlc43a = if strikes < 3 then 0 else if IsNaN(ohlc4("." + GetSymbol() + AsPrice(DateString) + "P" + AsPrice(strike_plus3))) then 0 else ohlc4("." + GetSymbol() + AsPrice(DateString) + "P" + AsPrice(strike_plus3));
def putOptionohlc44a = if strikes < 4 then 0 else if IsNaN(ohlc4("." + GetSymbol() + AsPrice(DateString) + "P" + AsPrice(strike_plus4))) then 0 else ohlc4("." + GetSymbol() + AsPrice(DateString) + "P" + AsPrice(strike_plus4));
def putOptionohlc45a = if strikes < 5 then 0 else if IsNaN(ohlc4("." + GetSymbol() + AsPrice(DateString) + "P" + AsPrice(strike_plus5))) then 0 else ohlc4("." + GetSymbol() + AsPrice(DateString) + "P" + AsPrice(strike_plus5));
def putOptionohlc46a = if strikes < 6 then 0 else if IsNaN(ohlc4("." + GetSymbol() + AsPrice(DateString) + "P" + AsPrice(strike_plus6))) then 0 else ohlc4("." + GetSymbol() + AsPrice(DateString) + "P" + AsPrice(strike_plus6));
def putOptionohlc47a = if strikes < 7 then 0 else if IsNaN(ohlc4("." + GetSymbol() + AsPrice(DateString) + "P" + AsPrice(strike_plus7))) then 0 else ohlc4("." + GetSymbol() + AsPrice(DateString) + "P" + AsPrice(strike_plus7));
def putOptionohlc48a = if strikes < 8 then 0 else  if IsNaN(ohlc4("." + GetSymbol() + AsPrice(DateString) + "P" + AsPrice(strike_plus8))) then 0 else ohlc4("." + GetSymbol() + AsPrice(DateString) + "P" + AsPrice(strike_plus8));
def putOptionohlc49a = if strikes < 9 then 0 else if IsNaN(ohlc4("." + GetSymbol() + AsPrice(DateString) + "P" + AsPrice(strike_plus9))) then 0 else ohlc4("." + GetSymbol() + AsPrice(DateString) + "P" + AsPrice(strike_plus9));
def putOptionohlc410a = if strikes < 10 then 0 else if IsNaN(ohlc4("." + GetSymbol() + AsPrice(DateString) + "P" + AsPrice(strike_plus10))) then 0 else ohlc4("." + GetSymbol() + AsPrice(DateString) + "P" + AsPrice(strike_plus10));
def putOptionohlc411a = if strikes < 11 then 0 else if IsNaN(ohlc4("." + GetSymbol() + AsPrice(DateString) + "P" + AsPrice(strike_plus11))) then 0 else ohlc4("." + GetSymbol() + AsPrice(DateString) + "P" + AsPrice(strike_plus11));
def putOptionohlc412a = if strikes < 12 then 0 else if IsNaN(ohlc4("." + GetSymbol() + AsPrice(DateString) + "P" + AsPrice(strike_plus12))) then 0 else ohlc4("." + GetSymbol() + AsPrice(DateString) + "P" + AsPrice(strike_plus12));
def putOptionohlc413a = if strikes < 13 then 0 else if IsNaN(ohlc4("." + GetSymbol() + AsPrice(DateString) + "P" + AsPrice(strike_plus13))) then 0 else ohlc4("." + GetSymbol() + AsPrice(DateString) + "P" + AsPrice(strike_plus13));
def putOptionohlc414a = if strikes < 14 then 0 else if IsNaN(ohlc4("." + GetSymbol() + AsPrice(DateString) + "P" + AsPrice(strike_plus14))) then 0 else ohlc4("." + GetSymbol() + AsPrice(DateString) + "P" + AsPrice(strike_plus14));
def putOptionohlc415a = if strikes < 15 then 0 else if IsNaN(ohlc4("." + GetSymbol() + AsPrice(DateString) + "P" + AsPrice(strike_plus15))) then 0 else ohlc4("." + GetSymbol() + AsPrice(DateString) + "P" + AsPrice(strike_plus15));
def putOptionohlc416a = if strikes < 16 then 0 else if IsNaN(ohlc4("." + GetSymbol() + AsPrice(DateString) + "P" + AsPrice(strike_plus16))) then 0 else ohlc4("." + GetSymbol() + AsPrice(DateString) + "P" + AsPrice(strike_plus16));
def putOptionohlc417a = if strikes < 17 then 0 else if IsNaN(ohlc4("." + GetSymbol() + AsPrice(DateString) + "P" + AsPrice(strike_plus17))) then 0 else ohlc4("." + GetSymbol() + AsPrice(DateString) + "P" + AsPrice(strike_plus17));
def putOptionohlc418a = if strikes < 18 then 0 else if IsNaN(ohlc4("." + GetSymbol() + AsPrice(DateString) + "P" + AsPrice(strike_plus18))) then 0 else ohlc4("." + GetSymbol() + AsPrice(DateString) + "P" + AsPrice(strike_plus18));
def putOptionohlc419a = if strikes < 19 then 0 else if IsNaN(ohlc4("." + GetSymbol() + AsPrice(DateString) + "P" + AsPrice(strike_plus19))) then 0 else ohlc4("." + GetSymbol() + AsPrice(DateString) + "P" + AsPrice(strike_plus19));
def putOptionohlc420a = if strikes < 20 then 0 else if IsNaN(ohlc4("." + GetSymbol() + AsPrice(DateString) + "P" + AsPrice(strike_plus20))) then 0 else ohlc4("." + GetSymbol() + AsPrice(DateString) + "P" + AsPrice(strike_plus20));


####Call Option ohlc4
def callOptionohlc4 = if IsNaN(ohlc4("." + GetSymbol() + AsPrice(DateString) + "C" + AsPrice(strike_base))) then 0 else ohlc4("." + GetSymbol() + AsPrice(DateString) + "C" + AsPrice(strike_base));
def callOptionohlc41 = if strikes < 1 then 0 else if IsNaN(ohlc4("." + GetSymbol() + AsPrice(DateString) + "C" + AsPrice(strike_plus1))) then 0 else ohlc4("." + GetSymbol() + AsPrice(DateString) + "C" + AsPrice(strike_plus1));
def callOptionohlc42 = if strikes < 2 then 0 else if IsNaN(ohlc4("." + GetSymbol() + AsPrice(DateString) + "C" + AsPrice(strike_plus2))) then 0 else ohlc4("." + GetSymbol() + AsPrice(DateString) + "C" + AsPrice(strike_plus2));
def callOptionohlc43 = if strikes < 3 then 0 else if IsNaN(ohlc4("." + GetSymbol() + AsPrice(DateString) + "C" + AsPrice(strike_plus3))) then 0 else ohlc4("." + GetSymbol() + AsPrice(DateString) + "C" + AsPrice(strike_plus3));
def callOptionohlc44 = if strikes < 4 then 0 else if IsNaN(ohlc4("." + GetSymbol() + AsPrice(DateString) + "C" + AsPrice(strike_plus4))) then 0 else ohlc4("." + GetSymbol() + AsPrice(DateString) + "C" + AsPrice(strike_plus4));
def callOptionohlc45 = if strikes < 5 then 0 else if IsNaN(ohlc4("." + GetSymbol() + AsPrice(DateString) + "C" + AsPrice(strike_plus5))) then 0 else ohlc4("." + GetSymbol() + AsPrice(DateString) + "C" + AsPrice(strike_plus5));
def callOptionohlc46 = if strikes < 6 then 0 else if IsNaN(ohlc4("." + GetSymbol() + AsPrice(DateString) + "C" + AsPrice(strike_plus6))) then 0 else ohlc4("." + GetSymbol() + AsPrice(DateString) + "C" + AsPrice(strike_plus6));
def callOptionohlc47 = if strikes < 7 then 0 else if IsNaN(ohlc4("." + GetSymbol() + AsPrice(DateString) + "C" + AsPrice(strike_plus7))) then 0 else ohlc4("." + GetSymbol() + AsPrice(DateString) + "C" + AsPrice(strike_plus7));
def callOptionohlc48 = if strikes < 8 then 0 else if IsNaN(ohlc4("." + GetSymbol() + AsPrice(DateString) + "C" + AsPrice(strike_plus8))) then 0 else ohlc4("." + GetSymbol() + AsPrice(DateString) + "C" + AsPrice(strike_plus8));
def callOptionohlc49 = if strikes < 9 then 0 else if IsNaN(ohlc4("." + GetSymbol() + AsPrice(DateString) + "C" + AsPrice(strike_plus9))) then 0 else ohlc4("." + GetSymbol() + AsPrice(DateString) + "C" + AsPrice(strike_plus9));
def callOptionohlc410 = if strikes < 10 then 0 else if IsNaN(ohlc4("." + GetSymbol() + AsPrice(DateString) + "C" + AsPrice(strike_plus10))) then 0 else ohlc4("." + GetSymbol() + AsPrice(DateString) + "C" + AsPrice(strike_plus10));
def callOptionohlc411 = if strikes < 11 then 0 else if IsNaN(ohlc4("." + GetSymbol() + AsPrice(DateString) + "C" + AsPrice(strike_plus11))) then 0 else ohlc4("." + GetSymbol() + AsPrice(DateString) + "C" + AsPrice(strike_plus11));
def callOptionohlc412 = if strikes < 12 then 0 else if IsNaN(ohlc4("." + GetSymbol() + AsPrice(DateString) + "C" + AsPrice(strike_plus12))) then 0 else ohlc4("." + GetSymbol() + AsPrice(DateString) + "C" + AsPrice(strike_plus12));
def callOptionohlc413 = if strikes < 13 then 0 else if IsNaN(ohlc4("." + GetSymbol() + AsPrice(DateString) + "C" + AsPrice(strike_plus13))) then 0 else ohlc4("." + GetSymbol() + AsPrice(DateString) + "C" + AsPrice(strike_plus13));
def callOptionohlc414 = if strikes < 14 then 0 else if IsNaN(ohlc4("." + GetSymbol() + AsPrice(DateString) + "C" + AsPrice(strike_plus14))) then 0 else ohlc4("." + GetSymbol() + AsPrice(DateString) + "C" + AsPrice(strike_plus14));
def callOptionohlc415 = if strikes < 15 then 0 else if IsNaN(ohlc4("." + GetSymbol() + AsPrice(DateString) + "C" + AsPrice(strike_plus15))) then 0 else ohlc4("." + GetSymbol() + AsPrice(DateString) + "C" + AsPrice(strike_plus15));
def callOptionohlc416 = if strikes < 16 then 0 else if IsNaN(ohlc4("." + GetSymbol() + AsPrice(DateString) + "C" + AsPrice(strike_plus16))) then 0 else ohlc4("." + GetSymbol() + AsPrice(DateString) + "C" + AsPrice(strike_plus16));
def callOptionohlc417 = if strikes < 17 then 0 else if IsNaN(ohlc4("." + GetSymbol() + AsPrice(DateString) + "C" + AsPrice(strike_plus17))) then 0 else ohlc4("." + GetSymbol() + AsPrice(DateString) + "C" + AsPrice(strike_plus17));
def callOptionohlc418 = if strikes < 18 then 0 else if IsNaN(ohlc4("." + GetSymbol() + AsPrice(DateString) + "C" + AsPrice(strike_plus18))) then 0 else ohlc4("." + GetSymbol() + AsPrice(DateString) + "C" + AsPrice(strike_plus18));
def callOptionohlc419 = if strikes < 19 then 0 else if IsNaN(ohlc4("." + GetSymbol() + AsPrice(DateString) + "C" + AsPrice(strike_plus19))) then 0 else ohlc4("." + GetSymbol() + AsPrice(DateString) + "C" + AsPrice(strike_plus19));
def callOptionohlc420 = if strikes < 20 then 0 else if IsNaN(ohlc4("." + GetSymbol() + AsPrice(DateString) + "C" + AsPrice(strike_plus20))) then 0 else ohlc4("." + GetSymbol() + AsPrice(DateString) + "C" + AsPrice(strike_plus20));

def callOptionohlc41a = if strikes < 1 then 0 else if IsNaN(ohlc4("." + GetSymbol() + AsPrice(DateString) + "C" + AsPrice(strike_minus1))) then 0 else ohlc4("." + GetSymbol() + AsPrice(DateString) + "C" + AsPrice(strike_minus1));
def callOptionohlc42a = if strikes < 2 then 0 else if IsNaN(ohlc4("." + GetSymbol() + AsPrice(DateString) + "C" + AsPrice(strike_minus2))) then 0 else ohlc4("." + GetSymbol() + AsPrice(DateString) + "C" + AsPrice(strike_minus2));
def callOptionohlc43a = if strikes < 3 then 0 else if IsNaN(ohlc4("." + GetSymbol() + AsPrice(DateString) + "C" + AsPrice(strike_minus3))) then 0 else ohlc4("." + GetSymbol() + AsPrice(DateString) + "C" + AsPrice(strike_minus3));
def callOptionohlc44a = if strikes < 4 then 0 else if IsNaN(ohlc4("." + GetSymbol() + AsPrice(DateString) + "C" + AsPrice(strike_minus4))) then 0 else ohlc4("." + GetSymbol() + AsPrice(DateString) + "C" + AsPrice(strike_minus4));
def callOptionohlc45a = if strikes < 5 then 0 else if IsNaN(ohlc4("." + GetSymbol() + AsPrice(DateString) + "C" + AsPrice(strike_minus5))) then 0 else ohlc4("." + GetSymbol() + AsPrice(DateString) + "C" + AsPrice(strike_minus5));
def callOptionohlc46a = if strikes < 6 then 0 else if IsNaN(ohlc4("." + GetSymbol() + AsPrice(DateString) + "C" + AsPrice(strike_minus6))) then 0 else ohlc4("." + GetSymbol() + AsPrice(DateString) + "C" + AsPrice(strike_minus6));
def callOptionohlc47a = if strikes < 7 then 0 else if IsNaN(ohlc4("." + GetSymbol() + AsPrice(DateString) + "C" + AsPrice(strike_minus7))) then 0 else ohlc4("." + GetSymbol() + AsPrice(DateString) + "C" + AsPrice(strike_minus7));
def callOptionohlc48a = if strikes < 8 then 0 else if IsNaN(ohlc4("." + GetSymbol() + AsPrice(DateString) + "C" + AsPrice(strike_minus8))) then 0 else ohlc4("." + GetSymbol() + AsPrice(DateString) + "C" + AsPrice(strike_minus8));
def callOptionohlc49a = if strikes < 9 then 0 else if IsNaN(ohlc4("." + GetSymbol() + AsPrice(DateString) + "C" + AsPrice(strike_minus9))) then 0 else ohlc4("." + GetSymbol() + AsPrice(DateString) + "C" + AsPrice(strike_minus9));
def callOptionohlc410a = if strikes < 10 then 0 else if IsNaN(ohlc4("." + GetSymbol() + AsPrice(DateString) + "C" + AsPrice(strike_minus10))) then 0 else ohlc4("." + GetSymbol() + AsPrice(DateString) + "C" + AsPrice(strike_minus10));
def callOptionohlc411a = if strikes < 11 then 0 else if IsNaN(ohlc4("." + GetSymbol() + AsPrice(DateString) + "C" + AsPrice(strike_minus11))) then 0 else ohlc4("." + GetSymbol() + AsPrice(DateString) + "C" + AsPrice(strike_minus11));
def callOptionohlc412a = if strikes < 12 then 0 else if IsNaN(ohlc4("." + GetSymbol() + AsPrice(DateString) + "C" + AsPrice(strike_minus12))) then 0 else ohlc4("." + GetSymbol() + AsPrice(DateString) + "C" + AsPrice(strike_minus12));
def callOptionohlc413a = if strikes < 13 then 0 else if IsNaN(ohlc4("." + GetSymbol() + AsPrice(DateString) + "C" + AsPrice(strike_minus13))) then 0 else ohlc4("." + GetSymbol() + AsPrice(DateString) + "C" + AsPrice(strike_minus13));
def callOptionohlc414a = if strikes < 14 then 0 else if IsNaN(ohlc4("." + GetSymbol() + AsPrice(DateString) + "C" + AsPrice(strike_minus14))) then 0 else ohlc4("." + GetSymbol() + AsPrice(DateString) + "C" + AsPrice(strike_minus14));
def callOptionohlc415a = if strikes < 15 then 0 else if IsNaN(ohlc4("." + GetSymbol() + AsPrice(DateString) + "C" + AsPrice(strike_minus15))) then 0 else ohlc4("." + GetSymbol() + AsPrice(DateString) + "C" + AsPrice(strike_minus15));
def callOptionohlc416a = if strikes < 16 then 0 else if IsNaN(ohlc4("." + GetSymbol() + AsPrice(DateString) + "C" + AsPrice(strike_minus16))) then 0 else ohlc4("." + GetSymbol() + AsPrice(DateString) + "C" + AsPrice(strike_minus16));
def callOptionohlc417a = if strikes < 17 then 0 else if IsNaN(ohlc4("." + GetSymbol() + AsPrice(DateString) + "C" + AsPrice(strike_minus17))) then 0 else ohlc4("." + GetSymbol() + AsPrice(DateString) + "C" + AsPrice(strike_minus17));
def callOptionohlc418a = if strikes < 18 then 0 else if IsNaN(ohlc4("." + GetSymbol() + AsPrice(DateString) + "C" + AsPrice(strike_minus18))) then 0 else ohlc4("." + GetSymbol() + AsPrice(DateString) + "C" + AsPrice(strike_minus18));
def callOptionohlc419a = if strikes < 19 then 0 else if IsNaN(ohlc4("." + GetSymbol() + AsPrice(DateString) + "C" + AsPrice(strike_minus19))) then 0 else ohlc4("." + GetSymbol() + AsPrice(DateString) + "C" + AsPrice(strike_minus19));
def callOptionohlc420a = if strikes < 20 then 0 else if IsNaN(ohlc4("." + GetSymbol() + AsPrice(DateString) + "C" + AsPrice(strike_minus20))) then 0 else ohlc4("." + GetSymbol() + AsPrice(DateString) + "C" + AsPrice(strike_minus20));


######################
#Chart Bubbles Puts

AddChartBubble(putOptionVolume * putOptionohlc4 * 100 > Tradesize_Dollars, strike_base, "$" + Round((putOptionVolume * putOptionohlc4) / 10, 0) + "K", GlobalColor("PutColor"), no);

AddChartBubble(putOptionVolume1 * putOptionohlc41 * 100 > Tradesize_Dollars, strike_minus1, "$" + Round((putOptionVolume1 * putOptionohlc41) / 10, 0) + "K", GlobalColor("PutColor"), no);
AddChartBubble(putOptionVolume2 * putOptionohlc42 * 100 > Tradesize_Dollars, strike_minus2, "$" + Round((putOptionVolume2 * putOptionohlc42) / 10, 0) + "K", GlobalColor("PutColor"), no);
AddChartBubble(putOptionVolume3 * putOptionohlc43 * 100 > Tradesize_Dollars, strike_minus3, "$" + Round((putOptionVolume3 * putOptionohlc43) / 10, 0) + "K", GlobalColor("PutColor"), no);
AddChartBubble(putOptionVolume4 * putOptionohlc44 * 100 > Tradesize_Dollars, strike_minus4, "$" + Round((putOptionVolume4 * putOptionohlc44) / 10, 0) + "K", GlobalColor("PutColor"), no);
AddChartBubble(putOptionVolume5 * putOptionohlc45 * 100 > Tradesize_Dollars, strike_minus5, "$" + Round((putOptionVolume5 * putOptionohlc45) / 10, 0) + "K", GlobalColor("PutColor"), no);
AddChartBubble(putOptionVolume6 * putOptionohlc46 * 100 > Tradesize_Dollars, strike_minus6, "$" + Round((putOptionVolume6 * putOptionohlc46) / 10, 0) + "K", GlobalColor("PutColor"), no);
AddChartBubble(putOptionVolume7 * putOptionohlc47 * 100 > Tradesize_Dollars, strike_minus7, "$" + Round((putOptionVolume7 * putOptionohlc47) / 10, 0) + "K", GlobalColor("PutColor"), no);
AddChartBubble(putOptionVolume8 * putOptionohlc48 * 100 > Tradesize_Dollars, strike_minus8, "$" + Round((putOptionVolume8 * putOptionohlc48) / 10, 0) + "K", GlobalColor("PutColor"), no);
AddChartBubble(putOptionVolume9 * putOptionohlc49 * 100 > Tradesize_Dollars, strike_minus9, "$" + Round((putOptionVolume9 * putOptionohlc49) / 10, 0) + "K", GlobalColor("PutColor"), no);
AddChartBubble(putOptionVolume10 * putOptionohlc410 * 100 > Tradesize_Dollars, strike_minus10, "$" + Round((putOptionVolume10 * putOptionohlc410) / 10, 0) + "K", GlobalColor("PutColor"), no);
AddChartBubble(putOptionVolume11 * putOptionohlc411 * 100 > Tradesize_Dollars, strike_minus11, "$" + Round((putOptionVolume11 * putOptionohlc411) / 10, 0) + "K", GlobalColor("PutColor"), no);
AddChartBubble(putOptionVolume12 * putOptionohlc412 * 100 > Tradesize_Dollars, strike_minus12, "$" + Round((putOptionVolume12 * putOptionohlc412) / 10, 0) + "K", GlobalColor("PutColor"), no);
AddChartBubble(putOptionVolume13 * putOptionohlc413 * 100 > Tradesize_Dollars, strike_minus13, "$" + Round((putOptionVolume13 * putOptionohlc413) / 10, 0) + "K", GlobalColor("PutColor"), no);
AddChartBubble(putOptionVolume14 * putOptionohlc414 * 100 > Tradesize_Dollars, strike_minus14, "$" + Round((putOptionVolume14 * putOptionohlc414) / 10, 0) + "K", GlobalColor("PutColor"), no);
AddChartBubble(putOptionVolume15 * putOptionohlc415 * 100 > Tradesize_Dollars, strike_minus15, "$" + Round((putOptionVolume15 * putOptionohlc415) / 10, 0) + "K", GlobalColor("PutColor"), no);
AddChartBubble(putOptionVolume16 * putOptionohlc416 * 100 > Tradesize_Dollars, strike_minus16, "$" + Round((putOptionVolume16 * putOptionohlc416) / 10, 0) + "K", GlobalColor("PutColor"), no);
AddChartBubble(putOptionVolume17 * putOptionohlc417 * 100 > Tradesize_Dollars, strike_minus17, "$" + Round((putOptionVolume17 * putOptionohlc417) / 10, 0) + "K", GlobalColor("PutColor"), no);
AddChartBubble(putOptionVolume18 * putOptionohlc418 * 100 > Tradesize_Dollars, strike_minus18, "$" + Round((putOptionVolume18 * putOptionohlc418) / 10, 0) + "K", GlobalColor("PutColor"), no);
AddChartBubble(putOptionVolume19 * putOptionohlc419 * 100 > Tradesize_Dollars, strike_minus19, "$" + Round((putOptionVolume19 * putOptionohlc419) / 10, 0) + "K", GlobalColor("PutColor"), no);
AddChartBubble(putOptionVolume20 * putOptionohlc420 * 100 > Tradesize_Dollars, strike_minus20, "$" + Round((putOptionVolume20 * putOptionohlc420) / 10, 0) + "K", GlobalColor("PutColor"), no);

AddChartBubble(putOptionVolume1a * putOptionohlc41a * 100 > Tradesize_Dollars, strike_plus1, "$" + Round((putOptionVolume1a * putOptionohlc41a) / 10, 0) + "K", GlobalColor("PutColor"), no);
AddChartBubble(putOptionVolume2a * putOptionohlc42a * 100 > Tradesize_Dollars, strike_plus2, "$" + Round((putOptionVolume2a * putOptionohlc42a) / 10, 0) + "K", GlobalColor("PutColor"), no);
AddChartBubble(putOptionVolume3a * putOptionohlc43a * 100 > Tradesize_Dollars, strike_plus3, "$" + Round((putOptionVolume3a * putOptionohlc43a) / 10, 0) + "K", GlobalColor("PutColor"), no);
AddChartBubble(putOptionVolume4a * putOptionohlc44a * 100 > Tradesize_Dollars, strike_plus4, "$" + Round((putOptionVolume4a * putOptionohlc44a) / 10, 0) + "K", GlobalColor("PutColor"), no);
AddChartBubble(putOptionVolume5a * putOptionohlc45a * 100 > Tradesize_Dollars, strike_plus5, "$" + Round((putOptionVolume5a * putOptionohlc45a) / 10, 0) + "K", GlobalColor("PutColor"), no);
AddChartBubble(putOptionVolume6a * putOptionohlc46a * 100 > Tradesize_Dollars, strike_plus6, "$" + Round((putOptionVolume6a * putOptionohlc46a) / 10, 0) + "K", GlobalColor("PutColor"), no);
AddChartBubble(putOptionVolume7a * putOptionohlc47a * 100 > Tradesize_Dollars, strike_plus7, "$" + Round((putOptionVolume7a * putOptionohlc47a) / 10, 0) + "K", GlobalColor("PutColor"), no);
AddChartBubble(putOptionVolume8a * putOptionohlc48a * 100 > Tradesize_Dollars, strike_plus8, "$" + Round((putOptionVolume8a * putOptionohlc48a) / 10, 0) + "K", GlobalColor("PutColor"), no);
AddChartBubble(putOptionVolume9a * putOptionohlc49a * 100 > Tradesize_Dollars, strike_plus9, "$" + Round((putOptionVolume9a * putOptionohlc49a) / 10, 0) + "K", GlobalColor("PutColor"), no);
AddChartBubble(putOptionVolume10a * putOptionohlc410a * 100 > Tradesize_Dollars, strike_plus10, "$" + Round((putOptionVolume10a * putOptionohlc410a) / 10, 0) + "K", GlobalColor("PutColor"), no);
AddChartBubble(putOptionVolume11a * putOptionohlc411a * 100 > Tradesize_Dollars, strike_plus11, "$" + Round((putOptionVolume11a * putOptionohlc411a) / 10, 0) + "K", GlobalColor("PutColor"), no);
AddChartBubble(putOptionVolume12a * putOptionohlc412a * 100 > Tradesize_Dollars, strike_plus12, "$" + Round((putOptionVolume12a * putOptionohlc412a) / 10, 0) + "K", GlobalColor("PutColor"), no);
AddChartBubble(putOptionVolume13a * putOptionohlc413a * 100 > Tradesize_Dollars, strike_plus13, "$" + Round((putOptionVolume13a * putOptionohlc413a) / 10, 0) + "K", GlobalColor("PutColor"), no);
AddChartBubble(putOptionVolume14a * putOptionohlc414a * 100 > Tradesize_Dollars, strike_plus14, "$" + Round((putOptionVolume14a * putOptionohlc414a) / 10, 0) + "K", GlobalColor("PutColor"), no);
AddChartBubble(putOptionVolume15a * putOptionohlc415a * 100 > Tradesize_Dollars, strike_plus15, "$" + Round((putOptionVolume15a * putOptionohlc415a) / 10, 0) + "K", GlobalColor("PutColor"), no);
AddChartBubble(putOptionVolume16a * putOptionohlc416a * 100 > Tradesize_Dollars, strike_plus16, "$" + Round((putOptionVolume16a * putOptionohlc416a) / 10, 0) + "K", GlobalColor("PutColor"), no);
AddChartBubble(putOptionVolume17a * putOptionohlc417a * 100 > Tradesize_Dollars, strike_plus17, "$" + Round((putOptionVolume17a * putOptionohlc417a) / 10, 0) + "K", GlobalColor("PutColor"), no);
AddChartBubble(putOptionVolume18a * putOptionohlc418a * 100 > Tradesize_Dollars, strike_plus18, "$" + Round((putOptionVolume18a * putOptionohlc418a) / 10, 0) + "K", GlobalColor("PutColor"), no);
AddChartBubble(putOptionVolume19a * putOptionohlc419a * 100 > Tradesize_Dollars, strike_plus19, "$" + Round((putOptionVolume19a * putOptionohlc419a) / 10, 0) + "K", GlobalColor("PutColor"), no);
AddChartBubble(putOptionVolume20a * putOptionohlc420a * 100 > Tradesize_Dollars, strike_plus20, "$" + Round((putOptionVolume20a * putOptionohlc420a) / 10, 0) + "K", GlobalColor("PutColor"), no);


#Chart Bubbles for Calls
AddChartBubble(callOptionVolume * callOptionohlc4 * 100 > Tradesize_Dollars, strike_base, "$" + Round((callOptionVolume * callOptionohlc4) / 10, 0) + "K", GlobalColor("CallColor"), no);

AddChartBubble(callOptionVolume1 * callOptionohlc41 * 100 > Tradesize_Dollars, strike_plus1, "$" + Round((callOptionVolume1 * callOptionohlc41) / 10, 0) + "K", GlobalColor("CallColor"), no);
AddChartBubble(callOptionVolume2 * callOptionohlc42 * 100 > Tradesize_Dollars, strike_plus2, "$" + Round((callOptionVolume2 * callOptionohlc42) / 10, 0) + "K", GlobalColor("CallColor"), no);
AddChartBubble(strikes >= 3 and callOptionVolume3 * callOptionohlc43 * 100 > Tradesize_Dollars, strike_plus3, "$" + Round((callOptionVolume3 * callOptionohlc43) / 10, 0) + "K", GlobalColor("CallColor"), no);
AddChartBubble(strikes >= 4 and callOptionVolume4 * callOptionohlc44 * 100 > Tradesize_Dollars, strike_plus4, "$" + Round((callOptionVolume4 * callOptionohlc44) / 10, 0) + "K", GlobalColor("CallColor"), no);
AddChartBubble(strikes >= 5 and callOptionVolume5 * callOptionohlc45 * 100 > Tradesize_Dollars, strike_plus5, "$" + Round((callOptionVolume5 * callOptionohlc45) / 10, 0) + "K", GlobalColor("CallColor"), no);
AddChartBubble(strikes >= 6 and callOptionVolume6 * callOptionohlc46 * 100 > Tradesize_Dollars, strike_plus6, "$" + Round((callOptionVolume6 * callOptionohlc46) / 10, 0) + "K", GlobalColor("CallColor"), no);
AddChartBubble(strikes >= 7 and callOptionVolume7 * callOptionohlc47 * 100 > Tradesize_Dollars, strike_plus7, "$" + Round((callOptionVolume7 * callOptionohlc47) / 10, 0) + "K", GlobalColor("CallColor"), no);
AddChartBubble(strikes >= 8 and callOptionVolume8 * callOptionohlc48 * 100 > Tradesize_Dollars, strike_plus8, "$" + Round((callOptionVolume8 * callOptionohlc48) / 10, 0) + "K", GlobalColor("CallColor"), no);
AddChartBubble(strikes >= 9 and callOptionVolume9 * callOptionohlc49 * 100 > Tradesize_Dollars, strike_plus9, "$" + Round((callOptionVolume9 * callOptionohlc49) / 10, 0) + "K", GlobalColor("CallColor"), no);
AddChartBubble(strikes >= 10 and callOptionVolume10 * callOptionohlc410 * 100 > Tradesize_Dollars, strike_plus10, "$" + Round((callOptionVolume10 * callOptionohlc410) / 10, 0) + "K", GlobalColor("CallColor"), no);
AddChartBubble(strikes >= 11 and callOptionVolume11 * callOptionohlc411 * 100 > Tradesize_Dollars, strike_plus11, "$" + Round((callOptionVolume11 * callOptionohlc411) / 10, 0) + "K", GlobalColor("CallColor"), no);
AddChartBubble(strikes >= 12 and callOptionVolume12 * callOptionohlc412 * 100 > Tradesize_Dollars, strike_plus12, "$" + Round((callOptionVolume12 * callOptionohlc412) / 10, 0) + "K", GlobalColor("CallColor"), no);
AddChartBubble(strikes >= 13 and callOptionVolume13 * callOptionohlc413 * 100 > Tradesize_Dollars, strike_plus13, "$" + Round((callOptionVolume13 * callOptionohlc413) / 10, 0) + "K", GlobalColor("CallColor"), no);
AddChartBubble(strikes >= 14 and callOptionVolume14 * callOptionohlc414 * 100 > Tradesize_Dollars, strike_plus14, "$" + Round((callOptionVolume14 * callOptionohlc414) / 10, 0) + "K", GlobalColor("CallColor"), no);
AddChartBubble(strikes >= 15 and callOptionVolume15 * callOptionohlc415 * 100 > Tradesize_Dollars, strike_plus15, "$" + Round((callOptionVolume15 * callOptionohlc415) / 10, 0) + "K", GlobalColor("CallColor"), no);
AddChartBubble(strikes >= 16 and callOptionVolume16 * callOptionohlc416 * 100 > Tradesize_Dollars, strike_plus16, "$" + Round((callOptionVolume16 * callOptionohlc416) / 10, 0) + "K", GlobalColor("CallColor"), no);
AddChartBubble(strikes >= 17 and callOptionVolume17 * callOptionohlc417 * 100 > Tradesize_Dollars, strike_plus17, "$" + Round((callOptionVolume17 * callOptionohlc417) / 10, 0) + "K", GlobalColor("CallColor"), no);
AddChartBubble(strikes >= 18 and callOptionVolume18 * callOptionohlc418 * 100 > Tradesize_Dollars, strike_plus18, "$" + Round((callOptionVolume18 * callOptionohlc418) / 10, 0) + "K", GlobalColor("CallColor"), no);
AddChartBubble(strikes >= 19 and callOptionVolume19 * callOptionohlc419 * 100 > Tradesize_Dollars, strike_plus19, "$" + Round((callOptionVolume19 * callOptionohlc419) / 10, 0) + "K", GlobalColor("CallColor"), no);
AddChartBubble(strikes >= 20 and callOptionVolume20 * callOptionohlc420 * 100 > Tradesize_Dollars, strike_plus20, "$" + Round((callOptionVolume20 * callOptionohlc420) / 10, 0) + "K", GlobalColor("CallColor"), no);

AddChartBubble(callOptionVolume1a * callOptionohlc41a * 100 > Tradesize_Dollars, strike_minus1, "$" + Round((callOptionVolume1a * callOptionohlc41a) / 10, 0) + "K", GlobalColor("CallColor"), no);
AddChartBubble(callOptionVolume2a * callOptionohlc42a * 100 > Tradesize_Dollars, strike_minus2, "$" + Round((callOptionVolume2a * callOptionohlc42a) / 10, 0) + "K", GlobalColor("CallColor"), no);
AddChartBubble(callOptionVolume3a * callOptionohlc43a * 100 > Tradesize_Dollars, strike_minus3, "$" + Round((callOptionVolume3a * callOptionohlc43a) / 10, 0) + "K", GlobalColor("CallColor"), no);
AddChartBubble(callOptionVolume4a * callOptionohlc44a * 100 > Tradesize_Dollars, strike_minus4, "$" + Round((callOptionVolume4a * callOptionohlc44a) / 10, 0) + "K", GlobalColor("CallColor"), no);
AddChartBubble(callOptionVolume5a * callOptionohlc45a * 100 > Tradesize_Dollars, strike_minus5, "$" + Round((callOptionVolume5a * callOptionohlc45a) / 10, 0) + "K", GlobalColor("CallColor"), no);
AddChartBubble(callOptionVolume6a * callOptionohlc46a * 100 > Tradesize_Dollars, strike_minus6, "$" + Round((callOptionVolume6a * callOptionohlc46a) / 10, 0) + "K", GlobalColor("CallColor"), no);
AddChartBubble(callOptionVolume7a * callOptionohlc47a * 100 > Tradesize_Dollars, strike_minus7, "$" + Round((callOptionVolume7a * callOptionohlc47a) / 10, 0) + "K", GlobalColor("CallColor"), no);
AddChartBubble(callOptionVolume8a * callOptionohlc48a * 100 > Tradesize_Dollars, strike_minus8, "$" + Round((callOptionVolume8a * callOptionohlc48a) / 10, 0) + "K", GlobalColor("CallColor"), no);
AddChartBubble(callOptionVolume9a * callOptionohlc49a * 100 > Tradesize_Dollars, strike_minus9, "$" + Round((callOptionVolume9a * callOptionohlc49a) / 10, 0) + "K", GlobalColor("CallColor"), no);
AddChartBubble(callOptionVolume10a * callOptionohlc410a * 100 > Tradesize_Dollars, strike_minus10, "$" + Round((callOptionVolume10a * callOptionohlc410a) / 10, 0) + "K", GlobalColor("CallColor"), no);
AddChartBubble(callOptionVolume11a * callOptionohlc411a * 100 > Tradesize_Dollars, strike_minus11, "$" + Round((callOptionVolume11a * callOptionohlc411a) / 10, 0) + "K", GlobalColor("CallColor"), no);
AddChartBubble(callOptionVolume12a * callOptionohlc412a * 100 > Tradesize_Dollars, strike_minus12, "$" + Round((callOptionVolume12a * callOptionohlc412a) / 10, 0) + "K", GlobalColor("CallColor"), no);
AddChartBubble(callOptionVolume13a * callOptionohlc413a * 100 > Tradesize_Dollars, strike_minus13, "$" + Round((callOptionVolume13a * callOptionohlc413a) / 10, 0) + "K", GlobalColor("CallColor"), no);
AddChartBubble(callOptionVolume14a * callOptionohlc414a * 100 > Tradesize_Dollars, strike_minus14, "$" + Round((callOptionVolume14a * callOptionohlc414a) / 10, 0) + "K", GlobalColor("CallColor"), no);
AddChartBubble(callOptionVolume15a * callOptionohlc415a * 100 > Tradesize_Dollars, strike_minus15, "$" + Round((callOptionVolume15a * callOptionohlc415a) / 10, 0) + "K", GlobalColor("CallColor"), no);
AddChartBubble(callOptionVolume16a * callOptionohlc416a * 100 > Tradesize_Dollars, strike_minus16, "$" + Round((callOptionVolume16a * callOptionohlc416a) / 10, 0) + "K", GlobalColor("CallColor"), no);
AddChartBubble(callOptionVolume17a * callOptionohlc417a * 100 > Tradesize_Dollars, strike_minus17, "$" + Round((callOptionVolume17a * callOptionohlc417a) / 10, 0) + "K", GlobalColor("CallColor"), no);
AddChartBubble(callOptionVolume18a * callOptionohlc418a * 100 > Tradesize_Dollars, strike_minus18, "$" + Round((callOptionVolume18a * callOptionohlc418a) / 10, 0) + "K", GlobalColor("CallColor"), no);
AddChartBubble(callOptionVolume19a * callOptionohlc419a * 100 > Tradesize_Dollars, strike_minus19, "$" + Round((callOptionVolume19a * callOptionohlc419a) / 10, 0) + "K", GlobalColor("CallColor"), no);
AddChartBubble(callOptionVolume20a * callOptionohlc420a * 100 > Tradesize_Dollars, strike_minus20, "$" + Round((callOptionVolume20a * callOptionohlc420a) / 10, 0) + "K", GlobalColor("CallColor"), no);

strike_minus1.SetHiding(strikes <= 0);
strike_plus1.SetHiding(strikes <= 0);
strike_minus2.SetHiding(strikes <= 1);
strike_plus2.SetHiding(strikes <= 1);
strike_minus3.SetHiding(strikes <= 2);
strike_plus3.SetHiding(strikes <= 2);
strike_minus4.SetHiding(strikes <= 3);
strike_plus4.SetHiding(strikes <= 3);
strike_minus5.SetHiding(strikes <= 4);
strike_plus5.SetHiding(strikes <= 4);
strike_minus6.SetHiding(strikes <= 5);
strike_plus6.SetHiding(strikes <= 5);
strike_minus7.SetHiding(strikes <= 6);
strike_plus7.SetHiding(strikes <= 6);
strike_minus8.SetHiding(strikes <= 7);
strike_plus8.SetHiding(strikes <= 7);
strike_minus9.SetHiding(strikes <= 8);
strike_plus9.SetHiding(strikes <= 8);
strike_minus10.SetHiding(strikes <= 9);
strike_plus10.SetHiding(strikes <= 9);
strike_minus11.SetHiding(strikes <= 10);
strike_plus11.SetHiding(strikes <= 10);
strike_minus12.SetHiding(strikes <= 11);
strike_plus12.SetHiding(strikes <= 11);
strike_minus13.SetHiding(strikes <= 12);
strike_plus13.SetHiding(strikes <= 12);
strike_minus14.SetHiding(strikes <= 13);
strike_plus14.SetHiding(strikes <= 13);
strike_minus15.SetHiding(strikes <= 14);
strike_plus15.SetHiding(strikes <= 14);
strike_minus16.SetHiding(strikes <= 15);
strike_plus16.SetHiding(strikes <= 15);
strike_minus17.SetHiding(strikes <= 16);
strike_plus17.SetHiding(strikes <= 16);
strike_minus18.SetHiding(strikes <= 17);
strike_plus18.SetHiding(strikes <= 17);
strike_minus19.SetHiding(strikes <= 18);
strike_plus19.SetHiding(strikes <= 18);
strike_minus20.SetHiding(strikes <= 19);
strike_plus20.SetHiding(strikes <= 19);
strike_minus21.SetHiding(strikes <= 20);
strike_plus21.SetHiding(strikes <= 20);

strike_base.SetDefaultColor(Color.blue);
strike_plus1.SetDefaultColor(Color.Dark_Gray);
strike_plus2.SetDefaultColor(Color.Dark_Gray);
strike_plus3.SetDefaultColor(Color.Dark_Gray);
strike_plus4.SetDefaultColor(Color.Dark_Gray);
strike_plus5.SetDefaultColor(Color.Dark_Gray);
strike_plus6.SetDefaultColor(Color.Dark_Gray);
strike_plus7.SetDefaultColor(Color.Dark_Gray);
strike_plus8.SetDefaultColor(Color.Dark_Gray);
strike_plus9.SetDefaultColor(Color.Dark_Gray);
strike_plus10.SetDefaultColor(Color.Dark_Gray);
strike_plus11.SetDefaultColor(Color.Dark_Gray);
strike_plus12.SetDefaultColor(Color.Dark_Gray);
strike_plus13.SetDefaultColor(Color.Dark_Gray);
strike_plus14.SetDefaultColor(Color.Dark_Gray);
strike_plus15.SetDefaultColor(Color.Dark_Gray);
strike_plus16.SetDefaultColor(Color.Dark_Gray);
strike_plus17.SetDefaultColor(Color.Dark_Gray);
strike_plus18.SetDefaultColor(Color.Dark_Gray);
strike_plus19.SetDefaultColor(Color.Dark_Gray);
strike_plus20.SetDefaultColor(Color.Dark_Gray);
strike_plus21.SetDefaultColor(Color.Dark_Gray);

strike_minus1.SetDefaultColor(Color.Dark_Gray);
strike_minus2.SetDefaultColor(Color.Dark_Gray);
strike_minus3.SetDefaultColor(Color.Dark_Gray);
strike_minus4.SetDefaultColor(Color.Dark_Gray);
strike_minus5.SetDefaultColor(Color.Dark_Gray);
strike_minus6.SetDefaultColor(Color.Dark_Gray);
strike_minus7.SetDefaultColor(Color.Dark_Gray);
strike_minus8.SetDefaultColor(Color.Dark_Gray);
strike_minus9.SetDefaultColor(Color.Dark_Gray);
strike_minus10.SetDefaultColor(Color.Dark_Gray);
strike_minus11.SetDefaultColor(Color.Dark_Gray);
strike_minus12.SetDefaultColor(Color.Dark_Gray);
strike_minus13.SetDefaultColor(Color.Dark_Gray);
strike_minus14.SetDefaultColor(Color.Dark_Gray);
strike_minus15.SetDefaultColor(Color.Dark_Gray);
strike_minus16.SetDefaultColor(Color.Dark_Gray);
strike_minus17.SetDefaultColor(Color.Dark_Gray);
strike_minus18.SetDefaultColor(Color.Dark_Gray);
strike_minus19.SetDefaultColor(Color.Dark_Gray);
strike_minus20.SetDefaultColor(Color.Dark_Gray);
strike_minus21.SetDefaultColor(Color.Dark_Gray);
