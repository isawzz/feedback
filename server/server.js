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
const { createGameState, gameLoop, getWidthIncrement } = require('./game');
const { FRAMERATE, WINIT } = require('./constants');

//#region io handlers stages
//stage 0
//io.on('connection', client => { client.emit("init", "welcome man!!!!"); });

// io.on('connection', client => {
// 	client.emit("welcome", "welcome man");
// 	client.emit("init", "welcome man!!!!");

// 	handleConnection(client);
// 	client.on('disconnect', () => handleDisconnect(client));
// 	client.on('fromClient', x => handleFromClient(client, x));
// 	client.on('ping', x => handlePing(client, x));
// });

//#endregion

//stage 1
io.on('connection', client => {
	const state = createGameState();

	client.on('plus',handlePlus);

	function handlePlus(x) {
		console.log('plus from:', client.id, x);
		io.emit('plus','hallo');

		const w = getWidthIncrement(x);
		if (w) {
			state[x].width += w;
		}
	}
	

	startGameInterval(client, state);
});

function startGameInterval(client, state){
	const intervalId = setInterval(() => {

		let end = gameLoop(state);
		//console.log('end:', end);
		if (!end){
			client.emit('gameState', JSON.stringify(state));
		}else{
			client.emit('gameOver');
			clearInterval(intervalId)
		}
		state.red.width += state.red.vel;
		state.green.width += state.green.vel;
		
	} , 1000 / FRAMERATE);
}


//#region for later!
function handleConnection(client) {
	console.log('...connected:', client.id);
	io.emit('fromServer', { msg: `user ${client.id} joined` });
}
function handleDisconnect(client) {
	console.log('user disconnected:', client.id);
	io.emit('fromServer', { msg: `user ${client.id} left` });
}
function handleFromClient(client, x) {
	console.log('from client:', client.id, x.msg);
}
function handlePing(client, x) {
	console.log('ping from:', client.id);
	client.emit('ping');
}
//#endregion

let port = process.env.PORT || 3000;
server.listen(port, () => console.log(`listening on ${port}`));
