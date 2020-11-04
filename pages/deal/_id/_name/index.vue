<template>
  <div>
    <v-container v-for="(item, i) in deal" :key="i">
      <!-- Deal Header -->
      <div class="dealHeaderContainer" v-if="getLocale == 'en'">
        <p class="display-2 font-weight-light">{{ name }}</p>
        <div class="headerDetails">
          <p>Deal Type : {{ item.dealType }}</p>
          <p>Premium : {{ totalRates }}</p>
        </div>
      </div>
      <div class="dealHeaderContainer text-right" v-if="getLocale == 'ar'">
        <p class="display-2 font-weight-light">{{ name }}</p>
        <div class="headerDetails">
          <p dir='rtl' lang='ar'>نوع الصفقة : {{item.dealType}}</p>
          <p dir='rtl' lang='ar'>{{$t('deal.reviews')}} : {{ item.totalRates }}</p>
        </div>
      </div>

      <!-- main container -->
      <div class="mainContainer">
        <v-row class="justify-content-center">
          <v-col cols="11" md="8" class="py-0">

            <!-- slider / images-list -->
            <v-col cols="12">
              <v-row class="justify-content-center">
                <!-- Sliders container -->
                <v-col  cols="12" class="mainSliderContainer p-0">
                  <v-img :src="image" id="ytplayer" v-if="!video && item.images.length<2"></v-img>

                  <youtube
                    v-if="video"
                    :video-id="item.video.replace('https://www.youtube.com/embed/', '')"
                    player-width="100%"
                    player-height="350"
                    style="margin-top:15px"
                  ></youtube>

                  <v-row class="h-100" v-if="item.images.length>=2 && video == false">
                    <v-carousel class="h-100" width="500" hide-delimiter-background>
                      <v-carousel-item class="h-100" v-for="(n,i) in item.images" :key="i" contain>
                        <v-img :src="n" class="carousel-img"></v-img>
                      </v-carousel-item>
                    </v-carousel>
                  </v-row>
                </v-col>
              </v-row>
              <v-row>
                <!-- images list -->
                <v-col cols="12" class="listImgs py-0 my-5">
                  <div class="row justify-content-center align-items-center">
                    <div class="col-2">
                      <v-icon v-if="item.video" color="red" @click="playVideo()" class="mx-auto youtubeBtn">
                        mdi-television-play
                      </v-icon>
                    </div>
                    <div class="col-2" v-for="(n, i) in item.images" :key="i">
                      <img :src="n" alt="deal-images" @click="setImage(n)">
                    </div>
                  </div>
                </v-col>
              </v-row>
            </v-col>

            <!-- Rate -->
            <!-- <v-row>
              <v-list two-line>
                <v-list-item-group
                  v-model="selected"
                  multiple
                  active-class="pink--text"
                >
                <template>
                  <v-list-item >
                    <template >
                      <v-list-item-content>
                        <v-list-item-title v-text="">{{'Title'}}</v-list-item-title>
                        <v-list-item-subtitle class="text--primary">{{'Headline'}}</v-list-item-subtitle>
                        <v-list-item-subtitle >{{"SubTitle"}}</v-list-item-subtitle>
                      </v-list-item-content>
                      <v-list-item-action>
                        <v-rating readonly>
                        </v-rating>
                      </v-list-item-action>
                    </template>
                  </v-list-item>
                  </template>
                </v-list-item-group>
              </v-list>
            </v-row> -->

            <!-- Deal Details -->
            <v-col cols="12" v-if="getLocale == 'en'">
              <div class="deal-info-title">
                <h3 class="font-weight-black deal-info-title-text">Highlight</h3>
                <p class="deal-info-details">{{item.highlightes}}</p>
              </div>
              <hr>
              <div class="deal-info-title">
                <h3 class="font-weight-black deal-info-title-text">Description</h3>
                <p class="deal-info-details">{{item.description}}</p>
              </div>
              <hr>
              <div class="deal-info-title">
                <h3 class="font-weight-black deal-info-title-text">Fine Print</h3>
                <p class="deal-info-details">{{item.finePrint}}</p>
              </div>
              <!-- <p class="body-1 ml-5">{{ finePrint }}</p> -->
            </v-col>

            <v-col cols="12" class="text-right" v-if="getLocale == 'ar'">
              <div class="deal-info-title">
                <h3 class="font-weight-black deal-info-title-text">المميزات</h3>
                <p class="deal-info-details">{{item.arHighlightes}}</p>
              </div>
              <hr>
              <div class="deal-info-title">
                <h3 class="font-weight-black deal-info-title-text">المواصفات</h3>
                <p class="deal-info-details">{{item.arDescription}}</p>
              </div>
              <hr>
              <div class="deal-info-title">
                <h3 class="font-weight-black deal-info-title-text">الشروط</h3>
                <p class="deal-info-details">{{item.arFinePrint}}</p>
              </div>
              <!-- <p class="body-1 ml-5">{{ finePrint }}</p> -->
            </v-col>

            <!-- google map -->
            <v-col cols="12">
              <v-row class="justify-content-center justify-content-md-start">
                <!-- google map EN -->
                <v-col v-if="getLocale == 'en'">
                  <!-- Merchant Details -->
                  <div class="merchantDetails container pb-1">
                    <v-row class="mb-1">
                      <div class="col-md-6 py-0 mt-1">
                        <div class="row">
                          <!-- merchant logo -->
                          <div class="col-3 merchantLogo mx-xs-auto">
                            <img :src="item.merchant.image" :alt="item.merchant.name">
                          </div>
                          <!-- merchant name -->
                          <div class="col-7 align-self-center">
                            <span class="font-weight-normal">{{ item.merchant.name }}</span>
                            <br>
                            <span class="font-weight-lighter">{{ item.merchant.address }}</span>
                          </div>
                        </div>
                      </div>
                      <div class="col-md-6 py-0">
                        <div class="row">
                          <div class="col-12 mx-xs-auto py-0 my-4">
                            <v-icon color="#f00" left>mdi-cellphone-android</v-icon>
                            <span>{{ item.merchant.phone }}</span>
                          </div>
                          <!-- email -->
                          <div class="col-12 py-0">
                            <v-icon color="#f00" left>mdi-email-outline</v-icon>
                            <span><a :href="item.merchant.email">{{ item.merchant.email }}</a></span>
                          </div>
                        </div>
                      </div>
                    </v-row>
                  </div>
                  <!-- Map -->
                  <div class="map-custimize">
                    <GMap
                      ref="gMap"
                      language="en"
                      :cluster="{options: {styles: clusterStyle}}"
                      :center="{lat: parseInt(item.merchant.location.lat), lng: parseInt(item.merchant.location.long)}"
                      :options="{fullscreenControl: false }"
                      :zoom="10"
                    >
                      <GMapMarker
                        icon="http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
                        :position="{lat: parseInt(item.merchant.location.lat), lng: parseInt(item.merchant.location.long)}"
                      ></GMapMarker>
                    </GMap>
                  </div>
                </v-col>

                <!-- google map AR -->
                <v-col class="text-right" v-if="getLocale == 'ar'">
                  <!-- Merchant Details -->
                  <div class="merchantDetails container pb-1">
                    <div class="row">
                      <div class="col-6"></div>
                      <!-- Merchant name adress -->
                      <div class="col-4 align-self-center ml-auto">
                        {{ item.merchant.name }}
                        <br>
                        <span>{{ item.merchant.address }}</span>
                      </div>
                      <!-- Merchant Icon -->
                      <div class="merchantLogo col-1 ml-auto mr-2">
                        <img :src="item.merchant.image" :alt="item.merchant.name">
                      </div>
                    </div>
                  </div>
                  <div class="map-custimize" >
                    <GMap
                      ref="gMap"
                      language="ar"
                      :cluster="{options: {styles: clusterStyle}}"
                      :center="{lat: parseInt(item.merchant.location.lat), lng: parseInt(item.merchant.location.long)}"
                      :options="{fullscreenControl: false }"
                      :zoom="10"
                    >
                      <GMapMarker
                        :position="{lat: parseInt(item.merchant.location.lat), lng: parseInt(item.merchant.location.long)}"
                      ></GMapMarker>
                    </GMap>
                  </div>
                  <!-- Rest Merchant Details -->
                  <div class="merchantRestDetails container">
                    <div>
                      <!-- phone -->
                      <span>{{ item.merchant.phone }}</span>
                      <v-icon color="#f00" left>mdi-cellphone-android</v-icon>
                    </div>
                    <div class="icon mt-1">
                      <!-- email -->
                      <span><a :href="item.merchant.email">{{ item.merchant.email }}</a></span>
                      <v-icon color="#f00" left>mdi-email-outline</v-icon>
                    </div>
                  </div>
                </v-col>
              </v-row>
            </v-col>
          </v-col>




          <!-- prices list -->
          <v-col cols="11" md="4" class="mx-auto">
            <v-list-item three-line>
              <v-list-item-content class="dealInfo">
                <!-- price list header -->
                <div class="priceListHeader">
                  <v-list-item-title class="headline mb-1 text-center">
                    {{ $t('deal.prices') }}
                  </v-list-item-title>

                  <v-row class="justfiy-content-center">
                    <v-col cols="4" class="text-center">
                      <div class="text-center">
                        <v-icon class="myIcon">mdi-clock-outline</v-icon>
                        <p
                          class="text-center body-1 font-weight-thin"
                        >{{ $t('deal.endsIn', { msg: expireDay }) }}</p>
                      </div>
                    </v-col>
                    <v-col cols="4" class="text-center">
                      <!-- <v-rating dense half-increments half-icon x-small color="red" readonly background-color="red" :value="rating">
                      </v-rating>-->
                      <!-- <v-rating dense small color="red" background-color="red" v-model="ratingReview" v-if="getUser" @input="addRatingReview(item._id)">
                      </v-rating> -->
                      <!-- <p class="body-1 font-weight-thin mt-5">{{ item.rate }}</p> -->
                      <v-icon left class="myIcon">mdi-eye-outline</v-icon>
                    </v-col>
                    <v-col cols="4" class="text-center">
                      <div class="text-center">
                        <v-icon class="myIcon">
                          {{
                          hotFast[Math.round(Math.random())].icon
                          }}
                        </v-icon>
                        <p
                          class="text-center body-1 font-weight-thin"
                        >{{ hotFast[Math.round(Math.random())].text }}</p>
                      </div>
                    </v-col>
                  </v-row>
                </div>

                <div class="priceAfterDicount text-center">
                  <span v-if="getLocale =='ar'">
                    {{ price }}
                    <br>
                    جنيه
                  </span>
                  <span v-else-if="getLocale =='en'">
                    {{ price }}
                    <br>
                    EGP
                  </span>
                </div>

                <v-radio-group class="subDetails" v-model="price" mandatory>
                  <div v-for="(n, i) in item.prices" :key="i">
                    <!-- description && radio -->
                    <v-radio
                      right
                      color="red"
                      :label="getLocale == 'en' ? n.description : n.arDescription "
                      :value="n.finalPrice"
                    ></v-radio>
                    <!-- prices details -->
                    <p class="text-center" v-bind:style="getLocale =='ar' ? 'direction:rtl':''">
                      <!-- old price -->
                      <span class="hide font-weight-light m-1 subtitle-2">{{ n.originalPrice }}{{ $t('currency.egp') }}</span>
                      <!-- final price -->
                      <span class="font-weight-bolder">
                        {{ n.finalPrice }}{{ $t('currency.egp') }}
                      </span>
                      <br>
                      <!-- precentage save -->
                      <span class="pulse-green font-weight-bold">
                        {{ $t('currency.offer') }} {{ (100 - (n.finalPrice / n.originalPrice) * 100).toFixed(2) }}%
                      </span>
                    </p>
                    <hr>
                  </div>
                </v-radio-group>
              </v-list-item-content>
            </v-list-item>

            <!-- Yalla Dealz btn -->
            <!-- <v-btn color="red" nuxt dark block elevation="1" @click="goToCheckout(item._id)">
              {{ $t('deal.buy') }}
            </v-btn> -->

            <div class="row justify-content-center">
              <div class="col-10 my-0 py-0">
                <!-- استخدم هديتك -->
                <v-btn light outlined color="red" nuxt block elevation="1" class="border-radius">
                  <v-icon size="20" class="mr-2">mdi-gift-outline</v-icon>
                  {{ $t('deal.GiveAgift') }}
                </v-btn>
              </div>

              <div class="col-12 my-2 py-0">
                <!-- Yalla Dealz btn -->
                <v-btn class="border-radius" color="red" nuxt dark block elevation="1" @click="goToYallaDealz()">
                  {{ $t('deal.buy') }}
                </v-btn>
              </div>

              <div class="col-10 my-0 py-0">
                <!-- add to wish -->
                <v-btn class="border-radius" light outlined color="red" nuxt block elevation="1" @click="addToWish($route.params.id)">
                  <v-icon size="20" class="mr-2">mdi-heart-outline</v-icon>
                  {{ $t('deal.wishCart') }}
                </v-btn>
              </div>
            </div>

            <!-- Social Icons -->
            <div class="mt-2 text-center">
              <social-sharing :url="url" inline-template>
                <div>
                  <v-btn icon>
                    <network network="facebook">
                      <i class="mdi mdi-facebook mx-3" style="color:#3b5999;font-size:24px;cursor:pointer"></i>
                      <!-- <v-icon color="#3b5999">mdi-facebook</v-icon> -->
                    </network>
                  </v-btn>
                  <v-btn icon>
                    <network network="twitter">
                      <i class="mdi mdi-twitter mx-3" style="color:#55acee;font-size:24px;cursor:pointer"></i>
                      <!-- <v-icon color="#55acee">mdi-twitter</v-icon> -->
                    </network>
                  </v-btn>
                    <v-btn icon>
                    <network network="whatsapp">
                      <i class="mdi mdi-whatsapp mx-3" style="color:#25D366;font-size:24px;cursor:pointer"></i>
                      <!-- <v-icon color="#55acee">mdi-whatsapp</v-icon> -->
                    </network>
                  </v-btn>
                  <v-btn icon>
                    <network network="messenger">
                      <i class="mdi mdi-facebook-messenger mx-3" style="color:#55acee;font-size:24px;cursor:pointer"></i>
                      <!-- <v-icon>mdi-facebook-messenger</v-icon> -->
                    </network>
                  </v-btn>
                </div>
              </social-sharing>
            </div>
          </v-col>





        </v-row>
      </div>

      <!--  this is hr tag -->
      <!-- <v-divider light class="mt-5 mb-3"></v-divider> -->

      <v-row v-if="canReview">
        <v-col md="6">
          <p class="display-1">Reviews</p>
          <p class="body-1 ml-5">{{ item.userReview.comment }}</p>
        </v-col>
      </v-row>
    </v-container>

    <!-- dialog appear if add to wish clicked -->
    <v-dialog v-model="dialog" width="500">
      <v-card>
        <v-card-text class="pa-5">{{ addToWishMsg }}</v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red" text @click="dialog = false" block>close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialogRatingResponse" width="500">
      <v-card>
        <v-card-title class="pa-5">{{ 'Rating' }}</v-card-title>
        <v-card-text>{{ratingResponseMsg}}</v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red" text @click="dialogRatingResponse = false">close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialogRating" width="500" persistent>
      <v-card>
        <v-card-title class="headline">{{ 'Rate this deal' }}</v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <v-text-field
            style="width: 100%"
            class="mb-2"
            hide-details
            color="red"
            label="Comment*"
            v-model="rating_comment"
          ></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red" text @click="saveRating">Submit</v-btn>
          <v-btn color="red" text @click="dialogRating = false">close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import axios from 'axios'
