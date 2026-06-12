const FIT_CLASSES = ["compact", "two-column", "tiny", "micro"];

const FIT_MODES = [
  [],
  ["compact"],
  ["compact", "two-column"],
  ["compact", "two-column", "tiny"],
  ["compact", "two-column", "tiny", "micro"],
];

function applyMode(sheet, mode) {
  sheet.classList.remove(...FIT_CLASSES);
  sheet.classList.add(...mode);
  void sheet.offsetHeight;
}

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
}

function fitPrintVersion() {
  const sheet = document.querySelector(".print-version");

  if (!sheet) {
    console.warn("No .print-version found");
    return;
  }

  for (const mode of FIT_MODES) {
    applyMode(sheet, mode);

    const overflow = getContentOverflow(sheet);

    console.log(
      "Trying:",
      mode.join(" ") || "normal",
      "overflow:",
      Math.round(overflow),
    );

    if (overflow <= 1) {
      console.log("Selected:", mode.join(" ") || "normal");
      return;
    }
  }

  applyMode(sheet, ["compact", "two-column", "tiny", "micro"]);
  console.warn("Using tightest mode");
}

window.addEventListener("load", fitPrintVersion);
window.addEventListener("resize", fitPrintVersion);

if (document.fonts?.ready) {
  document.fonts.ready.then(fitPrintVersion);
}

function enablePrintModeFromQueryString() {
  const params = new URLSearchParams(window.location.search);

  if (!params.has("printMode")) return;

  document.body.classList.add("show-print-version");
}

enablePrintModeFromQueryString();
