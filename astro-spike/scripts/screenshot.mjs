import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";

const baseUrl = process.argv[2] ?? "http://localhost:4321";
const routes = ["/", "/gallery", "/blogs/india-voting-blog"];
const viewports = [
  ["desktop", { width: 1440, height: 1000 }],
  ["mobile", { width: 390, height: 844 }]
];

const browser = await chromium.launch();
const page = await browser.newPage();

await mkdir("screenshots", { recursive: true });

for (const route of routes) {
  for (const [label, viewport] of viewports) {
    await page.setViewportSize(viewport);
    await page.goto(`${baseUrl}${route}`, { waitUntil: "networkidle" });
    const name = route === "/" ? "home" : route.replaceAll("/", "-").replace(/^-/, "");
    await page.screenshot({
      path: `screenshots/${name}-${label}.png`,
      fullPage: true
    });
  }
}

await browser.close();
