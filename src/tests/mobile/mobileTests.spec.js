import { test } from "../../fixtures/fixture.js";
import { compareText } from "../../utils/compareText.js";
import { expect } from "allure-playwright";

test.describe("Mobile Tests @mobile", () => {
  test("should search, select and verify item", async ({
    basePage,
    headerComponent,
    searchResultPage,
    itemPage,
  }) => {
    const itemName = "iPhone 13";
    await basePage.openHomePage();
    await headerComponent.searchFor("iPhone 13");
    await searchResultPage.selectMobileCategoriesFilter("Storage Capacity");
    await searchResultPage.markMobileCheckBoxAndSubmit("256 GB");
    await searchResultPage.selectItemByIndex(3);
    const result = await itemPage.getMobileItemName();
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
    await expect(headerComponent.getLogoMobile()).toBeVisible();
  });

  test("should select option from footer, go there and verify the page title", async ({
    basePage,
    footerComponent,
  }) => {
    await basePage.openHomePage();
    const expectedTitle =
      "Selling on eBay | Electronics, Fashion, Home & Garden | eBay";
    const footerOption =
      await footerComponent.selectFooterOption("Sell an item");
    await Promise.all([
      basePage.page.waitForNavigation({ waitUntil: "load" }),
      footerOption.click(),
    ]);
    const actualTitle = await basePage.page.title();
    compareText(actualTitle, expectedTitle, "be equal to");
  });
});
