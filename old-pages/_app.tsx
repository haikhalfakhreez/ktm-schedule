import '../styles/globals.css'
import { Head } from 'app/head'
import type { AppProps } from 'next/app'
import SectionLayout from 'components/SectionLayout'
import Navbar from 'components/navbar'
import Footer from 'components/Footer'
import { TableProvider } from 'context/table'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head />

      <div className="min-h-screen flex flex-col">
        <TableProvider>
          <Navbar />
          <SectionLayout as="main" className="py-8 md:py-10 grow w-full relative">
            <Component {...pageProps} />
          </SectionLayout>
          <Footer />
        </TableProvider>
      </div>
    </>
  )
}
