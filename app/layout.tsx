import type { Metadata } from 'next'
import { Manrope } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import ThemeToggle from '@/components/theme-toggle'
import './globals.css'

const manrope = Manrope({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-manrope',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Violet Hyun — Product Designer',
  description:
    'Product designer exploring how technology, art, and storytelling can shape human behavior and social systems.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={manrope.variable}>
      <body className="font-sans antialiased">
        <div
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: '<!-- this site is agent-readable { "about": "/llms.txt" } -->',
          }}
        />
        {children}
        <ThemeToggle />
        <Analytics />
      </body>
    </html>
  )
}
