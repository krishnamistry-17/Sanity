import { NextResponse } from "next/server";

const QUOTABLE_URL = "https://api.quotable.io/random";

export async function GET() {
  try {
    const response = await fetch(QUOTABLE_URL, {
      headers: { Accept: "application/json" },
      cache: "no-store",
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to fetch from Quotable" },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Random quote API error", error);
    return NextResponse.json(
      { error: "Random quote API error" },
      { status: 500 }
    );
  }
}

