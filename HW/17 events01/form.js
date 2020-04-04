document.addEventListener('DOMContentLoaded',function(){
  class ViewDelList {
    // ----------------- переключение видимости ---------
    viewFormDel() {
      let getFormShow = document.querySelector('.add');
      let getFormHidden = document.querySelector('.del');
      getFormHidden.classList.remove('show');
      getFormShow.classList.add('show');
    }
    //--------------------- отображение формы удаления ------
    viewDelList(par, el) {
      let divDel = document.querySelector('.del fieldset');
      let elemAdd = document.createElement('div');
      elemAdd.innerText = el;
      let lastEl = document.querySelector('.del input');
      divDel.insertBefore(elemAdd, lastEl);
      let btn = document.createElement('button');
      btn.name = par;
      btn.innerText = 'X';
      btn.addEventListener('click', Controller.eventButton);
      divDel.insertBefore(btn, lastEl);
      divDel.insertBefore(document.createElement('br'), lastEl);
    }
  }
  // ------------------------- переключение видимости ---------
  class ViewAddList {
    viewFormAdd() {
      let getFormShow = document.querySelector('.del');
      let getFormHidden = document.querySelector('.add');
      getFormHidden.classList.remove('show');
      getFormShow.classList.add('show');
    }
    sayResult(words) {
      let say = document.createElement('div');
      say.classList.add('say');
      say.style.display = 'block'
      document.body.appendChild(say);
      say.innerText = words;
      setTimeout(() => say.style.display = 'none', 3000);
    }
  }
  class Model {
    constructor(viewAdd, viewDel) {
      this.viewAdd = viewAdd;
      this.viewDel = viewDel;
    }
    //----------------------- добавление элемента-------------
    personCreate() {
      const dataForm = document.querySelectorAll('.add input');
      if (this.auditFormAdd(dataForm, 3)) { // 3 колличество проверяемых полей
        let person = dataForm[0].value + ' ' + dataForm[1].value;
        viewDel.viewDelList(arrPerson.length, person);
        arrPerson.push(new Person(dataForm[0].value, dataForm[1].value, dataForm[2].value))
        dataForm[0].value = dataForm[1].value = dataForm[2].value = null;
        viewAdd.sayResult('Sucssess');
      } else {
        viewAdd.sayResult('Заполните все поля');
      }
    }
    // -------------- удаление елементов --------------
    personDelete(n) {
      n = parseInt(n);
      arrPerson.splice(n, 1);
      this.delNode('div');
      this.delNode('button');
      this.delNode('br');
      for (let i = 0; i < arrPerson.length; i++) {
        viewDel.viewDelList(i, arrPerson[i].name + ' ' + arrPerson[i].surname);
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
      if (arrPerson.length) viewDel.viewFormDel();
    }
      formAdd() {
        viewAdd.viewFormAdd()
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
      static eventForm(e) { // события на input
        switch (e.target.name) {
          case 'add': model.personCreate();
            break;
          case 'del': model.formDel();
            break;
          case 'select': model.formAdd();
            break;
        }
      }
      static eventButton(ev) {// события на button
        model.personDelete(ev.target.name);
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
      ['input', { type: 'submit', name: 'del', value: 'Delete' }],
      ['input', { type: 'reset', name: 'clean', value: 'Clean' }]
    ]
  }
  // ---------------- шаблон форрмы удаления ----------------------------
  let parametrsFormDel = {
    legend: 'Удаление',
    atributs: {
      class: 'del personal show',
      name: 'delData',
      onsubmit: "return false"
    },
    inputs: [
      ['input', { type: 'submit', name: 'select', value: 'Add' }]
    ]
  }
  //------------------------- тело -------------------------------
  const arrPerson = [];
  const model = new Model();
  const viewDel = new ViewDelList();
  const viewAdd = new ViewAddList();

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
  let selectInput = document.querySelectorAll('.personal input[type=submit]');
  selectInput.forEach(item => item.addEventListener('focus', Controller.eventForm));
})
