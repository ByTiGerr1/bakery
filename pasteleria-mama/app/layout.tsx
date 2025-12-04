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
  title: "Pastelería Mamá | Tortas y postres artesanales",
  description:
    "Catálogo ligero de tortas artesanales con pedidos coordinados por correo. Sin pasarela de pago complicada, solo dulzura.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-gradient-to-b from-rose-50 via-white to-white text-slate-900 antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
