"use strict"; // Строгий режим
// ----------------------- JavaScript -----------------------
let page = document.body;

const widthRacket = 10; // ширина ракетки
const heightRacket = 100; // длина ракетки
const speedRacket = 5; // скорость перемещения ракетки
const ballDiameter = 30; // диаметр мячика
const ballRadius = ballDiameter/2; // радиус мячика
let elContainer;
let svg = {element: null,
	width: 600,
	height: 460,
	link: 'http://www.w3.org/2000/svg'};
let svgBtn = {elementStart: null,
	xStart: 50,
	yStart: 15,
	elementReset: null,
	xReset: 400,
	yReset: 15,
	width: 150,
	height: 25};
let score = {element: null,
	left: 0,
	right: 0,
	ox: svg.width/2,
	oy: 27,
	update: false};
let field = {element: null, // присвоим значение после генерации поля
	width: 600,
	height: 400,
	ox: 0,
	oy: 55};
let leftRacket = {element: null, // присвоим значение после генерации поля
	ox: 0,
	oy: field.oy + field.height/2 - heightRacket/2,
	dy: 0};
let rightRacket = {element: null, // присвоим значение после генерации поля
	ox: field.width - widthRacket,
	oy: field.oy + field.height/2 - heightRacket/2,
	dy: 0};
