import { Car } from '../types';
import { deleteCar, deleteWinner, getCar } from './dataController';
import { renderGarage, updateGarage } from '../components/garageView';
import { startDriving, stopDriving } from './drivingController';
import { resetRace, startRace } from './raceController';
import { renderSorting } from '../components/winnersView';

export function renderButtonEvents() {
  renderCarButtons();
  renderControlButtons();
  renderHelperButtons();
  // renderPagination();
}

function renderCarButtons() {
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

function renderControlButtons() {
  document.body.addEventListener('click', async (e: Event) => {
    const target = e.target as HTMLElement;
    if (target.classList.contains('race-button')) {
      startRace(e);
    }

    if (target.classList.contains('reset-button')) {
      resetRace(e);
    }

    // if (target.classList.contains('generate-button')) {
    //   generateCars();
    // }
  });
}

function renderHelperButtons() {
  const message = document.querySelector('.message-win') as HTMLElement;

  document.body.addEventListener('click', async (e: Event) => {
    const target = e.target as HTMLElement;
    if (target.classList.contains('sort-wins')) {
      renderSorting('wins');
    }

    if (target.classList.contains('sort-time')) {
      renderSorting('time');
    }

    if (target !== message && message.classList.contains('visible')) {
      message.classList.toggle('visible', false);
    }
  });
}
