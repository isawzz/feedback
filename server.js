
// *** pick your version for functions here: ***
var game_version = './game_besser'; // similar to fe version
//var game_version = './game_fe'; // attempt to replicate fe version
//var game_version = './game'; // primitive version

//#region boilerplate
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");

const cors = require('cors');

const io = new Server(server, {
	cors: {
		origins: '*',//['http://localhost:' + PORT]
	}
});

//const io = new Server(server);

app.use(express.static(__dirname + '/'));
app.get('/', (req, res) => {
	res.sendFile(__dirname + '/index.html');
});

//#endregion

const { create_gamestate, update_gamestate, process_event, update_settings, Settings, Defaults } = require(game_version);

var state = null;
var game_running = false, intervalId = null;

io.on('connection', client => {
	handle_connection(client);

	client.on('pause', handle_pause);
	client.on('resume', handle_resume);
	client.on('reset', handle_reset);
	client.on('fbutton', x => handle_button(x, client.id));
	client.on('settings', handle_settings);
	client.on('disconnect', x => console.log(`${x} disconnected`));

});
function handle_connection(client) {
	console.log('...connected:', client.id);
	if (!state) state = create_gamestate();
	start_interval(state);
	client.emit('settings', { id: client.id, state: state, settings: Settings, defaults: Defaults, msg: `welcome to the feedback server` });
}
function handle_button(x, clientid) {
	io.emit('message', `${x == 'green' ? 'plus' : 'minus'} from ${clientid}`);
	process_event(state, x, clientid);
}
function handle_pause() {
	console.log('pause');
	stop_interval();
	io.emit('message', { msg: 'feedback server paused' });
}
function handle_reset() {
	console.log('reset');
	stop_interval();
	state = create_gamestate();
	start_interval(state);
	io.emit('message', { msg: 'feedback server reset' });
}
function handle_resume() {
	console.log('resume');
	start_interval(state);
	io.emit('message', { msg: 'feedback server running' });
}
function handle_settings(x) {
	console.log('client sent', x);
	let s = JSON.parse(x);
	console.log(s);
	update_settings(s);
	handle_reset();
}
function stop_interval(){clearInterval(intervalId); game_running = false;}
function start_interval(state) {
	if (game_running) return;
	game_running = true;
	intervalId = setInterval(() => {

		let end = update_gamestate(state);
		//console.log('state:', state);
		if (!end) {
			io.emit('gamestate', state); 
		} else {
			io.emit('gameover');
			clearInterval(intervalId); game_running = false;
		}

	}, Settings.INTERVAL);
}

let port = 3000;
server.listen(process.env.PORT || port, () => console.log(`listening on ${process.env.PORT || port}`));
