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
class MyImg {
    constructor(pict, x, y) {
        this.pict = pict
        this.x = x
        this.y = y
        this.step = 5
    }
    tryGo(direction, mark) {
        let plusStep = this.step * mark;
        direction === 'top' ? plusStep += parseInt(this.pict.style.top)
            : plusStep += parseInt(this.pict.style.left);
        let max = 400;
        if (plusStep > max) plusStep = max;
        if (plusStep < 0) plusStep = 0;
        let dx = img1.x - img2.x;
        let dy = img1.y - img2.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        this.setPosition();
        if (distance > 100) {
            direction === 'top' ? this.y = plusStep : this.x = plusStep;
            this.setPosition();
        } else Result.sayResult();
    }
    setPosition() {
        this.pict.style.left = this.x + 'px';
        this.pict.style.top = this.y + 'px';
    }
}
const images = document.querySelectorAll('img');
img2 = new MyImg(images[0], 100, 200);
img1 = new MyImg(images[1], 300, 200);
img1.setPosition();
img2.setPosition();
document.body.addEventListener('keydown', (key) => {
    switch (parseInt(key.which)) {
        case 39: img1.tryGo('left', 1); break;
        case 37: img1.tryGo('left', -1); break;
        case 38: img1.tryGo('top', -1); break;
        case 40: img1.tryGo('top', 1); break;
        case 83: img2.tryGo('left', 1); break;
        case 65: img2.tryGo('left', -1); break;
        case 87: img2.tryGo('top', -1); break;
        case 90: img2.tryGo('top', 1); break;
    }
})