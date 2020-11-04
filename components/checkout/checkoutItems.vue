<template>
  <div v-if="getUser">
    <v-card class="pa-5" elevation="5" v-if="!getPromoCode">
      <p>
        Enter promotion code to get
        <span class="green--text title">Discount</span> from yalla dealz
      </p>
      <v-text-field
        v-model="promoCode"
        :rules="promoCodeRules"
        label="Promo code"
        required
        color="red"
      ></v-text-field>
      <v-btn
        color="red darken-4"
        class="mr-4 white--text"
        block
        tile
        @click="promoCheck"
        >Apply</v-btn
      >
    </v-card>
  </div>
</template>

<script>
import generalInput from '~/components/general/generalInput.vue'
import axios from 'axios'
export default {
  data() {
    return {
      promoCode: '',
      promoCodeRules: [v => !!v || 'Promo code is required']
    }
  },
  components: {
    generalInput
  },
  methods: {
    promoCheck() {
      this.$store.commit('setPromoCode', this.promoCode)
      const config = {
        headers: {
          authorization: JSON.parse(localStorage.getItem('session')).token
        }
      }
      axios
        .post(
          process.env.baseUrl + '/api/user/pormotion',
          {
            code: this.promoCode
          },
          config
        )
        .then(() => {
          this.$store.commit('setPromoCode', this.promoCode)
        })
    }
  },
  computed: {
    getPromoCode() {
      return this.$store.getters.getPromoCode
    },
    getUser() {
      return this.$store.getters.getUser
    }
  }
}
</script>
