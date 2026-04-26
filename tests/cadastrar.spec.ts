import { test, expect } from "@playwright/test";

test("cadastrar estagiário", async ({ page }) => {
  const email = `robson${Date.now()}@fatec.com`;
  await page.goto("http://localhost:5173");
  await page.getByRole("link", { name: "Cadastrar" }).click();
  await expect(page).toHaveURL("http://localhost:5173/cadastro");
  await expect(page.getByRole("heading", { name: "Qual é o seu perfil?" })).toBeVisible();
  await page.getByRole("button", { name: "ESTAGIÁRIO sou aluno e vou" }).click();
  await expect(page.getByRole("heading", { name: "CADASTRO DE ESTAGIÁRIO" })).toBeVisible();
  await page.getByRole("textbox", { name: "Nome completo" }).fill("Robson Issomoto");
  await page.getByRole("textbox", { name: "CPF" }).fill("30499696018");
  await page.getByRole("textbox", { name: "Telefone" }).fill("11912345678");
  await page.getByRole("textbox", { name: "E-mail" }).fill(email);
  await page.getByRole("textbox", { name: "Senha", exact: true }).fill("Fatec@2026");
  await page.getByRole("textbox", { name: "Confirme sua senha" }).fill("Fatec@2026");

  const validarRegra = (texto: string) =>
    page.locator("span").filter({ hasText: texto }).getByTestId("CheckCircleIcon");

  await expect(validarRegra("Mínimo de 8 caracteres")).toBeVisible();
  await expect(validarRegra("Pelo menos uma letra maiúscula")).toBeVisible();
  await expect(validarRegra("Pelo menos um número")).toBeVisible();
  await expect(validarRegra("Pelo menos um caractere")).toBeVisible();

  await expect(page.getByRole("button", { name: "Cadastrar" })).toBeEnabled();

  await page.getByRole("button", { name: "Cadastrar" }).click();

  await expect(page).toHaveURL("http://localhost:5173/login");
});
