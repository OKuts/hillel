document.addEventListener('DOMContentLoaded', function () {
    class View {
        showMainMenu(menu) {
            menu.style.transform = 'translate(-505px,0)';
        }
        changeInput(id, input) {
            let i = id === 'location' ? 0 : 1;
            document.getElementById(id).innerText = input[i].value;
        }
        openTasks(arrTask, activeTask, activeProp) {
            let task = '';
            let imgTask = document.getElementById('service');
            arrTask.forEach((el, i) => {
                task += `<div class = "set-task" id="${'t' + i}">
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
    }
    class Model {

    }
    class Controller {
        constructor(model, view) {
            this.model = model
            this.view = view
            this.tasks = []
            this.task = 0
            this.prop = 0
            this.input = document.querySelectorAll('.input')
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
                        this.view.showMainMenu(document.querySelector('.main-menu'));
                    }
                        break;
                    case 't':
                    case 'a':
                    case 'd':
                    case 'p': {
                        event.target.id[0] === 'p'
                            ? this.prop = parseInt(event.target.id.slice(1))
                            : this.task = parseInt(event.target.id.slice(1));
                        console.log(event.target.id.slice(1))
                        this.view.openTasks(this.tasks, this.task, this.prop);
                    }
                        break;
                }
            })
            this.input.forEach(el => el.addEventListener('keyup', (event, i) => {
                this.view.changeInput(event.target.id, this.input)
            }));
        }
    }
    controller = new Controller(new Model(), new View());
    controller.getTasks();

})