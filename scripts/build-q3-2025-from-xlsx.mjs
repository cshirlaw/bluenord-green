// scripts/build-q3-2025-from-xlsx.mjs
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import xlsx from 'xlsx';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');

const INPUT_XLSX = path.join(ROOT, 'data', 'input', 'q3-2025.xlsx');
const OUT_DIR = path.join(ROOT, 'public', 'data', 'financials');
const OUT_JSON = path.join(OUT_DIR, 'q3-2025.json');

function ensureDir(p) {
  fs.mkdirSync(p, { recursive: true });
}

function readSheet(wb, name, required = []) {
  const sh = wb.Sheets[name];
  if (!sh) return [];
  const rows = xlsx.utils.sheet_to_json(sh, { defval: null, raw: true, blankrows: false });
  if (!rows.length) return [];
  for (const col of required) {
    if (!Object.prototype.hasOwnProperty.call(rows[0], col)) {
      console.warn(`Warning: Sheet "${name}" missing column "${col}". Got: ${Object.keys(rows[0]).join(', ')}`);
      break;
    }
  }
  return rows;
}

function main() {
  if (!fs.existsSync(INPUT_XLSX)) {
    console.log(`Q3 builder: input file not found, skipping: ${INPUT_XLSX}`);
    return;
  }

  const wb = xlsx.readFile(INPUT_XLSX);

  // Sheets: Hero(title, subtitle), Production(month, avg, peak),
  // GasHedge(label, hedgedVolume, floorPrice), OilHedge(label, hedgedVolume, floorPrice)
  const heroRows = readSheet(wb, 'Hero', ['title']);
  const productionRows = readSheet(wb, 'Production', ['month', 'avg', 'peak']);
  const gasRows = readSheet(wb, 'GasHedge', ['label', 'hedgedVolume', 'floorPrice']);
  const oilRows = readSheet(wb, 'OilHedge', ['label', 'hedgedVolume', 'floorPrice']);

  const hero = {
    title: heroRows[0]?.title ?? 'Q3 2025 presentation (interactive)',
    subtitle: heroRows[0]?.subtitle ?? '',
  };

  const production = productionRows
    .filter(r => r.month != null)
    .map(r => ({ month: String(r.month), avg: Number(r.avg ?? 0), peak: Number(r.peak ?? 0) }));

  const gasHedge = gasRows
    .filter(r => r.label != null)
    .map(r => ({
      label: String(r.label),
      hedgedVolume: r.hedgedVolume != null ? Number(r.hedgedVolume) : undefined,
      floorPrice: r.floorPrice != null ? Number(r.floorPrice) : undefined,
    }));

  const oilHedge = oilRows
    .filter(r => r.label != null)
    .map(r => ({
      label: String(r.label),
      hedgedVolume: r.hedgedVolume != null ? Number(r.hedgedVolume) : undefined,
      floorPrice: r.floorPrice != null ? Number(r.floorPrice) : undefined,
    }));

  const out = { hero, production, gasHedge, oilHedge };

  ensureDir(OUT_DIR);
  fs.writeFileSync(OUT_JSON, JSON.stringify(out, null, 2));
  console.log(`Q3 builder: wrote ${OUT_JSON} (prod:${production.length} gas:${gasHedge.length} oil:${oilHedge.length})`);
}

main();