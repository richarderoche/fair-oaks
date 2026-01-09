import SiteWidth from '@/components/shared/SiteWidth'
import { type Settings } from '../../sanity.types'
import Monogram from './svg/monogram'

interface FooterProps {
  data: Settings
}
export default function Footer(props: FooterProps) {
  const { data } = props

  return (
    <footer className="bottom-0 mt-gut-4x">
      <SiteWidth className="flex items-center justify-center">
        <Monogram className="w-120 h-auto py-gut-half" />
      </SiteWidth>
      <div className="h-gut-6x gradient-blue-fade"></div>
    </footer>
  )
}
