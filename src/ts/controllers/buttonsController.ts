import { Car } from '../types';
import { deleteCar, deleteWinner, getCar } from './dataController';
import { renderGarage, updateGarage } from '../components/garageView';
import { startDriving, stopDriving } from './raceController';

export function renderButtonEvents() {
  renderCarButtons();
}

function renderCarButtons() {
  // const garageContainer = document.querySelector('.garage-view') as HTMLDivElement;
  // const winnersContainer = document.querySelector('.winners-view') as HTMLDivElement;
  const garage = document.querySelector('.garage') as HTMLDivElement;
  const updateNameInput = document.querySelector('.update-name') as HTMLInputElement;
  const updateColorInput = document.querySelector('.update-color') as HTMLInputElement;
  const updateButton = document.querySelector('.update-button') as HTMLButtonElement;
  const raceButton = document.querySelector('.race-button') as HTMLButtonElement;
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
      updateButton.disabled = false;
    }

    if (target.classList.contains('delete-button')) {
      const carIdSelected = Number(target.id.split('delete-')[1]);
      await deleteCar(carIdSelected);
      await updateGarage();
      garage.innerHTML = renderGarage();
      await deleteWinner(carIdSelected);
    }

    if (target.classList.contains('start-button')) {
      raceButton.disabled = true;
      const id = Number(target?.id.split('start-')[1]);
      startDriving(id);
    }

    if (target.classList.contains('stop-button')) {
      const id = Number(target?.id.split('stop-')[1]);
      stopDriving(id);
      raceButton.disabled = false;
    }
  });
}
