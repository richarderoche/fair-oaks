import { defineQuery } from 'next-sanity'

// QUERIES
export const homePageQuery = defineQuery(`
  *[_type == "home"][0]{
    ...,
  }
`)

export const settingsQuery = defineQuery(`
  *[_type == "settings"][0]{
    ...,
    seo {
      ...,
      image
    }
  }
`)

export const scriptsQuery = defineQuery(`
  *[_type == "settings"][0]{
    "gtmId": googletagmanagerID,
    customScripts,
  }
`)
