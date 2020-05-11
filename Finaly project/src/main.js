document.addEventListener('DOMContentLoaded', function () {
    class View {
        showMenu() {

        }
    }
    class Model {
        constructor(view) {
            this.view = view
        }
        showMainMenu(menu) {
            menu.style.transform = 'translate(-350px,0)';
        }
    }
    class Controller {
        constructor(model) {
            this.model = model
        }
        initClick() {
            document.body.querySelector('.map').addEventListener('click', event => {
                switch (event.target.id) {
                    case '222': {
                        this.model.showMainMenu(document.querySelector('.main-menu'));
                    }
                        break;
                    default:
                        break;
                }
            })
        }
    }
    controller = new Controller(new Model(new View()));
    controller.initClick();
})