import { cn } from '@/lib/utils'

interface SiteWidthProps {
  children: React.ReactNode
  className?: string
}

export default function SiteWidth({ children, className }: SiteWidthProps) {
  return (
    <div className={cn('px-gut max-w-[1800px] mx-auto', className)}>
      {children}
    </div>
  )
}
