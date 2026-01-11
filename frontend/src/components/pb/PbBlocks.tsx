import type { PbBlocks } from '../../../sanity.types'

import { type PortableTextBlock } from 'next-sanity'
import Button from '../shared/Button'
import { CustomPortableText } from '../shared/CustomPortableText'
import Divider from '../shared/Divider'
import ImageBasic from '../shared/ImageBasic'
import RichTextWrap from '../shared/RichTextWrap'
import SocialIcon from '../shared/SocialIcon'
import VideoEmbed from '../shared/VideoEmbed'

export interface PbBlocksProps {
  columnBlocks: PbBlocks
  trueSizes: string
}

export default function PbBlocks({ columnBlocks, trueSizes }: PbBlocksProps) {
  return (
    <div className="flex flex-col gap-gut">
      {columnBlocks.map((block) => {
        const { _key, _type } = block

        switch (_type) {
          // Divider Block
          case 'pbBlockDivider':
            return (
              <Divider
                key={_key}
                className={block.hideOnMobile ? 'hidden md:block' : 'block'}
              />
            )

          // Button Block
          case 'pbBlockButton':
            return (
              <div key={_key}>
                <Button text={block.title ?? ''} path={block.url ?? ''} />
              </div>
            )

          // Social Media Block
          case 'pbBlockSocial':
            return (
              <div key={_key}>
                {block.socialIcons && (
                  <div className="flex gap-gut-50">
                    {block.socialIcons.map((link, key) => {
                      return (
                        <a
                          key={key}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center text-20 transition-colors bg-red/10 hover:bg-blue/25 rounded-full p-12"
                          aria-label={link.icon}
                        >
                          <SocialIcon
                            name={link.icon ?? ''}
                            text={link.text ?? ''}
                          />
                        </a>
                      )
                    })}
                  </div>
                )}
              </div>
            )

          // Rich Text Block
          case 'pbBlockText':
            return (
              <RichTextWrap key={_key}>
                <CustomPortableText
                  value={(block.textContent as PortableTextBlock[]) ?? []}
                />
              </RichTextWrap>
            )

          // Image Block
          case 'pbBlockImage':
            return (
              <div key={_key}>
                <ImageBasic
                  image={block.image}
                  alt={block.alt}
                  sizes={trueSizes}
                  crop={block.imageCrop || 0}
                  priority={block.priority ?? false}
                />
              </div>
            )

          // Video Block
          case 'pbBlockVideoEmbed':
            return (
              <div
                key={_key}
                className="relative"
                style={{
                  paddingTop: ratioPadding(
                    block.videoAspectRatio &&
                      block.videoAspectRatio.width &&
                      block.videoAspectRatio.height
                      ? {
                          width: block.videoAspectRatio.width,
                          height: block.videoAspectRatio.height,
                        }
                      : { width: 16, height: 9 }
                  ),
                }}
              >
                <VideoEmbed url={block.videoEmbedUrl} />
              </div>
            )
          default:
            return null
        }
      })}
    </div>
  )
}

function ratioPadding({ width, height }: { width: number; height: number }) {
  return (height / width) * 100 + '%'
}
