onload = start;
function start() {

	//TESTING = true;

	if (TESTING) {
		mClass('dTesting', 'd-flex');
		socket = io('http://localhost:3000');
	} else {
		socket = io('https://feedbackserver.herokuapp.com/');
	}
	socket.on('message', handle_message);
	socket.on('gamestate', handle_gamestate);

	dTable = document.getElementById('dTable');
	in_game_screen = false;

	screen_transition('dHeader');
}


