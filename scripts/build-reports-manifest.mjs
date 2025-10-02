import { promises as fs } from 'node:fs';
import path from 'node:path';

/**
 * Build manifest of PDF reports under /public/reports
 * Writes: /public/reports/manifest.json
 * Optional overrides: /public/reports/overrides.json
 *  - date: "YYYY-MM", "YYYY-MM-DD", "YYYY-Q#", "YYYY"
 *  - featured: true
 *  - pin: number (lower shows higher; featured first, then pin asc)
 */

const ROOT = process.cwd();
const PUBLIC_DIR = path.join(ROOT, 'public');
const REPORTS_DIR = path.join(PUBLIC_DIR, 'reports');
const OUT_PATH = path.join(REPORTS_DIR, 'manifest.json');
const OVERRIDES_PATH = path.join(REPORTS_DIR, 'overrides.json');

const MONTHS = {
  january:0, jan:0, february:1, feb:1, march:2, mar:2, april:3, apr:3, may:4,
  june:5, jun:5, july:6, jul:6, august:7, aug:7,
  september:8, sept:8, sep:8, october:9, oct:9, november:10, nov:10, december:11, dec:11,
};

/* ---------- date helpers (normalize @ noon UTC to avoid TZ shifts) ---------- */
function isoAtNoonUTC(y, m, d) { return new Date(Date.UTC(y, m, d, 12, 0, 0)).toISOString(); }
function endOfMonth(y, m) { return isoAtNoonUTC(y, m + 1, 0); }
function lastDayOfQuarter(y, q) { const map={1:[2,31],2:[5,30],3:[8,30],4:[11,31]}; const [mo,d]=map[q]; return isoAtNoonUTC(y,mo,d); }
function endOfHalf(y, h) { return h===1?isoAtNoonUTC(y,5,30):isoAtNoonUTC(y,11,31); }
function endOfYear(y) { return isoAtNoonUTC(y,11,31); }

function parseOverrideDate(str){
  if(!str) return null;
  const s=String(str).trim();
  let m=s.match(/^(\d{4})-(\d{2})-(\d{2})$/); if(m) return isoAtNoonUTC(+m[1],+m[2]-1,+m[3]);
  m=s.match(/^(\d{4})-(\d{2})$/); if(m) return endOfMonth(+m[1],+m[2]-1);
  m=s.match(/^(\d{4})-Q([1-4])$/i); if(m) return lastDayOfQuarter(+m[1],+m[2]);
  m=s.match(/^(\d{4})$/); if(m) return endOfYear(+m[1]);
  return null;
}

function inferDateISOFromText(text){
  if(!text) return null;
  const s=String(text).replace(/[._()\-]+/g,' ').replace(/\s+/g,' ').trim();
  let m=s.match(/\b(\d{1,2})\s+(jan(?:uary)?|feb(?:ruary)?|mar(?:ch)?|apr(?:il)?|may|jun(?:e)?|jul(?:y)?|aug(?:ust)?|sep(?:t|tember)?|oct(?:ober)?|nov(?:ember)?|dec(?:ember)?)\.?\s+(\d{4})\b/i);
  if(m){ const d=+m[1], mo=MONTHS[m[2].toLowerCase()], y=+m[3]; if(mo!=null) return isoAtNoonUTC(y,mo,d); }
  m=s.match(/\b(jan(?:uary)?|feb(?:ruary)?|mar(?:ch)?|apr(?:il)?|may|jun(?:e)?|jul(?:y)?|aug(?:ust)?|sep(?:t|tember)?|oct(?:ober)?|nov(?:ember)?)\.?\s+(\d{1,2}),?\s+(\d{4})\b/i);
  if(m){ const mo=MONTHS[m[1].toLowerCase()], d=+m[2], y=+m[3]; if(mo!=null) return isoAtNoonUTC(y,mo,d); }
  m=s.match(/\b(jan(?:uary)?|feb(?:ruary)?|mar(?:ch)?|apr(?:il)?|may|jun(?:e)?|jul(?:y)?|aug(?:ust)?|sep(?:t|tember)?|oct(?:ober)?|nov(?:ember)?)\.?\s+(20\d{2})\b/i);
  if(m){ const mo=MONTHS[m[1].toLowerCase()], y=+m[2]; if(mo!=null) return endOfMonth(y,mo); }
  m=s.match(/\b(20\d{2})\s+(jan(?:uary)?|feb(?:ruary)?|mar(?:ch)?|apr(?:il)?|may|jun(?:e)?|jul(?:y)?|aug(?:ust)?|sep(?:t|tember)?|oct(?:ober)?|nov(?:ember)?)\.?\b/i);
  if(m){ const y=+m[1], mo=MONTHS[m[2].toLowerCase()]; if(mo!=null) return endOfMonth(y,mo); }
  m=s.match(/\b(\d{4})[\/\s.-](\d{1,2})[\/\s.-](\d{1,2})\b/); if(m){ const y=+m[1], mo=+m[2]-1, d=+m[3]; return isoAtNoonUTC(y,mo,d); }
  m=s.match(/\b(\d{1,2})[\/\s.-](\d{1,2})[\/\s.-](\d{4})\b/); if(m){ const d=+m[1], mo=+m[2]-1, y=+m[3]; return isoAtNoonUTC(y,mo,d); }
  m=s.match(/\bQ([1-4])\s*(\d{4})\b/i); if(m) return lastDayOfQuarter(+m[2],+m[1]);
  m=s.match(/\bH([12])\s*(\d{4})\b/i); if(m) return endOfHalf(+m[2],+m[1]);
  m=s.match(/\bFY\s*(20\d{2})\b/i) || s.match(/\b(20\d{2})\s*FY\b/i); if(m) return endOfYear(+m[1]);
  m=s.match(/\b(20\d{2})\s*[–-]\s*(20\d{2})\b/); if(m) return endOfYear(+m[2]);
  if(/\bannual report\b/i.test(s)){ const y=s.match(/\b(20\d{2})\b/); if(y) return endOfYear(+y[1]); }
  m=s.match(/\b(20\d{2})\b/); if(m) return endOfYear(+m[1]);
  return null;
}

