import fs from "fs";
import path from "path";
import matter from "gray-matter";

const recipesDir = path.resolve("culinary");
const metadataDir = path.resolve("html", "metadata");

fs.mkdirSync(metadataDir, { recursive: true });

const taxonomy = {
  people: new Set(),
  categories: new Map(),
};

const files = fs.readdirSync(recipesDir).filter((file) => file.endsWith(".md"));

for (const file of files) {
  const fullPath = path.join(recipesDir, file);
  const raw = fs.readFileSync(fullPath, "utf8");
  const { data } = matter(raw);

  const person = data.person;
  const category = data.category;
  const subCategory = data.subCategory;

  if (person) {
    taxonomy.people.add(person);
  }

  if (category) {
    if (!taxonomy.categories.has(category)) {
      taxonomy.categories.set(category, new Set());
    }

    if (subCategory) {
      taxonomy.categories.get(category).add(subCategory);
    }
  }
}

const output = {
  people: [...taxonomy.people].sort(),
  categories: Object.fromEntries(
    [...taxonomy.categories.entries()]
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([category, subCategories]) => [
        category,
        [...subCategories].sort(),
      ]),
  ),
};

fs.writeFileSync(
  path.join(metadataDir, "recipe-taxonomy.json"),
  JSON.stringify(output, null, 2),
);

console.log("Generated html/metadata/recipe-taxonomy.json");
