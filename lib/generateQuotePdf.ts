import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

export type QuoteLineItem = {
  description: string;
  qty: number;
  amount: number;
};

export type QuotePayload = {
  type: "Quotation" | "Invoice";
  quoteNumber: string;
  date: string; // display date, e.g. "18 Jul 2026"
  clientName: string;
  email: string;
  phone: string;
  eventDate: string;
  package: string;
  location: string;
  items: QuoteLineItem[];
  discount: number;
  taxPercent: number;
  notes: string;
};

const TERMS = [
  "A 50% advance is required to confirm and block the date; the balance is payable on or before the event day.",
  "Dates are confirmed only after receiving the advance payment.",
  "Any services beyond the scope listed above will be charged additionally.",
  "Cancellations within 15 days of the event date are non-refundable.",
  "Edited photos and films will be delivered within 60–90 days after the event.",
  "Travel, stay, and accommodation for outstation/destination events are billed separately unless stated above.",
];

const GOLD: [number, number, number] = [214, 178, 94];
const GOLD_DEEP: [number, number, number] = [163, 130, 59];
const GOLD_TINT: [number, number, number] = [250, 246, 235];
const INK: [number, number, number] = [26, 24, 20];
const MUTED: [number, number, number] = [110, 105, 96];
const LINE: [number, number, number] = [225, 220, 208];

export function calcTotals(items: QuoteLineItem[], discount: number, taxPercent: number) {
  const subtotal = items.reduce((sum, i) => sum + i.amount, 0);
  const taxable = Math.max(subtotal - discount, 0);
  const tax = (taxable * taxPercent) / 100;
  const total = taxable + tax;
  return { subtotal, tax, total };
}

function loadImageAsDataUrl(src: string): Promise<{ dataUrl: string; ratio: number }> {
  return new Promise((resolve, reject) => {
    const img = new window.Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext("2d");
      if (!ctx) return reject(new Error("no canvas context"));
      ctx.drawImage(img, 0, 0);
      resolve({
        dataUrl: canvas.toDataURL("image/jpeg", 0.95),
        ratio: img.naturalWidth / img.naturalHeight,
      });
    };
    img.onerror = () => reject(new Error("logo failed to load"));
    img.src = src;
  });
}

