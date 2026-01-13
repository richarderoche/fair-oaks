import Footer from '@/components/Footer'
import Header from '@/components/Header'
import ConsoleLog from '@/components/scripts/ConsoleLog'
import CustomScripts from '@/components/scripts/CustomScripts'
import { GSAP } from '@/components/shared/GSAP'
import { Lenis } from '@/components/shared/Lenis'
import { client } from '@/sanity/client'
import { settingsQuery } from '@/sanity/queries'
import { urlForOpenGraphImage } from '@/sanity/utils'
import { GoogleTagManager } from '@next/third-parties/google'
import type { Metadata, Viewport } from 'next'
import { Instrument_Sans, Instrument_Serif, Sono } from 'next/font/google'
import { Seo, type Settings } from '../../sanity.types'
import './globals.css'

const options = { next: { revalidate: 30 } }

export async function generateMetadata(): Promise<Metadata> {
  const settings = await client.fetch<Settings>(settingsQuery, {}, options)
  const seo = settings?.seo || ({} as Seo)

  const ogImage = urlForOpenGraphImage(seo?.image)
  const noIndex = seo?.hideFromSearchEngines ?? false
  return {
    title: seo.seoTitle || 'Personal website',
    description: seo?.description ? seo.description : undefined,
    openGraph: {
      images: ogImage ? [ogImage] : [],
    },
    formatDetection: {
      telephone: false,
      address: false,
      email: false,
    },
    twitter: {
      card: 'summary_large_image',
    },
    robots: {
      index: !noIndex,
      follow: !noIndex,
      nocache: noIndex,
      googleBot: {
        index: !noIndex,
        follow: !noIndex,
        noimageindex: noIndex,
      },
    },
    authors: [
      {
        name: 'Infinite Productivity',
        url: 'https://infinite-productivity.com',
      },
    ],
  }
}

export const viewport: Viewport = {
  themeColor: '#0068D8',
}

const fontSans = Instrument_Sans({
  variable: '--instrument-sans',
  subsets: ['latin'],
})

const fontSerif = Instrument_Serif({
  variable: '--instrument-serif',
  subsets: ['latin'],
  weight: ['400'],
  style: ['normal', 'italic'],
})

const fontMono = Sono({
  variable: '--sono',
  subsets: ['latin'],
  weight: ['500'],
  style: ['normal'],
})

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const settings = await client.fetch<Settings>(settingsQuery, {}, options)
  const { googletagmanagerID, customScripts } = settings || {}
  const enableProdScripts =
    process.env.NEXT_PUBLIC_PRODUCTION_SCRIPTS === 'true'

  return (
    <html
      lang="en"
      className={`${fontSans.variable} ${fontSerif.variable} ${fontMono.variable}`}
    >
      <body>
        <Lenis />
        <GSAP />
        <div className="flex min-h-screen flex-col justify-start bg-cream text-red">
          <Header />
          <main className="grow" id="main-content">
            {children}
          </main>
          <Footer />
        </div>
        {enableProdScripts && googletagmanagerID && (
          <GoogleTagManager gtmId={googletagmanagerID} />
        )}
        {customScripts && (
          <CustomScripts
            customScripts={customScripts}
            enableProdScripts={enableProdScripts}
          />
        )}
        {enableProdScripts && <ConsoleLog />}
      </body>
    </html>
  )
}
