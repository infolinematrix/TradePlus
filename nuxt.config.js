import VuetifyLoaderPlugin from 'vuetify-loader/lib/plugin'
//import colors from 'vuetify/es5/util/colors'
import pkg from './package'

require('dotenv').config()


export default {
  mode: 'universal',
  srcDir: 'client/',

  env: {
    baseUrl: process.env.API_URL || 'http://localhost:8000/api',
    appName: process.env.APP_NAME || 'MY APPLICATION',
    appLocale: process.env.APP_LOCALE || 'en'
  },
  /*
   ** Headers of the page
   */
  head: {
    title: pkg.name,
    meta: [{
        charset: 'utf-8'
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1'
      },
      {
        hid: 'description',
        name: 'description',
        content: pkg.description
      }
    ],
    link: [{
        rel: 'icon',
        type: 'image/x-icon',
        href: '/favicon.ico'
      },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons'
      }
    ]
  },

  /*
   ** Customize the progress-bar color
*/
  loading: {
    color: 'red',
    height: '2px'
  },

  //loading: '~/components/loading.vue',



  /*
   ** Global CSS
   */
  css: [
    '~/assets/style/app.styl'
  ],

  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    '@/plugins/vuetify',
    '~plugins/helpers',
    //{ src: '~/plugins/helpers.js', mode: 'client' },
    { src: '~/plugins/swiper.js', ssr: false },
    { src: '~/plugins/paypal.js', ssr: false },
    '~plugins/vform',
    '~plugins/axios',
    '~plugins/moment'
  ],

  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    '@nuxtjs/dotenv',
    'nuxt-validate',
  ],
  /*
   ** Axios module configuration
   */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
  },

  /*
   ** Build configuration
   */

  build: {
    transpile: ['vuetify/lib'],
    plugins: [new VuetifyLoaderPlugin()],
    loaders: {
      stylus: {
        import: ['~assets/style/variables.styl']
      }
    },


    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {}
  }
}
