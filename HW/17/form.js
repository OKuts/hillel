//--------------------------- функция создание формы ------------------
// document.oncontextmenu = function () {
//     console.log('rrrrrrrrrrrrrrrrrrrr');
//     return false
// }

// const button = document.querySelector('button');
// let count = parseInt(button.innerText);
// function countClick() {
//   button.innerText = count++;
// }

// button.addEventListener('click', countClick);

function changeColor(e) {
    let element = e.target;
    let color = element.innerText;
    element.style.background = color;
}

let div = document.querySelectorAll('div');

div.forEach(item => item.addEventListener('click', changeColor));
