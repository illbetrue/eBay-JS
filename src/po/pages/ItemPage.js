import { BasePage } from "./BasePage";

export class ItemPage extends BasePage {
  #ItemName;

  constructor(container) {
    super(container);
    this.#ItemName = this.container.locator(".x-item-title__mainTitle");
  }

  async getItemName() {
    return await this.#ItemName.innerText();
  }
}
