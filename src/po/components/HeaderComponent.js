import { BaseComponent } from "./BaseComponent";

export class HeaderComponent extends BaseComponent {
  #searchInput;
  #searchButton;
  #logoDesktop;
  #logoMobile;
  #searchCategoriesDropdown;

  constructor(container) {
    super(container);
    this.#searchInput = this.container.locator('[type="text"]');
    this.#searchButton = this.container.locator(
      '[type="submit"], button.gh-search__submitbtn',
    );
    this.#logoDesktop = this.container.locator("#gh-la");
    this.#logoMobile = this.container.getByAltText("eBay Logo");
    this.#searchCategoriesDropdown = this.container.locator(
      '//table[@id="gh-search-wrap"]',
    );
  }

  async searchFor(query) {
    await this.#searchInput.fill(query);
    await this.#searchButton.click();
  }

  async selectOptionAndSearch(value, query) {
    await this.#searchCategoriesDropdown.click();
    await this.container.selectOption(
      '//table[@id="gh-search-wrap"]//select',
      value,
    );
    await this.#searchInput.fill(query);
    await this.#searchButton.click();
  }

  async navigateToHomePageUsingDesktopLogo() {
    await this.logoDesktop.click();
  }

  async navigateToHomePageUsingMobileLogo() {
    await this.logoMobile.click();
  }

  get logoDesktop() {
    return this.#logoDesktop;
  }

  get logoMobile() {
    return this.#logoMobile;
  }
}
