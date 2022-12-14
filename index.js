var gamestate = null, is_host, socket, settings, defaults, dgreen, dred, in_game_screen; //, lastgreen = 0, lastred = 0, granularity, num_calls = 0, num_painted = 0;

function clear_table(){mClear(dTable);}
function get_progressbar(dParent, color, sym, val = 0) {
	//color has to be a word (web color)
	let id = getUID();
	let d = mDiv(dParent, {}, id, null, 'grid_progressbar');
	let button = mButton(sym, () => onclick_plus_minus(color), d, { w: 30 });
	let d1 = mDiv(d, {}, null, null, 'progressbar');
	let bar = mDiv(d1, { bg: color, w: val + '%' }, 'b_' + color, null, 'barstatus');
	return { bar: bar, button: button, color: color, container: d };
}
function handle_message(x) {
	//console.log('from server:', x);
}
function handle_gamestate(state) {
	if (!in_game_screen) { return; } //console.log('intro');
	//state = JSON.parse(state); //from server is sent as string
	gamestate = state;
	requestAnimationFrame(() => paint_game(state));
}
function handle_settings(x) {
	console.log('message from server:', x.msg);
	settings = x.settings;
	defaults = x.defaults;
	gamestate = x.state;
	console.log('gamestate is', gamestate);
	//console.log('settings:', settings);
	//console.log('defaults:', defaults);
	//Clientdata.id = x;
}
function init_table() {
	mClear(dTable);
	mStyle(dTable, { hmin: 300 });
	let d = mDiv(dTable, { w: '100%', box: true, opacity: 0 }, 'dBars');
	mAppear(d, 500, null, 'linear');
	mLinebreak(d, 20);

	let dp = mDiv(d, { margin: 10, padding: 20 }, null, null, 'card')
	mLinebreak(dp, 20);
	dgreen = get_progressbar(dp, 'green', '+', gamestate ? gamestate.green.pos : 0).bar;
	mLinebreak(dp, 20);
	dred = get_progressbar(dp, 'red', '-', gamestate ? gamestate.red.pos : 0).bar;
	mLinebreak(dp, 20);

	let d1 = mDiv(dp, { gap: 12 }, 'dButtons', null, ['d-flex', 'justify-content-center']);
	if (is_host) {
		mButton('reset', send_reset, d1, {}, 'button');
		mButton('pause', send_pause, d1, {}, 'button');
		mButton('resume', send_resume, d1, {}, 'button');
		mLinebreak(dp, 20);
		mBy('dSettingsButton').style.opacity = 1;
	}
}
function onclick_plus_minus(color) { socket.emit('fbutton', color); }

function onclick_test() {
	if (in_game_screen) show_intro_screen();
	else show_game_screen();
}
function onclick_settings_test() {
	console.log('settings', settings);
	socket.emit('settings', { settings: settings });
}
function paint_game(state) {
	if (nundef(dgreen)) return;
	if (nundef(state) && gamestate) state = gamestate;
	dgreen.style.width = state.green.pos + '%';
	dred.style.width = state.red.pos + '%';
}
function screen_transition(idnew, idold, callback = null) {
	if (isdef(idold)) mFade(idold, 500, () => {
		mClassReplace(idold, 'd-block', 'd-none');
		mBy(idnew).style.opacity = 0;
		mClassReplace(idnew, 'd-none', 'd-block');
		if (callback) callback();
		mAppear(idnew, 250, null, 'linear');
	}, 'linear');
	else{
		mClassReplace(idnew, 'd-none', 'd-block');
		if (callback) callback();
		mAppear(idnew, 250, null, 'linear');

	}
	//mClassReplace(idnew, 'd-none', 'd-block');
	//mAppear(idnew, 500, () => mClassReplace(idnew, 'd-none', 'd-block'), 'linear'); //, () => {mClassReplace(idnew, 'd-none', 'd-block');if (callback) callback();}, 'linear');
}
function send_reset() { socket.emit('reset'); }
function send_pause() { socket.emit('pause'); }
function send_resume() { socket.emit('resume'); }
function send_ping() { socket.emit('ping'); }
function show_intro_screen() {
	if (!in_game_screen) return;
	in_game_screen = false;
	screen_transition('dHeader', 'dTable', clear_table);
	mBy('dSettingsButton').style.opacity = 0;

}
function show_game_screen(host = true) {
	if (in_game_screen) return;
	in_game_screen = true;
	screen_transition('dTable', 'dHeader', init_table);
	is_host = host;
	//granularity = 100 / window.innerWidth; //set granularity depending on screen size
}
function show_settings() {
	//TESTING!!!!!
	if (nundef(settings) && TESTING) {
		settings = TESTING == 'fe' ? { POS_INIT: 0, HORIZON: 10, DECAY: 2, INTERVAL: 200, STEPSIZE: .6, SCALE: 1 }
			: TESTING == 'besser' ? { DECAY: 2, INTERVAL: 200, RED: 5, GREEN: 10, VDECAY: .05, V: 1, VMIN: 0.25, POS_INIT: 50 }
				: { DECAY: 2, INTERVAL: 200, MINUS: 5, PLUS: 10, VDECAY: .05, V: 1, VMIN: 0.25, POS_INIT: 50, exp_decay: "x * Math.pow((1 - DECAY)" }
	}

	let dp = mBy('dSettings') ?? mDiv(dTable, { box: true, margin: 10, padding: 20 }, 'dSettings', null, 'card');
	mClear(dp);
	// let dp1 = mDiv(dp, { align: 'center' })
	// let [dleft, dright] = mColFlex(dp1, [1, 1]); //,['blue','red']);	

	let dp0 = mDiv(dp, { align: 'center' });

	let dp1 = mDiv(dp0, { gap: 20 }, null, null, ['d-flex', 'justify-content-center']);
	// let dp1 = mGrid(1, 2, dp0, { w: '80%', align: 'center' })

	let [dleft, dright] = [mDiv(dp1), mDiv(dp1)];

	let lleft = 'pos_init decay plus green minus red horizon';
	let lright = 'v vdecay vmin interval stepsize scale';
	//let lines = 'exp_decay exp_green exp_red';
	let d = dleft;
	for (const k of toWords(lleft)) {
		let key = k.toUpperCase();
		let val = settings[key];
		//console.log('key', key, val)
		if (nundef(val)) continue;
		let di = mDiv(d, { wmin: 200 }, null, null, ['coinput', 'd-flex']);
		let label = (k.includes('decay') ? k + '/s' : k == 'interval' ? k + ' (ms)' : k) + ':';
		//let val = k.includes('decay')?settings[key]*1000/settings.INTERVAL:settings[key];
		let dn = mEditNumber(label, val, di, null, { w: '100%' }, null, `i_${k}`);
	}
	d = dright;
	for (const k of toWords(lright)) {
		let key = k.toUpperCase();
		let val = settings[key];
		if (nundef(val)) continue;
		let di = mDiv(d, { wmin: 200 }, null, null, ['coinput', 'd-flex']);
		let label = (k.includes('decay') ? k + '/s' : k == 'interval' ? k + ' (ms)' : k) + ':';
		//console.log('key', key, val)
		//let val = k.includes('decay')?settings[key]*1000/settings.INTERVAL:settings[key];
		let dn = mEditNumber(label, val, di, null, { w: '100%' }, null, `i_${k}`);
	}

	mLinebreak(dp0);
	let d1 = mDiv(dp0, { gap: 12 }, 'dButtons', null, ['d-flex', 'justify-content-center']);
	//let d1 = mGrid(1, 2, dp0, { w: 200 });
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













