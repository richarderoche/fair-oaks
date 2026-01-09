import { cn } from '@/lib/utils'

interface SiteGridProps {
  children: React.ReactNode
  className?: string
  yGaps?: boolean
}

export default function SiteGrid({
  children,
  className,
  yGaps = false,
}: SiteGridProps) {
  return (
    <div
      className={cn(
        'grid grid-cols-12',
        yGaps ? 'gap-gut' : 'gap-x-gut',
        className,
      )}
    >
      {children}
    </div>
  )
}
