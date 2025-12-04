import "./globals.css";
import type { ReactNode } from "react";

export const metadata = {
  title: "Quotes Daily",
  description: "Daily quotes powered by Sanity + public APIs",
};

export default function RootLayout(props: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50 text-gray-900 antialiased">
        {props.children}
      </body>
    </html>
  );
}
