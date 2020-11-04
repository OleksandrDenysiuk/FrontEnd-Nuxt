<template>
  <div class="en-dealOptions">
    <div class="en-dealOptions-content">
      <div class="en-dealOptions-content-firstRow">
        <div class="en-dealOptions-content-firstRow-left">
          <div class="en-dealOptions-content-firstRow-left-icon">
            <i class="fas fa-fire"></i>
          </div>
          <div class="en-dealOptions-content-firstRow-left-title">
            Selling fast!
          </div>
        </div>
        <div class="en-dealOptions-content-firstRow-right">
          <div class="en-dealOptions-content-firstRow-right-icon">
            <i class="fas fa-star colored-star"></i>
            <i class="fas fa-star colored-star"></i>
            <i class="fas fa-star colored-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
          </div>
          <div class="en-dealOptions-content-firstRow-right-title">
            {{ deal.totalRates }} ratings
          </div>
        </div>
      </div>
      <div class="horiz-line"></div>
      <div class="en-dealOptions-content-secondRow">
        <div class="en-dealOptions-content-secondRow-content">
          <div class="en-dealOptions-content-secondRow-content-title">
            $0 for 3-Month Subscription to Pandora Premium
          </div>
          <!-- loop through price array and print every price with it's description -->
          <div
            class="en-dealOptions-content-secondRow-content-price"
            v-for="item in price"
            :key="item"
          >
            <div>{{ item.description }}</div>
            <span class="hide">{{ item.originalPrice }}$</span>
            {{ item.finalPrice }}$
          </div>
        </div>
      </div>
      <div class="horiz-line"></div>
      <div class="en-dealOptions-content-buttons">
        <button
          @click="goToCheckout"
          class="en-dealOptions-content-buttons-btn en-dealOptions-content-buttons-btn-buy"
        >
          Buy
        </button>
        <button
          class="en-dealOptions-content-buttons-btn en-dealOptions-content-buttons-btn-gift"
        >
          Give as a Gift
        </button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    deal: Array,
    price: String
  },

  methods: {
    //go to checkout page when click buy button
    goToCheckout() {
      this.$router.push({
        path: '/checkout',
        query: { dealId: this.$route.params.id, priceId: this.price[0]._id }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.en-dealOptions {
  &-content {
    display: flex;
    flex-flow: column;
    &-firstRow {
      width: 100%;
      display: flex;
      flex-flow: row;
      justify-content: space-around;
      &-left {
        color: rgb(216, 11, 79);

        &-icon {
          font-size: 20px;
          text-align: center;
        }
        &-title {
          font-size: 20px;
        }
      }
      &-right {
        margin-top: 10px;
        text-align: center;
      }
    }
    &-secondRow {
      text-align: center;
      margin-top: 10px;
      &-content {
        &-title {
          font-size: 20px;
        }
        &-price {
          margin-top: 20px;
          color: green;
          font-size: 20px;
          font-weight: 500;
          text-align: right;
        }
      }
    }
    &-buttons {
      margin-top: 20px;
      text-align: center;
      &-btn {
        width: 80%;
        border: none;
        font-size: 20px;
        font-weight: 400;
        border-radius: 10px;
        &:focus {
          outline: none;
        }
        &-buy {
          background-color: rgb(7, 170, 7);
          color: white;
          &:hover {
            background-color: green;
          }
        }
        &-gift {
          color: #23252b;
          margin-top: 10px;
          background-color: white;
          border: 1px solid grey;
          &:hover {
            background-color: rgb(247, 245, 245);
          }
        }
      }
    }
  }
}
.colored-star {
  color: rgb(216, 11, 79);
}
.horiz-line {
  align-self: center;
  width: 400px;
  height: 10px;
  border-bottom: 1px solid #e6e7e8;
}
</style>
