import { Car } from '../types';
import { data } from './appController';
import { getAllCars } from './dataController';

export function renderGarage() {
  return `
  <h1>GARAGE (<span class="garage__count">${data.carsCount}</span>)</h1>
  <h2>PAGE <span class="garage__page">${data.carsPage}</span></h2>
  <ul class="cars">
    ${data.cars.map((car) => `<li class="car">${renderCarTrack(car)}</li>`).join('')}
  </ul>
  `;
}

export async function updateGarage() {
  const firstPageNumber = 1;
  const carsOnPageNumber = 7;
  const nextPage = document.querySelector('.next-button') as HTMLButtonElement;
  const prevPage = document.querySelector('.prev-button') as HTMLButtonElement;
  const { cars, count } = await getAllCars(data.carsPage);
  data.cars = cars;
  data.carsCount = Number(count);
  const lastPageNumber = data.carsCount / carsOnPageNumber;

  if (data.carsPage < lastPageNumber) {
    nextPage.disabled = false;
  } else {
    nextPage.disabled = true;
  }

  if (data.carsPage > firstPageNumber) {
    prevPage.disabled = false;
  } else {
    prevPage.disabled = true;
  }
}

function renderCarTrack(car: Car) {
  return `
  <div class="car-controls">
    <button class="car-controls__select-button select-button button" type="button" id="select-${
      car.id
    }">SELECT</button>
    <button class="car-controls__remove-button delete-button button" type="button" id="delete-${
      car.id
    }">REMOVE</button>
  <div class="control-buttons">
    <button class="car-controls__start-button start-button button" type="button" id="start-${
      car.id
    }" ${car.isEngineStarted ? 'disabled' : ''}>▶</button>
    <button class="car-controls__stop-button stop-button button" type="button" id="stop-${
      car.id
    }" ${car.isEngineStarted ? 'disabled' : ''}>II</button>
  </div>
  <span class="car-name">${car.name}</span>
</div>
<div class="track">
  <div class="car__image" id="car-${car.id}">${renderCarImage(car.color)}</div>
  <div class="flag__image" id="flag-${car.id}">${flag}</div>
</div>
  `;
}

