const inquirer = require('inquirer');
var Word = require('./word.js');
const wordList = ['TIMBERWOLVES', 'JAGUARS', 'CAVELIERS', 'CLIPPERS', 'PIRATES', 'PANTHERS', 'ASTROS', 'ROCKETS', 'CARDINALS', 'PACERS'];
// CLIPPERS
// [ 'c', 'l', 'i', 'p', 'p', 'e', 'r', 's' ]

//    *       L       *       P       P       *       *       *
let game = {
	wordList: wordList,
	guessesRemaining: 10,
	curWordConstruct: '',
	renderBoard: function () {
		let w = this.curWordConstruct.wordStateByLetter;
		let r = w.map(function (val) {
			return val.displayState();
		});
		return r.join('');

	},
	generateWord: function () {
		let leng = this.wordList.length;
		let randWord = this.wordList[Math.floor(Math.random() * leng)];
		this.curWordConstruct = new Word(randWord)
	},
	startGame: function () {
		console.log(`\n------WELCOME TO HANGMAN--------\n`);
		this.generateWord();
		console.log(this.renderBoard());
		this.makeGuess();
	},
	evaluateGuess: function (guess) {
		let t = this.curWordConstruct.wordStateByLetter;
		let updatedWord = t.map((val, index) => {
			if (guess === val.character) {
				val.visible = true;
			}
			return val;
		});
		this.curWordConstruct.wordStateByLetter = updatedWord;
		console.log(this.renderBoard());
		this.makeGuess();
	},
	makeGuess: function () {
		inquirer
			.prompt([{
				type: "input",
				name: "choice",
				message: "PLEASE GUESS A LETTER"
			}])
			.then(function (val) {
				var n = val.choice.toUpperCase();
				console.log(n);
				game.evaluateGuess(n);
				// need to create function to check if guessed letter is correct

			});
	}
}
game.startGame();