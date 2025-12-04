'use client';

import QuoteCard from "./QuoteCard";
import type { QuoteShape } from "../../hooks/useDailyQuote";

type DailyQuoteProps = {
  quote: QuoteShape | null;
};

export default function DailyQuote({ quote }: DailyQuoteProps) {
  if (!quote) return null;

  return (
    <section className="space-y-3 rounded-xl bg-gradient-to-br from-indigo-50 to-white p-5 ring-1 ring-indigo-100">
      <h3 className="text-xs font-semibold uppercase tracking-wide text-indigo-600">
        Quote of the Day
      </h3>
      <QuoteCard quote={quote} />
    </section>
  );
}

