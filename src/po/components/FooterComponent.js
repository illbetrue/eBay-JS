import { BaseComponent } from "./BaseComponent";

export class FooterComponent extends BaseComponent {
  constructor(container) {
    super(container);
  }

  async selectFooterOption(parameter) {
    const options = {
      "Sign in/Register": "Sign in / Register",
      "Sell an item": "Sell an item",
      Home: "Home",
      "Help Contact": "Help & Contact",
      "Download the free eBay app": "Download the free eBay app",
    };
    const optionName = options[parameter];
    const elements = await this.container.$$(
      "li.gh-group__item a.gh-group__link",
    );
    for (const element of elements) {
      const textContent = await element.textContent();
      if (textContent && textContent.trim() === optionName) {
        await element.scrollIntoViewIfNeeded();
        return element;
      }
    }
    throw new Error(`Element with text '${optionName}' not found`);
  }
}
