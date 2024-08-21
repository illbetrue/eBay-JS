import { test } from "../../fixtures/fixture.js";
import { compareText } from "../../utils/compareText.js";
import { expect } from "allure-playwright";

test.describe("Mobile Tests @mobile", () => {
  test("should search, select and verify item", async ({
    headerComponent,
    searchResultPage,
    itemPage,
  }) => {
    const itemName = "iPhone 13";
    await headerComponent.searchFor(itemName);
    await searchResultPage.tapMobileFilterButton();
    await searchResultPage.chooseMobileFilterOption("Condition");
    await searchResultPage.markMobileSubFilterOption("New");
    await searchResultPage.selectItemByIndex(3);
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
    const logoElement = headerComponent.logoMobile;
    await expect(logoElement).toBeVisible();
  });

  test("should select option from footer, go there and verify the page title", async ({
    page,
    footerComponent,
  }) => {
    const footerOption =
      await footerComponent.selectFooterOption("Sell an item");
    await Promise.all([
      page.waitForNavigation({ waitUntil: "load" }),
      footerOption.click(),
    ]);
    const actualTitle = await page.title();
    const expectedTitle =
      "Selling on eBay | Electronics, Fashion, Home & Garden | eBay";
    compareText(actualTitle, expectedTitle, "be equal to");
  });
});
