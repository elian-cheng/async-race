const layout = `
    <div class="garage-view">
      <div class="forms">
        <div class="form">
          <input type="color" class="form__create-color input-color color" name="color" value="#f7e308">
          <input type="text" class="form__create-name input-text input" name="name" placeholder="Enter car name...">
          <button type="button" class="form__create-button button">CREATE</button>
        </div>
        <div class="form">
          <input type="color" class="form__update-color input-color color" name="color" disabled="" value="#f7e308">
          <input type="text" class="form__update-name input-text input" name="name" disabled="" placeholder="Enter car name...">
          <button type="button" class="form__update-button button" disabled="">UPDATE</button>
        </div>
      </div>
      <div class="race-controls">
        <button type="button" class="race-controls__race-button race-button button">RACE</button>
        <button type="button" class="race-controls__reset-button reset-button button" disabled="">RESET</button>
        <button type="button" class="race-controls__generate-button generate-button button">GENERATE CARS</button>
      </div>
      <div class="garage"></div>
      <div class="message-win">
        <p class="message"></p>
      </div>
    </div>
    <div class="winners"></div>
    <div class="pagination">
      <button type="button" class="pagination__prev-button prev-button button" disabled="">PREV</button>
      <button type="button" class="pagination__next-button next-button button">NEXT</button>
    </div>
`;

const winnersComponent = `
    <div class="winners"></div>
    <div class="pagination">
      <button type="button" class="pagination__prev-button prev-button button" disabled="">PREV</button>
      <button type="button" class="pagination__next-button next-button button">NEXT</button>
    </div>
      `;

export default function renderView() {
  const appContainer = document.querySelector('.app') as HTMLDivElement;
  const garageButton = document.querySelector('.garage-button') as HTMLButtonElement;
  const winnersButton = document.querySelector('.winners-button') as HTMLButtonElement;
  appContainer.innerHTML = layout;

  document.addEventListener('click', ({ target }) => {
    if (target === null) return;
    if (target === garageButton) {
      appContainer.innerHTML = '';
      appContainer.innerHTML = layout;
    }
    if (target === winnersButton) {
      appContainer.innerHTML = '';
      appContainer.innerHTML = winnersComponent;
    }
  });
}
