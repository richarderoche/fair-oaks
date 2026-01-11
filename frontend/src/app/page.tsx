import HomeFooter from '@/components/home/homeFooter'
import HomeHero from '@/components/home/homeHero'
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
      <HomeHero data={data} />
      {pbSections && pbSections.length > 0 && (
        <div className="mt-gut-400">
          <PageBuilder pbSections={pbSections} />
        </div>
      )}
      <HomeFooter data={data} />
    </>
  )
}
