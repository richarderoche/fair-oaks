import { cn } from '@/lib/utils'
import { forwardRef } from 'react'

interface SiteWidthProps {
  children: React.ReactNode
  className?: string
}

const SiteWidth = forwardRef<HTMLDivElement, SiteWidthProps>(
  ({ children, className }, ref) => {
    return (
      <div ref={ref} className={cn('px-gut max-w-[1600px] mx-auto', className)}>
        {children}
      </div>
    )
  }
)

SiteWidth.displayName = 'SiteWidth'

export default SiteWidth
