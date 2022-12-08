# near_the_money_spx_v2
# 2187Nick
declare lower;
declare once_per_bar;

input Strike_Spacing = 25;
input highline_millions = 1000000;
input lowline_millions = -1000000;
plot highline = highline_millions;
plot lowline = lowline_millions;
highline.SetDefaultColor(Color.RED);
lowline.SetDefaultColor(Color.GREEN);

input symbol = "SPXW";
input set_base_strike_maunually = no;
input manual_base_strike = 4025;

def CurrentYear = 22;
def CurrentMonth = GetMonth();
def CurrentDOM = GetDayOfMonth(GetYYYYMMDD());
AddLabel(yes, "Today: " + AsPrice(GetYear()) + GetMonth() + GetDayOfMonth(GetYYYYMMDD()));

def rounding_factor = if Strike_Spacing > 1 and Strike_Spacing < 25 then -1 else if Strike_Spacing > 24 then -2 else 0;

def auto_base = Round(close, rounding_factor);
def base = if set_base_strike_maunually then manual_base_strike else auto_base;
addlabel(yes, "base_strike: " + base);


def strike_atm = base;
def strike_itm1_call = base - Strike_Spacing;
def strike_itm2_call = base - Strike_Spacing * 2;
def strike_otm1_call = Strike_Spacing + base;
def strike_otm2_call = Strike_Spacing + Strike_Spacing * 1 + base;
#def strike_otm3_call = Strike_Spacing + Strike_Spacing * 2 + base;

def strike_itm1_put = base + Strike_Spacing;
def strike_itm2_put = base + Strike_Spacing * 2;
def strike_otm1_put = base - Strike_Spacing;
def strike_otm2_put = base - Strike_Spacing - Strike_Spacing * 1;
#def strike_otm3_put = base - Strike_Spacing - Strike_Spacing * 2;



def call_close_itm1 = close("." + symbol + CurrentYear + CurrentMonth + (if CurrentDOM < 10 then Concat(0,(CurrentDOM+"C")) else Concat(CurrentDOM,"C")) + AsPrice(strike_itm1_call));
def call_volume_itm1 = volume("." + symbol + CurrentYear + CurrentMonth + (if CurrentDOM < 10 then Concat(0,(CurrentDOM+"C")) else Concat(CurrentDOM,"C")) + AsPrice(strike_itm1_call));

def call_close_itm2 = close("." + symbol + CurrentYear + CurrentMonth + (if CurrentDOM < 10 then Concat(0,(CurrentDOM+"C")) else Concat(CurrentDOM,"C")) + AsPrice(strike_itm2_call));
def call_volume_itm2 = volume("." + symbol + CurrentYear + CurrentMonth + (if CurrentDOM < 10 then Concat(0,(CurrentDOM+"C")) else Concat(CurrentDOM,"C")) + AsPrice(strike_itm2_call));

def call_close_price = close("." + symbol + CurrentYear + CurrentMonth + (if CurrentDOM < 10 then Concat(0,(CurrentDOM+"C")) else Concat(CurrentDOM,"C")) + AsPrice(strike_atm));
def call_volume = volume("." + symbol + CurrentYear + CurrentMonth + (if CurrentDOM < 10 then Concat(0,(CurrentDOM+"C")) else Concat(CurrentDOM,"C")) + AsPrice(strike_atm));

def call_close_otm1 = close("." + symbol + CurrentYear + CurrentMonth + (if CurrentDOM < 10 then Concat(0,(CurrentDOM+"C")) else Concat(CurrentDOM,"C")) + AsPrice(strike_otm1_call));
def call_volume1 = volume("." + symbol + CurrentYear + CurrentMonth + (if CurrentDOM < 10 then Concat(0,(CurrentDOM+"C")) else Concat(CurrentDOM,"C")) + AsPrice(strike_otm1_call));

def call_close_otm2 = close("." + symbol + CurrentYear + CurrentMonth + (if CurrentDOM < 10 then Concat(0,(CurrentDOM+"C")) else Concat(CurrentDOM,"C")) + AsPrice(strike_otm2_call));
def call_volume2 = volume("." + symbol + CurrentYear + CurrentMonth + (if CurrentDOM < 10 then Concat(0,(CurrentDOM+"C")) else Concat(CurrentDOM,"C")) + AsPrice(strike_otm2_call));

def put_close_price_itm1 = close("." + symbol + CurrentYear + CurrentMonth + (if CurrentDOM < 10 then Concat(0,(CurrentDOM+"P")) else Concat(CurrentDOM,"P")) + AsPrice(strike_itm1_put));
def put_volume_itm1 = volume("." + symbol + CurrentYear + CurrentMonth + (if CurrentDOM < 10 then Concat(0,(CurrentDOM+"P")) else Concat(CurrentDOM,"P")) + AsPrice(strike_itm1_put));

