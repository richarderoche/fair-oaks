import SiteWidth from './SiteWidth'

interface HeaderProps {
  title?: string
}
export function PageHeader(props: HeaderProps) {
  const { title = 'No Title Set' } = props

  return (
    <SiteWidth>
      <h1 className="ts-h1 mt-em">{title}</h1>
    </SiteWidth>
  )
}
