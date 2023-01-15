import { data, options } from '../controllers/appController';
import { renderGarage, updateGarage } from '../controllers/garageController';
import { renderWinners } from '../controllers/winnersController';

export async function renderLayout() {
  const appContainer = document.querySelector('.app') as HTMLDivElement;
  appContainer.innerHTML = `
    <div class="garage-view">
      <div class="forms">
        <form class="form form-create">
          <input type="color" class="form__create-color input-color create-color" name="color" value="#f7e308">
          <input type="text" class="form__create-name input-text create-name" name="name" placeholder="Enter car name...">
          <button type="submit" class="form__create-button create-button button">CREATE</button>
        </form>
        <form class="form form-update">
          <input type="color" class="form__update-color input-color update-color" name="color" disabled="" value="#f7e308">
          <input type="text" class="form__update-name input-text update-name" name="name" disabled="" placeholder="Enter car name...">
          <button type="submit" class="form__update-button update-button button" disabled="">UPDATE</button>
        </form>
      </div>
      <div class="race-controls">
        <button type="button" class="race-controls__race-button race-button button">RACE</button>
        <button type="button" class="race-controls__reset-button reset-button button" disabled="">RESET</button>
        <button type="button" class="race-controls__generate-button generate-button button">GENERATE CARS</button>
      </div>
      <div class="garage">${renderGarage()}</div>
      <div class="message-win">
        <p class="message"></p>
      </div>
    </div>
    <div class="winners-view hidden">${renderWinners(data.winners)}</div>
    <div class="pagination">
      <button type="button" class="pagination__prev-button prev-button button" disabled="">PREV</button>
      <button type="button" class="pagination__next-button next-button button" disabled="">NEXT</button>
    </div>
`;
}

export default function renderView() {
  const garageButton = document.querySelector('.garage-button') as HTMLButtonElement;
  const winnersButton = document.querySelector('.winners-button') as HTMLButtonElement;
  const garageContainer = document.querySelector('.garage-view') as HTMLDivElement;
  const winnersContainer = document.querySelector('.winners-view') as HTMLDivElement;

  garageButton.addEventListener('click', () => {
    winnersContainer.classList.add('hidden');
    garageContainer.classList.remove('hidden');
    options.view = 'garage';
    updateGarage();
  });

  winnersButton.addEventListener('click', () => {
    // await updateWinners();
    garageContainer.classList.add('hidden');
    winnersContainer.classList.remove('hidden');
    winnersContainer.innerHTML = renderWinners(data.winners);
    options.view = 'winners';
  });
}
