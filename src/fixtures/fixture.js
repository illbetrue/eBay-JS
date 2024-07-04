import { test as base } from "@playwright/test";
import { BasePage } from "../po/pages/BasePage";

export const test = base.extend({
  basePage: async ({ page }, use) => {
    const basePage = new BasePage(page);
    await use(basePage);
  },
});
