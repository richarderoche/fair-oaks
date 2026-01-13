'use client'
import SiteGrid from '@/components/shared/SiteGrid'
import SiteWidth from '@/components/shared/SiteWidth'
import { cn } from '@/lib/utils'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/all'
import { forwardRef, useLayoutEffect, useRef } from 'react'
import { type Home } from '../../../sanity.types'
import Divider from '../shared/Divider'

export default function HomeFooter({ data }: { data: Home }) {
  const { footerQuote1, footerQuote2, footerQuote3 } = data
  const gridRef = useRef<HTMLDivElement>(null)
  const quote1Ref = useRef<HTMLDivElement>(null)
  const quote2Ref = useRef<HTMLDivElement>(null)
  const quote3Ref = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    if (!gridRef.current) return

    const quotes = [
      quote1Ref.current,
      quote2Ref.current,
      quote3Ref.current,
    ].filter(Boolean) as HTMLElement[]

    if (quotes.length === 0) return

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    // Set initial state
    gsap.set(quotes, {
      opacity: 0,
      y: prefersReducedMotion ? 0 : 50,
    })

    // Create animation
    const animation = gsap.to(quotes, {
      opacity: 1,
      y: 0,
      duration: 1.25,
      ease: 'power2.out',
      stagger: 0.2,
    })

    // Add ScrollTrigger
    const trigger = ScrollTrigger.create({
      trigger: gridRef.current,
      start: 'bottom bottom-=50',
      animation: animation,
      markers: false,
      onEnter: () => {
        animation.eventCallback('onComplete', () => {
          gridRef.current?.classList.add(
            prefersReducedMotion ? 'not-stormy' : 'stormy'
          )
        })
      },
    })

    return () => {
      trigger.kill()
      animation.kill()
    }
  }, [footerQuote1, footerQuote2, footerQuote3])

  return (
    <SiteWidth className="mt-gut-600 ts-h2 text-blue">
      <SiteGrid ref={gridRef}>
        {footerQuote1 && (
          <FooterQuote
            ref={quote1Ref}
            text={footerQuote1}
            className="md:col-start-3 mt-gut-150"
          />
        )}
        {footerQuote2 && (
          <FooterQuote
            ref={quote2Ref}
            text={footerQuote2}
            className="md:col-start-6"
          />
        )}
        {footerQuote3 && (
          <FooterQuote
            ref={quote3Ref}
            text={footerQuote3}
            className="md:col-start-9 mt-gut-150"
          />
        )}
      </SiteGrid>
    </SiteWidth>
  )
}

const FooterQuote = forwardRef<
  HTMLDivElement,
  {
    text: string
    className: string
  }
>(({ text, className }, ref) => {
  // split text into array on backslashes
  const textArray = text.split('\\')
  return (
    <div
      ref={ref}
      className={cn('stormy-wave col-span-4 md:col-span-2', className)}
    >
      <Divider className="bg-yellow mb-gut-75 md:mb-gut-150" />
      {textArray.map((text, index) => (
        <p key={index}>{text}</p>
      ))}
    </div>
  )
})

FooterQuote.displayName = 'FooterQuote'
