import { Car, Champion, ChampionList, ChampionStats, Drive, Engine, RacingCar } from '../types';
import { options } from './appController';

const API_URL = 'http://localhost:3000';
const GARAGE = `${API_URL}/garage`;
const ENGINE = `${API_URL}/engine`;
const WINNERS = `${API_URL}/winners`;

export async function getCar(id: number): Promise<Car> {
  const response: Response = await fetch(`${GARAGE}/${id}`);
  if (response.status !== 200) throw new Error('There was an error fetching car by id');
  const car: Car = await response.json();
  return car;
}

export async function getAllCars(page = 1, limit = 7): Promise<{ cars: Car[]; count: string }> {
  const response: Response = await fetch(`${GARAGE}?_limit=${limit}&_page=${page}`);
  if (response.status !== 200) throw new Error('There was an error fetching cars data');

  const data: Car[] = await response.json();
  return {
    cars: data,
    count: response.headers.get('X-Total-Count') || '0',
  };
}

export async function createCar(data: Car): Promise<Car> {
  const response: Response = await fetch(GARAGE, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (response.status === 201) return response.json() as Promise<Car>;
  throw new Error('There was an error creating new car');
}

export async function updateCar(id: number, data: Car): Promise<Car> {
  if (id === undefined || id <= 0) throw new Error('Incorrect id');
  const response: Response = await fetch(`${GARAGE}/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (response.status === 200) return response.json() as Promise<Car>;
  if (response.status === 404) throw new Error('Requested car is not found');
  throw new Error(`There was an error updating car with id ${id}`);
}

export async function deleteCar(id: number): Promise<boolean> {
  if (id === undefined || id <= 0) throw new Error('Incorrect id');
  const response: Response = await fetch(`${GARAGE}/${id}`, { method: 'DELETE' });
  if (response.status === 200) return true;
  if (response.status === 404) throw new Error('Requested car was not found');
  throw new Error(`There was an error deleting car with id ${id}`);
}

export async function startEngine(id: number): Promise<Engine> {
  if (id === undefined || id <= 0) throw new Error('Incorrect id');
  const response: Response = await fetch(`${ENGINE}?id=${id}&status=started`, {
    method: 'PATCH',
  });
  if (response.status === 200) return response.json() as Promise<Engine>;
  if (response.status === 400) throw new Error(`Bad request with id ${id} and status "started"`);
  if (response.status === 404) throw new Error('Requested car was not found');
  throw new Error('An error occured starting car engine');
}

export async function stopEngine(id: number): Promise<Engine> {
  if (id === undefined || id <= 0) throw new Error('Incorrect id');
  const response: Response = await fetch(`${ENGINE}?id=${id}&status=stopped`, {
    method: 'PATCH',
  });
  if (response.status === 200) return response.json() as Promise<Engine>;
  if (response.status === 400) throw new Error(`Bad request with id ${id} and status "stopped"`);
  if (response.status === 404) throw new Error('Requested car was not found');
  throw new Error('An error occured stopping car engine');
}

export async function driveCar(id: number): Promise<Drive> {
  if (id === undefined || id <= 0) throw new Error('Incorrect id');
  const response = await fetch(`${ENGINE}?id=${id}&status=drive`, {
    method: 'PATCH',
  }).catch();
  return response.status !== 200 ? { success: false } : { ...(await response.json()) };
}

export async function getAllWinners(
  page = 1,
  limit = 10,
): Promise<{ winners: ChampionList[]; count: number }> {
  const response = await fetch(
    `${WINNERS}?_page=${page}&_limit=${limit}${getSorting(options.sort, options.order)}`,
  );
  if (response.status !== 200) throw new Error('There was an error fetching winners list');

  const data = await response.json();
  return {
    winners: (await Promise.all(
      data.map(async (winners: RacingCar) => ({
        ...winners,
        car: await getCar(winners.id as number),
      })),
    )) as ChampionList[],
    count: Number(response.headers.get('X-Total-Count')),
  };
}

export async function getWinner(id: number): Promise<ChampionStats> {
  const response: Response = await fetch(`${WINNERS}/${id}`);
  if (response.status === 200) return response.json() as Promise<ChampionStats>;
  if (response.status === 404) throw new Error('Requested winner was not found');
  throw new Error(`There was an error getting winner with id ${id}`);
}

export async function getWinnerStatus(id: number): Promise<number> {
  return (await fetch(`${WINNERS}/${id}`)).status;
}

export async function deleteWinner(id: number): Promise<void> {
  const response: Response = await fetch(`${WINNERS}/${id}`, { method: 'DELETE' });
  if (response.status === 200) return;
  if (response.status === 404) throw new Error('Requested winner was not found');
  throw new Error(`There was an error deleting winner with id ${id}`);
}

export async function createWinner(data: ChampionStats): Promise<ChampionStats> {
  const response: Response = await fetch(WINNERS, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (response.status === 201) return response.json() as Promise<ChampionStats>;
  if (response.status === 500) {
    throw new Error('Could not create a record in winner table: Duplicate id');
  }
  throw new Error('There was an error creating winner');
}

export async function updateWinner(id: number, data: ChampionStats): Promise<ChampionStats> {
  const response: Response = await fetch(`${WINNERS}/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (response.status === 200) return response.json() as Promise<ChampionStats>;
  if (response.status === 404) throw new Error('Requested winner was not found');
  throw new Error(`There was an error updating winner with id ${id}`);
}

export async function saveWinner(car: Champion) {
  const id = car.car.id as number;
  const winnerStatus = await getWinnerStatus(id);
  if (winnerStatus === 404) {
    const winnerStats: ChampionStats = {
      id,
      wins: 1,
      time: car.time,
    };
    await createWinner(winnerStats);
  } else {
    const winner = await getWinner(id);
    const winnerStats: ChampionStats = {
      id,
      wins: winner.wins + 1,
      time: car.time < winner.time ? car.time : winner.time,
    };
    await updateWinner(id, winnerStats);
  }
}

function getSorting(sort: string, order: string) {
  if (sort && order) return `&_sort=${sort}&_order=${order}`;
  return '';
}
