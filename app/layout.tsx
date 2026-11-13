import type { Metadata } from 'next'
import { Manrope } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { AutoTheme } from '@/components/auto-theme'
import { VioletGPTLauncher } from '@/components/violet-gpt/launcher'
import { JumpToResults } from '@/components/jump-to-results'
import { Suspense } from 'react'
import './globals.css'

const manrope = Manrope({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-manrope',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://violethyun.com'),
  title: 'Violet Hyun — Product Designer',
  description:
    'Product designer exploring how technology, art, and storytelling can shape human behavior and social systems.',
  openGraph: {
    type: 'website',
    url: 'https://violethyun.com',
    siteName: 'Violet Hyun',
    title: 'Violet Hyun, Product Designer',
    description: 'I make complex information more approachable for everyone.',
  },
  twitter: { card: 'summary_large_image' },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={manrope.variable} suppressHydrationWarning>
      <head>
        {/* Inside a project panel (an iframe on this site), hide the site chrome before first paint. */}
        <script dangerouslySetInnerHTML={{ __html: "try{if(window.self!==window.top)document.documentElement.classList.add('embed')}catch(e){document.documentElement.classList.add('embed')}" }} />
      </head>
      <body className="font-sans antialiased">
        <div
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: '<!-- this site is agent-readable { "about": "/llms.txt" } -->',
          }}
        />
        {children}
        <AutoTheme />
        <VioletGPTLauncher />
        <Suspense fallback={null}>
          <JumpToResults />
        </Suspense>
        <Analytics />
      </body>
    </html>
  )
}
