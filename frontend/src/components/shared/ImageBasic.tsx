import { getImageDimensions } from '@sanity/asset-utils'
import Image from 'next/image'

import { cn } from '@/lib/utils'
import { urlForImage } from '@/sanity/lib/utils'

interface ImageBasicProps {
  alt?: string
  className?: string
  crop?: number
  fitTo?: 'width' | 'height'
  image: any
  priority?: boolean
  sizes?: string
}

export default function ImageBasic({
  alt = '',
  className = '',
  crop = 0,
  fitTo = 'width',
  image,
  priority = false,
  sizes = '100vw',
}: ImageBasicProps) {
  if (!image?.asset?._ref) return null
  const { width, height } = getImageDimensions(image)
  const { newW, newH } = getNewDimensions(crop, width, height)
  // .auto('format').fit('max') included in urlForImage
  const imageUrl = urlForImage(image)
    ?.width(newW || width)
    .height(newH || height)
    .url()

  return (
    <>
      {imageUrl && (
        <Image
          src={imageUrl}
          className={cn(
            fitTo === 'width' ? 'w-full h-auto' : 'h-full w-auto',
            className
          )}
          alt={alt}
          width={newW || width}
          height={newH || height}
          sizes={sizes}
          priority={priority}
        />
      )}
    </>
  )
}

function getNewDimensions(crop, width, height) {
  const oRatio = width / height
  const shortSide = width < height ? width : height
  // No crop
  if (crop === 0 || crop === oRatio) return { newW: null, newH: null }
  // Square
  if (crop === 1) return { newW: shortSide, newH: shortSide }
  // Other
  if (oRatio < crop)
    return {
      newW: width,
      newH: Math.round(width / crop),
    }
  if (oRatio > crop)
    return {
      newW: Math.round(height * crop),
      newH: height,
    }
  // Fallback
  return { newW: null, newH: null }
}
