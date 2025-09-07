import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@mui/material/styles"
import CssBaseline from "@mui/material/CssBaseline"
import { theme } from "@/lib/theme"
import "./globals.css"
import { ToastContainer } from "react-toastify"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Distribuidora de Bebidas",
  description: "Sistema de gestión para distribuidora de bebidas",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {children}
          <ToastContainer position="top-right" autoClose={3000} />
        </ThemeProvider>
      </body>
    </html>
  )
}
