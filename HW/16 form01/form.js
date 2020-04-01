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
        if (elAtr[1].label) {
            tempInput = document.createElement("label");
            tempInput.setAttribute('for', elAtr[1].name);
            tempInput.innerHTML = elAtr[1].label;
            f.appendChild(tempInput);
        }
        tempInput = document.createElement(elAtr[0]);
        for (let atr in elAtr[1]) {
            tempInput.setAttribute(atr, elAtr[1][atr]);
        }
        f.appendChild(tempInput);
        f.appendChild(document.createElement("br"));
    })
    f.innerHTML = `<fieldset>${f.innerHTML}</fieldset>`;
    return f;
}
// ----------------------------параметры формы ----------------------------------------------
let parametrsForm = {
    legend: 'Ввод данных:',
    atributs: {
        class: 'personal',
        name: 'inputData',
        action: 'https://google.com/',
        method: 'get'
    },
    inputs: [['input', { type: 'text', name: 'name', label: 'Фамилия Имя Отчество:' }],
    ['input', { type: 'fone', placeholder: '(XXX)-XXX-XXXX', name: 'phone', label: 'Номер телефона:' }],
    ['input', { type: 'email', placeholder: 'user@gmail.com', name: 'email', label: 'Адрес электронной почты:' }],
    ['input', { type: 'number', name: 'age', label: 'Возраст:' }],
    ['textarea', { name: 'comment', placeholder: 'Не более 200 символов', maxlength: "200", label: 'Личные качества:' }],
    ['input', { type: 'submit', name: 'push', value: 'Отправить форму' }],
    ]
}
//---------------------------------------------------------------------------------------------
const mainContainer = document.createElement("div"); // mainContainer
mainContainer.classList.add('wrapper');
const myForm = formCreate(parametrsForm); // -------------создание формы ---------------
mainContainer.appendChild(myForm);
document.body.appendChild(mainContainer);
