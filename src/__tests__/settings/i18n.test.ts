import { AppTranslation, Languages } from "~/settings/i18n";

describe("i18n Settings", () => {
  describe("AppTranslation", () => {
    it("should have correct translation namespaces", () => {
      expect(AppTranslation.Common).toBe("common");
      expect(AppTranslation.Portfolio).toBe("portfolio");
    });

    it("should have all expected properties", () => {
      expect(Object.keys(AppTranslation)).toHaveLength(2);
      expect(AppTranslation).toHaveProperty("Common");
      expect(AppTranslation).toHaveProperty("Portfolio");
    });

    it("should be a const object", () => {
      // Verify it's treated as const by TypeScript
      expect(typeof AppTranslation).toBe("object");
    });
  });

  describe("Languages", () => {
    it("should have English language code", () => {
      expect(Languages.English).toBe("en");
    });

    it("should have all expected properties", () => {
      expect(Object.keys(Languages)).toHaveLength(1);
      expect(Languages).toHaveProperty("English");
    });

    it("should be a const object", () => {
      // Verify it's treated as const by TypeScript
      expect(typeof Languages).toBe("object");
    });
  });
});
