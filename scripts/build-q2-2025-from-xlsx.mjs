import fs from 'node:fs/promises';
import path from 'node:path';
import xlsx from 'xlsx';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const INPUT = path.join(__dirname, '../data/input/q2-2025.xlsx');
const OUT = path.join(__dirname, '../public/data/briefings/q2-2025.blocks.json');

function sheetJSON(wb, name) {
  const sh = wb.Sheets[name];
  if (!sh) return [];
  return xlsx.utils.sheet_to_json(sh, { defval: '' });
}
function num(x) {
  const n = Number(x);
  return Number.isFinite(n) ? n : 0;
}

async function main() {
  // soft-missing: don't fail CI builds
  try { await fs.access(INPUT); } catch {
    console.warn(`⚠️  Skipping Q2 build: XLSX not found at ${INPUT}`);
    process.exit(0);
  }

  const buf = await fs.readFile(INPUT);
  const wb = xlsx.read(buf, { type: 'buffer' });

  const kpis = sheetJSON(wb, 'kpis');
  const production = sheetJSON(wb, 'production');
  const hedgeKPIs = sheetJSON(wb, 'hedge_kpis');
  const oilRows = sheetJSON(wb, 'oil');
  const gasRows = sheetJSON(wb, 'gas');
  const metaRows = sheetJSON(wb, 'hedge_meta');
  const totalsRows = sheetJSON(wb, 'totals');
  const avgRows = sheetJSON(wb, 'avgPrices');
  const footnotesRows = sheetJSON(wb, 'footnotes');
  const sourceRows = sheetJSON(wb, 'source');

  const meta = metaRows[0] || {};

  const doc = {
    slides: [
      {
        id: 'hero',
        title: 'BlueNord — Q2 2025 presentation (interactive)',
        blocks: [
          {
            type: 'hero',
            image: '/images/briefings/q2-2025/hero.png',
            logo: '/images/brand/bluenord-logo-260925.png',
            title: 'Q2 2025 — Highlights & details',
            subtitle: 'Interactive view of selected slides. Updated from spreadsheet on each deploy.'
          }
        ]
      },
      {
        id: 'highlights',
        title: 'Quarter highlights',
        blocks: [
          {
            type: 'chartsRow',
            cols: 3,
            items: kpis.filter(r => r.label).map(r => ({
              kind: 'kpi',
              label: String(r.label),
              value: String(r.value),
              unit: r.unit ? String(r.unit) : undefined,
              hint: r.hint ? String(r.hint) : undefined,
            })),
          }
        ]
      },
      {
        id: 'production',
        title: 'Production — Average vs Peak',
        blocks: [
          {
            type: 'barLine',
            title: 'Monthly production (Q2 2025)',
            yLeftUnit: 'mboe/d',
            series: production.filter(r => r.label).map(r => ({
              label: String(r.label),
              avg: num(r.avg),
              peak: num(r.peak),
            })),
          }
        ]
      },
      {
        id: 'hedging',
        title: 'Hedge portfolio (snapshot)',
        blocks: [
          {
            type: 'hedgeTabs',
            kpis: hedgeKPIs.filter(r => r.label).map(r => ({ label: String(r.label), value: String(r.value) })),
            oil: {
              unitVolume: String(meta.oil_unitVolume || 'mmbbl'),
              unitPrice: String(meta.oil_unitPrice || '$/bbl'),
              rows: oilRows.filter(r => r.period).map(r => ({
                period: String(r.period), volume: num(r.volume), price: num(r.price)
              })),
              totals: totalsRows.filter(r => String(r.stream).toLowerCase() === 'oil' && r.label)
                .map(r => ({ label: String(r.label), value: num(r.value), unit: String(r.unit || '') })),
              avgPrices: avgRows.filter(r => String(r.stream).toLowerCase() === 'oil' && r.label)
                .map(r => ({ label: String(r.label), value: num(r.value), unit: String(meta.oil_unitPrice || '$/bbl') })),
              spot: num(meta.spot_oil),
            },
            gas: {
              unitVolume: String(meta.gas_unitVolume || 'GWh'),
              unitPrice: String(meta.gas_unitPrice || '€/MWh'),
              rows: gasRows.filter(r => r.period).map(r => ({
                period: String(r.period), volume: num(r.volume), price: num(r.price)
              })),
              totals: totalsRows.filter(r => String(r.stream).toLowerCase() === 'gas' && r.label)
                .map(r => ({ label: String(r.label), value: num(r.value), unit: String(r.unit || '') })),
              avgPrices: avgRows.filter(r => String(r.stream).toLowerCase() === 'gas' && r.label)
                .map(r => ({ label: String(r.label), value: num(r.value), unit: String(meta.gas_unitPrice || '€/MWh') })),
              spot: num(meta.spot_gas),
            },
            disclaimer: ['Numbers loaded from spreadsheet.'],
          }
        ]
      },
      {
        id: 'notes',
        title: 'Notes & sources',
        blocks: [
          {
            type: 'footnotes',
            items: footnotesRows.filter(r => r.text).map(r => String(r.text)),
            source: {
              pdf: String((sourceRows[0]?.pdf) || ''),
              pageHint: String((sourceRows[0]?.pageHint) || ''),
            },
            updateCadence: String((sourceRows[0]?.updateCadence) || 'quarterly'),
          }
        ]
      }
    ]
  };

  await fs.mkdir(path.dirname(OUT), { recursive: true });
  await fs.writeFile(OUT, JSON.stringify(doc, null, 2));
  console.log(`✅ Q2: wrote ${OUT}`);
}

main().catch(err => {
  console.error('Failed to build q2-2025.blocks.json from Excel.');
  console.error(err);
  process.exit(1);
});