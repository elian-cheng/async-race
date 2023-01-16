import renderAnimation from '../components/animation';
import CarFire from '../components/engineFire';
import { Engine, RacingCar } from '../types';
import { data } from './appController';
import { driveCar, startEngine, stopEngine } from './dataController';

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
  let { success } = await driveCar(id);
  const animationId = data.animation[id].id as number;
  if (!success) {
    window.cancelAnimationFrame(animationId);
    car.append(new CarFire());
  }
  if (stopButton.disabled) {
    success = false;
  }
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
  car.querySelector('.car-fire')?.remove();
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
