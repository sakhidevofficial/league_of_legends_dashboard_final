import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Sidebar } from '@/components/sidebar'
import { ClientOnly } from '@/components/client-only'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'LoL Dashboard - Gamespace',
  description: 'League of Legends statistics dashboard powered by Grid API',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        <div className="flex h-screen bg-gray-900">
          <ClientOnly fallback={<div className="w-64 bg-gray-900"></div>}>
            <Sidebar />
          </ClientOnly>
          <main className="flex-1 overflow-auto">
            {children}
          </main>
        </div>
      </body>
    </html>
  )
}