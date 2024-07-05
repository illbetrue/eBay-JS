import { ItemPage } from "../pages/ItemPage";
import { SearchResultPage } from "../pages/SearchResultPage";

export class BasePage {
  #page;
  #itemPage;
  #searchResultPage;

  constructor(page) {
    this.#page = page;
    this.#itemPage = new ItemPage(page);
    this.#searchResultPage = new SearchResultPage(page);
  }

  get page() {
    return this.#page;
  }

  get itemPage() {
    return this.#itemPage;
  }

  get searchResultPage() {
    return this.#searchResultPage;
  }

  async openHomePage() {
    await this.#page.goto("/");
  }
}
