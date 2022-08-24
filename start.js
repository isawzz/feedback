onload = start;
function start() {

	//TESTING = 'besser'; if (TESTING) { mClass('dTesting', 'd-flex'); }
	// ngrok auf anderen geht nur wenn TESTING NICHT true ist!!!
	// aber live-server geht nur wenn TESTING true ist!

	socket = TESTING ? socket = io('http://localhost:3000') : io();
	socket.on('message', handle_message);
	socket.on('gamestate', handle_gamestate);
	socket.on('settings', handle_settings);

	dTable = document.getElementById('dTable');
	in_game_screen = false;

	if (TESTING) { show_game_screen(true); show_settings(); }
	else screen_transition('dHeader');
}


