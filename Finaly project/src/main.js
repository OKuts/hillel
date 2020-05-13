document.addEventListener('DOMContentLoaded', function () {
    class ClientTask {
        constructor(id, task, prop, comment, time, status) {
            this.id = id
            this.task = task
            this.prop = prop
            this.comment = comment
            this.time = time
            this.status = status
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
                                <img src = "${el.path}" id="${'d' + i}">
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
            newTask.innerHTML = text + '<button class="edit" id="edit">EDIT</button><button id="delete">Delete</button>';
            document.querySelector('.wrap-menu').appendChild(newTask);
        }
    }
    class Model {
        designTaskPanel(arrTasks, arrClient, id) {
            return `${arrClient[id].time}<br>
                    I need a ${arrTasks[arrClient[id].task].name.toLowerCase()} 
                    to ${ arrTasks[arrClient[id].task].list[arrClient[id].task].toLowerCase()}<br>`
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
        registationTask(arr, task, prop, comment) {
            let id = arr.length;
            let week = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
            let month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
            let date = new Date();
            let hours = date.getHours().lenght === 1 ? '0' + date.getHours() : date.getHours();
            let minutes = date.getMinutes().lenght === 1 ? '0' + date.getMinutes() : date.getMinutes();
            date = week[date.getDay()] + ', ' + month[date.getMonth()] + ', ' + hours + ':' + minutes;
            arr.push(new ClientTask(id, task, prop, comment, date, status));
            return id;
        }
        clearInit() {

        }
    }
    class Controller {
        constructor(model, view) {
            this.model = model
            this.view = view
            this.tasks = []
            this.task = 0
            this.prop = 0
            this.comment = ''
            this.clientTasks = []
            this.actualId = -1
        }
        getTasks() {
            const xhr = new XMLHttpRequest();
            const url = 'http://localhost:3333/ins';
            xhr.open('get', url);
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.onreadystatechange = () => {
                if (xhr.readyState === XMLHttpRequest.DONE) {
                    this.tasks = JSON.parse(xhr.response);
                    this.view.openTasks(this.tasks, this.task, this.prop);
                }
            }
            xhr.send();
            this.initClick();
        }
        initClick() {
            document.querySelector('.map').addEventListener('click', event => {
                switch (event.target.id[0]) {
                    case 's': {
                        this.view.openTasks(this.tasks, this.task, this.prop);
                        this.view.showMainMenu(document.querySelector('.main-menu'), -1);
                        this.view.showDescription(this.model.designTaskMenu(this.tasks, this.task, this.prop))
                    }
                        break;
                    case 'p': {
                        this.prop = parseInt(event.target.id.slice(1));
                        this.view.openTasks(this.tasks, this.task, this.prop);
                        this.view.showDescription(this.model.designTaskMenu(this.tasks, this.task, this.prop, this.comment))
                    }
                        break;
                    case 'a':
                    case 'd': {
                        this.prop = 0;
                        this.task = parseInt(event.target.id.slice(1));
                        this.view.openTasks(this.tasks, this.task, this.prop);
                        this.view.showDescription(this.model.designTaskMenu(this.tasks, this.task, this.prop, this.comment))
                    }
                        break;
                    case 'c': {
                        if (this.prop >= 0) {
                            this.actualId = this.model.registationTask(this.clientTasks, this.task, this.prop, this.comment);
                            this.view.showAddTask(this.model.designTaskPanel(this.tasks, this.clientTasks, this.actualId));
                            this.view.showMainMenu(document.querySelector('.main-menu'), 1);
                            this.task = this.prop = this.actualId = 0;
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
                }
            })
            document.querySelector('.comment').addEventListener('keyup', (event, i) => {
                this.comment = document.querySelector('.comment').value;
                this.view.showDescription(this.model.designTaskMenu(this.tasks, this.task, this.prop, this.comment))
            });
        }
    }
    controller = new Controller(new Model(), new View());
    controller.getTasks();
})