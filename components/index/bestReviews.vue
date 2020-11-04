<template>
  <div class="mt-10">
    <div class="display-1 ma-5">
      <v-icon
        size="40"
        class="pr-3 shake-it"
        color="teal darken-2"
        v-if="getLocale == 'en'"
        >mdi-sort-reverse-variant</v-icon
      >{{ $t('home.bestReview') }}
      <v-icon
        size="40"
        class="pr-3 shake-it"
        color="teal darken-2"
        v-if="getLocale == 'ar'"
        >mdi-sort-reverse-variant</v-icon
      >
    </div>
    <v-alert outlined color="teal darken-2" elevation="5">
      <v-container>
        <v-row no-gutters>
          <v-col
            class="px-1 pb-2"
            md="3"
            sm="12"
            v-for="(item, i) in getbestReviewData"
            :key="i"
          >
            <card
              :deal="item"
              color="teal"
              kind="Best Rated"
              :price="item.prices"
              :rate="item.rate"
              discount="discount-green"
              :imgLink="item.images[0]"
              :id="item._id"
            />
          </v-col>
          <v-col cols="12" class="text-center mt-5">
            <nuxt-link to="/dealtype/bestReviews" tag="button" class="btn btn-danger">
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
  name: 'bestReviews',
  components: {
    card
  },
  //get best review data from vuex store
  computed: {
    getbestReviewData() {
      return this.$store.getters.getTreandingData
    },
    getLocale() {
      return this.$store.getters.getLocale
    }
  }
}
</script>
