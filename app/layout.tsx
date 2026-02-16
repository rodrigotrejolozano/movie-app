import React from "react";
import type { Metadata } from "next";
import "./globals.css";
import { FAVICON_URL } from "@/config/constants";

export const metadata: Metadata = {
  title: "Movie Explorer - Discover & Save Your Favorite Movies",
  description:
    "Explore trending movies, top-rated films, and build your personal watchlist. Search by genre, rating, and year. Frontend-only app powered by The Movie Database API.",
  keywords: [
    "movies",
    "trending",
    "top rated",
    "watchlist",
    "cinema",
    "film",
    "discovery",
  ],
  creator: "Movie Explorer",
  icons: {
    icon: FAVICON_URL,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={`font-sans antialiased`}>{children}</body>
    </html>
  );
}
