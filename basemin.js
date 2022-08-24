

//#region globals: Session data
var SOCKETSERVER = 'http://localhost:5000'; //geht im spital
var SERVER = "http://localhost:8080/aroot/simple"; // oder telecave!
//var SOCKETSERVER = `https://eximple.herokuapp.com/5000/` geht nicht!!!!!!!
var Pollmode = 'auto';
var Info, ColorDi, Items = {}, DA = {}, Card = {}, TO = {}, Counter = { server: 0 }, Socket = null;
var uiActivated = false, Selected, Turn, Prevturn;
var S = {}, Z, U = null, PL, G, UI = {}, Users, Tables, Basepath, Serverdata = {}, Clientdata = {};
var dTable //, dTitle; //, dUsers, dGames, dTables, dLogo, dLoggedIn, dPlayerNames, dInstruction, dError, dMessage, dStatus, dTableName, dGameControls, dUserControls, dMoveControls, dSubmitMove, dPlayerStats;
var Config, Syms, SymKeys, ByGroupSubgroup, KeySets, C52, Cinno, C52Cards;
var FORCE_REDRAW = false, TESTING = false;
var ColorThiefObject, SelectedItem, SelectedColor;

//#endregion
//#region color const
const BLUE = '#4363d8';
const BLUEGREEN = '#004054';
const BROWN = '#96613d';
const GREEN = '#3cb44b';
const FIREBRICK = '#800000';
const LIGHTGREEN = '#afff45'; //'#bfef45';
const LIGHTBLUE = '#42d4f4';
const NEONORANGE = '#ff6700';
const NEONYELLOW = '#efff04';
const OLIVE = '#808000';
const ORANGE = '#f58231';
const PURPLE = '#911eb4';
const RED = '#e6194B';
const TEAL = '#469990';
const YELLOW = '#ffe119';
const YELLOW2 = '#fff620'; //?pink???
const YELLOW3 = '#ffed01';
//#endregion
//#region game globals
const DIBOA = {
	home: { link: "../rechnung/index.html", img: 'home.png', align: 'left', pop: false },
	bill: { link: "../rechnung/index.html", img: 'bill.png', align: 'left', pop: false },
	boa: { link: "", img: 'boa.png', align: 'left', pop: false },
	bw: { link: "../rechnung/bwindex.html", img: 'bwicon.png', align: 'right', pop: true },
	authenticator: { link: "../rechnung/boaa.html", img: 'authenticator.png', align: 'right', pop: true },
	authy: { link: "../rechnung/boaa.html", img: 'authy.png', align: 'right', pop: true },
	onedrive: { link: "../rechnung/boaa.html", img: 'onedrive.png', align: 'right', pop: true },
	skype: {
		link: "../rechnung/boaa.html", img: 'skype.png', align: 'right', pop: false,
		contacts: {
			'Julia Oasis': { date: 'Wed', msg: 'Wow', color: BLUEGREEN },
			'+14778991960': { date: 'Thu', msg: 'Missed Call', color: ORANGE },
		}
	},
	bw_info: {
		boa: { userid: 'gleem@gmail.com', pwd: rPassword(20) },
		authy: { userid: 'gleem@gmail.com', pwd: rPassword(20) },

	},
	boa_data: {
		'AAA-MBNA 5464 3332 3333 5555': { sub: '*5555', logo: 'boa.png' },
		'AMERICAN EXPRESS': { sub: '*4554', logo: 'amex.png' },
		'AT&T Mobility': { sub: '*1331', logo: 'att.png' },
		'AT&T Mobility{AT&T WA}': { sub: '*7575', logo: 'att.png' },
		'AT&T Mobility': { sub: '*8585', logo: 'att.png' },
		'Bank Of Amerika Credit Card': { sub: '*1212', logo: 'boa.png', 'Last Payment': '5-25 $1150.41', brand: 'BofA_rgb' },
		'Bank Of Amerika': { sub: '*0898', logo: 'boa.png' },
		'Bank Of Amerika Mail-in1': { sub: '*6565', logo: 'boa.png' },
		'Bel-Red Oral': { sub: '*2432' },
		'Bellevue Kendo Club': { sub: '*hallo' },
		'CapitalOne': { sub: '*1324', logo: 'capitalOne.png' },
		'CapitalOneVenture': { sub: '*6456', logo: 'capitalOne.png' },
		'CapitalOneVentureF': { sub: '*9789', logo: 'capitalOne.png' },
		'Chase': { sub: '*3131', logo: 'chase.png' },
		'Chase Amazon': { sub: '*0898', 'Last Payment': '5-25 $1150.41', logo: 'chase.png', brand: 'prime' },
		'Chase Card': { sub: '*1432', logo: 'chase.png' },
		'CHASE MANHATTAN BANK-MC': { sub: '*0797', 'Last Payment': '5-25 $110.99', logo: 'chase.png', brand: 'chase_bank' },
		'Chase Sapphire': { sub: '*5132', logo: 'chase.png' },
		'Chase Sapphire': { sub: '*8679', logo: 'chase.png' },
		'City Cards': { sub: '*3124', logo: 'citi.png' },
		'City Cards Divident': { sub: '*9678', logo: 'citi.png' },
		'CITY CARDS Points': { sub: '*7678', logo: 'citi.png' },
		'Citi Costco': { sub: '*8768', 'Last Payment': '6-17 $506.14', logo: 'citi.png', brand: 'citibank' },
		'Citi Costco gu': { sub: '*0890', 'Last Payment': '6-6 $228.92', logo: 'citi.png', brand: 'citibank' },
		'CITI DIVIDENT Platinum': { sub: '*3454', logo: 'citi.png' },
		'CITIBANK VISA NV': { sub: '*7566', logo: 'citi.png' },
		'City of Redmond': { sub: '*4998' },
		'City of Redmond WA': { sub: '*2887', 'Last Payment': '5-17 $214.94', brand: 'redmond' },
		'Comcast': { sub: '*7676', logo: 'comcast.png' },
		'Comcast Perrigo': { sub: '*1324', 'Last Payment': '6-21 $89.44', logo: 'comcast.png', brand: 'comcast' },
		'ComCast WA': { sub: '*6456', logo: 'comcast.png' },
		'DISCOVER CARD SERVICES': { sub: '*8678' },
		'Dr. Ellie Tabaraie': { sub: '*hallo' },
		'Fastenerz.com': { sub: '*000' },
		'Fibonacci': { sub: '*6666' },
		'Fleet Credit Card Service': { sub: '*8798' },
		'FLEET CREDIT CARD0MC/VS (32)': { sub: '*8799' },
		'Frontier': { sub: '*05-5' },
		'Frontier2': { sub: '*5366' },
		'GoodToGo': { sub: '*7767' },
		'Hardford Mutual Funds Inc.': { sub: '*8878' },
		'King County Treasury': { sub: '*0-02' },
		'King County Treasury': { sub: '*0-03' },
		'LabCorp': { sub: '*8899' },
		'Landover Mortgage': { sub: '*hallo' },
		'Lauren Magada': { sub: 'Lauren boa' },
		'Lederman&Pulman': { sub: '*9988' },
		'Liberty Mutual Group': { sub: '*-660' },
		'Liberty Mutual Group': { sub: '*-768' },
		'Liberty Mutual Group': { sub: '*-760' },
		"Macy's Star Rewards": { sub: '*23-0', logo: 'macys.png' },
		'MBNA': { sub: '*3444' },
		'MBNA 6455 6677 7924 5555': { sub: '*5555' },
		'Oachita': { sub: '*6556' },
		'Oasis Condominium CA': { sub: '*889' },
		'Oasis Condominium CA': { sub: '*1889', 'Last Payment': '5-31 $581.54', brand: 'oasis' },
		'Orthodontics Roos': { sub: '*1111' },
		'Overcast Law Office, PS': { sub: '*4423' },
		'Overlake Medical Center': { sub: '*hallo' },
		'Pediatric Associates Inc': { sub: '*8383' },
		'Perrigo Heights HOA': { sub: '*t#98' },
		'Premier Periodontics': { sub: '*9494' },
		'PreventionMD': { sub: '*9566' },
		'Prime Trust LLC': { sub: '*8788' },
		'ProSport': { sub: '*1233' },
		'PSE - Puget Sound Energy': { sub: '*3444', 'Last Payment': '5-25 $70.59', brand: 'PSE' },
		'Puget Sound Energy': { sub: '*66-9' },
		'Real Property Management Eclipse': { sub: '*asss' },
		'Remadina Ridge Family Dentistry': { sub: '*6656' },
		'Sewage Capacity Charge': { sub: '*7575' },
		'Silkroad': { sub: '*788-1' },
		'Suhrco': { sub: '*899' },
		'Target': { sub: '*9789' },
		'Target National Bank': { sub: '*1432' },
		'Univerity Of WA Medical Center': { sub: '*1543' },
		'US Bank Credit Card FlexPerks': { sub: '*0789', 'Last Payment': '5-20 $11.13', brand: 'usbank' },
		'USBank': { sub: '*7567' },
		'USBank-CashPlus': { sub: '*3123' },
		'USBank-FlexPerks': { sub: '*1321' },
		'Verizon': { sub: '*7567' },
		'Waste Management': { sub: '*87-1' },
		'Waste Management': { sub: '*23-9' },
		'Wells Fargo Home Mortgage': { sub: '*1333', 'Last Payment': '6-10 $1625.06', logo: 'wellsfargo.png', brand: 'wellsfargo' },
		'Wells Fargo Mortgage': { sub: '*2444', logo: 'wellsfargo.png' },
		'Williams-Sonoma': { sub: '*9888' },
		'WINDERMERE PROPERTY MGMT/EASTSID': { sub: '*8766' },
		'Windermere Real Estate/East': { sub: '*ntal' },

	}
};

const INNO = {
	color: { blue: '#89aad7', red: '#da7887', green: '#72b964', yellow: '#e2e57a', purple: '#9b58ba' },
	sym: {
		tower: { key: 'white-tower', fg: 'silver', bg: 'dimgray' },
		leaf: { key: 'leaf', fg: '#96D6BE', bg: '#275D45' },
		tree: { key: 'leaf', fg: '#96D6BE', bg: '#275D45' },
		bulb: { key: 'lightbulb', fg: 'white', bg: '#69224C' },
		crown: { key: 'queen-crown', fg: '#FEE593', bg: '#A27E44' },
		factory: { key: 'i_factory', fg: '#CD5147', bg: '#6D1A12' },
		clock: { key: 'clock', fg: '#3E84B5', bg: '#0B5884' },
		none: { key: 'flamer', fg: 'silver', bg: 'dimgrey' },
		plus: { key: 'plus', fg: 'silver', bg: '#00000020' },
		fountain: { key: 'fountain', fg: 'silver', bg: '#00000020' },
		flag: { key: 'flying-flag', fg: 'silver', bg: '#00000020' },
		up: { key: 'arrow-up', fg: 'silver', bg: '#00000020' },
		left: { key: 'arrow-left', fg: 'silver', bg: '#00000020' },
		right: { key: 'arrow-right', fg: 'silver', bg: '#00000020' },
	},
	symNames: ['tower', 'tree', 'bulb', 'crown', 'factory', 'clock'],
	phases: [
		{ key: 'init', message: 'select initial card to meld!' },
		{ key: 'just_one_turn', message: 'take your first turn!' },
		{ key: 'two_turns', message: 'take your turn!' },
	],
	special_achievements: {
		MONUMENT: "Claim immediately if you tuck six cards or score six cards during a single turn (May also be claimed via Masonry from Age 1)",
		EMPIRE: "Claim immediately if you have three  or more icons of all six types (May also be claimed via Construction from Age 2)",
		WORLD: "Claim immediately if you have twelve or more clocks on your board (May also be claimed via Translation from Age 3)",
		WONDER: "Claim immediately if you have all five colors on your board, and each is splayed either up or right (May also be claimed via Invention from Age 4)",
		UNIVERSE: "Claim immediately if you have five top cards, and each is of value 8 or higher (May also be claimed via Astronomy from Age 5)",
		LEGEND: "Claim if you meld a city with a left arrow on a color already splayed left",
		REPUTE: "Claim if you meld a city with a right arrow on a color already splayed right",
		FAME: "Claim if you meld a city with a up arrow on a color already splayed up",
		GLORY: "Claim immediately tuck a city with a flag",
		VICTORY: "Claim immediately tuck a city with a fountain",
		SUPREMACY: "Claim immediately if you have 3 or more of one icon in 4 different colors (May also be claimed via Novel from Age 3)",
		DESTINY: "Claim immediately if you have 7 or more cards in your forecast (May also be claimed via Barometer from Age 4)",
		WEALTH: "Claim immediately if you have 8 or more bonuses (May also be claimed via Palampore from Age 5)",
		HERITAGE: "Claim immediately if you have 8 or more numbers in one color (May also be claimed via Loom from Age 6)",
		HISTORY: "Claim immediately if you have 4 or more echoes in one color (May also be claimed via Photography from Age 7)",
	},
};
const ARI = {
	sz_hand: 7,
	stage: {
		1: 'journey',
		2: 'tax',
		3: 'auto market',
		4: 'stall selection',
		1004: 'TEST_starts_in_stall_selection_complete',
		5: 'action: command',
		6: 'action step 2',
		7: 'action 3',
		8: 'action 4',
		9: 'action 5',
		10: 'end game?',
		11: 'ball',
		12: 'auction: bid',
		13: 'auction: buy',
		14: 'complementing_market_after_church',
		15: 'commission',
		16: 'commission new',
		17: 'church',
		18: 'church_minplayer_tithe',
		//180: 'downgrade_cards_church', ***geht zu downgrade!
		19: 'church_newcards',

		20: 'payment action',
		21: 'church_minplayer_tithe_add',
		22: 'church_minplayer_tithe_downgrade',
		23: 'comm_weitergeben',
		24: 'rumors_weitergeben',
		25: 'rumor',
		26: 'blackmail',
		blackmail: 26,
		27: 'inspect',
		rumor: 25,
		28: 'buy rumor',
		'buy rumor': 28,
		29: 'rumor discard',

		30: 'pick luxury or journey cards',
		31: 'add new journey',
		32: 'rumor_both',
		33: 'blackmail_owner',
		34: 'accept_blackmail',
		35: 'blackmail_complete',
		36: 'reject_blackmail',
		37: 'commission_stall',
		38: 'pick_schwein',

		40: 'trade',
		41: 'build',
		42: 'visit',
		43: 'buy',
		44: 'upgrade',
		45: 'downgrade',
		46: 'visit destroy',
		build: 41,
		upgrade: 44,
		downgrade: 45,
		visit: 42,
		buy: 43,

		100: 'pickup end',
		101: 'build end',
		102: 'select building to upgrade',
		103: 'select downgrade cards',
		104: 'next_comm_setup_stage',
		105: 'next_rumor_setup_stage',

	}
};
const BLUFF = {
	torank: { _: '_', three: '3', four: '4', five: '5', six: '6', seven: '7', eight: '8', nine: '9', ten: 'T', jack: 'J', queen: 'Q', king: 'K', ace: 'A' },
	toword: { _: '_', '3': 'three', '4': 'four', '5': 'five', '6': 'six', '7': 'seven', '8': 'eight', '9': 'nine', T: 'ten', J: 'jack', Q: 'queen', K: 'king', A: 'ace' },
	rankstr: '3456789TJQKA',

};
const SHERIFF = {
	color: {
		legal: GREEN, //'lime',
		contraband: 'crimson',
		royal: 'orangered'
	},
	cards: {
		apples: { ksym: 'green apple', kcenter: 'red apple', label: 'apple', type: 'legal', value: 2, penalty: 2 },
		cheese: { ksym: 'cheese wedge', kcenter: 'cheese wedge', label: 'cheese', type: 'legal', value: 3, penalty: 2 },
		pineapple: { ksym: 'pineapple', kcenter: 'pineapple', label: 'pineapple', type: 'legal', value: 4, penalty: 2 },
		chicken: { ksym: 'poultry leg', kcenter: 'poultry leg', label: 'chicken', type: 'legal', value: 4, penalty: 2 },
		bread: { ksym: 'bread', kcenter: 'bread', label: 'bread', type: 'legal', value: 3, penalty: 2 },
		pepper: { ksym: 'hot pepper', kcenter: 'hot pepper', label: 'pepper', type: 'contraband', value: 6, penalty: 4 },
		mead: { ksym: 'beer mug', kcenter: 'beer mug', label: 'mead', type: 'contraband', value: 7, penalty: 4 },
		silk: { ksym: 'sari', kcenter: 'kimono', label: 'silk', type: 'contraband', value: 8, penalty: 4 },
		crossbow: { ksym: 'crossbow', kcenter: 'crossbow', label: 'crossbow', type: 'contraband', value: 9, penalty: 4 },
		chestnut: { ksym: 'chestnut', kcenter: 'chestnut', label: 'chestnut', type: 'royal', value: 4, penalty: 3 },
		pear: { ksym: 'pear', kcenter: 'pear', label: 'pear', type: 'royal', value: 6, penalty: 4 },
		pie: { ksym: 'pie', kcenter: 'pie', label: 'pie', type: 'royal', value: 6, penalty: 4 },
		squid: { ksym: 'squid', kcenter: 'squid', label: 'squid', type: 'royal', value: 9, penalty: 5 },
		shortcake: { ksym: 'shortcake', kcenter: 'shortcake', label: 'shortcake', type: 'royal', value: 9, penalty: 5 },
		grapes: { ksym: 'grapes', kcenter: 'grapes', label: 'grapes', type: 'royal', value: 9, penalty: 5 },
		pretzel: { ksym: 'pretzel', kcenter: 'pretzel', label: 'pretzel', type: 'royal', value: 9, penalty: 5 },
		baguette: { ksym: 'baguette bread', kcenter: 'baguette bread', label: 'bread', type: 'royal', value: 6, penalty: 4 },
		cherries: { ksym: 'cherries', kcenter: 'cherries', label: 'cherries', type: 'royal', value: 8, penalty: 4 },
	},
	cardtypes: {
		legal: ['apples', 'cheese', 'pineapple', 'bread'],
		contraband: ['pepper', 'mead', 'silk', 'crossbow'],
		royal: ['chestnut', 'pear', 'pie', 'shortcake', 'pretzel', 'grapes', 'baguette', 'cherries'] //die mit penalty 4 gibt es je 2x
	},
	stage: {
		1: 'exchange',
	}
}
//#endregion cards

//#region from base m,i,mg
function mgSvg(dParent, attrs) { return mgTag('svg', dParent, attrs); }
function mgText(text, dParent, attrs, styles) { return mgTag('text', dParent, attrs, styles, text); }
function mgTag(tag, dParent, attrs, styles = {}, innerHTML) {
	let elem = gCreate(tag);
	mStyle(elem, styles);
	mAttrs(elem, attrs);
	if (isdef(innerHTML)) elem.innerHTML = innerHTML;
	if (isdef(dParent)) mAppend(dParent, elem);
	return elem;
}
function iSvg(i) { return isdef(i.live) ? i.live.svg : isdef(i.svg) ? i.svg : i; }
function iG(i) { return isdef(i.live) ? i.live.g : isdef(i.g) ? i.g : i; }
function mAttrs(elem, attrs) { for (const k in attrs) { elem.setAttribute(k, attrs[k]); } }
function mBackground(bg, fg) { mStyle(document.body, { bg: bg, fg: fg }); }
function mBoxFromMargins(dParent, t, r, b, l, styles, id, inner, classes) {
	let d = mDiv(dParent, { position: 'absolute', top: t, right: r, bottom: b, left: l }, id, inner, classes);
	let pos = dParent.style.position;
	if (pos != 'absolute') dParent.style.position = 'relative';
	if (isdef(styles)) mStyle(d, styles);
	return d;
}
//#endregion

