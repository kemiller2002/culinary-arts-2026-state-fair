const FIT_CLASSES = ["compact", "two-column", "tiny"];

const FIT_MODES = [
  [],
  ["compact"],
  ["compact", "two-column"],
  ["compact", "two-column", "tiny"],
];

function resetFit(sheet) {
  sheet.classList.remove(...FIT_CLASSES);
}

function applyMode(sheet, mode) {
  resetFit(sheet);
  sheet.classList.add(...mode);
  void sheet.offsetHeight;
}

function sheetFits(sheet) {
  return sheet.scrollHeight - sheet.clientHeight <= 1;
}

function fitSheet(sheet) {
  for (const mode of FIT_MODES) {
    applyMode(sheet, mode);

    if (sheetFits(sheet)) {
      return;
    }
  }

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