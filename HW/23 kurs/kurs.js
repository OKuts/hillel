class Change {
    constructor() {
        this.curency = []
        this.div
        this.select
    }
    init() {
        const url = 'https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5';
        const data = fetch(url);
        this.select = document.createElement('select');
        data.then(data => (data.json()))
            .then(data => {
                data.forEach((el, i) => {
                    if (el.base_ccy === 'UAH') {
                        this.select.innerHTML += `<option value = "${i}">${el.ccy}</option>`;
                        this.curency[i] = el;
                    }
                });
                document.body.appendChild(this.select);
                this.div = document.createElement('div');
                this.div.className = 'dollar';
                document.body.appendChild(this.div);
                this.changeСurency();
                this.select.addEventListener('change', (e) => this.changeСurency());
            })
            .catch(() => alert('Error'));
    }
    changeСurency() {
        let number = parseInt(this.select.value);
        this.div.innerText = ` buy: ${this.curency[number].buy} sale: ${this.curency[number].sale}`;
    }
}
const change = new Change();
change.init();