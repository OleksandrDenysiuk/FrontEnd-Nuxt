<template>
  <div>
    <v-container>
      <v-row>
        <!-- profile left side -->
        <v-col md="3" cols="12">
          <v-card tile>
            <v-list flat>
              <v-list-item-group v-model="item">
                <v-list-item
                  v-for="(item, i) in items"
                  :key="i"
                  color="red"
                  link
                  selectable
                  :to="'/profile/' + item.id"
                >
                  <v-list-item-icon>
                    <v-icon v-text="item.icon"></v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title v-text="item.text"></v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list-item-group>
            </v-list>
          </v-card>
        </v-col>

        <!-- Account -->
        <v-col md="9" cols="12" v-if="$route.params.id == 0">
          <p class="display-1 text-capitalize ml-5">account details</p>
          <v-card
              class="mx-auto"
              max-width="400"
            >
              <v-img
                class="white--text align-end"
                height="200px"
                :src="getUserImage"
              >
                <v-card-title class="black--text">{{ userData.firstName }} {{ userData.lastName }}</v-card-title>
              </v-img>

              <v-card-subtitle class="pb-0">Personal Info</v-card-subtitle>

              <v-card-text class="text--primary">
                <div>Here you can edit your personal information details.</div>
                <div>
                  <v-icon small color="purple darken-2">mdi-dialpad</v-icon>
                  {{ userData.phone }}
                </div>
                <div>
                  <v-icon small color="teal darken-2">mdi-email</v-icon>
                  {{ userData.email }}
                </div>
              </v-card-text>

              <v-card-actions>
                <v-btn
                  color="orange"
                  text
                >
                  Edit
                </v-btn>
              </v-card-actions>
            </v-card>
        </v-col>

        <!-- Cart -->

        <v-col md="9" cols="12" v-if="$route.params.id == 1">
          <p class="display-1 text-capitalize ml-5">my cart list</p>
          <v-card class="my-5" elevation="5" outlined v-for="(item, i) in getCart.deals" :key="i">
            <v-list-item three-line>
              <v-list-item-content>
                <v-list-item-title class="headline mb-1">
                  {{item.deal.name}}
                </v-list-item-title>
                <v-list-item-subtitle>
                  {{item.deal.description}}
                </v-list-item-subtitle>
                <v-list-item-subtitle
                  >Quantity : {{ item.quantity }}
                </v-list-item-subtitle>
                <!-- <v-list-item-subtitle>
                  <span class="hide">
                    {{ item.deal.prices[i].originalPrice }}$
                  </span>
                  <span class="subtitle-1">
                    {{ item.deal.prices[i].finalPrice }}$
                  </span>
                  <span class="title pulse-green">
                    save
                    {{(
                      100 -
                        (item.deal.prices[i].finalPrice /
                          item.deal.prices[i].originalPrice) *
                          100).toFixed(2)
                    }}%
                  </span>
                </v-list-item-subtitle> -->
              </v-list-item-content>

              <v-img
                height="150"
                width="100"
                :src="item.deal.images[0]"
              ></v-img>
            </v-list-item>

            <v-card-actions>
              <v-btn text color="red" @click="deleteDeal(item)">Remove</v-btn>
            </v-card-actions>
          </v-card>
          <v-form>
            <v-container>
            <v-row>
               <v-text-field
                  v-model = "code"
                  color="red"
                  
                  required
                ></v-text-field>
            <div class="my-2">
                <v-btn depressed small color="primary" @click="addCodePromotion()">Send Code</v-btn>
            </div>
            </v-row>
            </v-container>
          </v-form>
         
          <v-text-field   
            label="Total price:"
            v-model="totalPrice"
            filled
            disabled
            required
          ></v-text-field>
        </v-col>

        <!-- wish list -->
        <v-col md="9" cols="12" v-if="$route.params.id == 2">
          <p class="display-1 text-capitalize ml-5">my Wish list</p>
          <v-card
            elevation="5"
            class="my-5"
            outlined
            v-for="(item, i) in getWishList"
            :key="i"
          >
            <v-list-item three-line>
              <v-list-item-content>
                <v-list-item-title class="headline mb-1">{{
                  item.dealId.name
                }}</v-list-item-title>
                <v-list-item-subtitle>{{
                  item.dealId.description
                }}</v-list-item-subtitle>

                <v-list-item-subtitle>
                  <span class="hide"
                    >{{ item.dealId.prices[0].originalPrice }}$</span
                  >
                  <span class="subtitle-1"
                    >{{ item.dealId.prices[0].finalPrice }}$</span
                  >
                  <span class="title pulse-green"
                    >save
                    {{(
                      100 -
                        (item.dealId.prices[0].finalPrice /
                          item.dealId.prices[0].originalPrice) *
                          100).toFixed(2)
                    }}%</span
                  >
                </v-list-item-subtitle>
              </v-list-item-content>

              <v-img
                height="150"
                width="100"
                :src="item.dealId.images[0]"
              ></v-img>
            </v-list-item>

            <v-card-actions>
              <v-btn text color="red">Add to cart</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>

        <!-- Coupons -->
        <v-col md="9" cols="12" v-if="$route.params.id == 3">
          <p class="display-1 text-capitalize ml-5">my Cuopons list</p>
          <div v-for="(item, i) in getCuopons" :key="i">
            <v-card elevation="5" class="my-5" outlined>
              <v-list-item three-line>
                <v-list-item-content>
                  <v-list-item-title class="headline mb-1">{{
                    item.name
                  }}</v-list-item-title>
                  <v-list-item-subtitle>{{
                    item.description
                  }}</v-list-item-subtitle>
                </v-list-item-content>

                <v-img height="150" width="100" :src="item.images[0]"></v-img>
              </v-list-item>

              <v-card-actions>
                <v-btn text color="red" @click="showCoupons"
                  >Show coupons</v-btn
                >
              </v-card-actions>
            </v-card>
            <v-dialog v-model="dialog">
              <v-card>
                <v-card-title class="headline">Coupons</v-card-title>
                <v-container>
                  <v-row>
                    <v-col cols="6">
                      <p class="title">Active</p>
                      <div v-for="(coupon, index) in item.coupons" :key="index">
                        <div
                          v-if="coupon.status == 'active'"
                          class="subtitle-1"
                        >
                          <div>Security code : {{ coupon.securityCode }}</div>

                          <qrcode
                            ref="coupon"
                            :value="coupon.code"
                            :options="{ width: 200 }"
                          ></qrcode>
                        </div>
                      </div>
                    </v-col>
                    <v-col cols="6"
                      ><p class="title">Redeem</p>
                      <div v-for="(coupon, index) in item.coupons" :key="index">
                        <div
                          v-if="coupon.status == 'redeem'"
                          class="subtitle-1"
                        >
                          <div>Security code : {{ coupon.securityCode }}</div>

                          <qrcode
                            ref="coupon"
                            :value="coupon.code"
                            :options="{ width: 200 }"
                          ></qrcode>
                        </div>
                      </div>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card>
            </v-dialog>
          </div>
        </v-col>

        <!-- My Wallet -->
        <v-col md="9" cols="12" v-if="$route.params.id == 4">
          <p class="display-1 text-capitalize ml-5">My points</p>
          <v-card class="pa-5">
            <p class="title font-weight-light">
              you have : <span class="green--text">{{ userData.points }}</span>
            </p>
          </v-card>
        </v-col>

        <!-- My Points -->
        <v-col md="9" cols="12" v-if="$route.params.id == 5">
          <p class="display-1 text-capitalize ml-5">My wallet</p>
          <v-card class="pa-5">
            <p class="title font-weight-light">
              you have : <span class="green--text">{{ userData.wallet }}</span>
            </p>
          </v-card>
        </v-col>

     
      </v-row>
    </v-container>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  data() {
    return {
      dialog: false,
      userData: {},
      item: '',
      code:'',
      totalPrice:0,
      items: [
        { text: 'Account', icon: 'mdi-account', id: 0 },
        { text: 'Cart', icon: 'mdi-cart', id: 1 },
        { text: 'Wish list', icon: ' mdi-heart-outline', id: 2 },
        { text: 'Coupons', icon: ' mdi-ticket-account ', id: 3 },
        { text: 'My Wallet', icon: '  mdi-wallet ', id: 4 },
        { text: 'My Points', icon: '  mdi-currency-usd', id: 5 }
      ],
    }
  },

  created() {
    if (!globalThis.localStorage || !JSON.parse(localStorage.getItem('session') || '{}').token)
      this.$router.push('/login')
  },

  mounted() {
    this.item = this.$route.params.id
    if (
      this.$route.params.id == 0 ||
      this.$route.params.id == 4 ||
      this.$route.params.id == 5
    ) {
      const config = {
        headers: {
          authorization: JSON.parse(localStorage.getItem('session')).token
        }
      }
      axios.get(process.env.baseUrl + '/api/user/profile', config).then(res => {
        this.userData = res.data.data
      })
    }
    if (this.$route.params.id == 1) {
      this.$store.dispatch('getCart')
      console.log(this.getCart);
      this.totalPrice = this.getCart.totalPrice
    }
    if (this.$route.params.id == 2) {
      this.$store.dispatch('getWishList')
    }
    if (this.$route.params.id == 2) {
      this.$store.dispatch('getCuopons')
    }
  },

  methods: {
    showCoupons() {
      this.dialog = true
    },
    deleteDeal(item) {
      this.$store.dispatch('removeDealFromCart', item.deal._id)  
    },
    addCodePromotion(){
      console.log(this.code);
      this.$store.dispatch('addPromotion', {"code":this.code})
    }
  },

  computed: {
    getUserImage() {
      return this.userData && this.userData.image ||
        require('~/assets/images/default-user-image.jpg')
    },

    getCart() {
      return this.$store.getters.getCart
    },

    getWishList() {
      return this.$store.getters.getWishList
    },

    getCuopons() {
      return this.$store.getters.getCuopons
    },
    
    getUser() {
      return this.$store.getters.getUser
    }
  }
}
</script>
