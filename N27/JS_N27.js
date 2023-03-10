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

let checkErr = {'developer':elDeveloper,'name':elName,'site':elSite,'date':elDate,'users':elUsers,'email':elEmail,'list':elList,'type':elType,'check':elCheck,'text':elText};
let focusErrEl = [];

elDeveloper.addEventListener('blur',validateForm('developer',elDeveloper),false);
elName.addEventListener('blur',validateForm('name',elName),false);
elSite.addEventListener('blur',validateForm('site',elSite),false);
elDate.addEventListener('blur',validateForm('date',elDate),false);
elUsers.addEventListener('blur',validateForm('users',elUsers),false);
elEmail.addEventListener('blur',validateForm('email',elEmail),false);
elList.addEventListener('change',validateForm('list',elList),false);
elType[0].addEventListener('mousedown',validateForm('type',elType[0]),false);
elType[1].addEventListener('mousedown',validateForm('type',elType[1]),false);
elType[2].addEventListener('mousedown',validateForm('type',elType[2]),false);
elCheck.addEventListener('change',validateForm('check',elCheck),false);
elText.addEventListener('blur',validateForm('text',elText),false);
formInSite.addEventListener('submit',sendForm,false);

function validateForm(valType, valEl) {
	return function(EO) {
		EO = EO || window.event;
		//console.log('Валидация поля: '+ valType);
		valEl.value = valEl.value.trim(); // чистим проблемы в начале и конце
		//------------------------------------------------------------------
		if (valType === 'developer' || valType === 'name' || valType === 'site') {
			if (valEl.value.length < 1) {
				statusPrint(valEl, true, 'Заполните поле корректно! Минимальная длина: 1 символ.');
				return;
			}
			if (valEl.value.length > 50) {
				statusPrint(valEl, true, 'Превышена максимальная длина! Максимальная длина: 50 символов.');

				return;
			}
			statusPrint(valEl, false);
		}
		//------------------------------------------------------------------
		if (valType === 'date') {
			if (valEl.value.length === 0) {
				statusPrint(valEl, true, 'Заполните дату!');
				return;
			}
			statusPrint(valEl, false);
		}
		//------------------------------------------------------------------
		if (valType === 'users') {
			if (Number(valEl.value) === 0) {
				statusPrint(valEl, true, 'Введите корректное значение! Минимум: 1.');
				return;
			}
			statusPrint(valEl, false);
		}
		//------------------------------------------------------------------
		if (valType === 'email') {
			if (valEl.value.length === 0) {
				statusPrint(valEl, true, 'Введите Ваш Email!');
				return;
			}
			if (valEl.value.length < 5 || valEl.value.indexOf('@') === -1 || valEl.value.indexOf('.') === -1) {
				statusPrint(valEl, true, 'Ваш Email не корректный! Пример: w@ro.ru');
				return;
			}
			statusPrint(valEl, false);
		}
		//------------------------------------------------------------------
		if (valType === 'list') {
			if (Number(valEl.value) === 0) {
				statusPrint(valEl, true, 'Выберите рубрику каталога!');
				return;
			}
			statusPrint(valEl, false);
		}
		//------------------------------------------------------------------
		if (valType === 'type') {
			if (valEl.length > 1){
				if (valEl.value === '') {
					statusPrint(valEl[0], true, 'Выберите способ размещения!');
					return;
				}
				let z = Number(valEl.value);
				valEl = valEl[z];
			}
			if (Number(valEl.value) === 1 || Number(valEl.value) === 2) {
				statusPrint(valEl, true, 'Платное или VIP размещение доступно после покупки подписки!');
				return;
			}
			
			statusPrint(valEl, false);
		}
		//------------------------------------------------------------------
		if (valType === 'check') {
			if (valEl.checked === false ) {
				statusPrint(valEl, true, 'Отключить отзывы можно только платно либо по подписке \"VIP\"!');
				return;
			}
			statusPrint(valEl, false);
		}
		//------------------------------------------------------------------
		if (valType === 'text') {
			if (valEl.value.length < 10 || valEl.value.length > 150) {
				statusPrint(valEl, true, 'Заполните поле корректно! Длина описания от 10 до 150 символов.');
				return;
			}
			statusPrint(valEl, false);
		}
	}
}

function statusPrint(el, err, infoText){
	let text = infoText || '';
	let editEL = el.parentNode.getElementsByTagName('i');
	let delErrInMas = focusErrEl.indexOf(el);
	if (err === true) {
		editEL[0].style.color = 'red';
		editEL[0].textContent = 'Error! '+text;
		if (delErrInMas < 0) {
			focusErrEl.push(el);
		}
		//console.log('Ошибка!');
	}
	else if (err === false) {
		editEL[0].style.color = 'green';
		editEL[0].textContent = 'Okay! '+text;
		if (el.type === 'radio'){
			for (let delRadio of elType) {
				(focusErrEl.indexOf(delRadio) > -1) ? focusErrEl.splice(delErrInMas,1) : ''; 
			}
		}
		if (delErrInMas > -1 && !(el.type === 'radio')){
			focusErrEl.splice(delErrInMas,1);
		}
		//console.log('Пройдена!');
	}
	//ПОЛЕЗНЫЙ КОД!
	/*let newEl = document.createElement("i"); 
	(err === true) ? newEl.textContent = "Error!" : newEl.textContent = "Ok!";
	el.parentNode.insertBefore(newEl, el.nextSibling);*/
}

function sendForm(EO) {
	EO = EO || window.event;
	focusErrEl = [];
	for (let checkErrKey in checkErr) {
		validateForm(checkErrKey, checkErr[checkErrKey])(EO);
	}
	if (focusErrEl.length === 0){
		alert('Отправить форму?');
		return;
	}
	focusErrEl[0].focus();
	EO.preventDefault();
	return false;
}