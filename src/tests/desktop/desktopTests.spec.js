import { test } from "../../fixtures/fixture.js";
import { compareText } from "../../utils/compareText.js";
import { expect } from "allure-playwright";

test.describe("Desktop Tests @desktop", () => {
  test("should search, select and verify item", async ({
    basePage,
    itemPage,
    searchResultPage,
    headerComponent,
  }) => {
    const itemName = "iPhone 13";
    await basePage.openHomePage();
    await headerComponent.searchFor(itemName);
    await searchResultPage.markFilterOptionCheckbox("256 GB");
    await searchResultPage.selectItemByIndex(3);
    const context = basePage.page.context();
    const pagePromise = context.waitForEvent("page");
    const newPage = await pagePromise;
    itemPage = new itemPage.constructor(newPage);
    const result = await itemPage.getDesktopItemName();
    compareText(result, itemName, "contain");
  });

  test("should verify home page title", async ({ basePage }) => {
    await basePage.openHomePage();
    const expectedTitle =
      "Electronics, Cars, Fashion, Collectibles & More | eBay";
    const actualTitle = await basePage.page.title();
    compareText(actualTitle, expectedTitle, "be equal to");
  });

  test("should verify the logo", async ({ basePage, headerComponent }) => {
    await basePage.openHomePage();
    await expect(headerComponent.getLogoDesktop()).toBeVisible();
  });

  test("should select search category, search and verify searching result", async ({
    basePage,
    searchResultPage,
    headerComponent,
  }) => {
    await basePage.openHomePage();
    const searchCategory = "Books";
    const searchValue = "Stephen King";
    await headerComponent.selectOptionAndSearch(searchCategory, searchValue);
    const result = await searchResultPage.getSearchResultText();
    compareText(result, searchValue, "contain");
  });
});
