const FIT_CLASSES = ["compact", "two-column", "tiny"];

const FIT_MODES = [
  [],
  ["compact"],
  ["compact", "two-column"],
  ["compact", "two-column", "tiny"],
];

function isPrintMode() {
  return (
    window.matchMedia("print").matches ||
    document.body.classList.contains("print-preview")
  );
}

function applyFitMode(sheet, mode) {
  sheet.classList.remove(...FIT_CLASSES);
  sheet.classList.add(...mode);

  // Force layout recalculation.
  void sheet.offsetHeight;
}

function sheetFits(sheet) {
  return sheet.scrollHeight <= sheet.clientHeight;
}

function fitSheet(sheet) {
  for (const mode of FIT_MODES) {
    applyFitMode(sheet, mode);

    if (sheetFits(sheet)) return;
  }

  applyFitMode(sheet, ["compact", "two-column", "tiny"]);
}

function fitAllSheets() {
  if (!isPrintMode()) return;

  document.querySelectorAll(".entry-sheet").forEach(fitSheet);
}

window.addEventListener("beforeprint", fitAllSheets);

window.addEventListener("load", () => {
  if (document.fonts?.ready) {
    document.fonts.ready.then(fitAllSheets);
  } else {
    fitAllSheets();
  }
});

window.addEventListener("resize", fitAllSheets);