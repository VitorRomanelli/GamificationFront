import colors from 'vuetify/es5/util/colors'
require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` })

export default {
  ssr: false,

  target: 'static',

  head: {
    titleTemplate: '%s - Gamificação',
    title: 'Login',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [
      { rel: 'icon', type: 'image/png', href: '/controle-de-video-game.png' },
    ],
  },

  router: {
    middleware: ['auth'],
    prefetchLinks: false,
  },

  css: ['~/assets/styles/global.scss'],

  plugins: [
    '~/plugins/storage',
    '~/plugins/helper',
    '~/plugins/axios',
    '~/plugins/vue-the-mask.js',
  ],

  components: true,

  buildModules: [
    '@nuxtjs/eslint-module',
    '@nuxtjs/vuetify',
    '@nuxtjs/moment',
    [
      '@nuxtjs/dotenv',
      { filename: `.env.${process.env.NODE_ENV}`, systemvars: true },
    ],
  ],

  modules: ['@nuxtjs/axios', 'vue-toastification/nuxt'],

  toast: {
    transition: 'Vue-Toastification__fade',
  },

  axios: {},

  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: false,
      options: {
        customProperties: true,
      },
      themes: {
        light: {
          black: '#373737',
          black2: '#232224',
          primary: '#43546f',
          background: '#F0F0F0',
          accent: '#ffc727',
          secondary: '#9592E3',
          tertiary: '#C24967',
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: '#67C23A',
        },
        dark: {
          black: '#373737',
          black2: '#232224',
          primary: '#43546f',
          background: '#F0F0F0',
          accent: '#ffc727',
          secondary: '#9592E3',
          tertiary: '#C24967',
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
        },
      },
    },
  },

  build: {},
}
