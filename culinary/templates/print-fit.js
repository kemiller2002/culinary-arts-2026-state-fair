function fitEntrySheet() {
  const sheet = document.querySelector(".entry-sheet");
  if (!sheet) return;

  const modes = [
    [],
    ["compact"],
    ["compact", "two-column"],
    ["compact", "two-column", "tiny"],
  ];

  sheet.classList.remove("compact", "two-column", "tiny");

  for (const mode of modes) {
    sheet.classList.remove("compact", "two-column", "tiny");
    sheet.classList.add(...mode);

    // Force layout recalculation
    sheet.offsetHeight;

    if (sheet.scrollHeight <= sheet.clientHeight) {
      return;
    }
  }

  // Last resort: keep the tightest mode applied.
  sheet.classList.remove("compact", "two-column", "tiny");
  sheet.classList.add("compact", "two-column", "tiny");
}

function fitAllEntrySheets() {
  document.querySelectorAll(".entry-sheet").forEach((sheet) => {
    const modes = [
      [],
      ["compact"],
      ["compact", "two-column"],
      ["compact", "two-column", "tiny"],
    ];

    sheet.classList.remove("compact", "two-column", "tiny");

    for (const mode of modes) {
      sheet.classList.remove("compact", "two-column", "tiny");
      sheet.classList.add(...mode);

      // Force browser to recalculate layout.
      sheet.offsetHeight;

      if (sheet.scrollHeight <= sheet.clientHeight) {
        return;
      }
    }

    sheet.classList.remove("compact", "two-column", "tiny");
    sheet.classList.add("compact", "two-column", "tiny");
  });
}

window.addEventListener("load", fitAllEntrySheets);
window.addEventListener("resize", fitAllEntrySheets);
window.addEventListener("beforeprint", fitAllEntrySheets);

if (document.fonts && document.fonts.ready) {
  document.fonts.ready.then(fitAllEntrySheets);
}