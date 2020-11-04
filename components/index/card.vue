<template>
  <div>
    <v-hover>
      <v-card max-width="400" slot-scope="{ hover }" :class="`mx-auto elevation-${hover ? 12 : 2}`">
        <v-img
          @click="goTo(id,encodeURIComponent(deal.name.replace(/\s/gi,'-')))"
          class="white--text align-end"
          height="200px"
          :src="imgLink"
          :aspect-ratio="16 / 9"
        ></v-img>

        <v-card-subtitle
          :class="`pb-0 ${color}--text text--darken-2 subtitle-2`">
          {{ kind }}
        </v-card-subtitle>
        <!-- title form card en-->
        <v-card-subtitle class="pb-0 pt-0 title-card" v-if="getLocale ==='en'">{{deal.name}}</v-card-subtitle>
        <v-card-subtitle class="pb-0 pt-0 title-card" v-if="getLocale ==='ar'">{{deal.arName}}</v-card-subtitle>
        <!-- title form card ar -->
        <v-card-text class="text--primary" v-bind:style="getLocale =='ar' ? 'direction:rtl':''">
          <span class="hide title">{{ price[0].originalPrice }}  {{ $t('currency.egp') }}  </span>
          <span class="headline"> {{ price[0].finalPrice }}  {{ $t('currency.egp') }} </span>
          <div class="headline pulse-green">
            {{ $t('currency.offer') }}
            {{ (100 - (price[0].finalPrice / price[0].originalPrice) * 100).toFixed(2) }}{{ $t('currency.pricant') }}
          </div>

          <!-- make review -->
          <!-- <v-rating
            dense
            small
            color="red"
            background-color="red"
            v-model="ratingReview"
            v-if="getUser"
            @input="addRatingReview(deal._id)"
          ></v-rating> -->

          <!-- just show review -->
          <v-rating
            dense
            small
            color="red"
            background-color="red"
            @input="addRatingReview(deal._id)"
          ></v-rating>
          
        </v-card-text>
        <!-- <h1>{{deal.name.replace(/\s%/gi,'-')}}</h1> -->
        <v-card-actions class="text-right">
          <nuxt-link
            :to="'/deal/' + id + '/' +encodeURIComponent(deal.name.replace(/\s/gi,'-'))"
            style="text-decoration:none"
            v-if="getLocale == 'en'"
          >
            <v-btn color="red" text>
              {{ $t('card.btn') }}
            </v-btn>
          </nuxt-link>
          <v-divider dark v-if="getLocale == 'en'"></v-divider>
          <v-btn text color="red" icon @click="addToCart(id)"
            ><v-icon size="20">mdi-cart</v-icon></v-btn
          >

          <v-btn text color="red" icon @click="addToWish(id)"
            ><v-icon size="20">mdi-heart</v-icon></v-btn
          >
          <v-divider dark v-if="getLocale == 'ar'"></v-divider>
          <nuxt-link
            :to="'/deal/' + id + '/' +encodeURIComponent(deal.name.replace(/\s/gi,'-'))"
            style="text-decoration:none"
            v-if="getLocale == 'ar'"
          >
            <v-btn color="red" text>
              {{ $t('card.btn') }}
            </v-btn>
          </nuxt-link>
        </v-card-actions>
      </v-card>
    </v-hover>



    <!-- dialog appear if add to wish clicked -->
    <v-dialog v-model="dialog" width="500">
      <v-card>
        <v-card-text class="pa-5"> {{ responseAddMessage }} </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red" text @click="dialog = false" block>
            close
          </v-btn>
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
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      dialog: false,
      responseAddMessage: '',
      ratingResponseMsg:"",
      dialogRating: false,
      dialogRatingResponse: '',
      rateForDeal:"",
      rating_comment:"",ratingReview:"",
    }
  },

  props: {
    deal: Object,
    imgLink: String,
    discount: String,
    price: Array,
    rate: Number,
    id: String,
    kind: String,
    color: String,
  },

  computed: {
    getLocale() {
      return this.$store.getters.getLocale
    },
    getUser() {
      return this.$store.getters.getUser
    }
  },

  methods: {
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
    },

    addToWish(id) {
      const config = {
        headers: {
          authorization: JSON.parse(localStorage.getItem('session')).token
        }
      }
      if (this.getUser) {
        axios
          .post(
            process.env.baseUrl + '/api/user/wishList',
            {
              dealId: id
            },
            config
          )
          .then(res => {
            this.responseAddMessage = res.data.message
            this.dialog = true
          })
          .catch(err => {
            this.responseAddMessage = 'Error occured adding to wish list'
            this.dialog = true
          })
      } else {
        this.$router.push('/login')
      }
    },

    addToCart(id) {
      const config = {
        headers: {
          authorization: JSON.parse(localStorage.getItem('session')).token
        }
      }
      if (this.getUser) {
        axios
          .post(
            process.env.baseUrl + '/api/user/cart',
            {
              deal: id,
              priceId: this.price[0]._id,
              quantity: 1,
            },
            config
          )
          .then(res => {
            this.responseAddMessage = res.data.message
            this.dialog = true
          })
          .catch(err => {
            this.responseAddMessage = 'Error occured adding to cart'
            this.dialog = true
          })
      } else {
        this.$router.push('/login')
      }
    },

    goTo(id,dealName) {
      this.$router.push('/deal/' + id+'/'+dealName)
    }
  }
}
</script>

<style scoped>
.title-card{
  font-weight: 700 !important;
    line-height: 24px !important;
    color: rgba(0, 0, 0, 0.87) !important;
}
.description-card{
      width: 100% !important;
    text-overflow: ellipsis !important;
    overflow: hidden !important;
    white-space: nowrap !important;
}
 .pulse-green {
  font-size: 1.3rem !important;
 }
  .v-application .title{
   font-size: 18px !important;
    font-weight: 400 !important;
    color: #707174!important;
  }
  
    
  
</style>