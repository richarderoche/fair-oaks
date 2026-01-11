import {defineType} from 'sanity'

export default defineType({
  title: 'Content Blocks',
  name: 'pbBlocks',
  type: 'array',
  of: [
    {title: 'Text', type: 'pbBlockText'},
    {title: 'Image', type: 'pbBlockImage'},
    {title: 'Video', type: 'pbBlockVideoEmbed'},
    {title: 'Divider', type: 'pbBlockDivider'},
    {title: 'Email Link', type: 'pbBlockEmail'},
    {title: 'Button', type: 'pbBlockButton'},
    {title: 'Social Media', type: 'pbBlockSocial'},
  ],
})
