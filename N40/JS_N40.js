"use strict"; // Строгий режим
// ----------------------- JavaScript -----------------------
let page = document.body;
let diameter = 500; // введённый диаметр циферблата, получаем в function getValue
let radius; // радиус циферблата для позиционирования делений шкалы
let clock;

const textTimeScale = 0.2; // множитель для масштаба текста со временем
const textTimePos = 0.75; // множитель для расположения текста во временем
const textDividingScale = 0.08; // множитель для масштаба текста в делениях шкалы - зелёный круг
const numDialVal = 12; // количество делений шкалы - зелёный круг
const radiusDividing = 0.17; // множитель для радиуса делений шкалы - зелёный круг
const radiusDialVal = 0.78; // множитель для расположения шкалы по меньшему радиусу
const deg = 6; // 1 шаг деления = 6 градусов

// множители для стрелок
const lengthArrowHour = 0.4; // длина часовой стрелки
const hourHeight = 0.06; // ширина 
const lengthArrowMin = 0.5; // длина минутной стрелки
const minHeight = 0.03; // ширина
const lengthArrowSec = 0.6; // длина секундной стрелки
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

function generateClock() {
	if (!document.getElementById('clockBox')){
		clock = document.createElement('div');
		clock.id = 'clockBox';
		clock.style.cssText = `width: ${diameter}px; height: ${diameter}px; text-align: center; box-sizing: border-box; position: relative;`;
	}
		// ---------- создаём canvas ----------
	let canv = document.createElement('canvas');
	let canvContext = canv.getContext('2d');
	canv.setAttribute('id','canvasOnSite');
	canv.setAttribute('width',`${diameter}`);
	canv.setAttribute('height',`${diameter}`);
		// ---------- рисуем окружность ---------- 
	canvContext.fillStyle = 'orange';
	canvContext.beginPath();
	canvContext.arc(radius,radius,radius,0,Math.PI*2,false);
	canvContext.fill();
		// ---------- создаём цифровой текст с реальным временем ----------
	canvContext.fillStyle = 'black';
	canvContext.font = `normal ${radius*textTimeScale}px Arial`;
	canvContext.textAlign = 'center';
	canvContext.textBaseline = 'middle';
	canvContext.fillText(`${getTime()}`, radius, radius*textTimePos);
		// ---------- создаём шкалу с делениями для часов ----------
	for (let i = 0; i < numDialVal; i++) {
		let angle = ((360/numDialVal)*i+(360/numDialVal))/180*Math.PI;
		let xPos = radius + (radius*radiusDialVal)*Math.sin(angle);
		let yPos = radius - (radius*radiusDialVal)*Math.cos(angle);
		canvContext.fillStyle = 'green';
		canvContext.beginPath();
		canvContext.arc(xPos,yPos,radius*radiusDividing,0,Math.PI*2,false);
		canvContext.fill();

		canvContext.fillStyle = 'black';
		canvContext.font = `normal ${diameter*textDividingScale}px Arial`;
		canvContext.textAlign = 'center';
		canvContext.textBaseline = 'middle';
		canvContext.fillText(`${i+1}`, xPos, yPos);
	}
		// ---------- создаём стрелки ----------
	canvContext.strokeStyle = 'black';
	canvContext.lineCap='round';

	let angle = (360/12*(getTime('hours')+getTime('minutes')/60))/180*Math.PI;
	let xPos = radius + (radius*lengthArrowHour)*Math.sin(angle);
	let yPos = radius - (radius*lengthArrowHour)*Math.cos(angle);
	canvContext.lineWidth = radius*hourHeight;
	canvContext.beginPath();
	canvContext.moveTo(radius,radius);
	canvContext.lineTo(xPos,yPos);
	canvContext.stroke();
	
	angle = (deg*getTime('minutes'))/180*Math.PI;
	xPos = radius + (radius*lengthArrowMin)*Math.sin(angle);
	yPos = radius - (radius*lengthArrowMin)*Math.cos(angle);
	canvContext.lineWidth = radius*minHeight;
	canvContext.beginPath();
	canvContext.moveTo(radius,radius);
	canvContext.lineTo(xPos,yPos);
	canvContext.stroke();
	
	angle = (deg*getTime('seconds'))/180*Math.PI;
	xPos = radius + (radius*lengthArrowSec)*Math.sin(angle);
	yPos = radius - (radius*lengthArrowSec)*Math.cos(angle);
	canvContext.strokeStyle = 'white';
	canvContext.lineWidth = radius*secHeight;
	canvContext.beginPath();
	canvContext.moveTo(radius,radius);
	canvContext.lineTo(xPos,yPos);
	canvContext.stroke();
		// ---------- отображение часов и запуск в работу ----------
	let canvOld = document.getElementById('canvasOnSite');
	if (!canvOld){
		clock.appendChild(canv);
		page.appendChild(clock);
	}
	else {
		clock.replaceChild(canv,canvOld);
	}
	setTimeout(generateClock,1010-getTime('millisec'));
}

function getTime(keyInfo) {
	const currTime = new Date();
	const hours = currTime.getHours();
	const minutes = currTime.getMinutes();
	const seconds = currTime.getSeconds();
	const millisecond = currTime.getMilliseconds();
	switch (keyInfo) {
		case 'hours': return hours;
		case 'minutes': return minutes;
		case 'seconds': return seconds;
		case 'millisec': return millisecond;
		default:
			console.log(currTime);
			return str0l(hours,2) + ':' + str0l(minutes,2) + ':' + str0l(seconds,2);
	}
}

function str0l(val,len) {
	let strVal = val.toString();
	while (strVal.length < len)
		strVal = '0' + strVal;
	return strVal;
}