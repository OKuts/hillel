document.addEventListener('DOMContentLoaded', function () {
    class ClientTask {
        constructor(id, task, prop, comment) {
            this.id = id
            this.task = task
            this.prop = prop
            this.comment = comment
        }
    }
    class View {
        showMainMenu(menu, show) {
            menu.style.transform = `translate(${show * 505}px,0)`;
        }
        // changeInput(id, input) {
        //     let i = id === 'location' ? 0 : 1;
        //     document.getElementById(id).innerText = input[i].value;
        // }
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
            console.log(arrTask, activeTask, activeProp);
            if (activeTask >= 0) {
                document.getElementById('task').innerText = arrTask[activeTask].name.toUpperCase();
                document.getElementById(`${'a' + activeTask}`).style.border = "1px solid gray";
                this.openProp(arrTask[activeTask].list, activeProp);
            }

        }
        openProp(arrProp, active) {
            let prop = '';
            let menuProp = document.getElementById('set-task');
            arrProp.forEach((el, i) => {
                prop += `<div class = "prop-task" id ="${'p' + i}">${el}</div>`;
            })
            menuProp.innerHTML = prop;
            if (active >= 0) document.querySelectorAll('.prop-task')[active].style.border = "1px solid gray";
        }
        showDescription(actualTask) {
            document.querySelector('.description').innerHTML = actualTask;
        }
        showAddTask(text) {
            let newTask = document.createElement('div');
            newTask.classList.add('new-task');
            newTask.innerHTML = text;
            document.querySelector('.wrap-menu').appendChild(newTask);
        }
    }
    class Model {
        designTask(arrTasks, arrClient, id) {
            if (arrClient.length) {
                //console.log(arrTasks[arrClient[id].task].comment);
                return `
                    I need a&nbsp<span class ="bold"> ${arrTasks[arrClient[id].task].name.toLowerCase()} </span>
                    &nbspto&nbsp <span class ="bold"> ${arrTasks[arrClient[id].task].list[arrClient[id].task].toLowerCase()} 
                    &nbsp ${arrClient[id].comment} </span>`
            } else return '';
        }
        registationTask(arr, task, prop, comment) {
            let id = arr.length;
            arr.push(new ClientTask(id, task, prop, comment));
            console.log(arr);
            return id;
        }
    }
    class Controller {
        constructor(model, view) {
            this.model = model
            this.view = view
            this.tasks = []
            this.task = -1
            this.prop = -1
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
                        this.view.showMainMenu(document.querySelector('.main-menu'), -1);
                        if (this.clientTasks.length)
                            this.view.showDescription(this.model.designTask(this.tasks, this.clientTasks, this.actualId));
                    }
                        break;
                    case 'a':
                    case 'd':
                    case 'p': {
                        event.target.id[0] === 'p'
                            ? this.prop = parseInt(event.target.id.slice(1))
                            : this.task = parseInt(event.target.id.slice(1));
                        this.view.openTasks(this.tasks, this.task, this.prop);
                        this.view.showDescription(this.model.designTask(this.tasks, this.clientTasks, this.actualId))
                    }
                        break;
                    case 'c': {
                        if (this.prop >= 0) {
                            this.actualId = this.model.registationTask(this.clientTasks, this.task, this.prop, this.comment);
                            this.view.showAddTask(this.model.designTask(this.tasks, this.clientTasks, this.actualId));
                            this.view.showMainMenu(document.querySelector('.main-menu'), 1);
                        }
                    }
                        break;
                }
            })
            document.querySelector('.comment').addEventListener('keyup', (event, i) => {
                this.comment = document.querySelector('.comment').value;
                this.view.showDescription(this.model.designTask(this.tasks, this.task, this.prop, this.comment || ''))
            });
        }
    }
    controller = new Controller(new Model(), new View());
    controller.getTasks();

})