//#region m prefix (DOM)
function mAnimate(elem, prop, valist, callback, msDuration = 1000, easing = 'cubic-bezier(1,-0.03,.86,.68)', delay = 0, forwards = 'none') {
	//usage: mAnimate(elem, 'opacity', [0, 0, 1], funcNull, 2000, 'ease-in', 6000, 'both');
	let kflist = [];
	for (const perc in valist) {
		let o = {};
		let val = valist[perc];
		o[prop] = isString(val) || prop == 'opacity' ? val : '' + val + 'px';
		kflist.push(o);
	}
	let opts = { duration: msDuration, fill: forwards, easing: easing, delay: delay };
	let a = toElem(elem).animate(kflist, opts);

	if (isdef(callback)) { a.onfinish = callback; }
	return a;

	// if (isdef(callback)) a.onfinish = ()=>{delete DA.anim;callback()}; else a.onfinish = ()=>delete DA.anim;
	// DA.anim = a; return a;
}
function mAnimateTo(elem, prop, val, callback, msDuration = 1000, easing = 'cubic-bezier(1,-0.03,.86,.68)', delay = 0) {
	//usage: mAnimateTo(elem, 'opacity', 1, somefunc, 2000, 'ease-in', 1000);
	let o = {};
	o[prop] = isString(val) || prop == 'opacity' ? val : '' + val + 'px';
	let kflist = [o];
	let opts = { duration: msDuration, fill: 'forwards', easing: easing, delay: delay };
	let a = toElem(elem).animate(kflist, opts);

	if (isdef(callback)) { a.onfinish = callback; }
	return a;
	// if (isdef(callback)) a.onfinish = ()=>{delete DA.anim;callback()}; else a.onfinish = ()=>delete DA.anim;
	// DA.anim = a; return a;
}
function mAnimateList(elem, ogoal, callback, msDuration = 1000, easing = 'cubic-bezier(1,-0.03,.86,.68)', delay = 0) {
	//usage: mAnimateTo(elem, 'opacity', 1, somefunc, 2000, 'ease-in', 1000);
	for (const k in ogoal) {
		ogoal[k] = isString(ogoal[k]) || k == 'opacity' ? ogoal[k] : '' + ogoal[k] + 'px';
	}
	let kflist = [ogoal];
	let opts = { duration: msDuration, fill: 'forwards', easing: easing, delay: delay };
	let a = toElem(elem).animate(kflist, opts);

	if (isdef(callback)) { a.onfinish = callback; }
	return a;
	// if (isdef(callback)) a.onfinish = ()=>{delete DA.anim;callback()}; else a.onfinish = ()=>delete DA.anim;
	// DA.anim = a; return a;
}
function mAppend(d, child) { toElem(d).appendChild(child); return child; }
function mButton(caption, handler, dParent, styles, classes, id) {
	let x = mCreate('button');
	x.innerHTML = caption;
	if (isdef(handler)) x.onclick = handler;
	if (isdef(dParent)) dParent.appendChild(x);
	if (isdef(styles)) mStyle(x, styles);
	if (isdef(classes)) mClass(x, classes);
	if (isdef(id)) x.id = id;
	return x;
}
function old_mButtonX(dParent, pos = 'tr', handler = null, defaultBehavior = 'hide', sz = 40) {
	//ACHTUNG!!! default behavior is: removing dParent
	dParent = toElem(dParent);
	// let sz = 40;

	// let styles = { box:true, border:`blue solid ${3*sz/34}px`, bg: GREEN, rounding:'50%', cursor:'pointer',w:sz,h:sz };
	let styles = { cursor: 'pointer', w: sz, h: sz };

	// let d2 = mDiv(dParent, { family:'opensans', box:true, align:'center','line-height':34,w: 32, h: 32, pointer: 'cursor' }, null, `<i class="fa-thin fa-times" style="font-size:${sz}px;"></i>`, 'btnX');
	let d2 = mDiv(dParent, styles, null, `<svg width='100%' height='100%' ><use xlink:href="#Times" /></svg>`); //, 'btnX');
	mClass(d2, 'svgbtnX');

	d2.onclick = isdef(handler) ? handler : defaultBehavior == 'hide' ? () => hide(dParent) : () => dParent.remove();
	mPlace(d2, pos, 10);
	return d2;
}
function mButtonX(dParent, handler, pos = 'tr', sz = 25, color = 'white') {
	let d2 = mDiv(dParent, { fg: color, w: sz, h: sz, pointer: 'cursor' }, null, `<i class="fa fa-times" style="font-size:${sz}px;"></i>`, 'btnX');
	//let d2 = mDiv(dParent, { fg:'white', w: sz, h: sz, pointer: 'cursor' }, null, 'CLOSE', 'btnX');
	mPlace(d2, pos, 2);
	d2.onclick = handler;
	return d2;
}
function mBy(id) { return document.getElementById(id); }
function mCardButton(caption, handler, dParent, styles, classtr = '', id = null) {
	let classes = toWords("card300 wb fett no_outline btn" + classtr);
	return mButton(caption, handler, dParent, styles, classes, id);
}
function mCard(dParent, styles, classtr = '', id = null) {
	let classes = toWords("card300 wb " + classtr);
	// console.log('classes', classes);
	return mDiv(dParent, styles, id, null, classes);
}
function mCardText(ckey, sz, color) { return is_jolly(ckey) ? '<span style="font-family:Algerian">jolly</span>' : `${ckey[0]}${mSuit(ckey, sz, color)}`; }
function mCenterFlex(d, hCenter = true, vCenter = false, wrap = true) {
	let styles = { display: 'flex' };
	if (hCenter) styles['justify-content'] = 'center';
	styles['align-content'] = vCenter ? 'center' : 'flex-start';
	if (wrap) styles['flex-wrap'] = 'wrap';
	mStyle(d, styles);
	//console.log('d', d)
}
function mClear(d) { clearElement(d); }
function mColFlex(dParent, chflex = [1, 5, 1], bgs) { // = [YELLOW, ORANGE, RED]) {
	// let styles = { opacity:1, bg:RED, display: 'flex','justify-content':'stretch','align-content':'flex-start','flex-wrap':'nowrap' };
	let styles = { opacity: 1, display: 'flex', 'align-items': 'stretch', 'flex-flow': 'nowrap' };
	mStyle(dParent, styles);
	let res = [];
	for (let i = 0; i < chflex.length; i++) {
		let bg = isdef(bgs) ? bgs[i] : null;
		let d1 = mDiv(dParent, { flex: chflex[i], bg: bg });
		res.push(d1);
	}
	return res;

	// let d2=mDiv(dParent,{flex:chflex[1],bg:ORANGE},null,'hallo');
	// let d3=mDiv(dParent,{flex:chflex[2],bg:RED},null,'hallo');
	// return {left:d1,middle:d2,right:d3};
}
function mCenterCenterFlex(d) { mCenterFlex(d, true, true, true); }
function mClass0(d) { d = toElem(d); d.className = ''; }
function mClass(d) {
	d = toElem(d);
	if (arguments.length == 2 && isList(arguments[1])) for (let i = 0; i < arguments[1].length; i++) d.classList.add(arguments[1][i]);
	else for (let i = 1; i < arguments.length; i++) d.classList.add(arguments[i]);
}
function mClassRemove(d) { d = toElem(d); for (let i = 1; i < arguments.length; i++) d.classList.remove(arguments[i]); }
function mClassReplace(d, weg, her) { mClassRemove(d, weg); mClass(d, her); }
function mColorLetters(s, brightness) {
	return toLetters(s).map(x => `<div style='display:inline-block;transform:rotate(${rChoose([10, 5, -10, -5])}deg);color:${rColor(brightness)}'>${x == ' ' ? '&nbsp;' : x}</div>`).join('');
}
function mColorPickerBehavior(value, targetImage, elem, handler) {
	let hues = arrTake(colorHueWheel(value), 10);
	let colorPalette = hues.map(x => colorFrom(colorHSLBuild(x)));
	let palette = isdef(targetImage) ? colorPaletteFromImage(targetImage) : colorPalette;
	mStyle(elem, { bg: value });
	let inp = new JSColor(elem, { alpha: 'ff', closeButton: true, value: value, palette: palette, });
	inp.onInput = () => { let c = inp.toHEXAString(); handler(c); }
	return inp;
}
function mColorPickerControl(label, value, targetImage, dParent, handler, styles = { hpadding: 25 }) {
	let d = mDiv(dParent, styles);
	let hpad = valf(styles.hpadding, 6);
	let dLabel = mDiv(d, { 'vertical-align': 'top', w: '35%', align: 'right', hpadding: hpad, display: 'inline-block' }, null, label);
	let hues = arrTake(colorHueWheel(value), 10);
	let colorPalette = hues.map(x => colorFrom(colorHSLBuild(x)));
	let palette = isdef(targetImage) ? colorPaletteFromImage(targetImage) : colorPalette;
	let elem = mDiv(d, { w: '55%', hpadding: hpad, h: 24, rounding: hpad, display: 'inline-block' });
	let inp = new JSColor(elem, {
		alpha: 'ff',
		closeButton: true,
		value: value,
		palette: palette,
	});
	//inp.onChange = ()=>{let c = inp.toHEXAString(); onColor(c);}
	inp.onInput = () => { let c = inp.toHEXAString(); handler(c); }
	return inp;
}
function mCreate(tag, styles, id) { let d = document.createElement(tag); if (isdef(id)) d.id = id; if (isdef(styles)) mStyle(d, styles); return d; }
function mCreateFrom(htmlString) {
	//console.log('---------------',htmlString)
	var div = document.createElement('div');
	div.innerHTML = htmlString.trim();// '<div>halloooooooooooooo</div>';// htmlString.trim();

	// Change this to div.childNodes to support multiple top-level nodes
	//console.log(div.firstChild)
	return div.firstChild;
}
function mDataTable(reclist, dParent, rowstylefunc, headers, id, showheaders = true) {
	if (nundef(headers)) headers = get_keys(reclist[0]);
	let t = mTable(dParent, headers, showheaders);
	if (isdef(id)) t.id = `t${id}`;
	let rowitems = [];
	let i = 0;
	for (const u of reclist) {
		let rid = isdef(id) ? `r${id}_${i}` : null;
		r = mTableRow(t, u, headers, rid);
		if (isdef(rowstylefunc)) mStyle(r.div, rowstylefunc(u));
		rowitems.push({ div: r.div, colitems: r.colitems, o: u, id: rid, index: i });
		i++;
	}
	return { div: t, rowitems: rowitems };
}
function mDiv(dParent, styles, id, inner, classes, sizing) {
	let d = mCreate('div');
	if (dParent) mAppend(dParent, d);
	if (isdef(styles)) mStyle(d, styles);
	if (isdef(classes)) mClass(d, classes);
	if (isdef(id)) d.id = id;
	if (isdef(inner)) d.innerHTML = inner;
	if (isdef(sizing)) { setRect(d, sizing); }

	return d;
}
function mDivLR(dParent, styles, id, innerlist, classes) {
	let d = mDiv(dParent, styles, id, `<div>${innerlist[0]}</div><div>${innerlist[1]}</div>`, classes);
	mStyle(d, { display: 'flex', 'justify-content': 'space-between', 'align-items': 'center' });
	return d;
}
function mDiv100(dParent, styles, id, sizing = true) { let d = mDiv(dParent, styles, id); mSize(d, 100, 100, '%', sizing); return d; }
function mDivItem(dParent, styles, id, content) {
	if (nundef(id)) id = getUID();
	let d = mDiv(dParent, styles, id, content);
	return mItem(id, { div: d });
}
function mDover(dParent, styles = {}, sizing = true) {
	let d = mDiv(dParent, styles);
	mIfNotRelative(dParent);
	mStyle(d, { position: 'absolute', left: 0, top: 0, w: '100%', h: '100%' });
	setRect(d, sizing);
	return d;
}
function mDraggable(item) {
	let d = iDiv(item);
	d.draggable = true;
	d.ondragstart = drag;
}
function mDroppable(item, handler, dragoverhandler) {
	function allowDrop(ev) { ev.preventDefault(); }

	let d = iDiv(item);
	//console.log('item', item);
	d.ondragover = isdef(dragoverhandler) ? dragoverhandler : allowDrop;
	//if (isdef(dragEnterHandler)) d.ondragenter = dragEnterHandler;
	d.ondrop = handler;
}
//#region CLEANUP! edit inputs
function unfocusOnEnter(ev) { if (ev.key === 'Enter') { ev.preventDefault(); mBy('dummy').focus(); } }
function selectText(el) {
	var sel, range;
	if (window.getSelection && document.createRange) { //Browser compatibility
		sel = window.getSelection();
		if (sel.toString() == '') { //no text selection
			window.setTimeout(function () {
				range = document.createRange(); //range object
				range.selectNodeContents(el); //sets Range
				sel.removeAllRanges(); //remove all ranges from selection
				sel.addRange(range);//add Range to a Selection.
			}, 1);
		}
	} else if (document.selection) { //older ie
		sel = document.selection.createRange();
		if (sel.text == '') { //no text selection
			range = document.body.createTextRange();//Creates TextRange object
			range.moveToElementText(el);//sets Range
			range.select(); //make selection.
		}
	}
}
function incInput(inp, n = 1) {
	let val = Number(inp.innerHTML);
	val += n;
	inp.innerHTML = val;
}
function mEditRange(label, value, min, max, step, dParent, handler, styles, classes, id, triggerOnChange = true) {
	let d = mDiv(dParent, styles);
	let hpad = valf(styles.hpadding, 4);
	let dLabel = mDiv(d, { w: '30%', align: 'right', hpadding: hpad, display: 'inline-block' }, null, label); //mCreateFrom(`<label>${label}</label>`);
	let inpText = mCreateFrom(`<input type='number'  step=${step} min="${min}" max="${max}" value="${value}" ></input>`);
	let inp = mCreateFrom(`<input type="range" step=${step} min="${min}" max="${max}" value="${value}" ></input>`);
	// let inp = mCreateFrom(`<div contenteditable="true" spellcheck="false">${value}</div>	`)
	mAppend(d, inpText);
	mAppend(d, inp);
	// let button = mButton('+', triggerOnChange ? ev => { incInput(inp); handler(inp.innerHTML, ev); } : ev => { incInput(inp); }, d);
	mStyle(inpText, { display: 'inline', w: '20%', align: 'left', hpadding: hpad });
	mStyle(inp, { display: 'inline', w: '40%', hpadding: hpad });

	inpText.onchange = (ev) => { inp.value = inpText.value; handler(inpText.value, ev); };
	// inpText.addEventListener('keydown', unfocusOnEnter);
	// inpText.addEventListener('focusout', ev => { inp.value = inpText.value;handler(inp.innerHTML, ev); });
	inpText.onclick = ev => selectText(ev.target);
	inp.onchange = (ev) => { inpText.value = inp.value; handler(inpText.value, ev); };
	if (isdef(classes)) mClass(inp, classes);
	if (isdef(id)) inp.id = id;
	return inpText;
}
function mEditNumber(label, value, dParent, handler, styles, classes, id, triggerOnChange = false) {
	let d = mDiv(dParent, styles);
	let hpad = valf(styles.hpadding, 4);
	let dLabel = mDiv(d, { w: '50%', align: 'right', hpadding: hpad, display: 'inline-block' }, null, label); //mCreateFrom(`<label>${label}</label>`);

	if (nundef(handler)) handler = x => console.log(x);

	let inp = mCreateFrom(`<div contenteditable="true" spellcheck="false">${value}</div>	`)
	mAppend(d, inp);
	//let button = mButton('+', triggerOnChange ? ev => { incInput(inp); handler(inp.innerHTML, ev); } : ev => { incInput(inp); }, d);
	mStyle(inp, { display: 'inline-block', w: '40%', align: 'left', hpadding: hpad });
	inp.addEventListener('keydown', unfocusOnEnter);
	inp.addEventListener('focusout', ev => { handler(inp.innerHTML, ev); });
	inp.onclick = ev => selectText(ev.target);

	if (isdef(classes)) mClass(inp, classes);
	if (isdef(id)) inp.id = id;
	return inp;
}
function mEdit(label, value, dParent, handler, styles, classes, id) {

	let d = mDiv(dParent, styles);
	let hpad = valf(styles.hpadding, 4);
	let dLabel = mDiv(d, { w: '50%', align: 'right', hpadding: hpad, display: 'inline-block' }, null, label); //mCreateFrom(`<label>${label}</label>`);

	let inp = mCreateFrom(`<div contenteditable="true" spellcheck="false">${value}</div>	`)
	mAppend(d, inp);
	mStyle(inp, { display: 'inline-block', w: '50%', align: 'left', hpadding: hpad });
	inp.addEventListener('keydown', unfocusOnEnter);
	inp.addEventListener('focusout', ev => { handler(inp.innerHTML, ev); });
	inp.onclick = ev => selectText(ev.target);

	if (isdef(classes)) mClass(inp, classes);
	if (isdef(id)) inp.id = id;
	return inp;
}
function mEditX(label, val, dParent, styles, classes, handler, id, opt = {}) {
	let defOptions = {
		alignLabel: 'right',
		fgLabel: 'silver',
		wminLabel: 120,
		alignInput: 'left',
		fgInput: 'white',
		wminInput: 50,
		wminRight: 120,
		align: 'center',

	}
	addKeys(defOptions, opt);
	let wminTotal = wminLabel + wminRight;
	if (nundef(styles)) styles = {};
	if (nundef(styles.wmin)) styles.wmin = 0;
	styles.wmin = Math.max(styles.wmin, wminTotal);
	styles.align = opt.align;
	let dOuter = mDiv(dParent, styles, id, null, classes);
	let dLabel = mDiv(dOuter, { fg: opt.fgLabel, wmin: opt.wminLabel, align: opt.alignLabel }, null, label);
	let dInput = mDiv(dOuter, { contenteditable: true, spellcheck: false, fg: opt.fgInput, wmin: opt.wminInput, align: opt.alignInput }, null, val);
	dInput.onfocusout = ev => handler(dInput.innerHTML, ev);
	dInput.onkeydown = (ev) => {
		if (ev.key === 'Enter') {
			ev.preventDefault();
			mBy('dummy').focus();
		}
	}
	return dInput;
}
function mEditableOnEdited(id, dParent, label, initialVal, onEdited, onOpening, styles, classes) {
	let inp = mEditableInput(dParent, label, initialVal, styles, classes);
	inp.id = id;
	if (isdef(onOpening)) { inp.addEventListener('focus', ev => onOpening(ev)); }
	inp.addEventListener('focusout', ev => {
		window.getSelection().removeAllRanges();
		if (isdef(onEdited)) onEdited(inp.innerHTML, ev);
	});
	return inp;
}
function mEditableInput(dParent, label, val, styles, classes, id) {
	let labelElem = mCreateFrom(`<span>${label}</span>	`)
	let elem = mCreateFrom(`<span contenteditable="true" spellcheck="false">${val}</span>	`)
	elem.addEventListener('keydown', (ev) => {
		if (ev.key === 'Enter') {
			ev.preventDefault();
			mBy('dummy').focus();
			//if (isdef(handler)) handler(elem.innerHTML, ev); //das ist schon bei mEditableInputOnEdited!!!
		}
	});
	let dui = mDiv(dParent, { margin: 2 });
	mAppend(dui, labelElem);
	mAppend(dui, elem);
	if (isdef(styles)) {
		if (isdef(styles.wInput)) mStyle(elem, { wmin: styles.wInput });
		mStyle(elem, styles);
	}
	if (isdef(classes)) mStyle(elem, classes);
	if (isdef(id)) elem.id = id;

	return elem;
}
//#endregion
function mFlexEvenly(d) {
	let styles = { display: 'flex' };
	styles['justify-content'] = 'space-evenly';
	mStyle(d, styles);
}
function mFlexWrap(d) { mFlex(d, 'w'); }
function mFlexColumn(d, or = 'h') {
	d = toElem(d);
	d.style.display = 'flex';
	d.style.flexFlow = (or == 'v' ? 'column' : 'row') + ' ' + (or == 'w' ? 'wrap' : 'nowrap');
	d.style.alignItems = 'stretch';
	d.style.alignContent = 'stretch';
	d.style.justiifyItems = 'stretch';
	d.style.justifyContent = 'stretch';
}
function mFlex(d, or = 'h') {
	d = toElem(d);
	d.style.display = 'flex';
	d.style.flexFlow = (or == 'v' ? 'column' : 'row') + ' ' + (or == 'w' ? 'wrap' : 'nowrap');
	// d.style.alignItems = 'stretch';
	// d.style.alignContent = 'stretch';
	// d.style.justiifyItems = 'stretch';
	// d.style.justifyContent = 'stretch';
}
function mFlexLR(d) { mStyle(d, { display: 'flex', 'justify-content': 'space-between', 'align-items': 'center' }); }
function mFlexSpacebetween(d) { mFlexLR(d); }
function mForm(dParent) {
	return mAppend(dParent, mCreate('form'));
}
function mFromPoint(x, y) {
	var element, elements = [];
	var old_visibility = [];
	while (true) {
		element = document.elementFromPoint(x, y);
		if (!element || element === document.documentElement) {
			break;
		}
		elements.push(element);
		old_visibility.push(element.style.visibility);
		element.style.visibility = 'hidden'; // Temporarily hide the element (without changing the layout)
	}
	for (var k = 0; k < elements.length; k++) {
		elements[k].style.visibility = old_visibility[k];
	}
	elements.reverse();
	return elements;
}
function mIfNotRelative(d) { if (isEmpty(d.style.position)) d.style.position = 'relative'; }
function mImage() { return mImg(...arguments); }
function mImg(path, dParent, styles, classes, callback) {
	//console.log('_______________',path)
	let d = mCreate('img');
	if (isdef(callback)) d.onload = callback;
	d.src = path;
	mAppend(dParent, d);
	if (isdef(styles)) mStyle(d, styles);
	if (isdef(classes)) mClass(d, classes);

	if (isdef(styles.w)) d.setAttribute('width', styles.w + 'px');
	if (isdef(styles.h)) d.setAttribute('height', styles.h + 'px');


	return d;
	//<img src="kiwi.svg" alt="Kiwi standing on oval"></img>
}
function mInput(dParent, styles, id, placeholder, classtr = 'input', tabindex = null, value = '') {
	let html = `<input type="text" id=${id} class="${classtr}" placeholder="${valf(placeholder, '')}" tabindex="${tabindex}" value="${value}">`;
	let d = mAppend(dParent, mCreateFrom(html));
	if (isdef(styles)) mStyle(d, styles);
	return d;

}
function mInsertAt(dParent, el, index = 0) { mInsert(dParent, el, index); }
function mInsertFirst(dParent, el) { mInsert(dParent, el, 0); }
function mInsert(dParent, el, index = 0) { dParent.insertBefore(el, dParent.childNodes[index]); }
function mInsertAfter(dParent, el, index = 0) {
	if (dParent.childNodes.length == index) mAppend(dParent, el);
	else mInsert(dParent, el, index + 1);
}
function mItem(id, diDOM, di = {}, addSizing = false) {
	let item = di;
	id = isdef(id) ? id : isdef(diDOM) && isdef(diDOM.div) && !isEmpty(diDOM.div.id) ? diDOM.div.id : getUID();
	item.id = iRegister(item, id);
	if (isdef(diDOM) && isdef(diDOM.div)) { diDOM.div.id = id; iAdd(item, diDOM); }
	if (addSizing) {
		if (nundef(item.sizing)) item.sizing = 'sizeToContent';
		if (nundef(item.positioning)) { item.positioning = 'absolute'; }
		if (nundef(item.posType)) { item.posType = 'center'; }
		if (isdef(diDOM) && item.sizing == 'sizeToContent') iMeasure(item, item.sizingOptions);
	}
	return item;
}
function mLine(dParent, styles) { return mDiv(dParent, styles, null, '<hr>'); }
function mLink(dParent, styles, id, inner, classes, sizing) {
	let d = mCreate('a');
	if (dParent) mAppend(dParent, d);
	if (isdef(styles)) mStyle(d, styles);
	if (isdef(classes)) mClass(d, classes);
	if (isdef(id)) d.id = id;
	if (isdef(inner)) d.innerHTML = inner;
	if (isdef(sizing)) { setRect(d, sizing); }

	return d;
}
function mLinebreakFlex(dParent, gap) {
	dParent = toElem(dParent);
	let d = mDiv(dParent, { fz: 2, 'flex-basis': '100%', h: 0, w: '100%' }, null, ' &nbsp; ');
	if (isdef(gap)) { d.style.minHeight = gap + 'px'; d.innerHTML = ' &nbsp; '; d.style.opacity = .2; }//return mLinebreak(dParent);}
	return d;
}
function mLinebreak(dParent, gap) {
	dParent = toElem(dParent);
	let d;
	let display = getComputedStyle(dParent).display;
	if (display == 'flex') {
		d = mDiv(dParent, { fz: 2, 'flex-basis': '100%', h: 0, w: '100%' }, null, ' &nbsp; ');
	} else {
		d = mDiv(dParent, {}, null, '<br>');
	}
	if (isdef(gap)) { d.style.minHeight = gap + 'px'; d.innerHTML = ' &nbsp; '; d.style.opacity = .2; }//return mLinebreak(dParent);}
	return d;
}
function mMagnifyOnHoverControlPopup(elem) {
	elem.onmouseenter = ev => {
		if (ev.ctrlKey) {
			//console.log('hallo!!!!');
			let r = getRect(elem, document.body);
			//console.log('r', r);

			let popup = mDiv(document.body, { rounding: 4, position: 'absolute', top: r.y, left: r.x }, 'popup');
			let clone = elem.cloneNode(true);
			popup.appendChild(clone);
			mClass(popup, 'doublesize')
			popup.onmouseleave = () => popup.remove();
		}
	}
}
function mMagnifyOnHoverControl(elem) {
	elem.onmouseenter = ev => { if (ev.ctrlKey) mClass(elem, 'magnify_on_hover'); }
	elem.onmouseleave = ev => mClassRemove(elem, 'magnify_on_hover');
}
function mMagnifyOnHoverControlRemove(elem) {
	elem.onmouseenter = elem.onmouseleave = null;
	mClassRemove(elem, 'magnify_on_hover');
}
function mMeasure(d) { let r = getRect(d); mStyle(d, { w: r.w, h: r.h }); return r; }
function mNode(o, dParent, title) {
	recConvertLists(o);
	console.log('mNode o', o);
	let d = mCreate('div');
	mYaml(d, o);
	let pre = d.getElementsByTagName('pre')[0];
	pre.style.fontFamily = 'inherit';
	if (isdef(title)) mInsert(d, mText(title));
	if (isdef(dParent)) mAppend(dParent, d);
	if (isDict(o)) d.style.textAlign = 'left';

	return d;
}
function mPlace(elem, pos, offx, offy) {
	// pos is: tl, tb, bl, br or cl, cr, tc, bc, cc
	elem = toElem(elem);

	pos = pos.toLowerCase();
	let dParent = elem.parentNode; if (dParent.style.position != 'absolute') dParent.style.position = 'relative';
	let vert = valf(offx, 0); // valf(margin, Math.max(wSym,hSym) / 10); //0;
	let hor = isdef(offy) ? offy : vert;

	if (pos[0] == 'c' || pos[1] == 'c') {
		let rParent = getRect(dParent);
		let [wParent, hParent] = [rParent.w, rParent.h];
		let rElem = getRect(elem);
		let [wElem, hElem] = [rElem.w, rElem.h];
		//console.log('_____________\nelem', rElem, '\nparent', rParent, '\nhor', hor, '\nvert', vert)
		switch (pos) {
			case 'cc': mStyle(elem, { position: 'absolute', left: hor + (wParent - wElem) / 2, top: vert + (hParent - hElem) / 2 }); break;
			case 'tc': mStyle(elem, { position: 'absolute', left: hor + (wParent - wElem) / 2, top: vert }); break;
			case 'bc': mStyle(elem, { position: 'absolute', left: hor + (wParent - wElem) / 2, bottom: vert }); break;
			case 'cl': mStyle(elem, { position: 'absolute', left: hor, top: vert + (hParent - hElem) / 2 }); break;
			case 'cr': mStyle(elem, { position: 'absolute', right: hor, top: vert + (hParent - hElem) / 2 }); break;
		}
		return;
	}
	let di = { t: 'top', b: 'bottom', r: 'right', l: 'left' };
	elem.style.position = 'absolute';
	elem.style[di[pos[0]]] = hor + 'px'; elem.style[di[pos[1]]] = vert + 'px';

}
function mPos(d, x, y, unit = 'px') { mStyle(d, { left: x, top: y, position: 'absolute' }, unit); }
function mPopup(content, dParent, styles, id) {
	if (isdef(mBy(id))) mRemove(id);
	mIfNotRelative(dParent);
	if (nundef(styles)) styles = { top: 0, left: 0 };
	styles.position = 'absolute';
	let d1 = mDiv(dParent, styles, valf(id, getUID()), content);
	//mPos(d1,0,44)
	return d1;
}
function mRadioToggle(label, val, dParent, styles = {}, is_on = true) {
	let cursor = styles.cursor; delete styles.cursor;

	let d = mDiv(dParent, styles);
	let id = getUID();
	let inp = mCreateFrom(`<input class='radio' id='${id}' type="checkbox" checked="${is_on}" value="${val}" >`);
	let text = mCreateFrom(`<label for='${id}'>${label}</label>`);
	if (isdef(cursor)) { inp.style.cursor = text.style.cursor = cursor; }

	mAppend(d, inp);
	mAppend(d, text);
	//if (isdef(handler)) inp.onclick = ev => {ev.cancelBubble=true;handler(val);}
	return d;
}
function mRadio1(label, val, dParent, styles = {}, handler, group_id) {
	let cursor = styles.cursor; delete styles.cursor;

	let d = mDiv(dParent, styles, group_id + '_' + val);
	let inp = mCreateFrom(`<input class='radio' id='i_${group_id}_${val}' type="radio" name="${group_id}" value="${val}" >`);
	let text = mCreateFrom(`<label for='${inp.id}'>${label}</label>`);
	if (isdef(cursor)) { inp.style.cursor = text.style.cursor = cursor; }
	mAppend(d, inp);
	mAppend(d, text);
	if (isdef(handler)) d.onclick = () => handler(val);

	return d;
}
function mRadio(label, val, name, dParent, styles = {}, handler, group_id, is_on) {
	let cursor = styles.cursor; delete styles.cursor;

	let d = mDiv(dParent, styles, group_id + '_' + val);
	let id = isdef(group_id) ? `i_${group_id}_${val}` : getUID();
	//let name = isdef(group_id)?group_id: val;
	let type = isdef(group_id) ? 'radio' : 'checkbox';
	let checked = isdef(is_on) ? is_on : false;
	//console.log('player', val, is_on)
	let inp = mCreateFrom(`<input class='radio' id='${id}' type="${type}" name="${name}" value="${val}">`); // checked="${checked}" >`);
	if (checked) inp.checked = true;
	//let inp = mCreateFrom(`<input class='radio' id='${id}' type="${type}" name="${name}" value="${val}" checked="${checked}" >`);
	let text = mCreateFrom(`<label for='${inp.id}'>${label}</label>`);
	if (isdef(cursor)) { inp.style.cursor = text.style.cursor = cursor; }
	mAppend(d, inp);
	mAppend(d, text);

	if (isdef(handler)) {
		inp.onclick = ev => {
			ev.cancelBubble = true;
			//console.log('inp',inp);
			if (handler == 'toggle') {
				//console.log('hallo!!!!!!',inp.checked)
				//inp.checked = ev.target.checked == true ? false : true;
			} else if (isdef(handler)) {
				handler(val);
			}
		};
	}

	return d;
}
function mRadioGroup(dParent, styles, id, legend, legendstyles) {
	let f = mCreate('fieldset');
	f.id = id;
	if (isdef(styles)) mStyle(f, styles);
	if (isdef(legend)) {
		let l = mCreate('legend');
		l.innerHTML = legend;
		mAppend(f, l);
		if (isdef(legendstyles)) { mStyle(l, legendstyles); }
	}
	mAppend(dParent, f);
	return f;
}
function mRemove(elem) {
	elem = toElem(elem);
	var a = elem.attributes, i, l, n;
	if (a) {
		for (i = a.length - 1; i >= 0; i -= 1) {
			n = a[i].name;
			if (typeof elem[n] === 'function') {
				elem[n] = null;
			}
		}
	}
	a = elem.childNodes;
	if (a) {
		l = a.length;
		// for (i = 0; i < l; i += 1) {
		for (i = a.length - 1; i >= 0; i -= 1) {
			//console.log(elem.id, a, elem.childNodes[i]);
			mRemove(elem.childNodes[i]);
		}
	}
	elem.remove(); //elem.parentNode.removeChild(elem);
}
function mRemoveChildrenFromIndex(dParent, i) { while (dParent.children[i]) { mRemove(dParent.children[i]); } }
function mShield(dParent, styles = { bg: '#00000020' }, id = null, classnames = null, hideonclick = false) {
	dParent = toElem(dParent);
	let d = mDiv(dParent, styles, id, classnames);
	lookupAddIfToList(DA, ['shields'], d);
	mIfNotRelative(dParent);
	mStyle(d, { position: 'absolute', left: 0, top: 0, w: '100%', h: '100%' });
	if (hideonclick) d.onclick = ev => { evNoBubble(ev); d.remove(); };
	else d.onclick = ev => { evNoBubble(ev); };
	mClass(d, 'topmost');
	//setTimeout(()=>mClass(d,'topmost'),10)
	return d;
}
function mShieldsOff() { if (nundef(DA.shields)) return; for (const d of DA.shields) d.remove(); }
function gCreate(tag) { return document.createElementNS('http://www.w3.org/2000/svg', tag); }
function gSizeToContent(svg) {
	//muss NACH append gemacht werden damit es klappt
	var bbox = svg.getBBox();
	//console.log('bbox', bbox);
	// Update the width and height using the size of the contents
	svg.setAttribute("width", bbox.x + bbox.width + bbox.x);
	svg.setAttribute("height", bbox.y + bbox.height + bbox.y);
}
function mStamp(d1, text, color, sz) {
	mStyle(d1, { position: 'relative' });
	let r = getRect(d1);
	let [w, h] = [r.w, r.h];
	color = ['green', 'red', 'blue'].includes(color) ? color : 'black';
	sz = valf(sz, r.h / 7);
	console.log('r', r, 'sz', sz);
	let [padding, border, rounding, angle] = [sz / 10, sz / 6, sz / 8, rNumber(-25, 25)];
	let d2 = mDiv(d1, {
		//opacity: 0.9,
		fg: color,
		position: 'absolute', top: 25, left: 5,
		transform: `rotate(${angle}deg)`,
		fz: sz,
		hpadding: 2,
		vpadding: 0,
		rounding: rounding,
		//the following wenn ich den black ops one font verwende! mit black
		// border:`${border}px solid grey`, // black
		// '-webkit-mask-size': `${w}px ${h}px`,
		// '-webkit-mask-position': `50% 50%`,
		// '-webkit-mask-image': 'url("../base/assets/images/textures/grunge.png")',
		weight: 400, // 900
		display: 'inline-block',
		'text-transform': 'uppercase',
		family: 'fredericka', // "Fredericka the Great", //"black ops one",  // Courier
		'mix-blend-mode': 'multiply',

	}, null, text);
	mClass(d2, `${color}stamp`);

}
function mStamp(d1, text, color, sz) {
	mStyle(d1, { position: 'relative' });
	let r = getRect(d1);
	let [w, h] = [r.w, r.h];
	color = valf(color, 'black'); // ['green','red','blue'].includes(color)?color:'black';
	sz = valf(sz, r.h / 7);
	//console.log('r', r, 'sz', sz);
	let [padding, border, rounding, angle] = [sz / 10, sz / 6, sz / 8, rChoose([-16, -14, -10, 10, 14])];
	let d2 = mDiv(d1, {
		//opacity: 0.9,
		fg: color,
		position: 'absolute', top: 25, left: 5,
		transform: `rotate(${angle}deg)`,
		fz: sz,
		hpadding: 2,
		vpadding: 0,
		rounding: rounding,

		//the following wenn ich den black ops one font verwende! mit black
		border: `${border}px solid ${colorTrans(color, .8)}`, // black
		'-webkit-mask-size': `${w}px ${h}px`,
		'-webkit-mask-position': `50% 50%`,
		'-webkit-mask-image': 'url("../base/assets/images/textures/grunge.png")',

		weight: 400, // 800
		display: 'inline-block',
		'text-transform': 'uppercase',
		family: 'blackops', // courier blackops fredericka
		'mix-blend-mode': 'multiply',

	}, null, text);
	//mClass(d2,`${color}stamp`);

}
function mSuit(ckey, sz = 20, color = null) {
	let suit = ckey.length == 1 ? ckey : ckey[1];
	let di = { S: '&spades;', H: '&hearts;', D: '&diams;', C: '&clubs;' };
	color = valf(color, suit == 'H' || suit == 'D' ? 'red' : 'black');
	let html = `<span style='color:${color};font-size:${sz}px'>${di[suit]}</span>`;
	return html;

}
function mSize(d, w, h, unit = 'px', sizing) { if (nundef(h)) h = w; mStyle(d, { width: w, height: h }, unit); if (isdef(sizing)) setRect(d, sizing); }
const STYLE_PARAMS = {
	align: 'text-align',
	bg: 'background-color',
	dir: 'flex-direction',
	fg: 'color',
	hgap: 'column-gap',
	vgap: 'row-gap',
	matop: 'margin-top',
	maleft: 'margin-left',
	mabottom: 'margin-bottom',
	maright: 'margin-right',
	origin: 'transform-origin',
	patop: 'padding-top',
	paleft: 'padding-left',
	pabottom: 'padding-bottom',
	paright: 'padding-right',
	rounding: 'border-radius',
	w: 'width',
	h: 'height',
	wmin: 'min-width',
	hmin: 'min-height',
	wmax: 'max-width',
	hmax: 'max-height',
	fontSize: 'font-size',
	fz: 'font-size',
	family: 'font-family',
	weight: 'font-weight',
	z: 'z-index'
};
function getStyleProp(elem, prop) { return getComputedStyle(elem).getPropertyValue(prop); }
function mGetStyle(elem, prop) {
	let val;
	elem = toElem(elem);
	if (prop == 'bg') { val = getStyleProp(elem, 'background-color'); if (isEmpty(val)) return getStyleProp(elem, 'background'); }
	else if (isdef(STYLE_PARAMS[prop])) { val = getStyleProp(elem, STYLE_PARAMS[prop]); } //elem.style[STYLE_PARAMS[prop]]; }
	else {
		switch (prop) {
			case 'vmargin': val = stringBefore(elem.style.margin, ' '); break;
			case 'hmargin': val = stringAfter(elem.style.margin, ' '); break;
			case 'vpadding': val = stringBefore(elem.style.padding, ' '); break;
			case 'hpadding': val = stringAfter(elem.style.padding, ' '); break;
			case 'box': val = elem.style.boxSizing; break;
			case 'dir': val = elem.style.flexDirection; break;
		}
	}
	if (nundef(val)) val = getStyleProp(elem, prop); // elem.style[prop];
	//console.log('prop',prop,'val',val)
	if (val.endsWith('px')) return firstNumber(val); else return val;
}
function mStyle(elem, styles, unit = 'px') {
	//if (styles.bg == '#00000000') console.log('mStyle',getFunctionsNameThatCalledThisFunction(), styles.bg,styles.fg)
	elem = toElem(elem);
	if (isdef(styles.vmargin)) { styles.mabottom = styles.matop = styles.vmargin; }
	if (isdef(styles.hmargin)) { styles.maleft = styles.maright = styles.hmargin; }

	//console.log(':::::::::styles',styles)
	let bg, fg;
	if (isdef(styles.bg) || isdef(styles.fg)) {
		[bg, fg] = colorsFromBFA(styles.bg, styles.fg, styles.alpha);
	}
	if (isdef(styles.vpadding) || isdef(styles.hpadding)) {

		styles.padding = valf(styles.vpadding, 0) + unit + ' ' + valf(styles.hpadding, 0) + unit;
		//console.log('::::::::::::::', styles.vpadding, styles.hpadding)
	}
	if (isdef(styles.upperRounding)) {
		let rtop = '' + valf(styles.upperRounding, 0) + unit;
		let rbot = '0' + unit;
		styles['border-radius'] = rtop + ' ' + rtop + ' ' + rbot + ' ' + rbot;
	} else if (isdef(styles.lowerRounding)) {
		let rbot = '' + valf(styles.lowerRounding, 0) + unit;
		let rtop = '0' + unit;
		styles['border-radius'] = rtop + ' ' + rtop + ' ' + rbot + ' ' + rbot;
	}

	if (isdef(styles.box)) styles['box-sizing'] = 'border-box';
	//console.log(styles.bg,styles.fg);

	for (const k in styles) {
		//if (k=='textShadowColor' || k=='contrast') continue; //meaningless styles => TBD
		let val = styles[k];
		let key = k;
		//console.log('key',key)
		if (isdef(STYLE_PARAMS[k])) key = STYLE_PARAMS[k];
		else if (k == 'font' && !isString(val)) {
			//font would be specified as an object w/ size,family,variant,bold,italic
			// NOTE: size and family MUST be present!!!!!!! in order to use font param!!!!
			let fz = f.size; if (isNumber(fz)) fz = '' + fz + 'px';
			let ff = f.family;
			let fv = f.variant;
			let fw = isdef(f.bold) ? 'bold' : isdef(f.light) ? 'light' : f.weight;
			let fs = isdef(f.italic) ? 'italic' : f.style;
			if (nundef(fz) || nundef(ff)) return null;
			let s = fz + ' ' + ff;
			if (isdef(fw)) s = fw + ' ' + s;
			if (isdef(fv)) s = fv + ' ' + s;
			if (isdef(fs)) s = fs + ' ' + s;
			elem.style.setProperty(k, s);
			continue;
		} else if (k == 'classname') {
			mClass(elem, styles[k]);
		} else if (k == 'border') {
			//console.log('________________________YES!')
			if (isNumber(val)) val = `solid ${val}px ${isdef(styles.fg) ? styles.fg : '#ffffff80'}`;
			if (val.indexOf(' ') < 0) val = 'solid 1px ' + val;
		} else if (k == 'layout') {
			if (val[0] == 'f') {
				//console.log('sssssssssssssssssssssssssssssssssssssssssssss')
				val = val.slice(1);
				elem.style.setProperty('display', 'flex');
				elem.style.setProperty('flex-wrap', 'wrap');
				let hor, vert;
				if (val.length == 1) hor = vert = 'center';
				else {
					let di = { c: 'center', s: 'start', e: 'end' };
					hor = di[val[1]];
					vert = di[val[2]];

				}
				let justStyle = val[0] == 'v' ? vert : hor;
				let alignStyle = val[0] == 'v' ? hor : vert;
				elem.style.setProperty('justify-content', justStyle);
				elem.style.setProperty('align-items', alignStyle);
				switch (val[0]) {
					case 'v': elem.style.setProperty('flex-direction', 'column'); break;
					case 'h': elem.style.setProperty('flex-direction', 'row'); break;
				}
			} else if (val[0] == 'g') {
				//layout:'g_15_240' 15 columns, each col 240 pixels wide
				//console.log('sssssssssssssssssssssssssssssssssssssssssssss')
				val = val.slice(1);
				elem.style.setProperty('display', 'grid');
				let n = allNumbers(val);
				let cols = n[0];
				let w = n.length > 1 ? '' + n[1] + 'px' : 'auto';
				elem.style.setProperty('grid-template-columns', `repeat(${cols}, ${w})`);
				elem.style.setProperty('place-content', 'center');
			}
		} else if (k == 'layflex') {
			elem.style.setProperty('display', 'flex');
			elem.style.setProperty('flex', '0 1 auto');
			elem.style.setProperty('flex-wrap', 'wrap');
			if (val == 'v') { elem.style.setProperty('writing-mode', 'vertical-lr'); }
		} else if (k == 'laygrid') {
			elem.style.setProperty('display', 'grid');
			let n = allNumbers(val);
			let cols = n[0];
			let w = n.length > 1 ? '' + n[1] + 'px' : 'auto';
			elem.style.setProperty('grid-template-columns', `repeat(${cols}, ${w})`);
			elem.style.setProperty('place-content', 'center');
		}

		//console.log(key,val,isNaN(val));if (isNaN(val) && key!='font-size') continue;
		//if (k == 'bg') console.log('style', k, key, val, bg)

		if (key == 'font-weight') { elem.style.setProperty(key, val); continue; }
		else if (key == 'background-color') elem.style.background = bg;
		else if (key == 'color') elem.style.color = fg;
		else if (key == 'opacity') elem.style.opacity = val;
		else if (key == 'wrap') elem.style.flexWrap = 'wrap';
		else if (startsWith(k, 'dir')) {
			//console.log('.................................................!!!!!!!!!!!!!!!!!!!!!!!')
			//console.log('val',val);
			isCol = val[0] == 'c';
			elem.style.setProperty('flex-direction', 'column'); //flexDirection = isCol ? 'column' : 'row';
			//in order for this to work, HAVE TO set wmax or hmax!!!!!!!!!!!!!
			// if (isCol && nundef(styles.hmax)) { //?????????????? WTF??????????????????
			// 	let rect = getRect(elem.parentNode); //console.log('rect', rect);
			// 	elem.style.maxHeight = rect.h * .9;
			// 	elem.style.alignContent = 'start';
			// } else if (nundef(styles.wmax)) elem.style.maxWidth = '90%';
		} else if (key == 'flex') {
			if (isNumber(val)) val = '' + val + ' 1 0%';
			elem.style.setProperty(key, makeUnitString(val, unit));
		} else {
			//console.log('set property',key,makeUnitString(val,unit),val,isNaN(val));
			//if ()
			elem.style.setProperty(key, makeUnitString(val, unit));
		}
	}
}
function mStyleRemove(elem, prop) {
	if (isdef(STYLE_PARAMS[prop])) prop = STYLE_PARAMS[prop];
	elem.style.removeProperty(prop);
}
function miPic(item, dParent, styles, classes) {
	let info = isString(item) ? Syms[item] : isdef(item.info) ? item.info : item;
	let d = mDiv(dParent);
	d.innerHTML = info.text;
	if (nundef(styles)) styles = {};

	let family = info.family; // == 'emoNoto' && DA.isFirefox == true? 'emoNotoFF':info.family;

	addKeys({ family: family, fz: 50, display: 'inline-block' }, styles);
	mStyle(d, styles);
	if (isdef(classes)) mClass(d, classes);
	mCenterCenterFlex(d);
	return d;
}
function valfi() {
	for (const arg of arguments) {
		if (isdef(arg)) return arg;
	}
	return null;
}
function mSymText(s, dParent, styles = {}, pos, classes) {
	styles.display = 'inline-block';

	styles.w = valfi(styles.w, styles.sz, styles.h, '25%');
	styles.h = valfi(styles.h, styles.sz, styles.w, styles.fz, '25%');
	styles.fz = valfi(styles.fz, styles.sz * 4 / 5, styles.h * 4 / 5, styles.w * 2, '20%');
	styles.align = 'center';

	let x = mDiv(dParent, styles, null, s); mCenterCenterFlex(x);
	if (isdef(classes)) mClass(x, classes);
	if (isdef(pos)) { mPlace(x, pos); }
	return x;
}
function mSym(key, dParent, styles = {}, pos, classes) {
	let info = Syms[key];
	styles.display = 'inline-block';

	let family = info.family; // == 'emoNoto' && DA.isFirefox == true? 'emoNotoFF':info.family;

	styles.family = family;

	//console.log('vorher: styles', jsCopy(styles))

	let sizes;
	if (isdef(styles.sz)) { sizes = mSymSizeToBox(info, styles.sz, styles.sz); }
	else if (isdef(styles.w) && isdef(styles.h)) { sizes = mSymSizeToBox(info, styles.w, styles.h); }
	else if (isdef(styles.fz)) { sizes = mSymSizeToFz(info, styles.fz); }
	else if (isdef(styles.h)) { sizes = mSymSizeToH(info, styles.h); }
	else if (isdef(styles.w)) { sizes = mSymSizeToW(info, styles.w); }
	else { sizes = mSymSizeToFz(info, 25); }

	styles.fz = sizes.fz;
	styles.w = sizes.w;
	styles.h = sizes.h;
	styles.align = 'center';
	if (isdef(styles.bg) && info.family != 'emoNoto') { styles.fg = styles.bg; delete styles.bg; }

	//console.log('nachher: styles', jsCopy(styles))


	let x = mDiv(dParent, styles, null, info.text);
	if (isdef(classes)) mClass(x, classes);
	if (isdef(pos)) { mPlace(x, pos); }
	return x;
}
function mSymSizeToH(info, h) { let f = h / info.h; return { fz: 100 * f, w: info.w * f, h: h }; }
function mSymSizeToW(info, w) { let f = w / info.w; return { fz: 100 * f, w: w, h: info.h * f }; }
function mSymSizeToFz(info, fz) { let f = fz / 100; return { fz: fz, w: info.w * f, h: info.h * f }; }
function mSymSizeToBox(info, w, h) {
	//console.log('mSymSizeToBox', w, h, '\ninfo:', info.w, info.h);
	let fw = w / info.w;
	let fh = h / info.h;
	let f = Math.min(fw, fh);
	//console.log('fw', fw, '\nfh', fh, '\nf', f);
	return { fz: 100 * f, w: info.w * f, h: info.h * f };
}
function mTable(dParent, headers, showheaders, styles = { mabottom: 0 }, className = 'table') {
	let d = mDiv(dParent);
	let t = mCreate('table');
	mAppend(d, t);
	if (isdef(className)) mClass(t, className);
	if (isdef(styles)) mStyle(t, styles);
	if (showheaders) {
		let code = `<tr>`;
		for (const h of headers) {
			code += `<th>${h}</th>`
		}
		code += `</tr>`;
		t.innerHTML = code;
	}
	return t;
}
function mSelectTableRow(r, color = 'pink') {
	let t = r.parentNode;
	for (const ch of t.children) mStyle(ch, { background: 'transparent' });
	mStyle(r, { background: color });
}
function mTableCol(r, val) {
	let col = mCreate('td');
	mAppend(r, col);
	if (isdef(val)) col.innerHTML = val;
	return col;
}
function mTableHeader(t, val) {
	let col = mCreate('th');
	mAppend(t.firstChild, col);
	col.innerHTML = val;
	return col;
}
function mTableRow(t, o, headers, id) {
	let elem = mCreate('tr');
	if (isdef(id)) elem.id = id;
	mAppend(t, elem);
	let colitems = [];
	for (const k of headers) {
		let val = isdef(o[k]) ? isDict(o[k]) ? JSON.stringify(o[k]) : isList(o[k]) ? o[k].join(', ') : o[k] : '';
		//console.log(`o[${k}] = ${val}`, typeof (o[k]), isList(o[k]), isDict(o[k]))
		let col = mTableCol(elem, val);
		colitems.push({ div: col, key: k, val: val });
	}
	return { div: elem, colitems: colitems };
}
function mTableCommandify(rowitems, di) {
	//di: index:function(rowitem,current_colitem.val)
	for (const item of rowitems) {
		for (const index in di) {
			let colitem = item.colitems[index];
			//console.log('colitem', colitem)
			colitem.div.innerHTML = di[index](item, colitem.val);

		}
	}
}
function mTableCommandifyList(rowitem, val, func) {
	//func should take in rowitem,listval and return html
	let names = isString(val) ? val.replaceAll(' ', ',').split(',') : val;
	let html = '';
	for (const name of names) {
		html += func(rowitem, name); //`<a href="/table/${rowitem.o.name}/${name}">${name}</a>`
	}
	return html;
}
function mText(text, dParent, styles, classes) {
	if (!isString(text)) text = text.toString();
	let d = mDiv(dParent);
	if (!isEmpty(text)) { d.innerHTML = text; }
	//console.log('text',text,typeof(text),isString(text),isEmpty(text),d);
	if (isdef(styles)) mStyle(d, styles);
	if (isdef(classes)) mClass(d, classes);
	return d;
}
function mTextArea(rows, cols, dParent, styles = {}, id) {
	let html = `<textarea id="${id}" rows="${rows}" cols="${cols}" wrap="hard"></textarea>`;
	let t = mCreateFrom(html);
	mAppend(dParent, t);
	mStyle(t, styles);
	return t;
}
function mYaml(d, js) {
	d.innerHTML = '<pre>' + jsonToYaml(js) + '</pre>';
	return d;
	// d.innerHTML = '<pre class="info">' + jsonToYaml(js) + '</pre>'; 
}
//#endregion

