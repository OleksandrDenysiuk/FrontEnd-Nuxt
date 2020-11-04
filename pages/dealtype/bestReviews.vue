<template>
  <bestReviews />
</template>

<script>
import axios from 'axios';
import bestReviews from '~/components/index/bestReviews';
export default {
  components: {
    bestReviews
  },

  data(){
    return {
      bestReviewsDeals: []
    }
  },

  async created() {
    var allData = await this.$store.dispatch('getAllKindsData');
    await axios.get(process.env.baseUrl + '/api/categories').then((res) => {
      this.categories = res.data.data;
      this.bestReviewDeals = allData;
    });
  }
}
</script>