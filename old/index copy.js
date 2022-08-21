onload = start;
var socket, greenbar, redbar, game_running, lastgreen, lastred, granularity, num_calls = 0, num_painted = 0;

function start() {
	socket = io('http://localhost:3000');
	// socket = io('https://feedbackserver.herokuapp.com/');

	socket.on('init', handleInit);
	socket.on('gameState', handleGameState);

	dTable = document.getElementById('dTable');
	game_running = false;
	initTable();
}

function initTable() {
	if (game_running) return;

	//set granularity depending on screen size
	granularity = 100 / window.innerWidth; console.log('granularity:', granularity);
	mStyle(dTable, { hmin: 500 });
	let d = mDiv(dTable, { w: '100%', box: true, opacity: 0 }, 'dBars');
	mLinebreak(d);
	dgreen = get_progressbar(d, 'green', '+');
	mLinebreak(d);
	dred = get_progressbar(d, 'red', '-');
	mLinebreak(d);

	mAppear(d, 500, null, 'linear');

	game_running = true;
}

function get_progressbar(dParent, color, sym) {
	//color has to be a word (web color)
	let id = getUID();
	let d = mDiv(dParent, {}, id, null, 'grid_progressbar');
	let button = mButton(sym, () => onclick_plus_minus(color), d);
	let d1 = mDiv(d, {}, null, null, 'progressbar');
	let bar = mDiv(d1, { bg: color, w: 10 + '%' }, 'b_' + color, null, 'barstatus');
	return { bar: bar, button: button, color: color, container: d };
}
function onclick_plus_minus(color) { socket.emit('plus', color); }

function paintGame(state) {

	//only repaint if changed by 1
	console.log('hallo')

	num_calls++;
	let [wgreen, wred] = [state.green.width, state.red.width];
	if (Math.abs(lastgreen - wgreen) >= granularity) { num_painted += .5; dgreen.style.width = wgreen + '%'; lastgreen = wgreen; }
	if (Math.abs(lastred - wred) >= granularity) { num_painted += .5; dgreen.style.width = wred + '%'; lastred = wred; }

}

function handleInit(x) {
	console.log('init', x);
	//Clientdata.id = x;
}
function handleGameState(gameState) {
	if (!game_running) {
		return;
	}
	gameState = JSON.parse(gameState); //from server is sent as string
	requestAnimationFrame(() => paintGame(gameState));
}


//#region socket handlers
// const socket = io('https://sleepy-island-33889.herokuapp.com/');
//const socket = io('http://localhost:3000/'); 
// const io = require("socket.io-client");
// const socket = io("http://localhost:3000/");



function handleGameOver(data) {
	if (!game_running) {
		return;
	}
	data = JSON.parse(data);

	game_running = false;

	if (data.winner === Clientdata.id) {
		alert('You Win!');
	} else {
		alert('You Lose :(');
	}
}

function handleGameCode(gameCode) {
	dAdminLeft.innerText = gameCode;
}

function handleUnknownCode() {
	reset();
	alert('Unknown Game Code')
}

function handleTooManyPlayers() {
	reset();
	alert('This game is already in progress');
}
//#endregion

//#region unused code

function init_canvas() {

	let canvas, ctx;
	canvas = document.getElementById('canvas');
	ctx = canvas.getContext('2d');

	canvas.width = canvas.height = 600;

	ctx.fillStyle = BG_COLOUR;
	ctx.fillRect(0, 0, canvas.width, canvas.height);

}







//#endregion

