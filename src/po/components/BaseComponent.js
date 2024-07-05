import { HeaderComponent } from "../components/HeaderComponent";
import { FooterComponent } from "../components/FooterComponent";

export class BaseComponent {
  #headerComponent;
  #footerComponent;

  constructor(page) {
    this.#headerComponent = new HeaderComponent(page);
    this.#footerComponent = new FooterComponent(page);
  }

  get headerComponent() {
    return this.#headerComponent;
  }

  get footerComponent() {
    return this.#footerComponent;
  }
}
