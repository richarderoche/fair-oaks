import pbBlockButton from './objects/pbBlockButton'
import pbBlockDivider from './objects/pbBlockDivider'
import pbBlockEmail from './objects/pbBlockEmail'
import pbBlockImage from './objects/pbBlockImage'
import pbBlocks from './objects/pbBlocks'
import pbBlockSocial from './objects/pbBlockSocial'
import pbBlockText from './objects/pbBlockText'
import pbBlockVideoEmbed from './objects/pbBlockVideoEmbed'
import pbGrid from './objects/pbGrid'
import pbGridSettings from './objects/pbGridSettings'
import pbSections from './objects/pbSections'
import pbSectionSettings from './objects/pbSectionSettings'
import ptBasic from './objects/ptBasic'
import ptSlim from './objects/ptSlim'
import seo from './objects/seo'
import socialLink from './objects/socialLink'
import home from './singletons/home'
import settings from './singletons/settings'

export const singletonSchemaTypes = [home, settings]

export const schemaTypes = [
  // Singletons
  home,
  settings,
  // Objects
  pbBlocks,
  pbBlockImage,
  pbBlockDivider,
  pbBlockEmail,
  pbBlockButton,
  pbBlockSocial,
  pbBlockText,
  pbBlockVideoEmbed,
  pbGrid,
  pbGridSettings,
  pbSections,
  pbSectionSettings,
  ptBasic,
  ptSlim,
  seo,
  socialLink,
]

export const singletons = []
