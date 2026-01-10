import { type PbSections as PbSectionsType } from '../../../sanity.types'
import SectionGrid from './SectionGrid'

export default function PageBuilder({
  pbSections,
}: {
  pbSections: PbSectionsType
}) {
  return (
    <div className="mt-gut flex flex-col gap-gut">
      {pbSections?.map((section) => {
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
          >
            {section._type === 'pbGrid' && <SectionGrid section={section} />}
          </section>
        )
      })}
    </div>
  )
}
