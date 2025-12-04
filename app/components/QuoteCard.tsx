'use client';

import type { QuoteShape } from "../../hooks/useDailyQuote";

type QuoteCardProps = {
  quote: QuoteShape | null;
};

export default function QuoteCard({ quote }: QuoteCardProps) {
  if (!quote) return null;

  const content = quote.text || quote.content || quote.q;
  const author = quote.author || quote.a || "Unknown";

  return (
    <article className="rounded-lg bg-white p-5 shadow-sm ring-1 ring-gray-100">
      <p className="text-lg leading-relaxed">“{content}”</p>
      <p className="mt-4 text-sm text-gray-600">— {author}</p>
      {quote.mood ? (
        <span className="mt-3 inline-block rounded bg-gray-100 px-2 py-1 text-xs uppercase tracking-wide text-gray-600">
          {quote.mood}
        </span>
      ) : null}
    </article>
  );
}

