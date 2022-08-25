//#region my version
const Defaults = {
	INTERVAL: 100, // in ms
	POS_INIT: 50, // initial progressbar position at reset, unit: %
	PLUS: 10, //pos increment per click of fbutton 
	MINUS: 5,
	DECAY: 2, //automatic decrement per second
	V: 1,
	VMIN: 0.25,
	VDECAY: .05, //automatic decrement of decay per second
};

const Settings = {
	INTERVAL: 50, // in ms
	POS_INIT: 50, // initial progressbar position at reset, unit: %
	PLUS: 10, //pos increment per click of fbutton 
	MINUS: 5,
	DECAY: 4, //automatic decrement per second
	V: 1.2,
	VMIN: 0.2,
	VDECAY: .05, //automatic decrement of decay per second
};

const E = { green: null, red: null }; //for each button, last click is timestamped
var framerate = 1000/Settings.INTERVAL;


function create_gamestate() { return { green: { pos: Settings.POS_INIT, v: Settings.V }, red: { pos: Settings.POS_INIT, v: Settings.V } }; }

function update_gamestate(state) {
	if (!state) { return; }
	for (const k of ['green', 'red']) if (state[k].pos > 0) calc_decay(state[k], (Settings.DECAY / framerate), (Settings.VDECAY / framerate));
	return false;
}
function process_event(state, color) {
	record(state, color);
	calc_event(state[color], color == 'green' ? Settings.PLUS : Settings.MINUS);
}
function record(state, color) {
	if (!E[color]) E[color] = {};
	let e = E[color];
	e.tlast = get_now();
	//console.log('event', color, e)
}
function update_settings(snew) {
	for (const k in snew) { Settings[k] = snew[k]; }
	framerate = 1000 / Settings.INTERVAL;
}
function isdef(x) { return x !== null && x !== undefined; }
function nundef(x) { return x === null || x === undefined; }
function get_now() { return Date.now(); }

//#endregion

function calc_decay(st, dps, vps) {
	st.pos -= dps * st.v;
	if (st.v > Settings.VMIN) st.v -= vps; //velocity bounded by VMIN
}
function calc_event(st, inc) {
	st.pos += inc;
	if (st.pos > 100) st.pos = 100; // upper bound 100%
	st.v = Settings.V; //velocity of decay is reset to initial value
}

module.exports = { create_gamestate, update_gamestate, process_event, update_settings, Settings, Defaults }