export function renderCarImage(color: string) {
  return `
<svg version="1.0" xmlns="http://www.w3.org/2000/svg"
 width="100.000000pt" height="50.000000pt" viewBox="0 0 846.000000 476.000000"
 preserveAspectRatio="xMidYMid meet">
<g transform="translate(0.000000,476.000000) scale(0.100000,-0.100000)"
fill="${color}" stroke="none">
<path d="M3300 3434 c-489 -41 -1230 -142 -2050 -279 l-325 -55 -209 3 c-206
2 -209 2 -223 -20 -9 -13 -21 -23 -28 -23 -24 0 -64 -41 -70 -72 -7 -29 -3
-35 33 -67 l41 -36 -33 -84 c-18 -47 -38 -87 -44 -89 -6 -2 -23 3 -38 11 l-28
15 -23 -112 c-18 -90 -27 -115 -47 -131 -38 -30 -46 -88 -46 -330 0 -264 2
-269 107 -412 l77 -102 -3 -60 -2 -59 56 -7 c30 -4 116 -4 190 0 134 7 135 7
135 31 0 18 9 27 32 37 l33 13 31 -62 c40 -80 101 -157 167 -212 59 -49 188
-114 262 -132 71 -17 238 -14 310 5 196 52 370 207 437 388 11 32 26 56 32 54
6 -2 14 -43 18 -96 3 -51 9 -95 12 -99 16 -15 1094 -36 2736 -52 982 -9 900
-15 900 67 l0 43 63 0 62 -1 34 -50 c78 -115 227 -219 366 -254 74 -19 220
-22 300 -6 33 7 98 31 145 53 66 32 101 57 161 117 41 42 85 89 95 104 19 27
23 28 64 20 42 -8 44 -11 56 -54 6 -26 15 -52 19 -59 6 -11 119 -12 569 -6
309 3 587 9 619 13 l59 6 -7 36 c-4 20 -23 88 -42 151 -60 193 -60 195 -28
283 l28 77 -29 37 c-82 110 -253 238 -514 386 -239 135 -362 188 -650 284
-376 124 -438 134 -637 104 l-133 -19 -172 80 c-441 205 -722 319 -1095 443
-112 36 -203 68 -203 71 0 2 26 17 57 33 57 28 57 29 28 35 -51 10 -370 35
-584 46 -276 14 -880 10 -1071 -6z m1028 -114 c293 -23 698 -108 909 -191 48
-19 52 -23 58 -62 3 -23 9 -56 12 -74 l5 -31 -59 5 c-47 4 -66 0 -103 -19 -48
-25 -90 -77 -90 -113 0 -31 34 -71 66 -79 23 -6 25 -9 13 -21 -12 -12 -124 -2
-759 66 -410 43 -777 82 -817 85 -39 4 -76 10 -82 13 -6 4 12 79 51 206 33
110 61 201 63 203 1 1 65 6 141 11 198 12 449 12 592 1z m-783 -32 c-3 -7 -29
-93 -60 -191 -30 -98 -57 -182 -59 -186 -3 -4 -99 5 -213 21 -531 72 -929 130
-936 137 -4 4 15 20 43 35 55 30 131 44 605 116 533 79 628 90 620 68z m2080
-326 c72 -33 211 -99 310 -148 l180 -87 -50 -8 c-161 -26 -608 -41 -664 -23
-10 3 5 24 47 67 38 38 62 71 62 84 0 26 -49 65 -105 84 -22 7 -43 16 -46 19
-4 3 -10 35 -14 72 l-7 68 79 -34 c43 -18 137 -61 208 -94z m1935 -563 c84
-32 219 -109 385 -220 l110 -73 -50 -8 -49 -7 -119 81 c-67 45 -203 122 -310
175 l-192 94 75 -6 c45 -4 105 -18 150 -36z m-5950 -47 c93 -32 142 -62 207
-125 118 -113 173 -238 173 -394 0 -159 -51 -285 -160 -393 -170 -171 -424
-209 -644 -98 -83 42 -193 154 -234 238 -34 69 -62 179 -62 245 0 69 28 177
66 254 67 137 215 252 367 287 80 18 214 11 287 -14z m4991 -5 c146 -53 251
-143 313 -269 113 -229 68 -483 -115 -652 -299 -277 -781 -144 -901 247 -29
97 -23 264 14 354 74 178 224 303 413 343 68 15 203 4 276 -23z"/>
<path d="M1320 2296 c-86 -25 -200 -90 -200 -116 0 -9 212 -192 229 -198 4 -1
11 53 15 120 4 68 9 142 12 166 4 23 2 42 -2 41 -5 0 -29 -6 -54 -13z"/>
<path d="M1460 2288 c0 -36 23 -303 26 -307 2 -2 62 47 134 109 l130 112 -22
18 c-38 29 -104 59 -165 75 -81 21 -103 20 -103 -7z"/>
<path d="M1691 2018 l-112 -133 63 -6 c35 -4 113 -10 174 -14 l111 -7 -7 48
c-11 67 -41 142 -79 197 -18 26 -33 47 -35 47 -1 0 -53 -60 -115 -132z"/>
<path d="M1028 2077 c-29 -47 -52 -111 -63 -176 l-7 -44 108 8 c59 4 127 10
150 14 l42 6 -89 105 c-50 58 -95 111 -102 117 -10 10 -18 3 -39 -30z"/>
<path d="M1362 1867 c-28 -29 -28 -67 -1 -101 43 -55 139 -21 139 50 0 67 -92
100 -138 51z"/>
<path d="M1720 1764 c-74 -7 -136 -13 -138 -13 -1 -1 46 -57 105 -126 l107
-125 24 22 c33 32 91 155 98 211 l7 47 -34 -1 c-19 -1 -95 -7 -169 -15z"/>
<path d="M965 1743 c15 -67 38 -123 69 -172 l33 -53 96 113 96 114 -37 6 c-20
4 -88 10 -150 14 l-113 7 6 -29z"/>
<path d="M1240 1559 c-57 -49 -106 -92 -109 -95 -13 -13 123 -87 193 -105 26
-6 49 -9 52 -6 7 7 -17 297 -25 297 -3 0 -53 -41 -111 -91z"/>
<path d="M1487 1643 c-3 -5 -8 -64 -11 -133 -4 -69 -9 -133 -12 -142 -12 -40
135 -10 234 48 36 21 42 28 31 38 -36 33 -215 183 -226 189 -6 4 -14 4 -16 0z"/>
<path d="M6290 2291 c-83 -27 -190 -89 -190 -110 0 -9 230 -204 234 -199 4 3
26 270 26 306 0 26 1 26 -70 3z"/>
<path d="M6443 2263 c4 -27 9 -93 13 -148 4 -55 10 -108 13 -118 5 -14 30 3
135 94 l128 112 -23 18 c-56 44 -179 89 -243 89 -28 0 -29 0 -23 -47z"/>
<path d="M6673 2017 c-61 -73 -110 -133 -110 -134 6 -5 339 -24 343 -20 12 11
-19 120 -52 185 -59 119 -52 120 -181 -31z"/>
<path d="M6006 2068 c-25 -44 -50 -117 -60 -177 l-6 -33 113 7 c61 4 130 10
151 13 l39 7 -98 113 c-53 61 -101 112 -106 112 -4 0 -19 -19 -33 -42z"/>
<path d="M6347 1872 c-43 -47 -4 -132 59 -132 65 0 98 84 51 128 -29 28 -87
29 -110 4z"/>
<path d="M6713 1765 c-73 -6 -135 -14 -138 -17 -6 -6 195 -246 206 -247 4 -1
23 23 43 52 35 51 68 130 79 195 8 38 21 36 -190 17z"/>
<path d="M5950 1746 c0 -35 34 -123 70 -180 l30 -47 97 113 96 113 -39 6 c-22
4 -87 10 -146 14 l-108 7 0 -26z"/>
<path d="M6223 1559 l-113 -98 33 -25 c43 -33 132 -73 181 -82 l39 -7 -8 114
c-4 63 -10 133 -14 155 l-6 41 -112 -98z"/>
<path d="M6466 1607 c-3 -29 -8 -99 -12 -156 l-7 -104 57 6 c55 5 186 58 206
82 7 9 -24 41 -114 118 l-124 105 -6 -51z"/>
</g>
</svg>
`;
}

const flag = `
<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="50.000000pt" height="50.000000pt"
 viewBox="0 0 511.999 511.999" style="enable-background:new 0 0 511.999 511.999;" xml:space="preserve">
<path style="fill:#E21B1B;" d="M103.919,51.744c0,0,41.296,33.496,109.008,18.4c64.2-14.264,124.056-30.464,224.616,5.856v215.032
c0,0-92.488-44.104-176.736-24.432s-131.88,12.12-156.888-12.888"/>
<rect x="90.74" y="37.524" style="fill:#999999;" width="16" height="474.475"/>
<circle style="fill:#666666;" cx="98.741" cy="24.284" r="24.284"/>
</svg>`;
