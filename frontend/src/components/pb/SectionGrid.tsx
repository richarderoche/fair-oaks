'use client'

import { cn, getAlignClasses, getGridClasses, getTrueSizes } from '@/lib/utils'
import { type PbGrid, type PbSections } from '../../../sanity.types'

import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useRef } from 'react'
import { AccordionSection } from '../shared/AccordionSection'
import SiteGrid from '../shared/SiteGrid'
import SiteWidth from '../shared/SiteWidth'
import PbBlocks from './PbBlocks'
gsap.registerPlugin(useGSAP)

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
      {columns.map((col) => (
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
  const {
    _key,
    columnSettings,
    pbBlocks,
    yAlignment,
    revealEffect = 'none',
  } = col

  const colRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      if (!colRef.current || revealEffect === 'none') return

      gsap.set('.reveal-wrapper', {
        opacity: 0,
        x: revealEffect === 'fade-right' ? -50 : 0,
        y: revealEffect === 'fade-up' ? 50 : 0,
      })

      gsap.to('.reveal-wrapper', {
        opacity: 1,
        x: 0,
        y: 0,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: colRef.current,
          start: 'top 85%',
          markers: false,
        },
      })
    },
    { scope: colRef, dependencies: [revealEffect] }
  )

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
  const revealClass = `reveal-${revealEffect}`

  const colBlocks = <PbBlocks columnBlocks={pbBlocks} trueSizes={trueSizes} />

  return (
    <div ref={colRef} className={cn(colClasses, yClasses)}>
      <div className={cn('reveal-wrapper', revealClass)}>
        {accordionMode && pbBlocks.length > 0 && (
          <AccordionSection accordionTitle={accordionTitle} innerId={innerId}>
            {colBlocks}
          </AccordionSection>
        )}

        {!accordionMode && pbBlocks.length > 0 && colBlocks}
      </div>
    </div>
  )
}
