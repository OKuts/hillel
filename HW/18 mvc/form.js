"use strict"
document.addEventListener('DOMContentLoaded', function () {
    class Model {
        constructor() {
            this.formAdd = {
                legend: 'Ввод данных:',
                atributs: {
                    class: 'add personal',
                    name: 'inputData',
                    onsubmit: "return false"
                },
                inputs: [
                    ['input', { type: 'text', class: 'fields', name: 'name', label: 'Имя :' }],
                    ['input', { type: 'text', class: 'fields', name: 'surname', label: 'Фамилия :' }],
                    ['input', { type: 'number', class: 'fields', name: 'years', min: '1', max: '100', label: 'Возраст:' }],
                    ['input', { type: 'submit', name: 'add', value: 'Add' }],
                    ['input', { type: 'submit', name: 'del', value: 'Show list' }],
                    ['input', { type: 'submit', name: 'rewrite', value: 'Done' }]
                ]
            }
            this.formDel = {
                legend: 'Удаление',
                atributs: {
                    class: 'del personal no-showForm',
                    name: 'delData',
                    onsubmit: "return false"
                },
                inputs: [
                    ['input', { type: 'submit', name: 'back', value: 'Back' }]
                ]
            }
        }
        personCreate(arrPerson) {
            let fields = Array.from(document.querySelectorAll('.fields'));
            if (fields.every((item) => (item.value))) {
                arrPerson.push(new Person(fields[0].value, fields[1].value, fields[2].value));
                localStorage.setItem('myArr', JSON.stringify(arrPerson));
                fields[0].value = fields[1].value = fields[2].value = '';
                return true;
            } else return false;
        }
        personDelete(numberElement, arrPerson) {
            numberElement = parseInt(numberElement);
            arrPerson.splice(numberElement, 1);
        }
        personEditWrite(numberElement, arrPerson) {
            let field = document.querySelectorAll('.fields');
            let fields = Array.from(field);
            if (fields.every((item) => (item.value || item.placeholder))) {
                arrPerson[numberElement].name = fields[0].value || fields[0].placeholder;
                arrPerson[numberElement].surname = fields[1].value || fields[1].placeholder;
                arrPerson[numberElement].age = fields[2].value || fields[2].placeholder;
                field.forEach((item, index) => field[index].value = field[index].placeholder = '');
                return true;
            } else return false;
        }
    }
    // ********************************************************************
    class ViewInit {
        constructor() { }
        showFormInit(objForm) {
            let tempInput, flagBr;
            let form = document.createElement("form");
            for (let item in objForm.atributs) {
                if (objForm.atributs[item]) form.setAttribute(item, objForm.atributs[item]);
            }
            form.innerHTML = `<legend>${objForm.legend}</legend>`;
            objForm.inputs.forEach(elAtr => {
                if (elAtr[1].label) {
                    tempInput = document.createElement("label");
                    tempInput.setAttribute('for', elAtr[1].name);
                    tempInput.innerHTML = elAtr[1].label;
                    form.appendChild(tempInput);
                }
                tempInput = document.createElement(elAtr[0]);
                flagBr = true;
                for (let atr in elAtr[1]) {
                    tempInput.setAttribute(atr, elAtr[1][atr]);
                    if (elAtr[1][atr] === 'submit') flagBr = !flagBr;
                }
                form.appendChild(tempInput);
                if (flagBr) form.appendChild(document.createElement("br"));
            })
            form.innerHTML = `<fieldset>${form.innerHTML}</fieldset>`;
            //form.addEventListener('click', Controller.eventClick);
            document.querySelector('.wrapper').appendChild(form);
            return form;
        }
        sayResult(words) {
            let say = document.createElement('div');
            say.classList.add('say');
            document.body.appendChild(say);
            say.innerText = words;
            setTimeout(() => waw(), 2000);
            function waw() {
                say.style.display = 'none';
                document.body.removeChild(say);
            }
        }
        changeFormShow(formShow) {
            let formNoShow;
            formShow === '.add' ? formNoShow = '.del' : formNoShow = '.add';
            document.querySelector(formShow).classList.remove('no-showForm');
            document.querySelector(formNoShow).classList.add('no-showForm');
        }
        viewInput(legend, ...flag) {
            if (legend) document.querySelector('.add legend').innerText = legend;
            let show = document.querySelectorAll('.add input[type = "submit"]');
            show.forEach((item, index) => {
                flag[index] ? item.classList.remove('no-show') : item.classList.add('no-show');
            })
        }
    }
    // ********************************************************************
    class ViewAdd {
        personEdit(numberElement, arrPerson) {
            let field = document.querySelectorAll('.fields');
            field[0].placeholder = arrPerson[numberElement].name;
            field[1].placeholder = arrPerson[numberElement].surname;
            field[2].placeholder = arrPerson[numberElement].age;
        }

    }
    // ********************************************************************
    class ViewDel {
        showFormDel(arrPerson) {
            let formList = document.querySelector('.del fieldset');
            this._cleanFormDel(formList, 'div', 'button');
            let lastEl = document.querySelector('.del input');
            let elementAdd;
            arrPerson.forEach((el, index) => {
                elementAdd = document.createElement('div');
                elementAdd.className = 'element';
                elementAdd.innerHTML = `<span>${el.name} ${el.surname}</span><button>X<button>Edit`;
                elementAdd.querySelector('button').name = 'c' + index;
                elementAdd.querySelectorAll('button')[1].name = 'e' + index;
                formList.insertBefore(elementAdd, lastEl);
            })
        }
        _cleanFormDel(parent, ...el) {
            el.forEach((item) => {
                while (parent.querySelector(item)) {
                    parent.removeChild(parent.querySelector(item));
                }
            })
        }
    }
    // ********************************************************************
    class Controller {
        constructor(model, viewInit, viewAdd, viewDel) {
            this.model = model
            this.viewInit = viewInit
            this.viewAdd = viewAdd
            this.viewDel = viewDel
        }
        eventClick(objEvent) {
            let arrPerson = [], numberEdit;
            let flag = true;
            if (localStorage.myArr && JSON.parse(localStorage.myArr).length) {
                arrPerson = JSON.parse(localStorage.myArr);
            }
            switch (objEvent[0]) {
                case 'a': {// создание нового
                    if (this.model.personCreate(arrPerson)) {
                        this.viewInit.sayResult('Операция проведена');
                    } else this.viewInit.sayResult('Отказ. Заполните все поля');
                    arrPerson.length ? this.viewInit.viewInput('', 1, 1) : this.viewInit.viewInput('', 1);
                }
                    break;
                case 'd': { // на форму удаления
                    this.viewDel.showFormDel(arrPerson);
                    this.viewInit.changeFormShow('.del');
                }
                    break;
                case 'b': { //возврвщение на форму ввода
                    this.viewInit.changeFormShow('.add');
                    arrPerson.length ? this.viewInit.viewInput('', 1, 1) : this.viewInit.viewInput('', 1, 0);
                }
                    break;
                case 'e': { //редактирование
                    this.viewInit.changeFormShow('.add');
                    numberEdit = parseInt(objEvent.slice(1)); //номер в массиве
                    localStorage.setItem('numberEdit', JSON.stringify(numberEdit));
                    this.viewInit.viewInput('Редактирование:', 0, 0, 1);
                    this.viewAdd.personEdit(numberEdit, arrPerson);
                }
                    break;
                case 'c': {// удаление
                    this.model.personDelete(objEvent.slice(1), arrPerson);
                    this.viewDel.showFormDel(arrPerson);
                    if (!arrPerson.length) {
                        this.viewInit.changeFormShow('.add');
                        this.viewInit.viewInput('', 1, 0);
                    }
                }
                    break;
                case 'r': { //перезапись значения
                    numberEdit = JSON.parse(localStorage.numberEdit);
                    this.model.personEditWrite(numberEdit, arrPerson);
                    this.viewDel.showFormDel(arrPerson);
                    this.viewInit.changeFormShow('.del');
                    arrPerson.length
                        ? this.viewInit.viewInput('Ввод данных:', 1, 1)
                        : this.viewInit.viewInput('Ввод данных:', 1);
                }
                    break;
                default: flag = false;
                    break;
            }
            if (arrPerson && flag) localStorage.setItem('myArr', JSON.stringify(arrPerson));
        }
        init() {
            document.body.innerHTML = '<div class="wrapper"></div>';
            this.viewInit.showFormInit(this.model.formAdd).addEventListener('click', event => {
                if (event.target.name) this.eventClick(event.target.name);
            });
            this.viewInit.showFormInit(this.model.formDel).addEventListener('click', event => {
                if (event.target.name) this.eventClick(event.target.name);
            });
            if (localStorage.myArr && JSON.parse(localStorage.myArr).length) {
                this.viewInit.viewInput('', 1, 1);
                this.viewInit.sayResult('Мы снова вместе');
            } else {
                this.viewInit.sayResult('Начнем сотрудничество');
                this.viewInit.viewInput('', 1);
            }
        }
    }
    // ******************************************************************
    class Person {
        constructor(name, surname, age) {
            this.name = name,
                this.surname = surname,
                this.age = age
        }
    }
    const controller = new Controller(new Model(), new ViewInit(), new ViewAdd(), new ViewDel());
    controller.init();
})