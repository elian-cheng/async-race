import { renderAnimation } from '../components/animation';
import { Car, Champion, Engine, RacingCar } from '../types';
import { data } from './appController';
import { driveCar, startEngine, stopEngine } from './dataController';

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
    return raceAllCars(restPromises, restIds);
  }
  const winnerCar = data.cars.find((car) => car.id === id) as Car;
  const winner = { car: winnerCar, time: +(time / 1000).toFixed(2) };
  return winner;
}

export async function startDriving(id: number) {
  const startButton = document.querySelector(`#start-${id}`) as HTMLButtonElement;
  const stopButton = document.querySelector(`#stop-${id}`) as HTMLButtonElement;
  startButton.disabled = true;
  const carEngine: Engine = await startEngine(id);
  const time = Math.round(carEngine.distance / carEngine.velocity);
  const car = document.querySelector(`#car-${id}`) as HTMLElement;
  const flag = document.querySelector(`#flag-${id}`) as HTMLElement;
  const htmlDistance = Math.floor(getDistanceBetweenElements(car, flag)) - 20;
  data.animation[id] = renderAnimation(car, htmlDistance, time);
  stopButton.disabled = false;
  const { success } = await driveCar(id);
  const animationId = data.animation[id].id as number;
  if (!success) window.cancelAnimationFrame(animationId);
  const res: RacingCar = {
    success,
    id,
    time,
  };
  return res;
}

export async function stopDriving(id: number) {
  const startButton = document.querySelector(`#start-${id}`) as HTMLButtonElement;
  const stopButton = document.querySelector(`#stop-${id}`) as HTMLButtonElement;
  stopButton.disabled = true;
  await stopEngine(id);
  startButton.disabled = false;
  const car = document.querySelector(`#car-${id}`) as HTMLElement;
  car.style.transform = 'translateX(0)';
  const animationId = data.animation[id].id as number;
  if (data.animation[id]) window.cancelAnimationFrame(animationId);
}

function getPosition(element: HTMLElement) {
  const { top, left, width, height } = element.getBoundingClientRect();
  return {
    x: left + width / 2,
    y: top + height / 2,
  };
}

function getDistanceBetweenElements(firstEl: HTMLElement, secondEl: HTMLElement) {
  const aPosition = getPosition(firstEl);
  const bPosition = getPosition(secondEl);
  return Math.hypot(aPosition.x - bPosition.x, aPosition.y - bPosition.y);
}
