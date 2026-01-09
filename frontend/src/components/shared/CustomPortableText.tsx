import { getFileAsset } from '@sanity/asset-utils'
import {
  PortableText,
  type PortableTextBlock,
  type PortableTextComponents,
} from 'next-sanity'

export function CustomPortableText({ value }: { value: PortableTextBlock[] }) {
  const components: PortableTextComponents = {
    block: {
      normal: ({ children }) => {
        return <p>{children}</p>
      },
      h2: ({ children }) => {
        return <h2 className="ts-h2 text-balance">{children}</h2>
      },
      h3: ({ children }) => {
        return <h3 className="ts-h3 text-pretty">{children}</h3>
      },
    },
    marks: {
      link: ({ children, value }) => {
        return (
          <a
            className="inline-link not-prose"
            href={value?.href}
            rel="noreferrer noopener"
            target="_blank"
          >
            {children}
          </a>
        )
      },
      fileLink: ({ children, value }) => {
        const url = getFileAsset(value.file.asset, {
          projectId: 'mzorz60q',
          dataset: 'production',
        }).url
        return (
          <a
            className="inline-link not-prose"
            href={`${url}?dl=`}
            rel="noreferrer noopener"
            target="_blank"
          >
            {children}
          </a>
        )
      },
    },
    listItem: ({ children }) => {
      return <li>{children}</li>
    },
  }

  return <PortableText components={components} value={value} />
}
