import React from "react";
import type { Metadata } from "next";
import "./globals.css";
import { FAVICON_URL } from "@/config/constants";

export const metadata: Metadata = {
  title: "Explorador de Películas - Descubre y Guarda tus Películas Favoritas",
  description:
    "Explora películas en tendencia, las mejor valoradas y crea tu lista de seguimiento personal. Busca por género, puntuación y año. Aplicación frontend potenciada por la API de The Movie Database.",
  keywords: [
    "películas",
    "tendencia",
    "mejor valoradas",
    "lista de seguimiento",
    "cine",
    "film",
    "descubrimiento",
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
