import renderView, { renderLayout } from '../components/appView';
import { Car, ChampionList } from '../types';
import { renderButtonEvents } from './buttonsController';
import { getAllCars, getAllWinners } from './dataController';
import { renderForms } from './formsController';

const carsData = await getAllCars();
const cars = carsData.cars as Car[];
const carsCount = Number(carsData.count);

const winnersData = await getAllWinners();
const winners = winnersData.winners as ChampionList[];
const winnersCount = Number(winnersData.count);
const animation: Animation[] = [];

export const data = {
  cars,
  carsCount,
  carsPage: 1,
  winnersPage: 1,
  winners,
  winnersCount,
  animation,
};

export const options = {
  view: 'garage',
  sort: 'time',
  order: 'asc',
};

export async function renderApp() {
  renderLayout();
  renderView();
  renderButtonEvents();
  renderForms();
}
