import HomeFooter from '@/components/home/homeFooter'
import SiteWidth from '@/components/shared/SiteWidth'
import { client } from '@/sanity/client'
import { homePageQuery } from '@/sanity/queries'
import { type Home } from '../../sanity.types'
const options = { next: { revalidate: 30 } }

export default async function Home() {
  const data = await client.fetch<Home>(homePageQuery, {}, options)
  const { title } = data

  return (
    <>
      <SiteWidth className="min-h-screen">
        <div className="flex flex-col gap-20">
          <div>{title}</div>
          <div className="ts-h1">Typestyle H1</div>
          <div className="ts-h2">Typestyle H2</div>
          <div className="ts-h3">Typestyle H3</div>
          <div className="ts-p-lg">Typestyle P LG</div>
          <div className="ts-p-md">Typestyle P MD</div>
        </div>
      </SiteWidth>
      <HomeFooter data={data} />
    </>
  )
}
