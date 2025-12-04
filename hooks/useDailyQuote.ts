'use client';

import { useCallback, useEffect, useState } from "react";

export type QuoteShape = {
  text?: string;
  content?: string;
  author?: string;
  mood?: string;
  q?: string;
  a?: string;
};

const STORAGE_KEY = "quotes_daily";

export function useDailyQuote<T extends QuoteShape = QuoteShape>() {
  const [dailyQuote, setDailyQuote] = useState<T | null>(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      const today = new Date().toISOString().slice(0, 10);

      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed?.date === today && parsed?.quote) {
          setDailyQuote(parsed.quote);
        }
      }
    } catch (error) {
      console.warn("daily quote read error", error);
    }
  }, []);

  const persistDaily = useCallback((quote: T) => {
    try {
      const today = new Date().toISOString().slice(0, 10);
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ date: today, quote })
      );
      setDailyQuote(quote);
    } catch (error) {
      console.warn("daily quote write error", error);
    }
  }, []);

  return { dailyQuote, persistDaily };
}

