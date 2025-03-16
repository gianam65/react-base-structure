// File path: plugins/addPreload.js

import path from "path";
import { Plugin } from "vite";
import fs from "fs";

export const addPreload = (): Plugin => {
  return {
    name: "add-preload",
    enforce: "post",
    apply: "build",
    writeBundle(_options, bundle) {
      const htmlPath = path.resolve(__dirname, "dist", "index.html");
      let html = fs.readFileSync(htmlPath, "utf-8");

      const existingLinks = new Set<string>();
      const preloadLinks = new Set<string>();
      const criticalCSS: string[] = [];

      // Extract existing preload and stylesheet links from the HTML
      const linkPattern = /<link.*?href="(.*?)".*?>/g;
      let match;
      while ((match = linkPattern.exec(html)) !== null) {
        existingLinks.add(match[1]);
      }

      // Generate preload links for js and css files, avoiding duplicates
      for (const chunk of Object.values(bundle)) {
        const { fileName } = chunk;
        const filePath = `/${fileName}`;
        if (
          (fileName.endsWith(".js") || fileName.endsWith(".css")) &&
          !existingLinks.has(filePath)
        ) {
          const preloadLink = `<link rel="preload" href="${filePath}" as="${fileName.endsWith(".js") ? "script" : "style"}" />`;
          preloadLinks.add(preloadLink);

          // Collect critical CSS for inline insertion
          // if (fileName.endsWith('.css')) {
          //     const cssContent = fs.readFileSync(
          //         path.resolve(__dirname, 'dist', fileName),
          //         'utf-8',
          //     );
          //     criticalCSS.push(`<style>${cssContent}</style>`);
          // }
        }
      }

      // Add async or defer to existing script tags
      html = html.replace(
        /<script\b(?![^>]*\b(?:async|defer)\b)([^>]*)>/g,
        "<script defer$1>",
      );

      // Insert critical CSS inline and avoid duplicate preload links
      if (criticalCSS.length > 0) {
        const criticalCSSHTML = criticalCSS.join("\n");
        html = html.replace("</head>", `${criticalCSSHTML}\n</head>`);
      }

      // Avoid duplicate script tags
      const scriptPattern = /<script.*?src="(.*?)".*?>/g;
      const existingScripts = new Set();
      while ((match = scriptPattern.exec(html)) !== null) {
        existingScripts.add(match[1]);
      }

      if (preloadLinks.size > 0) {
        const preloadLinksArray = Array.from(preloadLinks);
        const sortedPreloadLinks = preloadLinksArray.sort((a, b) => {
          const isCSSA = a.includes('as="style"');
          const isCSSB = b.includes('as="style"');
          if (isCSSA && !isCSSB) return -1;
          if (!isCSSA && isCSSB) return 1;
          return 0;
        });
        const preloadLinksHTML = sortedPreloadLinks
          .filter((link) => {
            const hrefMatch = link.match(/href="(.*?)"/);
            return hrefMatch && !existingScripts.has(hrefMatch[1]);
          })
          .join("\n");
        html = html.replace("</head>", `${preloadLinksHTML}\n</head>`);
      }

      fs.writeFileSync(htmlPath, html);
    },
  };
};
