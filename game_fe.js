
//#region fe version
const Defaults = {
	INTERVAL: 200, // in ms
	POS_INIT: 50, // initial progressbar position at reset, unit: %
	HORIZON: 10, //secs to take into consideration
	DECAY: 2.,
	STEPSIZE: .6,
	SCALE: 1,
};

const Settings = {
	INTERVAL: 200, // in ms
	POS_INIT: 0, // macht hier keinen sinn != 0
	HORIZON: 10, //secs to take into consideration
	DECAY: 2.,
	STEPSIZE: .6,
	SCALE: 1,
};

var activity = {};
var events = [];
var framerate = 1000/Settings.INTERVAL;

function create_gamestate() {
	//initialize events and activity to empty
	activity = {}; events = [];
	return { green: { pos: Settings.POS_INIT, v: 0 }, red: { pos: Settings.POS_INIT, v: 0 } };
}
function update_gamestate(state) {
	//hier wird current pos fuer green, red berechnet!
	if (!state) { return; }
	for (const k of ['green', 'red']) {
		//state[k].pos = 100 * get_reaction(k); //testing
		state[k].pos = Math.min(100 * get_reaction(k), 100); //zur sicherheit!
	}
	return false;
}
function process_event(state, color) {
	contribute(color);
}
function contribute(color) {
	//wird aufgerufen in button click
	let now = get_now();

	let current = 0.; // zwischen 0 und 1

	if (isdef(activity[color])) {
		current = event_strength(activity[color], now);
		events.push(activity[color]);
	}

	let step = Settings.STEPSIZE;

	//==>if current=0 (event noch nicht in diesem horizon vorgekommen) 

	activity[color] = { color: color, 'timestamp': now, 'mag': current + (1 - current) * step }
	//console.log('events',events)
	//console.log('activity',activity[color]);
}

//var stop=false; //testing
function get_reaction(color, now = null) {
	if (!now) now = get_now();
	val = 0.;

	if (isdef(activity[color])) {
		let e = activity[color];
		let stren = event_strength(e, now);
		let inc = e.mag * stren;
		val += inc; //add non-zero strength events
		//console.log('inc', inc.toFixed(2));
		//console.log('e.mag',e.mag.toFixed(2),'stren',stren.toFixed(2));
	}

	for (const e of events) {
		if (e.color != color || e.mag == 0) continue;
		let stren = event_strength(e, now);
		//console.log('strength',stren)
		if (stren == 0) {
			e.mag = 0; //mark event to not process it again
		} else {
			let inc = e.mag * stren;
			val += inc; //add non-zero strength events
			//console.log('inc', inc.toFixed(2));
			//console.log('e.mag',e.mag.toFixed(2),'stren',stren.toFixed(2));
		}
	}

	//console.log('val', val.toFixed(2));	
	//console.log();
	return val * Settings.SCALE / (events.length+1);
}
function event_strength(e, now = null) {
	if (!now) now = get_now();

	start = e['timestamp'];
	t = Math.abs(now - start) / 1000; //seconds since event e

	T = Settings.HORIZON;
	r = Settings.DECAY;

	raw = Math.max(0., 1 - t / T) * Math.pow(0.5, (r * t / T)); //halflife
	//console.log('raw',raw)
	
	return Math.min(Math.max(0., raw), 1.); //relu

}


function update_settings(snew) {
	for (const k in snew) { Settings[k] = snew[k]; }
	framerate = 1000 / Settings.INTERVAL;
}
function isdef(x) { return x !== null && x !== undefined; }
function nundef(x) { return x === null || x === undefined; }
function get_now() { return Date.now(); }

module.exports = { create_gamestate, update_gamestate, process_event, update_settings, Settings, Defaults }

