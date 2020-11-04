<template>
  <div>
    <!-- AR -->
    <div class="text-right mx-3" v-if="getLocale == 'ar'">
      <div class="en-mainPage-content">
        <v-row>
          <v-col>
            <v-img class :src="pannerImg" aspect-ratio="9"></v-img>
          </v-col>
        </v-row>
        <!-- premium dealtype -->
        <premium />

        <v-row class="my-4">
          <v-col class="my-4 text-center" v-for="(category, index) in categories" :key="index">
            <v-btn router exact icon :to="`/category/${category._id}`">
              <v-avatar size="62">
                <img :src="category.icon" />
              </v-avatar>
            </v-btn>
            <p v-if="getLocale=='ar'" class="category-text">{{category.arDescription}}</p>
          </v-col>
        </v-row>

        <!-- trending dealtype -->
        <trending />
        <!-- topSelling dealtype -->
        <topSelling />
        <!-- bestReviews dealtype -->
        <bestReviews />
        <!-- total dealtype -->
        <total />
      </div>
    </div>

    <!-- EN -->
    <div class="mx-3" v-if="getLocale == 'en'">
      <div class="en-mainPage-content">
        <v-row>
          <v-col cols="12">
            <v-img :src="pannerImg" aspect-ratio="9"></v-img>
          </v-col>
        </v-row>
        <!-- premium dealtype -->
        <premium />

        <v-row class="my-4">
          <v-col class="my-4 text-center" v-for="(category, index) in categories" :key="index">
            <v-btn router exact icon :to="`/category/${category._id}`">
              <v-avatar size="62">
                <img :src="category.icon" />
              </v-avatar>
            </v-btn>
            <p class="category-text">{{category.description}}</p>
          </v-col>
        </v-row>
        <!-- trending dealtype -->
        <trending />

        <v-row>
          <v-col cols="12">
            <v-img :src="pannerImg" aspect-ratio="9"></v-img>
          </v-col>
        </v-row>

        <!-- topSelling dealtype -->
        <topSelling />
        <!-- bestReviews dealtype -->
        <bestReviews />
        <!-- total dealtype -->
        <total />
      </div>
    </div>
  </div>
</template>

<script>
import total from '~/components/index/total'
import premium from '~/components/index/premium'
import topSelling from '~/components/index/topSelling'
import bestReviews from '~/components/index/bestReviews'
import trending from '~/components/index/trending'
import axios from 'axios'
export default {
  async head() {
    const res = await axios.get(process.env.baseUrl + '/api/webSetting', {
      headers: {
        authorization:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZThjYjc3ODVlNGQ0YTFlMWNkZTc2YWMiLCJyb2xlIjoic3VwZXJBZG1pbiIsImlhdCI6MTU4ODE3NDM2MSwiZXhwIjoxNTg5MDM4MzYxfQ.K4835Mc_Nm3jzHkCBrkG_a0P2GhSkamlqsmp2F8BQRI',
      },
    })

    // console.log(res);

    if (this.getLocale == 'en') {
      return {
        title: res.data.data.enPageTitle,
      }
    } else {
      return {
        title: res.data.data.arPageTitle,
      }
    }
  },

  data() {
    return {
      pagesRequired: 10,
      categories: [],
      // pannerImg: require('../assets/images/Web-Intro-Eng.gif'),
    }
  },

  components: {
    total,
    premium,
    topSelling,
    trending,
    bestReviews,
  },

  async created() {
    await this.$store.dispatch('getAllKindsData')
    await this.$store.dispatch('getAllData')
    await axios.get(process.env.baseUrl + '/api/categories').then((res) => {
      this.categories = res.data.data
    })
    // await axios
    //   .get(process.env.baseUrl + '/api/webSetting', {
    //     headers: {
    //       'authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZThjYjc3ODVlNGQ0YTFlMWNkZTc2YWMiLCJyb2xlIjoic3VwZXJBZG1pbiIsImlhdCI6MTU4ODE3NDM2MSwiZXhwIjoxNTg5MDM4MzYxfQ.K4835Mc_Nm3jzHkCBrkG_a0P2GhSkamlqsmp2F8BQRI',
    //     },
    //   })
    //   .then((res) => {
    //     document.title = this.getLocale == 'en'
    //     ? res.data.data.enPageTitle
    //     : res.data.data.arPageTitle;
    //   })
  },

  computed: {
    getLocale() {
      return this.$store.getters.getLocale
    },

    pannerImg() {
      return this.getLocale == 'ar'
        ? require('../assets/images/Web-Intro.gif')
        : require('../assets/images/Web-Intro-Eng.gif')
    },
  },
}
</script>

<style >
.right-form {
  margin-left: 100px;
}
.category-text {
  margin-top: 15px;
}
</style>
