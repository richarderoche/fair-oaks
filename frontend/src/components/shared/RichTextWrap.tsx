import { cn } from '@/lib/utils'

export default function RichTextWrap({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className={cn('prose prose-siteColor', className)}>{children}</div>
  )
}
