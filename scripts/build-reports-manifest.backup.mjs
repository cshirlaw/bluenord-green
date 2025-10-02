import { promises as fs } from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const REPORTS_DIR = path.join(ROOT, 'public', 'reports');
const OUT_PATH = path.join(REPORTS_DIR, 'manifest.json');

/** @typedef {{ title: string; year: number; href: string; size_bytes: number; modified: string; }} Report */

async function walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = [];
  for (const e of entries) {
    const res = path.join(dir, e.name);
    if (e.isDirectory()) files.push(...await walk(res));
    else files.push(res);
  }
  return files;
}

function prettyTitle(fileName) {
  // Strip extension, replace underscores with spaces
  const base = fileName.replace(/\.pdf$/i, '');
  return base.replace(/[_-]+/g, ' ').trim();
}

async function main() {
  const allFiles = await walk(REPORTS_DIR);
  const pdfs = allFiles.filter(f => f.toLowerCase().endsWith('.pdf'));

  /** @type {Report[]} */
  const items = [];
  for (const abs of pdfs) {
    const stat = await fs.stat(abs);
    const relFromPublic = path.relative(path.join(ROOT, 'public'), abs); // e.g. reports/2025/file.pdf
    const href = '/' + relFromPublic.replace(/\\/g, '/');
    const fileName = path.basename(abs);
    const yearMatch = href.match(/reports\/(\d{4})\//);
    const year = yearMatch ? Number(yearMatch[1]) : new Date(stat.mtime).getFullYear();

    items.push({
      title: prettyTitle(fileName),
      year,
      href,
      size_bytes: stat.size,
      modified: new Date(stat.mtime).toISOString(),
    });
  }

  // Sort: newest year first, then by modified desc
  items.sort((a, b) => (b.year - a.year) || (new Date(b.modified) - new Date(a.modified)));

  await fs.writeFile(OUT_PATH, JSON.stringify({ count: items.length, items }, null, 2));
  console.log(`Wrote ${OUT_PATH} with ${items.length} items.`);
}

main().catch(err => { console.error(err); process.exit(1); });
```
