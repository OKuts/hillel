let date = new Date();
let mon = [1, 1, 1, 'april'];
let day = [1, 1, 1, 1, 'четверг', 1]
let str = `today ${date.getDate()} 9th of ${mon[date.getMonth()]} and today is a ${day[date.getDay()]}`

console.log(str);