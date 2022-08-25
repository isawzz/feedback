//#region my version
const Defaults = {
	INTERVAL: 100, // in ms
	POS_INIT: 50, // initial progressbar position at reset, unit: %
	GREEN: 25, //pos increment per click of fbutton 
	RED: 25,
	DECAY: 0.5, //signal strength decreasing at DECAY**(seconds since last event)
	HORIZON: 10, //only events within last 10 secs are considered
	V: .5, //stepsize? scale?
	VDECAY: .01, //automatic decrement decay when no events
	VMIN: .18,
};

const Settings = {
	INTERVAL: 100, // in ms
	POS_INIT: 50, // initial progressbar position at reset, unit: %
	GREEN: 25, //pos increment per click of fbutton 
	RED: 25,
	DECAY: 0.5, //signal strength decreasing at DECAY**(seconds since last event)
	HORIZON: 10, //only events within last 10 secs are considered
	V: .5, //stepsize? scale?
	VDECAY: .01, //automatic decrement decay when no events
	VMIN: .18,
};

const events = {}; // for each button, for each id timestamp,color,clientid,mag is recorded
var tlast, framerate = 1000/Settings.INTERVAL;
;

function create_gamestate() {
	delete events.green; delete events.red;
	tlast = get_now();
	return { green: { pos: Settings.POS_INIT, v: Settings.V }, red: { pos: Settings.POS_INIT, v: Settings.V } };
}
function process_event(state, color, clientid) {
	//console.log('state',state,'color',color,'id',clientid)
	let mag = calc_event(state[color], color, clientid, Settings[color.toUpperCase()]);
	record(color, clientid, mag);
	tlast = get_now();
}
function update_gamestate(state) {
	if (!state) { return; }
	for (const k of ['green', 'red']) if (state[k].pos > 0) calc_decay(state[k]);
	return false;
}


function calc_event(st, color, clientid, inc) {

	let evs = lookup(events, [color, clientid]);
	//console.log('evs', evs);

	if (evs) {
		console.assert(isList(evs), 'aborting!!!!! evs is not a list!!!!!!!!!');
		let relevs = [];
		for (const e of evs) {
			//console.log(e.timestamp);

			if (e.timestamp == 0) continue;

			let te = e.timestamp;
			let t = get_now();

			let diff = get_sec_diff(t,te);
			// let diff = t - te;
			// console.log('diff in ms', diff);
			// console.log('HORIZON', Settings.HORIZON * 1000);
			if (diff < Settings.HORIZON) relevs.push(e); else e.timestamp = 0;
		}
		//console.log('relevs', relevs);

		// evs = evs.filter(x => Math.abs(get_now() - events.timestamp) < Settings.HORIZON / 1000);
		// console.log('evs', evs.length);

		inc *= Math.pow(0.5, relevs.length);

	}
	// inc=10;
	st.pos += inc;
	if (st.pos > 100) st.pos = 100;
	st.v = Settings.V; //reset auto-decrement

	return inc;
}
function calc_decay(st) {
	st.pos -= Settings.DECAY * st.v;
	st.v *= Math.pow(1 - Settings.VDECAY, get_secs_since_last_event());
	if (st.v < Settings.VMIN) st.v = Settings.VMIN;
}
function get_secs_since_last_event() { return (get_now() - tlast) / 1000; }
function get_sec_diff(t1,t2) { return Math.abs(t1-t2) / 1000; }
function record(color, clientid, mag) {
	lookupAddToList(events, [color, clientid], { timestamp: get_now() }); //,color:color,clientid:clientid,mag:mag})
}
function update_settings(snew) {
	for (const k in snew) { Settings[k] = snew[k]; }
	framerate = 1000 / Settings.INTERVAL;
}

//#region utilities
function get_now() { return Date.now(); }
function isdef(x) { return x !== null && x !== undefined; }
function isEmpty(arr) {
	return arr === undefined || !arr
		|| (isString(arr) && (arr == 'undefined' || arr == ''))
		|| (Array.isArray(arr) && arr.length == 0)
		|| Object.entries(arr).length === 0;
}
function isList(arr) { return Array.isArray(arr); }
function isNumber(x) { return x !== ' ' && x !== true && x !== false && isdef(x) && (x == 0 || !isNaN(+x)); }
function isString(param) { return typeof param == 'string'; }
function lookup(dict, keys) {
	let d = dict;
	let ilast = keys.length - 1;
	let i = 0;
	for (const k of keys) {
		if (k === undefined) break;
		let e = d[k];
		if (e === undefined || e === null) return null; // {console.log('null',k,typeof k);return null;}
		d = d[k];
		if (i == ilast) return d;
		i += 1;
	}
	return d;
}
function lookupAddToList(dict, keys, val) {
	//console.log('events',events)
	//usage: lookupAddToList({a:{b:[2]}}, [a,b], 3) => {a:{b:[2,3]}}
	//usage: lookupAddToList({a:{b:[2]}}, [a,c], 3) => {a:{b:[2],c:[3]}}
	//usage: lookupAddToList({a:[0, [2], {b:[]}]}, [a,1], 3) => { a:[ 0, [2,3], {b:[]} ] }
	let d = dict;
	//console.log(dict)
	let ilast = keys.length - 1;
	let i = 0;
	for (const k of keys) {

		if (i == ilast) {
			if (nundef(k)) {
				//letzter key den ich eigentlich setzen will ist undef!
				console.assert(false, 'lookupAddToList: last key indefined!' + keys.join(' '));
				return null;
			} else if (isList(d[k])) {
				d[k].push(val);
			} else {
				d[k] = [val];
			}
			return d[k];
		}

		if (nundef(k)) continue; //skip undef or null values

		// if (i ==ilast && d[k]) d[k]=val;

		if (d[k] === undefined) d[k] = {};

		d = d[k];
		i += 1;
	}
	return d;
}
function lookupSetOverride(dict, keys, val) {
	let d = dict;
	let ilast = keys.length - 1;
	let i = 0;
	for (const k of keys) {

		//console.log(k,d)
		if (i == ilast) {
			if (nundef(k)) {
				//letzter key den ich eigentlich setzen will ist undef!
				//alert('lookupAddToList: last key indefined!' + keys.join(' '));
				return null;
			} else {
				d[k] = val;
			}
			return d[k];
		}

		if (nundef(k)) continue; //skip undef or null values

		if (nundef(d[k])) d[k] = {};

		d = d[k];
		i += 1;
	}
	return d;
}
function nundef(x) { return x === null || x === undefined; }

//#endregion


module.exports = { create_gamestate, update_gamestate, process_event, update_settings, Settings, Defaults }