import { getIdFromURL, getTimeFromURL } from 'vue-youtube-embed'
export default {
  data() {
    return {
      url: '',
      dialog: false,
      priceId: '',
      addToWishMsg: '',
      name: '',
      highlight: '',
      description: '',
      deal: [],
      rating: '',
      ratingReview: 0,
      totalRates: '',
      rating_comment: '',
      price: '',
      canReview: '',
      image: '',
      rateForDeal: '',
      video: false,
      expireDay: '',
      dialogRating: false,
      dialogRatingResponse: '',
      ratingResponseMsg: '',
      hotFast: [
        {
          text: 'Hot Deal',
          icon: 'mdi-fire',
        },
        {
          text: 'Selling Fast',
          icon: ' mdi-clock-fast ',
        },
      ],
      clusterStyle: [
        {
          url:
            'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m1.png',
          width: 56,
          height: 56,
          textColor: '#fff',
        },
      ]
    }
  },

  head() {
    return {
      meta: [
        // Twitter Card
        { name: 'twitter:card', content: 'summary' },
        { name: 'twitter:title', content: this.name },
        { name: 'twitter:description', content: this.description },
        // image must be an absolute path
        {
          name: 'twitter:image',
          content: this.url + '/assets/images/logo.png',
        },
        // Facebook OpenGraph
        { property: 'og:title', content: this.name },
        { property: 'og:site_name', content: 'Yalla dealz' },
        { property: 'og:type', content: 'website' },
        { property: 'og:image', content: this.image },
        { property: 'og:description', content: this.description },
      ],
      title: this.name,
    }
  },

  jsonld() {
    return {
      '@context': 'http://schema.org',
      '@type': 'Product',
      body: {
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: this.rating,
          reviewCount: this.totalRates,
        },
      },
    }
  },

  // once created fetch deal data
  async created() {
    this.url = ((globalThis.window || {}).location || {}).href || ''

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }
    // get deal data by the id
    await axios
      .get(`${process.env.baseUrl}/api/deals/${this.$route.params.id}`)
      .then((res) => {
        // console.log('Deals Details', res.data.deal)
        res.data.deal
        this.priceId = res.data.deal.prices[0]._id
        this.deal = [res.data.deal]
        this.totalRates = res.data.deal.totalRates
        this.rating = res.data.deal.rate
        this.canReview = res.data.deal.canReview
        this.image = res.data.deal.images[0]
        if (this.$i18n.locale == 'en') {
          this.name = res.data.deal.name
          this.description = res.data.deal.description
          this.highlight = res.data.deal.highlight
        } else if (this.$i18n.locale == 'ar') {
          this.name = res.data.deal.arName
          this.description = res.data.deal.arDescription
          this.highlight = res.data.deal.arHighlightes
        }
      })
  },

  mounted() {
    if (JSON.parse(localStorage.getItem('ttl'))) {
      if (
        JSON.parse(localStorage.getItem('ttl')).endsIn >
        JSON.parse(localStorage.getItem('ttl')).start
      ) {
        this.endsIn()
        return
      } else {
        const now = new Date()
        localStorage.setItem(
          'ttl',
          JSON.stringify({
            start: now.getTime(),
            endsIn: now.setDate(now.getDate() + 5),
          })
        )
      }
    } else {
      const now = new Date()
      localStorage.setItem(
        'ttl',
        JSON.stringify({
          start: now.getTime(),
          endsIn: now.setDate(now.getDate() + 5),
        })
      )
    }
    this.endsIn()
  },

  computed: {
    getLocale() {
      return this.$store.getters.getLocale
    },
    getUser() {
      return this.$store.getters.getUser
    },

    // video(){
    //   return (this.deal[0].video)? true : false;
    // }
  },

  methods: {
    goToCheckout(dealID) {
      this.$store.commit('setCheckoutDealID', dealID)
      this.$store.commit('setCheckoutPriceID', this.priceId)
      this.$router.push('/checkout')
    },

    goToYallaDealz(){
      let dealId = this.$route.params.id;
      let dealObject = {deal:dealId,priceId:this.priceId,quantity:this.quantity}
      this.$store.dispatch('addDealtoCart', dealObject).then(() => {
        this.$router.push('/profile/1');
      });
      // window.location.replace(process.env.baseUrl + '/api/user/wishList');

    },

    endsIn() {
      const expire =
        JSON.parse(localStorage.getItem('ttl')).endsIn - new Date().getTime()
      this.expireDay = new Date(expire).getDate()
    },
    setImage(path) {
      this.image = path
      this.video = false
    },

    playVideo() {
      this.video = !this.video;
    },

    addToWish(id) {
      const config = {
        headers: {
          authorization: JSON.parse(localStorage.getItem('session')).token,
        },
      }
      if (this.getUser) {
        axios
          .post(
            process.env.baseUrl + '/api/user/wishList',
            {
              dealId: id,
            },
            config
          )
          .then((res) => {
            this.addToWishMsg = res.data.message
            this.dialog = true
          })
          .catch((err) => {
            this.addToWishMsg = 'There is error occured'
            this.dialog = true
          })
      } else {
        this.$router.push('/login')
      }
    },
    addRatingReview(id) {
      this.dialogRating = true
      this.rateForDeal = id
    },

    saveRating() {
      if (this.ratingReview != 0 && this.rating_comment != '') {
        var dealID = this.rateForDeal
        var rating = this.ratingReview
        var comment = this.rating_comment
        const config = {
          headers: {
            authorization: JSON.parse(localStorage.getItem('session')).token,
          },
        }
        axios
          .post(
            process.env.baseUrl + '/api/deals/rate',
            {
              dealId: dealID,
              rate: rating,
              comment: comment,
            },
            config
          )
          .then((res) => {
            this.dialogRating = false
            this.rateForDeal = ''
            this.ratingReview = 0
            this.rating_comment = ''
            this.ratingResponseMsg = res.data.message
            this.dialogRatingResponse = true
          })
          .catch((err) => {
            this.dialogRating = false
            this.rateForDeal = ''
            this.ratingReview = 0
            this.rating_comment = ''
            this.ratingResponseMsg =
              'There is an error occured or you did not yet bought this deal'
            this.dialogRatingResponse = true
          })
      }
    }
  }
}
</script>

