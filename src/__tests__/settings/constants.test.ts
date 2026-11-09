import { AppCollection, PortfolioSection, SocialMedia } from "~/settings/constants";

describe("Constants", () => {
  describe("PortfolioSection", () => {
    it("should have correct section names", () => {
      expect(PortfolioSection.HeroBanner).toBe("heroBanner");
      expect(PortfolioSection.Projects).toBe("projects");
      expect(PortfolioSection.Tools).toBe("tools");
      expect(PortfolioSection.Experience).toBe("experience");
      expect(PortfolioSection.Education).toBe("education");
      expect(PortfolioSection.Contact).toBe("contact");
    });

    it("should have all expected properties", () => {
      expect(Object.keys(PortfolioSection)).toEqual([
        "HeroBanner",
        "Projects",
        "Tools",
        "Experience",
        "Education",
        "Contact",
      ]);
    });
  });

  describe("AppCollection", () => {
    it("should have correct collection names", () => {
      expect(AppCollection.Experiences).toBe("experiences");
      expect(AppCollection.Projects).toBe("projects");
      expect(AppCollection.SocialMedia).toBe("socialMedia");
      expect(AppCollection.Tools).toBe("tools");
      expect(AppCollection.Education).toBe("education");
      expect(AppCollection.Content).toBe("content");
    });

    it("should have all expected properties", () => {
      expect(Object.keys(AppCollection)).toHaveLength(6);
      expect(AppCollection).toHaveProperty("Experiences");
      expect(AppCollection).toHaveProperty("Projects");
      expect(AppCollection).toHaveProperty("SocialMedia");
    });
  });

  describe("SocialMedia", () => {
    it("should have correct social media platform names", () => {
      expect(SocialMedia.Github).toBe("github");
      expect(SocialMedia.Linkedin).toBe("linkedin");
      expect(SocialMedia.Email).toBe("email");
    });

    it("should have all expected properties", () => {
      expect(Object.keys(SocialMedia)).toHaveLength(3);
      expect(SocialMedia).toHaveProperty("Github");
      expect(SocialMedia).toHaveProperty("Linkedin");
      expect(SocialMedia).toHaveProperty("Email");
    });
  });
});
