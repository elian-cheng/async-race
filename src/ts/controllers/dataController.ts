import { Car, ChampionList, RacingCar } from '../types';

const API_URL = 'http://localhost:3000';
const GARAGE = `${API_URL}/garage`;
// const ENGINE = `${API_URL}/engine`;
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

export async function getAllWinners(
  page = 1,
  limit = 10,
): Promise<{ winners: ChampionList[]; count: number }> {
  const response = await fetch(`${WINNERS}?_page=${page}&_limit=${limit}`);
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
