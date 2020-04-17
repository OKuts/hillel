// class View {
//     constructor() {
//         this.input = document.createElement("input");
//         this.addButton = document.createElement("button");
//         this.mainBlock = document.querySelector("#app");
//         this.taskList = document.createElement("ul");
//     }

//     initRender() {
//         this.mainBlock.append(this.input, this.addButton, this.taskList);
//         this.addButton.innerHTML = "ADD";
//     }

//     renderTask(task) {
//         const item = document.createElement("li");
//         item.innerHTML = task;
//         this.taskList.appendChild(item);
//     }
// }

// class Controller {
//     constructor(model, view) {
//         this.model = model;
//         this.view = view;
//     }

//     addData() {
//         let value = this.view.input.value;
//         this.model.addTask(value);
//         this.view.renderTask(value);
//     }

//     addHandle() {
//         this.addData.bind(this);
//         this.view.addButton.addEventListener("click", this.addData);
//     }
// }

// class Model {
//     constructor() {
//         this.tasks = [];
//     }

//     addTask(value) {
//         this.tasks.push(value);
//     }
// }

// (function init() {
//     const view = new View();
//     const model = new Model();
//     const controller = new Controller(model, view);
//     view.initRender();
//     controller.addHandle();
// })();


// $img2 = $('img');
// $(document).keydown(function (key) {
//     switch (parseInt(key.which)) {
//         case 39:
//             $img1.animate({
//                 left: "+=10px"
//             }, 'slow')
//             break;
//         case 37:
//             $img1.animate({
//                 left: "-=10px"
//             }, 'slow')
//             break;
//         case 38:
//             $img2.animate({
//                 top: "-=10px"
//             }, 'slow')
//             break;
//         case 40:
//             $img2.animate({
//                 top: "+=10px"
//             }, 'slow')
//             break;
//     }
// })

