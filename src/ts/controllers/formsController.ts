import { Car } from '../types';
import { createCar, updateCar } from './dataController';
import { renderGarage, updateGarage } from './garageController';

export function renderForms() {
  const garage = document.querySelector('.garage') as HTMLDivElement;
  const createCarForm = document.querySelector('.form-create') as HTMLFormElement;

  createCarForm.addEventListener('submit', async (e: Event) => {
    e.preventDefault();
    const target = e.target as HTMLButtonElement;
    const createNameInput = document.querySelector('.create-name') as HTMLInputElement;
    const createColorInput = document.querySelector('.create-color') as HTMLInputElement;
    const car: Car = Object.fromEntries(
      new Map(
        Object.values(target)
          .filter(({ name }) => !!name)
          .map(({ value, name }) => [name, value]),
      ),
    );
    await createCar(car);
    await updateGarage();
    garage.innerHTML = renderGarage();
    createNameInput.value = '';
    createColorInput.value = '#f7e308';
    target.disabled = true;
  });

  const updateCarForm = document.querySelector('.form-update') as HTMLFormElement;
  updateCarForm.addEventListener('submit', async (e: Event) => {
    e.preventDefault();
    const target = e.target as HTMLButtonElement;
    const updateNameInput = document.querySelector('.update-name') as HTMLInputElement;
    const updateColorInput = document.querySelector('.update-color') as HTMLInputElement;
    const updateBtn = document.querySelector('.update-button') as HTMLButtonElement;
    const selectedCar: Car = (await JSON.parse(<string>localStorage.getItem('selectedCar'))) || '';

    const car = Object.fromEntries(
      new Map(
        Object.values(target)
          .filter(({ name }) => !!name)
          .map(({ value, name }) => [name, value]),
      ),
    );
    if (selectedCar && selectedCar.id) await updateCar(selectedCar.id, car);
    await updateGarage();
    garage.innerHTML = renderGarage();
    updateNameInput.value = '';
    updateNameInput.disabled = true;
    updateColorInput.value = '#f7e308';
    updateColorInput.disabled = true;
    updateBtn.disabled = true;
    localStorage.removeItem('selectedCar');
  });
}
