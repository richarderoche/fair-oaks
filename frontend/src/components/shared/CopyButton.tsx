'use client'
import { cn } from '@/lib/utils'
import { useState } from 'react'
import IconCopied from '../svg/IconCopied'
import IconCopy from '../svg/IconCopy'

export default function CopyButton({ email }: { email: string }) {
  const [isCopied, setIsCopied] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(email)
    setIsCopied(true)
    setTimeout(() => {
      setIsCopied(false)
    }, 2000)
  }

  const handleMouseEnter = () => {
    if (window.matchMedia('(hover: hover)').matches) {
      setIsHovered(true)
    }
  }

  const handleMouseLeave = () => {
    if (window.matchMedia('(hover: hover)').matches) {
      setIsHovered(false)
    }
  }

  return (
    <button
      className={cn(
        'size-40 mt-[.125em] transition-colors text-blue bg-yellow/0 hover:bg-yellow/25 rounded-full grid relative group',
        {
          'bg-yellow/25': isCopied,
        }
      )}
      aria-label="Copy email address"
      onClick={handleCopy}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <IconCopy
        className={cn('grid-stack transition-all', {
          'opacity-0 scale-0': isCopied,
        })}
      />
      <IconCopied
        className={cn('grid-stack transition-all opacity-0 scale-0', {
          'opacity-100 scale-100': isCopied,
        })}
      />
      <Tooltip show={!isCopied && isHovered}>Copy</Tooltip>
      <Tooltip show={isCopied}>Copied</Tooltip>
    </button>
  )
}

function Tooltip({
  children,
  show,
  className,
}: {
  children: React.ReactNode
  show: boolean
  className?: string
}) {
  return (
    <span
      className={cn(
        'ts-tooltip absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full pt-[.25em] transition-all',
        className,
        {
          'opacity-0 scale-0': !show,
          'opacity-100 scale-100': show,
        }
      )}
    >
      {children}
    </span>
  )
}
