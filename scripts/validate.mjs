import { access, readFile, readdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const errors = [];
const requiredFooterLinks = [
  'https://www.facebook.com/bulldogplumbingza/',
  'https://www.instagram.com/bulldog_plumbing_/',
  'https://www.tiktok.com/@bulldogplumbingza',
  'https://wa.me/27724558877?text=Hi%20Bulldog%20Plumbing%2C%20I%20need%20help%20with%20a%20plumbing%20job.'
];
const googleReviewLink = 'https://g.page/r/CbLwKrQVqFdLEAI/review';

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    if (entry.name === '.git' || entry.name === 'node_modules') continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...await walk(full));
    else files.push(full);
  }
  return files;
}

function capture(html, pattern) {
  return html.match(pattern)?.[1]?.trim() || '';
}

function addError(file, message) {
  errors.push(`${path.relative(root, file)}: ${message}`);
}

const allFiles = await walk(root);
const htmlFiles = allFiles.filter((file) => file.endsWith('.html'));
const titles = new Map();
const descriptions = new Map();
const canonicals = new Map();

for (const file of htmlFiles) {
  const html = await readFile(file, 'utf8');
  const title = capture(html, /<title>([^<]+)<\/title>/i);
  const description = capture(html, /<meta name="description" content="([^"]+)"/i);
  const canonical = capture(html, /<link rel="canonical" href="([^"]+)"/i);
  const h1Count = (html.match(/<h1(?:\s|>)/gi) || []).length;

  if (!html.includes('<html lang="en-ZA">')) addError(file, 'missing en-ZA language declaration');
  if (!title) addError(file, 'missing title');
  if (title.length > 65) addError(file, `title is ${title.length} characters`);
  if (!description) addError(file, 'missing meta description');
  if (description.length > 165) addError(file, `description is ${description.length} characters`);
  if (!canonical.startsWith('https://bulldogplumbing.co.za/')) addError(file, 'invalid canonical URL');
  if (h1Count !== 1) addError(file, `expected one H1, found ${h1Count}`);
  if (!html.includes('application/ld+json')) addError(file, 'missing JSON-LD');
  if (html.includes('24/7')) addError(file, 'contains outdated 24/7 availability claim');
  if (!html.includes('"opens":"08:00"') || !html.includes('"closes":"18:00"')) addError(file, 'missing correct weekday business hours in JSON-LD');
  if (html.includes('+27.724') || html.includes('724ù')) addError(file, 'contains malformed phone number');
  if (html.includes('cdn.tailwindcss.com') || html.includes('unpkg.com')) addError(file, 'contains render-blocking framework CDN');
  for (const requiredLink of requiredFooterLinks) {
    if (!html.includes(`href="${requiredLink}"`)) addError(file, `missing footer link ${requiredLink}`);
  }
  if (!html.includes('class="footer-connect"')) addError(file, 'missing visible social and review panel');
  if (!html.includes(`href="${googleReviewLink}"`)) addError(file, 'missing verified Google review link');
  if (path.relative(root, file) === 'index.html') {
    const slideCount = (html.match(/data-carousel-slide/g) || []).length;
    if (!html.includes('data-carousel data-interval="7000"')) addError(file, 'missing seven-second project carousel');
    if (slideCount !== 6) addError(file, `expected six project carousel slides, found ${slideCount}`);
  }

  for (const [value, label, map] of [[title, 'title', titles], [description, 'description', descriptions], [canonical, 'canonical', canonicals]]) {
    if (map.has(value)) addError(file, `duplicate ${label} also used by ${path.relative(root, map.get(value))}`);
    else map.set(value, file);
  }

  const jsonLdBlocks = [...html.matchAll(/<script type="application\/ld\+json">([^<]+)<\/script>/gi)];
  for (const block of jsonLdBlocks) {
    try { JSON.parse(block[1]); }
    catch { addError(file, 'invalid JSON-LD'); }
  }

  const imageTags = [...html.matchAll(/<img\b[^>]*>/gi)];
  for (const tag of imageTags) {
    if (!/\balt="[^"]*"/i.test(tag[0])) addError(file, `image missing alt text: ${tag[0]}`);
    if (!/\bwidth="\d+"/i.test(tag[0]) || !/\bheight="\d+"/i.test(tag[0])) addError(file, `image missing dimensions: ${tag[0]}`);
  }

  const localRefs = [...html.matchAll(/(?:href|src)="([^"]+)"/gi)]
    .map((match) => match[1])
    .filter((ref) => !/^(?:https?:|tel:|mailto:|#)/i.test(ref));
  for (const ref of localRefs) {
    const clean = ref.split(/[?#]/)[0];
    let target = path.resolve(path.dirname(file), clean);
    if (clean.endsWith('/') || path.extname(target) === '') target = path.join(target, 'index.html');
    try { await access(target); }
    catch { addError(file, `broken local reference ${ref}`); }
  }
}

const sitemap = await readFile(path.join(root, 'sitemap.xml'), 'utf8');
const sitemapUrls = (sitemap.match(/<url>/g) || []).length;
const indexablePages = htmlFiles.length - 1;
if (sitemapUrls !== indexablePages) errors.push(`sitemap.xml: expected ${indexablePages} URLs, found ${sitemapUrls}`);

const robots = await readFile(path.join(root, 'robots.txt'), 'utf8');
if (!robots.includes('https://bulldogplumbing.co.za/sitemap.xml')) errors.push('robots.txt: missing canonical sitemap URL');

if (errors.length) {
  console.error(`Validation failed with ${errors.length} issue(s):\n- ${errors.join('\n- ')}`);
  process.exit(1);
}

console.log(`Validated ${htmlFiles.length} pages: metadata, schema, internal links, images, sitemap and contact details.`);
