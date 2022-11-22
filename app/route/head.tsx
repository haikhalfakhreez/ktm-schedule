import { WEBSITE_URL } from 'data/seo'

const title = 'Route | KTM Schedule'
const description = 'Customise and see KTM Scehdule based on your destination.'
const pathname = '/route'

export default function Head() {
  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:url" content={WEBSITE_URL + pathname} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <link rel="canonical" href={WEBSITE_URL + pathname} />
    </>
  )
}
