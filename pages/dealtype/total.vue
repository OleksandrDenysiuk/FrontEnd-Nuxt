<template>
  <total />
</template>

<script>
import axios from 'axios';
import total from '~/components/index/total';
export default {
  components: {
    total
  },

  data(){
    return {
      totalDeals: []
    }
  },

  async created() {
    var allData = await this.$store.dispatch('getAllKindsData');
    await axios.get(process.env.baseUrl + '/api/categories').then((res) => {
      this.categories = res.data.data;
      this.totalDeals = allData;
    });
  }
}
</script>