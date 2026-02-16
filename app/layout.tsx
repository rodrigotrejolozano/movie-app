import React from "react";
import type { Metadata } from "next";
import "./globals.css";
import { FAVICON_URL } from "@/config/constants";

export const metadata: Metadata = {
  title: "Explorador de Películas",
  description: "Explora películas.",
  keywords: ["películas", "cine", "film", "descubrimiento"],
  creator: "Movie Explorer by RoroDev",
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
