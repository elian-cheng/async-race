import { data, options } from '../controllers/appController';
import { renderGarage, updateGarage } from './garageView';
import { renderWinners, updateWinners } from './winnersView';

export async function renderLayout() {
  document.body.innerHTML = `
    <div class="wrapper">
    ${renderHeader()}
      <main class="main">
        <div class="main__container">
          <div class="app">
            <div class="garage-view">
              <div class="forms">
                <form class="form form-create">
                  <input type="color" class="form__create-color input-color create-color" name="color" value="#f7e308">
                  <input type="text" class="form__create-name input-text create-name" name="name" placeholder="Enter car name...">
                  <button type="submit" class="form__create-button create-button button" disabled="">CREATE</button>
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
          </div>
        </div>
      </main>
    ${renderFooter()}
    </div>
  `;
}

export default function renderView() {
  const garageButton = document.querySelector('.garage-button') as HTMLButtonElement;
  const winnersButton = document.querySelector('.winners-button') as HTMLButtonElement;
  const garageContainer = document.querySelector('.garage-view') as HTMLDivElement;
  const winnersContainer = document.querySelector('.winners-view') as HTMLDivElement;

  garageButton.addEventListener('click', async () => {
    winnersContainer.classList.add('hidden');
    garageContainer.classList.remove('hidden');
    options.view = 'garage';
    updateGarage();
  });

  winnersButton.addEventListener('click', async () => {
    await updateWinners();
    garageContainer.classList.add('hidden');
    winnersContainer.classList.remove('hidden');
    winnersContainer.innerHTML = renderWinners(data.winners);
    options.view = 'winners';
  });
}

function renderHeader() {
  return `
    <header class="header">
      <div class="header__container">
        <div class="header__menu">
          <button type="button" class="header__button garage-button button">
            <span>«</span> GARAGE</button>
          <button type="button" class="header__button winners-button button">WINNERS <span>»</span></button>
        </div>
      </div>
    </header>
  `;
}

function renderFooter() {
  return `
    <footer class="footer">
      <div class="footer__container">
        <div class="footer__copy"><a
            href="https://github.com/rolling-scopes-school/tasks/blob/master/tasks/async-race.md">© 2022</a></div>
        <div class="footer__icons">
          <a href="https://github.com/elian-cheng" target="_blank" class="footer__git-link">
            <img src="./assets/img/git.svg" alt="github">
          </a>
          <a href="https://rs.school/js/" target="_blank" class="footer__rs-link">
            <img src="./assets/img/rs-school.svg" alt="rs-school-js">
          </a>
        </div>
      </div>
    </footer>
  `;
}