<style scoped>
#ytplayer {
  width: 100%;
  height: 100%;
}

.mainSliderContainer {
  height: 450px;
}

.listImgs img {
  width: 100%;
  border-radius: 5px;
}

.myIcon:hover {
  animation: move 1.5s linear infinite;
}
.myIcon {
  position: relative;
  color: #fff;
}

.dealInfo {
  position: relative;
  padding: 0 10px;
}

.priceAfterDicount {
  width: 120px;
  height: 120px;
  line-height: 30px;
  padding-top: 30px;
  position: absolute;
  top: 100px;
  left: calc((100% - 120px) / 2);
  color: #F44336;
  background: #fff;
  border: 1px solid #eee;
  border-radius: 50%;
  font-size: 24px;
}

.border-radius {
  border-radius: 20px;
}

.subDetails {
  margin-top: 30px;
  padding-top: 4px;
}

@keyframes move {
  0% {
    left: 5px;
  }
  25% {
    left: 0;
  }
  50% {
    left: -5px;
  }
  75% {
    left: 0px;
  }
  100% {
    left: 5px;
  }
}

.youtubeBtn {
  font-size: 50px;
  padding: 5px 20px;
  line-height: 62px;
  border: 2px solid red;
  border-radius: 5px;
}

.youtubeBtn.v-icon.v-icon::after {
  background: none;
}
.deal-info-title {
  border-radius: 15px;
  padding: 10px;
  margin-top: 10px;
}
.deal-info-title-text {
  margin: 10px;
}

