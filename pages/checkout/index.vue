<template>
  <div class="en-checkoutPage">
    <div class="en-checkoutPage-content">
      <div class="en-checkoutPage-content-title">
        <p>CHECKOUT WIZARD</p>
      </div>
      <div class="en-checkoutPage-content-main">
        
        <!-- XX this shouldn't be here XX -->
        <!-- promo code -->
        <!-- <div class="en-checkoutPage-content-main-right">
          <checkoutItems />
        </div> -->

        <!-- payment method -->
        <div class="en-checkoutPage-content-main-left">
          <mainForms />
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import mainForms from '~/components/checkout/mainForms.vue'
import checkoutItems from '~/components/checkout/checkoutItems.vue'
export default {
  components: {
    mainForms,
    checkoutItems,
  },
}
</script>

<style lang="scss" scoped>
.en-checkoutPage {
  display: flex;
  flex-flow: row;
  text-align: center;
  justify-content: center;
  &-content {
    width: 100%;
    display: flex;
    flex-flow: column;
    &-title {
      // margin-top: 100px;
      font-size: 30px;
      text-align: center;
      // padding-left: 50px;
    }
    &-main {
      width: 90%;
      margin-top: 15px;
      display: flex;
      flex-flow: column;
      justify-content: center;
      margin: auto;
      &-left {
        width: 100%;
        margin: auto;
      }
      &-right {
        margin: 60px auto;
        padding-left: 40px;
      }
    }
  }
}

@media only screen and (max-width: 576px) {
  .en-checkoutPage  .en-checkoutPage-content-main .en-checkoutPage-content-main-left {
    width: 80%;
    margin: auto;
    text-align: center;
  }

  .en-checkoutPage  .en-checkoutPage-content-main .en-checkoutPage-content-main-right {
    width: 89%;
    margin: 0px auto 50px 0;
  }

  .en-checkoutPage-content-title {
    width: 90%;
    margin: 50px auto;
    text-align: center;
  }
}
</style>
