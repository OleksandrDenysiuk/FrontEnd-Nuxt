<template>
  <!-- <div> -->
    <div class="d-flex justify-center align-center " style="height:100%">
      <v-form ref="formTwo" v-model="valid" lazy-validation>
        <label for="quantity">Quantity</label>
        <v-text-field
          id="quantity"
          label="Quantity"
          single-line
          color="red"
          :value="quantity"
          :rules="quantityRules"
          required
          type="number"
        ></v-text-field>
        <v-text-field
          label="Promo code"
          single-line
          color="red"
          :value="promoCode"
        ></v-text-field>
        <v-btn
          :disabled="!valid"
          color="red darken-4"
          class="mr-4 white--text"
          @click="validate"
        >
          Continue
        </v-btn>
      </v-form>
    </div>
  <!-- </div> -->
</template>

<script>
import axios from 'axios'
export default {
  name: 'paymentMethodComponent',
  data: () => ({
    valid: true,
    quantity: '1',
    promoCode: '',
    // form validations
    quantityRules: [v => !!v || 'First name is required']
  }),
  props: {
    dealId: String,
    priceId: String,
    url: String
  },
  methods: {
    // check if form true then send the request
    validate() {
      if (this.$refs.formTwo.validate()) {
        const config = {
          headers: {
            authorization: JSON.parse(localStorage.getItem('session')).token
          }
        }
        axios
          .post(
            this.url,
            {
              deals: [
                {
                  deal: this.$store.getters.getCheckoutDealID,
                  priceId: this.$store.getters.getCheckoutPriceID,
                  quantity: this.quantity
                }
              ],
              promoCode: this.promoCode ? this.promoCode : null
            },
            config
          )
          .then(res => {
            this.$emit('passData', { dialog: true, data: res.data })
          })
      } else {
        this.valid = false
      }
    }
  }
}
</script>
