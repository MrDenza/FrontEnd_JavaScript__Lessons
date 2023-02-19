"use strict"; // Строгий режим
// ----------------------- JavaScript -----------------------
let page = document.body;
let diameter; // введённый диаметр циферблата, получаем в function getValue
let radius; // радиус циферблата для позиционирования делений шкалы
let clock;

const textTimeScale = 0.1; // множитель для масштаба текста со временем
const textTimePos = 0.75; // множитель для расположения текста во временем
const textTimePadding = 0.3; // множитель для padding-top текста со временем
const textDividingScale = 0.08; // множитель для масштаба текста в делениях шкалы - зелёный круг
const numDialVal = 12; // количество делений шкалы - зелёный круг
const radiusDividing = 0.17; // множитель для радиуса делений шкалы - зелёный круг
const radiusDialVal = 0.78; // множитель для расположения шкалы по меньшему радиусу
const deg = 6; // 1 шаг деления = 6 градусов

// множители для стрелок
const hourWidth = 0.55; // длина часовой стрелки
const hourHeight = 0.06; // ширина
const minWidth = 0.4; // длина минутной стрелки
const minHeight = 0.03; // ширина
const secWidth = 0.3; // длина секундной стрелки
const secHeight = 0.01; // ширина

//getValue();

function getValue() {
	let form = document.forms['form'];
	diameter = Number(form.elements['diameterIn'].value);
	radius = diameter/2;
	console.log('Введённый диаметр: '+diameter+' px');
	form.style.display = 'none';
	generateClock();
	return false; // отмена отправки формы на сервер
}

function setAttributes(el, attrs) {
	for(let key in attrs) {
		el.setAttribute(key, attrs[key]);
	}
}

function generateClock() {
	clock = document.createElement('div');
	clock.style.cssText = `width: ${diameter}px; height: ${diameter}px; text-align: center; box-sizing: border-box; padding-top: ${diameter*textTimePadding}px; position: relative;`;
	
		// ---------- создаём svg ---------- 
	let svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
	svg.style.cssText = 'position: absolute; top: 0; left: 0;';
	setAttributes(svg,{'id':'clock',
						'width':`${diameter}`,
						'height':`${diameter}`,
						'xmlns': 'http://www.w3.org/2000/svg'});
	
		// ---------- создаём круг в svg ---------- 
	let svgCircle = document.createElementNS('http://www.w3.org/2000/svg','circle');
	setAttributes(svgCircle,{'cx':`${radius}`,
							'cy':`${radius}`,
							'r':`${radius}`,
							'fill':'orange'});
	svg.appendChild(svgCircle);
	
		// ---------- создаём цифровой текст с реальным временем ---------- 
	let svgTextClock = document.createElementNS('http://www.w3.org/2000/svg','text');
	setAttributes(svgTextClock,{'id':'textTime',
								'x':`${radius}`,
								'y':`${radius*textTimePos}`,
								'dominant-baseline':'middle',
								'text-anchor':'middle',
								'font-size':`${diameter*textTimeScale}`});
	svg.appendChild(svgTextClock);
	
		// ---------- создаём шкалу с делениями для часов ---------- 
	for (let i = 0; i < numDialVal; i++) {
		let dividingEl = document.createElementNS('http://www.w3.org/2000/svg','circle');
		let sizeDividing = radius*radiusDividing;
		let angle = ((360/numDialVal)*i+(360/numDialVal))/180*Math.PI;
		let xPos = `${radius + (radius*radiusDialVal)*Math.sin(angle)}`;
		let yPos = `${radius - (radius*radiusDialVal)*Math.cos(angle)}`;
		setAttributes(dividingEl,{'cx':xPos,
							  	 'cy':yPos,
								 'r':`${sizeDividing}`,
								 'fill':'green'});
		svg.appendChild(dividingEl);
		let dividingText = document.createElementNS('http://www.w3.org/2000/svg','text');
		setAttributes(dividingText,{'x':xPos,
									'y':yPos,
									'dominant-baseline':'middle',
									'text-anchor':'middle',
									'font-size':`${diameter*textDividingScale}`});
		dividingText.textContent = `${i+1}`;
		svg.appendChild(dividingText);
	}

		// ---------- создаём стрелки ----------
	let pointerHour = document.createElementNS('http://www.w3.org/2000/svg','line');
	setAttributes(pointerHour,{'id':'hours',
							   'x1':`${radius}`,
							   'y1':`${radius}`,
							   'x2':`${radius}`,
							   'y2':`${radius*hourWidth}`,
							   'stroke-linecap':'round',
							   'stroke-width':`${radius*hourHeight}`,
							   'stroke':'black',
							   'style':'opacity: 0.7;'});
	svg.appendChild(pointerHour);
	let pointerMin = document.createElementNS('http://www.w3.org/2000/svg','line');
	setAttributes(pointerMin,{'id':'minutes',
							  'x1':`${radius}`,
							  'y1':`${radius}`,
							  'x2':`${radius}`,
							  'y2':`${radius*minWidth}`,
							  'stroke-linecap':'round',
							  'stroke-width':`${radius*minHeight}`,
							  'stroke':'black',
		                      'style':'opacity: 0.7;'});
	svg.appendChild(pointerMin);
	let pointerSec = document.createElementNS('http://www.w3.org/2000/svg','line');
	setAttributes(pointerSec,{'id':'seconds',
							  'x1':`${radius}`,
							  'y1':`${radius}`,
							  'x2':`${radius}`,
							  'y2':`${radius*secWidth}`,
							  'stroke-linecap':'round',
							  'stroke-width':`${radius*secHeight}`,
							  'stroke':'white',
							  'style':'opacity: 0.7;'});
	svg.appendChild(pointerSec);
	
		// ---------- отображение часов и запуск в работу ---------- 
	clock.appendChild(svg);
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
	document.querySelector('#hours').setAttribute('transform',` rotate(${hours*30+(minutes*deg/12)} ${radius} ${radius})`);
	document.querySelector('#minutes').setAttribute('transform',` rotate(${minutes*deg} ${radius} ${radius})`);
	document.querySelector('#seconds').setAttribute('transform',` rotate(${seconds*deg} ${radius} ${radius})`);
	document.getElementById('textTime').innerHTML = str0l(hours,2) + ':' + str0l(minutes,2) + ':' + str0l(seconds,2);
}

function str0l(val,len) {
	let strVal = val.toString();
	while (strVal.length < len)
		strVal = '0' + strVal;
	return strVal;
}