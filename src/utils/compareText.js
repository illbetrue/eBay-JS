import { expect } from "@playwright/test";

export function compareText(firstText, secondText, compareOption) {
  switch (compareOption) {
    case "contain":
      expect(firstText).toContain(secondText);
      break;
    case "not contain":
      expect(firstText).not.toContain(secondText);
      break;
    case "be equal to":
      expect(firstText).toEqual(secondText);
      break;
    case "not be equal to":
      expect(firstText).not.toEqual(secondText);
      break;
    default:
      throw Error(`'${compareOption}' is not a valid comparison option`);
  }
}
