var is_host, socket, greenbar, redbar, in_game_screen, lastgreen=0, lastred=0, granularity, num_calls = 0, num_painted = 0;


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
	if (!in_game_screen) {
		return;
	}
	gamestate = JSON.parse(gamestate); //from server is sent as string
	requestAnimationFrame(() => paint_game(gamestate));
}
function is_visible(id){return !mBy(id).classList.includes('d-block');}
function screen_transition(idnew,idold){
	if (isdef(idold)) mFade(idold,500,()=>mClassReplace(idold,'d-block','d-none'),'linear');
	mAppear(idnew,500,()=>mClassReplace(idnew,'d-none','d-block'),'linear');
}
function show_intro_screen(){
	if (!in_game_screen) return;
	in_game_screen = false;
	screen_transition('dHeader','dTable');
}
function show_settings(){
	let dp=mDiv('dSettings',{margin:10, padding:20},null,null,'card');

	let html = `			
			<div class="form-group">
				<input type="text" class="coinput" id="username" placeholder="horizon" value="10" />
				<input type="text" class="coinput" id="username" placeholder="horizon" value="10" />
				<input type="text" class="coinput" id="username" placeholder="horizon" value="10" />
				<input type="text" class="coinput" id="username" placeholder="horizon" value="10" />
				<input type="text" class="coinput" id="username" placeholder="horizon" value="10" />
			</div>
	`;
	let df=mDiv(dp,{},null,html,'form');


	mLinebreak(dp,30);


}
function show_game_screen(host=true) {
	if (in_game_screen) return; 
	in_game_screen = true;
	screen_transition('dTable','dHeader');
	is_host = host;

	//set granularity depending on screen size
	granularity = 100 / window.innerWidth; console.log('granularity:', granularity);
	mClear(dTable);
	mStyle(dTable, { hmin: 300 });
	let d = mDiv(dTable, { w: '100%', box: true, opacity: 0 }, 'dBars');
	mAppear(d, 500, null, 'linear');
	mLinebreak(d,20);

	let dp=mDiv(d,{margin:10, padding:20},null,null,'card')
	mLinebreak(dp,20);
	dgreen = get_progressbar(dp, 'green', '+').bar;
	mLinebreak(dp,20);
	dred = get_progressbar(dp, 'red', '-').bar;
	mLinebreak(dp,20);
	let d1=mDiv(dp, {gap:12}, 'dButtons',null,['d-flex','justify-content-center']);
	
	if (!is_host) return;

	mButton('reset',send_reset,d1,{},'button');
	mButton('pause',send_pause,d1,{},'button');
	mButton('resume',send_resume,d1,{},'button');
	mLinebreak(dp,20);
	
}
function onclick_plus_minus(color) { socket.emit('plus', color); }

function onclick_test(){
	if (in_game_screen) show_intro_screen();
	else show_game_screen();
}
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














