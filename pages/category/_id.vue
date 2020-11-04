<template>
  <div>
    <h1 class="display-1 text-center mt-5" v-if="getLocale == 'en' ">{{ categoryInfo.name }}</h1>
    <h1 class="display-1 text-center mt-5" v-if="getLocale == 'ar' ">{{ categoryInfo.arName }}</h1>
    <v-row>
      <v-col cols="3" class="m-2">
        <v-text-field label="search by  name " :rules="rules" v-model="name" hide-details="auto"></v-text-field>
      </v-col>

      <v-col cols="3" class="mt-5">
        <span class="caption text-uppercase">rating</span>
        <v-rating
          dense
          small
          color="red"
          background-color="red"
          v-model="rating"
          class="align-self-center"
        ></v-rating>
      </v-col>

      <v-col cols="1" class="mt-5">
        <v-menu  offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary" dark v-bind="attrs" v-on="on">price</v-btn>
          </template>

          <v-list>
            <v-list-item v-for="(price,index) in prices" :key="index" link @click="pricefilter=price">
              <v-list-item-title v-text="`....${price}`"></v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-col>
    </v-row>
    <v-container>
      <v-row no-gutters>
        <v-col class="px-1 pb-2" md="3" sm="12" v-for="(item, i) in items" :key="i">
          <card
            v-if="item.name === searchCategory || searchCategory ==='' "
            :deal="item"
            color="red"
            :kind="item.dealType"
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
    card,
  },
  data() {
    return {
      categoryInfo: {},
      category: [],
      color: 'low to high',
      colors: ['low to high', 'high to low'],
      searchCategory: '',
      name: '',
      rating: '',
      prices: [100, 500, 1000, 1000 ,"all"],
      pricefilter: "all"
    }
  },
  async created() {
    try {
      this.categoryInfo = (
        await axios.get(
          `${process.env.baseUrl}/api/categories/${this.$route.params.id}`
        )
      ).data.data
      this.category = (
        await axios.get(
          `${process.env.baseUrl}/api/deals?categoryId=` +
            `${this.$route.params.id}`
        )
      ).data.deals
      console.log('Category Details', this.category)
      console.log(this.categoryInfo.tags[1].toLowerCase())
    } catch (err) {
      console.error(err)
    }
  },
  computed: {
    items() {
      if (this.name != '' && this.rating == '') {
        return this.category.filter(
          (e) => e.name.includes(this.name) || e.arName.includes(this.name)
        )
      } else if (this.rating != '' && this.name == '') {
        return this.category.filter((e) => e.rate == this.rating)
      }
      else if(this.pricefilter!="all"){
        return this.category.filter((e) => e.prices[0].finalPrice <=this.pricefilter )
      }
      else {
        return this.category
      }
    },
    getLocale() {
      return this.$store.getters.getLocale
    },
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
