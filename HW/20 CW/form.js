class Observable {
    constructor() {
        this.subscribers = [];
    }

    subscribe(subscriber) {
        this.subscribers.push(subscriber);
    }

    broadcast(item) {
        this.subscribers.forEach(subscriber => {
            subscriber.notify(item);
        })
    }
}

class Subscriber {
    constructor(name) {
        this.name = name;
    }

    notify(event) {
        console.log(`${this.name} notified about ${event}`);
    }
}

const ivan = new Subscriber('Ivan');
const max = new Subscriber('Max');

const observer = new Observable();

observer.subscribe(max);
observer.subscribe(ivan);


const button = document.querySelector('button');

button.addEventListener('click', () => observer.broadcast('hello Pattern'))