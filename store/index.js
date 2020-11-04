import Vuex from 'vuex'
import axios from 'axios'
const createStore = () => {
  return new Vuex.Store({
    // created() {
    //   console.log("State Created");
    // },
    state: {
      topSelling: [],
      bestReview: [],
      trending: [],
      allDeals: [],
      premium: [],
      wishList: [],
      cart: [],
      cuopons: [],
      isUser: false,
      locales: ['en', 'ar'],
      locale: 'ar',
      promoCode: '',
      user: {},
      checkoutDealId:'',
      checkoutPriceId:'',
      currentDealID:'',
    },
    
    mutations: {
      //top selling array
      addTopSelling(state, payload) {
        state.topSelling = payload
      },
      //best reviews array
      addBestReview(state, payload) {
        state.bestReview = payload
      },
      //trnding array
      addTrending(state, payload) {
        state.trending = payload
      },
      //premium array
      addPremium(state, payload) {
        state.premium = payload
      },
      addDealToCart ( state, payload ) {
        state.cart.push(payload)
      },
      removeDealFromCart ( state, payload ) {
        state.cart.deals = state.cart.deals.filter(item => item.deal._id !== payload)
      },

      //all data array
      addAllDeals(state, payload) {
        state.allDeals = payload
      },
      //set user to true
      setUser(state, payload) {
        state.isUser = payload
      },
      //set cart
      setCart(state, payload) {
        state.cart = payload
      },
      //set wish list
      setWishList(state, payload) {
        state.wishList = payload
      },
      //set cuopons list
      setCuopons(state, payload) {
        state.cuopons = payload
      },
      //set locale
      SET_LANG(state, locale) {
        if (state.locales.includes(locale)) {
          state.locale = locale
        }
      },
      //logout function
      logout(state) {
        state.isUser = false
        localStorage.removeItem('session')
      },
      setPromoCode(state, payload) {
        state.promoCode = payload
      },
      setCheckoutDealID(state, payload) {
        state.checkoutDealId = payload
      },
      setCheckoutPriceID(state, payload) {
        state.checkoutPriceId = payload
      },
      setCurrentDeal(state, payload) {
        state.currentDealID = payload
      }
    },

    actions: {
      // get best selling, treanding, premium and best reviews
      async getAllKindsData({ commit }) {
        await axios
          .get(process.env.baseUrl + '/api/deals/special?limit=0&skip=0')
          .then(res => {
            commit('addTopSelling', res.data.topSelling)
            commit('addBestReview', res.data.bestReview)
            commit('addTrending', res.data.trending)
            commit('addPremium', res.data.premium)
          })
      },

      // get all data with all kinds
      async getAllData({ commit }) {
        await axios
          .get(process.env.baseUrl + '/api/deals')
          .then(res => {
            commit('addAllDeals', res.data.deals)
          })
      },

      //set user to true
      setUser({ commit }) {
        commit('setUser', true)
      },

      //get wish list
      async getWishList({ commit }) {
        const config = {
          headers: {
            'Content-Type': 'application/json',
            authorization: JSON.parse(localStorage.getItem('session')).token
          }
        }
        await axios
          .get(process.env.baseUrl + '/api/user/wishList', config)
          .then(res => {
            commit('setWishList', res.data.deals)
          })
      },


      //get cart list
      async getCart({ commit }) {
        const config = {
          headers: {
            'Content-Type': 'application/json',
            authorization: JSON.parse(localStorage.getItem('session')).token
          }
        }
        await axios
          .get(process.env.baseUrl + '/api/user/cart', config)
          .then(res => {
            commit('setCart', res.data)
          })
      },
      
      //get cuopons list
      async getCuopons({ commit }) {
        const config = {
          headers: {
            authorization: JSON.parse(localStorage.getItem('session')).token
          }
        }
        await axios
          .get(process.env.baseUrl + '/api/user/coupons', config)
          .then(res => {
            commit('setCuopons', res.data.deals)
          })
      },

      //add cart list 
      async addDealtoCart ( { commit } , deal ) {
        const config = {
          headers: {
            'Content-Type': 'application/json',
            authorization: JSON.parse(localStorage.getItem('session')).token
          }
        }

        await axios.post( process.env.baseUrl + '/api/user/cart', deal, config );

      },

      async removeDealFromCart ( { commit }, id ) {
        const config = {
          headers: {
            'Content-Type': 'application/json',
            authorization: JSON.parse(localStorage.getItem('session')).token
          }
        }
        await axios.delete( process.env.baseUrl + "/api/user/cart/" + id, config ).then( () => {
          commit( 'removeDealFromCart', id );
        });
      },

      async addPromotion ( { commit }, code ) {
        const config = {
          headers: {
            'Content-Type': 'application/json',
            authorization: JSON.parse(localStorage.getItem('session')).token
          }
        }
        await axios.post( process.env.baseUrl + "/api/user/pormotion", code, config );
        await axios
        .get(process.env.baseUrl + '/api/user/cart', config)
        .then(res => {
          commit('setCart', res.data)
        })

      }


    },

    getters: {
      //return top selling
      gettopSellingData(state) {
        return state.topSelling
      },
      //return best reviews
      getbestReviewData(state) {
        return state.bestReview
      },
      //return trending
      getTreandingData(state) {
        return state.trending
      },
      //return premium
      getPremiumData(state) {
        return state.premium
      },
      //return all data kinds
      getAllData(state) {
        return state.allDeals
      },
      //get user status
      getUser(state) {
        return state.isUser
      },
      //get wish list
      getWishList(state) {
        return state.wishList
      },
      //get cart list
      getCart(state) {
        return state.cart
      },
      //get cuopons list
      getCuopons(state) {
        return state.cuopons
      },
      getLocale(state) {
        return state.locale
      },
      getPromoCode(state) {
        return state.promoCode
      },
      getCheckoutDealID(state) {
        return state.checkoutDealId
      },
      getCheckoutPriceID(state) {
        return state.checkoutPriceId
      },
      getCurrentDeal(state) {
        return state.currentDealID
      },
    }
  })
}
export default createStore
