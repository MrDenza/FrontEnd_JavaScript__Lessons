"use strict"; // Строгий режим
// ----------------------- JavaScript -----------------------
let formDef1=
	[
		{label:'Название сайта:',kind:'longtext',name:'sitename'},
		{label:'URL сайта:',kind:'longtext',name:'siteurl'},
		{label:'Посетителей в сутки:',kind:'number',name:'visitors'},
		{label:'E-mail для связи:',kind:'shorttext',name:'email'},
		{label:'Рубрика каталога:',kind:'combo',name:'division', variants:[{text:'здоровье',value:1},{text:'домашний уют',value:2},{text:'бытовая техника',value:3}]},
		{label:'Размещение:',kind:'radio',name:'payment', variants:[{text:'бесплатное',value:1},{text:'платное',value:2},{text:'VIP',value:3}]},
		{label:'Разрешить отзывы:',kind:'check',name:'votes'},
		{label:'Описание сайта:',kind:'memo',name:'description'},
		{caption:'Опубликовать',kind:'submit'},
	];
let formDef2=
	[
		{label:'Фамилия:',kind:'longtext',name:'lastname'},
		{label:'Имя:',kind:'longtext',name:'firstname'},
		{label:'Отчество:',kind:'longtext',name:'secondname'},
		{label:'Возраст:',kind:'number',name:'age'},
		{caption:'Зарегистрироваться',kind:'submit'},
	];

let formInSite1 = document.getElementById("test1");
let formInSite2 = document.getElementById("test2");
generateForm(formInSite1, formDef1);
generateForm(formInSite2, formDef2);

function generateForm(formIn, formInfo) {
	for (let formInfoEl of formInfo) {
		let addEl = '';
		let newString = document.createElement('br');
		if('label' in formInfoEl){
			addEl = document.createElement('span');
			addEl.textContent = formInfoEl['label'];
			formIn.appendChild(addEl);
		}
		if('kind' in formInfoEl){
			let i = formInfoEl['kind'];
			if (i === 'longtext' || i === 'number' || i === 'shorttext'){
				addEl = document.createElement('input');
				addEl.setAttribute('type', 'text');
			}
			if (i === 'combo'){
				addEl = document.createElement('select');
				addEl.setAttribute('title','list');
				if('variants' in formInfoEl){
					let variantInfo = formInfoEl['variants'];
					for (let varPos of variantInfo) {
						let pos = document.createElement('option');
						pos.textContent = varPos['text'];
						pos.setAttribute('value', varPos['value']);
						addEl.appendChild(pos);
					}
				}
			}
			if (i === 'radio' && 'variants' in formInfoEl){
				let radioInfo = formInfoEl['variants'];
				for (let radioPos of radioInfo) {
					addEl = document.createElement('input');
					addEl.setAttribute('type', 'radio');
					addEl.setAttribute('value', radioPos['value']);
					addEl.setAttribute('name', formInfoEl['name']);
					let addElText = document.createElement('i');
					addElText.textContent = radioPos['text'];
					formIn.appendChild(addEl);
					formIn.appendChild(addElText);
				}
				formIn.appendChild(newString);
				continue;
			}
			if (i === 'check'){
				addEl = document.createElement('input');
				addEl.setAttribute('type', 'checkbox');
			}
			if (i === 'memo'){
				addEl = document.createElement('textarea');
				
			}
			if (i === 'submit'){
				addEl = document.createElement('input');
				addEl.setAttribute('type', 'submit');
				addEl.setAttribute('value', formInfoEl['caption']);
			}
			if ('name' in formInfoEl){
				addEl.setAttribute('name', formInfoEl['name']);
			}
			formIn.appendChild(addEl);
		}
		formIn.appendChild(newString);
	}
}
