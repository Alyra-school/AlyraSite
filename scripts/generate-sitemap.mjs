import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { catalogPrograms } from "../supabase/seeds/catalogSeedData.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");
const publicDir = path.join(rootDir, "public");

const siteUrl = (process.env.SITE_URL || "https://www.alyra.fr").replace(/\/$/, "");

const staticRoutes = [
  "/",
  "/programmes",
  "/financement",
  "/vos-besoins",
  "/blog",
  "/qui-sommes-nous",
  "/nos-anciens",
  "/rendez-vous",
];

const dynamicProgramRoutes = catalogPrograms.map((program) => `/programmes/${program.slug}`);
const urls = [...staticRoutes, ...dynamicProgramRoutes];

const now = new Date().toISOString();
const urlset = urls
  .map((route) => {
    const loc = `${siteUrl}${route}`;
    return [
      "  <url>",
      `    <loc>${loc}</loc>`,
      `    <lastmod>${now}</lastmod>`,
      "    <changefreq>weekly</changefreq>",
      route === "/" ? "    <priority>1.0</priority>" : "    <priority>0.8</priority>",
      "  </url>",
    ].join("\n");
  })
  .join("\n");

const sitemap = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  urlset,
  "</urlset>",
  "",
].join("\n");

const robots = [
  "User-agent: *",
  "Allow: /",
  `Sitemap: ${siteUrl}/sitemap.xml`,
  "",
].join("\n");

fs.writeFileSync(path.join(publicDir, "sitemap.xml"), sitemap, "utf8");
fs.writeFileSync(path.join(publicDir, "robots.txt"), robots, "utf8");
