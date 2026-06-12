const FIT_CLASSES = ["compact", "two-column", "tiny", "micro"];

const FIT_MODES = [
  [],
  ["compact"],
  ["compact", "two-column"],
  ["compact", "two-column", "tiny"],
  ["compact", "two-column", "tiny", "micro"],
];

<<<<<<< HEAD
function applyMode(sheet, mode) {
  sheet.classList.remove(...FIT_CLASSES);
=======
function resetFit(sheet) {
  sheet.classList.remove(...FIT_CLASSES);
}

function applyMode(sheet, mode) {
  resetFit(sheet);
>>>>>>> refs/remotes/origin/main
  sheet.classList.add(...mode);
  void sheet.offsetHeight;
}

<<<<<<< HEAD
function getContentOverflow(sheet) {
  const body = sheet.querySelector(".recipe-body");

  if (!body) {
    console.warn("No .recipe-body found inside .print-version");
    return 9999;
  }

  const bodyBox = body.getBoundingClientRect();

  let overflow = 0;

  const children = body.querySelectorAll("*");

  for (const child of children) {
    const rects = child.getClientRects();

    for (const rect of rects) {
      overflow = Math.max(
        overflow,
        rect.right - bodyBox.right,
        rect.bottom - bodyBox.bottom,
      );
    }
  }

  return overflow;
=======
function sheetFits(sheet) {
  return sheet.scrollHeight - sheet.clientHeight <= 1;
>>>>>>> refs/remotes/origin/main
}

function fitPrintVersion() {
  const sheet = document.querySelector(".print-version");

  if (!sheet) {
    console.warn("No .print-version found");
    return;
  }

  for (const mode of FIT_MODES) {
    applyMode(sheet, mode);

<<<<<<< HEAD
    const overflow = getContentOverflow(sheet);

    console.log(
      "Trying:",
      mode.join(" ") || "normal",
      "overflow:",
      Math.round(overflow),
    );

    if (overflow <= 1) {
      console.log("Selected:", mode.join(" ") || "normal");
=======
    if (sheetFits(sheet)) {
>>>>>>> refs/remotes/origin/main
      return;
    }
  }

<<<<<<< HEAD
  applyMode(sheet, ["compact", "two-column", "tiny", "micro"]);
  console.warn("Using tightest mode");
}

window.addEventListener("load", fitPrintVersion);
window.addEventListener("resize", fitPrintVersion);

if (document.fonts?.ready) {
  document.fonts.ready.then(fitPrintVersion);
}
=======
  applyMode(sheet, ["compact", "two-column", "tiny"]);
}

function fitAllSheetsForPrint() {
  document.body.classList.add("print-preview");

  requestAnimationFrame(() => {
    document.querySelectorAll(".entry-sheet").forEach(fitSheet);
  });
}

function resetAfterPrint() {
  if (!document.body.dataset.keepPrintPreview) {
    document.body.classList.remove("print-preview");
  }
}

window.addEventListener("beforeprint", fitAllSheetsForPrint);
window.addEventListener("afterprint", resetAfterPrint);

window.addEventListener("load", () => {
  if (document.body.classList.contains("print-preview")) {
    document.querySelectorAll(".entry-sheet").forEach(fitSheet);
  }
});

if (document.fonts?.ready) {
  document.fonts.ready.then(() => {
    if (document.body.classList.contains("print-preview")) {
      document.querySelectorAll(".entry-sheet").forEach(fitSheet);
    }
  });
}
>>>>>>> refs/remotes/origin/main
