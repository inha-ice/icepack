import dotenv from 'dotenv'

dotenv.config()

const {
  NAME, AUTHOR, DESCRIPTION,
  PRIMARY_COLOR, SECONDARY_COLOR,
  WEB_URL, API_URL
} = process.env

const SCOPE = '/icepack/'

export default {
  css: [
    '~/assets/normalize.css',
    '~/assets/font.css'
  ],

  head: {
    meta: [
      { 'http-equiv': 'X-UA-Compatible', content: 'IE=edge' },
      { name: 'keywords', content: 'Inha University,ICE,Student Association,IcePack,인하대학교,정보통신공학과,학생회,복지물품,과자치비,서비스' }
    ],
    link: [
      { rel: 'canonical', href: WEB_URL },
      { rel: 'preconnect', href: 'https://fonts.gstatic.com/' },
      { rel: 'preconnect', href: 'https://www.google-analytics.com/' }
    ]
  },

  loading: {
    color: SECONDARY_COLOR
  },

  plugins: [],

  buildModules: [
    '@nuxtjs/dotenv'
    // '@nuxtjs/eslint-module',
    // '@nuxtjs/stylelint-module'
  ],

  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/google-gtag',
    '@nuxtjs/pwa'
  ],

  axios: {
    baseURL: API_URL
  },

  'google-gtag': { id: 'UA-155870748-1' },

  manifest: {
    name: NAME,
    short_name: NAME,
    description: DESCRIPTION,
    start_url: `${WEB_URL}?utm_source=a2hs`,
    display: 'standalone',
    background_color: PRIMARY_COLOR,
    theme_color: PRIMARY_COLOR,
    lang: 'ko',
    scope: WEB_URL
  },

  // See https://pwa.nuxtjs.org/modules/meta.html
  meta: {
    // charset: 'utf-8',
    // viewport: 'width=device-width, initial-scale=1',
    // mobileApp: true,
    mobileAppIOS: true,
    appleStatusBarStyle: 'black-translucent',
    // favicon: true,
    name: NAME,
    author: AUTHOR,
    description: DESCRIPTION,
    // theme_color: PRIMARY_COLOR,
    lang: 'ko',
    // ogType: 'website',
    // ogSiteName: NAME,
    // ogTitle: NAME,
    // ogDescription: DESCRIPTION,
    ogHost: WEB_URL,
    ogImage: 'social_preview.png'
    // ogUrl: CANONICAL_URL,
  },

  mode: 'spa',

  router: { base: SCOPE },

  build: {
    extractCSS: true
  }
}
