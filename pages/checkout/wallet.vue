<template>
  <div>
    <paymentMethodComponent
      :dealId="$route.query.dealId"
      :priceId="$route.query.priceId"
      :url="`${getBaseUrl}/api/user/wallet/checkout`"
      @passData="$event => this.setData($event)"
    />
    <!-- card appear after submit to show the result -->
    <v-dialog v-model="dialog" max-width="290">
      <v-card>
        <v-card-text>
          {{ this.data.message }}
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red" text @click="closeDialog()">
            close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import paymentMethodComponent from '~/components/checkout/paymentMethod'
export default {
  components: { paymentMethodComponent },
  data() {
    return {
      dialog: false,
      data: {}
    }
  },
  methods: {
    //to set data that come from component
    setData(data) {
      this.dialog = data.dialog
      this.data = data.data
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
    }
  }
}
</script>
