import Link from 'next/link'

import { cn } from '@/lib/utils'

interface ButtonProps {
  text: string
  path: string
  style?: 'main' | 'alt' | 'secondary'
  className?: string
}

export default function Button(props: ButtonProps) {
  const { text, path, style = 'main', className } = props
  if (!text || !path) return null
  const isExternal = path.startsWith('http')

  return (
    <Link
      href={path}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noopener noreferrer' : undefined}
      className={cn(
        'rounded-full inline-flex items-center transition-colors',
        style === 'main'
          ? 'bg-red/10 hover:bg-blue/25'
          : style === 'alt'
            ? 'border-black bg-black text-accent hover:border-accent hover:bg-accent hover:text-black'
            : 'hover:bg-accent',
        className
      )}
    >
      <span className="leading-none whitespace-nowrap ts-h3 py-[.6em] px-[1.25em] center-caps">
        {text}
      </span>
    </Link>
  )
}
