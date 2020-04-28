// У вас есть массив чисел. Нужно отсортировать нечетные числа,
// а четные оставить на своих местах. 
// Например: sortArray([5,3,2,8,1,4]) ==> [1,3,2,8,5 4]
"use strict"
function sortArray(params) {
    let arr = (params.filter((el) => (el % 2))).sort((a, b) => (b - a));
    return (params.map((el) => el % 2 ? (el = arr.pop()) : (el))); // pop  менее затратно
}
console.log([5, 3, 222, 8, 1, 4, 0, 333, 7, 8, 8, 53]);
console.log(sortArray([5, 3, 222, 8, 1, 4, 0, 333, 7, 8, 8, 53])); 