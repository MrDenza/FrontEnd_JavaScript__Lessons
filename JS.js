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
console.log('Сумма всех значений массива: '+treeSum(mas));*/

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
console.log('Сумма всех значений массива: '+treeSum(mas));