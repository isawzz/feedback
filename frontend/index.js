onload = start;
var socket, greenbar, redbar, game_running, lastgreen=0, lastred=0, granularity, num_calls = 0, num_painted = 0;

function start() {
	//socket = io('http://localhost:3000');
	socket = io('https://feedbackserver.herokuapp.com/');

	socket.on('message', handle_message);
	socket.on('gamestate', handle_gamestate);

	dTable = document.getElementById('dTable');
	game_running = false;
	init_ui();
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
function handle_message(x) {
	console.log('from server:', x.msg);
	//Clientdata.id = x;
}
function handle_gamestate(gamestate) {
	if (!game_running) {
		return;
	}
	gamestate = JSON.parse(gamestate); //from server is sent as string
	requestAnimationFrame(() => paint_game(gamestate));
}
function init_ui() {
	if (game_running) return;
	game_running = true;

	//set granularity depending on screen size
	granularity = 100 / window.innerWidth; console.log('granularity:', granularity);
	mStyle(dTable, { hmin: 500 });
	let d = mDiv(dTable, { w: '100%', box: true, opacity: 0 }, 'dBars');
	mLinebreak(d);
	dgreen = get_progressbar(d, 'green', '+').bar;
	mLinebreak(d);
	dred = get_progressbar(d, 'red', '-').bar;
	mLinebreak(d);

	mAppear(d, 500, null, 'linear');

	let d1=mDiv(d, {gap:12}, 'dButtons',null,['d-flex','justify-content-center']);
	mButton('reset',send_reset,d1);
	mButton('pause',send_pause,d1);
	mButton('resume',send_resume,d1);

}
function onclick_plus_minus(color) { socket.emit('plus', color); }

function paint_game(state) {
	let [wgreen, wred] = [state.green.width, state.red.width];
	// dgreen.style.width = wgreen + '%';
	// dred.style.width = wred + '%';

	num_calls++;
	if (Math.abs(lastgreen - wgreen) > granularity) { dgreen.style.width = wgreen + '%'; num_painted += .5;  lastgreen = wgreen; }
	if (Math.abs(lastred - wred) > granularity) { dred.style.width = wred + '%'; num_painted += .5;  lastred = wred; }

}
function send_reset(){	socket.emit('reset');}
function send_pause(){	socket.emit('pause');}
function send_resume(){	socket.emit('resume');}

