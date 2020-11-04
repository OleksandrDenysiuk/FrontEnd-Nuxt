<template>
  <v-app>
    <!-- install app if android-->
    <div v-if="$device.isAndroid">
      <v-dialog v-model="androidDialog" width="500">
        <v-card>
          <v-card-title class="headline">Download app</v-card-title>
          <v-card-text>get the app now on google play.</v-card-text>
          <v-card-actions style="height:52px !important">
            <v-spacer></v-spacer>
            <a
              href="https://play.google.com/store/apps/details?id=com.yalladealz.userapp"
              target="_blank"
              style="text-decoration:none"
              @click="androidDialog = false"
            >
              <v-btn color="red darken-1" text>Download the app</v-btn>
            </a>
            <v-btn color="red darken-1" text @click="androidDialog = false">close</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
    <!-- install app if ios-->
    <div v-if="$device.isIos">
      <v-dialog v-model="iosDialog" width="500">
        <v-card>
          <v-card-title class="headline">Download app</v-card-title>
          <v-card-text>get the app now on app store.</v-card-text>
          <v-card-actions style="height:52px !important">
            <v-spacer></v-spacer>
            <a
              href="https://play.google.com/store/apps/details?id=com.yalladealz.userapp"
              target="_blank"
              style="text-decoration:none"
              @click="iosDialog = false"
            >
              <v-btn color="red darken-1" text>Download the app</v-btn>
            </a>
            <v-btn color="red darken-1" text @click="iosDialog = false">close</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
    <!-- navigation drawer -->
    <v-navigation-drawer v-model="nav" absolute>
      <v-list dense nav>
        <nuxt-link to="/profile/1" style="text-decoration:none">
          <v-list-item link>
            <v-list-item-icon>
              <v-icon color="red">mdi-cart</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>My Cart</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </nuxt-link>
        <nuxt-link to="/profile/2" style="text-decoration:none">
          <v-list-item link>
            <v-list-item-icon>
              <v-icon color="red">mdi-heart</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>My Wish List</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </nuxt-link>
        <v-divider></v-divider>
        <nuxt-link to="/login" style="text-decoration:none" v-if="!getUser">
          <v-list-item link>
            <v-list-item-icon>
              <v-icon color="red">mdi-login-variant</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>Log in</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </nuxt-link>
        <nuxt-link to="/signup" style="text-decoration:none" v-if="!getUser">
          <v-list-item link>
            <v-list-item-icon>
              <v-icon color="red">mdi-account-multiple-plus</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>Sign up</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </nuxt-link>
        <nuxt-link to="/profile/0" style="text-decoration:none" v-if="getUser">
          <v-list-item link>
            <v-list-item-icon>
              <v-icon color="red">mdi-account</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>My Profile</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </nuxt-link>

        <v-list-item @click="logout" link v-if="getUser">
          <v-list-item-icon>
            <v-icon color="red">mdi-logout-variant</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Log out</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-divider></v-divider>

        <v-btn icon href="https://www.facebook.com/YallaDealzEgypt/">
          <v-icon color="#3b5999">mdi-facebook</v-icon>
        </v-btn>
        <v-btn icon href="https://mobile.twitter.com/yalladealzegypt">
          <v-icon color="#55acee">mdi-twitter</v-icon>
        </v-btn>
        <v-btn icon href="https://www.instagram.com/yalladealzegypt/">
          <v-icon color="#e4405f">mdi-instagram</v-icon>
        </v-btn>
        <v-btn icon href="https://www.youtube.com/channel/UCuACWTu_kBmDuNuoCsVikjQ">
          <v-icon color="#cd201f">mdi-youtube</v-icon>
        </v-btn>
        <v-divider></v-divider>
        <v-switch
          class="mt-3 mr-3"
          color="red"
          v-model="switch1"
          :label="`Arabic`"
          v-if="getLocale == 'ar'"
          @change="setLocale('en')"
        ></v-switch>
        <v-switch
          class="mt-3 mr-3"
          color="red"
          v-model="switch2"
          :label="`Arabic`"
          v-if="getLocale == 'en'"
          @change="setLocale('ar')"
        ></v-switch>
      </v-list>
    </v-navigation-drawer>
    <!-- toolbar -->
    <v-card flat height="175px" tile>
      <v-toolbar extended v-resize="onResize" :extension-height="windowSize <= 960 ? 120 : 20">
        <v-icon size="30" class="pr-3 d-md-none" style="cursor:pointer" @click="nav = true">mdi-menu</v-icon>
        <nuxt-link to="/" class="d-md-none">
          <img src="~/assets/images/logo.png" class="logo" />
        </nuxt-link>

        <template slot="extension">
          <nuxt-link to="/" class="d-md-block d-none">
            <img src="~/assets/images/logo.png" class="logo" />
          </nuxt-link>
          <div class="d-md-none 1" style="width: 100%">
            <v-col style="width: 100%">
              <v-text-field
                style="width: 100%"
                rounded
                class="secondSearch mb-2"
                hide-details
                append-icon="mdi-search-web"
                prepend-inner-icon="mdi-search-web"
                color="red"
                label="Search"
                v-model="search_text"
                @click:append="searchDeal"
              ></v-text-field>
              <v-text-field
                rounded
                class="secondSearch"
                hide-details
                label="Location"
                append-icon="mdi-search-web"
                prepend-inner-icon="mdi-map-marker"
                color="red"
                v-model="search_text_by_location"
                @click:append="searchDealbyLocation"
              ></v-text-field>
            </v-col>
          </div>
          <div class="d-md-block d-none 2" style="width: 100%">
            <v-row class="d-flex ml-4 justify-content-between" style="width: 100%">
              <v-text-field
                rounded
                class="ml-2 secondSearch"
                hide-details
                append-icon="mdi-search-web"
                prepend-inner-icon="mdi-search-web"
                color="red"
                label="Search"
                v-model="search_text"
                @click:append="searchDeal"
              ></v-text-field>
              <v-text-field
                rounded
                class="ml-2 secondSearch"
                hide-details
                label="Location"
                append-icon="mdi-search-web"
                prepend-inner-icon="mdi-map-marker"
                color="red"
                v-model="search_text_by_location"
                @click:append="searchDealbyLocation"
              ></v-text-field>
            </v-row>
          </div>
          <v-spacer></v-spacer>
          <nuxt-link to="/profile/1" style="text-decoration:none" class="d-md-block d-none">
            <v-btn text color="red" icon class="ml-3">
              <v-icon size="30">mdi-cart</v-icon>
            </v-btn>
          </nuxt-link>
          <nuxt-link to="/profile/2" style="text-decoration:none" class="d-md-block d-none">
            <v-btn text color="red" icon>
              <v-icon size="30">mdi-heart</v-icon>
            </v-btn>
          </nuxt-link>
          <v-menu offset-y class="d-md-block d-none">
            <template v-slot:activator="{ on }">
              <v-btn color="red" icon text dark v-on="on" class="d-md-block d-none">
                <v-icon>mdi-bell-ring</v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item v-for="(item, index) in items" :key="index">
                <nuxt-link :to="item.link" style="text-decoration:none">
                  <v-list-item-title class="pa-2 black--text ringHover">
                    {{
                    item.text
                    }}
                  </v-list-item-title>
                  <v-divider light></v-divider>
                </nuxt-link>
              </v-list-item>
            </v-list>
          </v-menu>
          <nuxt-link
            class="mt-3 d-md-block d-none"
            to="/signup"
            style="text-decoration:none"
            v-if="!getUser"
          >
            <v-btn color="red" dark class="mx-3">Sign up</v-btn>
          </nuxt-link>
          <nuxt-link
            class="mt-3 d-md-block d-none"
            to="/login"
            style="text-decoration:none"
            v-if="!getUser"
          >
            <v-btn color="red" dark class="mx-3">Sign in</v-btn>
          </nuxt-link>
          <nuxt-link
            class="d-md-block d-none"
            to="/profile/0"
            style="text-decoration:none"
            v-if="getUser"
          >
            <v-btn color="red" dark class="mx-3">Profile</v-btn>
          </nuxt-link>

          <v-btn
            color="red"
            dark
            class="mx-3 d-md-block d-none"
            @click="logout"
            v-if="getUser"
          >Log out</v-btn>
        </template>
        <v-spacer></v-spacer>

        <v-switch
          class="mt-3 mr-3 d-md-flex d-none"
          color="red"
          v-model="switch1"
          :label="`Arabic`"
          v-if="getLocale == 'en'"
          @change="setLocale('ar')"
        ></v-switch>
        <v-switch
          class="mt-3 mr-3 d-md-flex d-none"
          color="red"
          v-model="switch2"
          :label="`Arabic`"
          v-if="getLocale == 'ar'"
          @change="setLocale('en')"
        ></v-switch>
        <v-btn icon href="https://www.facebook.com/YallaDealzEgypt/" class="d-md-flex d-none">
          <v-icon color="#3b5999">mdi-facebook</v-icon>
        </v-btn>
        <v-btn icon href="https://mobile.twitter.com/yalladealzegypt" class="d-md-flex d-none">
          <v-icon color="#55acee">mdi-twitter</v-icon>
        </v-btn>
        <v-btn icon href="https://www.instagram.com/yalladealzegypt/" class="d-md-flex d-none">
          <v-icon color="#e4405f">mdi-instagram</v-icon>
        </v-btn>
        <v-btn
          icon
          href="https://www.youtube.com/channel/UCuACWTu_kBmDuNuoCsVikjQ"
          class="d-md-flex d-none"
        >
          <v-icon color="#cd201f">mdi-youtube</v-icon>
        </v-btn>
      </v-toolbar>
    </v-card>
    <!-- main -->
    <v-main>
      <nuxt />
    </v-main>
    <!-- footer -->
    <v-footer dark padless class="mt-10">
      <v-container>
        <v-row>
          <v-col cols="6" class="mar">
            <!-- <p class="display-1 font-weight-light">We accept :</p> -->
            <v-row>
              <v-col
                :cols="item.method == 'Aman' ? 2 : 2"
                v-for="(item, i) in paymentList"
                :key="i"
              >
                <v-img dark :src="item.img" max-height="50" height="50"></v-img>
              </v-col>
            </v-row>
            <v-row>
              <p class="font-weight-light text-caption">
                &copy; 2020 Yalla Dealz, Inc.All Right Reserved .Terms of Use Privacy
                Statement
              </p>
            </v-row>
          </v-col>
          <v-col class="mar align-self-center" cols="2">
            <v-row>
              <v-btn icon href="https://www.facebook.com/YallaDealzEgypt/">
                <v-icon>mdi-facebook</v-icon>
              </v-btn>
              <v-btn icon href="https://www.youtube.com/channel/UCuACWTu_kBmDuNuoCsVikjQ">
                <v-icon>mdi-youtube</v-icon>
              </v-btn>
              <v-btn icon href="https://mobile.twitter.com/yalladealzegypt">
                <v-icon>mdi-twitter</v-icon>
              </v-btn>
              <v-btn icon href="https://www.instagram.com/yalladealzegypt/">
                <v-icon>mdi-instagram</v-icon>
              </v-btn>
            </v-row>
          </v-col>
          <v-col cols="2" style="margin-left: auto;">
            <v-img class="mb-3" :src="require('../assets/images/unnamed.png')"></v-img>
            <v-img :src="require('../assets/images/apple.png')"></v-img>
          </v-col>
        </v-row>
      </v-container>
    </v-footer>
    <!-- notifiaction -->
    <v-snackbar v-model="cart" top :timeout="6000">
      {{ cartNotifiaction }}
      <v-btn color="pink" text @click="cart = false">Close</v-btn>
    </v-snackbar>
    <v-snackbar v-model="wish" top :timeout="cart ? 8000 : 6000">
      {{ wishNotifiaction }}
      <v-btn color="pink" text @click="wish = false">Close</v-btn>
    </v-snackbar>
  </v-app>
