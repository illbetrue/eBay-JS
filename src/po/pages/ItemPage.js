export class ItemPage {
  #page;
  #desktopItemName;
  #mobileItemName;

  constructor(page) {
    this.#page = page;
    this.#desktopItemName = this.#page.locator(".x-item-title__mainTitle");
    this.#mobileItemName = this.#page.locator("div.vi-title__main");
  }

  async getDesktopItemName() {
    return await this.#desktopItemName.innerText();
  }

  async getMobileItemName() {
    return await this.#mobileItemName.innerText();
  }
}
