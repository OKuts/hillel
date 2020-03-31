var calc = function (n) {
    if (n > 10) {
        throw new Error();
    }
    return n + 10;
}

try {
    calc(11);
} catch (e) {
    console.log('Все пропало');
} finally {
    console.log('Все одно будь уважнішим');
}