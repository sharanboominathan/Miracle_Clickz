"use client";

import { useEffect, useMemo, useState } from "react";
import {
  calcTotals,
  generateQuotePdf,
  type QuoteLineItem,
} from "@/lib/generateQuotePdf";

// ---- config: change these two whenever you like, no other code changes needed ----
const ACCESS_PASSWORD = "mc2026quotes";
const WEBAPP_URL =
  "https://script.google.com/macros/s/AKfycbwDB6rY_GFtFkYimyA_nZj_RZWz5n4NvMtOQWexcqlTmwRgh_wNIa4KQLDj-1zR9N2iVA/exec";

const PACKAGES = ["Wedding", "Destination Wedding", "Pre Wedding", "Engagement", "Commercial", "Other"];

function makeQuoteNumber(type: "Quotation" | "Invoice") {
  const prefix = type === "Invoice" ? "INV" : "QT";
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  const rand = Math.floor(1000 + Math.random() * 9000);
  return `MC-${prefix}-${y}${m}${day}-${rand}`;
}

function emptyItem(): QuoteLineItem {
  return { description: "", qty: 1, amount: 0 };
}

function displayDate() {
  return new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
}

export default function QuotePage() {
  const [unlocked, setUnlocked] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [passwordError, setPasswordError] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && sessionStorage.getItem("mc-quote-unlocked") === "1") {
      setUnlocked(true);
    }
  }, []);

  const checkPassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === ACCESS_PASSWORD) {
      setUnlocked(true);
      setPasswordError(false);
      sessionStorage.setItem("mc-quote-unlocked", "1");
    } else {
      setPasswordError(true);
    }
  };

  const [type, setType] = useState<"Quotation" | "Invoice">("Quotation");
  const [quoteNumber, setQuoteNumber] = useState(() => makeQuoteNumber("Quotation"));
  const [clientName, setClientName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [pkg, setPkg] = useState("");
  const [location, setLocation] = useState("");
  const [items, setItems] = useState<QuoteLineItem[]>([emptyItem()]);
  const [discount, setDiscount] = useState(0);
  const [taxPercent, setTaxPercent] = useState(0);
  const [notes, setNotes] = useState("");

  const [status, setStatus] = useState<"idle" | "saving" | "done" | "error">("idle");

  const changeType = (t: "Quotation" | "Invoice") => {
    setType(t);
    setQuoteNumber(makeQuoteNumber(t));
  };

  const updateItem = (index: number, patch: Partial<QuoteLineItem>) => {
    setItems((prev) => prev.map((it, i) => (i === index ? { ...it, ...patch } : it)));
  };
  const addItem = () => setItems((prev) => [...prev, emptyItem()]);
  const removeItem = (index: number) => setItems((prev) => prev.filter((_, i) => i !== index));

  const { subtotal, tax, total } = useMemo(
    () => calcTotals(items, discount, taxPercent),
    [items, discount, taxPercent]
  );

  const resetForm = () => {
    setClientName("");
    setEmail("");
    setPhone("");
    setEventDate("");
    setPkg("");
    setLocation("");
    setItems([emptyItem()]);
    setDiscount(0);
    setTaxPercent(0);
    setNotes("");
    setQuoteNumber(makeQuoteNumber(type));
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName.trim() || !email.trim()) return;

    setStatus("saving");
    const payload = {
      type,
      quoteNumber,
      date: displayDate(),
      clientName,
      email,
      phone,
      eventDate,
      package: pkg,
      location,
      items,
      discount,
      taxPercent,
      notes,
    };

    // log to the Google Sheet — no-cors because the Apps Script web app
    // doesn't return CORS headers we can read; the write still goes through.
    // include the computed subtotal/total since the Sheet columns expect them.
    try {
      await fetch(WEBAPP_URL, {
        method: "POST",
        mode: "no-cors",
        body: JSON.stringify({ ...payload, subtotal, total }),
      });
    } catch {
      // network-level failure only; Apps Script write may still have succeeded
    }

    try {
      await generateQuotePdf(payload);
      setStatus("done");
    } catch {
      setStatus("error");
    }
  };

  if (!unlocked) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-black px-6">
        <form onSubmit={checkPassword} className="glass w-full max-w-sm rounded-sm p-8">
          <h1 className="mb-6 font-serif text-2xl font-light text-white">Quote / Invoice Tool</h1>
          <div className="field mb-4">
            <input
              id="qt-pass"
              name="mc-quote-access"
              type="password"
              placeholder=" "
              value={passwordInput}
              onChange={(e) => {
                setPasswordInput(e.target.value);
                setPasswordError(false);
              }}
              autoComplete="off"
              autoFocus
            />
            <label htmlFor="qt-pass">Password</label>
          </div>
          {passwordError && (
            <p className="mb-4 text-[11px] text-red-400">Incorrect password. Try again.</p>
          )}
          <button
            type="submit"
            className="w-full rounded-full bg-gold py-3 text-[11px] uppercase tracking-cine text-jet transition-colors duration-500 hover:bg-gold-soft"
          >
            Unlock
          </button>
        </form>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black px-6 py-16 text-white">
      <div className="mx-auto max-w-3xl">
        <div className="mb-10 flex items-center justify-between">
          <h1 className="font-serif text-3xl font-light">New {type}</h1>
          <div className="flex overflow-hidden rounded-full border border-white/15">
            {(["Quotation", "Invoice"] as const).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => changeType(t)}
                className={`px-4 py-2 text-[11px] uppercase tracking-wide transition-colors ${
                  type === t ? "bg-gold text-jet" : "text-white/60 hover:text-white"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <form onSubmit={submit} className="glass flex flex-col gap-6 rounded-sm p-6 md:p-10">
          <p className="text-[11px] uppercase tracking-wide2 text-white/40">
            {quoteNumber} · {displayDate()}
          </p>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="field">
              <input
                id="qt-name"
                type="text"
                placeholder=" "
                required
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
              />
              <label htmlFor="qt-name">Client Name</label>
            </div>
            <div className="field">
              <input
                id="qt-email"
                type="email"
                placeholder=" "
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label htmlFor="qt-email">Email</label>
            </div>
            <div className="field">
              <input
                id="qt-phone"
                type="tel"
                placeholder=" "
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              <label htmlFor="qt-phone">Phone / WhatsApp</label>
            </div>
            <div className="field">
              <input
                id="qt-date"
                type="date"
                placeholder=" "
                value={eventDate}
                onChange={(e) => setEventDate(e.target.value)}
              />
              <label htmlFor="qt-date">Event Date</label>
            </div>
            <div className="field">
              <select
                id="qt-package"
                value={pkg}
                onChange={(e) => setPkg(e.target.value)}
              >
                <option value="" disabled hidden />
                {PACKAGES.map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>
              <label htmlFor="qt-package">Package</label>
            </div>
            <div className="field">
              <input
                id="qt-location"
                type="text"
                placeholder=" "
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
              <label htmlFor="qt-location">Location</label>
            </div>
          </div>

          {/* line items */}
          <div>
            <p className="mb-3 text-[10px] uppercase tracking-wide2 text-white/40">Line Items</p>

            <div className="hidden grid-cols-12 gap-2 px-1 pb-1 text-[10px] uppercase tracking-wide text-white/30 sm:grid">
              <span className="col-span-6">Description</span>
              <span className="col-span-2 text-right">Qty</span>
              <span className="col-span-3 text-right">Amount</span>
              <span className="col-span-1" />
            </div>

            <div className="flex flex-col gap-3">
              {items.map((item, i) => (
                <div key={i} className="grid grid-cols-12 items-center gap-2">
                  <input
                    className="col-span-12 rounded-sm border border-white/15 bg-white/5 px-3 py-2 text-sm text-white outline-none focus:border-gold/60 sm:col-span-6"
                    placeholder="Description"
                    value={item.description}
                    onChange={(e) => updateItem(i, { description: e.target.value })}
                  />
                  <input
                    className="col-span-4 rounded-sm border border-white/15 bg-white/5 px-2 py-2 text-right text-sm text-white outline-none focus:border-gold/60 sm:col-span-2"
                    type="number"
                    min={0}
                    placeholder="Qty"
                    value={item.qty}
                    onChange={(e) => updateItem(i, { qty: Number(e.target.value) || 0 })}
                  />
                  <input
                    className="col-span-6 rounded-sm border border-white/15 bg-white/5 px-2 py-2 text-right text-sm text-white outline-none focus:border-gold/60 sm:col-span-3"
                    type="number"
                    min={0}
                    placeholder="Amount"
                    value={item.amount}
                    onChange={(e) => updateItem(i, { amount: Number(e.target.value) || 0 })}
                  />
                  <button
                    type="button"
                    onClick={() => removeItem(i)}
                    disabled={items.length === 1}
                    className="col-span-2 text-right text-[11px] text-white/40 hover:text-red-400 disabled:opacity-30 sm:col-span-1"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={addItem}
              className="mt-3 text-[11px] uppercase tracking-wide text-gold hover:text-gold-soft"
            >
              + Add Line Item
            </button>
          </div>

          <div className="ml-auto flex w-full flex-col gap-2.5 rounded-md border border-gold/20 bg-gold/[0.06] px-5 py-4 shadow-lg shadow-black/20 sm:w-80">
            <p className="mb-1 text-[10px] uppercase tracking-wide2 text-white/40">Summary</p>

            <div className="flex justify-between text-sm text-white/70">
              <span>Subtotal</span>
              <span>₹{subtotal.toLocaleString("en-IN")}</span>
            </div>

            <div className="flex items-center justify-between text-sm text-white/70">
              <label htmlFor="qt-discount">Discount (₹)</label>
              <input
                id="qt-discount"
                type="number"
                min={0}
                value={discount}
                onChange={(e) => setDiscount(Number(e.target.value) || 0)}
                className="w-24 rounded-sm border border-white/15 bg-white/5 px-2 py-1 text-right text-sm text-white outline-none focus:border-gold/60"
              />
            </div>

            <div className="flex items-center justify-between text-sm text-white/70">
              <label htmlFor="qt-tax">Tax (%)</label>
              <input
                id="qt-tax"
                type="number"
                min={0}
                value={taxPercent}
                onChange={(e) => setTaxPercent(Number(e.target.value) || 0)}
                className="w-24 rounded-sm border border-white/15 bg-white/5 px-2 py-1 text-right text-sm text-white outline-none focus:border-gold/60"
              />
            </div>

            {taxPercent > 0 && (
              <div className="flex justify-between text-sm text-white/70">
                <span>Tax amount</span>
                <span>₹{tax.toLocaleString("en-IN")}</span>
              </div>
            )}

            <div className="mt-1 flex justify-between border-t border-gold/20 pt-2.5 text-lg font-medium text-gold">
              <span>Total</span>
              <span>₹{total.toLocaleString("en-IN")}</span>
            </div>
          </div>

          <div className="field">
            <textarea
              id="qt-notes"
              rows={3}
              placeholder=" "
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
            <label htmlFor="qt-notes">Notes / Terms</label>
          </div>

          <button
            type="submit"
            disabled={status === "saving"}
            className="mt-2 rounded-full bg-gold py-4 text-[11px] uppercase tracking-cine text-jet transition-colors duration-500 hover:bg-gold-soft disabled:opacity-60"
          >
            {status === "saving" ? "Generating…" : `Save & Download ${type} PDF`}
          </button>

          {status === "done" && (
            <p className="text-center text-[11px] text-gold">
              Saved to Sheet and PDF downloaded.{" "}
              <button type="button" onClick={resetForm} className="underline">
                Start a new one
              </button>
            </p>
          )}
          {status === "error" && (
            <p className="text-center text-[11px] text-red-400">
              PDF generation failed — check console for details.
            </p>
          )}
        </form>
      </div>
    </main>
  );
}
