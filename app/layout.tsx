import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { siteConfig } from '@/lib/site-config'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { SectionLayout } from '@/components/section-layout'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    'KTM Komuter Timetable',
    'Keretapi Tanah Melayu Berhad',
    'KTMB',
    'Komuter',
    'KTM Komuter',
    'KTM Schedule',
    'KTM Timetable',
    'Jadual KTM',
  ],
  authors: siteConfig.authors,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`antialiased bg-white min-h-screen flex flex-col ${inter.className}`}>
        <Navbar />
        <SectionLayout as="main" className="py-8 md:py-10 grow w-full relative">
          {children}
        </SectionLayout>
        <Footer />
      </body>
    </html>
  )
}
