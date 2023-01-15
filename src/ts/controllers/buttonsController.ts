import { Car, Champion } from '../types';
import { deleteCar, deleteWinner, getCar, saveWinner } from './dataController';
import { renderGarage, updateGarage } from '../components/garageView';
import { renderRace, startDriving, stopDriving } from './drivingController';
import { data } from './appController';

export function renderButtonEvents() {
  renderCarButtons();
  renderControlButtons();
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

async function startRace(e: Event) {
  const message = document.querySelector('.message-win') as HTMLElement;
  const target = e.target as HTMLButtonElement;
  target.disabled = true;
  const winner = (await renderRace(startDriving)) as Champion;
  await saveWinner(winner);
  data.winnersCount++;
  message.innerHTML = `${winner.car.name} went first (${winner.time}s)!`;
  message.classList.toggle('visible', true);
  const resetButton = document.querySelector('.reset-button') as HTMLButtonElement;
  resetButton.disabled = false;
}

async function resetRace(e: Event) {
  const target = e.target as HTMLButtonElement;
  target.disabled = true;
  data.cars.map((car) => {
    const carID = car.id as number;
    return stopDriving(carID);
  });
  const message = document.querySelector('.message-win') as HTMLElement;
  message.classList.toggle('visible', false);
  const raceButton = document.querySelector('.race-button') as HTMLButtonElement;
  raceButton.disabled = false;
}
