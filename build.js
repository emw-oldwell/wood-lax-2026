/**
 * build.js — runs at deploy time on Vercel.
 * Walks /docs/ and writes /docs.json so the Docs tab can render
 * any file you drop in there. No data.js edit needed.
 *
 * Folders inside /docs/ become categories. File names become titles
 * ("Tournament-Info" → "Tournament Info"). PDFs get a 📄 icon.
 */

const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "docs");
const OUT = path.join(__dirname, "docs.json");

const ICONS = {
  ".pdf":  "📄",
  ".doc":  "📝",
  ".docx": "📝",
  ".xls":  "📊",
  ".xlsx": "📊",
  ".ppt":  "📋",
  ".pptx": "📋",
  ".jpg":  "🖼️",
  ".jpeg": "🖼️",
  ".png":  "🖼️",
  ".gif":  "🖼️",
  ".heic": "🖼️",
  ".csv":  "📊",
  ".txt":  "📃",
  ".md":   "📃",
  ".zip":  "🗜️",
};

function prettyName(filename) {
  const base = filename.replace(/\.[^.]+$/, "");
  return base
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, c => c.toUpperCase());
}

function fmtSize(bytes) {
  if (bytes < 1024) return bytes + " B";
  if (bytes < 1024 * 1024) return Math.round(bytes / 1024) + " KB";
  return (bytes / (1024 * 1024)).toFixed(1) + " MB";
}

function walkFolder(dir, relPrefix = "") {
  const entries = [];
  if (!fs.existsSync(dir)) return entries;
  for (const name of fs.readdirSync(dir).sort()) {
    if (name.startsWith(".") || name === "README.md") continue;
    const full = path.join(dir, name);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) {
      const sub = walkFolder(full, path.join(relPrefix, name));
      if (sub.length) entries.push({ folder: name, items: sub });
    } else {
      const ext = path.extname(name).toLowerCase();
      entries.push({
        name: prettyName(name),
        file: "/docs/" + path.posix.join(relPrefix, name),
        icon: ICONS[ext] || "📎",
        ext,
        size: fmtSize(stat.size),
      });
    }
  }
  return entries;
}

const tree = walkFolder(ROOT);

// Flatten: each top-level entry becomes a category; loose files go in "General"
const categories = [];
const looseFiles = [];
for (const e of tree) {
  if (e.folder) categories.push({ name: e.folder, items: e.items });
  else looseFiles.push(e);
}
if (looseFiles.length) {
  categories.unshift({ name: "General", items: looseFiles });
}

const total = categories.reduce((sum, c) => sum + c.items.length, 0);
const out = {
  generatedAt: new Date().toISOString(),
  totalDocs: total,
  categories,
};

fs.writeFileSync(OUT, JSON.stringify(out, null, 2));
console.log(`Wrote ${OUT}: ${total} document${total === 1 ? "" : "s"} across ${categories.length} categor${categories.length === 1 ? "y" : "ies"}.`);
