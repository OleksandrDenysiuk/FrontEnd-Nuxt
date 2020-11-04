<template>
  <premium />
</template>

<script>
import axios from 'axios';
import premium from '~/components/index/premium';
export default {
  components: {
    premium
  },

  data(){
    return {
      premiumDeals: []
    }
  },

  async created() {
    var allData = await this.$store.dispatch('getAllKindsData');
    await axios.get(process.env.baseUrl + '/api/categories').then((res) => {
      this.categories = res.data.data;
      this.premiumDeals = allData;
    });
  }
}
</script>