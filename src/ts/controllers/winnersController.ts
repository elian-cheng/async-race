import { ChampionList } from '../types';
import { data, options } from './appController';
import { renderCarImage } from './garageController';

export function renderWinners(winners: ChampionList[]) {
  return `
      <h1>WINNERS (<span class="winners-view__count">${data.winnersCount}</span>)</h1>
      <h2>PAGE ${data.winnersPage}</h2>
      <table class="table">
        <thead>
          <tr>
            <th>№</th>
            <th>CAR</th>
            <th>MODEL</th>
            <th class="table__th sort-wins ${
              options.sort === 'wins' ? options.order : ''
            }">WINS</th>
            <th class="table__th sort-time ${
              options.sort === 'time' ? options.order : ''
            }">BEST TIME</th>
          </tr>
        </thead>
        <tbody>
        ${winners
          .map(
            (winner, index) => `
        <tr>
          <td>${index + 1}</td>
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