//#region m prefix anim
function mTableTransition(d, ms = 800) {
	toElem(d).animate([{ opacity: .25 }, { opacity: 1 },], { fill: 'both', duration: ms, easing: 'ease' });
}
function mAppear(d, ms = 800, callback = null, easing = 'ease') { return mAnimateTo(d, 'opacity', 1, callback, ms, easing); }
function mFade(d, ms = 800, callback = null, easing = 'ease') { return mAnimateTo(d, 'opacity', 0, callback, ms, easing); }
function mFadeRemove(d, ms = 800, callback = null) { return mAnimateTo(d, 'opacity', 0, () => { mRemove(d); if (callback) callback(); }, ms); }
function mFadeClear(d, ms = 800, callback = null) { return mAnimateTo(d, 'opacity', 0, () => { mClear(d); if (callback) callback(); }, ms); }
function mFadeClearShow(d, ms = 800, callback = null) { return mAnimate(d, 'opacity', [1, 0], () => { mClear(d); if (callback) callback(); }, ms); }
function mFall(d, ms = 800, dist = 50) { toElem(d).animate([{ opacity: 0, transform: `translateY(-${dist}px)` }, { opacity: 1, transform: 'translateY(0px)' },], { fill: 'both', duration: ms, easing: 'ease' }); }
function mPulse(d, ms, callback = null) { mClass(d, 'onPulse'); TO[getUID()] = setTimeout(() => { mClassRemove(d, 'onPulse'); if (callback) callback(); }, ms); }
function mPulse1(d, callback) { mPulse(d, 1000, callback); }
function mPulse2(d, callback) { mPulse(d, 2000, callback); }
function mPulse3(d, callback) { mPulse(d, 3000, callback); }

