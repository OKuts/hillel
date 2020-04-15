class ViewAdd {
    // ------------- отрисовка формы -----------
    showFormAdd(objForm, isArrPerson, numberElement, legend) {
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
        console.log(document.querySelector('div'));
        document.querySelector('.wrap').appendChild(form);
        return form;

    }
}
class ModelAdd {
    constructor(viewAdd) {//------------- шаблон формы ввода/редактирования ---------------------
        this.viewAdd = viewAdd
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
    }

}
const modelAdd = new ModelAdd(new ViewAdd)
modelAdd.viewAdd.showFormAdd(modelAdd.formAdd, true, false, 'Rewrite')
