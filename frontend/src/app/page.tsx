import HomeFooter from '@/components/home/homeFooter'
import PageBuilder from '@/components/pb/PageBuilder'
import { client } from '@/sanity/client'
import { homePageQuery } from '@/sanity/queries'
import { type Home } from '../../sanity.types'
const options = { next: { revalidate: 30 } }

export default async function Home() {
  const data = await client.fetch<Home>(homePageQuery, {}, options)
  const { pbSections } = data

  return (
    <>
      {pbSections && pbSections.length > 0 && (
        <PageBuilder pbSections={pbSections} />
      )}
      <HomeFooter data={data} />
    </>
  )
}
