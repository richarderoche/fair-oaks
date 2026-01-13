import SiteWidth from '@/components/shared/SiteWidth'
import Monogram from './svg/monogram'

export default function Footer() {
  return (
    <footer className="bottom-0 mt-gut-300">
      <SiteWidth className="flex items-center justify-center">
        <Monogram className="w-120 h-auto py-gut-50" />
      </SiteWidth>
      <div className="h-gut-500 gradient-blue-fade"></div>
    </footer>
  )
}
