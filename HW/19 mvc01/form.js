"use strict"
class ViewAdd {
    // ------------- отрисовка формы добавления/ редактирования-----------
    showFormAdd(objForm, legend, submits) {
        let tempInput;
        let form = document.createElement("form");
        for (let item in objForm.atributs) {
            if (objForm.atributs[item]) form.setAttribute(item, objForm.atributs[item]);
        }
        form.innerHTML = `<legend>${legend || objForm.legend}</legend>`;
        objForm.inputs.forEach(elAtr => {
            if (elAtr[1].label) {
                tempInput = document.createElement("label");
                tempInput.setAttribute('for', elAtr[1].name);
                tempInput.innerHTML = elAtr[1].label;
                form.appendChild(tempInput);
            }
            tempInput = document.createElement(elAtr[0]);
            for (let atr in elAtr[1]) {
                tempInput.setAttribute(atr, elAtr[1][atr]);
            }
            form.appendChild(tempInput);
            form.appendChild(document.createElement("br"));
        })
        submits.forEach(submit => {
            tempInput = document.createElement("input");
            tempInput.type = 'submit';
            tempInput.value = tempInput.id = `${submit}`
            form.appendChild(tempInput);
        })
        form.innerHTML = `<fieldset>${form.innerHTML}</fieldset>`;
        document.querySelector('.wrap').appendChild(form);
        return form;
    }
}
class ViewDel {
    // ------------- отрисовка формы удаления -----------
    showFormDel(arrPerson, objForm, legend, submit) {
        let tempInput, elementAdd;;
        let form = document.createElement("form");
        for (let item in objForm.atributs) {
            if (objForm.atributs[item]) form.setAttribute(item, objForm.atributs[item]);
        }
        form.innerHTML = `<legend>${objForm.legend}</legend>`;
        tempInput = document.createElement("input");
        tempInput.type = 'submit';
        tempInput.name = tempInput.value = `${submit}`
        form.appendChild(tempInput);
        form.innerHTML = `<fieldset>${form.innerHTML}</fieldset>`;

        let formList = form.querySelector('.del fieldset')
        let lastEl = form.querySelector('.del input')

        arrPerson.forEach((el, index) => {
            elementAdd = document.createElement('div');
            elementAdd.className = 'element';
            elementAdd.innerHTML = `<span>${el.name} ${el.surname}</span><button>X<button>Edit`;
            elementAdd.querySelector('button').id = String(index);
            elementAdd.querySelector('button').name = 'Delete';
            elementAdd.querySelectorAll('button')[1].id = String(index);
            elementAdd.querySelectorAll('button')[1].name = 'Edit';
            formList.insertBefore(elementAdd, lastEl);
        })
        document.querySelector('.wrap').appendChild(form);
        return form;
    }
}
class ModelAdd {
    constructor(viewAdd) {//------------- шаблон формы ввода/редактирования ---------------------
        this.viewAdd = viewAdd
        this.arrPerson = []
        this.formAdd = {
            legend: 'Ввод данных:',
            atributs: {
                class: 'add personal',
                name: 'inputData',
                onsubmit: "return false"
            },
            inputs: [
                ['input', { type: 'text', class: 'fields', id: 'name', label: 'Имя :' }],
                ['input', { type: 'text', class: 'fields', id: 'surname', label: 'Фамилия :' }],
                ['input', { type: 'number', class: 'fields', id: 'years', min: '1', max: '100', label: 'Возраст:' }]
            ]
        }
    }
    showAdd(submits, id) {
        id ? id = 'Редактирование' : id = false;
        return this.viewAdd.showFormAdd(this.formAdd, id, submits);
    }
    createPerson() {
        this.arrPerson = [];
        if (localStorage.myArr) this.arrPerson = JSON.parse(localStorage.myArr);
        let fields = Array.from(document.querySelectorAll('.fields'));
        if (fields.every((item) => (item.value))) {
            this.arrPerson.push(new Person(fields[0].value, fields[1].value, fields[2].value));
            localStorage.myArr = JSON.stringify(this.arrPerson);
            fields[0].value = fields[1].value = fields[2].value = '';
            Result.sayResult('Операция проведена');
        } else Result.sayResult('Отказ. Заполните все поля');
    }
    changePerson() {
        let arrPerson = JSON.parse(localStorage.myArr);
        let fields;
        let id = JSON.parse(localStorage.rewrite);
        fields = document.querySelectorAll('.fields');
        arrPerson[id].name = fields[0].value || fields[0].placeholder;
        arrPerson[id].surname = fields[1].value || fields[1].placeholder;
        arrPerson[id].age = fields[2].value || fields[2].placeholder;
        localStorage.myArr = JSON.stringify(arrPerson);
        fields[0].placeholder = fields[1].placeholder = fields[2].placeholder = '';
        fields[0].value = fields[1].value = fields[2].value = '';
        localStorage.rewrite = JSON.stringify(undefined);
    }
}
class ModelDel {
    constructor(viewDel) {
        this.viewDel = viewDel
        this.formDel = {//------------- шаблон формы просмора/удаления ---------------------
            legend: 'Удаление',
            atributs: {
                class: 'del personal',
                name: 'delData',
                onsubmit: "return false"
            }
        }
    }
    showDel() {
        return this.viewDel.showFormDel(JSON.parse(localStorage.myArr), this.formDel, false, 'Back');
    }
    rewritePerson(id, flag) {
        let arrPerson = JSON.parse(localStorage.myArr);
        let fields;
        id = parseInt(id);
        if (flag) {
            fields = document.querySelectorAll('.fields');
            fields[0].placeholder = arrPerson[id].name;
            fields[1].placeholder = arrPerson[id].surname;
            fields[2].placeholder = arrPerson[id].age;
            arrPerson = [];
        } else {
            arrPerson.splice(parseInt(id), 1);
            arrPerson[0] ? localStorage.myArr = JSON.stringify(arrPerson)
                : localStorage.clear();
        }
        return arrPerson.length;
    }
}
class ControllerAdd {
    constructor(modelAdd) {
        this.modelAdd = modelAdd
    }
    initAdd(id) {
        document.querySelector('.wrap').innerHTML = null;
        let arr = [];
        id ? arr = ['Done'] : arr = ['Add', 'Show list'];
        this.modelAdd.showAdd(arr, id).addEventListener('click', event => {
            this._eventClick(event.target.id);
        })
    }
    _eventClick(id) {
        switch (id) {
            case 'Add': {
                this.modelAdd.createPerson();
                this.initAdd();
            }
                break;
            case 'Show list': {
                del.initDel();
            }
                break;
            case 'Done': {
                this.modelAdd.changePerson();
                del.initDel();
            }
        }
    }
}
class ControllerDel {
    constructor(modelDel) {
        this.modelDel = modelDel
    }
    initDel() {
        document.querySelector('.wrap').innerHTML = null;
        this.modelDel.showDel().addEventListener('click', event => {
            this._eventClick(event.target.name, event.target.id);
        })
    }
    _eventClick(name, id) {
        switch (name) {
            case 'Back': {
                add.initAdd();
            }
                break;
            case 'Delete': {
                this.modelDel.rewritePerson(id) ? this.initDel() : add.initAdd();
            }
                break;
            case 'Edit': {
                localStorage.setItem('rewrite', id);
                add.initAdd(id);
                this.modelDel.rewritePerson(id, true);
            }
        }
    }
}
// *************************** шабон элемента списка *************
class Person {
    constructor(name, surname, age) {
        this.name = name
        this.surname = surname
        this.age = age
    }
}
class Result {
    static sayResult(words) {
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
}
const add = new ControllerAdd(new ModelAdd(new ViewAdd));
const del = new ControllerDel(new ModelDel(new ViewDel));
add.initAdd();