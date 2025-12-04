'use client';

import { useEffect, useMemo, useState } from "react";
import DailyQuote from "./components/DailyQuote";
import QuoteCard from "./components/QuoteCard";
import MoodFilter from "./components/MoodFilter";
import RandomQuoteButton from "./components/RandomQuoteButton";
import { sanityClient } from "../sanity/lib/client";
import { useDailyQuote, type QuoteShape } from "../hooks/useDailyQuote";

const moodsList = ["motivation", "happy", "sad", "inspirational", "wisdom"];
const fallbackQuotes: QuoteShape[] = [
  {
    text: "Start where you are. Use what you have. Do what you can.",
    author: "Arthur Ashe",
    mood: "motivation",
  },
  {
    text: "Happiness depends upon ourselves.",
    author: "Aristotle",
    mood: "happy",
  },
  {
    text: "Tears are words the heart can't express.",
    author: "Gerard Way",
    mood: "sad",
  },
  {
    text: "The best way out is always through.",
    author: "Robert Frost",
    mood: "inspirational",
  },
  {
    text: "Knowing yourself is the beginning of all wisdom.",
    author: "Aristotle",
    mood: "wisdom",
  },
  {
    text: "Every moment is a fresh beginning.",
    author: "T.S. Eliot",
    mood: "happy",
  },
  {
    text: "Believe you can and you're halfway there.",
    author: "Theodore Roosevelt",
    mood: "motivation",
  },
  {
    text: "We suffer more often in imagination than in reality.",
    author: "Seneca",
    mood: "wisdom",
  },
  {
    text: "Sometimes even to live is an act of courage.",
    author: "Seneca",
    mood: "sad",
  },
  {
    text: "If you want the rainbow, you gotta put up with the rain.",
    author: "Dolly Parton",
    mood: "inspirational",
  },
];

export default function HomePage() {
  const [quotes, setQuotes] = useState<QuoteShape[]>([]);
  const [filtered, setFiltered] = useState<QuoteShape[]>([]);
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [currentQuote, setCurrentQuote] = useState<QuoteShape | null>(null);
  const [loading, setLoading] = useState(true);
  const { dailyQuote, persistDaily } = useDailyQuote();

  useEffect(() => {
    let cancelled = false;

    async function loadQuotes() {
      setLoading(true);
      try {
        const query =
          '*[_type == "quote"] | order(coalesce(date, _createdAt) desc)[0..199]';
        const result = await sanityClient.fetch<QuoteShape[]>(query);
        if (cancelled) return;
        setQuotes(result);
        setFiltered(result);
        setCurrentQuote(result[0] ?? null);
        setLoading(false);
      } catch (error) {
        console.error("Sanity quote fetch failed, using static fallback", error);
        if (cancelled) return;
        setQuotes(fallbackQuotes);
        setFiltered(fallbackQuotes);
        setCurrentQuote(fallbackQuotes[0] ?? null);
        setLoading(false);
      }
    }

    loadQuotes();

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!selectedMood) {
      setFiltered(quotes);
      return;
    }
    setFiltered(quotes.filter((quote) => quote.mood === selectedMood));
  }, [quotes, selectedMood]);

  useEffect(() => {
    setCurrentQuote(filtered[0] ?? null);
  }, [filtered]);

  useEffect(() => {
    if (dailyQuote || !quotes.length) return;
    const todayKey = Number(
      new Date().toISOString().slice(0, 10).replace(/-/g, "")
    );
    const pick = quotes[todayKey % quotes.length];
    if (pick) {
      persistDaily(pick);
    }
  }, [dailyQuote, persistDaily, quotes]);

  function handleRandom() {
    if (filtered.length) {
      const randomQuote =
        filtered[Math.floor(Math.random() * filtered.length)];
      setCurrentQuote(randomQuote);
      return;
    }
    setCurrentQuote(
      fallbackQuotes[Math.floor(Math.random() * fallbackQuotes.length)] ?? null
    );
  }

  const moreQuotes = useMemo(() => {
    if (!currentQuote) return filtered.slice(0, 6);
    return filtered.filter((quote) => quote !== currentQuote).slice(0, 6);
  }, [currentQuote, filtered]);

  return (
    <main className="mx-auto max-w-4xl space-y-8 p-6">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm uppercase tracking-wide text-indigo-500">
            Quotes / Thoughts
          </p>
          <h1 className="text-3xl font-bold text-gray-900">Quotes Daily</h1>
          <p className="text-sm text-gray-600">
            Mood-based quotes powered by Sanity & curated fallbacks.
          </p>
        </div>
        <RandomQuoteButton onClick={handleRandom} />
      </header>

      <section className="flex flex-col gap-4">
        <MoodFilter
          moods={moodsList}
          selected={selectedMood}
          onSelect={setSelectedMood}
        />
      </section>

      <DailyQuote quote={dailyQuote} />

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-gray-900">Now playing</h2>
        {loading && !currentQuote ? (
          <p className="text-sm text-gray-500">Loading quotes…</p>
        ) : currentQuote ? (
          <QuoteCard quote={currentQuote} />
        ) : (
          <p className="text-sm text-gray-500">
            No quotes found. Add some in Sanity Studio.
          </p>
        )}
      </section>

      <section className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">More quotes</h3>
        {moreQuotes.length ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {moreQuotes.map((quote, index) => (
              <QuoteCard key={`${quote.text}-${index}`} quote={quote} />
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-500">
            Try another mood or use the Random button.
          </p>
        )}
      </section>
    </main>
  );
}
