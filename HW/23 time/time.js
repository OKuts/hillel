const div = document.createElement('div');
document.body.appendChild(div);
let a;
function onTime(ms) {
    a = setTimeout(() => div.style.background = '#ABF000', ms);
}
function offTime(ms) {
    clearTimeout(a);
    div.style.background = '#CCC'
    onTime(ms);
}
div.addEventListener('mousemove', () => {
    offTime(5000);
});
onTime(5000);
