import { expect, test } from "@playwright/test";

const pages = ["/", "/estudio.html", "/servicos.html", "/pacotes.html", "/contato.html"];
const mobileWidths = [320, 375, 430, 768, 1024, 1440];

test("all public pages load with a title and main content", async ({ page }) => {
  for (const path of pages) {
    await page.goto(path);
    await expect(page).toHaveTitle(/Caverna Cast/i);
    await expect(page.locator("main")).toBeVisible();
  }
});

test("mobile navigation opens and closes accessibly", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto("/");
  const menuButton = page.getByRole("button", { name: "Abrir menu" });
  await expect(menuButton).toBeVisible();
  await menuButton.click();
  await expect(page.getByRole("navigation", { name: "Navegação principal" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Fechar menu" })).toHaveAttribute("aria-expanded", "true");
});

test("package CTA opens WhatsApp with the selected package in its message", async ({ page }) => {
  await page.goto("/pacotes.html");
  const bookingLink = page.getByRole("link", { name: /Escolher 1 hora/i });
  const href = await bookingLink.getAttribute("href");
  expect(href).toContain("https://wa.me/5521995507294");
  expect(decodeURIComponent(href ?? "")).toContain("1 hora de estúdio");
});

test("FAQ toggles its answer with aria-expanded", async ({ page }) => {
  await page.goto("/pacotes.html");
  const question = page.getByRole("button", { name: "Como faço para agendar uma gravação?" });
  await expect(question).toHaveAttribute("aria-expanded", "true");
  await question.click();
  await expect(question).toHaveAttribute("aria-expanded", "false");
  await question.click();
  await expect(question).toHaveAttribute("aria-expanded", "true");
});

test("studio gallery filters the real local images", async ({ page }) => {
  await page.goto("/estudio.html");
  await page.getByRole("button", { name: "Equipamentos", exact: true }).click();
  await expect(page.locator(".gallery-tile")).toHaveCount(3);
  await page.getByRole("button", { name: "Todos" }).click();
  await expect(page.locator(".gallery-tile")).toHaveCount(7);
});

test("public pages do not introduce horizontal overflow at key viewport widths", async ({ page }) => {
  for (const width of mobileWidths) {
    await page.setViewportSize({ width, height: 900 });
    for (const path of pages) {
      await page.goto(path);
      const dimensions = await page.evaluate(() => {
        const viewport = document.documentElement.clientWidth;
        const offenders = [...document.querySelectorAll<HTMLElement>("body *")]
          .map((element) => {
            const rect = element.getBoundingClientRect();
            return { element, left: Math.round(rect.left), right: Math.round(rect.right), width: Math.round(rect.width) };
          })
          .filter(({ element, right, width: elementWidth }) => right > viewport + 1 && elementWidth > 0 && getComputedStyle(element).position !== "fixed")
          .slice(0, 10)
          .map(({ element, left, right, width: elementWidth }) => ({ tag: element.tagName, className: element.getAttribute("class") || "", text: element.textContent?.trim().slice(0, 32), left, right, width: elementWidth, parents: [element.parentElement, element.parentElement?.parentElement, element.parentElement?.parentElement?.parentElement].filter(Boolean).map((parent) => ({ tag: parent!.tagName, className: parent!.getAttribute("class") || "", left: Math.round(parent!.getBoundingClientRect().left), right: Math.round(parent!.getBoundingClientRect().right) })) }));
        return { viewport, document: document.documentElement.scrollWidth, offenders };
      });
      expect(dimensions.document, `${path} at width ${width}; overflow: ${JSON.stringify(dimensions.offenders)}`).toBeLessThanOrEqual(dimensions.viewport + 1);
    }
  }
});
