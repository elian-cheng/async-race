import { Car, ChampionList } from '../types';
import { getAllCars, getAllWinners } from './dataController';

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
