import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'DealDish',
  description: 'Best deals in your area',
  // generator: 'v0.dev',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  )
}