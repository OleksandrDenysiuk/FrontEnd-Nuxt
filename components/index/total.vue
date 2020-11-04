<template>
  <div class="mt-10">
    <div class="display-1 ma-5">
      <v-icon class="shake-it" size="40" color="red darken-2" v-if="getLocale == 'en'">
        mdi-layers</v-icon
      >
      {{ $t('home.total') }}
      <v-icon class="shake-it" size="40" color="red darken-2" v-if="getLocale == 'ar'">
        mdi-layers</v-icon
      >
    </div>
    <v-alert outlined color="red darken-2" elevation="5">
      <v-container>
        <v-row no-gutters>
          <v-col
            class="px-1 pb-2"
            md="3"
            sm="12"
            v-for="(item, i) in getAllData"
            :key="i"
          >
            <card
              :deal="item"
              color="red"
              kind="Recent Deals"
              :price="item.prices"
              :rate="item.rate"
              discount="discount-green"
              :imgLink="item.images[0]"
              :id="item._id"
            />
          </v-col>
          <v-col cols="12" class="text-center mt-5">
            <nuxt-link to="/dealtype/total" tag="button" class="btn btn-danger">
              See More
            </nuxt-link>
          </v-col>
        </v-row>
      </v-container>
    </v-alert>
    <observer @intersect="intersected" />
  </div>
</template>

<script>
import card from '~/components/index/card'
import observer from '~/components/observer'
import axios from 'axios'

export default {
  name: 'total',
  
  components: {
    observer,
    card,
    limit: 50
  },

  methods: {
    async intersected() {
      await axios
        .get(
          `${
            process.env.baseUrl
          }/api/deals?key=&skip=0&limit=${(this.limit += 50)}&rate=0&minPrice=4&maxPrice=10000&sortBy=low_to_high&categoryId=000000000000000000000000`
        )
        .then(res => {
          this.$store.commit('addAllDeals', [
            ...this.getAllData,
            ...res.data.deals
          ])
        })
    }
  },

  computed: {
    getAllData() {
      return this.$store.getters.getAllData
    },
    getLocale() {
      return this.$store.getters.getLocale
    }
  }
}
</script>

<style lang="scss" scoped>
.en-bestReviews {
  width: 100%;
  margin-top: 50px;
  &-header {
    font-size: 24px;
    font-weight: 900;
    margin-bottom: 30px;
  }
  &-content {
    display: flex;
    flex-flow: row;
    justify-content: space-between;
    flex-wrap: wrap;
  }
}
</style>
