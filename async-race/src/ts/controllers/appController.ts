import renderView, { renderLayout } from '../components/appView';
import { updateGarage } from '../components/garageView';
import { updateWinners } from '../components/winnersView';
import { Animate, Car, ChampionList } from '../types';
import renderButtonEvents from './buttonsController';
import { getAllCars, getAllWinners } from './dataController';
import renderForms from './formsController';

const carsData = await getAllCars();
const cars = carsData.cars as Car[];
const carsCount = Number(carsData.count);

export const options = {
  view: 'garage',
  sort: 'time',
  order: 'asc',
};

const winnersData = await getAllWinners();
const winners = winnersData.winners as ChampionList[];
const winnersCount = Number(winnersData.count);
const animation: Animate[] = [];

export const data = {
  cars,
  carsCount,
  carsPage: 1,
  winnersPage: 1,
  winners,
  winnersCount,
  animation,
};

export async function renderApp() {
  renderLayout();
  renderView();
  renderButtonEvents();
  renderForms();
  await updateWinners();
  await updateGarage();
}