.GMap__Wrapper {
  margin-top: 10px;
  border-radius: 10px;
}

.col-img {
  width: 200px;
  height: 200px;
}

/* Header */
.dealHeaderContainer {
  padding: 0 20px;
}

.dealHeaderContainer .display-2 {
  font-size: 2.5rem!important;
}

.dealHeaderContainer p:nth-child(1) {
  margin-bottom: 20px;
}

.headerDetails {
  display: flex;
  justify-content: flex-end;
  margin-right: 40px;
  margin-left: 50px;
}

.headerDetails p:nth-child(1) {
  margin-right: 50px;
  margin-left: 50px;
}

/* main container */

.list-imgs {
  border-radius: 5px;
}

.carousel-img {
  width: 100%;
  border-radius: 25px;
}

.merchantDetails {
  padding: 10px;
  border: 1px solid #eee;
}

.merchantDetails img {
  width: 50px;
}

.merchantRestDetails {
  border: 1px solid #eee;
}

.merchantRestDetails a {
  color: black;
}

.priceListHeader {
  padding: 10px;
  margin-bottom: 40px;
  color: #eee;
  background: #F44336;
  border-radius: 25px 25px 0 0;
}

@media only screen and (max-width: 576px) {
  .mainSliderContainer {
    height: 350px;
  }

  .mainSliderContainer .carousel-img {
    height: 70%;
  }

  .listImgs .youtubeBtn {
    font-size: 20px;
    padding: 10px 15px;
    line-height: 15px;
  }
}
</style>
