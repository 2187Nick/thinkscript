# near_the_money_spx_upper_v4
# 2187Nick
declare upper;
declare once_per_bar;

input Strike_Spacing = 25;
input Premium_Extreme_Level = 1000000;
input symbol = "SPXW";
input set_base_strike_maunually = no;
input manual_base_strike = 4025;

def CurrentYear = GetYear()-2000;
def CurrentMonth = GetMonth();
def CurrentDOM = GetDayOfMonth(GetYYYYMMDD());
def DateString = CurrentYear*10000+CurrentMonth*100+CurrentDOM;

def rounding_factor = if Strike_Spacing > 1 and Strike_Spacing < 25 then -1 else if Strike_Spacing > 24 then -2 else 0;

def auto_base = Round(close, rounding_factor);

def base = if set_base_strike_maunually then manual_base_strike else auto_base;
addlabel(yes, "base_strike: " + base);

def strike_atm = base;
def strike_itm1_call = base - Strike_Spacing;
def strike_itm2_call = base - Strike_Spacing*2;
def strike_otm1_call = Strike_Spacing + base;
def strike_otm2_call = Strike_Spacing + Strike_Spacing * 1 + base;
#def strike_otm3_call = Strike_Spacing + Strike_Spacing * 2 + base;

def strike_itm1_put = base + Strike_Spacing;
def strike_itm2_put = base + Strike_Spacing*2;
def strike_otm1_put = base - Strike_Spacing;
def strike_otm2_put = base - Strike_Spacing - Strike_Spacing * 1;
#def strike_otm3_put = base - Strike_Spacing - Strike_Spacing * 2;


def call_close_itm1 = close("." + GetSymbol() + AsPrice(DateString) +"C" + AsPrice(strike_itm1_call));
def call_volume_itm1 = volume("." + GetSymbol() + AsPrice(DateString) +"C" + AsPrice(strike_itm1_call));

def call_close_itm2 = close("." + GetSymbol() + AsPrice(DateString) +"C" + AsPrice(strike_itm2_call));
def call_volume_itm2 = volume("." + GetSymbol() + AsPrice(DateString) +"C" + AsPrice(strike_itm2_call));

def call_close_price = close("." + GetSymbol() + AsPrice(DateString) +"C" + AsPrice(strike_atm));
def call_volume = volume("." + GetSymbol() + AsPrice(DateString) +"C" + AsPrice(strike_atm));

def call_close_otm1 = close("." + GetSymbol() + AsPrice(DateString) +"C" + AsPrice(strike_otm1_call));
def call_volume1 = volume("." + GetSymbol() + AsPrice(DateString) +"C" + AsPrice(strike_otm1_call));

def call_close_otm2 = close("." + GetSymbol() + AsPrice(DateString) +"C" + AsPrice(strike_otm2_call)); 
def call_volume2 = volume("." + GetSymbol() + AsPrice(DateString) +"C" + AsPrice(strike_otm2_call));

def put_close_price_itm1 = close("." + GetSymbol() + AsPrice(DateString) +"P" + AsPrice(strike_itm1_put));
def put_volume_itm1 = volume("." + GetSymbol() + AsPrice(DateString) +"P" + AsPrice(strike_itm1_put));

def put_close_price_itm2 = close("." + GetSymbol() + AsPrice(DateString) +"P" + AsPrice(strike_itm2_put));
def put_volume_itm2 = volume("." + GetSymbol() + AsPrice(DateString) +"P" + AsPrice(strike_itm2_put));

def put_close_price = close("." + GetSymbol() + AsPrice(DateString) +"P" + AsPrice(strike_atm));
def put_volume = volume("." + GetSymbol() + AsPrice(DateString) +"P" + AsPrice(strike_atm));

def put_close_otm1 = close("." + GetSymbol() + AsPrice(DateString) +"P" + AsPrice(strike_otm1_put));
def put_volume1 = volume("." + GetSymbol() + AsPrice(DateString) +"P" + AsPrice(strike_otm1_put));

def put_close_otm2= close("." + GetSymbol() + AsPrice(DateString) +"P" + AsPrice(strike_otm2_put));
def put_volume2 = volume("." + GetSymbol() + AsPrice(DateString) +"P" + AsPrice(strike_otm2_put));

def call_itm_volumexclose = if isNaN(call_volume_itm1 * call_close_itm1 * 100) then 0 else call_volume_itm1 * call_close_itm1 * 100;
def call_itm_volumexclose1 = if isNaN(call_volume_itm2 * call_close_itm2 * 100) then 0 else call_volume_itm2 * call_close_itm2 * 100;
def call_volumexclose = if IsNan(call_volume * call_close_price * 100) then 0 else call_volume * call_close_price * 100 ;
def call_plusone_volumexclose = if IsNan(call_volume1 * call_close_otm1) then 0 else call_volume1 * call_close_otm1 * 100 ;
def call_plustwo_volumexclose = if IsNan(call_volume2 * call_close_otm2 * 100) then 0 else call_volume2 * call_close_otm2 * 100;

def calls_current_total = call_itm_volumexclose + call_itm_volumexclose1 + call_volumexclose + call_plusone_volumexclose + call_plustwo_volumexclose;

def put_itm_volumexclose = if isNaN(put_volume_itm1 * put_close_price_itm1 * 100) then 0 else put_volume_itm1 * put_close_price_itm1 * 100;
def put_itm_volumexclose1 = if isNaN(put_volume_itm2 * put_close_price_itm2 * 100) then 0 else put_volume_itm2 * put_close_price_itm2 * 100;
def put_volumexclose = if isNaN(put_volume * put_close_price * 100) then 0 else put_volume * put_close_price * 100;
def put_minusone_volumexclose = if isNaN(put_volume1 * put_close_otm1 * 100) then 0 else put_volume1 * put_close_otm1 * 100;
def put_minustwo_volumexclose = if isNaN(put_volume1 * put_close_otm2 * 100) then 0 else put_volume2 * put_close_otm2 * 100;

def puts_current_total =  put_itm_volumexclose + put_itm_volumexclose1 + put_volumexclose + put_minusone_volumexclose + put_minustwo_volumexclose;

def moving_up = if close[1] > close[2] then 1 else 0;
def moving_down = close[1] < close[2];
AddChartBubble(puts_current_total > Premium_Extreme_Level and moving_down, low, "BUY" , color.Green);
AddChartBubble(calls_current_total > Premium_Extreme_Level and moving_up ==1, high, "SELL" , color.red);
