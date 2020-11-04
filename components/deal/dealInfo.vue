<template>
  <div class="en-dealInfo">
    <div class="en-dealInfo-content">
      <div class="en-dealInfo-content-categories">
        <span>
          <nuxt-link to="/">Local</nuxt-link>›
          <nuxt-link to="/">Health & Fitness</nuxt-link>›
          <nuxt-link to="/">Weight Loss</nuxt-link>›
          <nuxt-link to="/">Nutritionist</nuxt-link>
        </span>
      </div>
      <div class="en-dealInfo-content-mainInfo">
        <div class="en-dealInfo-content-mainInfo-title">Daily Burn</div>
        <div class="en-dealInfo-content-mainInfo-stars">
          <i class="fas fa-star colored-star"></i>
          <i class="fas fa-star colored-star"></i>
          <i class="fas fa-star colored-star"></i>
          <i class="fas fa-star"></i>
          <i class="fas fa-star"></i>
        </div>
      </div>
      <div class="en-dealInfo-content-images">
        <div class="en-dealInfo-content-images-mainShow">
          <!-- images -->
          <div
            @mouseover="options = true"
            @mouseleave="options = false"
            class="en-dealInfo-content-images-mainShow-image"
            v-if="imageIndex == 1"
            :style="{ 'background-image': 'url(' + deal.images[0] + ')' }"
          >
            <div
              v-show="options"
              class="en-dealInfo-content-images-mainShow-image-options"
            >
              <div
                class="en-dealInfo-content-images-mainShow-image-options-left"
                @click="imageLeft"
              >
                <i class="fas fa-arrow-left"></i>
              </div>
              <div
                class="en-dealInfo-content-images-mainShow-image-options-right"
                @click="imageRight"
              >
                <i class="fas fa-arrow-right"></i>
              </div>
            </div>
          </div>
          <div
            @mouseover="options = true"
            @mouseleave="options = false"
            class="en-dealInfo-content-images-mainShow-image"
            v-if="imageIndex == 2"
            style="background-image: url('https://source.unsplash.com/random?sig=25210')"
          >
            <div
              v-show="options"
              class="en-dealInfo-content-images-mainShow-image-options"
            >
              <div
                class="en-dealInfo-content-images-mainShow-image-options-left"
                @click="imageLeft"
              >
                <i class="fas fa-arrow-left"></i>
              </div>
              <div
                class="en-dealInfo-content-images-mainShow-image-options-right"
                @click="imageRight"
              >
                <i class="fas fa-arrow-right"></i>
              </div>
            </div>
          </div>
          <div
            @mouseover="options = true"
            @mouseleave="options = false"
            class="en-dealInfo-content-images-mainShow-image"
            v-if="imageIndex == 3"
            style="background-image: url('https://source.unsplash.com/random?sig=222229')"
          >
            <div
              v-show="options"
              class="en-dealInfo-content-images-mainShow-image-options"
            >
              <div
                class="en-dealInfo-content-images-mainShow-image-options-left"
                @click="imageLeft"
              >
                <i class="fas fa-arrow-left"></i>
              </div>
              <div
                class="en-dealInfo-content-images-mainShow-image-options-right"
                @click="imageRight"
              >
                <i class="fas fa-arrow-right"></i>
              </div>
            </div>
          </div>
          <div
            @mouseover="options = true"
            @mouseleave="options = false"
            class="en-dealInfo-content-images-mainShow-image"
            v-if="imageIndex == 4"
            style="background-image: url('https://source.unsplash.com/random?sig=23210')"
          >
            <div
              v-show="options"
              class="en-dealInfo-content-images-mainShow-image-options"
            >
              <div
                class="en-dealInfo-content-images-mainShow-image-options-left"
                @click="imageLeft"
              >
                <i class="fas fa-arrow-left"></i>
              </div>
              <div
                class="en-dealInfo-content-images-mainShow-image-options-right"
                @click="imageRight"
              >
                <i class="fas fa-arrow-right"></i>
              </div>
            </div>
          </div>
          <div
            @mouseover="options = true"
            @mouseleave="options = false"
            class="en-dealInfo-content-images-mainShow-image"
            v-if="imageIndex == 5"
            style="background-image: url('https://source.unsplash.com/random?sig=23000')"
          >
            <div
              v-show="options"
              class="en-dealInfo-content-images-mainShow-image-options"
            >
              <div
                class="en-dealInfo-content-images-mainShow-image-options-left"
                @click="imageLeft"
              >
                <i class="fas fa-arrow-left"></i>
              </div>
              <div
                class="en-dealInfo-content-images-mainShow-image-options-right"
                @click="imageRight"
              >
                <i class="fas fa-arrow-right"></i>
              </div>
            </div>
          </div>
          <!-- end images -->
        </div>
        <div class="en-dealInfo-content-images-thumb">
          <div
            :class="{ activeThumb: imageIndex == 1 }"
            class="en-dealInfo-content-images-thumb-image"
          >
            <img
              src="https://source.unsplash.com/random?sig=239310"
              class="en-dealInfo-content-images-thumb-image-img"
            />
          </div>
          <div
            :class="{ activeThumb: imageIndex == 2 }"
            class="en-dealInfo-content-images-thumb-image"
          >
            <img
              src="https://source.unsplash.com/random?sig=25210"
              class="en-dealInfo-content-images-thumb-image-img"
            />
          </div>
          <div
            :class="{ activeThumb: imageIndex == 3 }"
            class="en-dealInfo-content-images-thumb-image"
          >
            <img
              src="https://source.unsplash.com/random?sig=29"
              class="en-dealInfo-content-images-thumb-image-img"
            />
          </div>
          <div
            :class="{ activeThumb: imageIndex == 4 }"
            class="en-dealInfo-content-images-thumb-image"
          >
            <img
              src="https://source.unsplash.com/random?sig=23210"
              class="en-dealInfo-content-images-thumb-image-img"
            />
          </div>
          <div
            :class="{ activeThumb: imageIndex == 5 }"
            class="en-dealInfo-content-images-thumb-image"
          >
            <img
              src="https://source.unsplash.com/random?sig=23000"
              class="en-dealInfo-content-images-thumb-image-img"
            />
          </div>
        </div>
      </div>
      <div class="en-dealInfo-content-highlights">
        <div class="en-dealInfo-content-highlights-title">Highlights</div>
        <div class="en-dealInfo-content-highlights-highlight">
          {{ deal.highlightes }}
        </div>
      </div>
      <div class="en-dealInfo-content-reviews">
        <div class="en-dealInfo-content-reviews-title">Customer Reviews</div>
        <div class="en-dealInfo-content-reviews-rate">
          <div class="en-dealInfo-content-reviews-rate-number">
            {{ deal.rate }}
          </div>
          <div class="en-dealInfo-content-reviews-rate-stars">
            <div class="en-dealInfo-content-reviews-rate-stars-stars">
              <i class="fas fa-star colored-star"></i>
              <i class="fas fa-star colored-star"></i>
              <i class="fas fa-star colored-star"></i>
              <i class="fas fa-star"></i>
              <i class="fas fa-star"></i>
            </div>
            <div class="en-dealInfo-content-reviews-rate-stars-rateNumber">
              {{ deal.totalRates }} ratings
            </div>
          </div>
        </div>
        <div class="en-dealInfo-content-reviews-hashtags">
          <div class="en-dealInfo-content-reviews-hashtags-hashtag">
            workout
          </div>
          <div class="en-dealInfo-content-reviews-hashtags-hashtag">
            Gym
          </div>
          <div class="en-dealInfo-content-reviews-hashtags-hashtag">
            Football
          </div>
          <div class="en-dealInfo-content-reviews-hashtags-hashtag">
            Fawzii
          </div>
          <div class="en-dealInfo-content-reviews-hashtags-hashtag">
            Hash
          </div>
          <div class="en-dealInfo-content-reviews-hashtags-hashtag">
            Work
          </div>
          <div class="en-dealInfo-content-reviews-hashtags-hashtag">
            Food
          </div>
          <div class="en-dealInfo-content-reviews-hashtags-hashtag">
            Eating
          </div>
          <div class="en-dealInfo-content-reviews-hashtags-hashtag">
            Moodz
          </div>
          <div class="en-dealInfo-content-reviews-hashtags-hashtag">
            Web
          </div>
          <div class="en-dealInfo-content-reviews-hashtags-hashtag">
            Fun
          </div>
        </div>
        <div class="en-dealInfo-content-reviews-relevent">
          <!-- comments -->
          <div class="en-dealInfo-content-reviews-relevent-item" v-if="comment">
            <div class="en-dealInfo-content-reviews-relevent-item-header">
              <div class="en-dealInfo-content-reviews-relevent-item-header-img">
                L
              </div>
              <div
                class="en-dealInfo-content-reviews-relevent-item-header-name"
              >
                <span
                  class="en-dealInfo-content-reviews-relevent-item-header-name-user"
                >
                  Latile
                </span>
                <div
                  class="en-dealInfo-content-reviews-relevent-item-header-name-stars"
                >
                  <i
                    class="fas fa-star colored-star en-dealInfo-content-reviews-relevent-item-header-name-star"
                  ></i>
                  <i
                    class="fas fa-star colored-star en-dealInfo-content-reviews-relevent-item-header-name-star"
                  ></i>
                  <span
                    class="en-dealInfo-content-reviews-relevent-item-header-name-number"
                  >
                    {{ rate }} review
                  </span>
                </div>
              </div>
            </div>
            <div class="en-dealInfo-content-reviews-relevent-item-comment">
              {{ comment }}
            </div>
          </div>

          <!-- end comments -->
        </div>
      </div>
      <div class="en-dealInfo-content-whatGet">
        <div class="en-dealInfo-content-whatGet-title">What You'll Get</div>
        <div class="en-dealInfo-content-whatGet-content">
          Daily Burn’s program of unlimited, streaming workouts make it easy to
          stick with. Tuning in every day, customers encounter encouraging
          trainers and a new workout, and are instantly a part of a supportive
          fitness community. They can choose from over two thousand expertly
          led, energizing video and audio workouts at every level, with a
          training type for every body—cardio, yoga, dance, Pilates, or
          strength. And it’s never difficult to get going, with workouts Stream
          unlimited workouts from Daily Burn Attend streaming sessions and watch
          recorded workouts Over 2,000 workout video types, including: Group
          workouts 1-on-1 training Yoga Barre Muscle Building Pilates Available
          on any connected device, including iOS, Android, Apple TV, Roku,
          Chromecast, and Amazon Fire Gain access to an online community to chat
          directly with trainers and other Daily Burn members All workouts are
          downloadable.
        </div>
      </div>

      <div class="en-dealInfo-content-fineprint">
        <div class="en-dealInfo-content-fineprint-title">The Fine Print</div>
        <div class="en-dealInfo-content-fineprint-content">
          Daily Burn’s program of unlimited, streaming workouts make it easy to
          stick with. Tuning in every day, customers encounter encouraging
          trainers and a new workout, and are instantly a part of a supportive
          fitness community. They can choose from over two thousand expertly
          led, energizing video and audio workouts at every level, with a
          training type for every body—cardio, yoga, dance, Pilates, or
          strength. And it’s never difficult to get going, with workouts Stream
          unlimited workouts from Daily Burn Attend streaming sessions and watch
          recorded workouts Over 2,000 workout video types, including: Group
          workouts 1-on-1 training Yoga Barre Muscle Building Pilates Available
          on any connected device, including iOS, Android, Apple TV, Roku,
          Chromecast, and Amazon Fire Gain access to an online community to chat
          directly with trainers and other Daily Burn members All workouts are
          downloadable.
        </div>
      </div>

      <div class="en-dealInfo-content-about">
        <div class="en-dealInfo-content-about-title">About the Company</div>
        <div class="en-dealInfo-content-about-content">
          Daily Burn’s program of unlimited, streaming workouts make it easy to
          stick with. Tuning in every day, customers encounter encouraging
          trainers and a new workout, and are instantly a part of a supportive
          fitness community. They can choose from over two thousand expertly
          led, energizing video and audio workouts at every level, with a
          training type for every body—cardio, yoga, dance, Pilates, or
          strength. And it’s never difficult to get going, with workouts Stream
          unlimited workouts from Daily Burn Attend streaming sessions and watch
          recorded workouts Over 2,000 workout video types, including: Group
          workouts 1-on-1 training Yoga Barre Muscle Building Pilates Available
          on any connected device, including iOS, Android, Apple TV, Roku,
          Chromecast, and Amazon Fire Gain access to an online community to chat
          directly with trainers and other Daily Burn members All workouts are
          downloadable.
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import dealoptionsVue from './dealoptions.vue'
export default {
  props: {
    deal: Array
  },
  data() {
    return {
      options: true,
      imageIndex: 1,
      rate: '',
      comment: ''
    }
  },
  computed: {
    //check if there is review to show or not
    rateValue() {
      return deal.userReview ? (this.rate = deal.userReview.rate) : null
    },
    commentValue() {
      return deal.userReview ? (this.comment = deal.userReview.comment) : null
    }
  },
  methods: {
    imageRight() {
      if (this.imageIndex == 5) {
        this.imageIndex = 1
      } else {
        this.imageIndex++
      }
    },
    imageLeft() {
      if (this.imageIndex == 1) {
        this.imageIndex = 5
      } else {
        this.imageIndex--
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.en-dealInfo {
  &-content {
    &-categories {
    }
    &-mainInfo {
      margin-top: 20px;
      display: flex;
      flex-flow: row;
      justify-content: space-between;
      &-title {
        font-size: 40px;
        font-weight: 700;
      }
      &-stars {
        margin-top: 25px;
      }
    }
    &-images {
      &-mainShow {
        &-image {
          height: 500px;
          width: 100%;
          background-size: 100% 100%;
          &-options {
            height: 500px;
            display: flex;
            flex-flow: row;
            justify-content: space-between;
            align-items: center;
            padding: 0px 20px;
            font-size: 30px;
            color: white;
            &-left {
              display: flex;
              align-items: center;
              justify-content: center;
              background-color: #22252a;
              border-radius: 30px;
              height: 60px;
              width: 60px;
              cursor: pointer;
            }
            &-right {
              display: flex;
              align-items: center;
              justify-content: center;
              background-color: #22252a;
              border-radius: 30px;
              height: 60px;
              width: 60px;
              cursor: pointer;
            }
          }
        }
      }
      &-thumb {
        margin-top: 10px;
        display: flex;
        flex-flow: row;
        flex-wrap: wrap;
        &-image {
          padding: 2px;
          margin-right: 20px;
          &-img {
            width: 80px;
            height: 50px;
            border-radius: 5px;
          }
        }
      }
    }
    &-highlights {
      margin-top: 30px;
      &-title {
        font-size: 28px;
        font-weight: 500;
      }
      &-highlight {
        margin-top: 5px;
      }
    }
    &-reviews {
      margin-top: 50px;
      &-title {
        font-size: 28px;
        font-weight: 500;
      }
      &-rate {
        display: flex;
        flex-flow: row;
        &-number {
          margin-right: 5px;
          font-size: 40px;
          font-weight: 900;
        }
        &-stars {
          margin-top: 12px;
        }
      }
      &-hashtags {
        margin-top: 10px;
        display: flex;
        flex-flow: row;
        flex-wrap: wrap;
        &-hashtag {
          background-color: white;
          border: 1px solid grey;
          display: flex;
          flex-flow: row;
          align-items: center;
          padding: 5px;
          justify-content: center;
          width: 80px;
          border-radius: 20px;
          margin-right: 5px;
          margin-bottom: 10px;
          &:hover {
            background-color: rgb(241, 241, 241);
          }
        }
      }
      &-relevent {
        display: flex;
        flex-flow: column;
        margin-top: 30px;
        &-item {
          display: flex;
          flex-flow: column;
          margin-bottom: 40px;
          &-header {
            display: flex;
            flex-flow: row;
            &-img {
              font-size: 20px;
              background-color: #e6e7e8;
              border: 1px solid transparent;
              width: 50px;
              height: 50px;
              border-radius: 50%;
              display: flex;
              flex-flow: row;
              justify-content: center;
              align-items: center;
            }
            &-name {
              margin-left: 10px;
              font-size: 20px;
              display: flex;
              flex-flow: column;
              &-stars {
                font-size: 14px;
              }
            }
          }
          &-comment {
            margin-top: 15px;
          }
        }
      }
    }
    &-whatGet {
      margin-top: 50px;
      &-title {
        font-size: 28px;
        font-weight: 500;
      }
      &-content {
        margin-top: 10px;
      }
    }

    &-fineprint {
      margin-top: 50px;
      &-title {
        font-size: 28px;
        font-weight: 500;
      }
      &-content {
        margin-top: 10px;
      }
    }

    &-about {
      margin-top: 50px;
      &-title {
        font-size: 28px;
        font-weight: 500;
      }
      &-content {
        margin-top: 10px;
      }
    }
  }
}
.colored-star {
  color: rgb(216, 11, 79);
}
.activeThumb {
  border: 1px solid rgb(216, 11, 79);
  padding: 2px;
  box-sizing: border-box;
  border-radius: 5px;
}
</style>
