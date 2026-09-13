import type { Metadata, Viewport } from "next";
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
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    title: "Missions",
    statusBarStyle: "black-translucent",
  },
  icons: {
    icon: "/icona-192.png",
    apple: "/icona-180.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#0E1220",
  viewportFit: "cover",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
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
