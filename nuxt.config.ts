// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  runtimeConfig:{
    public:{
      baseUrl:"http://localhost:8000/api"
    }
  },
  app:{
    head:{
      htmlAttrs:{
        dir:'rtl',
        lang:"fa"
      },
      charset:"UTF-8",
      viewport:"width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0",
      meta:[
        {name:"keywords",content:"html,css,js"},
        {name:"description",content:"html,cs,js"}
      ],
      bodyAttrs:{
        class:"test"
      }
    }
  },
  modules:['@nuxtjs/tailwindcss','@formkit/nuxt','@pinia/nuxt','@pinia-plugin-persistedstate/nuxt','@nuxt/image'],
  css:['~/assets/style/style.css','~/assets/tailwind/tailwind.css','@fortawesome/fontawesome-svg-core/styles.css']
})
