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
    }
    class Controller {
        constructor(model, view) {
            this.model = model
            this.view = view
            this.input = document.querySelectorAll('.input')
        }
        getTasks() {
            const xhr = new XMLHttpRequest();
            const url = 'http://localhost:3333/ins';
            xhr.open('get', url);
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.send();
            xhr.onreadystatechange = function () {
                if (xhr.readyState === XMLHttpRequest.DONE) {
                    console.log(xhr.response.slice(2, xhr.response.length - 2).split(/","/));
                }
            }
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