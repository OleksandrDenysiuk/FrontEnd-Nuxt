<template>
  <trending />
</template>

<script>
import axios from 'axios';
import trending from '~/components/index/trending';
export default {
  components: {
    trending
  },

  data(){
    return {
      trendingDeals: []
    }
  },

  async created() {
    var allData = await this.$store.dispatch('getAllKindsData');
    await axios.get(process.env.baseUrl + '/api/categories').then((res) => {
      this.categories = res.data.data;
      this.trendingDeals = allData;
    });
  }
}
</script>