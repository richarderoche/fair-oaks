import { cn } from '@/lib/utils'

export default function Divider({ className }: { className?: string }) {
  return (
    <div className={cn('h-1 w-full', className ? className : 'bg-yellow')} />
  )
}
