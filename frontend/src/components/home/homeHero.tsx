import { PortableTextBlock } from 'next-sanity'
import { type Home } from '../../../sanity.types'
import { CustomPortableText } from '../shared/CustomPortableText'
import Divider from '../shared/Divider'
import RichTextWrap from '../shared/RichTextWrap'
import SiteGrid from '../shared/SiteGrid'
import SiteWidth from '../shared/SiteWidth'
import LogoWordmark from '../svg/LogoWordmark'

export default function HomeHero({ data }: { data: Home }) {
  const { homeIntroBig, homeIntroSmall, homeIntroBgImage } = data
  return (
    <div className="bg-blue text-cream pb-gut-300">
      <SiteWidth>
        <LogoWordmark className="pt-gut w-full h-auto origin-top scale-[1.18] lg:scale-[1.1] -translate-x-[1%] lg:-translate-x-[1.46%]" />
      </SiteWidth>

      <SiteWidth className="pt-gut-300">
        <SiteGrid>
          <div className="col-span-12 lg:col-span-8 lg:col-start-2">
            <RichTextWrap className="ts-h1">
              <CustomPortableText
                value={(homeIntroBig as PortableTextBlock[]) ?? []}
              />
            </RichTextWrap>
          </div>
        </SiteGrid>
      </SiteWidth>

      <SiteWidth className="pt-gut-200">
        <SiteGrid className="ts-p-lg">
          <div className="col-span-2 lg:col-span-2 lg:col-start-2 h-em flex items-center">
            <Divider className="bg-cream" />
          </div>
          <div className="col-span-10 lg:col-span-5">
            <RichTextWrap className="ts-p-lg">
              <CustomPortableText
                value={(homeIntroSmall as PortableTextBlock[]) ?? []}
              />
            </RichTextWrap>
          </div>
        </SiteGrid>
      </SiteWidth>
    </div>
  )
}
