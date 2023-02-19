"use strict"; // Строгий режим
// ----------------------- JavaScript -----------------------
let page = document.body;
let diameter; // введённый диаметр циферблата, получаем в function getValue
let radius; // радиус циферблата для позиционирования делений шкалы
let clock, text, pointerHour, pointerMin, pointerSec;

const textTimeScale = 0.1; // множитель для масштаба текста со временем
const textTimePadding = 0.3; // множитель для padding-top текста со временем
const textDividingScale = 0.07; // множитель для масштаба текста в делениях шкалы - зелёный круг
const numDialVal = 12; // количество делений шкалы - зелёный круг
const radiusDividing = 0.30; // множитель для радиуса делений шкалы - зелёный круг
const radiusDialVal = 0.78; // множитель для расположения шкалы по меньшему радиусу
const deg = 6; // 1 шаг деления = 6 градусов

// множители для стрелок
const hourWidth = 0.03; // длина часовой стрелки
const hourHeight = 0.25; // ширина
const minWidth = 0.02; // длина минутной стрелки
const minHeight = 0.30; // ширина
const secWidth = 0.01; // длина секундной стрелки
const secHeight = 0.35; // ширина
	
//getValue();

function getValue() {
	let form = document.forms['form'];
	diameter = Number(form.elements['diameterIn'].value);
	radius = diameter/2;
	console.log('Введённый диаметр: '+diameter+' px');
	form.style.display = 'none';
	console.log(diameter);
	generateClock();
	return false; // отмена отправки формы на сервер
}

function generateClock() {
		// ---------- создаём оранжевый круг для часов ---------- 
	clock = document.createElement('div');
	clock.style.cssText = `width: ${diameter}px; height: ${diameter}px; background-color: orange; border-radius: 50%; text-align: center; box-sizing: border-box; padding-top: ${diameter*textTimePadding}px; position: relative;`;
	let clockCenterX = clock.offsetLeft + radius;
	let clockCenterY = clock.offsetTop + radius;
		// ---------- создаём цифровой текст с реальным временем ----------
	text = document.createElement('span');
	text.id = 'textTime';
	text.style.cssText = `font-size: ${diameter*textTimeScale}px; font-weight: bold;`;
	clock.appendChild(text);
	// ---------- создаём шкалу с делениями для часов ---------- 
	for (let i = 0; i < numDialVal; i++) {
		let dividingEl = document.createElement('div');
		let sizeDividing = radius*radiusDividing;
		dividingEl.style.cssText = `width: ${sizeDividing}px; height: ${sizeDividing}px; position: absolute; background-color: green; border-radius: 50%; display: flex; justify-content: center; flex-direction: column; font-size: ${diameter*textDividingScale}px`;
		dividingEl.textContent = `${i+1}`;
		let angle = ((360/numDialVal)*i+(360/numDialVal))/180*Math.PI;
		const divisionCenterX = clockCenterX + (radius*radiusDialVal)*Math.sin(angle);
		const divisionCenterY = clockCenterY - (radius*radiusDialVal)*Math.cos(angle);
		dividingEl.style.left = `${Math.round(divisionCenterX-sizeDividing/2)}px`;
		dividingEl.style.top = `${Math.round(divisionCenterY-sizeDividing/2)}px`;
		clock.appendChild(dividingEl);
	}
	// ---------- создаём стрелки ---------- 
	let identicalStyle = 'background-color: white; border-radius: 10px; opacity: 0.7; z-index:5; position: absolute; transform-origin: center bottom;'
	pointerHour = document.createElement('div');
	pointerHour.style.cssText = `width: ${diameter*hourWidth}px; height: ${diameter*hourHeight}px; top: calc(50% - ${diameter*hourHeight}px); left: calc(50% - ${diameter*hourWidth/2}px); ${identicalStyle}`;
	clock.appendChild(pointerHour);
	pointerMin = document.createElement('div');
	pointerMin.style.cssText = `width: ${diameter*minWidth}px; height: ${diameter*minHeight}px; top: calc(50% - ${diameter*minHeight}px); left: calc(50% - ${diameter*minWidth/2}px); ${identicalStyle}`;
	clock.appendChild(pointerMin);
	pointerSec = document.createElement('div');
	pointerSec.style.cssText = `width: ${diameter*secWidth}px; height: ${diameter*secHeight}px; top: calc(50% - ${diameter*secHeight}px); left: calc(50% - ${diameter*secWidth/2}px); ${identicalStyle}`;
	clock.appendChild(pointerSec);
	// ---------- отображение часов и запуск в работу ---------- 
	//clock.style.scale = `0.25`; // способ через увеличение
	page.appendChild(clock);
	updateTime();
	setInterval(updateTime,1000);
}

function updateTime() {
	const currTime = new Date();
	const hours = currTime.getHours();
	const minutes = currTime.getMinutes();
	const seconds = currTime.getSeconds();
	console.log(currTime);
	pointerHour.style.setProperty('rotate', `${hours*30+(minutes*deg/12)}deg`);
	pointerMin.style.setProperty('rotate', `${minutes*deg}deg`);
	pointerSec.style.setProperty('rotate', `${seconds*deg}deg`);
	document.getElementById('textTime').innerHTML = str0l(hours,2) + ':' + str0l(minutes,2) + ':' + str0l(seconds,2);
}

function str0l(val,len) {
	let strVal = val.toString();
	while (strVal.length < len)
		strVal = '0' + strVal;
	return strVal;
}