// Создайте класс Animals, который умеет создавать животных, 
// добавлять их в массив, удалять из массива по имени животного. 
// Класс WatchAnimals, у которого есть методы watchCreate и watchDelete, 
// которые вызываются при добавлении и удалении животных из массива 
// и запускают методы showCreate и showDelete из класса Show. 
// эти методы выводят в консоль добавленные или удалённый объект 
// соответственно.

class Show {
    showCreate(animal) {
        console.log('Добавленное животное: ' + animal );
    }
    showDelete(animal) {
        console.log('Удаленное животное: ' + animal );
    }
}
class WatchAnimals extends Show {

}
class Animals extends WatchAnimals {
    constructor(animal, arrAnimal){
        super(animal, arrAnimal);
    }
    watchCreate(animal, arrAnimal){
        arrAnimal.push(animal);
        this.showCreate(animal);
    }
    watchDelete(animal, arrAnimal) {
        if (arrAnimal.indexOf(animal) != -1) {
            this.showDelete(arrAnimal.splice(arrAnimal.indexOf(animal),1));
        }
    }
}
let zoo = [];
let zoo1 = [];
let animal = new Animals();
animal.watchCreate('Fish', zoo);
animal.watchCreate('Fox', zoo);
animal.watchCreate('Bear', zoo);
animal.watchCreate('Wolf', zoo);
animal.watchDelete('Fish', zoo);
zoo.push('bee')
animal.watchCreate('Car', zoo1);
animal.watchCreate('Fox', zoo1);
animal.watchCreate('Bear', zoo1);
animal.watchCreate('Wolf', zoo);
animal.watchDelete('Fish', zoo1);
console.log(zoo);
console.log(zoo1);
console.log(animal);