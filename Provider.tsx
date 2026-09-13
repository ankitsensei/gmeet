"use client"
import Script from "next/script"
import { SessionProvider, type Session } from "next-auth/react"
import { ThemeProvider } from "@/components/theme-provider"
import {ToastContainer} from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

const themeScript = `
  (function() {
    try {
      var theme = localStorage.getItem('theme') || 'light';
      var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (theme === 'system') theme = prefersDark ? 'dark' : 'light';
      document.documentElement.classList.add(theme);
    } catch (e) {}
  })();
`

export function Providers({ children, session }: { children: React.ReactNode; session: Session | null }) {
  return (
    <SessionProvider session={session}>
      <Script id="theme-init" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: themeScript }} />
      <ThemeProvider attribute="class">
        {children}
      </ThemeProvider>
      <ToastContainer position="top-right" autoClose={3000} />
    </SessionProvider>
  )
}
