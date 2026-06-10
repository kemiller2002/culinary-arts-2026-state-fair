import fs from "fs";
import path from "path";
import yaml from "js-yaml";

const ROOT = "culinary";
const ENTRIES = path.join(ROOT, "entries");
const PEOPLE = path.join(ROOT, "people");
const OUTPUT = "html";
const METADATA = path.join(OUTPUT, "metadata");

fs.mkdirSync(METADATA, { recursive: true });

function readYaml(filePath) {
  return yaml.load(fs.readFileSync(filePath, "utf8"));
}

function slugToTitle(slug) {
  return slug
    .replace(/^\d+-/, "")
    .replaceAll("-", " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function getDirectories(dir) {
  if (!fs.existsSync(dir)) return [];

  return fs
    .readdirSync(dir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name);
}

function getPeople() {
  if (!fs.existsSync(PEOPLE)) return [];

  return fs
    .readdirSync(PEOPLE)
    .filter((file) => file.endsWith(".yml"))
    .map((file) => {
      const personId = path.basename(file, ".yml");
      const person = readYaml(path.join(PEOPLE, file));

      return {
        id: personId,
        name: person.name || personId,
      };
    })
    .filter((person) => person.id !== "household")
    .sort((a, b) => a.name.localeCompare(b.name));
}

function getCategories() {
  const categories = {};

  for (const division of getDirectories(ENTRIES)) {
    const divisionPath = path.join(ENTRIES, division);

    for (const categorySlug of getDirectories(divisionPath)) {
      const categoryPath = path.join(divisionPath, categorySlug);
      const categoryName = slugToTitle(categorySlug);

      if (!categories[division]) {
        categories[division] = {};
      }

      if (!categories[division][categoryName]) {
        categories[division][categoryName] = {
          slug: categorySlug,
          classes: [],
        };
      }

      for (const classFolder of getDirectories(categoryPath)) {
        const classPath = path.join(categoryPath, classFolder, "_class.yml");

        let className = slugToTitle(classFolder);
        let classNumber = "";

        if (fs.existsSync(classPath)) {
          const classInfo = readYaml(classPath);
          className = classInfo.className || className;
          classNumber = classInfo.classNumber || "";
        }

        categories[division][categoryName].classes.push({
          slug: classFolder,
          classNumber,
          name: className,
        });
      }

      categories[division][categoryName].classes.sort((a, b) => {
        return String(a.classNumber || a.slug).localeCompare(
          String(b.classNumber || b.slug),
          undefined,
          { numeric: true },
        );
      });
    }
  }

  return categories;
}

const output = {
  people: getPeople(),
  categories: getCategories(),
};

fs.writeFileSync(
  path.join(METADATA, "recipe-taxonomy.json"),
  JSON.stringify(output, null, 2),
);

console.log("Generated html/metadata/recipe-taxonomy.json");
