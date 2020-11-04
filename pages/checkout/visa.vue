<template>
  <div>
    <paymentMethodComponent
      :dealId="$route.query.dealId"
      :priceId="$route.query.priceId"
      :url="`${getBaseUrl}/api/weaccept/payment/credit/checkout`"
      @passData="$event => this.setData($event)"
    />
    <v-divider></v-divider>
    <iframe
      name="iframe1"
      :src="url"
      frameborder="0"
      height="500"
      width="1500"
      target="iframe1"
      v-if="url !=''"
    ></iframe>

    <!-- card appear after submit to show the result -->
    <v-dialog v-model="dialog" max-width="290">
      <v-card>
        <v-card-text>
          Something Went Wrong
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red" text @click="closeDialog">
            close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import axios from 'axios'
import paymentMethodComponent from '~/components/checkout/paymentMethod'
export default {
  components: { paymentMethodComponent },
  data() {
    return {
      dialog: false,
      data: {},
      url:''
    }
  },
  methods: {
    //to set data that come from component
    setData(data) {
      if (data.data.token != '') {
        var tokenReceived = data.data.token;
        this.url = "https://accept.paymobsolutions.com/api/acceptance/iframes/6112?payment_token="+ tokenReceived
        this.$vuetify.goTo(200)
      } else {
         this.dialog = true
      }
        //     // this.dialog = data.dialog
        //     this.data = data.data
        // const config = {
        //     headers: {
        //       authorization: JSON.parse(localStorage.getItem('session')).token
        //     }
        // }
        // axios
        //   .post(
        //     process.env.baseUrl + '/api/weaccept/payment/credit/checkout',
        //     {
        //       token: tokenReceived
        //     },
        //     config
        //   )
        //   .then(res => {
        //     console.log('THis is the response',res)
        //     this.$vuetify.goTo(1000)
        //     // this.dialog = data.dialog
        //     this.data = data.data
        //   })
        //   .catch((err) => {
        //     this.dialog = true
        //   })
    },
    closeDialog() {
      this.dialog = false
      this.$store.commit('setCheckoutDealID', '')
      this.$store.commit('setCheckoutPriceID', '')
      this.$router.push('/')
    }
  },
  computed: {
    getBaseUrl() {
      return process.env.baseUrl
    },
  }
}
</script>
