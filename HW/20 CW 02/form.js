// let date = new Date();
// let mon = [1, 1, 1, 'april'];
// let day = [1, 1, 1, 1, 'четверг', 1]
// let str = `today ${date.getDate()} 9th of ${mon[date.getMonth()]} and today is a ${day[date.getDay()]}`

// console.log(str);
//---------------------------------------------------------------
// import "./styles.css";

// class Observable {
//     constructor() {
//         this.subscribers = [];
//     }

//     subscribe(subscriber) {
//         this.subscribers.push(subscriber);
//     }

//     broadcast(item) {
//         this.subscribers.forEach(subscriber => {
//             subscriber.notify(item);
//         })
//     }
// }

// class Subscriber {
//     constructor(name) {
//         this.name = name;
//     }

//     notify(event) {
//         console.log(`${this.name} notified about ${event}`);
//     }
// }

// const ivan = new Subscriber('Ivan');
// const max = new Subscriber('Max');

// const observer = new Observable();

// observer.subscribe(max);
// observer.subscribe(ivan);


// const button = document.querySelector('button');

// button.addEventListener('click', () => observer.broadcast('hello Pattern'))
//-----------------------------------------------------------------
class Observer {
    update(args) {
        document.querySelector("#console").innerText = args;
    }
}

class Observer2 {
    update(args) {
        alert(args);
    }
}

class Subject {
    constructor() {
        this.observers = [];
    }

    addObserver(observer) {
        this.observers.push(observer);
    }

    trigger(args) {
        this.observers.forEach(item => {
            item.update(args);
        });
    }
}

let s = new Subject();
let o = new Observer();
let o2 = new Observer2();

s.addObserver(o);
s.addObserver(o2);

document.querySelector("#range").onchange = e => {
    s.trigger(e.target.value);
};