function mHide(d, ms = 0) { if (ms > 0) mFade(d, ms); else mStyle(d, { opacity: 0 }); }
function mShow(d, ms = 0) { if (ms > 0) mAppear(d, ms); else mStyle(d, { opacity: 1 }); }
function mRise(d, ms = 800) {
	toElem(d).animate([{ opacity: 0, transform: 'translateY(50px)' }, { opacity: 1, transform: 'translateY(0px)' },], { fill: 'both', duration: ms, easing: 'ease' });
}
function mShrink(d, x = .75, y = .75, ms = 800, callback = null) {
	let anim = toElem(d).animate([{ transform: `scale(${1},${1})` }, { transform: `scale(${x},${y})` },], { fill: 'both', duration: ms, easing: 'ease' });
	anim.onfinish = callback;
}
function mShrinkUp(d, x = .75, y = 0, ms = 800, callback = null) {
	let anim = toElem(d).animate([{ transform: `scale(${1},${1})`, opacity: 1 }, { transform: `scale(${x},${y})`, opacity: 0 },], { fill: 'none', duration: ms, easing: 'ease' });
	anim.onfinish = mClear(d);
}
function mTranslate(child, newParent, ms = 800, callback = null) {
	let [dx, dy] = get_screen_distance(child, newParent);
	onend = () => { mAppend(newParent, child); if (callback) callback(); };
	mAnimate(child, 'transform', [`translateX(${dx}px) translateY(${dy}px)`], onend, ms, 'ease'); //translate(${dx}px,${dy}px)`
	//let anim = toElem(child).animate([{ transform: `scale(${1},${1})` }, { transform: `scale(${x},${y})` },], { fill: 'both', duration: ms, easing: 'ease' });
	//anim.onfinish = callback;
}
function mTranslateBy(elem, x, y, ms = 800, callback = null) {
	mAnimate(elem, 'transform', [`translateX(${x}px) translateY(${y}px)`], callback, ms, 'ease'); //translate(${dx}px,${dy}px)`
	//let anim = toElem(child).animate([{ transform: `scale(${1},${1})` }, { transform: `scale(${x},${y})` },], { fill: 'both', duration: ms, easing: 'ease' });
	//anim.onfinish = callback;
}
function mTranslateByFade(elem, x, y, ms = 800, callback = null) {

	mAnimate(elem, 'transform', [`translateX(${x}px) translateY(${y}px)`], callback, ms, 'ease'); //translate(${dx}px,${dy}px)`
	let a = toElem(elem).animate([{ opacity: .25 }, { opacity: 1 },], { fill: 'both', duration: ms, easing: 'ease' });

	//mAnimate(elem, 'transform', [`translateX(${x}px) translateY(${y}px)`], callback, ms, 'ease'); //translate(${dx}px,${dy}px)`
	//let anim = toElem(child).animate([{ transform: `scale(${1},${1})` }, { transform: `scale(${x},${y})` },], { fill: 'both', duration: ms, easing: 'ease' });
	//anim.onfinish = callback;
}
function mScale(d, scale) { mStyle(d, { 'transform-origin': 'top', transform: `scale(${scale})` }); }
function mShrinkTranslate(child, scale, newParent, ms = 800, callback) {
	let [dx, dy] = get_screen_distance(child, newParent);
	mAnimate(child, 'transform', [`translateX(${dx}px) translateY(${dy}px) scale(${scale})`], callback, ms, 'ease');
}


//#endregion

//#region i prefix
function iAdd(item, props) {
	let id, l;
	if (isString(item)) { id = item; item = Items[id]; }
	else if (nundef(item.id)) { id = item.id = iRegister(item); }
	else { id = item.id; if (nundef(Items[id])) Items[id] = item; }
	if (nundef(item.live)) item.live = {};
	l = item.live;
	for (const k in props) {
		let val = props[k];
		if (nundef(val)) {
			//console.log('k', k, 'item', item, 'props', props);
			continue;
		}
		l[k] = val;
		if (k == 'div') val.id = id;
		if (isdef(val.id) && val.id != id) {
			//console.log('adding', val.id, 'as member of', id)
			lookupAddIfToList(val, ['memberOf'], id);
		}
	}
}
function iDiv(i) { return isdef(i.live) ? i.live.div : isdef(i.div) ? i.div : i; }
function iMeasure(item, sizingOptions) {
	if (nundef(iDiv(item))) return;
	setRect(iDiv(item), valf(sizingOptions, { hgrow: true, wgrow: true }));
}
function iRegister(item, id) { let uid = isdef(id) ? id : getUID(); Items[uid] = item; return uid; }

//#endregion

