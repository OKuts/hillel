function foo(one) {
    return function (two) {
        return function foo(three) {
            return one + two + three;
        }
    }
}
console.log(foo(1)(2)(3));