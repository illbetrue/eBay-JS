export class SearchResultPage {
  #page;
  #mobileFilterButton;
  #searchingResult;

  constructor(page) {
    this.#page = page;
    this.#mobileFilterButton = this.#page.locator(
      "button.srp-controls__control--link.srp-controls__control--link-left.srp-controls__control--link-enabled.btn",
    );
    this.#searchingResult = this.#page.locator(
      `h1.srp-controls__count-heading`,
    );
  }

  async selectItemByIndex(index) {
    await this.#page.waitForSelector("div.s-item__image-section");
    const items = await this.#page.$$("div.s-item__image-section");
    if (index >= 0 && index < items.length) {
      await items[index].scrollIntoViewIfNeeded();
      await items[index].click({ force: true });
    } else {
      throw new Error(`Index ${index} not found. Elements: ${items.length}`);
    }
  }

  async markFilterOptionCheckbox(value) {
    const checkbox = await this.#page.locator(`input[aria-label='${value}']`);
    await checkbox.scrollIntoViewIfNeeded();
    if (!(await checkbox.isChecked())) {
      await checkbox.click();
    }
    return checkbox;
  }

  async selectMobileCategoriesFilter(input) {
    await this.#mobileFilterButton.click();
    const mobileFilterCategoryButton = await this.#page.locator(
      `(//span[text()='${input}']/following-sibling::span)[2]`,
    );
    await mobileFilterCategoryButton.click();
  }

  async markMobileCheckBoxAndSubmit(value) {
    const mobileCategoryCheckbox = await this.#page.locator(
      `//label[text()='${value}']`,
    );
    await mobileCategoryCheckbox.click();
    const filterCategorySubmitButton =
      await this.#page.locator(`//button[@idx='3']`);
    await filterCategorySubmitButton.click();
    await this.#page.waitForTimeout(1000);
  }

  async getSearchResultText() {
    return await this.#searchingResult.innerText();
  }
}
