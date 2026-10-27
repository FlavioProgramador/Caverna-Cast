import { describe, expect, it } from "vitest";
import { cutPackages, gallery, recordingPackages, whatsappUrl } from "./data/siteData";

describe("WhatsApp links", () => {
  it("uses the official contact number and encodes the message", () => {
    const url = whatsappUrl("Olá! Quero gravar: podcast & videocast.");
    expect(url).toContain("https://wa.me/5521995507294?");
    expect(url).toContain(encodeURIComponent("Olá! Quero gravar: podcast & videocast."));
  });
});

describe("commercial data", () => {
  it("keeps the current recording packages with a personalized message", () => {
    expect(recordingPackages).toHaveLength(2);
    for (const item of recordingPackages) {
      expect(item.message).toContain(item.title === "Hora de estúdio" ? "1 hora" : "3 horas");
      expect(item.price).toMatch(/^R\$ /);
    }
  });

  it("contains the current cut package quantities and prices", () => {
    expect(cutPackages.map((item) => item.quantity)).toEqual([1, 2, 3, 5, 10]);
    expect(cutPackages.every((item) => item.price.startsWith("R$ "))).toBe(true);
  });
});

describe("studio gallery", () => {
  it("assigns each real image to a known category and provides responsive variants", () => {
    expect(gallery.length).toBeGreaterThan(0);
    expect(gallery.every((image) => ["Estúdio", "Equipamentos", "Detalhes"].includes(image.category))).toBe(true);
    expect(gallery.every((image) => image.srcSet.includes(image.src))).toBe(true);
    expect(gallery.every((image) => image.width > 0 && image.height > 0)).toBe(true);
  });
});
