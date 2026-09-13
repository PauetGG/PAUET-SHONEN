import type { Metadata } from "next";
import { Oswald, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const menu = Oswald({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-menu",
});

const xifra = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-xifra",
});

export const metadata: Metadata = {
  title: "Missions",
  description: "Registre personal de missions",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ca" className={`${menu.variable} ${xifra.variable}`}>
      <body className="min-h-screen font-xifra antialiased">{children}</body>
    </html>
  );
}
