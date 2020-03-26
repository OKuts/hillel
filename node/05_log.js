var fs = require('fs');
const format = require('node.date-time');
function logTime() {
    return new Date().format('Y-MM-dd hh:mm:SS') + ' ';
}
fs.appendFile('readme.log', logTime() + 'yes' + '\n', function (error) {

    if (error) throw error; // если возникла ошибка
    console.log("Асинхронная запись файла завершена. Содержимое файла:");
    // let data = fs.readFileSync("hello.txt", "utf8");
    // console.log(data);  // выводим считанные данные
})
console.log(logTime());