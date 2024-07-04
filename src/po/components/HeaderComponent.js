export class HeaderComponent {
  #page;
  #searchInput;
  #searchButton;
  #logoDesktop;
  #logoMobile;
  #searchCategoriesDropdown;

  constructor(page) {
    this.#page = page;
    this.#searchInput = this.#page.locator('[type="text"]');
    this.#searchButton = this.#page.locator(
      '[type="submit"], button.gh-search__submitbtn',
    );
    this.#logoDesktop = this.#page.getByAltText("eBay Home");
    this.#logoMobile = this.#page.getByAltText("eBay Logo");
    this.#searchCategoriesDropdown = this.#page.locator(
      `//table[@id='gh-search-wrap']`,
    );
  }

  async searchFor(query) {
    await this.#searchInput.fill(query);
    await this.#searchButton.click();
  }

  async selectOptionAndSearch(value, query) {
    await this.#searchCategoriesDropdown.click();
    await this.#page.selectOption(
      '//table[@id="gh-search-wrap"]//select',
      value,
    );
    await this.#searchInput.fill(query);
    await this.#searchButton.click();
  }

  getLogoMobile() {
    return this.#logoMobile;
  }

  getLogoDesktop() {
    return this.#logoDesktop;
  }
}
