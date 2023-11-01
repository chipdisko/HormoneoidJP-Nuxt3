// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    //'@vueuse/nuxt',
    '@nuxt/image',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/google-fonts',
    '@pinia/nuxt',
    'nuxt-icon',
    'nuxt-microcms-module',
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
    }
  },
  tailwindcss: {
    exposeConfig: true,
  },
  app: {
    head: {
      title: 'Hormoneoid JP',
      meta: [{ name: 'description', content: 'You are listening to Hormoneoid JP. Enjoy!!' }],
      link: [
        { rel: 'icon', href: '/favicon.ico' },
      ],
    },
  },
  microCMS: {
    serviceDomain: process.env.NUXT_PRIVATE_MICROCMS_SERVICE_DOMAIN || 'hormoneoidjp',
    apiKey: process.env.NUXT_PRIVATE_MICROCMS_API_KEY || 'test',
    target: 'all',
  },
  css: ["~/assets/styles/app.sass"],
  devtools: { enabled: true },
  srcDir: 'src/',
})
