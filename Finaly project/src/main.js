class ClientTask {
    constructor(_id, task, prop, comment, date) {
        this._id = _id
        this.task = task
        this.prop = prop
        this.comment = comment
        this.date = date
    }
}
class View {
    showMainMenu(menu, show) {
        menu.style.transform = `translate(${show * 505}px,0)`;
    }
    openTasks(arrTask, activeTask, activeProp) {
        let task = '';
        let imgTask = document.getElementById('service');
        arrTask.forEach((el, i) => {
            task += `<div class = "set-task">
                            <div class = "service" id="${'a' + i}" >
                                <img src = "${el.path}" id="${'t' + i}">
                            </div>
                                ${el.name}
                        </div>`;
        })
        imgTask.innerHTML = task;
        document.getElementById('task').innerText = arrTask[activeTask].name.toUpperCase();
        document.getElementById(`${'a' + activeTask}`).style.border = "1px solid gray";
        this.openProp(arrTask[activeTask].list, activeProp);
    }
    openProp(arrProp, active) {
        let prop = '';
        let menuProp = document.getElementById('set-task');
        arrProp.forEach((el, i) => {
            prop += `<div class = "prop-task" id ="${'p' + i}">${el}</div>`;
        })
        menuProp.innerHTML = prop;
        document.querySelectorAll('.prop-task')[active].style.border = "1px solid gray";
    }

    showDescription(actualTask) {
        document.querySelector('.description').innerHTML = actualTask;
    }
    showAddTask(text) {
        let newTask = document.createElement('div');
        newTask.classList.add('task');
        newTask.innerHTML = text;
        document.querySelector('.wrap-menu').appendChild(newTask);
    }
    changeVisibleDOM(arr) {
        let elDOM;
        arr.forEach((el, i) => {
            elDOM = document.querySelectorAll(el[0]);
            elDOM.forEach((dom) => {
                !el[2] ? dom.classList.add(el[1]) : dom.classList.remove(el[1])
            })
        })
    }
    changeInnerText(ident, text) {
        document.querySelector(ident).innerText = text;
    }
}
class Model {
    designTaskPanel(arrTasks, oneObj, num) {
        return `${oneObj.date}<br>
                    I need a ${arrTasks[oneObj.task].name.toLowerCase()} 
                    to ${ arrTasks[oneObj.task].list[oneObj.prop].toLowerCase()}<br>
                    <button class="button panel" id=${'e' + num}>Edit</button>
                    <button class="button panel" id=${'d' + num}>Delete</button>`
    }
    designTaskMenu(arrTasks, task, prop, comment) {
        let buffer = '';
        if (task >= 0) {
            buffer = `I need a&nbsp<span class="bold"> ${arrTasks[task].name.toLowerCase()}</span>`;
            if (prop >= 0) {
                buffer += `&nbsp to &nbsp<span class ="bold">${arrTasks[task].list[prop].toLowerCase()}</span>`;
                if (comment) buffer += `<span class="bold">${', ' + comment}</span>`;
            }
        }
        return buffer;
    }
    registationTask(arr, task, prop, comment, _id, ) {
        let id = arr.length;
        let week = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        let month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
        let date = new Date();
        let hours = date.getHours().lenght === 1 ? '0' + date.getHours() : date.getHours();
        let minutes = date.getMinutes().lenght === 1 ? '0' + date.getMinutes() : date.getMinutes();
        date = week[date.getDay()] + ', ' + month[date.getMonth()] + ', ' + hours + ':' + minutes;
        arr.push({ _id, task, prop, date, comment });
    }

