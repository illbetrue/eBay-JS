export class FooterComponent {
  #page;
  constructor(page) {
    this.#page = page;
  }

  async footerOption(parameter) {
    const selectors = {
      "Sign in/Register": "Sign in / Register",
      "Sell an item": "Sell an item",
      Home: "Home",
      "Help Contact": "Help & Contact",
      "Download the free eBay app": "Download the free eBay app",
    };
    const selectorName = selectors[parameter];
    if (selectorName) {
      const elements = await this.#page.$$(
        "li.gh-group__item a.gh-group__link",
      );
      for (const element of elements) {
        const textContent = await element.textContent();
        if (textContent && textContent.trim() === selectorName) {
          await element.scrollIntoViewIfNeeded();
          return element;
        }
      }
      throw new Error(`Element with text '${selectorName}' not found`);
    } else {
      throw new Error(`Selector for parameter ${parameter} not found`);
    }
  }
}
