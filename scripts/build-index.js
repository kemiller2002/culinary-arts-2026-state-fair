import fs from "fs";
import path from "path";

const HTML_DIR = "html";
const ASSET_DIR = path.join(HTML_DIR, "assets");

fs.mkdirSync(ASSET_DIR, { recursive: true });

function titleCase(value) {
  return value
    .replace(/-/g, " ")
    .replace(/\b\w/g, c => c.toUpperCase());
}

function getTitle(html, fallback) {
  const h1 = html.match(/<h1[^>]*>(.*?)<\/h1>/i);
  const title = html.match(/<title[^>]*>(.*?)<\/title>/i);

  return (h1?.[1] || title?.[1] || fallback)
    .replace(/<[^>]+>/g, "")
    .trim();
}

const files = fs
  .readdirSync(HTML_DIR)
  .filter(file => file.endsWith(".html"))
  .filter(file => file !== "index.html");

const entries = files.map(file => {
  const fullPath = path.join(HTML_DIR, file);
  const html = fs.readFileSync(fullPath, "utf8");

  const slug = file.replace(/\.html$/, "");
  const parts = slug.split("-");

  const person = parts[0] || "";
  const division = parts[1] || "";
  const category = parts[2] || "";
  const classNumber = parts.find(p => /^\d+$/.test(p)) || "";

  return {
    title: getTitle(html, titleCase(slug)),
    file,
    person: titleCase(person),
    division: titleCase(division),
    category: titleCase(category),
    classNumber
  };
});

entries.sort((a, b) =>
  a.person.localeCompare(b.person) ||
  a.division.localeCompare(b.division) ||
  a.category.localeCompare(b.category) ||
  a.classNumber.localeCompare(b.classNumber)
);

const indexHtml = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Culinary State Fair Entries</title>
  <link rel="stylesheet" href="assets/index.css">
</head>
<body>
  <main class="page">
    <header class="page-header">
      <h1>Culinary State Fair Entries</h1>
      <p>${entries.length} entries</p>
    </header>

    <section class="controls">
      <input id="search" type="search" placeholder="Search entries...">

      <select id="personFilter">
        <option value="">All people</option>
      </select>

      <select id="divisionFilter">
        <option value="">All divisions</option>
      </select>

      <select id="categoryFilter">
        <option value="">All categories</option>
      </select>

      <select id="sortBy">
        <option value="title">Sort by title</option>
        <option value="person">Sort by person</option>
        <option value="division">Sort by division</option>
        <option value="category">Sort by category</option>
        <option value="classNumber">Sort by class number</option>
      </select>
    </section>

    <section id="entries" class="entry-grid"></section>
  </main>

  <script id="entry-data" type="application/json">
${JSON.stringify(entries, null, 2)}
  </script>
  <script src="assets/index.js"></script>
</body>
</html>
`;

const css = `body {
  margin: 0;
  font-family: system-ui, sans-serif;
  background: #f7f4ef;
  color: #211a14;
}

.page {
  width: min(1100px, calc(100% - 2rem));
  margin: 0 auto;
  padding: 2rem 0;
}

.page-header {
  margin-bottom: 1.5rem;
}

.page-header h1 {
  margin: 0;
  font-size: clamp(2rem, 5vw, 3.25rem);
}

.page-header p {
  margin: .35rem 0 0;
  color: #6f6258;
}

.controls {
  display: grid;
  gap: .75rem;
  margin-bottom: 1.5rem;
}

.controls input,
.controls select {
  width: 100%;
  padding: .8rem .9rem;
  border: 1px solid #d6cec4;
  border-radius: .75rem;
  font: inherit;
  background: white;
}

.entry-grid {
  display: grid;
  gap: 1rem;
}

.entry-card {
  display: block;
  padding: 1rem;
  border: 1px solid #ded6cc;
  border-radius: 1rem;
  background: white;
  color: inherit;
  text-decoration: none;
}

.entry-card:hover {
  border-color: #9d7c52;
}

.entry-title {
  margin: 0 0 .6rem;
  font-size: 1.1rem;
}

.entry-meta {
  display: flex;
  flex-wrap: wrap;
  gap: .4rem;
}

.entry-meta span {
  padding: .25rem .5rem;
  border-radius: 999px;
  background: #f1ebe3;
  font-size: .85rem;
}

.empty {
  padding: 2rem;
  border: 1px dashed #c9bfb4;
  border-radius: 1rem;
  text-align: center;
  color: #6f6258;
}

@media (min-width: 700px) {
  .controls {
    grid-template-columns: 2fr repeat(4, 1fr);
  }

  .entry-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
`;

const js = `const entries = JSON.parse(document.getElementById("entry-data").textContent);

const els = {
  search: document.getElementById("search"),
  person: document.getElementById("personFilter"),
  division: document.getElementById("divisionFilter"),
  category: document.getElementById("categoryFilter"),
  sortBy: document.getElementById("sortBy"),
  entries: document.getElementById("entries")
};

function uniqueValues(key) {
  return [...new Set(entries.map(e => e[key]).filter(Boolean))].sort();
}

function fillSelect(select, values) {
  for (const value of values) {
    const option = document.createElement("option");
    option.value = value;
    option.textContent = value;
    select.appendChild(option);
  }
}

fillSelect(els.person, uniqueValues("person"));
fillSelect(els.division, uniqueValues("division"));
fillSelect(els.category, uniqueValues("category"));

function matches(entry) {
  const query = els.search.value.trim().toLowerCase();

  const searchable = [
    entry.title,
    entry.person,
    entry.division,
    entry.category,
    entry.classNumber
  ].join(" ").toLowerCase();

  return (!query || searchable.includes(query))
    && (!els.person.value || entry.person === els.person.value)
    && (!els.division.value || entry.division === els.division.value)
    && (!els.category.value || entry.category === els.category.value);
}

function render() {
  const sortKey = els.sortBy.value;

  const filtered = entries
    .filter(matches)
    .sort((a, b) => String(a[sortKey] || "").localeCompare(String(b[sortKey] || "")));

  els.entries.innerHTML = "";

  if (!filtered.length) {
    els.entries.innerHTML = '<div class="empty">No matching entries.</div>';
    return;
  }

  for (const entry of filtered) {
    const card = document.createElement("a");
    card.className = "entry-card";
    card.href = entry.file;

    card.innerHTML = \`
      <h2 class="entry-title">\${entry.title}</h2>
      <div class="entry-meta">
        <span>\${entry.person}</span>
        <span>\${entry.division}</span>
        <span>\${entry.category}</span>
        \${entry.classNumber ? \`<span>Class \${entry.classNumber}</span>\` : ""}
      </div>
    \`;

    els.entries.appendChild(card);
  }
}

for (const el of [els.search, els.person, els.division, els.category, els.sortBy]) {
  el.addEventListener("input", render);
  el.addEventListener("change", render);
}

render();
`;

fs.writeFileSync(path.join(HTML_DIR, "index.html"), indexHtml);
fs.writeFileSync(path.join(ASSET_DIR, "index.css"), css);
fs.writeFileSync(path.join(ASSET_DIR, "index.js"), js);

console.log(`Generated html/index.html with ${entries.length} entries`);