const alpha = Array.from(Array(26).keys());
const alphaU = alpha.map((x) => String.fromCharCode(x + 65)); 	 	// A-Z
const alphaL = alpha.map((x) => String.fromCharCode(x + 97));		// a-z
const symbols = alpha.map((x) => String.fromCharCode(x + 33));
const digits = Array.from(Array(10).keys());						// 0 -9

let atLeastOneChecked = () => digit.checked || symbol.checked || lower.checked || upper.checked;

const length = document.getElementById('length');
const digit = document.getElementById('digit');
const symbol = document.getElementById('symbol');
const lower = document.getElementById('lower');
const upper = document.getElementById('upper');
const genBtn = document.getElementById('gen');
const pw = document.getElementById('pw');

generate();

function generate() {
	let pool = [];
	const passLength = parseInt(length.value);

	//Make character pool for password
	if (digit.checked) {
		pool = digits.map(x => x.toString());
	}
	if (symbol.checked) {
		pool = pool.concat(symbols);
	}
	if (lower.checked) {
		pool = pool.concat(alphaL);
	}
	if (upper.checked) {
		pool = pool.concat(alphaU);
	}

	let now = new Date();
	let util = new RandomUtil(now.getTime());

	const MAX = pool.length;
	let password = [];
	let curr = util.randomInt() % MAX;

	password.push(pool[curr]);

	for (let i = 1; i < passLength; i++) {

		// Dont allow sequential characters
		// Dont allow same characters be adjacent

		curr = util.randomInt() % MAX;

		while (password[i - 1] == pool[curr] || password[i - 1] == pool[curr - 1]) {
			curr = util.randomInt() % MAX;
		}

		password.push(pool[curr]);
	}

	console.log(password.join(""));
	pw.innerHTML = password.join('');
}



genBtn.addEventListener('click', () => {
	if (atLeastOneChecked) {
		generate();
	}
})

function RandomUtil(seed) {
	var self = this;

	if (seed == null) {
		seed = 3819201;
	}

	var MULTIPLIER_A = 1103515245;
	var INCREMENT_C = 12345;
	var MODULUS = 2147483647; // max integer value

	self.randomInt = function () {
		seed = (seed * MULTIPLIER_A + INCREMENT_C) % MODULUS;
		return seed;
	};
}