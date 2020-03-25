let team = [];
class DigitController {
    constructor(model) {
        this.model = model;
    }
    checkStr(str) {
        const [action, name] = str.split(' ');
        switch (action) {
            case 'add':
                this.handleModeAdd(name);
                break;
            case 'delete':
                this.handleModeDelete(name);
                break;
            default:
                console.log('Error');
        }
    }
    handleModeAdd(name) {
        this.model.add(name);
    }
    handleModeDelete(name) {
        this.model.delete(name);
    }
}
class Digit {
    constructor(view) {
        this.view = view;
    }
    add(name) {
        team.push(name);
        this.view.handleView();
    }
    delete(name) {
        team = team.filter(item => item !== name);
        this.view.handleView();
    }
    show() { }
}
class DigitView {
    handleView() {
        console.log(team);
    }
}
const view = new DigitView();
const model = new Digit(view);
const controller = new DigitController(model);
controller.checkStr('add Ivan');
controller.checkStr('add Ivan1');
controller.checkStr('delete Ivan');