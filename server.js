//#region require
// const path = require('path');
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.use(express.static(__dirname + '/'));
app.get('/', (req, res) => {
	res.sendFile(__dirname + '/index.html');
});
//new code (use old)
// io.on('connection', (socket) => { console.log('a user connected'); });
// server.listen(3000, () => { console.log('listening on *:3000'); });




//old code
// const cors = require('cors');

// const io = require('socket.io')(server, {
// 	cors: {
// 		origins: '*',//['http://localhost:' + PORT]
// 	}
// });

//#endregion
const { create_gamestate, update_gamestate, process_event, update_settings, Settings, Defaults } = require('./game');

var state = null;
var game_running = false, intervalId = null;

//stage 1
io.on('connection', client => {
	handle_connection(client);

	client.on('pause', handle_pause);
	client.on('resume', handle_resume);
	client.on('reset', handle_reset);
	client.on('plus', handle_button);
	client.on('settings', handle_settings);

});
function handle_button(x) {
	io.emit('message', { msg: x == 'green' ? 'plus' : 'minus' });

	process_event(state, x);
}
function handle_connection(client) {
	console.log('...connected:', client.id);
	console.log('Settings', Settings)
	client.emit('settings', { settings: Settings, defaults: Defaults, msg: `welcome to the feedback server` });

	if (!state) state = create_gamestate();
	startGameInterval(state);
}
function handle_pause() {
	console.log('pause');
	clearInterval(intervalId); game_running = false;
	io.emit('message', { msg: 'feedback server paused' });
}
function handle_reset() {
	console.log('reset');
	clearInterval(intervalId); game_running = false;
	state = create_gamestate();
	startGameInterval(state);
	io.emit('message', { msg: 'feedback server reset' });
}
function handle_resume() {
	console.log('resume');
	startGameInterval(state);
	io.emit('message', { msg: 'feedback server running' });
}
function handle_settings(x) {
	console.log('client sent', x);
	let s = JSON.parse(x);
	console.log(s);
	update_settings(s);
	handle_reset();
}

function startGameInterval(state) {
	if (game_running) return;
	game_running = true;
	intervalId = setInterval(() => {

		let end = update_gamestate(state);
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
