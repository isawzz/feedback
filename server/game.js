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
	DECAY: 2, //automatic decrement per second
	V_INIT: 1, 
	V_MIN: 0.25, 
	V_DECAY: .05, //automatic decrement of decay per second
};

//#region standard code
const E = { green: null, red: null }; //for each button, last click is timestamped

function create_gamestate() { return { green: { pos: Settings.POS_INIT, v: Settings.V_INIT }, red: { pos: Settings.POS_INIT, v: Settings.V_INIT } }; }

function gameloop(state) {
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
	console.log('event', color, e)
}
function update_settings(snew) {
	let intnew = snew.INTERVAL;
	if (intnew != Settings.INTERVAL) { Settings.FR = 1000 / intnew; }
	for (const k in snew) { if (k != 'FR') Settings[k] = snew[k]; }
}
function get_now() { return Date.now(); }

//#endregion

//#region *** update formulas for decay and click event ***
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

//#region unused code
//calculations fe?
function fe(st, e, dps, vps) {
	let tnow = get_now();
	let t = (tnow - e.last) / 1000; //secs past since last event

}
function event_strength(color) {

	let e = E[color];
	let t = get_now();
	console.log('t', t, typeof t);

	let diff = t - e.tlast; e.tlast = t;
	secs = diff / 1000;

	let T = 10; //horizon
	let r = 2; //decay

	raw = Math.max(0., 1 - secs / T) * Math.pow(0.5, (r * secs / T));

	console.log('secs', secs, 'raw', raw,);

	return Math.min(Math.max(0., raw), 1.);
}
function _calc_event_increment(color) {

	console.log('color', color, 'E', E[color],);
	let e = E[color];
	if (e) e.strength = event_strength(color);
	else e = E[color] = { strength: 1, tlast: get_now() };

	let inc = color == 'green' ? Settings.PLUS : Settings.MINUS;

	let current = e.strength;
	let step = 0.6; //stepsize
	let mag = current + (1 - current) * step;

	console.log('mag', mag, current * inc);

	return mag * inc; // E[color].strength * inc;
}

// previous versions for calculations
//1. constant decay: does not use velocity!
//function calc_decay(st, dps) { st.pos -= dps; }
// function calc_event(st, inc) {
// 	st.pos += inc; // inc is constant increment  (Settings.PLUS or Settings.MINUS) 
// 	if (st.pos > 100) st.pos = 100; // upper bound 100%
// }

//#endregion


module.exports = { create_gamestate, gameloop, process_event, update_settings, Settings, Defaults }

