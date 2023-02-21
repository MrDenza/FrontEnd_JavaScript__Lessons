"use strict"; // Строгий режим
// ----------------------- JavaScript -----------------------
let page = document.body;
let btnStart = document.getElementById('btn-start');
let btnReset = document.getElementById('btn-reset');
btnStart.addEventListener('click',startGame,false);
btnReset.addEventListener('click',resetGame,false);

const widthRacket = 10; // ширина ракетки
const heightRacket = 100; // длина ракетки
const speedRacket = 5; // скорость перемещения ракетки
const ballDiameter = 30; // диаметр мячика
const ballRadius = ballDiameter/2; // радиус мячика
let score = {element: document.getElementById('score'), 
			left: 0, 
			right: 0,
			update: false};
let field = {element: null, // присвоим значение после генерации поля
			width: 600,
			height: 400};
let leftRacket = {element: null, // присвоим значение после генерации поля
				ox: 0,
				oy: field.height/2 - heightRacket/2,
				dy: 0};
let rightRacket = {element: null, // присвоим значение после генерации поля
				ox: field.width - widthRacket,
				oy: field.height/2 - heightRacket/2,
				dy: 0};
let ball = {element: null, // присвоим значение после генерации поля
			ox: field.width/2 - ballRadius,
			oy: field.height/2 - ballRadius,
			speedX: 1,
			speedY: 0.5,
			run: false};

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
	//elField.id = 'field';
	field.element = elField;
	let elLeftRacket = document.createElement('div');
	elLeftRacket.style.cssText = `width: ${widthRacket}px; height: ${heightRacket}px; border: 1px solid gray; box-sizing: border-box; background-color: red; position: absolute; top: ${leftRacket.oy}px; left: ${leftRacket.ox}px`;
	elLeftRacket.id = 'leftRacket';
	leftRacket.element = elLeftRacket;
	let elRightRacket = document.createElement('div');
	elRightRacket.style.cssText = `width: ${widthRacket}px; height: ${heightRacket}px; border: 1px solid gray; box-sizing: border-box; background-color: blue; position: absolute; top: ${rightRacket.oy}px; left: ${rightRacket.ox}px`;
	elRightRacket.id = 'rightRacket';
	rightRacket.element = elRightRacket;
	let elBall = document.createElement('div');
	elBall.style.cssText = `width: ${ballDiameter}px; height: ${ballDiameter}px; border: 1px solid gray; border-radius: 50%; box-sizing: border-box; background-color: chartreuse; position: absolute; top: ${ball.oy}px; left: ${ball.ox}px`;
	elBall.id = 'rightRacket';
	ball.element = elBall;
	
	elField.appendChild(elLeftRacket);
	elField.appendChild(elRightRacket);
	elField.appendChild(elBall);
	page.appendChild(elField);
}
generateField();

// ---------- работа кнопок и паузы ----------
function startGame() {
	if (ball.run === false){
		ball.run = true;
		console.log('Игра запущена!');
		ball.speedX = randomSpeed(-1,1)*ball.speedX; // скорость замедлена специально
		ball.speedY = randomSpeed(-1,1);
		ball.ox = field.width/2 - ballRadius;
		ball.oy = field.height/2 - ballRadius;
		document.addEventListener("keydown", runRacket,false);
		document.addEventListener("keyup", stopRacket,false);
	}
}
function stopGame() {
	ball.run = false;
	document.removeEventListener("keydown", runRacket,false);
	document.removeEventListener("keyup", stopRacket,false);
}
function resetGame(){
	console.log('Сброс игры!');
	stopGame();
	leftRacket.oy = field.height/2 - heightRacket/2;
	rightRacket.oy = field.height/2 - heightRacket/2;
	leftRacket.dy = 0;
	rightRacket.dy = 0;
	ball.ox = field.width/2 - ballRadius;
	ball.oy = field.height/2 - ballRadius;
	score.left = 0;
	score.right = 0;
	renderGame();
}

// ---------- обработка нажатия клавиш управления ----------
function runRacket(eo) {
	eo = eo || window.event;
	console.log(eo.keyCode);
	if (eo.keyCode === 16){ // key: shift - движение левой платформы вверх
		leftRacket.dy = -speedRacket;
	}
	else if (eo.keyCode === 17){ // key: ctrl - движение левой платформы вниз
		leftRacket.dy = speedRacket;
	}
	if (eo.keyCode === 38){ // key: стрелка вверх - движение правой платформы вверх
		rightRacket.dy = -speedRacket;
	}	
	else if (eo.keyCode === 40){ // key: стрелка вниз - движение правой платформы вниз
		rightRacket.dy = speedRacket;
	}
	return false;
}
function stopRacket(eo) {
	eo = eo || window.event;
	if (eo.keyCode === 16 || eo.keyCode === 17){
		leftRacket.dy = 0;
	}
	if (eo.keyCode === 38 || eo.keyCode === 40){
		rightRacket.dy = 0;
	}
	return false;
}

// ---------- основа игры ----------
function runGame() {
	score.update = false;
	updateGame();
	renderGame();
	console.log('tick');
	if (score.update === true){
		stopGame();
	}
	requestAnimationFrame(runGame);
}
runGame();
// ---------- обработка физики игры ----------
function updateGame() {
	// физика ракеток
	leftRacket.oy += leftRacket.dy;
	if (leftRacket.oy > field.height-heightRacket){
		leftRacket.oy = field.height-heightRacket;
	}
	else if (leftRacket.oy < 0){
		leftRacket.oy = 0;
	}
	rightRacket.oy += rightRacket.dy;
	if (rightRacket.oy > field.height-heightRacket){
		rightRacket.oy = field.height-heightRacket;
	}
	else if (rightRacket.oy < 0){
		rightRacket.oy = 0;
	}
	// физика мячика
	if (ball.run === true){
		ball.ox += ball.speedX;
		ball.oy += ball.speedY;
	}
	if (ball.oy < 0 || ball.oy > field.height-ballDiameter){
		ball.speedY =- ball.speedY;
	}
	if (ball.oy + ballRadius > leftRacket.oy && ball.oy - ballRadius < leftRacket.oy + heightRacket && ball.ox <= widthRacket){
		ball.ox = widthRacket;
		ball.speedX =- ball.speedX;
		console.log('Слева удар о ракетку!');
	}
	if (ball.oy + ballRadius > rightRacket.oy && ball.oy - ballRadius < rightRacket.oy + heightRacket && ball.ox + ballDiameter >= field.width - widthRacket){
		ball.ox = field.width - widthRacket - ballDiameter;
		ball.speedX =- ball.speedX;
		console.log('Справа удар о ракетку!');
	}
	// условие начисления очков
	if (ball.ox <= 0 && ball.run === true){
		score.update = true;
		++score.left;
		ball.ox = 0;
		console.log('Очко получает красный игрок!');
	}
	if (ball.ox + ballDiameter >= field.width && ball.run === true){
		score.update = true;
		++score.right;
		ball.ox = field.width - ballDiameter;
		console.log('Очко получает синий игрок!');
	}
}

// ---------- прорисовка игры ----------
function renderGame() {
	leftRacket.element.style.top = `${leftRacket.oy}px`;
	rightRacket.element.style.top = `${rightRacket.oy}px`;
	ball.element.style.top = `${ball.oy}px`;
	ball.element.style.left = `${ball.ox}px`;
	score.element.textContent = `${score.left}:${score.right}`;
}

// ---------- вспомогательная функция - рандом ----------
function randomSpeed(min,max) {
	let num = 0;
	do {
		num = Math.floor(Math.random()*(max - min + 1) + min);
	}
	while (num === 0);
	return num;
}