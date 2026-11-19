import { mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { pathToFileURL } from "node:url";

const root = process.cwd();
const templatePath = resolve(root, "dist/index.html");
const serverBundlePath = resolve(root, "dist-ssr/entry-server.js");
const template = readFileSync(templatePath, "utf8");
const { render } = await import(pathToFileURL(serverBundlePath).href);

function renderRoute(route, outputPath) {
  const { html, head } = render(route);
  let document = template
    .replace(
      /<title\b[^>]*>[\s\S]*?<\/title>/i,
      "",
    )
    .replace(/<meta\b(?=[^>]*\bname=["']description["'])[^>]*\/?>/gi, "")
    .replace(/<meta\b(?=[^>]*\bname=["']robots["'])[^>]*\/?>/gi, "")
    .replace(/<link\b(?=[^>]*\brel=["']canonical["'])[^>]*\/?>/gi, "")
    .replace(
      /<meta\b(?=[^>]*\bproperty=["']og:(?:title|description|url|type)["'])[^>]*\/?>/gi,
      "",
    )
    .replace(
      /<meta\b(?=[^>]*\bname=["']twitter:(?:title|description)["'])[^>]*\/?>/gi,
      "",
    )
    .replace(/<script\b(?=[^>]*\bdata-route-seo=["']true["'])[^>]*>[\s\S]*?<\/script>/gi, "");

  document = document.replace("</head>", `${head}\n  </head>`);
  document = document.replace(
    /<div id="root"\s*>\s*<\/div>/,
    `<div id="root">${html}</div>`,
  );

  mkdirSync(dirname(outputPath), { recursive: true });
  writeFileSync(outputPath, document);
}

renderRoute("/", templatePath);
renderRoute(
  "/case-study/portfolio",
  resolve(root, "dist/case-study/portfolio/index.html"),
);
rmSync(resolve(root, "dist-ssr"), { recursive: true, force: true });
