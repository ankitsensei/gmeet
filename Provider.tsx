"use client"
import { SessionProvider, type Session } from "next-auth/react"
import {ThemeProvider} from "next-themes"
import {ToastContainer} from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

export function Providers({ children, session }: { children: React.ReactNode; session: Session | null }) {
  return (
    <SessionProvider session={session}>
      <ThemeProvider attribute="class">
        {children}
      </ThemeProvider>
      <ToastContainer position="top-right" autoClose={3000} />
    </SessionProvider>
  )
}