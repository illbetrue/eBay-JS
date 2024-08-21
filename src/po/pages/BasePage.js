export class BasePage {
  #container;

  constructor(container) {
    this.#container = container;
  }

  get container() {
    return this.#container;
  }
}
