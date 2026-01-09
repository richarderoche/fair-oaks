'use client'

import { cn, getAlignClasses, getGridClasses, getTrueSizes } from '@/lib/utils'
import { PbGrid, PbSections } from '@/sanity.types'

import { AccordionSection } from '../shared/AccordionSection'
import SiteGrid from '../shared/SiteGrid'
import SiteWidth from '../shared/SiteWidth'
import PbBlocks from './PbBlocks'

export interface GridSecProps {
  section: PbSections[number]
}

export default function SectionGrid({ section }: GridSecProps) {
  const { _key, outerSettings, columns } = section
  // Skip if no columns yet
  if (!columns || columns.length === 0) {
    return null
  }
  // Prep attributes
  const { accordionMode = false, accordionTitle = 'More' } = outerSettings || {}
  const outerClasses = outerSettings ? getGridClasses(outerSettings) : ''
  const innerId = `row-${_key}`

  const Columns = (
    <SiteGrid yGaps={true}>
      {columns.map((col, i) => (
        <GridCol key={col._key} col={col} outerSettings={outerSettings} />
      ))}
    </SiteGrid>
  )

  return (
    <SiteWidth>
      <SiteGrid yGaps={true}>
        <div className={outerClasses}>
          {accordionMode && (
            <AccordionSection
              accordionTitle={accordionTitle}
              innerId={innerId}
              size="big"
            >
              {Columns}
            </AccordionSection>
          )}

          {!accordionMode && Columns}
        </div>
      </SiteGrid>
    </SiteWidth>
  )
}

export interface GridColProps {
  col: NonNullable<PbGrid['columns']>[number]
  outerSettings: PbGrid['outerSettings']
}

export function GridCol({ col, outerSettings }: GridColProps) {
  const { _key, columnSettings, pbBlocks, yAlignment } = col
  // Skip if no blocks yet
  if (!pbBlocks || pbBlocks.length === 0) {
    return null
  }
  // Prep attributes
  const { accordionMode = false, accordionTitle = 'More' } =
    columnSettings || {}
  const colClasses = columnSettings ? getGridClasses(columnSettings) : ''
  const yClasses = yAlignment ? getAlignClasses(yAlignment, 'y') : ''
  const trueSizes =
    outerSettings && columnSettings
      ? getTrueSizes(outerSettings, columnSettings)
      : ''
  const innerId = `col-${_key}`

  const colBlocks = <PbBlocks columnBlocks={pbBlocks} trueSizes={trueSizes} />

  return (
    <div className={cn(colClasses, yClasses)}>
      {accordionMode && pbBlocks.length > 0 && (
        <AccordionSection accordionTitle={accordionTitle} innerId={innerId}>
          {colBlocks}
        </AccordionSection>
      )}

      {!accordionMode && pbBlocks.length > 0 && colBlocks}
    </div>
  )
}
