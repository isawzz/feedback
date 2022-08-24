
//#region fe version
const Defaults = {
	FR: 5, // frames per second
	INTERVAL: 200, // in ms
	POS_INIT: 50, // initial progressbar position at reset, unit: %
	HORIZON: 10, //secs to take into consideration
	DECAY: 2., 
	STEPSIZE: .6,
	SCALE: 1,
};

const Settings = {
	FR: 5, // frames per second
	INTERVAL: 200, // in ms
	POS_INIT: 50, // initial progressbar position at reset, unit: %
	HORIZON: 10, //secs to take into consideration
	DECAY: 2., 
	STEPSIZE: .6,
	SCALE: 1,
};

var activity = {};
var events = [];

function create_gamestate(){
		//initialize events and activity to empty
		activity = {};events = [];
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

	activity[color] = { color:color, 'timestamp': now, 'mag': current + (1 - current) * step }
	console.log('events',events)
	console.log('activity',activity[color]);
}

//var stop=false; //testing
function get_reaction(color, now = null) {
	if (!now) now = get_now();
	val = 0.;

	if (isdef(activity[color])) {
		let e = activity[color];
		let stren = event_strength(e, now);
		val += e['mag'] * stren;
		//if (!stop) {console.log('strength of activity',stren,'+ mag',e.mag,'=',val); stop=true;}

	}

	let i=0;
	for (const e of events) {
		if (e.color != color || e.mag == 0) continue;
		let stren = event_strength(e, now);
		//console.log('strength',stren)
		if (stren == 0) {
			e.mag = 0; //mark event to not process it again
			i++; //purge 0 strength events
		}else {
			let inc = e['mag'] * stren;
			//console.log('adding',inc,'to',val);
			val += inc; //add non-zero strength events
		}
	}

	//console.log('==>val',color,val)
	return val * Settings.SCALE;
}
function event_strength(e, now = null) {
	if (!now) now = get_now();

	start = e['timestamp'];
	t = Math.abs(now - start) / 1000; //seconds since event e

	T = Settings.HORIZON;
	r = Settings.DECAY;

	raw = Math.max(0., 1 - t / T) * Math.pow(0.5, (r * t / T));
	return Math.min(Math.max(0., raw), 1.); //relu

}


function update_settings(snew) {
	let intnew = snew.INTERVAL;
	if (intnew != Settings.INTERVAL) { Settings.FR = 1000 / intnew; }
	for (const k in snew) { if (k != 'FR') Settings[k] = snew[k]; }
}
function isdef(x) { return x !== null && x !== undefined; }
function nundef(x) { return x === null || x === undefined; }
function get_now() { return Date.now(); }

module.exports = { create_gamestate, update_gamestate, process_event, update_settings, Settings, Defaults }

