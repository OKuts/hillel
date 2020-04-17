const $img1 = $('img.a1');
const $img2 = $('img.a2');
$(document).keydown((key) => {
    console.log(key.which)
    switch (parseInt(key.which)) {
        case 39: x1 = tryGo($img1, 'left', 5); break;
        case 37: x1 = tryGo($img1, 'left', -5); break;
        case 38: y1 = tryGo($img1, 'top', -5); break;
        case 40: y1 = tryGo($img1, 'top', 5); break;
        case 83: x2 = tryGo($img2, 'left', 5); break;
        case 65: x2 = tryGo($img2, 'left', -5); break;
        case 87: y2 = tryGo($img2, 'top', -5); break;
        case 90: y2 = tryGo($img2, 'top', 5); break;
    }
})
function tryGo(obj, direction, step) {
    let plusStep = parseInt(obj.css(direction)) + step;
    let max = 400;
    if (plusStep > max) plusStep = max;
    if (plusStep < 0) plusStep = 0;
    obj.css(direction, plusStep + 'px');

}

