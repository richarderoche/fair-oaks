'use client'
import { cn } from '@/lib/utils'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/all'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import LogoWordmark from './svg/LogoWordmark'

export default function Header() {
  const headerRef = useRef<HTMLElement>(null)
  const [isLoaded, setIsLoaded] = useState(false)

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

  useEffect(() => {
    if (isLoaded) return
    setTimeout(() => {
      setIsLoaded(true)
    }, 250)
  }, [isLoaded])

  return (
    <header
      ref={headerRef}
      className="text-cream absolute top-0 left-0 w-full overflow-hidden z-99999 pointer-events-none"
    >
      <LogoWordmark
        className={cn(
          'pt-gut h-auto w-[107%] -translate-x-[4.815%] wipe-mask',
          isLoaded && 'show'
        )}
      />
    </header>
  )
}
