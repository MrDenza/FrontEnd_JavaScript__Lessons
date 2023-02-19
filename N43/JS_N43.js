"use strict"; // Строгий режим
// ----------------------- JavaScript -----------------------
let page = document.body;
let btnStart = document.getElementById('btn-start');
let btnReset = document.getElementById('btn-reset');
let keyAnimFrame;

let score = {element: document.getElementById('score'), 
			first: 0, 
			second: 0};
let field = {element: null, // присвоим значение после генерации поля
			width: 600,
			height: 400};
let leftRacket = {element: null, // присвоим значение после генерации поля
				width: 10,
				height: 100};
let rightRacket = {element: null, // присвоим значение после генерации поля
				width: 10,
				height: 100};
let ball = {element: null,
			size: 30};

btnStart.addEventListener('click',startGame,false);
btnReset.addEventListener('click',stopGame,false);

// СОХРАНИТЬ В БИБЛИОТЕКУ !!!
if (!window.requestAnimationFrame) {
	window.requestAnimationFrame = function(){
		return (
			window.requestAnimationFrame       ||
			window.webkitRequestAnimationFrame ||
			window.mozRequestAnimationFrame    ||
			window.oRequestAnimationFrame      ||
			window.msRequestAnimationFrame     ||
			function(callback){
				window.setTimeout(callback, 1000 / 60);
			}
		);
	}();
}

if (!window.cancelAnimationFrame) {
	window.cancelAnimationFrame = function(){ // под вопросом
		return (
			window.cancelAnimationFrame       ||
			window.webkitCancelAnimationFrame ||
			window.mozCancelAnimationFrame    ||
			window.oCancelAnimationFrame      ||
			window.msCancelAnimationFrame     ||
			console.log('Отмена requestAnimationFrame не требуется')
		);
	}();
}
// --------------------------------------------------------------------------

// ---------- генерация поля ---------- 
function generateField() {
	let elField = document.createElement('div');
	elField.style.cssText = `width: ${field.width}px; height: ${field.height}px; margin: auto; border: 2px solid black; background-color: gold; position: relative; `;
	elField.id = 'field';
	field.element = elField;
	let elLeftRacket = document.createElement('div');
	elLeftRacket.style.cssText = `width: ${leftRacket.width}px; height: ${leftRacket.height}px; border: 1px solid gray; box-sizing: border-box; background-color: red; position: absolute; top: ${field.height/2 - leftRacket.height/2}px; left: 0`;
	elLeftRacket.id = 'leftRacket';
	leftRacket.element = elLeftRacket;
	let elRightRacket = document.createElement('div');
	elRightRacket.style.cssText = `width: ${rightRacket.width}px; height: ${rightRacket.height}px; border: 1px solid gray; box-sizing: border-box; background-color: blue; position: absolute; top: ${field.height/2 - rightRacket.height/2}px; left: ${field.width - rightRacket.width}px`;
	elRightRacket.id = 'rightRacket';
	rightRacket.element = elRightRacket;
	let elBall = document.createElement('div');
	elBall.style.cssText = `width: ${ball.size}px; height: ${ball.size}px; border: 1px solid gray; border-radius: 50%; box-sizing: border-box; background-color: chartreuse; position: absolute; top: ${field.height/2 - ball.size/2}px; left: ${field.width/2 - ball.size/2}px`;
	elBall.id = 'rightRacket';
	rightRacket.element = elBall;
	
	elField.appendChild(elLeftRacket);
	elField.appendChild(elRightRacket);
	elField.appendChild(elBall);
	page.appendChild(elField);
}
generateField();

// ---------- работа кнопок ---------- 
function startGame() {
	console.log('Start Game!');
	runGame();
}

function stopGame() {
	console.log('Stop Game!');
	if (keyAnimFrame){
		cancelAnimationFrame(keyAnimFrame);
		keyAnimFrame = undefined;
	}
}

// ---------- основа игры ----------
function runGame() {
	updateGame();
	renderGame();
	console.log('lol');
	keyAnimFrame = requestAnimationFrame(runGame);
}

// ---------- обработка физики игры ----------
function updateGame() {
	
}

// ---------- прорисовка игры ----------
function renderGame() {
	
}










