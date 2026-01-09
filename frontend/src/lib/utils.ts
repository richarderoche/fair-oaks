import { type ClassValue, clsx } from 'clsx'
import type { PbGridSettings } from '../../sanity.types'

// ClassName helper
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs)
}

//
// PAGE BUILDER HELPERS
export interface ScreensNum {
  mobile: number
  tablet: number
  desktop: number
}

export interface ScreensStr {
  mobile?: string
  tablet?: string
  desktop?: string
}

export function getGridClasses(gridSettings: PbGridSettings) {
  const { size, start } = gridSettings
  if (!size || !start) {
    return ''
  }
  const sizeM = size.mobile || 12
  const sizeT = size.tablet === 0 || size.tablet === sizeM ? null : size.tablet
  const sizeNow = sizeT || sizeM
  const sizeD =
    size.desktop === 0 || size.desktop === sizeNow ? null : size.desktop

  const startM = start.mobile && start.mobile > 1 ? start.mobile : null
  const startT =
    start.tablet === start.mobile
      ? null
      : start.tablet === 0
        ? 'auto'
        : start.tablet
  const startD =
    start.desktop === start.tablet
      ? null
      : start.desktop === 0
        ? 'auto'
        : start.desktop

  const mobile = `col-span-${sizeM}${startM ? ' col-start-' + startM : ''}`
  const tablet = `${sizeT ? ' md:col-span-' + sizeT : ''}${startT ? ' md:col-start-' + startT : ''}`
  const desktop = `${sizeD ? ' lg:col-span-' + sizeD : ''}${startD ? ' lg:col-start-' + startD : ''}`

  return `${mobile}${tablet}${desktop}`
}

export function getAlignClasses(set: ScreensStr, axis: string) {
  if (set === undefined || set === null) return ''
  const fallback = axis === 'x' ? 'justify-self-start' : 'self-start'
  const { mobile = fallback, tablet = 'inherit', desktop = 'inherit' } = set
  const m = mobile === fallback ? null : mobile
  const t =
    tablet === 'inherit' ? null : tablet === mobile ? null : ' md:' + tablet
  const d =
    desktop === 'inherit' ? null : desktop === tablet ? null : ' lg:' + desktop
  return `${m ? m : ''}${t ? t : ''}${d ? d : ''}`
}

export function getTrueSizes(outer: PbGridSettings, inner: PbGridSettings) {
  if (!outer.size || !inner.size) {
    return ''
  }
  const oSizeM = outer.size.mobile || 12
  const iSizeM = inner.size.mobile || 12
  const oSizeT = outer.size.tablet === 0 ? oSizeM : outer.size.tablet || 12
  const iSizeT = inner.size.tablet === 0 ? iSizeM : inner.size.tablet || 12
  const oSizeD = outer.size.desktop === 0 ? oSizeT : outer.size.desktop || 12
  const iSizeD = inner.size.desktop === 0 ? iSizeT : inner.size.desktop || 12
  const m = (oSizeM / 12) * (iSizeM / 12) * 100
  const t = (oSizeT / 12) * (iSizeT / 12) * 100
  const d = (oSizeD / 12) * (iSizeD / 12) * 100

  const mVw = m + 'vw'
  const tVw = t === m ? null : '(min-width: 768px) ' + t + 'vw, '
  const dVw =
    d === t ? null : d === m ? null : '(min-width: 1024px) ' + d + 'vw, '

  return `${dVw ? dVw : ''}${tVw ? tVw : ''}${mVw}`
}
