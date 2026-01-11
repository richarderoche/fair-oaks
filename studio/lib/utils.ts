import type {PbGridSettings} from '../../frontend/sanity.types'

//
// SCHEMA HELPERS

export function getGridSettings(gridSettings: PbGridSettings) {
  const {size, start} = gridSettings
  if (!start || !size) {
    return ''
  }
  const startT = start.tablet === 0 ? start.mobile : start.tablet
  const sizeT = size.tablet === 0 ? size.mobile : size.tablet
  const startD = start.desktop === 0 ? startT : start.desktop
  const sizeD = size.desktop === 0 ? sizeT : size.desktop

  const mobile = `(Mob) ${gridLine(start.mobile, size.mobile)}`
  const tablet = `(Tab) ${gridLine(startT, sizeT)}`
  const desktop = `(Desk) ${gridLine(startD, sizeD)}`

  return `${mobile} / ${tablet} / ${desktop}`
}

function gridLine(start: number, size: number) {
  if (start > 1) {
    const end = start + size - 1
    return `Cols ${start}-${end}`
  }
  return `${size}col`
}

export const getTypeTitles = (types: string[]) => {
  const typeNames = types.map((type) => {
    switch (type) {
      case 'pbBlockDivider':
        return 'Divider'
      case 'pbBlockButton':
        return 'Button'
      case 'pbBlockSocial':
        return 'Social Media'
      case 'pbBlockEmail':
        return 'Email Link'
      case 'pbBlockText':
        return 'Text'
      case 'pbBlockImage':
        return 'Image'
      case 'pbBlockVideo':
        return 'Video'
      default:
        return null
    }
  })

  return typeNames.join(', ')
}
