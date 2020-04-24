class Observable {
    constructor() {
        this.subscribers = [];
    }
    subscribe(subscriber) {
        this.subscribers.push(subscriber);
        console.log(this.subscribers);
    }
    broadcast(text) {
        this.subscribers.forEach(subscriber => {
            subscriber.addText(subscriber.link, text);
        })
    }
}
class Subscriber {
    constructor(name) {
        this.name = name;
    }
    addDiv() {
        let div = document.createElement('div')
        document.body.appendChild(div);
        return div
    }
    addText(obj, text) {
        obj.innerText = text;
    }
}
let sum = (function () {
    let remember = 0;
    return function () {
        remember += 1;
        return 'n' + remember;
    }
})();
let subscriber, observer;
observer = new Observable();
const button = document.querySelector('button');
const input = document.querySelector('input');
button.addEventListener('click', () => {
    subscriber = new Subscriber(sum());
    subscriber.link = subscriber.addDiv();
    observer.subscribe(subscriber);
});
input.addEventListener('keyup', (e) => {
    observer.broadcast(input.value);
})
