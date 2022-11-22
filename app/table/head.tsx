import { WEBSITE_URL } from 'data/seo'

const title = 'Table | KTM Schedule'
const description = 'See KTM Schedule on table view.'
const pathname = '/table'

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
