onload = start;
var socket;

function start() {
	//#region old socket stuff
	// socket.on('init', handleInit);
	// socket.on('gameState', handleGameState);
	// socket.on('gameOver', handleGameOver);
	// socket.on('gameCode', handleGameCode);
	// socket.on('unknownCode', handleUnknownCode);
	// socket.on('tooManyPlayers', handleTooManyPlayers);
	//endregion

	//socket = io('http://localhost:3000');
	socket = io('https://feedbackserver.herokuapp.com/');
	// use your socket
	socket.on('welcome', (message) => {console.log(message);	});
	socket.on('init', handleInit);
	socket.on('gameState', handleGameState);


	dTable = document.getElementById('dTable');
	const dMain = document.getElementById('dMain');
	const dHeader = document.getElementById('dHeader');
	const newGameBtn = document.getElementById('newGameButton');
	const joinGameBtn = document.getElementById('joinGameButton');

	newGameBtn.addEventListener('click', joinAsHost);
	joinGameBtn.addEventListener('click', joinAsGuest);
	DA.gameActive = false;
	document.addEventListener('keydown', keydown);
	initTable();
	paintGame(DA.state);
}

function joinAsHost() {
	socket.emit('newGame');
	initTable();
}

function joinAsGuest() {
	socket.emit('joinGame', 'feedback');
	initTable();
}

function initTable() {
	if (DA.gameActive) return;
	mStyle(dTable,{hmin:500})
	mFade(mBy('dHeader'), 500, null, 'linear');

	let res = show_bars();
	mAppear(res.d, 500, null, 'linear');

	DA.div = res.d;
	DA.bars = {green:res.green,red:res.red};
	DA.gameActive = true;
	DA.state = { green: { width: 10, vel: 0 }, red: { width: 10, vel: 0 } };
}
function reset() {
	if (!DA.gameActive) return;
	DA.gameActive = false;
	Clientdata.id = null;
	mFade(mBy('dMain'), 500, ()=>DA.div.remove(), 'linear');
	mAppear(mBy('dHeader'), 500, null, 'linear');
}

function get_plus_progressbar(dParent, color, id) {
	//color has to be a word (web color)
	//console.log('dParent', dParent);
	if (nundef(id)) id = getUID();
	let d = mDiv(dParent, {}, id, null, 'grid_progressbar');
	let button = mButton('+', () => onclick_plus(color), d);
	let d1 = mDiv(d, {}, null, null, 'progressbar');
	let bar = mDiv(d1, { bg: color, w: 10 + '%' }, 'b_' + color, null, 'barstatus');
	return { bar:bar,button:button,color:color,container:d };
}
function show_bars() {
	let d = mDiv(dTable, { w: '100%', box: true, opacity: 0 }, 'dBars');
	mLinebreak(d);
	let dgreen = get_plus_progressbar(d, 'green');
	mLinebreak(d);
	let dred = get_plus_progressbar(d, 'red');
	mLinebreak(d);

	return {d:d,green:dgreen,red:dred};
}
function onclick_plus(color){
	console.log('onclick_plus');
	socket.emit('plus', color);
}

function keydown(e) {
	console.log(e.keyCode);
	//socket.emit('keydown', e.keyCode);
}

function paintGame(state) {
	console.log('paint!',state)
	for(const k in state) {
		let bar = DA.bars[k];
		mStyle(bar.bar,{w:`${state[k].width}%`});
	}
}


function handleInit(x) {
	console.log('init', x);
	//Clientdata.id = x;
}
function handleGameState(gameState) {
	if (!DA.gameActive) {
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
	if (!DA.gameActive) {
		return;
	}
	data = JSON.parse(data);

	DA.gameActive = false;

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

function init_canvas(){

	let canvas, ctx;
	canvas = document.getElementById('canvas');
	ctx = canvas.getContext('2d');

	canvas.width = canvas.height = 600;

	ctx.fillStyle = BG_COLOUR;
	ctx.fillRect(0, 0, canvas.width, canvas.height);

}







//#endregion

