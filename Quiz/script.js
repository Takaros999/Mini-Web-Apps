const quizData= [
	{
		question: "What is the largest country in the world?",
		a: "Russia",
		b: "Canada",
		c: "China",
		d: "United States",
		correct: "a"
	},
	{
		question: "What is the 100th digit of Pi?",
		a: "9",
		b: "4",
		c: "7",
		d: "2",
		correct: "a"
	},
	{
		question: "What year did World War I begin?",
		a: "1919",
		b: "1905",
		c: "1914",
		d: "1925",
		correct: "c"
	},
	{
		question: "What is considered the rarist form of color blindness?",
		a: "Purple",
		b: "Red",
		c: "Green",
		d: "Blue",
		correct: "d"
	},
	{
		question: "Which of these species is not extinct?",
		a: "Tasmanian tiger",
		b: "Japanese sea lion",
		c: "Komodo dragon",
		d: "Saudi gazelle",
		correct: "c"
	},
	{
		question: "What name was historically used for the Turkish city currently known as Istanbul?",
		a: "Constaninople",
		b: "Hüdavendigar",
		c: "Söğüt",
		d: "Adrianople",
		correct: "a"
	},
	{
		question: "Which movie contains the quote \"Say hello to my little friend!\" ?",
		a: "Reservoir Dogs" ,
		b: "Scarface",
		c: "Heat",
		d: "Goodfellas",
		correct: "b"
	}
];

const quiz = document.getElementById('container');
const question  = document.getElementById('question');
const a_text = document.getElementById('a_text');
const b_text = document.getElementById('b_text');
const c_text = document.getElementById('c_text');
const d_text = document.getElementById('d_text');
const sumbitBtn = document.getElementById('sumbit');

let currentQuestion = 0;
let score = 0;

loadQuiz();

function getSelected() {
	const answers = document.querySelectorAll('.ans');

	// console.log(answers);
	let answerSel = undefined;

	answers.forEach((answer) => {
		if(answer.checked) {
			answerSel = answer.id;
		}
	})
	
	return answerSel;
}

function deSelect() {
	const answers = document.querySelectorAll('.ans');

	answers.forEach((answer) => {
		answer.checked = false;
	})
}

function trackScore() {
	//check if currentQuestion is out of bounds
	if(currentQuestion > quizData.length) return;

	if(getSelected() == quizData[currentQuestion - 1].correct) {
		score++;
	}
}

function loadQuiz() {

	const currentQ = quizData[currentQuestion];

	let selectedA = getSelected();
	if( selectedA != undefined || currentQuestion == 0) {

		question.innerHTML = currentQ.question;
		a_text.innerHTML = currentQ.a;
		b_text.innerHTML = currentQ.b;
		c_text.innerHTML = currentQ.c;
		d_text.innerHTML = currentQ.d;

		currentQuestion++;

		deSelect();
	}
}

sumbitBtn.addEventListener('click', () => {

	trackScore();
	if(currentQuestion < quizData.length) {
		
		loadQuiz();
	} else {
		quiz.innerHTML = `
		<h2 style="margin: 5%">You've answered successfully ${score}/${quizData.length}</h2>
		<button onClick="history.go(0);">Try Again!</button>`;
	}
})