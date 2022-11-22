import { WEBSITE_URL } from 'data/seo'

const title = 'KTM Schedule'
const description = 'A simpler and better view of KTM Berhad Malaysia train schedule'
const pathname = '/'

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
