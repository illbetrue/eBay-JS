import { test as base } from "@playwright/test";
import { BasePage } from "../po/pages/BasePage";
import { ItemPage } from "../po/pages/ItemPage";
import { SearchResultPage } from "../po/pages/SearchResultPage";
import { BaseComponent } from "../po/components/BaseComponent";
import { FooterComponent } from "../po/components/FooterComponent";
import { HeaderComponent } from "../po/components/HeaderComponent";

export const test = base.extend({
  basePage: async ({ page }, use) => {
    const basePage = new BasePage(page);
    await use(basePage);
  },
  itemPage: async ({ page }, use) => {
    const itemPage = new ItemPage(page);
    await use(itemPage);
  },
  searchResultPage: async ({ page }, use) => {
    const searchResultPage = new SearchResultPage(page);
    await use(searchResultPage);
  },
  baseComponent: async ({ page }, use) => {
    const baseComponent = new BaseComponent(page);
    await use(baseComponent);
  },
  footerComponent: async ({ page }, use) => {
    const footerComponent = new FooterComponent(page);
    await use(footerComponent);
  },
  headerComponent: async ({ page }, use) => {
    const headerComponent = new HeaderComponent(page);
    await use(headerComponent);
  },
});
