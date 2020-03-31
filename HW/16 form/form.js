//--------------------------- создание формы ------------------
function formCreate(objForm) {
    let tempInput;
    let f = document.createElement("form");
    for (let item in objForm.atributs) {
        f.setAttribute(item, objForm.atributs[item]);
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
    return f;
}
// ----------------------------параметры формы ----------------------------------------------
let parametrsForm = {
    legend: 'Ввод данных:',
    atributs: {
        name: 'inputData',
        action: 'https://google.com/',
        method: 'get'
    },
    inputs: [
        { type: 'text', name: 'name', label: 'Фамилия Имя Отчество:' },
        { type: 'number', placeholder: '(XXX)-XXX-XXXX', name: 'phone', label: 'Номер телефона:' },
        { type: 'email', placeholder: 'user@gmail.com', name: 'email', label: 'Адрес электронной почты:' },
        { type: 'number', name: 'age', label: 'Возраст:' },
        { type: 'text', name: 'comment', placeholder: 'Не более 200 символов', maxlength: "200", label: 'Личные качества:' },
        { type: 'submit', name: "Push" },
    ]
}
//---------------------------------------------------------------------------------------------
const mainContainer = document.createElement("div"); // mainContainer
mainContainer.classList.add('wrapper');
const myForm = formCreate(parametrsForm); // -------------создание формы
mainContainer.appendChild(myForm);
document.body.appendChild(mainContainer);
