import { createImageUrlBuilder } from '@sanity/image-url'
import type { Image } from 'sanity'

//
// Image Helpers

const imageBuilder = createImageUrlBuilder({
  projectId: 'mzorz60q',
  dataset: 'production',
})

export const urlForImage = (source: Image | null | undefined) => {
  // Ensure that source image contains a valid reference
  if (!source?.asset?._ref) {
    return undefined
  }

  return imageBuilder?.image(source).auto('format').fit('max')
}

export function urlForOpenGraphImage(image: Image | null | undefined) {
  return urlForImage(image)?.width(1200).height(627).fit('crop').url()
}
