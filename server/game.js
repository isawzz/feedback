var FR_INIT = 5;
const Defaults = {
	FR: FR_INIT,
	INTERVAL: 1000 / FR_INIT,
	W_INIT: 50,
	PLUS: 10, //inc w at plus 
	MINUS: 5,
	DECAY: 2, //dec per second
	V_INIT: 1,
	V_MIN: 0.25,
	V_DECAY: .05,
};

const Settings = {
	FR: FR_INIT,
	INTERVAL: 1000 / FR_INIT,
	W_INIT: 50,
	PLUS: 10, //inc w at plus 
	MINUS: 5,
	DECAY: 2, //dec per second
	V_INIT: 1,
	V_MIN: 0.25,
	V_DECAY: .05,
	exp_decay: 'x * Math.pow((1 - DECAY)'
};

// const INTERVAL = 1000 / FR_INIT;
// const W_INIT = 50;
// const PLUS = 10; //inc w at plus 
// const MINUS = 5;
// const DECAY = 2 / FR_INIT; //-0.0005;
// const V_INIT = 1;
// const V_MIN = 0.25;
// const V_DECAY = .05 / FR_INIT;
const E = { green: null, red: null };

function create_gamestate() { return { green: { width: Settings.W_INIT, vel: Settings.V_INIT }, red: { width: Settings.W_INIT, vel: Settings.V_INIT } }; }

function gameloop(state) {
	if (!state) { return; }
	for (const k of ['green', 'red']) if (state[k].width > 0) calc_decay(state[k]);
	return false;
}

//constant decay
//function calc_decay(st) { st.width -= (Settings.DECAY / Settings.FR); }

//decay soll solange nicht geclickt wird immer langsamer werden
function calc_decay(st) {
	st.width -= (Settings.DECAY / Settings.FR) * st.vel;
	if (st.vel > Settings.V_MIN) st.vel -= (Settings.V_DECAY / Settings.FR); //else console.log('vel min!', st.vel);
}
function calc_event(state, color) {
	record(state, color);
	state[color].width += color == 'green' ? Settings.PLUS : Settings.MINUS;
}

function record(state, color) {
	if (!E[color]) E[color] = {};
	let e = E[color];
	e.tlast = get_now();

	state[color].vel = Settings.V_INIT;
}


function update_settings(snew) {

	let intnew = snew.INTERVAL;
	if (intnew != Settings.INTERVAL) {
		//interval = 1000 / fr
		//fr = 1000 / int
		Settings.FR = 1000 / intnew;
	}

	for (const k in snew) {
		if (k != 'FR') Settings[k] = snew[k];
	}


}





//calculations fe?
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

function bounded(val, inc, min, max) {
	if (val + inc < min) { return min; }
	if (val + inc > max) { return max; }
	return val + inc;
}
function get_now() { return Date.now(); }



module.exports = { create_gamestate, gameloop, calc_event, update_settings, Settings, Defaults }

