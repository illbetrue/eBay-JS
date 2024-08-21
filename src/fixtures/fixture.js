import { test as base } from "@playwright/test";
import { BasePage } from "../po/pages/BasePage";
import { ItemPage } from "../po/pages/ItemPage";
import { SearchResultPage } from "../po/pages/SearchResultPage";
import { BaseComponent } from "../po/components/BaseComponent";
import { FooterComponent } from "../po/components/FooterComponent";
import { HeaderComponent } from "../po/components/HeaderComponent";
import debug from "debug";
import fs from "fs";

export const test = base.extend({
  page: async ({ page }, use) => {
    await page.goto("/");
    await use(page);
  },
  basePage: async ({ page }, use) => {
    await use(new BasePage(page));
  },
  itemPage: async ({ page }, use) => {
    await use(new ItemPage(page));
  },
  searchResultPage: async ({ page }, use) => {
    await use(new SearchResultPage(page));
  },
  baseComponent: async ({ page }, use) => {
    await use(new BaseComponent(page));
  },
  footerComponent: async ({ page }, use) => {
    await use(new FooterComponent(page));
  },
  headerComponent: async ({ page }, use) => {
    await use(new HeaderComponent(page));
  },
  // eslint-disable-next-line no-empty-pattern
  saveLogs: [
    async ({}, use, testInfo) => {
      const logs = [];
      debug.log = (...args) => logs.push(args.map(String).join(""));
      debug.enable("po-eBay");

      await use();

      if (testInfo.status !== testInfo.expectedStatus) {
        const logFile = testInfo.outputPath("logs.txt");
        await fs.promises.writeFile(logFile, logs.join("\n"), "utf8");
        testInfo.attachments.push({
          name: "logs",
          contentType: "text/plain",
          path: logFile,
        });
      }
    },
    { auto: true },
  ],
});
