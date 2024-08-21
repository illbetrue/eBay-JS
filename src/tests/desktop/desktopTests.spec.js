import { test } from "../../fixtures/fixture.js";
import { compareText } from "../../utils/compareText.js";
import { expect } from "allure-playwright";

test.describe("Desktop Tests @desktop", () => {
  test("should search, select and verify item", async ({
    page,
    itemPage,
    searchResultPage,
    headerComponent,
  }) => {
    const itemName = "Samsung Galaxy S23";
    await headerComponent.searchFor(itemName);
    await searchResultPage.markFilterOptionCheckbox("256 GB");
    await searchResultPage.selectItemByIndex(3);
    const context = page.context();
    const pagePromise = context.waitForEvent("page");
    const newPage = await pagePromise;
    itemPage = new itemPage.constructor(newPage);
    const result = await itemPage.getItemName();
    compareText(result, itemName, "contain");
  });

  test("should verify home page title", async ({ page }) => {
    const expectedTitle =
      "Electronics, Cars, Fashion, Collectibles & More | eBay";
    const actualTitle = await page.title();
    compareText(actualTitle, expectedTitle, "be equal to");
  });

  test("should verify the logo", async ({ headerComponent }) => {
    const logoElement = headerComponent.logoDesktop;
    await expect(logoElement).toBeVisible();
  });

  test("should select search category, search and verify searching result", async ({
    searchResultPage,
    headerComponent,
  }) => {
    const searchCategory = "Art";
    const searchValue = "Claude Monet";
    await headerComponent.selectOptionAndSearch(searchCategory, searchValue);
    const result = await searchResultPage.getSearchResultText();
    compareText(result, searchValue, "contain");
  });
});
