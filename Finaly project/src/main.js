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
        console.log(arrTask, activeTask, activeProp);
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
}
class Model {
    designTaskPanel(arrTasks, arrClient, id) {
        return `${arrClient[id].date}<br>
                    I need a ${arrTasks[arrClient[id].task].name.toLowerCase()} 
                    to ${ arrTasks[arrClient[id].task].list[arrClient[id].task].toLowerCase()}<br>
                    <button id=${'e' + id}>Edit</button><button id=${'d' + id}>Delete</button>`
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
    registationTask(arr, task, prop, comment, _id) {
        let id = arr.length;
        let week = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        let month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
        let date = new Date();
        let hours = date.getHours().lenght === 1 ? '0' + date.getHours() : date.getHours();
        let minutes = date.getMinutes().lenght === 1 ? '0' + date.getMinutes() : date.getMinutes();
        date = week[date.getDay()] + ', ' + month[date.getMonth()] + ', ' + hours + ':' + minutes;

        arr.push(new ClientTask(_id, task, prop, comment, date));
    }
    postDeletePutDB(method, url, body = null) {
        console.log(method, url, body);
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
        arr.forEach(el => { if (el.orederId > max) max = el._id });
        return max;
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
            this.view.showAddTask(this.model.designTaskPanel(this.allTasks, this.clientTasks, i));
        })
        this.initClick();

    }
    initClick() {
        document.querySelector('.map').addEventListener('click', event => {
            switch (event.target.id[0]) {
                case 's': {
                    this.view.openTasks(this.allTasks, this.task, this.prop);
                    this.view.showMainMenu(document.querySelector('.main-menu'), -1);
                    this.view.showDescription(this.model.designTaskMenu(this.allTasks, this.task, this.prop))

                }
                    break;
                case 'p': {
                    this.prop = parseInt(event.target.id.slice(1));
                    this.view.openTasks(this.allTasks, this.task, this.prop);
                    this.view.showDescription(this.model.designTaskMenu(this.allTasks, this.task, this.prop, this.comment))
                }
                    break;
                case 'a':
                case 't': {
                    this.prop = 0;
                    this.task = parseInt(event.target.id.slice(1));
                    this.view.openTasks(this.allTasks, this.task, this.prop);
                    this.view.showDescription(this.model.designTaskMenu(this.allTasks, this.task, this.prop, this.comment))
                }
                    break;
                case 'c': {
                    if (this.prop >= 0) {
                        this.model.registationTask(this.clientTasks, this.task, this.prop, this.comment, this.actualId);
                        this.actualId += 1;
                        this.model.addTaskDB(this.clientTasks[this.clientTasks.length - 1]);
                        this.view.showAddTask(this.model.designTaskPanel(this.allTasks, this.clientTasks, this.clientTasks.length - 1));
                        this.view.showMainMenu(document.querySelector('.main-menu'), 1);
                        this.task = this.prop = 0;
                        this.comment = '';
                        this.view.showDescription('');
                        document.querySelector('#set-task').innerHTML = '';
                        document.querySelector('.service-type').innerHTML = '';
                        document.querySelector('.comment').value = '';
                    }
                }
                    break;
                case 'e': {

                }
                    break;
                case 'd': {
                    this.model.deleteTaskFromArray(this.clientTasks, event.target.id.slice(1));
                    this.clientTasks.forEach((el, i) => {
                        this.view.showAddTask(this.model.designTaskPanel(this.allTasks, this.clientTasks, i));
                    })
                    console.log(this.clientTasks[event.target.id.slice(1)]);
                    this.model.postDeletePutDB('delete', '/del/' + this.clientTasks[event.target.id.slice(1)]._id)
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
