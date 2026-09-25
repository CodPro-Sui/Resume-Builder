import html2canvas from "html2canvas";
import jsPDF from "jspdf";

// Make sure every web font (Fraunces, Sora, Space Mono, Source Serif 4, Inter)
// has actually finished loading before we take a snapshot. If we capture too
// early, text renders with a substitute font whose metrics don't match the
// already-laid-out page, which is what caused the overlapping text earlier.
async function waitForFonts() {
  if (document.fonts && document.fonts.ready) {
    try {
      await document.fonts.ready;
    } catch (e) {
      /* ignore */
    }
  }
  const families = [
    "600 16px Sora",
    "600 16px Fraunces",
    "600 16px 'Source Serif 4'",
    "600 16px 'Space Mono'",
    "600 16px Inter"
  ];
  try {
    await Promise.all(families.map((f) => document.fonts.load(f)));
  } catch (e) {
    /* ignore */
  }
  await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));
}

async function captureNode(node) {
  if (!node) throw new Error("Nothing to capture");

  await waitForFonts();

  // allowTaint intentionally omitted: combined with useCORS it can mark the
  // canvas as tainted, which makes toDataURL() return a blank image instead
  // of throwing. Everything in the resume (fonts = text, photo = data URI)
  // is same-origin/inline, so useCORS alone is enough and keeps the canvas
  // readable.
  const canvas = await html2canvas(node, {
    scale: 2.5,
    backgroundColor: "#ffffff",
    useCORS: true,
    letterRendering: true,
    imageTimeout: 15000,
    logging: false
  });

  if (!canvas || canvas.width === 0 || canvas.height === 0) {
    throw new Error("Capture produced an empty canvas");
  }
  return canvas;
}

export async function downloadPNG(node, filename) {
  const canvas = await captureNode(node);
  const link = document.createElement("a");
  link.download = filename + ".png";
  link.href = canvas.toDataURL("image/png");
  link.click();
}

export async function downloadPDF(node, filename) {
  const canvas = await captureNode(node);
  const imgData = canvas.toDataURL("image/png");
  const pdf = new jsPDF("p", "pt", "a4");
  const pageW = pdf.internal.pageSize.getWidth();
  const pageH = pdf.internal.pageSize.getHeight();
  const imgW = pageW;
  const imgH = (canvas.height * imgW) / canvas.width;
  let heightLeft = imgH;
  let position = 0;

  pdf.addImage(imgData, "PNG", 0, 0, imgW, imgH);
  heightLeft -= pageH;

  while (heightLeft > 0) {
    position = heightLeft - imgH;
    pdf.addPage();
    pdf.addImage(imgData, "PNG", 0, position, imgW, imgH);
    heightLeft -= pageH;
  }

  pdf.save(filename + ".pdf");
}
