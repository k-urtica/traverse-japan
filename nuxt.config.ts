import { defineNuxtConfig } from '@nuxt/bridge';

const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';
const DESCRIPTION =
  '踏破した都道府県を日本地図で共有できるWebサービスです。自分がどれだけ日本を踏破したか、今まで行ったことがある都道府県をみんなに共有しよう！';

export default defineNuxtConfig({
  ssr: true,

  head: {
    titleTemplate: '%s | 踏破した都道府県を日本地図で共有できるサービス',
    title: '日本踏破図🗾',
    htmlAttrs: {
      lang: 'ja',
      prefix: 'og: http://ogp.me/ns#',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'format-detection', content: 'telephone=no' },
      {
        hid: 'description',
        name: 'description',
        content: DESCRIPTION,
      },

      // OGP
      {
        hid: 'og:url',
        property: 'og:url',
        content: BASE_URL,
      },
      {
        hid: 'og:title',
        property: 'og:title',
        content: '日本踏破図🗾 | 踏破した都道府県を日本地図で共有できるサービス',
      },
      { hid: 'og:site_name', property: 'og:site_name', content: '日本踏破図🗾' },
      {
        hid: 'og:description',
        property: 'og:description',
        content: DESCRIPTION,
      },
      {
        hid: 'og:image',
        property: 'og:image',
        content: BASE_URL + '/ogp.png',
      },
      {
        hid: 'og:image:width',
        property: 'og:image:width',
        content: '1200',
      },
      {
        hid: 'og:image:height',
        property: 'og:image:height',
        content: '630',
      },

      { hid: 'og:type', property: 'og:type', content: 'website' },
      // Twitter
      {
        hid: 'twitter:card',
        name: 'twitter:card',
        content: 'summary_large_image',
      },
      {
        hid: 'twitter:site',
        name: 'twitter:site',
        content: '@k_urtica',
      },
      {
        hid: 'twitter:creator',
        name: 'twitter:creator',
        content: '@k_urtica',
      },

      {
        hid: 'note:card',
        property: 'note:card',
        content: 'summary_large_image',
      },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.png' }],
  },

  css: ['@/assets/css/global.scss'],

  plugins: [],

  components: true,

  buildModules: [
    [
      '@nuxtjs/vuetify',
      {
        customVariables: ['@/assets/css/variables.scss'],
        optionsPath: '@/plugins/vuetify.options.ts',
        defaultAssets: false,
      },
    ],
  ],

  modules: [['@nuxtjs/sitemap', { hostname: BASE_URL, gzip: true }]],

  publicRuntimeConfig: {
    baseURL: BASE_URL,
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    extractCSS: true,
  },
});
