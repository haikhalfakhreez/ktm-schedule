import '../styles/globals.css'
import SectionLayout from '../components/SectionLayout'
import Navbar from '../components/navbar'
import Footer from '../components/Footer'
import { TableProvider } from 'context/table'
import { WEBSITE_IMAGE } from 'data/seo'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width" />
        <meta name="keywords" content="KTM, KTMB, KTM schedule, jadual KTM" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={WEBSITE_IMAGE} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@ekaliacid" />
        <meta name="twitter:creator" content="@ekaliacid" />

        <link rel="apple-touch-icon" sizes="180x180" href="/favicons/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicons/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicons/favicon-16x16.png" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="antialiased text-secondary bg-white">
        <div className="min-h-screen flex flex-col">
          <TableProvider>
            <Navbar />
            <SectionLayout as="main" className="py-8 md:py-10 grow w-full relative">
              {children}
            </SectionLayout>
            <Footer />
          </TableProvider>
        </div>
      </body>
    </html>
  )
}