//#region _SVG/g shapes
var SHAPEFUNCS = {
	'circle': agCircle,
	'hex': agHex,
	'rect': agRect,
}
function drawShape(key, dParent, styles, classes, sizing) {
	if (nundef(styles)) styles = { w: 96, h: 96, bg: 'random' };
	//if (nundef(classes)) classes = ['superhover'];
	if (nundef(sizing)) sizing = { hgrow: true, wgrow: true };
	let d = mDiv(dParent, styles, null, null, classes, sizing);
	// mStyle(d, { 'clip-path': PolyClips[key] });
	if (key == 'circle' || key == 'ellipse') mStyle(d, { rounding: '50%' });
	else mStyle(d, { 'clip-path': PolyClips[key] });
	return d;
}
function drawPlainCircle(c) {
	let item = mPic('heart', dMain, { fz: 8, bg: 'red', rounding: '50%', padding: 1 });
	mPos(iDiv(item), c.x, c.y);
	return item;
}
function drawText(text, c) {
	let item = mText(text, dMain, { fz: 16, bg: 'skyblue', rounding: '50%', padding: 4 });
	mPos(iDiv(item), c.x, c.y);
	return item;
}
function drawSym(sym, c) {
	let item = mPic(sym, dMain, { fz: 25, bg: 'skyblue', rounding: '50%', padding: 4 });
	mPos(iDiv(item), c.x, c.y);
	return item;
}
function drawTriangle(dParent, styles, classes, sizing) {
	if (nundef(styles)) styles = { w: 100, h: 100, bg: 'blue' };
	if (nundef(classes)) classes = ['frameOnHover'];
	if (nundef(sizing)) sizing = { hgrow: true, wgrow: true };
	let d = mDiv(dParent, styles, null, null, classes, sizing);
	mStyle(d, { 'clip-path': 'polygon(50% 0%, 100% 100%, 0% 100%)' });
	return d;
}
function drawFlatHex(dParent, styles, classes, sizing) {
	if (nundef(styles)) styles = { w: 100, h: 100, bg: 'blue' };
	if (nundef(classes)) classes = ['frameOnHover'];
	if (nundef(sizing)) sizing = { hgrow: true, wgrow: true };
	let d = mDiv(dParent, styles, null, null, classes, sizing);
	mStyle(d, { 'clip-path': 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)' });
	return d;
}
function drawHex(dParent, styles, classes, sizing) {
	if (nundef(styles)) styles = { w: 100, h: 100, bg: 'blue' };
	if (nundef(classes)) classes = ['frameOnHover'];
	if (nundef(sizing)) sizing = { hgrow: true, wgrow: true };
	let d = mDiv(dParent, styles, null, null, classes, sizing);
	mStyle(d, { 'clip-path': 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' });
	return d;
}
function gSizeToContent(svg) {
	//muss NACH append gemacht werden damit es klappt
	var bbox = svg.getBBox();
	//console.log('bbox', bbox);
	// Update the width and height using the size of the contents
	svg.setAttribute("width", bbox.x + bbox.width + bbox.x);
	svg.setAttribute("height", bbox.y + bbox.height + bbox.y);
}

function agColoredShape(g, shape, w, h, color) {
	//console.log(shape)
	SHAPEFUNCS[shape](g, w, h);
	gBg(g, color);
}
function agShape(g, shape, w, h, color, rounding) {
	let sh = gShape(shape, w, h, color, rounding);
	g.appendChild(sh);
	return sh;
}
function gShape(shape, w = 20, h = 20, color = 'green', rounding) {
	//console.log(shape)
	let el = gG();
	if (nundef(shape)) shape = 'rect';
	if (shape != 'line') agColoredShape(el, shape, w, h, color);
	else gStroke(el, color, w); //agColoredLine(el, w, color);

	if (isdef(rounding) && shape == 'rect') {
		let r = el.children[0];
		gRounding(r, rounding);
		//console.log(rounding,r);
		// r.setAttribute('rx', rounding); // rounding kann ruhig in % sein!
		// r.setAttribute('ry', rounding);
	}

	return el;
}

function gCreate(tag) { return document.createElementNS('http://www.w3.org/2000/svg', tag); }
function gPos(g, x, y) { g.style.transform = `translate(${x}px, ${y}px)`; }
function gSize(g, w, h, shape = null, iChild = 0) {
	//console.log(getTypeOf(g))
	let el = (getTypeOf(g) != 'g') ? g : g.children[iChild];
	let t = getTypeOf(el);
	//console.log('g', g, '\ntype of g child', el, 'is', t);
	switch (t) {
		case 'rect': el.setAttribute('width', w); el.setAttribute('height', h); el.setAttribute('x', -w / 2); el.setAttribute('y', -h / 2); break;
		case 'ellipse': el.setAttribute('rx', w / 2); el.setAttribute('ry', h / 2); break;
		default:
			if (shape) {
				switch (shape) {
					case 'hex': let pts = size2hex(w, h); el.setAttribute('points', pts); break;
				}
			}
	}
	return el;
}
function gBg(g, color) { g.setAttribute('fill', color); }
function gFg(g, color, thickness) { g.setAttribute('stroke', color); if (thickness) g.setAttribute('stroke-width', thickness); }
function gRounding(r, rounding) {
	//let r = el.children[0];
	//console.log(rounding,r);
	r.setAttribute('rx', rounding); // rounding kann ruhig in % sein!
	r.setAttribute('ry', rounding);

}
function gStroke(g, color, thickness) { g.setAttribute('stroke', color); if (thickness) g.setAttribute('stroke-width', thickness); }
function gSvg() { return gCreate('svg'); } //document.createElementNS('http://www.w3.org/2000/svg', 'svg'); }
function gG() { return gCreate('g'); }// document.createElementNS('http://www.w3.org/2000/svg', 'g'); }
function gHex(w, h) { let pts = size2hex(w, h); return gPoly(pts); }
function gPoly(pts) { let r = gCreate('polygon'); if (pts) r.setAttribute('points', pts); return r; }
function gRect(w, h) { let r = gCreate('rect'); r.setAttribute('width', w); r.setAttribute('height', h); r.setAttribute('x', -w / 2); r.setAttribute('y', -h / 2); return r; }
function gEllipse(w, h) { let r = gCreate('ellipse'); r.setAttribute('rx', w / 2); r.setAttribute('ry', h / 2); return r; }
function gLine(x1, y1, x2, y2) { let r = gCreate('line'); r.setAttribute('x1', x1); r.setAttribute('y1', y1); r.setAttribute('x2', x2); r.setAttribute('y2', y2); return r; }

function gCanvas(area, w, h, color, originInCenter = true) {
	let dParent = mBy(area);
	let div = stage3_prepContainer(dParent);
	div.style.width = w + 'px';
	div.style.height = h + 'px';

	let svg = gSvg();
	let style = `margin:0;padding:0;position:absolute;top:0px;left:0px;width:100%;height:100%;`
	svg.setAttribute('style', style);
	mColor(svg, color);
	div.appendChild(svg);

	let g = gG();
	if (originInCenter) g.style.transform = "translate(50%, 50%)";
	svg.appendChild(g);

	return g;

}

function agCircle(g, sz) { let r = gEllipse(sz, sz); g.appendChild(r); return r; }
function agEllipse(g, w, h) { let r = gEllipse(w, h); g.appendChild(r); return r; }
function agHex(g, w, h) { let pts = size2hex(w, h); return agPoly(g, pts); }
function agPoly(g, pts) { let r = gPoly(pts); g.appendChild(r); return r; }
function agRect(g, w, h) { let r = gRect(w, h); g.appendChild(r); return r; }
function agLine(g, x1, y1, x2, y2) { let r = gLine(x1, y1, x2, y2); g.appendChild(r); return r; }
function agG(g) { let g1 = gG(); g.appendChild(g1); return g1; }
//function agSvgg(d) { let svg = gSvg(); agG(svg); d.appendChild(svg); return g; }
function aSvg(dParent) {
	if (!dParent.style.position) dParent.style.position = 'relative';

	let svg1 = gSvg();
	//console.log(svg1)
	svg1.setAttribute('width', '100%');
	svg1.setAttribute('height', '100%');
	let style = 'margin:0;padding:0;position:absolute;top:0px;left:0px;';
	svg1.setAttribute('style', style);
	dParent.appendChild(svg1);

	return svg1;
}
function aSvgg(dParent, originInCenter = true) {
	if (!dParent.style.position) dParent.style.position = 'relative';

	let svg1 = gSvg();
	//console.log(svg1)
	svg1.setAttribute('width', '100%');
	svg1.setAttribute('height', '100%');
	let style = 'margin:0;padding:0;position:absolute;top:0px;left:0px;';
	svg1.setAttribute('style', style);
	dParent.appendChild(svg1);

	let g1 = document.createElementNS('http://www.w3.org/2000/svg', 'g');
	svg1.appendChild(g1);
	if (originInCenter) { g1.style.transform = "translate(50%, 50%)"; } //works!

	return g1;

}
//endregion

//#region arr dict
function addIf(arr, el) { if (!arr.includes(el)) arr.push(el); }
function arrBuckets(arr, func, sortbystr) {
	let di = {};
	for (const a of arr) {
		let val = func(a);
		if (nundef(di[val])) di[val] = { val: val, list: [] };
		di[val].list.push(a);
	}

	let res = []
	let keys = get_keys(di);
	if (isdef(sortbystr)) {
		keys.sort((a, b) => sortbystr.indexOf(a) - sortbystr.indexOf(b));
	}
	return keys.map(x => di[x]);

}
function arrClear(arr) { arr.length = 0; }
function arrChildren(elem) { return [...toElem(elem).children]; }
function arrCount(arr, func) { return arr.filter(func).length; }
function arrCycle(arr, count) { return arrRotate(arr, count); }
function arrExtend(arr, list) { list.map(x => arr.push(x)); return arr; }
function arrFirst(arr) { return arr.length > 0 ? arr[0] : null; }
function arrFlatten(arr) {
	let res = [];
	for (let i = 0; i < arr.length; i++) {
		for (let j = 0; j < arr[i].length; j++) {
			res.push(arr[i][j]);
		}
	}
	return res;
}
function arrFromIndex(arr, i) { return arr.slice(i); }
function draw_from_deck_to(deck, arr) { top_elem_from_to(deck, arr); }
function draw_from_deck_to_board(deck, arr) { top_elem_from_to_top(deck, arr); }
function return_elem_to_deck_from(el, arr, deck) { elem_from_to(el, arr, deck); }
function top_elem_from_to(arr1, arr2) { arr2.push(arr1.shift()); }
function top_elem_from_to_top(arr1, arr2) { arr2.unshift(arr1.shift()); }
function last_elem_from_to(arr1, arr2) { arr2.push(arr1.pop()); }
function bottom_elem_from_to(arr1, arr2) { last_elem_from_to(arr1, arr2); }
function bottom_elem_from_to_top(arr1, arr2) { arr2.unshift(arr1.pop()); }
function elem_from_to(el, arr1, arr2) { removeInPlace(arr1, el); arr2.push(el); }
function elem_from_to_top(el, arr1, arr2) { removeInPlace(arr1, el); arr2.unshift(el); }
function arrFromTo(arr, iFrom, iTo) { return takeFromTo(arr, iFrom, iTo); }
function arrFunc(n, func) { let res = []; for (let i = 0; i < n; i++) res.push(func()); return res; }
function arrIndices(arr, func) {
	let indices = [];
	for (let i = 0; i < arr.length; i++) { if (func(arr[i])) indices.push(i); }
	return indices;
}
function arrLastOfLast(arr) { if (arr.length > 0) { let l = arrLast(arr); return isList(l) ? arrLast(l) : null; } else return null; }
function arrLast(arr) { return arr.length > 0 ? arr[arr.length - 1] : null; }
function arrMinMax(arr, func) {
	//ACHTUNG!!! this only works for unique max or min (returns only the first max/min index!)
	//console.log('====arr',arr)
	if (nundef(func)) func = x => x;
	let min = func(arr[0]), max = func(arr[0]), imin = 0, imax = 0;
	//console.log('arr', arr, '\nmin', min, 'max', max)

	for (let i = 1, len = arr.length; i < len; i++) {
		let v = func(arr[i]);
		if (v < min) {
			min = v; imin = i;
			//console.log('new min!', '\nv', v, 'min', min, 'i', i);
		} else if (v > max) {
			max = v; imax = i;
			//console.log('new max!', '\nv', v, 'max', max, 'i', i);
		}
	}

	return { min: min, imin: imin, max: max, imax: imax, elmin: arr[imin], elmax: arr[imax] };
}
function arrTakeWhile(arr, func) {
	let res = [];
	for (const a of arr) {
		if (func(a)) res.push(a); else break;
	}
	return res;
}
function arr_get_max(arr, func) {
	//ACHTUNG!!! arr may NOT contain any DOM elem! (using JSON.stringify)
	if (isEmpty(arr)) return null;
	if (nundef(func)) func = x => x;
	let i = 0; let aug = arr.map(x => ({ el: jsCopy(x), val: func(x), i: i++ }));
	sortByDescending(aug, 'val');
	let max = aug[0].val;
	let res = arrTakeWhile(aug, x => x.val == max); return res.map(x => arr[x.i]);
}
function arr_get_min(arr, func) {
	//ACHTUNG!!! arr may NOT contain any DOM elem! (using JSON.stringify)
	if (isEmpty(arr)) return null;
	if (nundef(func)) func = x => x;
	let i = 0; let aug = arr.map(x => ({ el: jsCopy(x), val: func(x), i: i++ }));
	sortBy(aug, 'val');
	let min = aug[0].val;
	let res = arrTakeWhile(aug, x => x.val == min); return res.map(x => arr[x.i]);
}
function arrMax(arr, f) { return arr_get_max(arr, f); }
function arrMin(arr, f) { return arr_get_min(arr, f); }
function arrMinus(a, b) { if (isList(b)) return a.filter(x => !b.includes(x)); else return a.filter(x => x != b); }
function arrPlus(a, b) { b.map(x => a.push(x)); return a; }
function arrRange(from = 1, to = 10, step = 1) { let res = []; for (let i = from; i <= to; i += step)res.push(i); return res; }
function arrRemove(arr, listweg) {
	//ACHTUNG!!!! geht nur wenn array elements unique sind! removes FIRST OCCURRENCE of el in arr!!!!!!!!!!!!!	
	arrReplace(arr, listweg, []);
}
function arrRemoveLast(arr) { arr.length -= 1; }
function arrRepeat(n, el) { let res = []; for (let i = 0; i < n; i++) res.push(el); return res; }
function arrReplace(arr, listweg, listdazu) {
	//ACHTUNG!!!! geht nur wenn array elements unique sind! removes FIRST OCCURRENCE of el in arr!!!!!!!!!!!!!
	arrExtend(arr, listdazu);
	listweg.map(x => arrRemovip(arr, x));
	return arr;
}
function arrReplace1(arr, elweg, eldazu) {
	//ACHTUNG!!!! geht nur wenn array elements unique sind! removes FIRST OCCURRENCE of el in arr!!!!!!!!!!!!!
	let i = arr.indexOf(elweg);
	arr[i] = eldazu;
	return arr;
}
function arrRemovip(arr, el) {
	//ACHTUNG!!!! geht nur wenn array elements unique sind! removes FIRST OCCURRENCE of el in arr!!!!!!!!!!!!!
	let i = arr.indexOf(el);
	if (i > -1) arr.splice(i, 1);
	return i;
}
function arrRotate(arr, count) {
	// usage:
	// let arr = [1,2,3,4,5];let arr1=jsCopy(arr); arr2=arrRotate(arr1,2);
	var unshift = Array.prototype.unshift,
		splice = Array.prototype.splice;
	var len = arr.length >>> 0, count = count >> 0;

	let arr1 = jsCopy(arr);
	unshift.apply(arr1, splice.call(arr1, count % len, len));
	return arr1;
}
function arrReverse(arr) { return jsCopy(arr).reverse(); }
function arrSplitAtIndex(arr, i) {
	return [arr.slice(0, i), arr.slice(i)];
}
function arrSplitByIndices(arr, indices) {
	let [a1, a2] = [[], jsCopy(arr)];
	for (let i = 0; i < indices.length; i++) {
		let el = arr[indices[i]];
		a1.push(el);
		removeInPlace(a2, el);
	}
	return [a1, a2];
}
function arrShufflip(arr) { if (isEmpty(arr)) return []; else return fisherYates(arr); }
function arrSum(arr, props) { if (nundef(props)) return arr.reduce((a, b) => a + b); if (!isList(props)) props = [props]; return arr.reduce((a, b) => a + (lookup(b, props) || 0), 0); }
function arrSwap(arr, i, j) { let h = arr[i]; arr[i] = arr[j]; arr[j] = h; }
function arrTake(arr, n = 0, from = 0) {
	if (isDict(arr)) {
		let keys = Object.keys(arr);
		return n > 0 ? keys.slice(from, from + n).map(x => (arr[x])) : keys.slice(from).map(x => (arr[x]));
	} else return n > 0 ? arr.slice(from, from + n) : arr.slice(from);

}
function arrTakeLast(arr, n, from = 0) {
	let res = [];
	if (isDict(arr)) {
		let keys = Object.keys(arr);
		let ilast = keys.length - 1; for (let i = ilast - from; i >= 0 && i > ilast - from - n; i--) { res.unshift(arr[keys[i]]); }
	} else {
		//ex arr=[1,2,3,4,5]; n=3; from=1; ilast=4; len = 5
		//soll [2,3,4], ist: i=3,i=2,i=1
		//ex arr=[0,1,2,3,4]; n=2; from=0; ilast=4; len = 5
		//soll i=4, >5-0-2-1=2
		// let len = arr.length;
		// for (let i = len - 1 - from; i > len - 1 - from - n; i--) { res.unshift(arr[i]); }
		let ilast = arr.length - 1; for (let i = ilast - from; i >= 0 && i > ilast - from - n; i--) { res.unshift(arr[i]); }
	}
	return res;

}
function arrWithout(arr, b) { return arrMinus(arr, b); }
function arrZip(arr1, arr2) {
	//arr1, arr2 are arrays of objects!
	let res = [];
	for (let i = 0; i < Math.min(arr1, arr2); i++) {
		let o = {};
		addKeys(arr1[i], o);
		addKeys(arr2[i], o);
		res.push(o);
	}
	return res;
}
function addKeys(ofrom, oto) { for (const k in ofrom) if (nundef(oto[k])) oto[k] = ofrom[k]; return oto; }
function copyKeys(ofrom, oto, except = {}, only) {
	//console.log(ofrom)
	let keys = isdef(only) ? only : Object.keys(ofrom);
	for (const k of keys) {
		if (isdef(except[k])) continue;
		oto[k] = ofrom[k];
	}
}
function dict2list(d, keyName = 'id') {
	let res = [];
	for (const key in d) {
		let val = d[key];
		let o;
		if (isDict(val)) { o = jsCopy(val); } else { o = { value: val }; }
		o[keyName] = key;
		res.push(o);
	}
	return res;
}
function list2dict(arr, keyprop = 'id', uniqueKeys = true) {
	let di = {};
	for (const a of arr) {
		if (uniqueKeys) lookupSet(di, [a[keyprop]], a);
		else lookupAddToList(di, [a[keyprop]], a);
	}
	return di;
}
function find_minimum_by_function(array, func) {
	let min = func(array[0]);
	for (let i = 1; i < array.length; i++) {
		if (func(array[i]) < func(min)) min = array[i];
	}
	return min;

}
function find_minimum(array) {
	let min = array[0];
	for (let i = 1; i < array.length; i++) {
		if (array[i] < min) min = array[i];
	}
	return min;
}
function fisherYates(arr) {
	//shuffles in place! (oberste zeile weil sonst in diesem fall immer die 2 elems geswapped werden!)
	if (arr.length == 2 && coin()) { return arr; } //let temp=arr[0];arr[0]=arr[1];arr[1]=temp;return arr;} //return coin()?[arr[0],arr[1]]:[arr[1],arr[0]];
	var rnd, temp;
	let last = arr[0];
	for (var i = arr.length - 1; i; i--) {
		rnd = Math.random() * i | 0;
		temp = arr[i];
		arr[i] = arr[rnd];
		arr[rnd] = temp;
	}
	//assertion(arr.length!=2 || last == arr[arr.length-1],'fisher yates does NOT always push 0 to last place',last,arr);
	return arr;
}
function firstCond(arr, func) {
	//return first elem that fulfills condition
	if (nundef(arr)) return null;
	for (const a of arr) {
		if (func(a)) return a;

	}
	return null;
}
function firstCondDict(dict, func) {
	//return first elem that fulfills condition
	for (const k in dict) { if (func(dict[k])) return k; }
	return null;
}
function firstCondDictKey() { return firstCondDictKeys(...arguments); }
function firstCondDictKeys(dict, func) {
	//return first elem that fulfills condition
	for (const k in dict) { if (func(k)) return k; }
	return null;
}
function firstNCond(n, arr, func) {
	//return first n elements that fulfills condition
	if (nundef(arr)) return [];
	let result = [];
	let cnt = 0;
	for (const a of arr) {
		cnt += 1; if (cnt > n) break;
		if (func(a)) result.push(a);

	}
	return result;
}
function forAll(arr, func) { for (const a of arr) if (!func(a)) return false; return true; }
function get_keys(o) { return Object.keys(o); }
function get_values(o) { return Object.values(o); }
function lastCond(arr, func) {
	if (nundef(arr)) return null;
	for (let i = arr.length - 1; i >= 0; i--) { let a = arr[i]; if (func(a)) return a; }
	return null;
}
function lookup(dict, keys) {
	let d = dict;
	let ilast = keys.length - 1;
	let i = 0;
	for (const k of keys) {
		if (k === undefined) break;
		let e = d[k];
		if (e === undefined || e === null) return null; // {console.log('null',k,typeof k);return null;}
		d = d[k];
		if (i == ilast) return d;
		i += 1;
	}
	return d;
}
function lookupSet(dict, keys, val) {
	let d = dict;
	let ilast = keys.length - 1;
	let i = 0;
	//console.log('val', val);
	for (const k of keys) {
		//console.log('dict', d, 'k', k, 'i', i, 'ilast', ilast);
		if (nundef(k)) continue; //skip undef or null values
		if (d[k] === undefined) d[k] = (i == ilast ? val : {});
		if (nundef(d[k])) d[k] = (i == ilast ? val : {});
		d = d[k];
		if (i == ilast) return d;
		i += 1;
	}
	return d;
}
function lookupSetOverride(dict, keys, val) {
	let d = dict;
	let ilast = keys.length - 1;
	let i = 0;
	for (const k of keys) {

		//console.log(k,d)
		if (i == ilast) {
			if (nundef(k)) {
				//letzter key den ich eigentlich setzen will ist undef!
				//alert('lookupAddToList: last key indefined!' + keys.join(' '));
				return null;
			} else {
				d[k] = val;
			}
			return d[k];
		}

		if (nundef(k)) continue; //skip undef or null values

		if (nundef(d[k])) d[k] = {};

		d = d[k];
		i += 1;
	}
	return d;
}
function lookupAddToList(dict, keys, val) {
	//usage: lookupAddToList({a:{b:[2]}}, [a,b], 3) => {a:{b:[2,3]}}
	//usage: lookupAddToList({a:{b:[2]}}, [a,c], 3) => {a:{b:[2],c:[3]}}
	//usage: lookupAddToList({a:[0, [2], {b:[]}]}, [a,1], 3) => { a:[ 0, [2,3], {b:[]} ] }
	let d = dict;
	//console.log(dict)
	let ilast = keys.length - 1;
	let i = 0;
	for (const k of keys) {

		if (i == ilast) {
			if (nundef(k)) {
				//letzter key den ich eigentlich setzen will ist undef!
				console.assert(false, 'lookupAddToList: last key indefined!' + keys.join(' '));
				return null;
			} else if (isList(d[k])) {
				d[k].push(val);
			} else {
				d[k] = [val];
			}
			return d[k];
		}

		if (nundef(k)) continue; //skip undef or null values

		// if (i ==ilast && d[k]) d[k]=val;

		if (d[k] === undefined) d[k] = {};

		d = d[k];
		i += 1;
	}
	return d;
}
function lookupAddIfToList(dict, keys, val) {
	//usage see lookupAddToList 
	//only adds it to list if not contained!
	let lst = lookup(dict, keys);
	if (isList(lst) && lst.includes(val)) return;
	lookupAddToList(dict, keys, val);
}
function removeInPlace(arr, el) {
	//ACHTUNG!!!! geht nur wenn array elements unique sind! removes FIRST OCCURRENCE of el in arr!!!!!!!!!!!!!	
	arrRemovip(arr, el);
}
function sameList(l1, l2) {
	// compares 2 lists of strings if have same strings in it
	if (l1.length != l2.length) return false;
	for (const s of l1) {
		if (!l2.includes(s)) return false;
	}
	return true;
}
function shuffle(arr) { if (isEmpty(arr)) return []; else return fisherYates(arr); }
function shuffle_children(d) {
	let arr = Array.from(d.children);
	// arr.map(x => x.remove()); //not needed
	shuffle(arr);
	for (const ch of arr) { mAppend(d, ch); }
}
function shuffleChildren(dParent) { shuffle_children(dParent); }
function sortBy(arr, key) { arr.sort((a, b) => (a[key] < b[key] ? -1 : 1)); return arr; }
function sortByDescending(arr, key) { arr.sort((a, b) => (a[key] > b[key] ? -1 : 1)); return arr; }
function sortByFunc(arr, func) { arr.sort((a, b) => (func(a) < func(b) ? -1 : 1)); return arr; }
function sortByFuncDescending(arr, func) { arr.sort((a, b) => (func(a) > func(b) ? -1 : 1)); return arr; }
function sortNumbers(ilist) { ilist.sort(function (a, b) { return a - b }); return ilist; }
function stripToKeys(o, di) {
	//return new object with only the keys in keys list
	let res = {};
	for (const k in o) {
		if (isdef(di[k])) res[k] = o[k];
	}
	return res;
}
//#endregion

//#region color
function alphaToHex(zero1) {
	zero1 = Math.round(zero1 * 100) / 100;
	var alpha = Math.round(zero1 * 255);
	var hex = (alpha + 0x10000)
		.toString(16)
		.slice(-2)
		.toUpperCase();
	var perc = Math.round(zero1 * 100);
	//console.log('alpha from', zero1, 'to', hex);
	return hex;
}
function colorDark(c, zero1 = -.5, log = true) {
	if (nundef(c)) c = rColor();
	return pSBC(zero1, c, undefined, !log);
}
function colorFrom(cAny, a, allowHsl = false) {
	//returns a standard color (rgb or hex format, unless allowHsl==true it could return hsl format)
	//creates ColorDi if needed
	if (isString(cAny)) {
		if (cAny[0] == '#') {
			if (a == undefined) return cAny;
			cAny = cAny.substring(0, 7);
			return cAny + (a == 1 ? '' : alphaToHex(a));
		} else if (isdef(ColorDi) && lookup(ColorDi, [cAny])) {
			let c = ColorDi[cAny].c;
			if (a == undefined) return c;
			c = c.substring(0, 7);
			return c + (a == 1 ? '' : alphaToHex(a));
		} else if (startsWith(cAny, 'rand')) {
			let spec = capitalize(cAny.substring(4));
			if (isdef(window['color' + spec])) {
				//console.log('found function!', 'color' + spec);
				c = window['color' + spec]();
			} else c = rColor();
			//console.log('==>(hex) color is', c);
			if (a == undefined) return c;
			return c + (a == 1 ? '' : alphaToHex(a));
		} else if (startsWith(cAny, 'linear')) {
			return cAny;
		} else if (cAny[0] == 'r' && cAny[1] == 'g') {
			if (a == undefined) return cAny;
			//this is rbg or rgba string
			if (cAny[3] == 'a') {
				//rgba string!
				//console.log('its an rgba string!!!!!');
				if (a < 1) {
					return stringBeforeLast(cAny, ',') + ',' + a + ')';
				} else {
					let parts = cAny.split(',');
					let r = firstNumber(parts[0]);
					return 'rgb(' + r + ',' + parts[1] + ',' + parts[2] + ')';
				}
			} else {
				// simple rgb string
				if (a < 1) {
					//console.log(cAny.length)
					return 'rgba' + cAny.substring(3, cAny.length - 1) + ',' + a + ')';
				} else {
					return cAny;
				}
			}
		} else if (cAny[0] == 'h' && cAny[1] == 's') {
			//hsl or hsla string
			//if hsla and hsla allowed do same as for rgba
			if (allowHsl) {
				if (a == undefined) return cAny;
				if (cAny[3] == 'a') {
					if (a < 1) {
						return stringBeforeLast(cAny, ',') + ',' + a + ')';
					} else {
						let parts = cAny.split(',');
						let r = firstNumber(parts[0]);
						return 'hsl(' + r + ',' + parts[1] + ',' + parts[2] + ')';
					}
				} else {
					//simple hsl string
					return a == 1 ? cAny : 'hsla' + cAny.substring(3, cAny.length - 1) + ',' + a + ')'; //cAny.substring(0,cAny.length-1) + ',' + a + ')';
				}
			} else {
				//convert hsl(a) into rgb(a)
				if (cAny[3] == 'a') {
					cAny = HSLAToRGBA(cAny);
				} else {
					cAny = HSLToRGB(cAny);
				}
				return colorFrom(cAny, a, false);
			}
		} else { //will get here only once!!!
			ensureColorDict();
			let c = ColorDi[cAny];
			//console.log('nach ensure',getFunctionsNameThatCalledThisFunction(), ColorDi, 'looking for', cAny, c)
			if (nundef(c)) {
				if (startsWith(cAny, 'rand')) {
					let spec = cAny.substring(4);
					if (isdef(window['color' + spec])) {
						c = window['color' + spec](res);
					} else c = rColor();
				} else {
					console.log('color not available:', cAny);
					throw new Error('color not found: ' + cAny)
					return '#00000000'; //transparent!
				}
			} else c = c.c;
			if (a == undefined) return c;
			c = c.substring(0, 7);
			return c + (a == 1 ? '' : alphaToHex(a));
		}
	} else if (Array.isArray(cAny)) {
		// cAny is rgb array or a list of colors to choose from!!!!
		if (cAny.length == 3 && isNumber(cAny[0])) { //assume this is a rgb
			let r = cAny[0];
			let g = cAny[1];
			let b = cAny[2];
			return a == undefined || a == 1 ? `rgb(${r},${g},${b})` : `rgba(${r},${g},${b},${a})`;
		} else { // interpret as list of colors to choose from!
			return rChoose(cAny);
		}
	} else if (typeof cAny == 'object') {
		//console.log('anyColorToStandardString: cAny is object!!!', cAny);
		//koennte {h: ,s: , l:} oder {r: ,g: ,b:} sein
		if ('h' in cAny) {
			//hsl object
			let hslString = '';
			if (a == undefined || a == 1) {
				hslString = `hsl(${cAny.h},${Math.round(cAny.s <= 1.0 ? cAny.s * 100 : cAny.s)}%,${Math.round(cAny.l <= 1.0 ? cAny.l * 100 : cAny.l)}%)`;
			} else {
				hslString = `hsla(${cAny.h},${Math.round(cAny.s <= 1.0 ? cAny.s * 100 : cAny.s)}%,${Math.round(cAny.l <= 1.0 ? cAny.l * 100 : cAny.l)}%,${a})`;
			}
			if (allowHsl) {
				return hslString;
			} else {
				return colorFrom(hslString, a, allowHsl);
			}
		} else if ('r' in cAny) {
			//rgb object
			if (a !== undefined && a < 1) {
				return `rgba(${cAny.r},${cAny.g},${cAny.b},${a})`;
			} else {
				return `rgb(${cAny.r},${cAny.g},${cAny.b})`;
			}
		}
	}
}
function colorsFromBFA(bg, fg, alpha) {
	//handles fg,bg 'inherit', 'contrast', 'rand___' ,or any color
	//console.log('colorsFromBFA', bg,fg,alpha)
	if (fg == 'contrast') {
		if (bg != 'inherit') bg = colorFrom(bg, alpha);
		fg = colorIdealText(bg);
		//console.log('h11111111111111111')
	} else if (bg == 'contrast') {
		fg = colorFrom(fg);
		bg = colorIdealText(fg);
		//console.log('h11111111111111111222222')
	} else {
		if (isdef(bg) && bg != 'inherit') bg = colorFrom(bg, alpha);
		if (isdef(fg) && fg != 'inherit') fg = colorFrom(fg);
		//console.log('h111111111111111114444444444',bg,fg)
	}
	return [bg, fg];
}
function colorFromHSL(hue, sat = 100, lum = 50) {
	return hslToHex(valf(hue, rHue()), sat, lum);
	//return colorFrom(colorHSLBuild(valf(hue,rHue()), sat, lum)); 
}
function colorHex(cAny) {
	//returns hex string w/ alpha channel or without
	let c = colorFrom(cAny);
	if (c[0] == '#') {
		return c;
	} else {
		//it is now an rgba string and has alpha
		let res = pSBC(0, c, 'c');
		//console.log('in colorHex!!!!', c, res);
		return res;
	}
}
function colorHSLBuild(hue, sat = 100, lum = 50) { let result = "hsl(" + hue + ',' + sat + '%,' + lum + '%)'; return result; }
function colorHSL(cAny, asObject = false) {
	//returns { h:[0,360], s:[0,1], l:[0,1]}
	let res = colorFrom(cAny, undefined, true);
	//console.log(res)
	let shsl = res;
	if (res[0] == '#') {
		//res is a hex string
		if (res.length == 9) {
			shsl = hexAToHSLA(res);
		} else if (res.length == 7) {
			shsl = hexToHSL(res);
		}
	} else if (res[0] == 'r') {
		if (res[3] == 'a') {
			shsl = RGBAToHSLA(res);
		} else {
			shsl = RGBToHSL(res);
		}
	}
	//console.log(shsl);
	let n = allNumbers(shsl);
	//console.log(n);
	if (asObject) {
		return { h: n[0], s: n[1] / 100, l: n[2] / 100, a: n.length > 3 ? n[3] : 1 };
	} else {
		return shsl;
	}
} //ok
function colorHue(cAny) { let hsl = colorHSL(cAny, true); return hsl.h; }

function colorIdealText(bg, grayPreferred = false) {
	let rgb = colorRGB(bg, true);
	//jetzt ist bg rgb object
	const nThreshold = 105; //40; //105;
	let r = rgb.r;
	let g = rgb.g;
	let b = rgb.b;
	var bgDelta = r * 0.299 + g * 0.587 + b * 0.114;
	var foreColor = 255 - bgDelta < nThreshold ? 'black' : 'white';
	if (grayPreferred) foreColor = 255 - bgDelta < nThreshold ? 'dimgray' : 'snow';
	return foreColor;
	// return 'white';
}
function colorLight(c, zero1 = .3, log = true) {
	//zero1 = 0 ... 1 (1 being brightest!)
	if (nundef(c)) {
		//console.log('HAAAAAAAAAAAAAAAAAAAAAALLLLLLLLLLLLOOOOOOO')
		let hue = rHue();

		return colorFromHSL(rHue(), 100, 85);
	} else c = colorFrom(c);
	// if (nundef(c)) c = colorFrom(rChoose(['yellow', 'skyblue', 'orange', 'violet', 'pink', 'GREEN', 'lime']));//rPrimaryColor();
	return pSBC(zero1, c, undefined, !log);
}
function colorRGB(cAny, asObject = false) {
	//returns { r:[0,255], g:[0,255], b:[0,255]}
	let res = colorFrom(cAny);
	let srgb = res;
	if (res[0] == '#') {
		srgb = pSBC(0, res, 'c');
	}
	//console.log(shsl);
	let n = allNumbers(srgb);
	//console.log(n);
	if (asObject) {
		return { r: n[0], g: n[1], b: n[2], a: n.length > 3 ? n[3] : 1 };
	} else {
		return srgb;
	}
}
function colorTrans(cAny, alpha = 0.5) {
	return colorFrom(cAny, alpha);
}
function colorPalette(color, type = 'shade') {
	color = colorFrom(color);
	return colorShades(color);
}
function colorPaletteFromImage(img) {
	if (nundef(ColorThiefObject)) ColorThiefObject = new ColorThief();

	let palette0 = ColorThiefObject.getPalette(img);
	let palette = [];
	for (const pal of palette0) {
		let color = colorFrom(pal);
		palette.push(color);
	}
	//console.log(palette)
	//console.log('palette', palette)
	return palette;
}
function colorPaletteFromUrl(path) {
	let img = mCreateFrom(`<img src='${path}' />`);
	let pal = colorPaletteFromImage(img);
	return pal;
}
function colorShades(color) {
	//assumes pSBC compatible color format (hex,rgb strings)
	let res = [];
	for (let frac = -0.8; frac <= 0.8; frac += 0.2) {
		//darkest -0.8 -0.6 -0.4 -0.2 0=color 0.2 0.4 0.6 0.8 lightest
		let c = pSBC(frac, color, undefined, true); //colorShade(frac,color);
		res.push(c);
	}
	return res;
}
function colorTransPalette(color = '#000000') {
	let res = [];
	for (const alpha of [.0, .1, .2, .3, .4, .5, .6, .7, .8, .9, 1]) res.push(colorTrans(color, alpha));
	return res;
}
function colorWheel(contrastTo, n) {
	let hc = colorHue(contrastTo);
	let wheel = [];
	let start = hc;
	let inc = Math.round(360 / (n + 1));
	start += inc;
	for (let i = 0; i < n; i++) {
		wheel.push(start % 360);
		start += inc;
	}
	return wheel.map(x => colorHSLBuild(x));
}
function colorHueWheel(contrastTo, minDiff = 25, mod = 30, start = 0) {
	let hc = colorHue(contrastTo);
	let wheel = [];
	while (start < 360) {
		let d1 = Math.abs((start + 360) - hc);
		let d2 = Math.abs((start) - hc);
		let d3 = Math.abs((start - 360) - hc);
		let min = Math.min(d1, d2, d3);
		if (min > minDiff) wheel.push(start);
		start += mod;
	}
	return wheel;
}

function ensureColorDict() {
	if (isdef(ColorDi)) return;
	ColorDi = {};
	let names = getColorNames();
	let hexes = getColorHexes();
	for (let i = 0; i < names.length; i++) {
		ColorDi[names[i].toLowerCase()] = { c: '#' + hexes[i] };
	}

	const newcolors = {
		black: { c: '#000000', D: 'schwarz' },
		blue: { c: '#0000ff', D: 'blau' },
		BLUE: { c: '#4363d8', E: 'blue', D: 'blau' },
		BLUEGREEN: { c: '#004054', E: 'bluegreen', D: 'blaugrün' },
		BROWN: { c: '#96613d', E: 'brown', D: 'braun' },
		deepyellow: { c: '#ffed01', E: 'yellow', D: 'gelb' },
		FIREBRICK: { c: '#800000', E: 'darkred', D: 'rotbraun' },
		gold: { c: 'gold', D: 'golden' },
		green: { c: 'green', D: 'grün' },
		GREEN: { c: '#3cb44b', E: 'green', D: 'grün' },
		grey: { c: 'grey', D: 'grau' },
		lightblue: { c: 'lightblue', D: 'hellblau' }, //{ c: '#42d4f4', D: 'hellblau' },
		LIGHTBLUE: { c: '#42d4f4', E: 'lightblue', D: 'hellblau' },
		lightgreen: { c: 'lightgreen', D: 'hellgrün' },
		LIGHTGREEN: { c: '#afff45', E: 'lightgreen', D: 'hellgrün' },
		lightyellow: { c: '#fff620', E: 'lightyellow', D: 'gelb' },
		NEONORANGE: { c: '#ff6700', E: 'neonorange', D: 'neonorange' },
		NEONYELLOW: { c: '#efff04', E: 'neonyellow', D: 'neongelb' },
		olive: { c: 'olive', D: 'oliv' },
		OLIVE: { c: '#808000', E: 'olive', D: 'oliv' },
		orange: { c: 'orange', D: 'orange' },
		ORANGE: { c: '#f58231', E: 'orange', D: 'orange' },
		PINK: { c: 'deeppink', D: 'rosa' },
		pink: { c: 'pink', D: 'rosa' },
		purple: { c: 'purple', D: 'lila' },
		PURPLE: { c: '#911eb4', E: 'purple', D: 'lila' },
		red: { c: 'red', D: 'rot' },
		RED: { c: '#e6194B', E: 'red', D: 'rot' },
		skyblue: { c: 'skyblue', D: 'himmelblau' },
		SKYBLUE: { c: 'deepskyblue', D: 'himmelblau' },
		teal: { c: '#469990', D: 'blaugrün' },
		TEAL: { c: '#469990', E: 'teal', D: 'blaugrün' },
		transparent: { c: '#00000000', E: 'transparent', D: 'transparent' },
		violet: { c: 'violet', E: 'violet', D: 'violett' },
		VIOLET: { c: 'indigo', E: 'violet', D: 'violett' },
		white: { c: 'white', D: 'weiss' },
		yellow: { c: 'yellow', D: 'gelb' },
		yelloworange: { c: '#ffc300', E: 'yellow', D: 'gelb' },
		YELLOW: { c: '#ffe119', E: 'yellow', D: 'gelb' },
	};

	for (const k in newcolors) {
		let cnew = newcolors[k];
		//console.log('new color:', k, cnew)
		if (cnew.c[0] != '#' && isdef(ColorDi[cnew.c])) cnew.c = ColorDi[cnew.c].c;
		ColorDi[k] = cnew;
	}
}
function getColorNames() {
	return [
		'AliceBlue',
		'AntiqueWhite',
		'Aqua',
		'Aquamarine',
		'Azure',
		'Beige',
		'Bisque',
		'Black',
		'BlanchedAlmond',
		'Blue',
		'BlueViolet',
		'Brown',
		'BurlyWood',
		'CadetBlue',
		'Chartreuse',
		'Chocolate',
		'Coral',
		'CornflowerBlue',
		'Cornsilk',
		'Crimson',
		'Cyan',
		'DarkBlue',
		'DarkCyan',
		'DarkGoldenRod',
		'DarkGray',
		'DarkGrey',
		'DarkGreen',
		'DarkKhaki',
		'DarkMagenta',
		'DarkOliveGreen',
		'DarkOrange',
		'DarkOrchid',
		'DarkRed',
		'DarkSalmon',
		'DarkSeaGreen',
		'DarkSlateBlue',
		'DarkSlateGray',
		'DarkSlateGrey',
		'DarkTurquoise',
		'DarkViolet',
		'DeepPink',
		'DeepSkyBlue',
		'DimGray',
		'DimGrey',
		'DodgerBlue',
		'FireBrick',
		'FloralWhite',
		'ForestGreen',
		'Fuchsia',
		'Gainsboro',
		'GhostWhite',
		'Gold',
		'GoldenRod',
		'Gray',
		'Grey',
		'Green',
		'GreenYellow',
		'HoneyDew',
		'HotPink',
		'IndianRed',
		'Indigo',
		'Ivory',
		'Khaki',
		'Lavender',
		'LavenderBlush',
		'LawnGreen',
		'LemonChiffon',
		'LightBlue',
		'LightCoral',
		'LightCyan',
		'LightGoldenRodYellow',
		'LightGray',
		'LightGrey',
		'LightGreen',
		'LightPink',
		'LightSalmon',
		'LightSeaGreen',
		'LightSkyBlue',
		'LightSlateGray',
		'LightSlateGrey',
		'LightSteelBlue',
		'LightYellow',
		'Lime',
		'LimeGreen',
		'Linen',
		'Magenta',
		'Maroon',
		'MediumAquaMarine',
		'MediumBlue',
		'MediumOrchid',
		'MediumPurple',
		'MediumSeaGreen',
		'MediumSlateBlue',
		'MediumSpringGreen',
		'MediumTurquoise',
		'MediumVioletRed',
		'MidnightBlue',
		'MintCream',
		'MistyRose',
		'Moccasin',
		'NavajoWhite',
		'Navy',
		'OldLace',
		'Olive',
		'OliveDrab',
		'Orange',
		'OrangeRed',
		'Orchid',
		'PaleGoldenRod',
		'PaleGreen',
		'PaleTurquoise',
		'PaleVioletRed',
		'PapayaWhip',
		'PeachPuff',
		'Peru',
		'Pink',
		'Plum',
		'PowderBlue',
		'Purple',
		'RebeccaPurple',
		'Red',
		'RosyBrown',
		'RoyalBlue',
		'SaddleBrown',
		'Salmon',
		'SandyBrown',
		'SeaGreen',
		'SeaShell',
		'Sienna',
		'Silver',
		'SkyBlue',
		'SlateBlue',
		'SlateGray',
		'SlateGrey',
		'Snow',
		'SpringGreen',
		'SteelBlue',
		'Tan',
		'Teal',
		'Thistle',
		'Tomato',
		'Turquoise',
		'Violet',
		'Wheat',
		'White',
		'WhiteSmoke',
		'Yellow',
		'YellowGreen'
	];
}
function getColorHexes(x) {
	return [
		'f0f8ff',
		'faebd7',
		'00ffff',
		'7fffd4',
		'f0ffff',
		'f5f5dc',
		'ffe4c4',
		'000000',
		'ffebcd',
		'0000ff',
		'8a2be2',
		'a52a2a',
		'deb887',
		'5f9ea0',
		'7fff00',
		'd2691e',
		'ff7f50',
		'6495ed',
		'fff8dc',
		'dc143c',
		'00ffff',
		'00008b',
		'008b8b',
		'b8860b',
		'a9a9a9',
		'a9a9a9',
		'006400',
		'bdb76b',
		'8b008b',
		'556b2f',
		'ff8c00',
		'9932cc',
		'8b0000',
		'e9967a',
		'8fbc8f',
		'483d8b',
		'2f4f4f',
		'2f4f4f',
		'00ced1',
		'9400d3',
		'ff1493',
		'00bfff',
		'696969',
		'696969',
		'1e90ff',
		'b22222',
		'fffaf0',
		'228b22',
		'ff00ff',
		'dcdcdc',
		'f8f8ff',
		'ffd700',
		'daa520',
		'808080',
		'808080',
		'008000',
		'adff2f',
		'f0fff0',
		'ff69b4',
		'cd5c5c',
		'4b0082',
		'fffff0',
		'f0e68c',
		'e6e6fa',
		'fff0f5',
		'7cfc00',
		'fffacd',
		'add8e6',
		'f08080',
		'e0ffff',
		'fafad2',
		'd3d3d3',
		'd3d3d3',
		'90ee90',
		'ffb6c1',
		'ffa07a',
		'20b2aa',
		'87cefa',
		'778899',
		'778899',
		'b0c4de',
		'ffffe0',
		'00ff00',
		'32cd32',
		'faf0e6',
		'ff00ff',
		'800000',
		'66cdaa',
		'0000cd',
		'ba55d3',
		'9370db',
		'3cb371',
		'7b68ee',
		'00fa9a',
		'48d1cc',
		'c71585',
		'191970',
		'f5fffa',
		'ffe4e1',
		'ffe4b5',
		'ffdead',
		'000080',
		'fdf5e6',
		'808000',
		'6b8e23',
		'ffa500',
		'ff4500',
		'da70d6',
		'eee8aa',
		'98fb98',
		'afeeee',
		'db7093',
		'ffefd5',
		'ffdab9',
		'cd853f',
		'ffc0cb',
		'dda0dd',
		'b0e0e6',
		'800080',
		'663399',
		'ff0000',
		'bc8f8f',
		'4169e1',
		'8b4513',
		'fa8072',
		'f4a460',
		'2e8b57',
		'fff5ee',
		'a0522d',
		'c0c0c0',
		'87ceeb',
		'6a5acd',
		'708090',
		'708090',
		'fffafa',
		'00ff7f',
		'4682b4',
		'd2b48c',
		'008080',
		'd8bfd8',
		'ff6347',
		'40e0d0',
		'ee82ee',
		'f5deb3',
		'ffffff',
		'f5f5f5',
		'ffff00',
		'9acd32'
	];
}
function hexToHSL(H) {
	let ex = /^#([\da-f]{3}){1,2}$/i;
	if (ex.test(H)) {
		// convert hex to RGB first
		let r = 0,
			g = 0,
			b = 0;
		if (H.length == 4) {
			r = '0x' + H[1] + H[1];
			g = '0x' + H[2] + H[2];
			b = '0x' + H[3] + H[3];
		} else if (H.length == 7) {
			r = '0x' + H[1] + H[2];
			g = '0x' + H[3] + H[4];
			b = '0x' + H[5] + H[6];
		}
		// then to HSL
		r /= 255;
		g /= 255;
		b /= 255;
		let cmin = Math.min(r, g, b),
			cmax = Math.max(r, g, b),
			delta = cmax - cmin,
			h = 0,
			s = 0,
			l = 0;

		if (delta == 0) h = 0;
		else if (cmax == r) h = ((g - b) / delta) % 6;
		else if (cmax == g) h = (b - r) / delta + 2;
		else h = (r - g) / delta + 4;

		h = Math.round(h * 60);

		if (h < 0) h += 360;

		l = (cmax + cmin) / 2;
		s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
		s = +(s * 100).toFixed(1);
		l = +(l * 100).toFixed(1);

		return 'hsl(' + h + ',' + s + '%,' + l + '%)';
	} else {
		return 'Invalid input color';
	}
} //ok
function hslToHex(h, s, l) {
	l /= 100;
	const a = s * Math.min(l, 1 - l) / 100;
	const f = n => {
		const k = (n + h / 30) % 12;
		const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
		return Math.round(255 * color).toString(16).padStart(2, '0');   // convert to Hex and prefix "0" if needed
	};
	return `#${f(0)}${f(8)}${f(4)}`;
}
function hexAToHSLA(H) {
	let ex = /^#([\da-f]{4}){1,2}$/i;
	if (ex.test(H)) {
		let r = 0,
			g = 0,
			b = 0,
			a = 1;
		// 4 digits
		if (H.length == 5) {
			r = '0x' + H[1] + H[1];
			g = '0x' + H[2] + H[2];
			b = '0x' + H[3] + H[3];
			a = '0x' + H[4] + H[4];
			// 8 digits
		} else if (H.length == 9) {
			r = '0x' + H[1] + H[2];
			g = '0x' + H[3] + H[4];
			b = '0x' + H[5] + H[6];
			a = '0x' + H[7] + H[8];
		}

		// normal conversion to HSLA
		r /= 255;
		g /= 255;
		b /= 255;
		let cmin = Math.min(r, g, b),
			cmax = Math.max(r, g, b),
			delta = cmax - cmin,
			h = 0,
			s = 0,
			l = 0;

		if (delta == 0) h = 0;
		else if (cmax == r) h = ((g - b) / delta) % 6;
		else if (cmax == g) h = (b - r) / delta + 2;
		else h = (r - g) / delta + 4;

		h = Math.round(h * 60);

		if (h < 0) h += 360;

		l = (cmax + cmin) / 2;
		s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
		s = +(s * 100).toFixed(1);
		l = +(l * 100).toFixed(1);

		a = (a / 255).toFixed(3);

		return 'hsla(' + h + ',' + s + '%,' + l + '%,' + a + ')';
	} else {
		return 'Invalid input color';
	}
} //ok
function HSLToRGB(hsl, isPct) {
	//if isPct == true, will output 'rgb(xx%,xx%,xx%)' umgerechnet in % von 255
	let ex = /^hsl\(((((([12]?[1-9]?\d)|[12]0\d|(3[0-5]\d))(\.\d+)?)|(\.\d+))(deg)?|(0|0?\.\d+)turn|(([0-6](\.\d+)?)|(\.\d+))rad)((,\s?(([1-9]?\d(\.\d+)?)|100|(\.\d+))%){2}|(\s(([1-9]?\d(\.\d+)?)|100|(\.\d+))%){2})\)$/i;
	if (ex.test(hsl)) {
		let sep = hsl.indexOf(',') > -1 ? ',' : ' ';
		hsl = hsl
			.substr(4)
			.split(')')[0]
			.split(sep);
		isPct = isPct === true;

		let h = hsl[0],
			s = hsl[1].substr(0, hsl[1].length - 1) / 100,
			l = hsl[2].substr(0, hsl[2].length - 1) / 100;

		// strip label and convert to degrees (if necessary)
		if (h.indexOf('deg') > -1) h = h.substr(0, h.length - 3);
		else if (h.indexOf('rad') > -1) h = Math.round((h.substr(0, h.length - 3) / (2 * Math.PI)) * 360);
		else if (h.indexOf('turn') > -1) h = Math.round(h.substr(0, h.length - 4) * 360);
		// keep hue fraction of 360 if ending up over
		if (h >= 360) h %= 360;

		let c = (1 - Math.abs(2 * l - 1)) * s,
			x = c * (1 - Math.abs(((h / 60) % 2) - 1)),
			m = l - c / 2,
			r = 0,
			g = 0,
			b = 0;

		if (0 <= h && h < 60) {
			r = c;
			g = x;
			b = 0;
		} else if (60 <= h && h < 120) {
			r = x;
			g = c;
			b = 0;
		} else if (120 <= h && h < 180) {
			r = 0;
			g = c;
			b = x;
		} else if (180 <= h && h < 240) {
			r = 0;
			g = x;
			b = c;
		} else if (240 <= h && h < 300) {
			r = x;
			g = 0;
			b = c;
		} else if (300 <= h && h < 360) {
			r = c;
			g = 0;
			b = x;
		}

		r = Math.round((r + m) * 255);
		g = Math.round((g + m) * 255);
		b = Math.round((b + m) * 255);

		if (isPct) {
			r = +((r / 255) * 100).toFixed(1);
			g = +((g / 255) * 100).toFixed(1);
			b = +((b / 255) * 100).toFixed(1);
		}

		return 'rgb(' + (isPct ? r + '%,' + g + '%,' + b + '%' : +r + ',' + +g + ',' + +b) + ')';
	} else {
		return 'Invalid input color';
	}
} //ok
function HSLAToRGBA(hsla, isPct) {
	//if isPct == true, will output 'rgb(xx%,xx%,xx%)' umgerechnet in % von 255
	let ex = /^hsla\(((((([12]?[1-9]?\d)|[12]0\d|(3[0-5]\d))(\.\d+)?)|(\.\d+))(deg)?|(0|0?\.\d+)turn|(([0-6](\.\d+)?)|(\.\d+))rad)(((,\s?(([1-9]?\d(\.\d+)?)|100|(\.\d+))%){2},\s?)|((\s(([1-9]?\d(\.\d+)?)|100|(\.\d+))%){2}\s\/\s))((0?\.\d+)|[01]|(([1-9]?\d(\.\d+)?)|100|(\.\d+))%)\)$/i;
	if (ex.test(hsla)) {
		let sep = hsla.indexOf(',') > -1 ? ',' : ' ';
		hsla = hsla
			.substr(5)
			.split(')')[0]
			.split(sep);

		// strip the slash if using space-separated syntax
		if (hsla.indexOf('/') > -1) hsla.splice(3, 1);

		isPct = isPct === true;

		// must be fractions of 1
		let h = hsla[0],
			s = hsla[1].substr(0, hsla[1].length - 1) / 100,
			l = hsla[2].substr(0, hsla[2].length - 1) / 100,
			a = hsla[3];

		// strip label and convert to degrees (if necessary)
		if (h.indexOf('deg') > -1) h = h.substr(0, h.length - 3);
		else if (h.indexOf('rad') > -1) h = Math.round((h.substr(0, h.length - 3) / (2 * Math.PI)) * 360);
		else if (h.indexOf('turn') > -1) h = Math.round(h.substr(0, h.length - 4) * 360);
		if (h >= 360) h %= 360;

		let c = (1 - Math.abs(2 * l - 1)) * s,
			x = c * (1 - Math.abs(((h / 60) % 2) - 1)),
			m = l - c / 2,
			r = 0,
			g = 0,
			b = 0;

		if (0 <= h && h < 60) {
			r = c;
			g = x;
			b = 0;
		} else if (60 <= h && h < 120) {
			r = x;
			g = c;
			b = 0;
		} else if (120 <= h && h < 180) {
			r = 0;
			g = c;
			b = x;
		} else if (180 <= h && h < 240) {
			r = 0;
			g = x;
			b = c;
		} else if (240 <= h && h < 300) {
			r = x;
			g = 0;
			b = c;
		} else if (300 <= h && h < 360) {
			r = c;
			g = 0;
			b = x;
		}

		r = Math.round((r + m) * 255);
		g = Math.round((g + m) * 255);
		b = Math.round((b + m) * 255);

		let pctFound = a.indexOf('%') > -1;

		if (isPct) {
			r = +((r / 255) * 100).toFixed(1);
			g = +((g / 255) * 100).toFixed(1);
			b = +((b / 255) * 100).toFixed(1);
			if (!pctFound) {
				a *= 100;
			} else {
				a = a.substr(0, a.length - 1);
			}
		} else if (pctFound) {
			a = a.substr(0, a.length - 1) / 100;
		}

		return 'rgba(' + (isPct ? r + '%,' + g + '%,' + b + '%,' + a + '%' : +r + ',' + +g + ',' + +b + ',' + +a) + ')';
	} else {
		return 'Invalid input color';
	}
} //ok
function RGBToHex7(c) {
	let n = allNumbers(c);
	if (c.includes('%')) {
		n[0] = Math.round((n[0] * 255) / 100);
		n[1] = Math.round((n[1] * 255) / 100);
		n[2] = Math.round((n[2] * 255) / 100);
	}
	return '#' + ((1 << 24) + (n[0] << 16) + (n[1] << 8) + n[2]).toString(16).slice(1);
} //ok
function rgbToHex(rgbStr) { return rgbStr && '#' + rgbStr.slice(4, -1).split(',').map(x => (+x).toString(16).padStart(2, '0')).join(''); }
function RGBAToHex9(rgba) {
	let n = allNumbers(rgba); //allNumbers does not catch .5 as float!
	//console.log('all numbers:', n);
	if (n.length < 3) {
		//console.log('RGBAToHex ERROR!', rgba);
		return randomHexColor();
	}
	let a = n.length > 3 ? n[3] : 1;
	let sa = alphaToHex(a);
	//console.log('sa:', sa);
	if (rgba.includes('%')) {
		n[0] = Math.round((n[0] * 255) / 100);
		n[1] = Math.round((n[1] * 255) / 100);
		n[2] = Math.round((n[2] * 255) / 100);
	}
	return '#' + ((1 << 24) + (n[0] << 16) + (n[1] << 8) + n[2]).toString(16).slice(1) + sa;
} //ok
function RGBToHSL(rgb) {
	let ex = /^rgb\((((((((1?[1-9]?\d)|10\d|(2[0-4]\d)|25[0-5]),\s?)){2}|((((1?[1-9]?\d)|10\d|(2[0-4]\d)|25[0-5])\s)){2})((1?[1-9]?\d)|10\d|(2[0-4]\d)|25[0-5]))|((((([1-9]?\d(\.\d+)?)|100|(\.\d+))%,\s?){2}|((([1-9]?\d(\.\d+)?)|100|(\.\d+))%\s){2})(([1-9]?\d(\.\d+)?)|100|(\.\d+))%))\)$/i;
	if (ex.test(rgb)) {
		let sep = rgb.indexOf(',') > -1 ? ',' : ' ';
		rgb = rgb
			.substr(4)
			.split(')')[0]
			.split(sep);

		// convert %s to 0–255
		for (let R in rgb) {
			let r = rgb[R];
			if (r.indexOf('%') > -1) rgb[R] = Math.round((r.substr(0, r.length - 1) / 100) * 255);
		}

		// make r, g, and b fractions of 1
		let r = rgb[0] / 255,
			g = rgb[1] / 255,
			b = rgb[2] / 255,
			// find greatest and smallest channel values
			cmin = Math.min(r, g, b),
			cmax = Math.max(r, g, b),
			delta = cmax - cmin,
			h = 0,
			s = 0,
			l = 0;

		// calculate hue
		// no difference
		if (delta == 0) h = 0;
		// red is max
		else if (cmax == r) h = ((g - b) / delta) % 6;
		// green is max
		else if (cmax == g) h = (b - r) / delta + 2;
		// blue is max
		else h = (r - g) / delta + 4;

		h = Math.round(h * 60);

		// make negative hues positive behind 360°
		if (h < 0) h += 360;

		// calculate lightness
		l = (cmax + cmin) / 2;

		// calculate saturation
		s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));

		// multiply l and s by 100
		s = +(s * 100).toFixed(1);
		l = +(l * 100).toFixed(1);

		return 'hsl(' + h + ',' + s + '%,' + l + '%)';
	} else {
		return 'Invalid input color';
	}
} //ok
function RGBAToHSLA(rgba) {
	let ex = /^rgba\((((((((1?[1-9]?\d)|10\d|(2[0-4]\d)|25[0-5]),\s?)){3})|(((([1-9]?\d(\.\d+)?)|100|(\.\d+))%,\s?){3}))|(((((1?[1-9]?\d)|10\d|(2[0-4]\d)|25[0-5])\s){3})|(((([1-9]?\d(\.\d+)?)|100|(\.\d+))%\s){3}))\/\s)((0?\.\d+)|[01]|(([1-9]?\d(\.\d+)?)|100|(\.\d+))%)\)$/i;
	if (ex.test(rgba)) {
		let sep = rgba.indexOf(',') > -1 ? ',' : ' ';
		rgba = rgba
			.substr(5)
			.split(')')[0]
			.split(sep);

		// strip the slash if using space-separated syntax
		if (rgba.indexOf('/') > -1) rgba.splice(3, 1);

		for (let R in rgba) {
			let r = rgba[R];
			if (r.indexOf('%') > -1) {
				let p = r.substr(0, r.length - 1) / 100;

				if (R < 3) {
					rgba[R] = Math.round(p * 255);
				}
			}
		}

		// make r, g, and b fractions of 1
		let r = rgba[0] / 255,
			g = rgba[1] / 255,
			b = rgba[2] / 255,
			a = rgba[3],
			// find greatest and smallest channel values
			cmin = Math.min(r, g, b),
			cmax = Math.max(r, g, b),
			delta = cmax - cmin,
			h = 0,
			s = 0,
			l = 0;

		// calculate hue
		// no difference
		if (delta == 0) h = 0;
		// red is max
		else if (cmax == r) h = ((g - b) / delta) % 6;
		// green is max
		else if (cmax == g) h = (b - r) / delta + 2;
		// blue is max
		else h = (r - g) / delta + 4;

		h = Math.round(h * 60);

		// make negative hues positive behind 360°
		if (h < 0) h += 360;

		// calculate lightness
		l = (cmax + cmin) / 2;

		// calculate saturation
		s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));

		// multiply l and s by 100
		s = +(s * 100).toFixed(1);
		l = +(l * 100).toFixed(1);

		return 'hsla(' + h + ',' + s + '%,' + l + '%,' + a + ')';
	} else {
		return 'Invalid input color';
	}
} //ok

