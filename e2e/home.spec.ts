import { expect, test, type Page } from "@playwright/test";

// How far a section's top is from the bottom of the sticky nav (0 = right under it;
// negative = hidden behind the nav), absolute so both directions fail
const gapUnderNav = (page: Page, id: string) =>
  page.evaluate((sectionId) => {
    const nav = document.querySelector("header")!.getBoundingClientRect().height;
    return Math.abs(
      Math.round(document.getElementById(sectionId)!.getBoundingClientRect().top - nav),
    );
  }, id);

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test("hero shows the pitch, the Now card and the actions", async ({ page }) => {
  await expect(page.getByRole("heading", { level: 1 })).toContainText("actually use");
  await expect(page.getByText(/^Now$/)).toBeVisible();
  await expect(page.getByRole("link", { name: "See my work" })).toBeVisible();
  await expect(page.getByRole("link", { name: "Email Benny" }).first()).toHaveAttribute(
    "href",
    /^mailto:/,
  );
});

test("See my work scrolls Projects right under the nav", async ({ page }) => {
  await page.getByRole("link", { name: "See my work" }).click();
  await expect.poll(() => gapUnderNav(page, "projects")).toBeLessThanOrEqual(1);
});

for (const [label, id] of [
  ["Projects", "projects"],
  ["How I build", "tools"],
  ["Experience", "experience"],
  ["Contact", "contact"],
] as const) {
  test(`nav link ${label} anchors its section and becomes current`, async ({ page }) => {
    const nav = page.getByRole("navigation", { name: "Sections" });
    const link = nav.getByRole("link", { name: label, exact: true });
    await link.click();
    await expect(page).toHaveURL(new RegExp(`#${id}$`));
    // Contact is the last section, so the page may run out of scroll before it reaches the top
    if (id !== "contact") {
      await expect.poll(() => gapUnderNav(page, id)).toBeLessThanOrEqual(1);
    }
    await expect(link).toHaveAttribute("aria-current", "true");
  });
}

test("page never scrolls sideways", async ({ page }) => {
  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
  );
  expect(overflow).toBeLessThanOrEqual(0);
});

test("nothing hangs below the footer", async ({ page }) => {
  // A screen taller than the last section is what exposes a glow layer hanging past it
  await page.setViewportSize({ width: page.viewportSize()!.width, height: 1400 });
  const gap = await page.evaluate(() => {
    const footer =
      document.querySelector("footer")!.getBoundingClientRect().bottom + window.scrollY;
    return document.documentElement.scrollHeight - Math.round(footer);
  });
  expect(gap).toBeLessThanOrEqual(1);
});

test("every section renders", async ({ page }) => {
  for (const id of ["heroBanner", "projects", "tools", "experience", "education", "contact"]) {
    await expect(page.locator(`section#${id}`)).toBeAttached();
  }
  await expect(page.locator("#experience ol > li").first()).toBeVisible();
});
