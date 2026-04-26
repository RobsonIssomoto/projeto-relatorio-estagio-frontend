import { test, expect } from "@playwright/test";

test("fazer login estagiário", async ({ page }) => {
  await page.goto("http://localhost:5173");

  await expect(page.getByRole("heading", { name: "Login" })).toBeVisible();

  await page.getByRole("textbox", { name: "E-mail" }).fill("robson.issomoto@fatec.com");
  await page.getByRole("textbox", { name: "Senha" }).fill("Fatec@2026");

  await expect(page.getByRole("button", { name: "Entrar" })).toBeEnabled();

  await Promise.all([page.waitForURL("**/dashboard/estagiario"), page.getByRole("button", { name: "Entrar" }).click()]);

  await expect(page.getByRole("heading", { name: "Visão Geral" })).toBeVisible();
});