function pSBC(p, c0, c1, l) {
	//usage:
	// (blacken) -1.0 <= p <= 1.0 (whiten), or (c0) 0 <= p <= 1.0 (c1) when blending (ie., c1 given)
	// c0: #F3D or #F3DC or #FF33DD or #FF33DDCC or rgb(23,4,55) or rgba(23,4,55,0.52) ... from color
	// c1: #F3D or #F3DC or #FF33DD or #FF33DDCC or rgb(23,4,55) or rgba(23,4,55,0.52) ... to color (blending)
	// 		or 'c' for conversion between hex string and rgb string
	// l true:log blending, [false:linear blending]=default!
	let r,
		g,
		b,
		P,
		f,
		t,
		h,
		i = parseInt,
		m = Math.round,
		a = typeof c1 == 'string';
	if (typeof p != 'number' || p < -1 || p > 1 || typeof c0 != 'string' || (c0[0] != 'r' && c0[0] != '#') || (c1 && !a)) return null;
	if (!this.pSBCr)
		this.pSBCr = d => {
			let n = d.length,
				x = {};
			if (n > 9) {
				([r, g, b, a] = d = d.split(',')), (n = d.length);
				if (n < 3 || n > 4) return null;
				(x.r = i(r[3] == 'a' ? r.slice(5) : r.slice(4))), (x.g = i(g)), (x.b = i(b)), (x.a = a ? parseFloat(a) : -1);
			} else {
				if (n == 8 || n == 6 || n < 4) return null;
				if (n < 6) d = '#' + d[1] + d[1] + d[2] + d[2] + d[3] + d[3] + (n > 4 ? d[4] + d[4] : '');
				d = i(d.slice(1), 16);
				if (n == 9 || n == 5) (x.r = (d >> 24) & 255), (x.g = (d >> 16) & 255), (x.b = (d >> 8) & 255), (x.a = m((d & 255) / 0.255) / 1000);
				else (x.r = d >> 16), (x.g = (d >> 8) & 255), (x.b = d & 255), (x.a = -1);
			}
			return x;
		};
	(h = c0.length > 9),
		(h = a ? (c1.length > 9 ? true : c1 == 'c' ? !h : false) : h),
		(f = pSBCr(c0)),
		(P = p < 0),
		(t = c1 && c1 != 'c' ? pSBCr(c1) : P ? { r: 0, g: 0, b: 0, a: -1 } : { r: 255, g: 255, b: 255, a: -1 }),
		(p = P ? p * -1 : p),
		(P = 1 - p);
	if (!f || !t) return null;
	if (l) (r = m(P * f.r + p * t.r)), (g = m(P * f.g + p * t.g)), (b = m(P * f.b + p * t.b));
	else (r = m((P * f.r ** 2 + p * t.r ** 2) ** 0.5)), (g = m((P * f.g ** 2 + p * t.g ** 2) ** 0.5)), (b = m((P * f.b ** 2 + p * t.b ** 2) ** 0.5));
	(a = f.a), (t = t.a), (f = a >= 0 || t >= 0), (a = f ? (a < 0 ? t : t < 0 ? a : a * P + t * p) : 0);
	if (h) return 'rgb' + (f ? 'a(' : '(') + r + ',' + g + ',' + b + (f ? ',' + m(a * 1000) / 1000 : '') + ')';
	else return '#' + (4294967296 + r * 16777216 + g * 65536 + b * 256 + (f ? m(a * 255) : 0)).toString(16).slice(1, f ? undefined : -2);
}

