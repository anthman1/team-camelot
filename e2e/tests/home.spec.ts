import { test, expect } from "@playwright/test";

test.describe("Home Page", () => {
  test("should display Team Camelot heading", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("heading", { name: "Team Camelot" })).toBeVisible();
  });

  test("should toggle themes", async ({ page }) => {
    await page.goto("/");

    // Get initial theme
    const html = page.locator("html");
    const initialTheme = await html.getAttribute("data-theme");

    // Click theme toggle
    await page.getByRole("button", { name: "Switch Theme" }).click();

    // Theme should change
    const newTheme = await html.getAttribute("data-theme");
    expect(newTheme).not.toBe(initialTheme);
  });
});
