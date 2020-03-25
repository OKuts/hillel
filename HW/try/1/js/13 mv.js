// const one = document.querySelector('.one');
// one.classList.add('two');
// one.classList.remove('two');
const go = document.querySelector('.one');

go.onclick = function () {
    this.classList.toggle('two');
}