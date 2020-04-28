// Напишите простой парсер, который имеет 4 команды:
// i - увеличивает число на 1, 
// d - уменьшает на 1, 
// s - возводит в квадрат число, 
// o - возвращает число внутри массива. 
// Например: parse("iiisdoso") => [8] остальные символы игнорятся
"use strict"
function parse(key) {
    let num;
    (typeof key) === 'string' ? num = 0 : key = '';
    key = key.split('').filter(el => /idso/).slice(0, key.indexOf('o') + 1);
    key.forEach(letter => {
        switch (letter) {
            case 'i':
                num++;
                break;
            case 'd':
                num--;
                break;
            case 's':
                num *= num;
                break;
        }
    })
    return num ? [num] : 'Ошибка исходных данных';
}
console.log(parse("iiisdoso")); //ок
console.log(parse("iiisd"));    // нет "О"
console.log(parse("35464765")); // нет ничего подходящего
console.log(parse("3546o4765"));// только "О"
console.log(parse("3i46o4765"));// ок
console.log(parse(88888));      // не стринг
console.log(parse(true));       // не стринг
console.log(parse(''));       // пустая строка