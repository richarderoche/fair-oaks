import { cn } from '@/lib/utils'

export default function Divider({ className }: { className?: string }) {
  return <div className={cn('h-1 bg-yellow w-full', className)} />
}
