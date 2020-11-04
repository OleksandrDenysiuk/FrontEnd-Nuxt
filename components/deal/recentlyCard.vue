<template>
  <div class="en-recentlyCard">
    <div class="en-recentlyCard-content">
      <div class="en-recentlyCard-content-header">
        <img class="en-recentlyCard-content-header-img" :src="imgLink" alt />
        <div class="en-recentlyCard-content-header-name">
          ABCmouse.com
          <div class="en-recentlyCard-content-header-name-stars">
            <i class="fas fa-star colored-star"></i>
            <i class="fas fa-star colored-star"></i>
            <i class="fas fa-star "></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
          </div>
        </div>
                     <div class="en-recentlyCard-content-header-price">
                 <div class="en-recentlyCard-content-header-price-strike">
                     <span class="en-recentlyCard-content-header-price-strike-old">
             $20.00
                     </span>
                     </div>
                     <div class="en-recentlyCard-content-header-price-new">
                         10$
                     </div>
                      <div :class="discount" class="en-recentlyCard-content-header-price-discount">
                         20%
                     </div>
          </div>
            <div class="en-recentlyCard-content-header-company">
               Fawzi's international Company
          </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    imgLink: String,
    discount: String,
  }
};
</script>


<style lang="scss" scoped>
.en-recentlyCard {
  display: inline-block;
  margin-bottom: 60px;
  &-content {
    width: 300px;
    &-header {
      &-img {
        width: 300px;
        height: 200px;
        border-radius: 20px;
      }
      &-name {
          display: flex;
          flex-flow: row;
          justify-content: space-between;
          width: 300px;
          font-weight:900;
          &-stars{
              font-size: 12px;
          }
      }
      &-price{
          display: flex;
          flex-flow: row;
          align-items: center;

          &-strike{
              color: #CD0C4B;
               text-decoration: line-through;
               &-old{
       color: rgb(207, 207, 207);
                 font-size: 20px;
          }
          }
          &-new{
              margin-left: 15px;
              color: rgb(16, 185, 16) ;
                        font-size: 20px;
          }
          &-discount{
              margin-left: 20px;
              font-size: 16px;
              padding-top: 1px;
              width: 60px;
              text-align: center;
              border-radius: 10px;
          }
         
      }
      &-company{
        margin-top: -5px;
        font-size: 14px;
          color: #22252A;
      }
    }
  }
}
.colored-star{
    color: rgb(216, 11, 79);
}
.discount-green{
      background-color: rgb(157, 255, 0);
      color: black;
}
.discount-red{
      background-color: rgb(238, 20, 20);
      color: white;
}
</style>