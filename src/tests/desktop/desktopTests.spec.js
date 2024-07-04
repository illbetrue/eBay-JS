import { test } from "../../fixtures/fixture.js";
import { BaseComponent } from "../../po/components/BaseComponent.js";
import { compareText } from "../../utils/compareText.js";
import { expect } from "allure-playwright";

test.describe("Desktop Tests @desktop", () => {
  test("should search, select and verify item", async ({ basePage }) => {
    const itemName = "iPhone 13";
    await basePage.openHomePage();
    const baseComponent = new BaseComponent(basePage.page);
    await baseComponent.headerComponent.searchFor(itemName);
    await basePage.searchResultPage.markFilterOptionCheckbox("256 GB");
    const context = basePage.page.context();
    const [newPage] = await Promise.all([
      context.waitForEvent("page"),
      basePage.searchResultPage.selectItemByIndex(3),
    ]);
    await newPage.waitForLoadState("domcontentloaded");
    basePage.itemPage = new basePage.itemPage.constructor(newPage);
    const result = await basePage.itemPage.getDesktopItemName();
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
    await expect(baseComponent.headerComponent.getLogoDesktop()).toBeVisible();
  });

  test("should select search category, search and verify searching result", async ({
    basePage,
  }) => {
    await basePage.openHomePage();
    const baseComponent = new BaseComponent(basePage.page);
    const searchCategory = "Books";
    const searchValue = "Stephen King";
    await baseComponent.headerComponent.selectOptionAndSearch(
      searchCategory,
      searchValue,
    );
    const result = await basePage.searchResultPage.getSearchResultText();
    compareText(result, searchValue, "contain");
  });
});
