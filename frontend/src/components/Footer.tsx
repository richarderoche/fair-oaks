import SiteWidth from '@/components/shared/SiteWidth'
import { type Settings } from '../../sanity.types'

interface FooterProps {
  data: Settings
}
export default function Footer(props: FooterProps) {
  const { data } = props

  return (
    <footer className="bottom-0 bg-accent py-gut mt-gut">
      <SiteWidth className="flex flex-col lg:flex-row lg:justify-between items-center gap-gut">
        Footer
      </SiteWidth>
    </footer>
  )
}
