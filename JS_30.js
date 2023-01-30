"use strict"; // Строгий режим
// ----------------------- JavaScript -----------------------
window.addEventListener('load',startPosElem,false);
let zInd = 0;
function startPosElem() {
	let imgAll =  document.getElementsByTagName('img');
	for (let i = imgAll.length - 1; i > -1; i--) {
		imgAll[i].style.top = imgAll[i].offsetTop + 'px';
		imgAll[i].style.left = imgAll[i].offsetLeft + 'px';
		//imgAll[i].style.position = 'absolute'; 
		// при указании в этом месте position, значения top изменяются почему-то
	}
	for (let i = imgAll.length - 1; i > -1; i--) {
		// а если здесь, то top как и был изначальный и всё нормально
		imgAll[i].style.position = 'absolute';
	}
}

document.onmousedown = function(eo) {
	eo = eo || window.event;
	let selectElem = eo.target;
	if (selectElem.tagName === 'IMG') {
		let clickMouseX = eo.pageX - selectElem.offsetLeft;
		let clickMouseY = eo.pageY - selectElem.offsetTop;
		selectElem.style.zIndex = zInd;
		window.onmousemove = function(eo){
			eo.preventDefault();
			selectElem.style.top = (eo.pageY - clickMouseY) + 'px';
			selectElem.style.left = (eo.pageX - clickMouseX) + 'px';
		}
		selectElem.onmouseup = function(eo) { 
			window.onmousemove = null;
			zInd++;
		}
	}
}