//#endregion

//#region date
function addMonthToDate(date, months) {
	let d = new Date(date);
	d.setMonth(d.getMonth() + months);
	return d;
}
function addWeekToDate(date, weeks) {
	let d = new Date(date);
	d.setDate(d.getDate() + (weeks * 7));
	return d;
}
function calculateDaysBetweenDates(begin, end) {
	var oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
	var firstDate = new Date(begin);
	var secondDate = new Date(end);
	var diffDays = Math.round(Math.abs((firstDate.getTime() - secondDate.getTime()) / (oneDay)));
	return diffDays;
}
function date2locale(date) { return date.toLocaleDateString(); }
function format_date(date) {
	let d = new Date(date);
	let month = '' + (d.getMonth() + 1);
	let day = '' + d.getDate();
	let year = d.getFullYear();
	if (month.length < 2) month = '0' + month;
	if (day.length < 2) day = '0' + day;
	return [month, day, year].join('/');
}
function get_weekday(date) {
	let d = new Date(date);
	return d.getDay();
}
//#endregion

//#region fleetingMessage
var TOFleetingMessage, dFleetingMessage, Animation1;
function clearFleetingMessage() {
	//console.log('dfl',dFleetingMessage)
	if (isdef(dFleetingMessage)) {
		dFleetingMessage.remove();
		dFleetingMessage = null;
		//clearTimeout(TOFleetingMessage); if (isdef(Animation1)) Animation1.cancel(); clearElement(dFleetingMessage); dFleetingMessage = null;
	}
}
function showFleetingMessage(msg, dParent, styles = {}, ms = 3000, msDelay = 0, fade = true) {
	//console.log('new fleeting message', msg)
	clearFleetingMessage();
	dFleetingMessage = mDiv(dParent);
	if (msDelay) {
		TOFleetingMessage = setTimeout(() => fleetingMessage(msg, dFleetingMessage, styles, ms, fade), msDelay);
	} else {
		TOFleetingMessage = setTimeout(() => fleetingMessage(msg, dFleetingMessage, styles, ms, fade), 10);
		//fleetingMessage(msg, dParent, styles, ms, fade);
	}
}
function fleetingMessage(msg, d, styles, ms, fade) {
	//console.log('fade', fade);
	if (isString(msg)) {
		dFleetingMessage.innerHTML = msg;
		mStyle(dFleetingMessage, styles);
	} else {
		mAppend(dFleetingMessage, msg);
	}
	if (fade) Animation1 = mAnimate(dFleetingMessage, 'opacity', [1, .4, 0], null, ms, 'ease-in', 0, 'both');
	//else mStyle(dFleetingMessage, { opacity: 1, fz: 30, fg: 'lime', animation: 'none' });
	return dFleetingMessage;
}
//#endregion fleetingMessage

//#region functions
function getFunctionCallerName() {
	// gets the text between whitespace for second part of stacktrace
	return new Error().stack.match(/at (\S+)/g)[1].slice(3);
}
function getFunctionsNameThatCalledThisFunction() {
	let c1 = getFunctionsNameThatCalledThisFunction.caller;
	if (nundef(c1)) return 'no caller!';
	let c2 = c1.caller;
	if (nundef(c2)) return 'no caller!';
	return c2.name;
}
//#endregion

//#region keys.js
//prep key sets at start of prog
function getKeySets() {
	makeCategories();	//console.log('Categories',Categories)

	//console.log('hallo'); return [];
	let res = {};
	for (const k in Syms) {
		let info = Syms[k];
		if (nundef(info.cats)) continue;
		for (const ksk of info.cats) {
			//console.log('ksk',ksk,'k',k);
			lookupAddIfToList(res, [ksk], k);
		}
	}
	res.animals = getAnimals();
	res.nature = getNature();
	localStorage.setItem('KeySets', JSON.stringify(res));
	return res;

}
function getAnimals() {
	let gr = 'Animals & Nature';
	let result = [];
	for (const sg in ByGroupSubgroup[gr]) {
		if (startsWith(sg, 'anim')) result = result.concat(ByGroupSubgroup[gr][sg]);
	}
	return result;
}
function getNature() {
	let gr = 'Animals & Nature';
	let result = [];
	for (const sg in ByGroupSubgroup[gr]) {
		result = result.concat(ByGroupSubgroup[gr][sg]);
	}
	return result;
}
function getGSGElements(gCond, sCond) {
	let keys = [];
	let byg = ByGroupSubgroup;
	for (const gKey in byg) {
		if (!gCond(gKey)) continue;

		for (const sKey in byg[gKey]) {
			if (!sCond(sKey)) continue;

			keys = keys.concat(byg[gKey][sKey]);
		}
	}
	return keys.sort();
}
function makeCategories() {
	//console.log(ByGroupSubgroup);
	let keys = Categories = {
		animal: getGSGElements(g => g == 'Animals & Nature', s => startsWith(s, 'animal')),
		clothing: getGSGElements(g => g == 'Objects', s => s == 'clothing'),
		emotion: getGSGElements(g => g == 'Smileys & Emotion', s => startsWith(s, 'face') && !['face-costume', 'face-hat'].includes(s)),
		food: getGSGElements(g => g == 'Food & Drink', s => startsWith(s, 'food')),
		'game/toy': (['sparkler', 'firecracker', 'artist palette', 'balloon', 'confetti ball'].concat(ByGroupSubgroup['Activities']['game'])).sort(),
		gesture: getGSGElements(g => g == 'People & Body', s => startsWith(s, 'hand')),
		job: ByGroupSubgroup['People & Body']['job'],
		mammal: ByGroupSubgroup['Animals & Nature']['animal-mammal'],
		music: getGSGElements(g => g == 'Objects', s => startsWith(s, 'musi')),
		object: getGSGElements(g => g == 'Objects', s => true),
		place: getGSGElements(g => g == 'Travel & Places', s => startsWith(s, 'place')),
		plant: getGSGElements(g => g == 'Animals & Nature' || g == 'Food & Drink', s => startsWith(s, 'plant') || s == 'food-vegetable' || s == 'food-fruit'),
		sport: ByGroupSubgroup['Activities']['sport'],
		tool: getGSGElements(g => g == 'Objects', s => s == 'tool'),
		transport: getGSGElements(g => g == 'Travel & Places', s => startsWith(s, 'transport')),
	};

	let incompatible = DA.incompatibleCats = {
		animal: ['mammal'],
		clothing: ['object'],
		emotion: ['gesture'],
		food: ['plant', 'animal'],
		'game/toy': ['object', 'music'],
		gesture: ['emotion'],
		job: ['sport'],
		mammal: ['animal'],
		music: ['object', 'game/toy'],
		object: ['music', 'clothing', 'game/toy', 'tool'],
		place: [],
		plant: ['food'],
		sport: ['job'],
		tool: ['object'],
		transport: [],
	}
	//console.log('categories', keys);

}

//keys and categories
function genCats(n) {
	//console.log('???????',DA.incompatibleCats)
	let di = {};
	let cats = Object.keys(Categories);
	//console.log('cats available:',cats)
	for (let i = 0; i < n; i++) {
		let cat = chooseRandom(cats);
		let incompat = DA.incompatibleCats[cat];
		//console.log('cats',cats,'\ncat',cat,'\nincompat',incompat)
		cats = arrMinus(cats, incompat);
		removeInPlace(cats, cat);
		//console.log('cats after minus',cats);
		di[cat] = Categories[cat];
	}
	return di;
}
function oneWordKeys(keys) { return keys.filter(x => !x.includes(' ')); }

function removeDuplicates(keys, prop) {
	let di = {};
	let res = [];
	let items = keys.map(x => Syms[x]);
	for (const item of items) {
		// if (item.key.includes('key')) console.log('hallo',item)
		// if (isdef(di[item.best])) {console.log('dupl:',item.key); continue;}
		if (isdef(di[item.best])) { continue; }
		res.push(item);
		di[item.key] = true;
	}
	return res.map(x => x.key);
}
function setKeys({ allowDuplicates, nMin = 25, lang, key, keySets, filterFunc, param, confidence, sortByFunc } = {}) {
	let keys = jsCopy(keySets[key]);

	if (isdef(nMin)) {
		let diff = nMin - keys.length;
		let additionalSet = diff > 0 ? nMin > 100 ? firstCondDictKeys(keySets, k => k != key && keySets[k].length > diff) : 'best100' : null;

		//console.log('diff', diff, additionalSet, keys)
		if (additionalSet) KeySets[additionalSet].map(x => addIf(keys, x)); //
		//if (additionalSet) keys = keys.concat(keySets[additionalSet]);
		//console.log(keys)
	}

	let primary = [];
	let spare = [];
	for (const k of keys) {
		let info = Syms[k];

		//console.log('info',info);
		info.best = info[lang];
		//console.log(info.best)

		if (nundef(info.best)) {
			let ersatzLang = (lang == 'D' ? 'D' : 'E');
			let klang = 'best' + ersatzLang;
			//console.log(k,lang,klang)
			if (nundef(info[klang])) info[klang] = lastOfLanguage(k, ersatzLang);
		}
		//console.log(k,lang,lastOfLanguage(k,lang),info.best,info)
		let isMatch = true;
		//if (isdef(filterFunc)) console.log(filterFunc,filterFunc(k,info.best))
		if (isdef(filterFunc)) isMatch = isMatch && filterFunc(param, k, info.best);
		if (isdef(confidence)) isMatch = info[klang + 'Conf'] >= confidence;
		if (isMatch) { primary.push(k); } else { spare.push(k); }
	}

	if (isdef(nMin)) {
		//if result does not have enough elements, take randomly from other
		let len = primary.length;
		let nMissing = nMin - len;
		if (nMissing > 0) { let list = choose(spare, nMissing); spare = arrMinus(spare, list); primary = primary.concat(list); }
	}

	if (isdef(sortByFunc)) { sortBy(primary, sortByFunc); }

	if (isdef(nMin)) console.assert(primary.length >= nMin);
	//console.log(primary)
	if (nundef(allowDuplicates)) {
		//console.log('hhhhhhhhhhhhhhh',primary.length)
		primary = removeDuplicates(primary);
	}
	return primary;
}

//#endregion

//#region random
function choose(arr, n, excepti) { return rChoose(arr, n, null, excepti); }
function chooseRandom(arr) { return rChoose(arr); }
function coin(percent = 50) { let r = Math.random(); r *= 100; return r < percent; }
function rAlphanums(n) { return rChoose(toLetters('0123456789abcdefghijklmnopq'), n); }
function rCard(postfix = 'n', ranks = '*A23456789TJQK', suits = 'HSDC') { return rChoose(ranks) + rChoose(suits) + postfix; }
function rRank(ranks = 'A23456789TJQK') { return rChoose(ranks); }
function rSuit(suit = 'HSDC') { return rChoose(suit); }
function rCoin(percent = 50) {
	let r = Math.random();
	//r ist jetzt zahl zwischen 0 und 1
	r *= 100;
	return r < percent;
}
function rChoose(arr, n = 1, func = null, exceptIndices = null) {
	//this does NOT work with an array of objects that contain DOM objects!!! =>use rChoose below instead
	let arr1 = jsCopy(arr);
	if (isdef(exceptIndices)) {
		for (const i of exceptIndices) removeInPlace(arr1, arr[i]);
	}
	if (isdef(func)) arr1 = arr1.filter(func);

	if (n == 1) {
		let idx = Math.floor(Math.random() * arr1.length);
		return arr1[idx];
	}
	arrShufflip(arr1);
	return arr1.slice(0, n);

}
function rChoose(arr, n = 1, func = null, exceptIndices = null) {
	//geht auch mit arr is string!
	let indices = arrRange(0, arr.length - 1);
	if (isdef(exceptIndices)) {
		for (const i of exceptIndices) removeInPlace(indices, i);
	}

	if (isdef(func)) indices = indices.filter(x => func(arr[x]));

	if (n == 1) {
		let idx = Math.floor(Math.random() * indices.length);
		return arr[indices[idx]];
	}
	arrShufflip(indices);
	return indices.slice(0, n).map(x => arr[x]);

}
function rColor(brightness) {

	//brightness can be dark,bright,medium, or a percentage, where 0 is black and 100 is white
	if (isdef(brightness)) {
		let hue = rHue();
		let sat = 100;
		let b = isNumber(brightness) ? brightness : brightness == 'dark' ? 25 : brightness == 'light' ? 75 : 50;
		return colorFromHSL(hue, sat, b);
	}

	let s = '#';
	for (let i = 0; i < 6; i++) {
		s += rChoose(['f', 'c', '9', '6', '3', '0']);
	}
	return s;
}
function rDate(before, after) {
	let after_date = new Date(after);
	let before_date = new Date(before);
	let random_date = new Date(Math.random() * (before_date.getTime() - after_date.getTime()) + after_date.getTime());
	return random_date;
}
function rDigits(n) { return rChoose(toLetters('0123456789'), n); }
function randomColor() { return rColor(); }
function rHue() { return (rNumber(0, 36) * 10) % 360; }
function rLetter(except) { return rLetters(1, except)[0]; }
function rLetters(n, except = []) {
	let all = 'abcdefghijklmnopqrstuvwxyz';
	for (const l of except) all = all.replace(l, '');
	console.log('all', all, except)
	return rChoose(toLetters(all), n);
}
function rNumber(min = 0, max = 100) {
	return Math.floor(Math.random() * (max - min + 1)) + min; //min and max inclusive!
}
function rPassword(n) { return rChoose(toLetters('0123456789abcdefghijklmnopqABCDEFGHIJKLMNOPQRSTUVWXYZ!.?*&%$#@:;_'), n).join(''); }
function rPrimaryColor() { let c = '#' + rChoose(['ff', '00']) + rChoose(['ff', '00']); c += c == '#0000' ? 'ff' : c == '#ffff' ? '00' : rChoose(['ff', '00']); return c; }

//#endregion

//#region string functions
function allNumbers(s) {
	//returns array of all numbers within string s
	let m = s.match(/\-.\d+|\-\d+|\.\d+|\d+\.\d+|\d+\b|\d+(?=\w)/g);
	if (m) return m.map(v => Number(v)); else return null;
	// {console.log(v,typeof v,v[0],v[0]=='-',v[0]=='-'?-(+v):+v,Number(v));return Number(v);});
}
function capitalize(s) {
	if (typeof s !== 'string') return '';
	return s.charAt(0).toUpperCase() + s.slice(1);
}
function contains(s, sSub) { return s.toLowerCase().includes(sSub.toLowerCase()); }
function endsWith(s, sSub) { let i = s.indexOf(sSub); return i >= 0 && i == s.length - sSub.length; }
function firstNumber(s) {
	// returns first number in string s
	if (s) {
		let m = s.match(/-?\d+/);
		if (m) {
			let sh = m.shift();
			if (sh) { return Number(sh); }
		}
	}
	return null;
}
function normalize_string(s, sep = '_') {
	s = s.toLowerCase().trim();
	let res = '';
	for (let i = 0; i < s.length; i++) { if (isAlphaNum(s[i])) res += s[i]; else if (s[i] == ' ') res += sep; }
	return res;
}
function plural(n) { return n == 0 || n > 1 ? 's' : ''; }
function replaceAllFast(str, sSub, sBy) { return replaceAll(str, sSub, sBy); }
function replaceAllSafe(str, sSub, sBy) { return replaceAllSpecialChars(str, sSub, sBy); }
function replaceAll(str, sSub, sBy) {
	let regex = new RegExp(sSub, 'g');
	return str.replace(regex, sBy);
}
function replaceAllX(str, sSub, sBy) { return replaceAllSpecialChars(str, sSub, sBy); }
function replaceAllSpecialChars(str, sSub, sBy) { return str.split(sSub).join(sBy); }
function replaceAtString(s, i, ssub) { return s.substring(0, i) + ssub + s.substring(i + 1); }
function replaceEvery(w, letter, nth) {
	let res = '';
	for (let i = 1; i < w.length; i += 2) {
		res += letter;
		res += w[i];
	}
	if (w.length % 2) res += w[0];
	return res;
}
function splitAtAnyOf(s, sep) {
	let arr = [], w = '';
	for (let i = 0; i < s.length; i++) {
		let ch = s[i];
		if (sep.includes(ch)) {
			if (!isEmpty(w)) arr.push(w);
			w = '';
		} else {
			w += ch;
		}
	}
	if (!isEmpty(w)) arr.push(w);
	return arr;
}
function splitIntoNumbersAndWords(s) {
	let arr = [], i = 0;
	while (i < s.length) {
		let ch = s[i];
		let w = '';
		if (isDigit(ch)) while (i < s.length && isDigit(ch)) { w += ch; i++; ch = s[i]; }
		else if (isLetter(ch)) while (i < s.length && isLetter(ch)) { w += ch; i++; ch = s[i]; }
		else { i++; continue; } //skip white spaces

		arr.push(w);
	}
	return arr;
}
function startsWith(s, sSub) {
	//console.log('s',s,'sSub',sSub)
	//testHelpers('startWith: s='+s+', sSub='+sSub,typeof(s),typeof(sSub));
	return s.substring(0, sSub.length) == sSub;
}
function stringAfter(sFull, sSub) {
	//testHelpers('s='+sFull,'sub='+sSub)
	let idx = sFull.indexOf(sSub);
	//testHelpers('idx='+idx)
	if (idx < 0) return '';
	return sFull.substring(idx + sSub.length);
}
function stringAfterLast(sFull, sSub) {
	let parts = sFull.split(sSub);
	return arrLast(parts);
}
function stringBefore(sFull, sSub) {
	let idx = sFull.indexOf(sSub);
	if (idx < 0) return sFull;
	return sFull.substring(0, idx);
}
function stringBeforeLast(sFull, sSub) {
	let parts = sFull.split(sSub);
	return sFull.substring(0, sFull.length - arrLast(parts).length - 1);
}
function stringBetween(sFull, sStart, sEnd) {
	return stringBefore(stringAfter(sFull, sStart), isdef(sEnd) ? sEnd : sStart);
}
function stringBetweenLast(sFull, sStart, sEnd) {
	let s1 = stringBeforeLast(sFull, isdef(sEnd) ? sEnd : sStart);
	return stringAfterLast(s1, sStart);
	//return stringBefore(stringAfter(sFull,sStart),isdef(sEnd)?sEnd:sStart);
}
function toLetters(s) { return [...s]; }
function toWords(s) {
	let arr = s.split(/(?:,|\s|!)+/);
	return arr.filter(x => !isEmpty(x));
}



//#endregion

//#region simepl TIMER
class SimpleTimer {
	constructor(elem, msTick, onTick, msTotal, onElapsed) {
		this.elem = elem;
		this.msTotal = this.msLeft = msTotal;
		this.onTick = onTick;
		this.onElapsed = onElapsed;
		this.interval = msTick;
		this.running = false;
		this.paused = false;
		this.TO = null;
	}
	togglePause() { if (this.paused) this.continue(); else this.pause(); }
	clear() { let elapsed = this.stop(); clearElement(this.elem); return elapsed; }
	continue() {
		if (!this.running) this.start();
		else if (!this.paused) return;
		else { this.paused = false; this.TO = setInterval(this.tickHandler.bind(this), this.interval); }
	}
	tickHandler() {
		this.msLeft -= this.interval;
		//let [ms, unit] = [this.msLeft, this.msTotal / 6];
		this.msElapsed = this.msTotal - this.msLeft;

		this.output();

		//console.log('msLeft', this.msLeft, timeConversion(this.msLeft));
		// this.button.innerHTML = timeConversion(Math.max(this.msLeft, 0), 'sh');
		// let bg = ms > unit * 4 ? GREEN : ms > unit * 2 ? YELLOW : ms > unit ? 'orange' : RED;
		// this.button.style.background = bg;

		if (isdef(this.onTick)) this.onTick();
		if (this.msLeft <= 0) {
			this.stop();
			this.msLeft = 0;
			if (isdef(this.onElapsed)) {
				this.onElapsed(0);
			}
		}
	}
	start() {
		if (this.running) this.stop();
		this.started = new Date().now;
		this.msLeft = this.msTotal;
		this.msElapsed = 0;
		this.running = true;
		this.output();
		this.TO = setInterval(this.tickHandler.bind(this), this.interval);

	}
	output() {
		this.elem.innerHTML = timeConversion(Math.max(this.msLeft, 0), 'msh');
	}
	stop() {
		if (!this.running) return;
		clearInterval(this.TO);
		this.TO = null;
		this.running = false;
		return this.msLeft;
	}
	pause() {
		if (this.paused || !this.running) return;
		clearInterval(this.TO);
		this.paused = true;
	}
}
function start_simple_timer(dtimer, msInterval, onTick, msTotal, onElapsed) {
	if (isdef(DA.timer)) { DA.timer.clear(); DA.timer = null; }
	let timer = DA.timer = new SimpleTimer(dtimer, msInterval, onTick, msTotal, onElapsed);
	timer.start();
}
function stop_simple_timer() { if (isdef(DA.timer)) { DA.timer.clear(); DA.timer = null; } }
function timeConversion(duration, format = 'Hmsh') {
	// console.log(timeConversion((60 * 60 * 1000) + (59 * 60 * 1000) + (59 * 1000)));
	// console.log(timeConversion((60 * 60 * 1000) + (59 * 60 * 1000)              ));
	// console.log(timeConversion((60 * 60 * 1000)                                 ));
	// console.log(timeConversion((60 * 60 * 1000)                    + (59 * 1000)));
	// console.log(timeConversion(                   (59 * 60 * 1000) + (59 * 1000)));
	// console.log(timeConversion(                                      (59 * 1000)));
	const portions = [];

	const msInHour = 1000 * 60 * 60;
	const hours = Math.trunc(duration / msInHour);
	//if (hours > 0) {
	if (format.includes('H')) portions.push((hours < 10 ? '0' : '') + hours);
	duration = duration - (hours * msInHour); // hours + 'h');
	//}

	const msInMinute = 1000 * 60;
	const minutes = Math.trunc(duration / msInMinute);
	//if (minutes > 0) {
	if (format.includes('m')) portions.push((minutes < 10 ? '0' : '') + minutes);// minutes + 'm');
	duration = duration - (minutes * msInMinute);
	//}

	const msInSecond = 1000;
	const seconds = Math.trunc(duration / 1000);
	//if (seconds > 0) {
	if (format.includes('s')) portions.push((seconds < 10 ? '0' : '') + seconds);//seconds + 's');
	duration = duration - (seconds * msInSecond);
	//}

	const hundreds = duration / 10;
	if (format.includes('h')) portions.push((hundreds < 10 ? '0' : '') + hundreds);//hundreds);

	return portions.join(':');
}

//#endregion

