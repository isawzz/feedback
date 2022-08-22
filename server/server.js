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
const { createGameState, gameLoop, processEvent } = require('./game');
const { FRAMERATE, WINIT } = require('./constants');
var state = null;
var game_running = null;

//stage 1
io.on('connection', client => {
	handleConnection(client);

	client.on('pause', handlePause);
	client.on('resume', handleResume);
	client.on('reset', handleReset);
	client.on('plus', handleButton);

});
function handleConnection(client) {
	console.log('...connected:', client.id);
	client.emit('message', { msg: `welcome to the feedback server` });

	if (!state) state = createGameState();
	if (!game_running) startGameInterval(state);
}
function handlePause() {
	console.log('pause');
	clearInterval(game_running);
	io.emit('message', { mgs: 'feedback server paused' });
}
function handleResume() {
	console.log('resume');
	startGameInterval(state);
	io.emit('message', { mgs: 'feedback server running' });
}
function handleReset() {
	console.log('reset');
	state = createGameState();
	io.emit('message', { mgs: 'feedback server reset' });
}
function handleButton(x) {
	io.emit('message', { msg: x == 'green' ? 'plus' : 'minus' });

	state[x].width += processEvent(x);
}

function startGameInterval(state) {
	if (game_running) return;
	game_running = true;
	const intervalId = setInterval(() => {

		let end = gameLoop(state);
		//console.log('end:', end);
		if (!end) {
			io.emit('gamestate', JSON.stringify(state));
		} else {
			io.emit('gameover');
			clearInterval(intervalId);
		}
		state.red.width += state.red.vel;
		state.green.width += state.green.vel;

	}, 1000 / FRAMERATE);
}



let port = process.env.PORT || 3000;
server.listen(port, () => console.log(`listening on ${port}`));
