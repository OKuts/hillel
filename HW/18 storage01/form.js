document.addEventListener('DOMContentLoaded', function () {
    class ViewInit {
        ShowFormInit(objForm) {
            let tempInput, flagBr;
            let f = document.createElement("form");
            for (let item in objForm.atributs) {
                if (objForm.atributs[item]) f.setAttribute(item, objForm.atributs[item]);
            }
            f.innerHTML = `<legend>${objForm.legend}</legend>`;
            objForm.inputs.forEach(elAtr => {
                if (elAtr[1].label) {
                    tempInput = document.createElement("label");
                    tempInput.setAttribute('for', elAtr[1].name);
                    tempInput.innerHTML = elAtr[1].label;
                    f.appendChild(tempInput);
                }
                tempInput = document.createElement(elAtr[0]);
                flagBr = true;
                for (let atr in elAtr[1]) {
                    tempInput.setAttribute(atr, elAtr[1][atr]);
                    if (elAtr[1][atr] === 'submit') flagBr = !flagBr;
                }
                f.appendChild(tempInput);
                if (flagBr) f.appendChild(document.createElement("br"));
            })
            f.innerHTML = `<fieldset>${f.innerHTML}</fieldset>`;
            mainContainer.appendChild(f);
        }
        sayResult(words) {
            let say = document.createElement('div');
            say.classList.add('say');
            say.style.display = 'block'
            document.body.appendChild(say);
            say.innerText = words;
            setTimeout(() => say.style.display = 'none', 2000);
            //document.body.removeChild(say); позаниматься асинхронностью пока прошу прощения за дополнительный мусор
        }
    }
    class ViewChange {
        viewDelList(par, el) {
            let divDel = document.querySelector('.del fieldset');
            let elemAdd = document.createElement('div');
            elemAdd.innerText = el;
            let lastEl = document.querySelector('.del input');
            divDel.insertBefore(elemAdd, lastEl);
            divDel.insertBefore(this.addButton(par, 'X'), lastEl);
            divDel.insertBefore(this.addButton(par, 'Edit'), lastEl);
            divDel.insertBefore(document.createElement('br'), lastEl);
        }
        addButton(n, text) {
            let btn = document.createElement('button');
            text === 'X' ? btn.name = n : btn.name = 'i' + n;
            btn.innerText = text;
            btn.addEventListener('click', Controller.eventClick);
            return btn;
        }
        viewForm(show) {
            let getFormShow = document.querySelector(show);
            if (show === '.add') { show = '.del'; } else { show = '.add'; }
            let getFormHidden = document.querySelector(show);
            getFormShow.classList.remove('no-show');
            getFormHidden.classList.add('no-show');
            let divDel = document.querySelector('.del fieldset');
            this.delNode(divDel, 'div');
            this.delNode(divDel, 'button');
            this.delNode(divDel, 'br');
            for (let i = 0; i < arrPerson.length; i++) {
                viewChange.viewDelList(i, arrPerson[i].name + ' ' + arrPerson[i].surname);
            }
        }
        delNode(parent, el) {
            let myEl;
            do {
                myEl = parent.querySelector(el);
                parent.removeChild(myEl);
            } while (parent.querySelector(el));
        }
    }
    class Model {
        constructor(viewInit, viewChange) {
            this.viewInit = viewInit;
            this.viewChange = viewChange;
        }
        personCreate(flag) {
            //const dataForm = document.querySelectorAll('.add input');
            if (this.auditFormAdd()) { // 3 колличество проверяемых полей
                if (flag >= 0) {
                    selectInput[0].value ? arrPerson[flag].name = selectInput[0].value
                        : arrPerson[flag].name = selectInput[0].placeholder;
                    selectInput[1].value ? arrPerson[flag].surname = selectInput[1].value
                        : arrPerson[flag].surname = selectInput[1].placeholder;
                    selectInput[2].value ? arrPerson[flag].age = selectInput[2].value
                        : arrPerson[flag].age = selectInput[2].placeholder;
                    for (let i = 0; i < 3; i++) selectInput[i].removeAttribute('placeholder');
                    selectInput[5].classList.add('no-show');
                    selectInput[4].classList.remove('no-show');
                    selectInput[3].classList.remove('no-show');
                    this.formDel();
                } else {
                    let person = selectInput[0].value + ' ' + selectInput[1].value;
                    viewChange.viewDelList(arrPerson.length, person);
                    arrPerson.push(new Person(selectInput[0].value, selectInput[1].value, selectInput[2].value))
                }
                selectInput[0].value = selectInput[1].value = selectInput[2].value = '';
                viewInit.sayResult('Sucssess');
                selectInput[4].classList.remove('no-show');
                //console.log(arrPerson);//*************************************************** */
            } else {
                viewInit.sayResult('Заполните все поля');
            }
        }
        auditFormAdd() {
            let flag = true;
            for (let i = 0; i < 3; i++) {
                if (!selectInput[i].value && !selectInput[i].placeholder) {
                    flag = false;
                    break;
                }
            }
            return flag;
        }
        initForm(par, n) {
            viewInit.ShowFormInit(par);
            if (n) {
                for (let i = 0; i < arrPerson.length; i++) {
                    viewChange.viewDelList(i, arrPerson[i].name + ' ' + arrPerson[i].surname);
                }
            }
        }
        formDel() {
            if (arrPerson.length) {
                viewChange.viewForm('.del');
            }
        }
        personDelete(n) {
            arrPerson.splice(n, 1);
            viewChange.viewForm('.del');
        }
        formAdd() {
            viewChange.viewForm('.add');
        }
        personEdit(n) {
            viewChange.viewForm('.add');
            n = n.slice(1);
            selectInput[0].setAttribute('placeholder', arrPerson[n].name);
            selectInput[1].setAttribute('placeholder', arrPerson[n].surname);
            selectInput[2].setAttribute('placeholder', arrPerson[n].age);
            editElement = n;
            selectInput[3].classList.add('no-show');
            selectInput[4].classList.add('no-show');
            selectInput[5].classList.remove('no-show');
        }
        formEdit() {
            this.personCreate(editElement);
        }
    }
    class Controller {
        constructor(model) {
            this.model = model;
        }
        static eventClick(e) {// события на button
            let selectBtn = e.target.name;
            if (selectBtn[0] === 'i') {
                selectInput[3].classList.remove('no-show');
                selectInput[4].classList.remove('no-show');
                selectInput[5].classList.add('no-show');
                model.personEdit(selectBtn);
            } else if (+selectBtn >= 0) {
                model.personDelete(+selectBtn);
            } else {
                switch (selectBtn) {
                    case 'add': model.personCreate();
                        break;
                    case 'del': model.formDel();
                        break;
                    case 'select': model.formAdd();
                        break;
                    case 'edit': {
                        model.formEdit();
                        break;
                    }
                }
            }
            localStorage.setItem('myArr', JSON.stringify(arrPerson));
        }
        init() {
            try {
                arrPerson = JSON.parse(localStorage.myArr);
            } catch (er) { }
            model.initForm(parametrsFormAdd);
            model.initForm(parametrsFormDel, true);
            selectInput = document.querySelectorAll('.personal input');
            selectInput.forEach(item => item.addEventListener('click', Controller.eventClick));
            if (arrPerson.length > 0) selectInput[4].classList.remove('no-show');
        }
    }
    class Person {
        constructor(name, surname, age) {
            this.name = name,
                this.surname = surname,
                this.age = age
        }
    }
    // ---------------- шаблон форрмы ввода ----------------------------
    let parametrsFormAdd = {
        legend: 'Ввод данных:',
        atributs: {
            class: 'add personal',
            name: 'inputData',
            onsubmit: "return false"
        },
        inputs: [
            ['input', { type: 'text', name: 'name', label: 'Имя :' }],
            ['input', { type: 'text', name: 'surname', label: 'Фамилия :' }],
            ['input', { type: 'number', name: 'age', min: '1', max: '100', label: 'Возраст:' }],
            ['input', { type: 'submit', name: 'add', value: 'Add' }],
            ['input', { class: 'no-show', type: 'submit', name: 'del', value: 'Show' }],
            ['input', { class: 'no-show', type: 'submit', name: 'edit', value: 'Done' }],
        ]
    }
    // ---------------- шаблон форрмы удаления ----------------------------
    let parametrsFormDel = {
        legend: 'Удаление',
        atributs: {
            class: 'del personal no-show',
            name: 'delData',
            onsubmit: "return false"
        },
        inputs: [
            ['input', { type: 'submit', name: 'select', value: 'Back' }]
        ]
    }
    //------------------------- тело -------------------------------
    let arrPerson = [];
    let editElement;
    const viewInit = new ViewInit();
    const viewChange = new ViewChange();
    const model = new Model(viewInit, viewChange);
    const controller = new Controller();
    const mainContainer = document.createElement("div"); // mainContainer
    let selectInput;
    mainContainer.classList.add('wrapper');
    document.body.appendChild(mainContainer);
    controller.init();
})
