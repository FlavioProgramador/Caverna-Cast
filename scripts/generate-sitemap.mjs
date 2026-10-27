import { readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const rawOrigin = process.env.VITE_SITE_ORIGIN;
if (!rawOrigin) {
  console.error("Defina VITE_SITE_ORIGIN com a origem HTTPS pública antes de gerar o sitemap.");
  process.exit(1);
}

let origin;
try {
  const parsed = new URL(rawOrigin);
  if (parsed.protocol !== "https:" || parsed.pathname !== "/" || parsed.search || parsed.hash) {
    throw new Error("Use somente a origem HTTPS, por exemplo https://www.exemplo.com");
  }
  origin = parsed.origin;
} catch (error) {
  console.error(error instanceof Error ? error.message : "VITE_SITE_ORIGIN inválido.");
  process.exit(1);
}

const paths = ["/", "/estudio.html", "/servicos.html", "/pacotes.html", "/contato.html"];
const urls = paths.map((path) => `  <url><loc>${origin}${path}</loc></url>`).join("\n");
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
await writeFile(resolve("public", "sitemap.xml"), sitemap, "utf8");
const robotsPath = resolve("public", "robots.txt");
const existingRobots = await readFile(robotsPath, "utf8").catch(() => "User-agent: *\nAllow: /\n");
const robotsWithoutSitemap = existingRobots.replace(/^Sitemap:\s*.*(?:\r?\n|$)/gim, "").trimEnd();
await writeFile(robotsPath, `${robotsWithoutSitemap}\nSitemap: ${origin}/sitemap.xml\n`, "utf8");
console.log(`Sitemap criado para ${origin} com ${paths.length} URLs e referenciado em robots.txt.`);
