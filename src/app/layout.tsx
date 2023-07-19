import "./globals.css"
import "@rainbow-me/rainbowkit/styles.css"

import Footer from "../components/Footer"
import Header from "../components/Header"
import { Inter } from "next/font/google"
import { Providers } from "./providers"
import type { Metadata } from "next"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Truth App",
  description: "Truth Truth Truth",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <div className="gradient leading-relaxed tracking-wide flex flex-col">
            <Header />
            {children}
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  )
}
