var is_host, socket, settings, defaults, greenbar, redbar, in_game_screen, lastgreen = 0, lastred = 0, granularity, num_calls = 0, num_painted = 0;

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
function handle_settings(x) {
	console.log('message from server:', x.msg);
	settings = x.settings;
	defaults = x.defaults;
	console.log('settings:', settings);
	console.log('defaults:', defaults);
	//Clientdata.id = x;
}
function is_visible(id) { return !mBy(id).classList.includes('d-block'); }
function onclick_plus_minus(color) { socket.emit('plus', color); }

function onclick_test() {
	if (in_game_screen) show_intro_screen();
	else show_game_screen();
}
function onclick_settings_test() {
	console.log('settings', settings);
	socket.emit('settings', { settings: settings });
}

function paint_game(state) {
	let [wgreen, wred] = [state.green.pos, state.red.pos];
	dgreen.style.width = wgreen + '%';
	dred.style.width = wred + '%';

	// num_calls++;
	// if (Math.abs(lastgreen - wgreen) > granularity) { dgreen.style.width = wgreen + '%'; num_painted += .5; lastgreen = wgreen; }
	// if (Math.abs(lastred - wred) > granularity) { dred.style.width = wred + '%'; num_painted += .5; lastred = wred; }

}
function screen_transition(idnew, idold) {
	if (isdef(idold)) mFade(idold, 500, () => mClassReplace(idold, 'd-block', 'd-none'), 'linear');
	mAppear(idnew, 500, () => mClassReplace(idnew, 'd-none', 'd-block'), 'linear');
}
function send_reset() { socket.emit('reset'); }
function send_pause() { socket.emit('pause'); }
function send_resume() { socket.emit('resume'); }
function show_intro_screen() {
	if (!in_game_screen) return;
	in_game_screen = false;
	screen_transition('dHeader', 'dTable');
	mBy('dSettingsButton').style.opacity = 0;

}
function show_game_screen(host = true) {
	if (in_game_screen) return;
	in_game_screen = true;
	screen_transition('dTable', 'dHeader');
	is_host = host;

	//set granularity depending on screen size
	granularity = 100 / window.innerWidth; console.log('granularity:', granularity);
	mClear(dTable);
	mStyle(dTable, { hmin: 300 });
	let d = mDiv(dTable, { w: '100%', box: true, opacity: 0 }, 'dBars');
	mAppear(d, 500, null, 'linear');
	mLinebreak(d, 20);

	let dp = mDiv(d, { margin: 10, padding: 20 }, null, null, 'card')
	mLinebreak(dp, 20);
	dgreen = get_progressbar(dp, 'green', '+').bar;
	mLinebreak(dp, 20);
	dred = get_progressbar(dp, 'red', '-').bar;
	mLinebreak(dp, 20);

	if (!is_host) return;

	let d1 = mDiv(dp, { gap: 12 }, 'dButtons', null, ['d-flex', 'justify-content-center']);
	mButton('reset', send_reset, d1, {}, 'button');
	mButton('pause', send_pause, d1, {}, 'button');
	mButton('resume', send_resume, d1, {}, 'button');
	mLinebreak(dp, 20);
	mBy('dSettingsButton').style.opacity = 1;
}

function show_settings() {

	if (nundef(settings)) { settings = { DECAY: 2, FR: 5, INTERVAL: 200, MINUS: 5, PLUS: 10, V_DECAY: .05, V_INIT: 1, V_MIN: 0.25, POS_INIT: 50, exp_decay: "x * Math.pow((1 - DECAY)", }; }

	let dp = mBy('dSettings') ?? mDiv(dTable, { box: true, margin: 10, padding: 20 }, 'dSettings', null, 'card');
	mClear(dp);
	let dp1 = mDiv(dp, { align: 'center' })
	let [dleft, dright] = mColFlex(dp1, [1, 1]); //,['blue','red']);	

	let lleft = 'pos_init decay plus minus';
	let lright = 'v_init v_decay v_min interval';
	//let lines = 'exp_decay exp_green exp_red';
	let d = dleft;
	for (const k of toWords(lleft)) {
		let di = mDiv(d, { w: 300 }, null, null, ['coinput', 'd-flex']);
		let label = (k.includes('decay') ? k + '/s' : k == 'interval' ? k + ' in ms' : k) + ':';
		let key = k.toUpperCase();
		//let val = k.includes('decay')?settings[key]*1000/settings.INTERVAL:settings[key];
		let dn = mEditNumber(label, settings[key], di, null, { w: '100%' }, null, `i_${k}`);
	}
	d = dright;
	for (const k of toWords(lright)) {
		let di = mDiv(d, { w: 300 }, null, null, ['coinput', 'd-flex']);
		let label = (k.includes('decay') ? k + '/s' : k == 'interval' ? k + ' in ms' : k) + ':';
		let key = k.toUpperCase();
		//let val = k.includes('decay')?settings[key]*1000/settings.INTERVAL:settings[key];
		let dn = mEditNumber(label, settings[key], di, null, { w: '100%' }, null, `i_${k}`);
	}

	mLinebreak(dp, 10);
	let d1 = mDiv(dp, { gap: 12 }, 'dButtons', null, ['d-flex', 'justify-content-center']);
	mButton('update', update_settings, d1, {}, 'button');
	mButton('defaults', reset_settings, d1, {}, 'button');
}
function reset_settings() {
	for (const k in settings) { settings[k] = defaults[k]; }
	show_settings();
}
function update_settings() {
	for (const k in settings) {
		let lower = k.toLowerCase();
		let inp = mBy(`i_${lower}`);
		if (isdef(inp)) {
			let value = Number(inp.innerHTML);
			if (isNumber(value)) settings[k] = value;
		}
	}
	socket.emit('settings', JSON.stringify(settings));
}













