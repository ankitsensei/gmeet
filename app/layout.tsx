import type { Metadata } from "next";
import { Inter, Geist_Mono } from "next/font/google";

import "./globals.css";
import { Providers } from "@/Provider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "gmeet",
  description: "Video meetings made simple",
};

const themeInitScript = `
  (function() {
    try {
      var theme = localStorage.getItem('theme') || 'light';
      var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (theme === 'system') theme = prefersDark ? 'dark' : 'light';
      document.documentElement.classList.add(theme);
    } catch (e) {}
  })();
`

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${geistMono.variable} h-full antialiased`}
      style={{ scrollbarGutter: "stable" }}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="min-h-full flex flex-col">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
