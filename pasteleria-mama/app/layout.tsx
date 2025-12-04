import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Encina's Bakery | Tortas y postres artesanales",
  description:
    "Catálogo dulce y ligero para coordinar pedidos de Encina's Bakery. Pasteles hechos en casa con un toque acogedor y artesanal.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-gradient-to-b from-amber-50 via-rose-50 to-white text-slate-900 antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
