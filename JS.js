//
/*let mas = [1, 20, [3, 2], 4, 2];

function treeSum(sum, len) {
    let sumResult = 0;
    let lenDop = sum.length - 1;
    if (typeof(sum[len]) === "object") {
        let masDop = sum[len];
        let lenDopMas = masDop.length - 1;
        console.log('obj + ' + masDop[lenDopMas]);
        return sumResult + masDop[lenDopMas] + treeSum(masDop, --lenDopMas);
    }
    if (len === -1){
        return 0;
    }
    console.log('sum + ' + sum[len]);
    return sumResult + sum[len] + treeSum(sum, --len);
}
console.log('Сумма всех значений массива: '+treeSum(mas));

let mas = [ 5, 7, [ 4, [2], 8, [1, 3], 2 ], [ 9, [] ], 1, 8];
function treeSum(sum) {
    let sumResult = 0;
    for (let element of sum){
        if (typeof element === 'object'){
            sumResult += treeSum(element);
        }
        else {
            sumResult += element;
        }
    }
    return sumResult;
}
console.log('Сумма всех значений массива: '+treeSum(mas));*/

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


function generateForm() {

}
let forma = document.getElementsByTagName("form");
