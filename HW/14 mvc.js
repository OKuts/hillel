// Создать архитектуру MVC для Human и Animals. Human умеет создавать людей(объекты), добавлять в массив, удалять из массива. Animal имеет те же возможности, что и Human(методы с таким же функционалом). View выодит в консоль человека или животное, которое добавили/удалили и другой метод выводит весь массив. Массив и для людей и для животных один, но люди находятся вначале, животные в конце(животные добавляются в конец, люди в начало). Дергайте контроллер просто вручную(предавая нужные данные просто в метод)
class ShowMission {
    sohowError() { console.log('input Error') };
    showCreatures(text) {
        console.log(text, this);
    }
}
class HumanModel extends ShowMission {
    addCreatures(arrCreatures) {
        this instanceof Animals ? arrCreatures.push(this) : arrCreatures.unshift(this);
        this.showCreatures('Add');
    }
    deleteCreatures(arrCreatures, delCreature) {
        let sucsses = false;
        for (let i in arrCreatures) {
            if (arrCreatures[i].name === delCreature) {
                this.showCreatures(`Delete`);
                arrCreatures.splice(i, 1);
            }
        }
        if (sucsses) this.anotherMisson();
    }
    anotherMisson() { this.sohowError(); }
}

class Human extends HumanModel {
    constructor(name) {
        super();
        this.name = name;
    }
    processCreatures(mission, arrCreatures) {
        let [task, doName] = mission.split(' ');
        switch (task) {
            case 'add':
                this.addCreatures(arrCreatures);
                break;
            case 'delete':
                this.deleteCreatures(arrCreatures, doName);
                break;
            default:
                this.model.anotherMisson();
        }
    }
}
class Animals extends Human {
}

let creator, creatures = [];
creator = new Human('Ivan');
creator.processCreatures('add', creatures);
creator = new Animals('wolf');
creator.processCreatures('add', creatures);
creator = new Human('Dick');
creator.processCreatures('add', creatures);
creator = new Animals('fox');
creator.processCreatures('add', creatures);
creator = new Animals('fox1');
creator.processCreatures('add', creatures);
creator.processCreatures('delete fox1', creatures);
console.log(creatures);