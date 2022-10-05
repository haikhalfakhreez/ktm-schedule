import { default as HeadMeta } from 'next/head'
import { useRouter } from 'next/router'

export const WEBSITE_TITLE: string = `KTM Schedule`
export const WEBSITE_DESCRIPTION: string = `A simpler and better view of KTM Berhad Malaysia train schedule`
export const WEBSITE_URL: string = `https://ktm-schedule.vercel.app`
export const WEBSITE_IMAGE: string = `${WEBSITE_URL}/ktm-schedule.png`

type HeadProps = {
  title?: string
  description?: string
}

export function Head({ title, description }: HeadProps) {
  const router = useRouter()

  return (
    <HeadMeta>
      <title>{title ?? WEBSITE_TITLE}</title>
      <meta name="description" content={description ?? WEBSITE_DESCRIPTION} />
      <meta name="keywords" content="KTM, KTMB, KTM schedule, jadual KTM" />

      <meta property="og:type" content="website" />
      <meta property="og:url" content={WEBSITE_URL + router.pathname} />
      <meta property="og:title" content={title ?? WEBSITE_TITLE} />
      <meta property="og:description" content={description ?? WEBSITE_DESCRIPTION} />
      <meta property="og:image" content={WEBSITE_IMAGE} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@ekaliacid" />
      <meta name="twitter:creator" content="@ekaliacid" />

      <link rel="canonical" href={WEBSITE_URL + router.pathname} />
      <link rel="apple-touch-icon" sizes="180x180" href="/favicons/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicons/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicons/favicon-16x16.png" />
      <link rel="icon" href="/favicon.ico" />
    </HeadMeta>
  )
}
