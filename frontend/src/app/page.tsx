import { client } from '@/sanity/client'
import { homePageQuery } from '@/sanity/queries'
import { type Home } from '../../sanity.types'
const options = { next: { revalidate: 30 } }

export default async function Home() {
  const data = await client.fetch<Home>(homePageQuery, {}, options)
  const { title } = data
  return <div>{title}</div>
}
