document.addEventListener('DOMContentLoaded', function () {
    class View {
        showMainMenu(menu) {
            menu.style.transform = 'translate(-505px,0)';
        }
        changeInput(id, input) {
            let i = id === 'location' ? 0 : 1;
            document.getElementById(id).innerText = input[i].value;
        }
    }
    class Model {
        openTasks(arrTask, active) {
            let task = '';
            let imgTask = document.getElementById('service');
            arrTask.forEach((el, i) => {
                task += `<div class = "set-task" id ="${'t' + i}">
                            <div class = "service" >
                                <img src = "${el.path}">
                            </div>
                            ${el.name}
                         </div>`;
            })
            imgTask.innerHTML = task;
            document.querySelectorAll('.service')[active].style.border = "1px solid gray";
            this.openProp(arrTask[active].list, 0);
        }
        openProp(arrProp, active) {
            console.log(arrProp);
            let prop = '';
            let menuProp = document.getElementById('set-task');
            arrProp.forEach((el, i) => {
                prop += `<div class = "prop-task" id ="${'p' + i}">${el}</div>`;
                console.log(el[i]);
            })
            menuProp.innerHTML = prop;
            document.querySelectorAll('.prop-task')[active].style.border = "1px solid gray";
        }
    }
    class Controller {
        constructor(model, view) {
            this.model = model
            this.view = view
            this.input = document.querySelectorAll('.input')
            this.tasks = [];
        }
        getTasks() {
            const xhr = new XMLHttpRequest();
            const url = 'http://localhost:3333/ins';
            xhr.open('get', url);
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.onreadystatechange = function () {
                if (xhr.readyState === XMLHttpRequest.DONE) {
                    this.tasks = JSON.parse(xhr.response);
                    console.log(this.tasks)
                    controller.model.openTasks(this.tasks, 0);
                }
            }
            xhr.send();
        }
        initClick() {
            document.querySelector('.map').addEventListener('click', event => {
                switch (event.target.id) {
                    case '222': {
                        this.view.showMainMenu(document.querySelector('.main-menu'));
                    }
                        break;
                }
            })
            this.input.forEach(el => el.addEventListener('keyup', (event, i) => {
                console.log(this.input);
                this.view.changeInput(event.target.id, this.input)
            }));
        }
    }
    controller = new Controller(new Model(), new View());
    controller.getTasks();
    controller.initClick();
})