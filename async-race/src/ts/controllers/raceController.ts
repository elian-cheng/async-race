import CarFire from '../components/engineFire';
import { Car, Champion, RacingCar } from '../types';
import { data } from './appController';
import { saveWinner } from './dataController';
import { startDriving, stopDriving } from './drivingController';

export async function startRace(e: Event) {
  const message = document.querySelector('.message-win') as HTMLElement;
  const winnersButton = document.querySelector('.winners-button') as HTMLButtonElement;
  const target = e.target as HTMLButtonElement;
  target.disabled = true;
  winnersButton.disabled = true;
  const winner = (await renderRace(startDriving)) as Champion;
  await saveWinner(winner);
  data.winnersCount++;
  message.innerHTML = `THE WINNER IS ${winner.car.name} (${winner.time} SEC)!`;
  message.classList.toggle('visible', true);
  const resetButton = document.querySelector('.reset-button') as HTMLButtonElement;
  resetButton.disabled = false;
  winnersButton.disabled = false;
}

export async function resetRace(e: Event) {
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
  document.querySelectorAll('.car-fire')?.forEach((cf: Element) => (cf as CarFire).remove());
}

export async function renderRace(action: (id: number) => Promise<RacingCar>): Promise<Champion> {
  const promises = data.cars.map((car) => {
    const carID = car.id as number;
    return action(carID);
  });
  const carIDs = data.cars.map((car) => car.id) as number[];
  const winner: Champion = await raceAllCars(promises, carIDs);
  return winner;
}

export async function raceAllCars(
  promises: Promise<RacingCar>[],
  ids: number[],
): Promise<Champion> {
  const { success, id, time } = await Promise.race(promises);
  if (!success) {
    const failedIndex = ids.findIndex((i) => i === id);
    const restPromises = [
      ...promises.slice(0, failedIndex),
      ...promises.slice(failedIndex + 1, promises.length),
    ];
    const restIds = [...ids.slice(0, failedIndex), ...ids.slice(failedIndex + 1, ids.length)];
    if (restIds.length === 0) {
      const message = document.querySelector('.message-win') as HTMLElement;
      message.innerHTML = 'Race Finished! All cars stopped :(';
      message.classList.toggle('visible', true);
      const resetButton = document.querySelector('.reset-button') as HTMLButtonElement;
      resetButton.disabled = false;
    }
    return raceAllCars(restPromises, restIds);
  }
  const winnerCar = data.cars.find((car) => car.id === id) as Car;
  const winner = { car: winnerCar, time: +(time / 1000).toFixed(2) };
  return winner;
}
