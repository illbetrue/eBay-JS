import { expect } from "@playwright/test";

export function compareText(firstText, secondText, compareOption) {
  switch (compareOption) {
    case "contain":
      return expect(firstText).toContain(secondText);
    case "not contain":
      return expect(firstText).not.toContain(secondText);
    case "be equal to":
      return expect(firstText).toEqual(secondText);
    case "not be equal to":
      return expect(firstText).not.toEqual(secondText);
    default:
      throw Error(`'${compareOption}' is not a valid comprasion option`);
  }
}
