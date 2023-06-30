import Chart from 'chart.js/auto';
import { resultButtons, colors } from './utils/utils';
import { HttpClient } from './utils/http-client';
import { base_url } from './environments/environment.prod';
import { Helpers } from './utils/helpers';
import avances from './avances.json';

export class HomeChart {
  
  constructor() {
    // this._dataService = new DataService();
    this._http = new HttpClient();
    this._helpers = new Helpers();
    // this._exportUtils = new ResultExport();
    this.data;
    // this.operacionesSelectedTable = 'cruce';
    // this.cruceSelectedTable = 0;
    // this.show_legend = true;
  }
  
  init(){
    this.removeAllContainers();
    this.data = avances;
    // this._http.get(`${base_url}/avances`).then(data => {
    //   this.data = data;
    //   if(data && data.success) {this.printContainer(data)};
    // }).catch(error => {
    //   console.error('Error', error);
    // });
    if(this.data && this.data.success) {this.printContainer(this.data)};
  }

  printContainer(data){
    const page = document.getElementById('graph_page');
    let container = document.createElement('div');
    container.id = `graph_container_0`;
    page.appendChild(container);
    // GET FIRST DATA
    let listaTabs = data.lista;
    this.printTabs(listaTabs,container);
  }

  printChart(data, tableIndex,tabContent){
    let config = {type: data.widget, title: data.titulo};
    const table = document.getElementById(`canvas_graph`);
    let canvas = document.createElement("canvas");
    canvas.id = `graph_chart_${tableIndex}`;
    canvas.classList.add('graph_chart')
    tabContent.insertAdjacentElement('beforeend', canvas);
    new Chart(canvas, {
      type: config && config.type ? config.type : 'bar',
      data: data,
      options: {
        indexAxis: config && config.axis ? config.axis : 'x',
        plugins: {
          title: {
            display: true,
            text: data.titulo,
            position: 'top',
            color: '#005767',
            font: {size: 16}
          },
          legend: {
            display: this.show_legend,
            position: 'bottom',
          },
        },
        responsive: true,
        scales: {
          x: {stacked: config && config.stacked != undefined ? config.stacked : false},
          y: {beginAtZero: true, stacked: config && config.stacked != undefined ? config.stacked : false},
        },
      },
    });
    const container = document.getElementById(`graph_container_${tableIndex}`);
    container.setAttribute('config', JSON.stringify(config));
    this.printChartSelectionButtons(data, tableIndex);
  }

  printChartSelectionButtons(data, tableIndex){
    const chart = document.getElementById(`graph_chart_${tableIndex}`);
    let buttonsContainer = document.createElement('div');
    buttonsContainer.id = `graph_chart_${tableIndex}_buttons`;
    resultButtons.forEach(config => {
      let button = document.createElement('button');
      button.classList.add('graphic_btn', `graph_chart_${tableIndex}_button`);
      button.style.background = `url(${config.icon}) no-repeat`;
      button.onclick = () => {
        this.removeChart(tableIndex);
        this.printChart(data, tableIndex, config);
      }
      buttonsContainer.appendChild(button);
    });
    buttonsContainer.classList.add('my-3', 'd-flex', 'justify-content-end'); 
    chart.insertAdjacentElement('afterend', buttonsContainer);
  }

  removeAllContainers() {
    document.getElementById('graph_page').innerHTML = '';
  }

  removeChart(tableIndex) {
    document.getElementById(`graph_chart_${tableIndex}`).remove();
    document.getElementById(`graph_chart_${tableIndex}_buttons`).remove();
  }

  printTabs(listaTabs, container) {
    container.innerHTML = `
    <div class="tab-container">
      <ul class="tab-navigation"></ul>
      <div class="tab-content"></div>
    </div>`;
    const tabNavigation = container.querySelector(".tab-navigation");
    const tabContent = container.querySelector(".tab-content");
    listaTabs.forEach( (tab, index) => {
      const tabNavItem = document.createElement("li");
      tabNavItem.textContent = tab.titulo;
  
      if (index === 0) {
        tabNavItem.classList.add("active");
        // TODO: Add tab content ( list prefguntas & chart)
        this.addTab(tabContent,tab);
      }
  
      tabNavItem.addEventListener("click", () => {
        const tabNavItems = document.querySelectorAll(".tab-navigation li");
        tabNavItems.forEach((item) => {
          item.classList.remove("active");
        });
        tabNavItem.classList.add("active");
        this.addTab(tabContent,tab);
      });
      tabNavigation.appendChild(tabNavItem);
    });
  }

  addTab(tabContent,tab) {
    const listItems = tab.preguntas.map((item,index) => `<li class="list-item" data-index="${index}">${item.titulo}</li>`).join("");
    tabContent.innerHTML = `
                            <ul>${listItems}</ul>
                            <div class="canvas_graph"></div>`;

    const listElements = document.querySelectorAll(".list-item");
    listElements.forEach((pregunta,index) => {
      pregunta.addEventListener("click", (selectedElement,index) => {
        listElements.forEach((item) => {
          item.classList.remove("selected");
        });
        pregunta.classList.add("selected");
        const indice = pregunta.dataset.index;
        const data = tab.preguntas[indice];
        console.log("Element seleccionat:", pregunta.innerText);
        console.log("ELemento a Pintar:", data);
        console.log('Indice:',indice)
        //TODO: PrintChar
        this.printChart(data,0,tabContent);
      });
    });
  }

}