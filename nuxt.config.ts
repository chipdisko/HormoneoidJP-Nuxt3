// https://nuxt.com/docs/api/configuration/nuxt-config
const TITLE = 'Hormoneoid JP | a dj mix archive on AAJA CH1'; 
const DESCRIPTION = 'You are listening to Hormoneoid JP. Enjoy!!';

export default defineNuxtConfig({
  routeRules: {
    '/': { prerender: true },
    '/onair/**': { prerender: true },
  },
  site: {
    url: 'https://hormoneoid.w1dr.ink',
    name: TITLE,
    description: DESCRIPTION,
    defaultLocale: 'en',
  },
  sitemap: {
    sources: [
      '/api/__sitemap__/onairs',
    ]
  },
  modules: [//'@vueuse/nuxt',
  '@nuxt/image', '@nuxtjs/tailwindcss', '@nuxtjs/google-fonts', '@pinia/nuxt', 'nuxt-icon', 'nuxt-gtag', '@nuxtjs/seo'],
  googleFonts: {
    families: {
      'Dosis': {
        wght: [200, 300, 400, 500, 600, 700, 800],
      },
      'Courier Prime': true,
      'Sometype Mono': {
        wght: [400, 700],
        ital: [400, 700],
      },
      'Playpen Sans': {
        wght: [200,400,700]
      }
    }
  },
  runtimeConfig: {
    microcmsApiKey: process.env.NUXT_PRIVATE_MICROCMS_API_KEY || 'test',
    microcmsServiceDomain: process.env.NUXT_PRIVATE_MICROCMS_SERVICE_DOMAIN || 'hormoneoidjp',
  },
  tailwindcss: {
    exposeConfig: true,
  },
  site: {
    url: 'https://hormoneoid.w1dr.ink',
    name: TITLE,
    description: DESCRIPTION,
    defaultLocale: 'en',
  },
  app: {
    head: {
      htmlAttrs: {
        lang: 'en'
      },
      title: TITLE,
      meta: [
        { name: 'description', content: DESCRIPTION },
        { name: 'og:title', content: TITLE },
        { name: 'og:description', content: DESCRIPTION },
        { name: 'google-site-verification', content: "rnSiI5cIPYNQeywBxSf5AIUFp1TtmMeyDZwxBe-vpek" },
        { name: 'robots', content: 'index, follow' },
      ],
      link: [
        { rel: 'icon', href: '/favicon.ico' },
      ],
    },
    pageTransition: { name: 'page', mode: 'out-in' }
  },
  css: ["~/assets/styles/app.sass"],
  gtag: {
    id:'G-MRJ4NS13FV'
  },
  devtools: { enabled: true },
})