</template>

<script>
import axios from 'axios'
import { CryptService } from '~/services/crypt.service'

export default {

  data() {
    return {
      switch1: false,
      switch2: true,
      nav: false,
      windowSize: 0,
      cart: false,
      wish: false,
      cartNotifiaction: '',
      wishNotifiaction: '',
      androidDialog: false,
      iosDialog: false,
      items: [],
      search_text: '',
      search_text_by_location: '',
      paymentList: [
        { method: 'Fawry', img: require('../assets/images/fawry.png') },
        { method: 'Visa', img: require('../assets/images/visa.png') },
        { method: 'Masary', img: require('../assets/images/masteer.png') },

        { method: 'Masary', img: require('../assets/images/masary.png') },

        {
          method: 'Aman',
          img: require('../assets/images/aman.png'),
        },
      ],
    }
  },

  async created() {
    const coordinates = await this.$geolocation.getCurrentPosition()
    //google page speed
    axios
      .get(
        'https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=https://yalladealz.com/&key=AIzaSyBBb0pba3vw7x1JXTM_umY012djw0mMpSM'
      )
      .then((res) => {})
    // check if Android
    if (this.$device.isAndroid) {
      this.androidDialog = true
    }
    // check if Ios
    if (this.$device.isIos) {
      this.iosDialog = true
    }
    const localStorage = globalThis.localStorage
    if (!localStorage) return
    //once created check the locale
    // localStorage.remove('locale');
    if (localStorage.getItem('locale')) {
      console.log('This sis the language', localStorage)
      this.$store.commit('SET_LANG', localStorage.getItem('locale'))
      this.$i18n.locale = this.$store.state.locale
    }
    // if (!localStorage.getItem('locale')) {
    //   localStorage.setItem('locale', 'en')
    // }

    const session = JSON.parse(localStorage.getItem('session'))
    if (session && session.email)
      if (session) {
        //once created check token
        if (session.token) {
          if (session.expiresIn > Date.now()) {
            const config = {
              headers: {
                'Content-Type': 'application/json',
              },
            }
            await axios
              .post(
                process.env.baseUrl + '/api/user/login',
                {
                  loginField: CryptService.decrypt(session.email),
                  password: CryptService.decrypt(session.password),
                },
                config
              )
              .then((res) => {
                const newSession = {
                  ...session,
                  token: res.data.token,
                  expiresIn: Date.now() + 60 * 60 * 60 * 60,
                }
                localStorage.setItem('session', JSON.stringify(newSession))
                this.$store.dispatch('setUser')
              })
          } else {
            localStorage.setItem('session', JSON.stringify({}))
          }
        }
      }
    //once created check cart and wish list items

    if (this.getUser) {
      await this.$store.dispatch('getWishList')
      await this.$store.dispatch('getCart')

      if ([this.getCart][0].length > 0) {
        this.cart = true
        this.cartNotifiaction = `There is ${
          [this.getCart][0].length
        } deals in cart check it.`
        this.items.push({
          text: `There is ${[this.getCart][0].length} deals in cart check it.`,
          link: '/profile/1',
        })
      }
      if ([this.getWishList][0].length > 0) {
        this.wish = true
        this.wishNotifiaction = `There is ${
          [this.getWishList][0].length
        } deals in wish list check it.`
        this.items.push({
          text: `There is ${
            [this.getWishList][0].length
          } deals in wish list check it.`,
          link: '/profile/2',
        })
      }
    }
  },
  computed: {
    getUser() {
      return this.$store.getters.getUser
    },
    getLocale() {
      return this.$store.getters.getLocale
    },
    getWishList() {
      return this.$store.getters.getWishList
    },
    getCart() {
      return this.$store.getters.getCart
    },
  },
  methods: {
    setLocale(locale) {
      this.$store.commit('SET_LANG', locale)
      localStorage.setItem('locale', locale)
      location.reload()
    },
    logout() {
      this.$store.commit('logout')
      this.$router.push('/login')
    },
    onResize() {
      this.windowSize = window.innerWidth
    },
    searchDeal() {
      if (this.search_text != '') {
        this.search_text_by_location = ''
        this.$router.push('/search_result?deal=' + this.search_text)
      }
    },
    searchDealbyLocation() {
      if (this.search_text_by_location != '') {
        this.search_text = ''
        this.$router.push(
          '/search_result?deal_location=' + this.search_text_by_location
        )
      }
    },
  },
  mounted() {
    this.onResize()
  },
}
</script>

<style scoped>
@media (max-width: 960px) {
  .v-card > *:last-child:not(.v-btn):not(.v-chip) {
    height: 165px !important;
  }
}
.v-card > *:last-child:not(.v-btn):not(.v-chip) {
  min-height: 115px !important;
}
.ringHover {
  transition: all 0.3s;
}
.ringHover:hover {
  background-color: rgb(232, 232, 232);
}
.mar {
  margin-right: 50px;
}
</style>
