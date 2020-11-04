<template>
  <div>

    <h1 class="display-1 text-center mt-5"> {{dealsCount}} {{'Deals Found'}}</h1>
    <v-container>
      <v-row no-gutters>
        {{dealsItem}}
          <v-col
            class="px-1 pb-2"
            md="3"
            sm="12"
            v-for="(item, i) in deals"
            :key="i"
          >
            <card
              :deal="item"
              color="red"
              kind="Top Selling"
              :price="item.prices"
              :rate="item.rate"
              discount="discount-green"
              :imgLink="item.images[0]"
              :id="item._id"
            />
          </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import axios from 'axios'
import card from '~/components/index/card'
export default {
  components: {
    card
  },
  data() {
    return {
      deals: {},
      locationMathcedDeals : {},
      dealsCount : 'No',
    }
  },
  async created() {
  },
  methods:{
  },
  computed: {
    dealsItem: function() {
      if (this.$route.query.deal) {
        axios.get(
            `${process.env.baseUrl}/api/deals?key=${this.$route.query.deal}`
        ).then(res => {
           this.deals =  res.data.deals;
           if (this.deals.length != 0) {
            this.dealsCount = this.deals.length 
           }
        })
      }
      if (this.$route.query.deal_location) {
        axios.get(
            `${process.env.baseUrl}/api/deals`
        ).then(res => {
          var tempDeals  = []
          var searchText = this.$route.query.deal_location
          if (res.data.deals.length != 0) {
           res.data.deals.forEach( function(element, index) {
             if (element.merchant.address.indexOf(searchText) !== -1) {
                tempDeals.push(element)
             }
           });
           this.deals = tempDeals
           this.dealsCount = tempDeals.length
          }
        })
      }
    }
  },
}
</script>

<style>
.category-img {
  height: 150px;
  width: 150px;
  margin: auto;
  margin-bottom: 15px;
}
.info-area p {
  text-align: center;
}
.search-bar {
  display: block;
  width: 100%;
  border: 1.5px solid red;
  box-shadow: 3px 4px 4px;
  border-radius: 15px;
  padding-left: 25px;
  padding-top: 10px;
  padding-bottom: 10px;
}
textarea:focus,
input:focus {
  outline: none;
}
</style>
