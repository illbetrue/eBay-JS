import { test } from "../../fixtures/fixture.js";
import { BaseComponent } from "../../po/components/BaseComponent.js";
import { compareText } from "../../utils/compareText.js";
import { expect } from "allure-playwright";

test.describe("Mobile Tests @mobile", () => {
  test("should search, select and verify item", async ({ basePage }) => {
    const itemName = "iPhone 13";
    await basePage.openHomePage();
    const baseComponent = new BaseComponent(basePage.page);
    await baseComponent.headerComponent.searchFor("iPhone 13");
    await basePage.searchResultPage.selectMobileCategoriesFilter(
      "Storage Capacity",
    );
    await basePage.searchResultPage.markMobileCheckBoxAndSubmit("256 GB");
    await basePage.searchResultPage.selectItemByIndex(3);
    const result = await basePage.itemPage.getMobileItemName();
    compareText(result, itemName, "contain");
  });

  test("should verify home page title", async ({ basePage }) => {
    await basePage.openHomePage();
    const expectedTitle =
      "Electronics, Cars, Fashion, Collectibles & More | eBay";
    const actualTitle = await basePage.page.title();
    compareText(actualTitle, expectedTitle, "be equal to");
  });

  test("should verify the logo", async ({ basePage }) => {
    await basePage.openHomePage();
    const baseComponent = new BaseComponent(basePage.page);
    await expect(baseComponent.headerComponent.getLogoMobile()).toBeVisible();
  });

  test("should select option from footer, go there and verify the page title", async ({
    basePage,
  }) => {
    await basePage.openHomePage();
    const baseComponent = new BaseComponent(basePage.page);
    const expectedTitle =
      "Selling on eBay | Electronics, Fashion, Home & Garden | eBay";
    const footerOption =
      await baseComponent.footerComponent.footerOption("Sell an item");
    await Promise.all([
      basePage.page.waitForNavigation({ waitUntil: "load" }),
      footerOption.click(),
    ]);
    await basePage.page.waitForTimeout(2000);
    const actualTitle = await basePage.page.title();
    compareText(actualTitle, expectedTitle, "be equal to");
  });
});
