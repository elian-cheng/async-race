export interface Car {
  id?: number;
  name: string;
  color: string;
  isEngineStarted?: boolean;
}
export interface RacingCar {
  id: number;
  success?: boolean;
  time: number;
}

export interface ChampionList {
  id?: number;
  wins?: number;
  time: number;
  car: Car;
}

export interface Champion {
  id?: number;
  car: Car;
  time: number;
}

export interface ChampionOptions {
  page: number;
  limit?: 10;
  sort?: string;
  order?: string;
}

export interface Engine {
  velocity: number;
  distance: number;
}

export interface Drive {
  success: boolean;
}

export interface Animate {
  id?: number;
}

export interface ChampionStats {
  id: number;
  wins: number;
  time: number;
}
