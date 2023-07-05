import { HomeChart } from './home-chart'
// import 'bootstrap';
// import { DataService } from './services/data.service';

export default function main({portletNamespace, contextPath, portletElementId,configuration}) {
    
    // const dataService = new DataService();

    const node = document.getElementById(portletElementId);
    node.innerHTML =`
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-9ndCyUaIbzAi2FUVXJi0CjmCapSmO7SnpJef0486qhLnuZ2cdeRhO02iuK6FUUVM" crossorigin="anonymous">
        <div id="graph_page" class="cis-caja-tot"></div>
    `;

    let graphic;
    graphic = new HomeChart();
    console.log('--------------   graphic.init() ---------- call');
    graphic.init();
    
}