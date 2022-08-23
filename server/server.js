//#region require
const path = require('path');
const express = require("express");

const app = express();
app.use(express.static(path.resolve(__dirname, '')));

const http = require("http");
const server = http.createServer(app);

const cors = require('cors');

const io = require('socket.io')(server, {
	cors: {
		origins: '*',//['http://localhost:' + PORT]
	}
});

//#endregion
const { create_gamestate, gameloop, calc_event, update_settings, Settings, Defaults } = require('./game');

var state = null;
var game_running = false, intervalId = null;

//stage 1
io.on('connection', client => {
	handleConnection(client);

	client.on('pause', handlePause);
	client.on('resume', handleResume);
	client.on('reset', handleReset);
	client.on('plus', handleButton);
	client.on('settings',handleSettings);

});
function handleButton(x) {
	io.emit('message', { msg: x == 'green' ? 'plus' : 'minus' });

	calc_event(state,x);
}
function handleConnection(client) {
	console.log('...connected:', client.id);
	client.emit('settings', { settings: Settings, defaults: Defaults, msg: `welcome to the feedback server` });

	if (!state) state = create_gamestate();
	startGameInterval(state);
}
function handlePause() {
	console.log('pause');
	clearInterval(intervalId); game_running = false;
	io.emit('message', { msg: 'feedback server paused' });
}
function handleReset() {
	console.log('reset');
	clearInterval(intervalId); game_running = false;
	state = create_gamestate();
	startGameInterval(state);
	io.emit('message', { msg: 'feedback server reset' });
}
function handleResume() {
	console.log('resume');
	startGameInterval(state);
	io.emit('message', { msg: 'feedback server running' });
}
function handleSettings(x){
	console.log('client sent',x);
	let s=JSON.parse(x);
	console.log(s);
	update_settings(s);
	handleReset();
}

function startGameInterval(state) {
	if (game_running) return;
	game_running = true;
	intervalId = setInterval(() => {

		let end = gameloop(state);
		//console.log('state:', state);
		if (!end) {
			io.emit('gamestate', JSON.stringify(state));
		} else {
			io.emit('gameover');
			clearInterval(intervalId); game_running = false;

		}

	}, Settings.INTERVAL);
}



let port = process.env.PORT || 3000;
server.listen(port, () => console.log(`listening on ${port}`));
