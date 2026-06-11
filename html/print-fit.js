const FIT_CLASSES = ["compact", "two-column", "tiny"];

const FIT_MODES = [
  [],
  ["compact"],
  ["compact", "two-column"],
  ["compact", "two-column", "tiny"],
];

function isPrintLikeMode() {
  return (
    window.matchMedia("print").matches ||
    document.body.classList.contains("print-preview")
  );
}

function resetFit(sheet) {
  sheet.classList.remove(...FIT_CLASSES);
}

function applyMode(sheet, mode) {
  resetFit(sheet);
  sheet.classList.add(...mode);

  // Force layout recalculation.
  void sheet.offsetHeight;
}

function sheetFits(sheet) {
  const overflow = sheet.scrollHeight - sheet.clientHeight;
  return overflow <= 1;
}

function fitSheet(sheet) {
  if (!isPrintLikeMode()) {
    resetFit(sheet);
    return;
  }

  for (const mode of FIT_MODES) {
    applyMode(sheet, mode);

    if (sheetFits(sheet)) {
      return;
    }
  }

  applyMode(sheet, ["compact", "two-column", "tiny"]);
}

function fitAllSheets() {
  document.querySelectorAll(".entry-sheet").forEach(fitSheet);
}

window.addEventListener("load", fitAllSheets);
window.addEventListener("resize", fitAllSheets);
window.addEventListener("beforeprint", fitAllSheets);
window.addEventListener("afterprint", fitAllSheets);

if (document.fonts?.ready) {
  document.fonts.ready.then(fitAllSheets);
}