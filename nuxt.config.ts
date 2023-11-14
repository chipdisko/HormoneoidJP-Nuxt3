// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  routeRules: {
    '/': { prerender: true },
    '/onair/**': { prerender: true },
  },
  modules: [
    //'@vueuse/nuxt',
    '@nuxt/image',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/google-fonts',
    '@pinia/nuxt',
    'nuxt-icon',
    'nuxt-gtag',
  ],
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
  app: {
    head: {
      htmlAttrs: {
        lang: 'en'
      },
      title: 'Hormoneoid JP -- from Osaka to London and the world.',
      meta: [{ name: 'description', content: 'You are listening to Hormoneoid JP. Enjoy!!' }],
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
