let article = [
    'Индекс Биг Мака',
    'Индекс Биг Мака - это стоимость гамбургера в сети Мак Дональдс. Биг мак содержит, мясо, овощи, сыр, хлеб и другие продукты.',
    'В его стоимость так же входят аренда помещения и оборудования, рабочая сила и многие другие факторы.',
    'Если цена биг мака низкая то можно сказать что цены в стране низкие, если высокая то и цены относительно высокие.', 'Исследования проводятся журналом «The Economist».'
];
let statisticName = 'Индекс Биг Мака в разных странах';
let statistic = [['Год', 'Россия', 'Великобритания', 'США', 'Израиль'],
[2012, 2.62, 4.5, 4.33, 3.99],
[2013, 2.64, 4.51, 2.9, 4.15],
[2014, 2.6, 4.66, 4.68, 4.18]
];
let facts = [
    'Интересные факты:',
    'По мнению экспертов журнала «The Economist» роcсийский рубль, наряду с валютами таких стран как Украина, Египет, Филиппины, Аргентина, Гонконг, Индонезия, Таиланд, Малайзия недоценен примерно на 50%',
    'В 2015 году самым дешёвым Биг-Маком можно "полакомиться" в Венесуэле - за 0,67 доллара (недооценка на 86 %), потом идёт Украина - 1,55 $ (-67,7 %), а за ними Индия, где цена за этот бутерброд 1,83 доллара (-61,7 %).',
    'Самый дорогой Биг-Мак можно купить в Швейцарии - за 6,82 доллара (+42,4 %), затем идут Норвегия- 5,65 $ (+17,9 %), Швеция - 5,13 $ (+7 %) и Дания - 5,08 $ (+6 %).'
]
let strTemp;
const mainContainer = document.createElement("div");
mainContainer.classList.add('wrapper');
// ----------------------------- Статья --------------------------------------
const articleDiv = document.createElement("div");
articleDiv.classList.add('article');
mainContainer.appendChild(articleDiv);
article.forEach((el, i) => {
    i == 0 ? articleDiv.innerHTML += `<h1>${el}</h1>`
        : articleDiv.innerHTML += `<p>${el}</p>`;
})
//------------------------------ Таблица---------------------------------
const tableDiv = document.createElement("div");
tableDiv.classList.add('table');
mainContainer.appendChild(tableDiv);

const myTable = document.createElement("table");
tableDiv.appendChild(myTable);

strTemp = `<caption><i>${statisticName}</i></caption><thead>`;
for (let i = 0; i < statistic.length; i++) {
    strTemp += '<tr>';
    for (let j = 0; j < statistic[0].length; j++) {
        i == 0 ? strTemp += `<th>${statistic[i][j]}</th>` : strTemp += `<td>${statistic[i][j]}</td>`;
    }
    i == 0 ? strTemp += '</tr></thead>' : strTemp += '</tr>';
}
myTable.innerHTML = strTemp;
//------------------------------- Перечень -------------------------------------
const factsDiv = document.createElement("div");
factsDiv.classList.add('facts');
mainContainer.appendChild(factsDiv);
strTemp = `<b>${facts[0]}</b><ol>`;
for (let i = 1; i < facts.length; i++) {
    strTemp += `<li>${facts[i]}</li>`;
}
factsDiv.innerHTML += strTemp + '</ol>';
//-------------------------------- Вывод на экран -----------------------------
document.body.insertBefore(mainContainer, document.body.firstElementChild);