//--------------------------- функция создание формы ------------------
function formCreate(objForm) {
    let tempInput;
    let f = document.createElement("form");
    for (let item in objForm.atributs) {
        f.setAttribute(item, objForm.atributs[item]);
    }
    if (objForm.legend) {
        f.innerHTML = `<legend>${objForm.legend}</legend>`;
    }
    objForm.inputs.forEach(elAtr => {
        if (elAtr.label) {
            tempInput = document.createElement("label");
            tempInput.setAttribute('for', elAtr.name);
            tempInput.innerHTML = elAtr.label;
            f.appendChild(tempInput);
        }
        tempInput = document.createElement("input");
        for (let atr in elAtr) {

            tempInput.setAttribute(atr, elAtr[atr]);
        }
        f.appendChild(tempInput);
        f.appendChild(document.createElement("br"));
    })
    f.innerHTML = `<fieldset>${f.innerHTML}</fieldset>`;
    return f;
}
// ----------------------------параметры формы imput----------------------------------------------
let parametrsForm = {
    legend: 'Ввод данных:',
    atributs: {
        class: 'personal',
        name: 'inputData',
        action: 'https://google.com/',
        method: 'get'
    },
    inputs: [
        { type: 'text', name: 'name', label: 'Фамилия Имя Отчество:' },
        { type: 'fone', placeholder: '(XXX)-XXX-XXXX', name: 'phone', label: 'Номер телефона:' },
        { type: 'email', placeholder: 'user@gmail.com', name: 'email', label: 'Адрес электронной почты:' },
        { type: 'number', name: 'age', label: 'Возраст:' },
        { type: 'text', name: 'comment', placeholder: 'Не более 50 символов', maxlength: "50", label: 'Личные качества:' },
        { type: 'submit', name: 'Push', value: "Отправить форму" }
    ]
}
//---------------------------------------------------------------------------------------------
const mainContainer = document.createElement("div"); // mainContainer
mainContainer.classList.add('wrapper');
const myForm = formCreate(parametrsForm); // -------------создание формы из imput---------------
mainContainer.appendChild(myForm);
document.body.appendChild(mainContainer);
