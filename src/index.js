import { HomeChart } from './home-chart';
// import { DataService } from './services/data.service';

export default function main({portletNamespace, contextPath, portletElementId,configuration}) {
    
    // const dataService = new DataService();

    const node = document.getElementById(portletElementId);
    node.innerHTML =`
        <div id="graph_page" class="cis-caja-tot"></div>
    `;

    let graphic;
    graphic = new HomeChart();
    graphic.init();
    
}