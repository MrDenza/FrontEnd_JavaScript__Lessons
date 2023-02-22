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
	height: 400,
	ox: 0,
	oy: 0};
let leftRacket = {element: null, // присвоим значение после генерации поля
	ox: 0,
	oy: field.height/2 - heightRacket/2,
	dy: 0};
let rightRacket = {element: null, // присвоим значение после генерации поля
	ox: field.width - widthRacket,
	oy: field.height/2 - heightRacket/2,
	dy: 0};
let ball = {element: null, // присвоим значение после генерации поля
	ox: field.width/2,
	oy: field.height/2,
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
	// создаём поле
	let elField = document.createElement('canvas');
	elField.setAttribute('id','field');
	elField.setAttribute('width',`${field.width}`);
	elField.setAttribute('height', `${field.height}`);
	elField.setAttribute('style','margin: auto;');
	field.element = elField;
	// рисуем 
	
	
	
	
	
	
	
	
	//elField.style.cssText = `width: ${field.width}px; height: ${field.height}px; margin: auto; border: 2px solid black; background-color: gold; position: relative; `;
	//elField.id = 'field';
	
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
		ball.ox = field.width/2;
		ball.oy = field.height/2;
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
	ball.ox = field.width/2;
	ball.oy = field.height/2;
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
	if (leftRacket.oy > field.oy + field.height - heightRacket){
		leftRacket.oy = field.oy + field.height - heightRacket;
	}
	else if (leftRacket.oy < field.oy){
		leftRacket.oy = field.oy;
	}
	rightRacket.oy += rightRacket.dy;
	if (rightRacket.oy > field.oy + field.height - heightRacket){
		rightRacket.oy = field.oy + field.height - heightRacket;
	}
	else if (rightRacket.oy < field.oy){
		rightRacket.oy = field.oy;
	}
	// физика мячика
	if (ball.run === true){
		ball.ox += ball.speedX;
		ball.oy += ball.speedY;
	}
	if (ball.oy < field.oy + ballRadius || ball.oy > field.oy + field.height-ballRadius){
		ball.speedY =- ball.speedY;
	}
	if (ball.oy > leftRacket.oy && ball.oy < leftRacket.oy + heightRacket && ball.ox <= widthRacket + ballRadius){
		ball.ox = widthRacket + ballRadius;
		ball.speedX =- ball.speedX;
		console.log('Слева удар о ракетку!');
	}
	if (ball.oy > rightRacket.oy && ball.oy < rightRacket.oy + heightRacket && ball.ox + ballRadius >= field.width - widthRacket){
		ball.ox = field.width - widthRacket - ballRadius;
		ball.speedX =- ball.speedX;
		console.log('Справа удар о ракетку!');
	}
	// условие начисления очков
	if (ball.ox - ballRadius <= 0 && ball.run === true){
		score.update = true;
		++score.left;
		ball.ox = ballRadius;
		console.log('Очко получает красный игрок!');
	}
	if (ball.ox + ballRadius >= field.width && ball.run === true){
		score.update = true;
		++score.right;
		ball.ox = field.width - ballRadius;
		console.log('Очко получает синий игрок!');
	}
}

// ---------- прорисовка игры ----------
function renderGame() {
	let elFieldContext = field.element.getContext('2d');
	// рисуем поле
	elFieldContext.fillStyle = 'gold';
	elFieldContext.fillRect(field.ox,field.oy,field.width,field.height);
	elFieldContext.fillStyle = 'black';
	elFieldContext.strokeRect(field.ox,field.oy,field.width,field.height);
	// рисуем левую ракетку
	elFieldContext.fillStyle = 'red';
	elFieldContext.fillRect(leftRacket.ox,leftRacket.oy,widthRacket,heightRacket);
	elFieldContext.fillStyle = 'black';
	elFieldContext.strokeRect(leftRacket.ox,leftRacket.oy,widthRacket,heightRacket);
	// рисуем правую ракетку
	elFieldContext.fillStyle = 'blue';
	elFieldContext.fillRect(rightRacket.ox,rightRacket.oy,widthRacket,heightRacket);
	elFieldContext.fillStyle = 'black';
	elFieldContext.strokeRect(rightRacket.ox,rightRacket.oy,widthRacket,heightRacket);
	// рисуем мяч
	elFieldContext.fillStyle = 'chartreuse';
	elFieldContext.beginPath();
	elFieldContext.arc(ball.ox,ball.oy,ballRadius,0,Math.PI*2,false);
	elFieldContext.fill();
	elFieldContext.strokeStyle = 'black';
	elFieldContext.beginPath();
	elFieldContext.arc(ball.ox,ball.oy,ballRadius,0,Math.PI*2,false);
	elFieldContext.stroke();
	// обновление счётчика очков
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