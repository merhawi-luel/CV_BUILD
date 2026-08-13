import jsPDF from "jspdf";

export function useCvPdfDownload(cvData) {
  const normalizeUrl = (value) => {
    if (!value) return "";
    return value.startsWith("http") ? value : `https://${value}`;
  };

  const formatProfileLabel = (value) => {
    if (!value) return "";
    return value.replace(/^https?:\/\//, "");
  };

  const handleDownloadCv = () => {
    const pdf = new jsPDF({ unit: "pt", format: "a4" });
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const marginX = 48;
    const contentWidth = pageWidth - marginX * 2;
    let cursorY = 54;

    const ensureSpace = (neededHeight) => {
      if (cursorY + neededHeight > pageHeight - 48) {
        pdf.addPage();
        cursorY = 54;
      }
    };

    const addSectionTitle = (title) => {
      ensureSpace(24);
      pdf.setFont("times", "bold");
      pdf.setFontSize(12);
      pdf.text(title.toUpperCase(), marginX, cursorY);
      cursorY += 8;
      pdf.setDrawColor(215, 219, 224);
      pdf.line(marginX, cursorY, pageWidth - marginX, cursorY);
      cursorY += 18;
    };

    const addEntryBlock = (title, subtitle, dates, body) => {
      const measuredBody = body ? pdf.splitTextToSize(body, contentWidth) : [];
      ensureSpace(38 + measuredBody.length * 12);
      pdf.setFont("times", "bold");
      pdf.setFontSize(11);
      pdf.text(title, marginX, cursorY);
      if (dates) {
        pdf.setFont("times", "normal");
        pdf.setFontSize(9);
        pdf.text(dates, pageWidth - marginX, cursorY, { align: "right" });
      }
      cursorY += 14;

      if (subtitle) {
        pdf.setFont("times", "normal");
        pdf.setFontSize(10);
        pdf.text(subtitle, marginX, cursorY);
        cursorY += 12;
      }

      if (measuredBody.length > 0) {
        pdf.setFont("times", "normal");
        pdf.setFontSize(10);
        pdf.text(measuredBody, marginX, cursorY);
        cursorY += measuredBody.length * 12;
      }

      cursorY += 6;
    };

    pdf.setTextColor(17, 24, 39);
    pdf.setFont("times", "bold");
    pdf.setFontSize(24);
    pdf.text(cvData.personal.name || "Your Name", pageWidth / 2, cursorY, { align: "center" });
    cursorY += 16;

    pdf.setFont("times", "normal");
    pdf.setFontSize(9);
    const contactLine = [cvData.personal.email, cvData.personal.phone, cvData.personal.location]
      .filter(Boolean)
      .join(" | ");
    if (contactLine) {
      pdf.text(contactLine, pageWidth / 2, cursorY, { align: "center" });
      cursorY += 12;
    }

    const profileLinks = [
      { value: cvData.personal.linkedin },
      { value: cvData.personal.github },
    ].filter((link) => link.value);

    if (profileLinks.length > 0) {
      const linkY = cursorY;
      const visibleLinks = profileLinks.map((link) => ({
        url: normalizeUrl(link.value),
        display: formatProfileLabel(link.value),
      }));

      if (visibleLinks.length === 1) {
        const link = visibleLinks[0];
        pdf.setTextColor(29, 78, 216);
        pdf.textWithLink(link.display, pageWidth / 2, linkY, {
          url: link.url,
          align: "center",
        });
      } else {
        const first = visibleLinks[0];
        const second = visibleLinks[1];
        pdf.setTextColor(29, 78, 216);
        pdf.textWithLink(first.display, pageWidth / 2 - 36, linkY, {
          url: first.url,
          align: "center",
        });
        pdf.setTextColor(107, 114, 128);
        pdf.text("|", pageWidth / 2, linkY, { align: "center" });
        pdf.setTextColor(29, 78, 216);
        pdf.textWithLink(second.display, pageWidth / 2 + 36, linkY, {
          url: second.url,
          align: "center",
        });
      }
      pdf.setTextColor(17, 24, 39);
      cursorY += 18;
    }

    pdf.setDrawColor(215, 219, 224);
    pdf.line(marginX, cursorY, pageWidth - marginX, cursorY);
    cursorY += 18;

    if (
      cvData.education.some((entry) =>
        [entry.school, entry.degree, entry.field, entry.from, entry.to].some(
          (value) => String(value || "").trim() !== ""
        )
      )
    ) {
      addSectionTitle("Education");
      cvData.education.forEach((entry) => {
        if (
          ![entry.school, entry.degree, entry.field, entry.from, entry.to].some(
            (value) => String(value || "").trim() !== ""
          )
        ) {
          return;
        }
        const subtitle = [entry.degree, entry.field].filter(Boolean).join(", ");
        addEntryBlock(entry.school || "", subtitle, [entry.from, entry.to].filter(Boolean).join(" – "), "");
      });
    }

    if (
      cvData.experience.some((entry) =>
        [entry.company, entry.role, entry.from, entry.to, entry.description].some(
          (value) => String(value || "").trim() !== ""
        )
      )
    ) {
      addSectionTitle("Experience");
      cvData.experience.forEach((entry) => {
        if (
          ![entry.company, entry.role, entry.from, entry.to, entry.description].some(
            (value) => String(value || "").trim() !== ""
          )
        ) {
          return;
        }
        addEntryBlock(
          entry.role || "",
          entry.company || "",
          [entry.from, entry.to].filter(Boolean).join(" – "),
          entry.description || ""
        );
      });
    }

    if (cvData.skills.some((skill) => String(skill || "").trim() !== "")) {
      addSectionTitle("Skills");
      const visibleSkills = cvData.skills.filter((skill) => String(skill || "").trim() !== "");
      pdf.setFont("times", "normal");
      pdf.setFontSize(10);
      const skillText = visibleSkills.join("   •   ");
      ensureSpace(24);
      const skillLines = pdf.splitTextToSize(skillText, contentWidth);
      pdf.text(skillLines, marginX, cursorY);
    }

    pdf.save(`${(cvData.personal.name || "cv").replace(/\s+/g, "_").toLowerCase()}.pdf`);
  };

  return { handleDownloadCv };
}