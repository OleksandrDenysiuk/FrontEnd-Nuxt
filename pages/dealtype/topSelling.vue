<template>
  <topSelling />
</template>

<script>
import axios from 'axios';
import topSelling from '~/components/index/topSelling';
export default {
  components: {
    topSelling
  },

  data(){
    return {
      topSellingDeals: []
    }
  },

  async created() {
    var allData = await this.$store.dispatch('getAllKindsData');
    await axios.get(process.env.baseUrl + '/api/categories').then((res) => {
      this.categories = res.data.data;
      this.topSellingDeals = allData;
    });
  }
}
</script>