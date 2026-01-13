'use client'
import gsap from 'gsap'
import { PortableTextBlock } from 'next-sanity'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { type Home } from '../../../sanity.types'
import { CustomPortableText } from '../shared/CustomPortableText'
import Divider from '../shared/Divider'
import ImageBasic from '../shared/ImageBasic'
import RichTextWrap from '../shared/RichTextWrap'
import SiteGrid from '../shared/SiteGrid'
import SiteWidth from '../shared/SiteWidth'

export default function HomeHero({ data }: { data: Home }) {
  const {
    homeIntroBig,
    homeIntroSmall,
    homeBgImageLandscape,
    homeBgImagePortrait,
    alt,
  } = data

  const [{ isLandscape, mounted }, setState] = useState({
    isLandscape: true,
    mounted: false,
  })
  const heroTextLargeRef = useRef<HTMLDivElement>(null)
  const heroTextWrapRef = useRef<HTMLDivElement>(null)
  const heroTextParentRef = useRef<HTMLDivElement>(null)
  const heroTextSmallRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    // Set initial value synchronously before paint to prevent hydration mismatch and update state before the browser paint.
    setTimeout(() => {
      setState({
        isLandscape: window.innerWidth > window.innerHeight,
        mounted: true,
      })
    }, 0)
  }, [])

  useEffect(() => {
    const handleResize = () => {
      setState((prev) => ({
        ...prev,
        isLandscape: window.innerWidth > window.innerHeight,
      }))
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useLayoutEffect(() => {
    if (
      !heroTextLargeRef.current ||
      !heroTextWrapRef.current ||
      !heroTextParentRef.current
    )
      return

    // Only animate on lg+ screens and when user doesn't prefer reduced motion
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches
    const isLargeScreen = window.matchMedia('(min-width: 64rem)').matches
    const enableAnimation = isLargeScreen && !prefersReducedMotion
    if (!enableAnimation) {
      gsap.set(heroTextWrapRef.current, { opacity: 1 })
      return
    }

    // Force a reflow to ensure layout is updated
    void heroTextLargeRef.current.offsetHeight

    // Get the current position of hero-text-large relative to its parent
    const heroOffsetLeft = heroTextLargeRef.current.offsetLeft
    const parentOffsetLeft = heroTextParentRef.current.offsetLeft
    const initialX = heroOffsetLeft - parentOffsetLeft

    // Also get the bounding rects for the trigger calculation
    const parentRect = heroTextWrapRef.current.getBoundingClientRect()
    const initialDistanceFromTop = parentRect.top

    // Set initial position (aligned to left of parent) and show element
    gsap.set(heroTextLargeRef.current, {
      x: -initialX,
    })
    gsap.set(heroTextSmallRef.current, {
      x: initialX,
      y: '50%',
    })
    gsap.set(heroTextWrapRef.current, { opacity: 1 })

    // Create animation that starts at scroll 0 and completes when element reaches top of viewport
    // We calculate the scroll range: from scroll 0 to when element reaches top (scroll = elementOffsetTop)
    const animation = gsap.to(heroTextLargeRef.current, {
      x: 0,
      ease: 'none',
      scrollTrigger: {
        trigger: heroTextWrapRef.current,
        start: `top ${initialDistanceFromTop}`,
        end: 'top top',
        scrub: true,
        markers: false,
      },
    })
    const animationSmall = gsap.to(heroTextSmallRef.current, {
      x: 0,
      y: 0,
      ease: 'none',
      scrollTrigger: {
        trigger: heroTextWrapRef.current,
        start: `top ${initialDistanceFromTop}`,
        end: 'top top',
        scrub: true,
        markers: false,
      },
    })

    return () => {
      animation.kill()
      animationSmall.kill()
    }
  }, [mounted])

  const backgroundImage = isLandscape
    ? homeBgImageLandscape
    : homeBgImagePortrait

  useEffect(() => {
    if (!mounted || !backgroundImage || !imageRef.current) return

    // Fade in the image when it loads
    const imageElement = imageRef.current.querySelector('img')
    if (imageElement) {
      if (imageElement.complete) {
        // Image already loaded
        gsap.to(imageRef.current, {
          opacity: 0.6,
          duration: 1,
          ease: 'power2.out',
        })
      } else {
        // Wait for image to load
        imageElement.addEventListener('load', () => {
          gsap.to(imageRef.current, {
            opacity: 0.6,
            duration: 1,
            ease: 'power2.out',
          })
        })
      }
    }
  }, [mounted, backgroundImage])

  return (
    <>
      <div className="bg-blue text-cream pt-header pb-gut-600 w-full overflow-x-hidden isolate min-h-dvw portrait:min-h-[160dvw] landscape:min-h-[65dvw] relative">
        <div className="absolute inset-0 -z-10 overflow-hidden">
          {mounted && backgroundImage && (
            <div ref={imageRef} className="absolute inset-0 opacity-0">
              <ImageBasic
                image={backgroundImage}
                alt={alt}
                sizes="100vw"
                priority={true}
                fitTo="cover"
              />
            </div>
          )}
          <div className="absolute inset-0 bg-blue mix-blend-screen"></div>
          <div className="absolute inset-0 bg-blue mix-blend-color"></div>
        </div>

        <SiteWidth
          ref={heroTextWrapRef}
          className="pt-[22vw] relative z-10 opacity-0"
        >
          <SiteGrid ref={heroTextParentRef}>
            <div
              ref={heroTextLargeRef}
              className="hero-text-large col-span-12 sm:col-span-10 md:col-span-8 md:col-start-2"
            >
              <RichTextWrap className="ts-h1 max-w-[45ch]">
                <CustomPortableText
                  value={(homeIntroBig as PortableTextBlock[]) ?? []}
                />
              </RichTextWrap>
            </div>
          </SiteGrid>

          <SiteGrid ref={heroTextSmallRef} className="ts-p-lg pt-gut-250">
            <div className="hero-text-small col-span-2 sm:col-span-1 md:col-span-2 md:col-start-2 h-em flex items-center">
              <Divider className="bg-cream" />
            </div>
            <div className="col-span-10 sm:col-span-8 md:col-span-5">
              <RichTextWrap className="ts-p-lg max-w-[45ch]">
                <CustomPortableText
                  value={(homeIntroSmall as PortableTextBlock[]) ?? []}
                />
              </RichTextWrap>
            </div>
          </SiteGrid>
        </SiteWidth>

        <div className="h-1/2 gradient-blue-fade absolute bottom-0 left-0 w-full"></div>
      </div>
      <div className="h-gut-400 gradient-blue-fade-in-out rotate-180 sticky -top-1 z-999"></div>
    </>
  )
}
