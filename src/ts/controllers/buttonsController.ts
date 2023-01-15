import { Car } from '../types';
import { getCar } from './dataController';

export function renderButtonEvents() {
  // const garage = document.querySelector('.garage') as HTMLDivElement;
  // const garageContainer = document.querySelector('.garage-view') as HTMLDivElement;
  // const winnersContainer = document.querySelector('.winners-view') as HTMLDivElement;
  const updateNameInput = document.querySelector('.update-name') as HTMLInputElement;
  const updateColorInput = document.querySelector('.update-color') as HTMLInputElement;
  const updateBtn = document.querySelector('.update-button') as HTMLButtonElement;
  // const raceBtn = document.querySelector('.race-button') as HTMLButtonElement;
  document.body.addEventListener('click', async (e: Event) => {
    const target = e.target as HTMLElement;

    if (target.classList.contains('select-button')) {
      const carId = Number(target.id.split('select-')[1]);
      const selectedCar: Car = await getCar(carId);
      localStorage.setItem('selectedCar', JSON.stringify(selectedCar));
      updateNameInput.value = selectedCar.name;
      updateColorInput.value = selectedCar.color;
      updateNameInput.disabled = false;
      updateColorInput.disabled = false;
      updateBtn.disabled = false;
    }
  });
}
