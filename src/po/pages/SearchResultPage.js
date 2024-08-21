import { BasePage } from "./BasePage";

export class SearchResultPage extends BasePage {
  #mobileFilterButton;
  #searchingResult;

  constructor(container) {
    super(container);
    this.#mobileFilterButton = this.container.locator(
      "button.srp-controls__control--link.srp-controls__control--link-left.srp-controls__control--link-enabled.btn",
    );
    this.#searchingResult = this.container.locator(
      "h1.srp-controls__count-heading",
    );
  }

  async selectItemByIndex(index) {
    const selector = "div.s-item__image-section";
    await this.container.waitForSelector(selector, { state: "visible" });
    const items = await this.container.$$(selector);

    if (index < 0 || index >= items.length) {
      throw new Error(
        `Index ${index} is out of range. Total available items: ${items.length}`,
      );
    }

    const item = items[index];
    await item.scrollIntoViewIfNeeded();
    await item.hover();
    await item.click();
  }

  async markFilterOptionCheckbox(value) {
    const checkbox = this.container.locator(`input[aria-label='${value}']`);
    await checkbox.scrollIntoViewIfNeeded();
    if (!(await checkbox.isChecked())) {
      await checkbox.click();
    }
    return checkbox;
  }

  async selectMobileCategoriesFilter(input) {
    await this.#mobileFilterButton.click();
    const mobileFilterCategoryButton = await this.container.locator(
      `(//span[text()='${input}']/following-sibling::span)[2]`,
    );
    await mobileFilterCategoryButton.click();
  }

  async markMobileCheckBoxAndSubmit(value) {
    const checkboxOption = `//label[text()='${value}']`;
    const submitButton = `//button[@idx='3']`;
    const mobileCategoryCheckbox = this.container.locator(checkboxOption);

    await this.container.waitForSelector(checkboxOption, { state: "attached" });
    await mobileCategoryCheckbox.click();

    const filterCategorySubmitButton = this.container.locator(submitButton);
    await this.container.waitForSelector(submitButton, { state: "attached" });
    await filterCategorySubmitButton.click();

    await this.container.waitForNavigation({ waitUntil: "networkidle" });
  }

  async getSearchResultText() {
    return await this.#searchingResult.innerText();
  }
}
