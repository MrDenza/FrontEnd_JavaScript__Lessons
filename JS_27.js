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

let elDeveloperErr, elNameErr, elSiteErr, elDateErr, elUsersErr, elEmailErr, elListErr, elTypeErr, elCheckErr, elTextErr;
elDeveloperErr = elNameErr = elSiteErr = elDateErr = elUsersErr = elEmailErr = elListErr = elTypeErr = elCheckErr = elTextErr = true;

elDeveloper.addEventListener('blur',validateForm('developer',elDeveloper),false);
elName.addEventListener('blur',validateForm('name',elName),false);
elSite.addEventListener('blur',validateForm('site',elSite),false);
elDate.addEventListener('blur',validateForm('date',elDate),false);
elUsers.addEventListener('blur',validateForm('users',elUsers),false);
elEmail.addEventListener('blur',validateForm('email',elEmail),false);
elList.addEventListener('blur',validateForm('list',elList),false);
elType[0].addEventListener('click',validateForm('type',elType[0]),false);
elType[1].addEventListener('click',validateForm('type',elType[1]),false);
elType[2].addEventListener('click',validateForm('type',elType[2]),false);
elCheck.addEventListener('blur',validateForm('check',elCheck),false);
elText.addEventListener('blur',validateForm('name',elText),false);
formInSite.addEventListener('submit',sendForm,false);

function validateForm(valType, valEl) {
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

function sendForm(EO) {
	EO = EO || window.event;
	//EO.preventDefault();
}