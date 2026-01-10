import type { PbBlocks } from '../../../sanity.types'

import { type PortableTextBlock } from 'next-sanity'
import { CustomPortableText } from '../shared/CustomPortableText'
import ImageBasic from '../shared/ImageBasic'
import RichTextWrap from '../shared/RichTextWrap'
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
