import { NextResponse } from "next/server";

const TYPEFIT_URL = "https://type.fit/api/quotes";

export async function GET() {
  try {
    const response = await fetch(TYPEFIT_URL, { cache: "no-store" });

    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to fetch from TypeFit" },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("TypeFit API error", error);
    return NextResponse.json(
      { error: "TypeFit API error" },
      { status: 500 }
    );
  }
}

