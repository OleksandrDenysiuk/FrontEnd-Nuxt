<template>
  <div>
    <div class="display-1 ma-5">
      <v-icon class="shake-it" size="40" color="yellow darken-2" v-if="getLocale == 'en'"
        >mdi-crown</v-icon
      >
      {{ $t('home.premium') }}
      <v-icon class="shake-it" size="40" color="yellow darken-2" v-if="getLocale == 'ar'"
        >mdi-crown</v-icon
      >
    </div>
    <v-alert outlined color="yellow darken-2" elevation="5">
      <v-container>
        <v-row no-gutters>
          <v-col
            class="px-1 pb-2"
            md="3"
            sm="12"
            v-for="(item, i) in getPremiumData"
            :key="i"
          >
            <card
              :deal="item"
              color="yellow"
              kind="Premium"
              :price="item.prices"
              :rate="item.rate"
              discount="discount-green"
              :imgLink="item.images[0]"
              :id="item._id"
            />
          </v-col>
          <!-- see more btn -->
          <v-col cols="12" class="text-center mt-5">
            <nuxt-link to="/dealtype/premium" tag="button" class="btn btn-danger">
              See More
            </nuxt-link>
          </v-col>
        </v-row>
      </v-container>
    </v-alert>
  </div>
</template>

<script>
import card from '~/components/index/card'
export default {
  name: 'premium',

  components: {
    card
  },
  // get premium data from vuex store
  computed: {
    getPremiumData() {
      return this.$store.getters.getPremiumData
    },
    getLocale() {
      return this.$store.getters.getLocale
    }
  }
}
</script>
