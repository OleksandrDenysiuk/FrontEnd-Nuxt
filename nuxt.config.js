import colors from 'vuetify/es5/util/colors'
import axios from 'axios'
export default {
  mode: 'universal',
  /*
   ** Headers of the page
   */
  head: {
    // titleTemplate: '%s - ' + process.env.npm_package_name,
    // title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
      ,
      // 12873892173892
      { property:'fb:app_id', content: '232332534303433' },
      // { hid: 'og:title', name: 'og:title', content: process.env.title }
    ],
    link: [{ rel: 'icon', type: 'image/png', href: '/logo.png' }],

    script: [
      {
        src: 'https://cdnjs.cloudflare.com/ajax/libs/crypto-js/3.1.9-1/crypto-js.min.js'
      },
      {
        src: 'https://apis.google.com/js/api:client.js'
      }
    ]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: [
    '~/assets/style/style.css',
    '~/assets/style/bootstrap.css'
  ],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    '~/plugins/vuelidate.js',
    '~/plugins/VueQrcode.js',
    '~/plugins/vue-youtube-embed.js',
    '~/plugins/i18n.js',
    '~/plugins/SocialSharing.js',
    '~/plugins/jsonld',
    '~/plugins/googlebutton',
    { src: '~/plugins/geolocation', ssr: false }
  ],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    '@nuxtjs/vuetify',
    '@nuxt/typescript-build'
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    '@nuxtjs/auth',
    ['@nuxtjs/google-tag-manager', { id: 'GTM-MZ3ZXQV' }],
    '@nuxtjs/device',
    '@nuxtjs/robots',
    'nuxt-seo',
    '@nuxtjs/component-cache',
    ,
    '@nuxtjs/sitemap',
    'vue-geolocation-api/nuxt',
     // api key google map
    ['nuxt-gmaps', {
      key: 'AIzaSyBBb0pba3vw7x1JXTM_umY012djw0mMpSM',
      //you can use libraries: ['paces']
    }],
    '@nuxtjs/component-cache',
    ['@nuxtjs/component-cache', { maxAge: 1000 * 60 * 60 }]
  ],
  robots: [
    {
      UserAgent: 'Googlebot',
      Disallow: '/users',
    },
    {
      UserAgent: 'Bingbot',
      Disallow: '/admin',
    },
  ],
  geolocation: {

  },
  seo: {
    name: 'Yalla Dealz ,Restaurant,Cafe,Review,Offers,Discount 70% Off',
    title: 'Yalla Dealz ,Save Money Get Funny',
    templateTitle: '%name% - %title%',
    description: 'Offers from 70% off,Deals on Restaurant,Foods,Cafe,Entertainment,Gorcery'
  },
  sitemap: {
    // not sure about the hostname yet.
    hostname: 'https://www.yalladealz.com',
    generate: true,
    routes: [
      async () => {
        await axios
          .get(
            process.env.baseUrl +
              '/api/deals?key=&skip=0&limit=3&rate=0&minPrice=4&maxPrice=10000&sortBy=low_to_high&categoryId=000000000000000000000000'
          )
          .then(res => {
            return res.data.deals.map(e => `/deal/${e._id}`)
          })
      },
      '/profile/0',
      '/profile/1',
      '/profile/2',
      '/profile/3',
      '/profile/4',
      '/profile/5',
      async () => {
        await axios.get(process.env.baseUrl + '/api/categories').then(res => {
          return res.data.data.map(e => `/category/${e._id}`)
        })
      }
    ]
  },
  /*
   ** vuetify module configuration
   ** https://github.com/nuxt-community/vuetify-module
   */
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      themes: {
        light: {
          primary: '#3f51b5',
          secondary: '#b0bec5',
          accent: '#8c9eff',
          error: '#b71c1c'
        }
      }
    }
  },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    // useForKTsChecker: {
    //   typescript: {
    //     typeCheck: true
    //   }
    // },

    extend(config, ctx) {},
    transpile: ['vue-youtube-embed']
  },
  auth: {
    strategies: {
      google: {
        client_id:
          '1092934335587-4ss7kk9v5nvtlfbl2c6e1aplgrodcifs.apps.googleusercontent.com',
      },
      facebook: {
        client_id: '232332534303433',
        userinfo_endpoint:
          'https://graph.facebook.com/v2.12/me?fields=about,name,picture{url},email,birthday',
        scope: ['public_profile', 'email', 'user_birthday']
      }
    }
  },
  env: {
    baseUrl: process.env.baseURL || 'https://api.yalladealz.com'
  },
  
}
