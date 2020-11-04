<template>
  <div class="en-recently">
    <div class="en-recently-header">
      Recently visting
    </div>
    <div class="en-recently-content">
      <recentlyCard
        discount="discount-green"
        imgLink="https://source.unsplash.com/random?sig=29531111"
      />
      <recentlyCard
        discount="discount-red"
        imgLink="https://source.unsplash.com/random?sig=291303"
      />
      <recentlyCard
        discount="discount-green"
        imgLink="https://source.unsplash.com/random?sig=23303"
      />
    </div>
  </div>
</template>

<script>
import recentlyCard from '~/components/deal/recentlyCard'
export default {
  components: {
    recentlyCard
  }
}
</script>

<style lang="scss" scoped>
.en-recently {
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
