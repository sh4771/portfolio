import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/next'
import ThemeToggle from '@/components/theme-toggle'
import './globals.css'

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
    <html lang="en">
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
