//#region my version
const Defaults = {
	FR: 5, // frames per second
	INTERVAL: 200, // in ms
	POS_INIT: 50, // initial progressbar position at reset, unit: %
	PLUS: 10, //pos increment per click of plus 
	MINUS: 5,
	DECAY: 2, //automatic decrement per second
	V_INIT: 1,
	V_MIN: 0.25,
	V_DECAY: .05, //automatic decrement of decay per second
};

const Settings = {
	FR: 5, // frames per second
	INTERVAL: 200, // in ms
	POS_INIT: 50, // initial progressbar position at reset, unit: %
	PLUS: 10, //pos increment per click of plus 
	MINUS: 5,
	DECAY: 4, //automatic decrement per second
	V_INIT: 1,
	V_MIN: 0.1,
	V_DECAY: .05, //automatic decrement of decay per second
};

const E = { green: null, red: null }; //for each button, last click is timestamped

function create_gamestate() { return { green: { pos: Settings.POS_INIT, v: Settings.V_INIT }, red: { pos: Settings.POS_INIT, v: Settings.V_INIT } }; }

function update_gamestate(state) {
	if (!state) { return; }
	for (const k of ['green', 'red']) if (state[k].pos > 0) calc_decay(state[k], (Settings.DECAY / Settings.FR), (Settings.V_DECAY / Settings.FR));
	return false;
}
function process_event(state, color) {
	record(state, color);
	calc_event(state[color], color == 'green' ? Settings.PLUS : Settings.MINUS);
	//if (state[color].pos > 100) state[color].pos = 100; //do it unten fuer verstaendlichkeit
}
function record(state, color) {
	if (!E[color]) E[color] = {};
	let e = E[color];
	e.tlast = get_now();
	//console.log('event', color, e)
}
function update_settings(snew) {
	let intnew = snew.INTERVAL;
	if (intnew != Settings.INTERVAL) { Settings.FR = 1000 / intnew; }
	for (const k in snew) { if (k != 'FR') Settings[k] = snew[k]; }
}
function isdef(x) { return x !== null && x !== undefined; }
function nundef(x) { return x === null || x === undefined; }
function get_now() { return Date.now(); }

//#endregion

// *** update formulas for decay and click event ***
//2. decay soll solange nicht geclickt wird immer langsamer werden
function calc_decay(st, dps, vps) {
	//st  ... state {pos, v}, one for each progress bar
	//dps ... decrement of pos per second (DECAY / FR)
	//vps ... decrement of velocity v per second (V_DECAY / FR)
	st.pos -= dps * st.v;
	if (st.v > Settings.V_MIN) st.v -= vps; //velocity bounded by V_MIN
}
function calc_event(st, inc) {
	//st  ... state {pos, v}, one for each progress bar
	//inc ... constant increment for each progressbar on click (Settings.PLUS or Settings.MINUS) 
	st.pos += inc;
	if (st.pos > 100) st.pos = 100; // upper bound 100%
	st.v = Settings.V_INIT; //velocity of decay is reset to initial value
}

module.exports = { create_gamestate, update_gamestate, process_event, update_settings, Settings, Defaults }

