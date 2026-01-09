'use client'

import { useEffect, useState } from 'react'

import { useStore } from '@/lib/store'
import { cn } from '@/lib/utils'

interface PageWrapperProps {
  children: React.ReactNode
  className?: string
}

export default function PageWrapper({ children, className }: PageWrapperProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const { enablePageTransition, setEnablePageTransition } = useStore()

  useEffect(() => {
    // Fade in only on client-side navigation
    // Helps with pagespeed scores
    if (enablePageTransition) {
      !isLoaded && setIsLoaded(true)
    } else {
      setIsLoaded(true)
      setEnablePageTransition(true)
    }
  }, [enablePageTransition, isLoaded, setEnablePageTransition])

  return (
    <div
      className={cn(
        enablePageTransition && 'transition-opacity duration-500',
        !enablePageTransition || isLoaded ? 'opacity-100' : 'opacity-0',
        className,
      )}
    >
      {children}
    </div>
  )
}