    postDeletePutDB(method, url, body = null) {
        const xhr = new XMLHttpRequest();
        xhr.open(method, 'http://localhost:3333' + url);
        //xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.onreadystatechange = () => {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                //this.allTasks = JSON.parse(xhr.response);
                console.log('ok');
            }
        }
        xhr.send(JSON.stringify(body));//
    }
    addTaskDB(obj) {
        const xhr = new XMLHttpRequest();
        xhr.open("POST", 'http://localhost:3333/insDB');
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.onreadystatechange = () => {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                //this.allTasks = JSON.parse(xhr.response);
                console.log('ok');
            }
        }
        xhr.send(JSON.stringify(obj));//
    }
    searcheMaxId(arr) {
        let max = 0;
        arr.forEach(el => { if (el._id > max) max = el._id });
        return max + 1;
    }
    deleteTaskFromArray(arr, num) {
        arr.splice(num, 1);
        document.querySelector('.wrap-menu').innerHTML = '';
    }

}
class Controller {
    constructor(model, view) {
        this.model = model
        this.view = view
        this.allTasks = []
        this.task = 0
        this.prop = 0
        this.comment = ''
        this.clientTasks = []
        this.actualId = 0
    }
    getTasks() {
        const xhr = new XMLHttpRequest();
        xhr.open("GET", 'http://localhost:3333/insTasks', false);
        xhr.onreadystatechange = () => {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                this.allTasks = JSON.parse(xhr.response);
            }
        }
        xhr.send();
        const xhrDB = new XMLHttpRequest();
        xhrDB.onreadystatechange = () => {
            if (xhrDB.readyState === XMLHttpRequest.DONE) {
                this.clientTasks = JSON.parse(xhrDB.response);
            }
        }
        xhrDB.open("GET", 'http://localhost:3333/loadDB', false);
        xhrDB.send();
        this.actualId = this.model.searcheMaxId(this.clientTasks);
        this.clientTasks.forEach((el, i) => {
            this.view.showAddTask(this.model.designTaskPanel(this.allTasks, this.clientTasks[i], i));
        })
        console.log(this.clientTasks)
        this.initClick();

    }
    initClick() {
        let element;
        document.querySelector('.map').addEventListener('mouseup', event => {
            element = event.target.id.slice(1);
            switch (event.target.id[0]) {
                case 's': { //new task
                    this.view.openTasks(this.allTasks, this.task, this.prop);
                    this.view.changeInnerText('#new', 'NEW TASK')
                    this.view.changeVisibleDOM([['#done', 'visible', false], ['.panel', 'active', false],
                    ['#start', 'active', false]])
                    this.view.showDescription(this.model.designTaskMenu(this.allTasks, this.task, this.prop))
                    this.view.showMainMenu(document.querySelector('.main-menu'), -1);
                }
                    break;
                case 'p': { //change task
                    this.prop = parseInt(element);
                    this.view.openTasks(this.allTasks, this.task, this.prop);
                    this.view.showDescription(this.model.designTaskMenu(this.allTasks, this.task, this.prop, this.comment))
                }
                    break;
                case 'a':
                case 't': { //change prop
                    this.task = parseInt(element);
                    this.view.openTasks(this.allTasks, this.task, this.prop);
                    this.view.showDescription(this.model.designTaskMenu(this.allTasks, this.task, this.prop, this.comment))
                }
                    break;
                case 'c': { //create
                    this.model.registationTask(this.clientTasks, this.task, this.prop, this.comment, this.actualId);
                    this.actualId += 1;
                    this.model.addTaskDB(this.clientTasks[this.clientTasks.length - 1]);
                    this.view.showAddTask(this.model.designTaskPanel(this.allTasks, this.clientTasks[this.clientTasks.length - 1], this.clientTasks.length - 1));
                    this.view.showMainMenu(document.querySelector('.main-menu'), 1);
                    this.task = this.prop = 0;
                    this.comment = '';
                    this.view.showDescription('');
                    document.querySelector('#set-task').innerHTML = '';
                    document.querySelector('.service-type').innerHTML = '';
                    document.querySelector('.comment').value = '';
                    this.view.changeVisibleDOM([['.panel', 'active', true]])
                }
                    break;
                case 'e': { //edit
                    this.view.showDescription(this.model.designTaskMenu(this.allTasks, this.clientTasks[element].task, this.clientTasks[element].prop));
                    this.view.openTasks(this.allTasks, this.clientTasks[element].task, this.clientTasks[element].prop);
                    document.querySelector('.comment').value = this.clientTasks[element].comment;
                    this.view.changeInnerText('#new', 'EDIT TASK')
                    this.view.showMainMenu(document.querySelector('.main-menu'), -1);
                    this.view.changeVisibleDOM([['.new-task', 'active', false], ['#create', 'visible', false],
                    ['.panel', 'active', false], ['#done', 'visible', true]])
                }
                    break;
                case 'd': { // done change
                    console.log(this.clientTasks[element], element);
                    this.model.postDeletePutDB('delete', '/del/' + this.clientTasks[element]._id)
                    this.model.deleteTaskFromArray(this.clientTasks, element);
                    this.clientTasks.forEach((el, i) => {
                        this.view.showAddTask(this.model.designTaskPanel(this.allTasks, this.clientTasks[i], i));
                    })
                }
                    break;
                case 'n': { //cancel
                    this.view.changeVisibleDOM([['.panel', 'active', true], ['.new-task', 'active', true]]);
                    this.view.showMainMenu(document.querySelector('.main-menu'), 1);
                }
                    break;
            }
        })
        document.querySelector('.comment').addEventListener('keyup', (event, i) => {
            this.comment = document.querySelector('.comment').value;
            this.view.showDescription(this.model.designTaskMenu(this.allTasks, this.task, this.prop, this.comment))
        });
    }
}
controller = new Controller(new Model(), new View());
controller.getTasks();
