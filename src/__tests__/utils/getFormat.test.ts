import { Languages } from "~/settings/i18n";
import type { ITranslation } from "~/types/data";
import getFormat from "~/utils/getFormat";

// Mock next-intl/server
jest.mock("next-intl/server", () => ({
  getLocale: jest.fn(),
}));

// Import the mocked function after the mock
// eslint-disable-next-line import/order
import { getLocale } from "next-intl/server";

const mockGetLocale = getLocale as jest.MockedFunction<typeof getLocale>;

describe("getFormat Utility", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should format single translation object with English locale", async () => {
    mockGetLocale.mockResolvedValue(Languages.English);

    const translation: ITranslation = {
      en: "Hello",
    };

    const format = await getFormat();
    const result = format(translation);

    expect(result).toBe("Hello");
  });

  it("should format array of translation objects", async () => {
    mockGetLocale.mockResolvedValue(Languages.English);

    const translations: ITranslation[] = [{ en: "First" }, { en: "Second" }, { en: "Third" }];

    const format = await getFormat();
    const result = format(translations);

    expect(result).toEqual(["First", "Second", "Third"]);
  });

  it("should fallback to English if locale key is missing", async () => {
    mockGetLocale.mockResolvedValue("fr");

    const translation: ITranslation = {
      en: "English Text",
    };

    const format = await getFormat();
    const result = format(translation);

    expect(result).toBe("English Text");
  });

  it("should handle empty array", async () => {
    mockGetLocale.mockResolvedValue(Languages.English);

    const translations: ITranslation[] = [];

    const format = await getFormat();
    const result = format(translations);

    expect(result).toEqual([]);
  });

  it("should use correct locale for each item in array", async () => {
    mockGetLocale.mockResolvedValue(Languages.English);

    const translations: ITranslation[] = [{ en: "One" }, { en: "Two" }, { en: "Three" }];

    const format = await getFormat();
    const result = format(translations);

    expect(result).toEqual(["One", "Two", "Three"]);
  });
});
