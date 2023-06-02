# Gamma Exposure (Naive)

This calculates gex per 1% move in the underlying asset.

(Currently it only works for weekly option contracts in the current month.)

The GEX is displayed in millions.


######
######

GEX Open Interest:

    Option's Gamma * Contract Size * Open Interest * Spot Price ^2 * .01 *(-1 if puts)

GEX Live Volume:

    Option's Gamma * Contract Size * Volume *  Spot Price ^2 * .01 *(-1 if puts)
