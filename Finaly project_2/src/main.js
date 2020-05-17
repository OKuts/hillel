"use strict"
class View {

    showReadyTasks(arrTasks, arrClientTasks) {
        let newBlock;
        document.querySelector('.wrap-menu').innerHTML = '';
        arrClientTasks.forEach((el, i) => {
            newBlock = document.createElement('div');
            newBlock.classList.add('task');
            newBlock.classList.add('k' + i);
            newBlock.innerHTML = `<p class ="gray">${el.date}<br></p>
            <p>I need a ${arrTasks[el.task].name.toLowerCase()} 
            to ${ arrTasks[el.task].list[el.prop].toLowerCase()}<br></p>
                <button class="btn1 panel" id=${'e' + i}>Edit</button>
                <button class="btn2 panel" id=${'d' + i}>Delete</button>`
            document.querySelector('.wrap-menu').appendChild(newBlock);
        })
    }
    changeInnerText(ident, text) {
        document.querySelector(ident).innerText = text;
    }
    showDescription([task, comment, location]) {
        document.querySelector('.description').innerHTML = task;
        document.querySelector('#inp2').value = comment;
        document.querySelector('#inp1').value = location;
    }
    showMainMenu(show = -1, btn = true) {
        let flag = show === 1 ? true : false;
        document.querySelector('.main-menu').style.transform = `translate(${show * 505}px,0)`;
        this.changeVisibleDOM([['#done', 'visible', !flag], ['.panel', 'active', flag],
        ['#start', 'active', flag], ['#rewrite', 'visible', !btn], ['#create', 'visible', btn]]);
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
    showLocation(text) {
        document.querySelector('#location').innerText = text;
    }
}

class Model {
    constructor(view) {
        this.view = view//
        this.allTasks = []//
        this.task = 0//
        this.prop = 0//
        this.comment = ''//
        this.location = ''
        this.clientTasks = []//
        this.actualId = 0//
        this.editId = 0
    }
    postDelPutDB(method, url, body = null) {
        const xhr = new XMLHttpRequest();
        xhr.open(method, 'http://localhost:3333' + url);
        if (method != 'delete') xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.onreadystatechange = () => {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                //this.allTasks = JSON.parse(xhr.response);
                console.log('ok');
            }
        }
        xhr.send(JSON.stringify(body));
    }
    registationTask(arr, _id, task, prop, comment, location) {
        let id = arr.length;
        let week = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        let month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
        let date = new Date();
        let hours = parseInt(date.getHours()) < 10 ? '0' + date.getHours() : date.getHours();
        let minutes = parseInt(date.getMinutes()) < 10 ? '0' + date.getMinutes() : date.getMinutes();
        date = week[date.getDay()] + ', ' + month[date.getMonth()] + ', ' + hours + ':' + minutes;
        if (!comment) comment = '';
        arr.push({ _id, task, prop, date, comment, location });
    }
    designTaskMenu(allTasks, task, prop, comment, location) {
        let buffer = '';
        if (task >= 0) {
            buffer = `<div class="actual-task">I need a&nbsp<span class="bold"> ${this.allTasks[task].name.toLowerCase()}</span>`;
            if (prop >= 0) {
                buffer += `&nbsp to &nbsp<span class ="bold">${this.allTasks[task].list[prop].toLowerCase()}</span>`;
                if (comment) buffer += `<span class="bold">${', ' + comment}</span></div>`;
            }

        }
        return [buffer, comment, location];
    }
    openTasks(allTasks, activeTask, activeProp, activeComment = '') {
        let task = '';
        let imgTask = document.getElementById('service');
        allTasks.forEach((el, i) => {
            task += `<div class = "set-task">
                            <div class = "service" id="${'a' + i}" >
                                <img src = "${el.path}" id="${'t' + i}">
                            </div>
                                ${el.name}
                        </div>`;
        })
        imgTask.innerHTML = task;
        document.getElementById('task').innerText = allTasks[activeTask].name.toUpperCase();
        document.getElementById(`${'a' + activeTask}`).style.border = "1px solid gray";
        this.openProp(allTasks[activeTask].list, activeProp);
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
    getMaxId(arr) {
        let max = 0;
        arr.forEach(el => { if (el._id > max) max = el._id });
        return max + 1;
    }
    getData() {
        const config = new Promise((res, rej) => {
            fetch('http://localhost:3333/insTasks')
                .then(data => data.json())
                .then(data => {
                    res(this.allTasks = data);
                })
        })
        const db = new Promise((res, rej) => {
            fetch('http://localhost:3333/loadDB')
                .then(data => data.json())
                .then(data => {
                    res(this.clientTasks = data);
                })
        })
        Promise.all([config, db]).then(data => {
            this.actualId = this.getMaxId(this.clientTasks);
            this.view.showReadyTasks(this.allTasks, this.clientTasks);
        })
    }
    createNewTask() {
        this.task = this.prop = 0;
        this.comment = '';
        this.openTasks(this.allTasks, this.task, this.prop, this.comment);
        this.view.changeInnerText('#new', 'NEW TASK');
        this.view.showDescription(this.designTaskMenu(this.allTasks, 0, 0, '', ''));
        this.view.showMainMenu();
    }
    changeTaskMenu(num, flag) {
        if (flag) {
            this.task = num;
            this.prop = 0;
        } else this.prop = num;
        this.openTasks(this.allTasks, this.task, this.prop);
        this.view.showDescription(this.designTaskMenu(this.allTasks, this.task, this.prop, this.comment, this.location));
    }
    saveNewTask() {
        let n = this.clientTasks.length;
        this.registationTask(this.clientTasks, this.actualId, this.task, this.prop, this.comment, this.location);
        this.actualId += 1;
        this.postDelPutDB('post', '/insDB', this.clientTasks[n]);
        this.view.showReadyTasks(this.allTasks, this.clientTasks);
        this.view.showMainMenu(1, false);

    }
    editTask(num) {
        this.task = this.clientTasks[num].task;
        this.prop = this.clientTasks[num].prop;
        this.comment = this.clientTasks[num].comment;
        this.location = this.clientTasks[num].location;
        this.view.showDescription(this.designTaskMenu(this.allTasks, this.task, this.prop, this.comment, this.location));

        this.openTasks(this.allTasks, this.task, this.prop, this.comment);
        this.view.showMainMenu(-1, false);
        this.view.changeInnerText('#new', 'EDIT TASK');
        this.view.changeVisibleDOM([['.k' + num, 'active', false]]);
        this.editId = num;
    }
    cancelChange() {
        this.view.showMainMenu(1, true);
        this.view.changeVisibleDOM([['.task', 'active', true]]);
    }
    registrationChange(num, flag) {

        if (flag) {
            this.postDelPutDB('delete', '/del/' + this.clientTasks[num]._id);
            this.clientTasks.splice(num, 1);
        } else {
            this.view.showMainMenu(1);
            this.clientTasks[this.editId].task = this.task;
            this.clientTasks[this.editId].prop = this.prop;
            this.clientTasks[this.editId].comment = this.comment;
            this.clientTasks[this.editId].location = this.location;
            this.postDelPutDB('put', '/put/' + this.clientTasks[this.editId]._id, this.clientTasks[this.editId]);
        }
        this.view.showReadyTasks(this.allTasks, this.clientTasks);

    }
    inputText(id) {
        if (id === 'inp1') {
            this.location = document.querySelector('#inp1').value;
            this.view.showLocation(this.location);
        } else {
            this.comment = document.querySelector('#inp2').value;
            this.view.showDescription(this.designTaskMenu(this.allTasks, this.task, this.prop, this.comment, this.location));
        }
    }
}
class Controller {
    constructor(model) {
        this.model = model
    }
    init() {
        this.model.getData();
        this.initEvents();
    }
    initEvents() {
        let element;
        document.querySelector('.map').addEventListener('mouseup', event => {
            element = +event.target.id.slice(1);
            switch (event.target.id[0]) {
                case 's': { this.model.createNewTask(); } break;    //new task
                case 'p': { this.model.changeTaskMenu(element, false); } break; //change prop
                case 'a':
                case 't': { this.model.changeTaskMenu(element, true); } break; //change task
                case 'c': { this.model.saveNewTask(); } break; //create
                case 'e': { this.model.editTask(element) } break; //edit
                case 'd': { this.model.registrationChange(element, true) } break; // delete
                case 'n': { this.model.cancelChange() } break; //not change (cancel) 
                case 'r': { this.model.registrationChange(element, false) } break; //rewriwe change
            }
        })
        document.querySelectorAll('.comment').forEach(el => {
            el.addEventListener('keyup', event => {
                this.model.inputText(event.target.id)
            })
        })
    }
}
const controller = new Controller(new Model(new View()));
controller.init();