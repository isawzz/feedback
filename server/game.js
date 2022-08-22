const { WINIT, INCGREEN, INCRED, VINIT, VINCGREEN, VINCRED } = require('./constants');

module.exports = {
	createGameState,
	gameLoop,
	processEvent,
}

const E = { green: null, red: null, last_time: null };
function createGameState() { return { green: { width: WINIT, vel: VINIT }, red: { width: WINIT, vel: VINIT } }; }


function gameLoop(state) {
	if (!state) { return; }

	const green = state.green;
	const red = state.red;

	green.width = bounded(green.width, green.vel, 0, 100);
	red.width = bounded(red.width, red.vel, 0, 100);

	//friction: velocity automatically reduced by .1 every tick
	//green.vel = bounded(green.vel, VINCGREEN, -1, 1);
	//red.vel = bounded(red.vel, VINCRED, -1, 1);

	//check ob irgendwelche clicks waren: wie mach ich das?????????

	return false; // (green.width === red.width); //end condition! (for now)

}

function event_strength(color) {

	let e = E[color];
	let t = get_now();
	console.log('t', t, typeof t);

	let diff = t - e.tlast; e.tlast = t
	secs = diff / 1000;

	let T = 10; //horizon
	let r = 2; //decay

	raw = Math.max(0., 1 - secs / T) * Math.pow(0.5, (r * secs / T));

	console.log('secs', secs, 'raw', raw,);

	return Math.min(Math.max(0., raw), 1.);
}
function processEvent(color) {

	console.log('color', color, 'E', E[color],);
	let e = E[color];
	if (e) e.strength = event_strength(color);
	else e = E[color] = { strength: 1, tlast: get_now() };

	let inc = color == 'green' ? INCGREEN : INCRED;

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