/* ---------------------------- FS + util ---------------------------- */
async function ensureDir(p){ try{ await fs.mkdir(p,{recursive:true}); }catch{} }
async function exists(p){ try{ await fs.access(p); return true; }catch{ return false; } }
async function walk(dir){
  const entries=await fs.readdir(dir,{withFileTypes:true});
  const files=[];
  for(const e of entries){
    const res=path.join(dir,e.name);
    if(e.isDirectory()) files.push(...await walk(res));
    else files.push(res);
  }
  return files;
}
function prettyTitle(fileName){
  const base=fileName.replace(/\.pdf$/i,'').replace(/[_-]+/g,' ').trim();
  return base
    .replace(/bluenord/gi,'BlueNord')
    .replace(/\basa\b/gi,'ASA')
    .replace(/\bbnor\b/gi,'BNOR')
    .replace(/\bdnb\b/gi,'DNB')
    .replace(/\bpareto\b/gi,'Pareto')
    .replace(/\bfy\b/gi,'FY')
    .replace(/\bq([1-4])\b/gi,(_,d)=>`Q${d}`);
}

/* ---------------------------- overrides ---------------------------- */
async function loadOverrides(){
  try{
    const raw=await fs.readFile(OVERRIDES_PATH,'utf8');
    const j=JSON.parse(raw);
    const arr=Array.isArray(j?.overrides)?j.overrides:[];
    // keep overrides even if they only set featured/pin (no date)
    return arr.map(o=>({
      contains: o.contains ? String(o.contains).toLowerCase() : null,
      file: o.file ? String(o.file) : null,
      date: parseOverrideDate(o.date),
      featured: !!o.featured,
      pin: Number.isFinite(+o.pin) ? +o.pin : null,
    }));
  }catch{ return []; }
}

/* ---------------------------- main ---------------------------- */
async function main(){
  await ensureDir(REPORTS_DIR);
  if(!await exists(REPORTS_DIR)) throw new Error(`Reports directory missing at ${REPORTS_DIR}`);

  const overrides = await loadOverrides();

  const allFiles = await walk(REPORTS_DIR).catch(()=>[]);
  const pdfs = allFiles.filter(f=>f.toLowerCase().endsWith('.pdf'));

  const items=[];
  for(const abs of pdfs){
    const stat = await fs.stat(abs);
    const relFromPublic = path.relative(PUBLIC_DIR, abs).split(path.sep).join('/');
    const href = '/'+relFromPublic;
    const fileName = path.basename(abs);
    const folderYear = Number((href.match(/reports\/(\d{4})\//)||[])[1]);
    const modified = new Date(stat.mtime).toISOString();

    let rawTitle = prettyTitle(fileName);
    let parsedISO = inferDateISOFromText(rawTitle) || inferDateISOFromText(href);
    let featured = false;
    let pin = null;

    const lowerFile=fileName.toLowerCase();
    const lowerHref=href.toLowerCase();
    const ov = overrides.find(ov =>
      (ov.file && ov.file===fileName) ||
      (ov.contains && (lowerFile.includes(ov.contains) || lowerHref.includes(ov.contains)))
    );
    if(ov){
      if(ov.date) parsedISO = ov.date;
      if(ov.featured) featured = true;
      if(ov.pin!=null) pin = ov.pin;
      console.log(`Override applied: ${fileName} → ${ov.date||'(no date)'}${ov.featured?' [featured]':''}${ov.pin!=null?` [pin=${ov.pin}]`:''}`);
    }

    const displayISO = parsedISO || modified;
    const contentYear = new Date(displayISO).getFullYear();

    items.push({
      title: rawTitle,
      year: Number.isFinite(folderYear)?folderYear:contentYear,
      href,
      size_bytes: stat.size,
      modified,
      displayISO,
      contentYear,
      featured,
      pin,
    });
  }

  // sort: featured first, then pin (asc, null last), then date desc, then title
  items.sort((a,b)=>{
    if((b.featured?1:0)!==(a.featured?1:0)) return (b.featured?1:0)-(a.featured?1:0);
    const ap = a.pin==null?Number.POSITIVE_INFINITY:a.pin;
    const bp = b.pin==null?Number.POSITIVE_INFINITY:b.pin;
    if(ap!==bp) return ap-bp;
    const td = new Date(b.displayISO) - new Date(a.displayISO);
    return td || a.title.localeCompare(b.title);
  });

  await fs.writeFile(OUT_PATH, JSON.stringify({ count: items.length, items }, null, 2));
  console.log(`Wrote ${OUT_PATH} with ${items.length} items.`);
}

main().catch(err=>{ console.error(err); process.exit(1); });