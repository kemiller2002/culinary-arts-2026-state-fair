const entries = JSON.parse(document.getElementById("entry-data").textContent);

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

    card.innerHTML = `
      <h2 class="entry-title">${entry.title}</h2>
      <div class="entry-meta">
        <span>${entry.person}</span>
        <span>${entry.division}</span>
        <span>${entry.category}</span>
        ${entry.classNumber ? `<span>Class ${entry.classNumber}</span>` : ""}
      </div>
    `;

    els.entries.appendChild(card);
  }
}

for (const el of [els.search, els.person, els.division, els.category, els.sortBy]) {
  el.addEventListener("input", render);
  el.addEventListener("change", render);
}

render();
