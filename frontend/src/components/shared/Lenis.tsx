'use client'

import gsap from 'gsap'
import type { LenisRef } from 'lenis/react'
import { ReactLenis } from 'lenis/react'
import { useEffect, useRef } from 'react'

export function Lenis() {
  const lenisRef = useRef<LenisRef>(null)

  useEffect(() => {
    function update(time: number) {
      lenisRef.current?.lenis?.raf(time * 1000)
    }

    gsap.ticker.add(update)

    return () => gsap.ticker.remove(update)
  }, [])

  return (
    <ReactLenis
      ref={lenisRef}
      root={true}
      options={{
        lerp: 0.125,
        autoRaf: false,
        anchors: true,
        prevent: (node: Element | null) =>
          node?.nodeName === 'VERCEL-LIVE-FEEDBACK',
      }}
    />
  )
}