let ball = {element: null, // присвоим значение после генерации поля
	ox: field.width/2,
	oy: field.oy + field.height/2,
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
	elContainer = document.createElement('div');
	elContainer.id = 'container';
	// SVG
	let elSvg = document.createElementNS(svg.link, 'svg');
	setAttributes(elSvg, {'id': 'svg',
							   'width': `${svg.width}`,
							   'height': `${svg.height}`,
							   'xmlns': `${svg.link}`});
	elContainer.appendChild(elSvg);
	svg.element = elSvg;
	// группа кнопки Start
	let groupBtnStart = document.createElementNS(svg.link, 'g');
	setAttributes(groupBtnStart, {'id': 'btn-start',
									   'style': 'cursor: pointer; -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none;'})
	// прямоугольник кнопки Start
	let elBtnStart = document.createElementNS(svg.link,'rect');
	setAttributes(elBtnStart,{'x': `${svgBtn.xStart}`,
								   'y': `${svgBtn.yStart}`,
								   'width': `${svgBtn.width}`,
								   'height': `${svgBtn.height}`,
								   'stroke': '#858585',
								   'fill': '#e8e8e8'});
	groupBtnStart.appendChild(elBtnStart);
	// текст кнопки Start
	let elBtnText = document.createElementNS(svg.link,'text');
	setAttributes(elBtnText,{'x': `${svgBtn.xStart + svgBtn.width/2}`,
								  'y': `${svgBtn.yStart + svgBtn.height/2}`,
								  'dominant-baseline': 'middle',
								  'text-anchor': 'middle',
								  'font-size': 14});
	elBtnText.textContent = 'СТАРТ';
	groupBtnStart.appendChild(elBtnText);
	elSvg.appendChild(groupBtnStart);
	svgBtn.elementStart = groupBtnStart;
	svgBtn.elementStart.addEventListener('click',startGame,false); // слушатель кнопки Start
	// группа кнопки Reset
	let groupBtnReset = document.createElementNS(svg.link, 'g');
	setAttributes(groupBtnReset, {'id': 'btn-reset',
		 							   'style': 'cursor: pointer; -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none;'})
	// прямоугольник кнопки Reset
	let elBtnReset = document.createElementNS(svg.link,'rect');
	setAttributes(elBtnReset,{'x': `${svgBtn.xReset}`,
								   'y': `${svgBtn.yReset}`,
								   'width': `${svgBtn.width}`,
								   'height': `${svgBtn.height}`,
								   'stroke': '#858585',
								   'fill': '#e8e8e8',
								   'id': 'btn-reset'});
	groupBtnReset.appendChild(elBtnReset);
	// текст кнопки Reset
	elBtnText = document.createElementNS(svg.link,'text');
	setAttributes(elBtnText,{'x': `${svgBtn.xReset + svgBtn.width/2}`,
								  'y': `${svgBtn.yReset + svgBtn.height/2}`,
								  'dominant-baseline': 'middle',
								  'text-anchor': 'middle',
								  'font-size': 14});
	elBtnText.textContent = 'СБРОС';
	groupBtnReset.appendChild(elBtnText);
	elSvg.appendChild(groupBtnReset);
	svgBtn.elementReset = groupBtnReset;
	svgBtn.elementReset.addEventListener('click',resetGame,false); // слушатель кнопки Reset
	// текст счётчика очков
	let elScoreText = document.createElementNS(svg.link,'text');
	setAttributes(elScoreText,{'x': `${score.ox}`,
									'y': `${score.oy}`,
									'dominant-baseline':'middle',
									'text-anchor':'middle',
									'font-size': 48,
									'fill': 'red',
									'style': 'font-weight: bold'});
	elScoreText.textContent = '0:0';
	elSvg.appendChild(elScoreText);
	score.element = elScoreText;
	// игровое поле SVG
	let elField = document.createElementNS(svg.link,'rect');
	setAttributes(elField,{'x': `${field.ox}`,
								'y': `${field.oy}`,
								'width': `${field.width}`,
								'height': `${field.height}`,
								'stroke': '#000000',
								'fill': 'gold'});
	elSvg.appendChild(elField);
	field.element = elBtnStart;
	// левая ракетка
	let elLeftRacket = document.createElementNS(svg.link,'rect');
	setAttributes(elLeftRacket,{'x': `${leftRacket.ox}`,
									 'y': `${leftRacket.oy}`,
									 'width': `${widthRacket}`,
									 'height': `${heightRacket}`,
									 'stroke': '#000000',
									 'fill': 'red',
									 'id': 'leftRacket'});
	elSvg.appendChild(elLeftRacket);
	leftRacket.element = elLeftRacket;
	// правая ракетка
	let elRightRacket = document.createElementNS(svg.link,'rect');
	setAttributes(elRightRacket,{'x': `${rightRacket.ox}`,
									  'y': `${rightRacket.oy}`,
									  'width': `${widthRacket}`,
									  'height': `${heightRacket}`,
									  'stroke': '#000000',
									  'fill': 'blue',
									  'id': 'rightRacket'});
	elSvg.appendChild(elRightRacket);
	rightRacket.element = elRightRacket;
	// мяч
	let elBall = document.createElementNS(svg.link,'circle');
	setAttributes(elBall,{'cx':`${ball.ox}`,
							   'cy':`${ball.oy}`,
							   'r':`${ballRadius}`,
							   'fill':'chartreuse',
							   'stroke': '#000000'});
	elSvg.appendChild(elBall);
	ball.element = elBall;
	
	page.appendChild(elContainer);
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
		ball.oy = field.oy + field.height/2;
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
	leftRacket.oy = field.oy + field.height/2 - heightRacket/2;
	rightRacket.oy = field.oy + field.height/2 - heightRacket/2;
	leftRacket.dy = 0;
	rightRacket.dy = 0;
	ball.ox = field.width/2;
	ball.oy = field.oy + field.height/2;
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
	leftRacket.element.setAttribute('y',`${leftRacket.oy}`);
	rightRacket.element.setAttribute('y',`${rightRacket.oy}`);
	ball.element.setAttribute('cx',`${ball.ox}`);
	ball.element.setAttribute('cy',`${ball.oy}`);
	score.element.textContent = `${score.left}:${score.right}`;
}

// ---------- вспомогательные функции ----------
function randomSpeed(min,max) {
	let num = 0;
	do {
		num = Math.floor(Math.random()*(max - min + 1) + min);
	}
	while (num === 0);
	return num;
}
function setAttributes(el, attrs) {
	for(let key in attrs) {
		el.setAttribute(key, attrs[key]);
	}
}
// отмена выделения текста на svg -> style = -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none;