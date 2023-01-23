"use strict"; // Строгий режим
// ----------------------- JavaScript -----------------------
let formInSite =  document.forms['form'];

let elDeveloper = formInSite.elements['developer'];
let elName = formInSite.elements['name'];
let elSite = formInSite.elements['site'];
let elDate = formInSite.elements['date'];
let elUsers = formInSite.elements['users'];
let elEmail = formInSite.elements['email'];
let elList = formInSite.elements['list'];
let elType = formInSite.elements['type'];
let elCheck = formInSite.elements['check'];
let elText = formInSite.elements['text'];
let elRun = formInSite.elements['run'];

elDeveloper.addEventListener('blur',validateDev('developer',elDeveloper),false);
function validateDev(valType, valEl) {
	return function(EO) {
		EO = EO || window.event;
		console.log('Событие: '+ EO);
		console.log('Тип валидации: '+ valType);
		console.log('Элемент: '+ valEl);
		
		if (valType === 'developer') {
			if (valEl.value.length === 0){
				console.log('err');
				statusPrint(valEl, true);
			}
			else{
				statusPrint(valEl, false);
				console.log('good');
			}
		}
	}
}

function statusPrint(el, err){
	let editEL = el.parentNode.getElementsByTagName('i');
	if (err === true) {
		editEL[0].style.color = 'red';
		editEL[0].textContent = 'Error!';
	}
	else if (err === false) {
		editEL[0].style.color = 'green';
		editEL[0].textContent = 'Okay!';
	}
	//ПОЛЕЗНЫЙ КОД!
	/*let newEl = document.createElement("i"); 
	(err === true) ? newEl.textContent = "Error!" : newEl.textContent = "Ok!";
	el.parentNode.insertBefore(newEl, el.nextSibling);*/
}
