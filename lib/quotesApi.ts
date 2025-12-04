const RANDOM_ENDPOINT = "/api/quotes/random";
const TYPEFIT_ENDPOINT = "/api/quotes/typefit";

export async function fetchRandomQuotable() {
  const response = await fetch(RANDOM_ENDPOINT);
  if (!response.ok) {
    throw new Error("Quotable fetch failed");
  }
  return response.json();
}

export async function fetchQuotesTypeFit() {
  const response = await fetch(TYPEFIT_ENDPOINT);
  if (!response.ok) {
    throw new Error("TypeFit fetch failed");
  }
  return response.json();
}

