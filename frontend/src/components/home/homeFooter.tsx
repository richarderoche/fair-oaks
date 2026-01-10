import SiteGrid from '@/components/shared/SiteGrid'
import SiteWidth from '@/components/shared/SiteWidth'
import { cn } from '@/lib/utils'
import { type Home } from '../../../sanity.types'

export default function HomeFooter({ data }: { data: Home }) {
  const { footerQuote1, footerQuote2, footerQuote3 } = data
  return (
    <SiteWidth className="mt-gut-600 ts-h2 text-blue">
      <SiteGrid>
        {footerQuote1 && (
          <FooterQuote
            text={footerQuote1}
            className="md:col-start-3 mt-gut-150"
          />
        )}
        {footerQuote2 && (
          <FooterQuote text={footerQuote2} className="md:col-start-6" />
        )}
        {footerQuote3 && (
          <FooterQuote
            text={footerQuote3}
            className="md:col-start-9 mt-gut-150"
          />
        )}
      </SiteGrid>
    </SiteWidth>
  )
}

const FooterQuote = ({
  text,
  className,
}: {
  text: string
  className: string
}) => {
  // split text into array on backslashes
  const textArray = text.split('\\')
  return (
    <div
      className={cn(
        'col-span-4 md:col-span-2 border-t border-yellow pt-gut-75 md:pt-gut-150',
        className
      )}
    >
      {textArray.map((text, index) => (
        <p key={index}>{text}</p>
      ))}
    </div>
  )
}
