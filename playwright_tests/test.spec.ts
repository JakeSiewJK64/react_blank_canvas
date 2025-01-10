import { test, expect } from "@playwright/test";

test.describe("test home page", () => {
  // go to localhost before running any tests
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:5173/");
  });

  test("has hello world", async ({ page }) => {
    // Expect a title "to contain" a substring.
    await expect(
      page.getByRole("heading", {
        name: "Hello World",
        exact: false,
      })
    ).toBeVisible();
  });

  test("has button", async ({ page }) => {
    // Expect a title "to contain" a substring.
    await expect(
      page.getByRole("button", {
        name: "Button",
        exact: true,
      })
    ).toBeVisible();
  });
});

test.describe("test login pagee", () => {
  // go to localhost before running any tests
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:5173/login");
  });

  test("input username and password", async ({ page }) => {
    await page.getByPlaceholder("username").fill("my username");

    await page
      .getByRole("button", {
        name: "Sign In",
        exact: false,
      })
      .click();

    await expect(
      page.getByText("my username", {
        exact: false,
      })
    ).toBeVisible();
  });
});