export async function generateQuotePdf(data: QuotePayload) {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 16;

  // ---- premium frame: thin gold rule tracing the page edge ----
  doc.setDrawColor(...GOLD);
  doc.setLineWidth(0.4);
  doc.rect(6, 6, pageWidth - 12, pageHeight - 12);

  // ---- header / logo ----
  let headerTextX = margin;
  try {
    const logoPath = `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/images/miracle logo.jpg`;
    const { dataUrl, ratio } = await loadImageAsDataUrl(logoPath);
    const logoH = 15;
    const logoW = logoH * ratio;
    doc.addImage(dataUrl, "JPEG", margin, 10, logoW, logoH);
    headerTextX = margin;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8.5);
    doc.setTextColor(...MUTED);
    doc.text("Cinematic Wedding Photography & Films", headerTextX, 30);
  } catch {
    // fallback wordmark if the logo image can't be loaded (e.g. offline)
    doc.setFont("times", "bold");
    doc.setFontSize(22);
    doc.setTextColor(...INK);
    doc.text("MIRACLE CLICKZ", margin, 22);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(...MUTED);
    doc.text("Cinematic Wedding Photography & Films", margin, 28);
  }

  doc.setDrawColor(...GOLD);
  doc.setLineWidth(0.6);
  doc.line(margin, 35, pageWidth - margin, 35);

  // doc type + number, right aligned
  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.setTextColor(...INK);
  doc.text(data.type.toUpperCase(), pageWidth - margin, 18, { align: "right" });

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(...MUTED);
  doc.text(`No. ${data.quoteNumber}`, pageWidth - margin, 24, { align: "right" });
  doc.text(`Date: ${data.date}`, pageWidth - margin, 29, { align: "right" });

  // ---- bill to / event details, on a soft gold-tinted card ----
  let y = 45;
  const cardTop = y - 6;
  const leftLines = [data.clientName || "—", data.email || "—", data.phone || "—"].filter(Boolean);
  const rightLines = [
    data.eventDate ? `Date: ${data.eventDate}` : "Date: —",
    data.package ? `Package: ${data.package}` : "Package: —",
    data.location ? `Location: ${data.location}` : "Location: —",
  ];
  const cardHeight = 6 + Math.max(leftLines.length, rightLines.length) * 5.5 + 6;

  doc.setFillColor(...GOLD_TINT);
  doc.roundedRect(margin - 4, cardTop, pageWidth - margin * 2 + 8, cardHeight, 2, 2, "F");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(9.5);
  doc.setTextColor(...GOLD_DEEP);
  doc.text("PREPARED FOR", margin, y);
  doc.text("EVENT DETAILS", pageWidth / 2 + 4, y);

  y += 6;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10.5);
  doc.setTextColor(...INK);

  leftLines.forEach((line, i) => doc.text(line, margin, y + i * 5.5));
  rightLines.forEach((line, i) => doc.text(line, pageWidth / 2 + 4, y + i * 5.5));

  y = cardTop + cardHeight + 10;

  // ---- items table ----
  const rows = data.items
    .filter((i) => i.description.trim() !== "")
    .map((i) => [i.description, String(i.qty), `Rs. ${i.amount.toLocaleString("en-IN")}`]);

  autoTable(doc, {
    startY: y,
    head: [["Description", "Qty", "Amount"]],
    body: rows,
    theme: "plain",
    styles: {
      font: "helvetica",
      fontSize: 10,
      textColor: INK,
      cellPadding: 3,
      lineColor: LINE,
      lineWidth: 0.2,
    },
    headStyles: {
      fillColor: GOLD,
      textColor: [26, 24, 20],
      fontStyle: "bold",
      halign: "left",
    },
    columnStyles: {
      1: { halign: "center", cellWidth: 24 },
      2: { halign: "right", cellWidth: 40 },
    },
    margin: { left: margin, right: margin },
  });

  // ---- totals, on a soft gold-tinted card ----
  const { subtotal, tax, total } = calcTotals(data.items, data.discount, data.taxPercent);
  // @ts-expect-error - lastAutoTable is attached by the autotable plugin at runtime
  let finalY = (doc.lastAutoTable?.finalY ?? y + 20) + 10;

  const cardW = 78;
  const totalsCardX = pageWidth - margin - cardW;
  const totalsX = pageWidth - margin - 62;
  const valueX = pageWidth - margin - 4;

  let rowsCount = 1; // subtotal always shown
  if (data.discount > 0) rowsCount += 1;
  if (data.taxPercent > 0) rowsCount += 1;
  const totalsCardH = rowsCount * 6 + 14;

  doc.setFillColor(...GOLD_TINT);
  doc.roundedRect(totalsCardX, finalY - 6, cardW, totalsCardH, 2, 2, "F");

  finalY += 1;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(...MUTED);
  doc.text("Subtotal", totalsX, finalY);
  doc.setTextColor(...INK);
  doc.text(`Rs. ${subtotal.toLocaleString("en-IN")}`, valueX, finalY, { align: "right" });

  if (data.discount > 0) {
    finalY += 6;
    doc.setTextColor(...MUTED);
    doc.text("Discount", totalsX, finalY);
    doc.setTextColor(...INK);
    doc.text(`- Rs. ${data.discount.toLocaleString("en-IN")}`, valueX, finalY, { align: "right" });
  }

  if (data.taxPercent > 0) {
    finalY += 6;
    doc.setTextColor(...MUTED);
    doc.text(`Tax (${data.taxPercent}%)`, totalsX, finalY);
    doc.setTextColor(...INK);
    doc.text(`Rs. ${tax.toLocaleString("en-IN")}`, valueX, finalY, { align: "right" });
  }

  finalY += 5;
  doc.setDrawColor(...GOLD);
  doc.setLineWidth(0.4);
  doc.line(totalsX, finalY, valueX, finalY);

  finalY += 7;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12.5);
  doc.setTextColor(...INK);
  doc.text("Total", totalsX, finalY);
  doc.text(`Rs. ${total.toLocaleString("en-IN")}`, valueX, finalY, { align: "right" });

  // ---- notes ----
  if (data.notes.trim()) {
    finalY += 16;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.setTextColor(...GOLD_DEEP);
    doc.text("NOTES", margin, finalY);
    finalY += 5;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9.5);
    doc.setTextColor(...INK);
    const wrapped = doc.splitTextToSize(data.notes, pageWidth - margin * 2);
    doc.text(wrapped, margin, finalY);
    finalY += wrapped.length * 4.5;
  }

  // ---- terms & conditions ----
  finalY += 14;
  const termsHeightEstimate = 8 + TERMS.length * 6;
  if (finalY + termsHeightEstimate > pageHeight - 24) {
    doc.addPage();
    doc.setDrawColor(...GOLD);
    doc.setLineWidth(0.4);
    doc.rect(6, 6, pageWidth - 12, pageHeight - 12);
    finalY = 22;
  }
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.setTextColor(...GOLD_DEEP);
  doc.text("TERMS & CONDITIONS", margin, finalY);
  finalY += 5;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.5);
  doc.setTextColor(...INK);
  TERMS.forEach((term, i) => {
    const wrapped = doc.splitTextToSize(`${i + 1}. ${term}`, pageWidth - margin * 2 - 2);
    doc.text(wrapped, margin, finalY);
    finalY += wrapped.length * 4.2 + 1.6;
  });

  // ---- footer ----
  const footerY = pageHeight - 18;
  doc.setDrawColor(...LINE);
  doc.setLineWidth(0.2);
  doc.line(margin, footerY, pageWidth - margin, footerY);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.5);
  doc.setTextColor(...MUTED);
  const validity =
    data.type === "Quotation"
      ? "This quotation is valid for 7 days from the date above."
      : "Thank you for your business.";
  doc.text(`${validity}  ·  Miracle Clickz  ·  Every love story deserves a masterpiece.`, margin, footerY + 6);

  const filename = `${data.quoteNumber}-${(data.clientName || "client").replace(/\s+/g, "-")}.pdf`;
  doc.save(filename);
}
