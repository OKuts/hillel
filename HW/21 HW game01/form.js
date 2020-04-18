"use strict"
document.addEventListener('DOMContentLoaded', function () {
    class Result {
        static sayResult() {
            let say = document.createElement('div');
            say.classList.add('say');
            say.innerText = 'Game over!';
            document.body.appendChild(say);
            setTimeout(() => waw(), 2000);
            function waw() {
                say.style.display = 'none';
                document.body.removeChild(say);
            }
        }
    }
    class Field {
        constructor(obj) {
            this.obj = []
        }
        addImages(img) {
            this.obj.push(img);
            img.setPosition(img.pict);
        }
        go(key) {
            let distance, dx, dy;
            this.obj.forEach((elem) => {
                if (key in elem.control) {
                    elem.tryGo(elem, key);
                    dx = this.obj[0].x - this.obj[1].x;  // проверка дистанции пока без универсальности т.к. два героя
                    dy = this.obj[0].y - this.obj[1].y;  // если будет больше то проверку нужно сделать между всеми
                    distance = Math.sqrt(dx * dx + dy * dy);
                    distance > 100 ? elem.setPosition() : Result.sayResult();
                }
            })
        }
    }
    class MyImg {
        constructor(pict, x, y, control) {
            this.pict = pict
            this.x = x
            this.y = y
            this.step = 5
            this.control = control
        }
        tryGo(img, key) {
            let mark, direction;
            let max = 400;
            console.log(img.control[key].slice(0, 1));
            img.control[key].slice(0, 1) === '+' ? mark = 1 : mark = -1;
            direction = img.control[key].slice(1);
            let plusStep = this.step * mark;
            direction === 'top' ? plusStep += parseInt(this.pict.style.top)
                : plusStep += parseInt(this.pict.style.left);
            if (plusStep > max) plusStep = max;
            if (plusStep < 0) plusStep = 0;
            direction === 'top' ? this.y = plusStep : this.x = plusStep;
        }
        setPosition() {
            this.pict.style.left = this.x + 'px';
            this.pict.style.top = this.y + 'px';
        }
    }
    const images = document.querySelectorAll('img');
    const field = new Field();
    const variant = [{ 65: '-left', 83: '+left', 87: '-top', 90: '+top' },
    { 39: '+left', 37: '-left', 38: '-top', 40: '+top' }]
    images.forEach((img, i) => {
        field.addImages(new MyImg(images[i], i * 200 + 100, i * 200 + 100, variant[i]));
    })
    document.body.addEventListener('keydown', (key) => field.go(key.which));
})