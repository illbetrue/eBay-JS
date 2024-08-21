export class BaseComponent {
  #container;

  constructor(container) {
    this.#container = container;
  }

  get container() {
    return this.#container;
  }
}
