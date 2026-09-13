"use client"
import dynamic from "next/dynamic"
import { SessionProvider, type Session } from "next-auth/react"
import {ToastContainer} from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

const ThemeProvider = dynamic(
  () => import("next-themes").then((mod) => mod.ThemeProvider),
  { ssr: false }
)

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