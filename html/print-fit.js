function fits(sheet) {
  return sheet.scrollHeight <= sheet.clientHeight;
}

function applyMode(sheet, classes) {
  sheet.classList.remove("compact", "two-column", "tiny");
  sheet.classList.add(...classes);

  // Force layout recalculation
  void sheet.offsetHeight;
}

function fitSheet(sheet) {
  const modes = [
    [],
    ["compact"],
    ["compact", "two-column"],
    ["compact", "two-column", "tiny"],
  ];

  for (const mode of modes) {
    applyMode(sheet, mode);

    if (fits(sheet)) {
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

if (document.fonts?.ready) {
  document.fonts.ready.then(fitAllSheets);
}