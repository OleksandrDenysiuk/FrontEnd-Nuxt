<template>
  <div class="mt-10">
    <div class="display-1 ma-5">
      <v-icon
        size="40"
        color="light-blue darken-2"
        class="pr-3 shake-it"
        v-if="getLocale == 'en'"
      >
        mdi-trending-up</v-icon
      >{{ $t('home.trending') }}
      <v-icon
        size="40"
        color="light-blue darken-2"
        class="pr-3 shake-it"
        v-if="getLocale == 'ar'"
      >
        mdi-trending-up</v-icon
      >
    </div>
    <v-alert outlined color="light-blue darken-2" elevation="5">
      <v-container>
        <v-row no-gutters>
          <v-col
            class="px-1 pb-2"
            md="3"
            sm="12"
            v-for="(item, i) in getTreandingData"
            :key="i"
          >
            <card
              :deal="item"
              color="light-blue"
              kind="Trending"
              :price="item.prices"
              :rate="item.rate"
              discount="discount-green"
              :imgLink="item.images[0]"
              :id="item._id"
            />
          </v-col>
          <v-col cols="12" class="text-center mt-5">
            <nuxt-link to="/dealtype/trending" tag="button" class="btn btn-danger">
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
  name: 'trending',
  
  components: {
    card
  },
  //get premium data from vuex store
  computed: {
    getTreandingData() {
      return this.$store.getters.getTreandingData
    },
    getLocale() {
      return this.$store.getters.getLocale
    }
  }
}
</script>
