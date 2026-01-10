import { cn } from '@/lib/utils'
import { forwardRef } from 'react'

interface SiteGridProps {
  children: React.ReactNode
  className?: string
  yGaps?: boolean
}

const SiteGrid = forwardRef<HTMLDivElement, SiteGridProps>(
  ({ children, className, yGaps = false }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'grid grid-cols-12',
          yGaps ? 'gap-gut' : 'gap-x-gut',
          className
        )}
      >
        {children}
      </div>
    )
  }
)

SiteGrid.displayName = 'SiteGrid'

export default SiteGrid
