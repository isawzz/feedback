var is_host, socket, settings, defaults, dgreen, dred, in_game_screen, lastgreen = 0, lastred = 0, granularity, num_calls = 0, num_painted = 0;

function get_progressbar(dParent, color, sym) {
	//color has to be a word (web color)
	let id = getUID();
	let d = mDiv(dParent, {}, id, null, 'grid_progressbar');
	let button = mButton(sym, () => onclick_plus_minus(color), d, { w: 30 });
	let d1 = mDiv(d, {}, null, null, 'progressbar');
	let bar = mDiv(d1, { bg: color, w: 10 + '%' }, 'b_' + color, null, 'barstatus');
	return { bar: bar, button: button, color: color, container: d };
}
function handle_message(x) {
	//console.log('from server:', x.msg);
	//Clientdata.id = x;
}
function handle_gamestate(gamestate) {
	if (!in_game_screen) { return; } //console.log('intro');
	gamestate = JSON.parse(gamestate); //from server is sent as string
	requestAnimationFrame(() => paint_game(gamestate));
}
function handle_settings(x) {
	//console.log('message from server:', x.msg);
	settings = x.settings;
	defaults = x.defaults;
	//console.log('settings:', settings);
	//console.log('defaults:', defaults);
	//Clientdata.id = x;
}
function is_visible(id) { return !mBy(id).classList.includes('d-block'); }
function onclick_plus_minus(color) { socket.emit('fbutton', color); }

function onclick_test() {
	if (in_game_screen) show_intro_screen();
	else show_game_screen();
}
function onclick_settings_test() {
	console.log('settings', settings);
	socket.emit('settings', { settings: settings });
}

const lastpos = {};
function setw(elem, goal, color) {

	let g = Math.floor(goal);
	let w = Math.floor(firstNumber(elem.style.width));
	if (g == w) return;
	let i = g > w ? granularity : -granularity;

	clearInterval(TO[color]);
	TO[color] = setInterval(() => anim(elem, i, g), 10);

	function anim(el, by, from, to, color) {
		let x = from;
		if (by < 0 && x <= to || by > 0 && x >= to) {
			clearInterval(TO[color]);
		} else {
			x += by;
			el.style.width = x + '%';
		}
	}
}

function paint_game(state) {
	let [wgreen, wred] = [state.green.pos, state.red.pos];

	//w is in percent, have to calc in pixel

	// setw(dgreen,wgreen,'green'); //neeee!
	// setw(dred,wred,'red');

	// if (isdef(TO.animgreen)) TO.animgreen.cancel(); //scheusslich
	// TO.animgreen = mAnimateTo(dgreen,'width',wgreen);

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
function send_ping() { socket.emit('ping'); }
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
	granularity = 100 / window.innerWidth; //console.log('granularity:', granularity);
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

	let d1 = mDiv(dp, { gap: 12 }, 'dButtons', null, ['d-flex', 'justify-content-center']);
	if (is_host) {
		mButton('reset', send_reset, d1, {}, 'button');
		mButton('pause', send_pause, d1, {}, 'button');
		mButton('resume', send_resume, d1, {}, 'button');
		mLinebreak(dp, 20);
		mBy('dSettingsButton').style.opacity = 1;
	} else {
		//mButton('ping', send_ping, d1, {}, 'button');
		send_ping();
	}
}


function mGrid(rows, cols, dParent, styles = {}) {
	//styles.gap=valf(styles.gap,4);
	let d = mDiv(dParent, styles);
	d.style.gridTemplateColumns = 'repeat(' + cols + ',1fr)';
	d.style.gridTemplateRows = 'repeat(' + rows + ',1fr)';
	d.style.display = 'inline-grid';
	d.style.padding = valf(styles.padding, styles.gap) + 'px';
	return d;
}

function show_settings() {
	//TESTING!!!!!
	if (nundef(settings) && TESTING) {
		settings = TESTING == 'fe' ? { POS_INIT: 0, HORIZON: 10, DECAY: 2, INTERVAL: 200, FR: 5, STEPSIZE: .6, SCALE: 1 }
			: TESTING == 'besser' ? { DECAY: 2, FR: 5, INTERVAL: 200, RED: 5, GREEN: 10, VDECAY: .05, V: 1, VMIN: 0.25, POS_INIT: 50 }
				: { DECAY: 2, FR: 5, INTERVAL: 200, MINUS: 5, PLUS: 10, VDECAY: .05, V: 1, VMIN: 0.25, POS_INIT: 50, exp_decay: "x * Math.pow((1 - DECAY)" }
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
		let di = mDiv(d, { w: 300 }, null, null, ['coinput', 'd-flex']);
		let label = (k.includes('decay') ? k + '/s' : k == 'interval' ? k + ' in ms' : k) + ':';
		//let val = k.includes('decay')?settings[key]*1000/settings.INTERVAL:settings[key];
		let dn = mEditNumber(label, val, di, null, { w: '100%' }, null, `i_${k}`);
	}
	d = dright;
	for (const k of toWords(lright)) {
		let key = k.toUpperCase();
		let val = settings[key];
		if (nundef(val)) continue;
		let di = mDiv(d, { w: 300 }, null, null, ['coinput', 'd-flex']);
		let label = (k.includes('decay') ? k + '/s' : k == 'interval' ? k + ' in ms' : k) + ':';
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













