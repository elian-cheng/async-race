import './css/styles.css';
import renderView from './ts/components/appView';
import { renderGarage } from './ts/controllers/garageController';

function init() {
  renderView();
  renderGarage();
}

init();
