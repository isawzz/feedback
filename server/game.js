const { WINIT, INCGREEN, INCRED, VINIT, VINCGREEN, VINCRED } = require('./constants');

module.exports = {
	createGameState,
	gameLoop,
	getWidthIncrement,
}

function createGameState() { return { green: { width: WINIT, vel: VINIT }, red: { width: WINIT, vel: VINIT } }; }

function bounded(val, inc, min, max) {
	if (val + inc < min) { return min; }
	if (val + inc > max) { return max; }
	return val + inc;
}
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

function decay() {
	
}

function getWidthIncrement(color) { return color === 'green' ? INCGREEN : INCRED; }








