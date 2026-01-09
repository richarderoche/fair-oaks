import { PagesBySlugQueryResult } from '@/sanity.types'
import { studioUrl } from '@/sanity/lib/api'
import { createDataAttribute } from 'next-sanity'
import SectionGrid from './SectionGrid'

export interface PageBuilderProps {
  data: PagesBySlugQueryResult
}

export default function PageBuilder({ data }: PageBuilderProps) {
  const { pbSections } = data ?? {}
  const dataAttribute =
    data?._id && data?._type
      ? createDataAttribute({
          baseUrl: studioUrl,
          id: data._id,
          type: data._type,
        })
      : null

  return (
    <div className="mt-gut flex flex-col gap-gut">
      {pbSections?.map((section, i) => {
        const { _key, sectionSettings } = section
        const {
          enableSection = true,
          sectionId,
          marginTop,
          marginBottom,
        } = sectionSettings || {}

        if (!enableSection) {
          return null
        }

        return (
          <section
            id={`${sectionId ? sectionId : 'section-' + _key}`}
            key={_key}
            style={{
              marginTop: marginTop
                ? `calc(var(--gut) * ${marginTop})`
                : undefined,
              marginBottom: marginBottom
                ? `calc(var(--gut) * ${marginBottom})`
                : undefined,
            }}
            data-sanity={dataAttribute?.(['pbSections', { _key }])}
          >
            {section._type === 'pbGrid' && <SectionGrid section={section} />}
          </section>
        )
      })}
    </div>
  )
}
