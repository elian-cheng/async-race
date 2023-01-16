import { data, options } from '../controllers/appController';
import { renderGarage, updateGarage } from './garageView';
import { renderWinners, updateWinners } from './winnersView';

export default function renderPagination() {
  const prevPageButton = document.querySelector('.prev-button') as HTMLButtonElement;
  const nextPageButton = document.querySelector('.next-button') as HTMLButtonElement;
  const garageContainer = document.querySelector('.garage') as HTMLDivElement;
  const winnersContainer = document.querySelector('.winners-view') as HTMLDivElement;

  prevPageButton.addEventListener('click', async () => {
    if (options.view === 'winners') {
      prevPageButton.disabled = true;
      data.winnersPage--;
      await updateWinners();
      winnersContainer.innerHTML = renderWinners(data.winners);
    } else {
      data.carsPage--;
      await updateGarage();
      garageContainer.innerHTML = renderGarage();
    }
  });

  nextPageButton.addEventListener('click', async () => {
    if (options.view === 'winners') {
      nextPageButton.disabled = true;
      data.winnersPage++;
      await updateWinners();
      winnersContainer.innerHTML = renderWinners(data.winners);
    } else {
      data.carsPage++;
      await updateGarage();
      garageContainer.innerHTML = renderGarage();
    }
  });
}
