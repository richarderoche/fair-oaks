'use client'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/all'
import { useLayoutEffect, useRef } from 'react'
import LogoWordmark from './svg/LogoWordmark'

export default function Header() {
  const headerRef = useRef<HTMLElement>(null)

  useLayoutEffect(() => {
    if (!headerRef.current) return

    gsap.set(headerRef.current, {
      position: 'absolute',
      y: '0%',
    })

    const headerHeight = headerRef.current.offsetHeight
    const triggerPoint = headerHeight * 0.55

    const scrollTrigger = ScrollTrigger.create({
      trigger: headerRef.current,
      start: `top -${triggerPoint}px`,
      end: `top -${triggerPoint + 1}px`,
      markers: false,
      onEnter: () => {
        gsap.set(headerRef.current, {
          position: 'fixed',
          y: '-55%',
        })
      },
      onLeaveBack: () => {
        gsap.set(headerRef.current, {
          position: 'absolute',
          y: '0%',
        })
      },
    })

    return () => {
      scrollTrigger.kill()
    }
  }, [])

  return (
    <header
      ref={headerRef}
      className="text-cream absolute top-0 left-0 w-full overflow-hidden z-99999 pointer-events-none"
    >
      <LogoWordmark className="text-cream pt-gut h-auto w-[107%] -translate-x-[4.815%]" />
    </header>
  )
}
