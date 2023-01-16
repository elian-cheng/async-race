import { createCar } from '../controllers/dataController';
import { renderGarage, updateGarage } from './garageView';

export async function generateCars(e: Event) {
  const target = e.target as HTMLButtonElement;
  const garageContainer = document.querySelector('.garage') as HTMLDivElement;
  target.disabled = true;
  const cars = generateCarsData();
  await Promise.all(
    cars.map(async (car) => {
      const newCar = await createCar(car);
      return newCar;
    }),
  );
  await updateGarage();
  garageContainer.innerHTML = renderGarage();
  target.disabled = false;
}

export function generateCarsData(count = carGenerationCount) {
  return new Array(count).fill(1).map(() => ({ name: setCarName(), color: setCarColor() }));
}

const brands = [
  'Tesla',
  'Mazda',
  'BMW',
  'Fiat',
  'Audi',
  'Citroen',
  'Opel',
  'Chevrolet',
  'Daewoo',
  'Nissan',
  'Mitsubishi',
  'Ford',
  'Toyota',
  'Kia',
  'Mercedes',
  'Subaru',
];
const models = [
  'X5',
  'C3',
  'Corolla',
  'Nexia',
  'Astra',
  'Aveo',
  'Model S',
  'Model T',
  'Extremum',
  'Maxima',
  'Laguna',
  'Espero',
  'Edemum',
  'Infinity',
  'Corolla',
  'Immobius',
  'Lacetti',
  'Ethereum',
  'Affection',
  'Eclipse',
  'Humana',
  'Focus',
  'Externum',
  'Accord',
  'Phantom',
  'Spectre',
  'Impreza',
];
const carGenerationCount = 100;
const maxColorInHEX = 16777215;

function setCarName() {
  const brand = brands[Math.floor(Math.random() * brands.length)];
  const model = models[Math.floor(Math.random() * models.length)];
  return `${brand} ${model}`;
}

function setCarColor() {
  let randomColorNumber = Math.floor(Math.random() * maxColorInHEX).toString(16);
  while (randomColorNumber.length < 6) randomColorNumber += '0';

  const color = `#${randomColorNumber}`;
  return color;
}
