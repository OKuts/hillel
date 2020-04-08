class View {
    // ----------------- переключение видимости ---------
    viewForm(show) {
        let getFormShow = document.querySelector(show);
        if (show === '.add') { show = '.del'; } else { show = '.add'; }
        let getFormHidden = document.querySelector(show);
        getFormShow.classList.remove('no-show');
        getFormHidden.classList.add('no-show');
    }
    //--------------------- отображение формы удаления ------
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
    //------------------------добавление button в форму удаления
    addButton(n, text) {
        let btn = document.createElement('button');
        text === 'X' ? btn.name = n : btn.name = 'e' + n;
        btn.innerText = text;
        btn.addEventListener('click', Controller.eventClick);
        return btn;
    }

    //------------------------ Вывод сообщения ----------------------
    sayResult(words) {
        let say = document.createElement('div');
        say.classList.add('say');
        say.style.display = 'block'
        document.body.appendChild(say);
        say.innerText = words;
        setTimeout(() => say.style.display = 'none', 2000);
    }
}
class Model {
    constructor(view) {
        this.view = view;
    }
    //----------------------- добавление элемента-------------
    personCreate() {
        const dataForm = document.querySelectorAll('.add input');
        if (this.auditFormAdd(dataForm, 3)) { // 3 колличество проверяемых полей
            let person = dataForm[0].value + ' ' + dataForm[1].value;
            view.viewDelList(arrPerson.length, person);
            arrPerson.push(new Person(dataForm[0].value, dataForm[1].value, dataForm[2].value))
            dataForm[0].value = dataForm[1].value = dataForm[2].value = null;
            view.sayResult('Sucssess');
        } else {
            view.sayResult('Заполните все поля');
        }
    }
    personEdit(n) {
        view.viewForm('.add');
        n = n.slice(1);
        selectInput[0].setAttribute('placeholder', arrPerson[n].name);
        selectInput[1].setAttribute('placeholder', arrPerson[n].surname);
        selectInput[2].setAttribute('placeholder', arrPerson[n].age);
        console.log(selectInput);
        console.log(arrPerson[n].name);
    }
    // -------------- удаление елементов --------------
    personDelete(n) {
        n = parseInt(n);
        arrPerson.splice(n, 1);
        this.delNode('div');
        this.delNode('button');
        this.delNode('button');
        this.delNode('br');
        for (let i = 0; i < arrPerson.length; i++) {
            view.viewDelList(i, arrPerson[i].name + ' ' + arrPerson[i].surname);
        }
    }
    delNode(el) {
        let divDel = document.querySelector('.del fieldset');
        do {
            divDel.removeChild(divDel.querySelector(el));
        } while (divDel.querySelector(el))
    }
    // -----------------------------переключение форм -------------
    formDel() {
        if (arrPerson.length) view.viewForm('.del');
    }
    formAdd() {
        view.viewForm('.add')
    }
    //---------------------   проверка заполнения всех полей  
    auditFormAdd(dataForm, n) {
        let flag = true;
        for (let i = 0; i < n; i++) {
            if (!dataForm[i].value) {
                flag = false;
                break;
            }
        }
        return flag;
    }
}
class Controller {
    constructor(model) {
        this.model = model;
    }
    static eventClick(e) {// события на button
        let selectBtn = e.target.name;
        if (selectBtn[0] === 'e') {
            selectInput[0].classList.add('no-show');
            selectInput[1].classList.add('no-show');
            selectInput[2].classList.remove('no-show');
            model.personEdit(selectBtn)
        } else {
            switch (selectBtn) {
                case 'add': {
                    model.personCreate();
                    selectInput[1].classList.remove('no-show');
                }
                    break;
                case 'del': model.formDel();
                    break;
                case 'select': model.formAdd();
                    break;
                default: model.personDelete(selectBtn);
            }
        }
    }
    
}
class Person {
    constructor(name, surname, age) {
        this.name = name,
            this.surname = surname,
            this.age = age
    }
}
//--------------------------- функция создания форм ------------------
function formCreate(objForm) {
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
    return f;
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
const arrPerson = [];
const fieldAdd = []; // данные текущей формы редактирования
const model = new Model();
const view = new View();
const mainContainer = document.createElement("div"); // mainContainer
mainContainer.classList.add('wrapper');
//-----------------создание формы viewAddList -----------------
const myFormAdd = formCreate(parametrsFormAdd);
mainContainer.appendChild(myFormAdd);
//-----------------создание формы viewDelList -----------------
const myFormDel = formCreate(parametrsFormDel);
mainContainer.appendChild(myFormDel);
//----------------- вывожу формы -------------------------------
document.body.appendChild(mainContainer);
//------------- беру заложников и навешиваю события --------------
let selectInput = document.querySelectorAll('.personal input');
selectInput.forEach(item => item.addEventListener('click', Controller.eventClick));
