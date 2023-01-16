import { ChampionList } from '../types';
import { data, options } from '../controllers/appController';
import { getAllWinners } from '../controllers/dataController';
import { renderCarImage } from './garageView';

export function renderWinners(winners: ChampionList[]) {
  return `
      <h1>WINNERS (<span class="winners-view__count">${data.winnersCount}</span>)</h1>
      <h2>PAGE ${data.winnersPage}</h2>
      <table class="table">
        <thead>
          <tr>
            <th class='table-number'>№</th>
            <th>CAR</th>
            <th>MODEL</th>
            <th class="table-sort sort-wins ${
              options.sort === 'wins' ? options.order : ''
            }">WINS<span>${setSortingSign('wins')}</span></th>
            <th class="table-sort sort-time ${
              options.sort === 'time' ? options.order : ''
            }">BEST TIME<span>${setSortingSign('time')}</span></th>
          </tr>
        </thead>
        <tbody>
        ${winners
          .map(
            (winner, index) => `
        <tr>
          <td class='table-number'>${index + 1}</td>
          <td class="table-car-image">${renderCarImage(winner.car.color)}</td>
          <td>${winner.car.name}</td>
          <td>${winner.wins}</td>
          <td>${winner.time}</td>
        </tr>`,
          )
          .join('')}
        </tbody>
      </table>
`;
}

export async function updateWinners() {
  const nextPage = document.querySelector('.next-button') as HTMLButtonElement;
  const prevPage = document.querySelector('.prev-button') as HTMLButtonElement;
  const { winners, count } = await getAllWinners(data.winnersPage);
  data.winners = winners;
  data.winnersCount = Number(count);
  if (data.winnersPage * 10 < data.winnersCount) {
    nextPage.disabled = false;
  } else {
    nextPage.disabled = true;
  }

  if (data.winnersPage > 1) {
    prevPage.disabled = false;
  } else {
    prevPage.disabled = true;
  }
}

export const renderSorting = async (sort: string) => {
  const winnersContainer = document.querySelector('.winners-view') as HTMLDivElement;
  options.order = options.order === 'asc' ? 'desc' : 'asc';
  options.sort = sort;
  await updateWinners();
  winnersContainer.innerHTML = renderWinners(data.winners);
};

const setSortingSign = (sort: string) => {
  if (options.sort === sort) {
    return options.order === 'asc' ? ' ↑' : ' ↓';
  }
  return '';
};