def put_close_price_itm2 = close("." + symbol + CurrentYear + CurrentMonth + (if CurrentDOM < 10 then Concat(0,(CurrentDOM+"P")) else Concat(CurrentDOM,"P")) + AsPrice(strike_itm2_put));
def put_volume_itm2 = volume("." + symbol + CurrentYear + CurrentMonth + (if CurrentDOM < 10 then Concat(0,(CurrentDOM+"P")) else Concat(CurrentDOM,"P")) + AsPrice(strike_itm2_put));

def put_close_price = close("." + symbol + CurrentYear + CurrentMonth + (if CurrentDOM < 10 then Concat(0,(CurrentDOM+"P")) else Concat(CurrentDOM,"P")) + AsPrice(strike_atm));
def put_volume = volume("." + symbol + CurrentYear + CurrentMonth + (if CurrentDOM < 10 then Concat(0,(CurrentDOM+"P")) else Concat(CurrentDOM,"P")) + AsPrice(strike_atm));

def put_close_otm1 = close("." + symbol + CurrentYear + CurrentMonth + (if CurrentDOM < 10 then Concat(0,(CurrentDOM+"P")) else Concat(CurrentDOM,"P")) + AsPrice(strike_otm1_put));
def put_volume1 = volume("." + symbol + CurrentYear + CurrentMonth + (if CurrentDOM < 10 then Concat(0,(CurrentDOM+"P")) else Concat(CurrentDOM,"P")) + AsPrice(strike_otm1_put));

def put_close_otm2 = close("." + symbol + CurrentYear + CurrentMonth + (if CurrentDOM < 10 then Concat(0,(CurrentDOM+"P")) else Concat(CurrentDOM,"P")) + AsPrice(strike_otm2_put));
def put_volume2 = volume("." + symbol + CurrentYear + CurrentMonth + (if CurrentDOM < 10 then Concat(0,(CurrentDOM+"P")) else Concat(CurrentDOM,"P")) + AsPrice(strike_otm2_put));


def call_itm_volumexclose = if IsNaN(call_volume_itm1 * call_close_itm1 * 100) then 0 else call_volume_itm1 * call_close_itm1 * 100;
def call_itm_volumexclose1 = if IsNaN(call_volume_itm2 * call_close_itm2 * 100) then 0 else call_volume_itm2 * call_close_itm2 * 100;
def call_volumexclose = if IsNaN(call_volume * call_close_price * 100) then 0 else call_volume * call_close_price * 100 ;
def call_plusone_volumexclose = if IsNaN(call_volume1 * call_close_otm1) then 0 else call_volume1 * call_close_otm1 * 100 ;
def call_plustwo_volumexclose = if IsNaN(call_volume2 * call_close_otm2 * 100) then 0 else call_volume2 * call_close_otm2 * 100;

def calls_current_total = call_itm_volumexclose + call_itm_volumexclose1 + call_volumexclose + call_plusone_volumexclose + call_plustwo_volumexclose;

plot oneperiodcalls = calls_current_total;
oneperiodcalls.SetPaintingStrategy(PaintingStrategy.HISTOGRAM);
oneperiodcalls.SetLineWeight(5);
oneperiodcalls.SetDefaultColor(Color.GREEN);

def put_itm_volumexclose = if IsNaN(put_volume_itm1 * put_close_price_itm1 * 100) then 0 else put_volume_itm1 * put_close_price_itm1 * 100;
def put_itm_volumexclose1 = if IsNaN(put_volume_itm2 * put_close_price_itm2 * 100) then 0 else put_volume_itm2 * put_close_price_itm2 * 100;
def put_volumexclose = if IsNaN(put_volume * put_close_price * 100) then 0 else put_volume * put_close_price * 100;
def put_minusone_volumexclose = if IsNaN(put_volume1 * put_close_otm1 * 100) then 0 else put_volume1 * put_close_otm1 * 100;
def put_minustwo_volumexclose = if IsNaN(put_volume2 * put_close_otm2 * 100) then 0 else put_volume2 * put_close_otm2 * 100;

def puts_current_total =  put_itm_volumexclose + put_itm_volumexclose1 + put_volumexclose + put_minusone_volumexclose + put_minustwo_volumexclose;

plot puts_1min = 1 - puts_current_total;
puts_1min.SetPaintingStrategy(PaintingStrategy.HISTOGRAM);
puts_1min.SetLineWeight(5);
puts_1min.SetDefaultColor(Color.RED);