//#region misc
function assertion(cond) {
	if (!cond) {
		let args = [...arguments];
		//console.log('args',args)
		for (const a of args) {
			console.log('\n', a);
		}
		throw new Error('TERMINATING!!!')
	}
}
function clearElement(elem) {
	//console.log(elem);
	if (isString(elem)) elem = document.getElementById(elem);
	if (window.jQuery == undefined) { elem.innerHTML = ''; return elem; }
	while (elem.firstChild) {
		$(elem.firstChild).remove();
	}
	return elem;
}
function divInt(a, b) { return Math.trunc(a / b); }
function errlog() { console.log('ERROR!', ...arguments); }
function evNoBubble(ev) { ev.preventDefault(); ev.cancelBubble = true; }
function evToClass(ev, className) {
	//returns first ancestor that has this class
	let elem = findParentWithClass(ev.target, className);
	return elem;
}
function evToClosestId(ev) {
	//returns first ancestor that has an id
	let elem = findParentWithId(ev.target);
	return elem.id;
}
function evToId(ev) {
	let elem = findParentWithId(ev.target);
	return elem.id;
}
function evToProp(ev, prop) {
	let x = ev.target;
	while (isdef(x) && nundef(x.getAttribute(prop))) x = x.parentNode;
	return isdef(x) ? x.getAttribute(prop) : null;
}
function evToTargetAttribute(ev, attr) {
	let val = ev.target.getAttribute(attr);
	if (nundef(val)) { val = ev.target.parentNode.getAttribute(attr); }
	return val;
}
function evToClass(ev, className) {
	let elem = findParentWithClass(className);
	return elem;
}
function findAttributeInAncestors(elem, attr) {
	let val;
	while (elem && nundef(val = elem.getAttribute(attr))) { elem = elem.parentNode; }
	return val;
}
function findParentWithClass(elem, className) { while (elem && !mHasClass(elem, className)) { elem = elem.parentNode; } return elem; }
function findParentWithId(elem) { while (elem && !(elem.id)) { elem = elem.parentNode; } return elem; }
function findAncestorElemWithParentOfType(el, type) {
	while (el && el.parentNode) {
		let t = getTypeOf(el);
		let tParent = getTypeOf(el.parentNode);
		//console.log('el', t, tParent, 'el.id', el.id, 'parentNode.id', el.parentNode.id);
		if (tParent == type) break;
		el = el.parentNode;
	}
	return el;

}
function findAncestorElemOfType(el, type) {
	while (el) {
		let t = getTypeOf(el);
		if (t == type) break;
		el = el.parentNode;
	}
	return el;

}
function findDescendantWithId(id, parent) {
	if (parent.id == id) return parent;
	let children = arrChildren(parent);
	if (isEmpty(children)) return null;
	for (const ch of children) {
		let res = findDescendantWithId(id, ch);
		if (res) return res;
	}
	return null;
}
function findChildWithId(id, parentElem) {
	testHelpers(parentElem);
	let children = arrChildren(parentElem);
	for (const ch of children) {
		if (ch.id == id) return ch;
	}
	return null;
}
function findChildWithClass(className, parentElem) {
	testHelpers(parentElem);
	let children = arrChildren(parentElem);
	for (const ch of children) {
		//console.log('....findChildWithClass', ch, ch.classList, className)
		if (ch.classList.includes(className)) return ch;
	}
	return null;
}
function findChildOfType(type, parentElem) {
	//console.log('findChildOfType',parentElem);
	let children = arrChildren(parentElem);
	for (const ch of children) {
		if (getTypeOf(ch) == type) return ch;
	}
	return null;
}
function findDescendantOfType(type, parent) {
	if (getTypeOf(parent) == type) return parent;
	let children = arrChildren(parent);
	if (isEmpty(children)) return null;
	for (const ch of children) {
		let res = findDescendantOfType(type, ch);
		if (res) return res;
	}
	return null;
}
function findChildrenOfType(type, parentElem) {
	let children = arrChildren(parentElem);
	let res = [];
	for (const ch of children) {
		if (getTypeOf(ch) == type) res.push(ch);
	}
	return res;
}
function findKeys(s) { return SymKeys.filter(x => contains(x, s) || contains(Syms[x].E) || contains(Syms[x].D), s); }
function format_currency(num) {
	//num should be presented with 2 decimals and a $ sign in front
	return '$' + num.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
function get_checked_radios(rg) {
	let inputs = rg.getElementsByTagName('INPUT');
	let list = [];
	for (const ch of inputs) {
		//console.log('child',ch)
		let checked = ch.getAttribute('checked');
		//console.log('is',checked);
		//console.log('?',ch.checked); 
		if (ch.checked) list.push(ch.value);
	}
	//console.log('list',list)
	return list;
}
function get_mouse_pos(ev) {
	let x = ev.pageX - document.body.scrollLeft; // - ev.target.offsetY;
	let y = ev.pageY - document.body.scrollTop; // - ev.target.offsetY;
	//console.log('y calc:',y,'y returned:',ev.clientY);
	// return ({ x: ev.clientX, y: ev.clientY }); 
	return ({ x: x, y: y });

}
function getTypeOf(param) {
	//console.log('>>>>>getTypeOf',param)
	let type = typeof param;
	if (type == 'string') {
		return 'string';
	}
	if (type == 'object') {
		type = param.constructor.name;
		if (startsWith(type, 'SVG')) type = stringBefore(stringAfter(type, 'SVG'), 'Element').toLowerCase();
		else if (startsWith(type, 'HTML')) type = stringBefore(stringAfter(type, 'HTML'), 'Element').toLowerCase();
	}
	let lType = type.toLowerCase();
	if (lType.includes('event')) type = 'event';
	return type;
}
function getRect(elem, relto) {

	if (isString(elem)) elem = document.getElementById(elem);

	let res = elem.getBoundingClientRect();
	//console.log(res)
	if (isdef(relto)) {
		//console.log(relto)
		let b2 = relto.getBoundingClientRect();
		let b1 = res;
		res = {
			x: b1.x - b2.x,
			y: b1.y - b2.y,
			left: b1.left - b2.left,
			top: b1.top - b2.top,
			right: b1.right - b2.right,
			bottom: b1.bottom - b2.bottom,
			width: b1.width,
			height: b1.height
		};
	}
	let r = { x: res.left, y: res.top, w: res.width, h: res.height };
	addKeys({ l: r.x, t: r.y, r: r.x + r.w, b: r.t + r.h }, r);
	return r;
}
function getSizeNeeded(elem) {
	var d = elem.cloneNode(true); //document.createElement("div");
	d.style.width = 'auto';
	document.body.appendChild(d);
	//console.log(styles);
	let cStyles = {};
	cStyles.position = 'fixed';
	cStyles.opacity = 0;
	cStyles.top = '-9999px';
	mStyle(d, cStyles);
	//d.innerHTML = text;
	height = d.clientHeight;
	width = d.clientWidth;
	d.parentNode.removeChild(d);
	return { w: Math.round(width), h: Math.round(height) };
}
var UIDCounter = 0;
function getUID(pref = '') {
	UIDCounter += 1;
	return pref + '_' + UIDCounter;
}
function hasWhiteSpace(s) { return /\s/g.test(s); }
function jsCopy(o) { return JSON.parse(JSON.stringify(o)); }
function jsCopySafe(o) { return JSON.parse(JSON.stringify(jsClean(o))); }
function jsClean(o) {
	//replace all DOM objects in o by null
	if (nundef(o)) return o;
	else if (isDOM(o)) return null;
	else if (isLiteral(o)) return o;
	else if (isList(o)) {
		let onew = o.map(x => jsClean(x));
		return onew.filter(x => x !== null);
	} else if (isDict(o)) {
		for (const k in o) o[k] = jsClean(o[k]);
		let onew = {};
		for (const k in o) if (o[k] !== null) onew[k] = o[k];
		return onew;
	}
}
function jsonToYaml(o) { let y = jsyaml.dump(o); return y; }
function isdef(x) { return x !== null && x !== undefined; }
function nundef(x) { return x === null || x === undefined; }
function isAlphaNum(s) { query = /^[a-zA-Z0-9]+$/; return query.test(s); }
function isDOM(x) { let c = lookup(x, ['constructor', 'name']); return c ? startsWith(c, 'HTML') || startsWith(c, 'SVG') : false; }
function isDict(d) { let res = (d !== null) && (typeof (d) == 'object') && !isList(d); return res; }
function isDictOrList(d) { return typeof (d) == 'object'; }
function isDigit(s) { return /^[0-9]$/i.test(s); }
function isEmpty(arr) {
	return arr === undefined || !arr
		|| (isString(arr) && (arr == 'undefined' || arr == ''))
		|| (Array.isArray(arr) && arr.length == 0)
		|| Object.entries(arr).length === 0;
}
function isEmptyOrWhiteSpace(s) { return isEmpty(s.trim()); }
function isLetter(s) { return /^[a-zA-Z]$/i.test(s); }
function isList(arr) { return Array.isArray(arr); }
function isListOf(arr, predfunc) { return Array.isArray(arr) && !firstCond(arr, x => !predfunc(x)); }
function isLiteral(x) { return isString(x) || isNumber(x); }
function isNumber(x) { return x !== ' ' && x !== true && x !== false && isdef(x) && (x == 0 || !isNaN(+x)); }
function isString(param) { return typeof param == 'string'; }
function isSvg(elem) { return startsWith(elem.constructor.name, 'SVG'); }
function isVisible(elem) { // Where el is the DOM element you'd like to test for visibility
	//console.log(elem)
	if (isString(elem)) elem = document.getElementById(elem);
	let x = elem.style.flex;
	//console.log('flex', x);
	return (elem.style.display != 'none' || elem.offsetParent !== null) && (nundef(elem.style.flex) || !endsWith(elem.style.flex, '0%'));
	// console.log('style',elem.style.flex  == '0 1 0%')
	// if (isdef(elem.style.flex)) return elem.style.flex != '0 1 0%';
	// else return (elem.style.display != 'none' || elem.offsetParent !== null);
}
function isWhiteSpace(ch) { return /\s/.test(ch) }
function isWhiteSpace2(ch) {
	const alphanum = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_';
	return !alphanum.includes(ch);
}
function isWhiteSpaceString(s) { return isEmptyOrWhiteSpace(s); }
function isOverflown(element) {
	return element.scrollHeight > element.clientHeight || element.scrollWidth > element.clientWidth;
}
function lastDescendantOfType(type, parent) {
	if (getTypeOf(parent) == type) return parent;
	let children = arrChildren(parent);
	if (isEmpty(children)) return null;
	for (const ch of children.reverse()) {
		let res = lastDescendantOfType(type, ch);
		if (res) return res;
	}
	return null;
}
async function load_assets_fetch(basepath, baseminpath) {
	let path = basepath + 'assets/';
	Config = await route_path_yaml_dict(baseminpath + 'config.yaml');
	DB = await route_path_yaml_dict(basepath + 'DB.yaml');
	Syms = await route_path_yaml_dict(path + 'allSyms.yaml');
	SymKeys = Object.keys(Syms);
	ByGroupSubgroup = await route_path_yaml_dict(path + 'symGSG.yaml');
	C52 = await route_path_yaml_dict(path + 'c52.yaml');
	Cinno = await route_path_yaml_dict(path + 'fe/inno.yaml');
	Info = await route_path_yaml_dict(path + 'lists/info.yaml');
	create_card_assets_c52();
	KeySets = getKeySets();
	console.assert(isdef(Config), 'NO Config!!!!!!!!!!!!!!!!!!!!!!!!');
	return { users: dict2list(DB.users, 'name'), games: dict2list(Config.games, 'name'), tables: [] };
}
function loader_on() { let d = mBy('loader_holder'); if (isdef(d)) d.className = 'loader_on'; }
function loader_off() { let d = mBy('loader_holder'); if (isdef(d)) d.className = 'loader_off'; }
function log_array(arr) {
	arr.map(x => console.log(x));
}
function log_object(o = {}, msg = '', props = [], indent = 0) {
	console.log(indent ? '.'.repeat(indent) : '____', msg, indent ? '' : `(caller:${getFunctionsNameThatCalledThisFunction()})`);

	let keys = get_keys(o); keys.sort();

	for (const k of keys) {
		if (isEmpty(props) || props.includes(k)) {
			if (isDict(o[k])) { log_object(o[k], k, get_keys(o[k]).join(' '), indent + 1); console.log(); }
			else if (isListOf(o[k], isLiteral)) console.log(' '.repeat(indent), k + ':', o[k].join(','));
			else console.log(' '.repeat(indent), k + ':', o[k]);
		}
	}
}
function makeUnitString(nOrString, unit = 'px', defaultVal = '100%') {
	if (nundef(nOrString)) return defaultVal;
	if (isNumber(nOrString)) nOrString = '' + nOrString + unit;
	return nOrString;
}
function measure_fieldset(fs) {
	let legend = fs.firstChild;
	let r = getRect(legend);
	//console.log('r legend', r.w);

	let labels = fs.getElementsByTagName('label');
	//console.log('labels', labels);
	let wmax = 0;
	for (const l of labels) {
		let r1 = getRect(l);
		//console.log('l', l.innerHTML, r1.w);
		wmax = Math.max(wmax, r1.w);
	}
	//console.log('max width of labels', wmax);

	let wt = r.w;
	let wo = wmax + 24;
	let diff = wt - wo;
	if (diff >= 10) {
		//verschiebe all die labels
		for (const l of labels) { let d = l.parentNode; mStyle(d, { maleft: diff / 2 }); }

	}
	//each label should be at least 50 px wide!

	//fs min-width setzen
	let wneeded = Math.max(wt, wo) + 10;
	mStyle(fs, { wmin: wneeded });
	for (const l of labels) { let d = l.parentNode; mStyle(l, { display: 'inline-block', wmin: 50 }); mStyle(d, { wmin: wneeded - 40 }); }



}
function range(f, t, st = 1) {
	if (nundef(t)) {
		//if only 1 arg, will return numbers 0..f-1 
		t = f - 1;
		f = 0;
	}
	let arr = [];
	//console.log(f,t)
	for (let i = f; i <= t; i += st) {
		//console.log('dsdsdshallo')
		arr.push(i);
	}
	return arr;
}
function reverse(x) {
	if (isString(x)) {
		var newString = "";
		for (var i = x.length - 1; i >= 0; i--) {
			newString += x[i];
		}
		return newString;

	}
	if (isList(x)) return x.reverse();

	if (isDict(x)) return dict2list(x, 'value').reverse();
	return x;

}
function recConvertLists(o, maxlen = 25) {
	for (const k in o) {
		let val = o[k];
		if (isList(val)) {
			if (val.length > maxlen) val = val.slice(0, maxlen).toString() + '...';
			else val = val.toString();
			o[k] = val;
		} else if (isDict(val)) recConvertLists(val);
	}
}
async function route_path_yaml_dict(url) {
	let data = await fetch(url);
	let text = await data.text();
	let dict = jsyaml.load(text);
	return dict;
}
function show(elem, isInline = false) {
	if (isString(elem)) elem = document.getElementById(elem);
	if (isSvg(elem)) {
		elem.setAttribute('style', 'visibility:visible');
	} else {
		elem.style.display = isInline ? 'inline-block' : null;
	}
	return elem;
}
function hide(elem) {
	if (isString(elem)) elem = document.getElementById(elem);
	if (nundef(elem)) return;
	if (isSvg(elem)) {
		elem.setAttribute('style', 'visibility:hidden;display:none');
	} else {
		elem.style.display = 'none';
	}
}
function show_special_message(msg, stay = false, ms = 3000, delay = 0, styles = {}, callback = null) { //divTestStyles={}) {
	let dParent = mBy('dBandMessage');
	if (nundef(dParent)) dParent = mDiv(document.body, {}, 'dBandMessage');
	//console.log('dParent',dParent)
	show(dParent);
	clearElement(dParent);
	addKeys({ position: 'fixed', top: 200, classname: 'slow_gradient_blink', vpadding: 10, align: 'center', position: 'absolute', fg: 'white', fz: 24, w: '100vw' }, styles);
	if (!isEmpty(styles.classname)) { mClass(dParent, styles.classname); }
	delete styles.classname;
	mStyle(dParent, styles);
	dParent.innerHTML = msg;
	if (delay > 0) TO.special = setTimeout(() => { mFadeRemove(dParent, ms, callback); }, delay);
	else mFadeRemove(dParent, ms, callback);
}
function selectText(el) {
	var sel, range;
	if (window.getSelection && document.createRange) { //Browser compatibility
		sel = window.getSelection();
		if (sel.toString() == '') { //no text selection
			window.setTimeout(function () {
				range = document.createRange(); //range object
				range.selectNodeContents(el); //sets Range
				sel.removeAllRanges(); //remove all ranges from selection
				sel.addRange(range);//add Range to a Selection.
			}, 1);
		}
	} else if (document.selection) { //older ie
		sel = document.selection.createRange();
		if (sel.text == '') { //no text selection
			range = document.body.createTextRange();//Creates TextRange object
			range.moveToElementText(el);//sets Range
			range.select(); //make selection.
		}
	}
}
function setRect(elem, options) {
	let r = getRect(elem);
	elem.rect = r;
	elem.setAttribute('rect', `${r.w} ${r.h} ${r.t} ${r.l} ${r.b} ${r.r}`); //damit ich es sehen kann!!!

	if (isDict(options)) {
		if (options.hgrow) mStyle(elem, { hmin: r.h });
		else if (options.hfix) mStyle(elem, { h: r.h });
		else if (options.hshrink) mStyle(elem, { hmax: r.h });
		if (options.wgrow) mStyle(elem, { wmin: r.w });
		else if (options.wfix) mStyle(elem, { w: r.w });
		else if (options.wshrink) mStyle(elem, { wmax: r.w });
	}
	return r;
}
function toElem(d) { return isString(d) ? mBy(d) : d; }

function toggleSelection(pic, selected, clSelected = 'framedPicture', clUnselected = null) {
	//if selected is a list, pic is added or removed from it
	//if selected is an object, it is unselected
	//if selected is not defined or null, ignore
	//	console.log(pic)
	let ui = iDiv(pic);
	pic.isSelected = !pic.isSelected;
	if (pic.isSelected) {
		if (isdef(clUnselected)) mClassRemove(ui, clUnselected);
		mClass(ui, clSelected);
	} else {
		mClassRemove(ui, clSelected);
		if (isdef(clUnselected)) mClass(ui, clUnselected);
	}

	//if piclist is given, add or remove pic according to selection state
	if (isdef(selected)) {
		if (isList(selected)) {
			if (pic.isSelected) {
				console.assert(!selected.includes(pic), 'UNSELECTED PIC IN PICLIST!!!!!!!!!!!!')
				selected.push(pic);
			} else {
				console.assert(selected.includes(pic), 'PIC NOT IN PICLIST BUT HAS BEEN SELECTED!!!!!!!!!!!!')
				removeInPlace(selected, pic);

			}
		} else {
			mClassRemove(iDiv(selected), clSelected);
			if (isdef(clUnselected)) mClass(iDiv(selected), clUnselected);
			selected.isSelected = false;
		}
	}
	return pic.isSelected ? pic : null;
}
function toggleSelectionOfPicture(pic, selectedPics, className = 'framedPicture') {
	//	console.log(pic)
	let ui = iDiv(pic);
	pic.isSelected = !pic.isSelected;
	if (pic.isSelected) mClass(ui, className); else mClassRemove(ui, className);

	//if piclist is given, add or remove pic according to selection state
	if (isdef(selectedPics)) {
		if (pic.isSelected) {
			console.assert(!selectedPics.includes(pic), 'UNSELECTED PIC IN PICLIST!!!!!!!!!!!!')
			selectedPics.push(pic);
		} else {
			console.assert(selectedPics.includes(pic), 'PIC NOT IN PICLIST BUT HAS BEEN SELECTED!!!!!!!!!!!!')
			removeInPlace(selectedPics, pic);
		}
	}
}
function unfocusOnEnter(ev) {
	if (ev.key === 'Enter') {
		ev.preventDefault();
		//console.log('ENTER!', G.settings.rows)
		mBy('dummy').focus();
	}
}
function valf(val, def) { return isdef(val) ? val : def; }

function load_assets_direct(obj) {
	Config = jsyaml.load(obj.config);
	Syms = jsyaml.load(obj.syms);
	SymKeys = Object.keys(Syms);
	ByGroupSubgroup = jsyaml.load(obj.symGSG);
	Info = jsyaml.load(obj.info);
	KeySets = getKeySets();
	console.assert(isdef(Config), 'NO Config!!!!!!!!!!!!!!!!!!!!!!!!');

}

//#region new from start
function aggregate_elements(list_of_object, propname) {
	let result = [];
	for (let i = 0; i < list_of_object.length; i++) {
		let obj = list_of_object[i];
		let arr = obj[propname];
		for (let j = 0; j < arr.length; j++) {
			result.push(arr[j]);
		}
	}
	return result;
}
function complexCompare(obj1, obj2) {
	const obj1Keys = Object.keys(obj1);
	const obj2Keys = Object.keys(obj2);

	if (obj1Keys.length !== obj2Keys.length) {
		return false;
	}

	for (let objKey of obj1Keys) {
		if (obj1[objKey] !== obj2[objKey]) {
			if (typeof obj1[objKey] == "object" && typeof obj2[objKey] == "object") {
				if (!isEqual(obj1[objKey], obj2[objKey])) {
					return false;
				}
			}
			else {
				return false;
			}
		}
	}

	return true;
}
function exchange_by_index(arr1, i1, arr2, i2) {

	//console.log('exchange_by_index', arr1, i1, arr2, i2);

	let temp = arr1[i1];
	arr1[i1] = arr2[i2];
	arr2[i2] = temp;
}
function if_plural(n) { return n == 1 ? '' : 's'; }
function if_stringified_or_list(obj) { return nundef(obj) ? [] : is_stringified(obj) ? JSON.parse(obj) : obj; }
function if_stringified_or_dict(obj) { return nundef(obj) ? {} : is_stringified(obj) ? JSON.parse(obj) : obj; }
function if_stringified_or_string(obj) { return nundef(obj) ? '' : is_stringified(obj) ? JSON.parse(obj) : obj; }
function if_stringified(obj) { return is_stringified(obj) ? JSON.parse(obj) : obj; }
function is_stringified(obj) {
	if (isString(obj)) {
		//console.log('is a string',obj,obj[0],obj[1],'"\'{[('.includes(obj[0]));
		return '"\'{[('.includes(obj[0]);
	}
	return false;
	//return typeof obj == 'string' && ['"', '{', '['].includes(obj[0]); 
}
function intersection(arr1, arr2) {
	//each el in result will be unique
	let res = [];
	for (const a of arr1) {
		if (arr2.includes(a)) {
			addIf(res, a);
		}
	}
	return res;
}
function mFlip(card, ms, callback) {
	let a = mAnimate(iDiv(card), 'transform', [`scale(1,1)`, `scale(0,1)`],
		() => {
			if (card.faceUp) face_down(card); else face_up(card);
			mAnimate(iDiv(card), 'transform', [`scale(0,1)`, `scale(1,1)`], callback, ms / 2, 'ease-in', 0, 'both');
		},
		ms / 2, 'ease-out', 0, 'both');
	//a.onfinish = callback;
}
function object2string(o, props = [], except_props = []) {
	let s = '';
	if (nundef(o)) return s;
	if (isString(o)) return o;
	let keys = Object.keys(o).sort();
	//console.log('keys',keys);
	for (const k of keys) {
		if (!isEmpty(props) && props.includes(k) || !except_props.includes(k)) {
			let val = isList(o[k]) ? o[k].join(',') : isDict(o[k]) ? object2string(o[k].props, except_props) : o[k];
			let key_part = isEmpty(s) ? '' : `, ${k}:`;
			s += val;
		}
	}
	return s;
}
function simpleCompare(o1, o2) {
	let s1 = object2string(o1);
	let s2 = object2string(o2);
	return s1 == s2;
}
function get_now() { return Date.now(); }
function get_timestamp() { return Date.now(); }

