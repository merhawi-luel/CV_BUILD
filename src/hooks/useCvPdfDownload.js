import { useState } from "react";
import { toCanvas } from "html-to-image";
import jsPDF from "jspdf";

export function useCvPdfDownload(cvData, previewRef) {
  const [isGenerating, setIsGenerating] = useState(false);

  const handleDownloadCv = async () => {
    const el = previewRef?.current?.firstElementChild;
    if (!el || isGenerating) return;

    setIsGenerating(true);
    try {
      // Render the exact preview DOM (foreignObject-based, so the browser's
      // real layout engine is used: grids, flex, fonts all match pixel-for-pixel).
      const canvas = await toCanvas(el, {
        pixelRatio: 2,
        backgroundColor: "#ffffff",
      });

      // One long sheet: width matches A4, height is at least one A4 page and
      // grows with the content so nothing is cut off or split across pages.
      const pageWidth = 595.28; // A4 width in pt
      const minPageHeight = 841.89; // A4 height in pt
      const contentHeightPt = (canvas.height * pageWidth) / canvas.width;
      const pageHeight = Math.max(minPageHeight, contentHeightPt);

      const pdf = new jsPDF({ unit: "pt", format: [pageWidth, pageHeight] });
      pdf.addImage(canvas, "PNG", 0, 0, pageWidth, contentHeightPt);

      pdf.save(`${(cvData.personal.name || "cv").replace(/\s+/g, "_").toLowerCase()}.pdf`);
    } finally {
      setIsGenerating(false);
    }
  };

  return { handleDownloadCv, isGenerating };
}
