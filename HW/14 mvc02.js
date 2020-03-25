// Создать архитектуру MVC для Human и Animals. Human умеет создавать людей(объекты), добавлять в массив, удалять из массива. Animal имеет те же возможности, что и Human(методы с таким же функционалом). View выодит в консоль человека или животное, которое добавили/удалили и другой метод выводит весь массив. Массив и для людей и для животных один, но люди находятся вначале, животные в конце(животные добавляются в конец, люди в начало). Дергайте контроллер просто вручную(предавая нужные данные просто в метод)
"use strict"
class ShowMission {
    showError() { console.log('input Error') };
    showCreatures(text, name) {
        console.log(text, name);
    }
    showArray() { console.log(creatures); }
}
class HumanModel {
    constructor(view) {
        this.view = view;
    }
    addCreatures(name) {
        name instanceof Animals ? creatures.push(name) : creatures.unshift(name);
        this.view.showCreatures('Add ', name);
    }
    deleteCreatures(deleteItem) {
        let success = false;
        for (let i in creatures) {
            if (creatures[i].name === deleteItem) {
                this.view.showCreatures('Delete ', creatures[i]);
                creatures.splice(i, 1);
                success = true;
            }
        }
        if (!success) this.anotherMisson();
    }
    anotherMisson() { this.view.showError(); }
    showList() { this.view.showArray(); }
}
class Controller {
    constructor(model) {
        this.model = model;
    }
    processCreatures(mission, Obj) {
        let [task, doName] = mission.split(' ');
        switch (task) {
            case 'add':
                this.model.addCreatures(new Obj(doName));
                break;
            case 'delete':
                this.model.deleteCreatures(doName);
                break;
            case 'showList':
                this.model.showList();
                break;
            default:
                this.model.anotherMisson();
        }
    }
}

class Human {
    constructor(name) {
        this.name = name;
    }
}
class Animals extends Human { }

let creatures = [];

const view = new ShowMission();
const model = new HumanModel(view);
const controller = new Controller(model);

controller.processCreatures('add fish', Animals);
controller.processCreatures('add Dan', Human);
controller.processCreatures('add Jan', Human);
controller.processCreatures('add fox', Animals);
controller.processCreatures('add Pop', Human);
controller.processCreatures('delete Jan');
controller.processCreatures('addsssssssssssss Pop', Human);
controller.processCreatures('deletessssssssssss Jan');
controller.processCreatures('showList');
controller.processCreatures('delete fish');
controller.processCreatures('showList');