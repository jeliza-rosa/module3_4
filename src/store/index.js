import Vue from 'vue';
import Vuex from 'vuex';
import products from '@/data/products';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    cartProducts: [
      {productId: 1, amount: 2}
    ]
  },
  mutations: {
    addProductToCart(state, payload) {
      const item = state.cartProducts.find(item => item.productId == payload.productId);

      if (item) {
        item.amount += payload.amount;
      } else {
        state.cartProducts.push({
          productId: payload.productId,
          amount: payload.amount
        })
      }
    },
    updateCartProductAmount(state, {productId, amount}) {
      const item = state.cartProducts.find(item => item.productId == productId);

      if (item && amount > 0) {
        item.amount = amount;
      }
    },
    deleteCartProduct(state, productId) {
      state.cartProducts = state.cartProducts.filter(item => item.productId !== productId)
    }
  },
  actions: {
  },
  modules: {
  },
  getters: {
    cartDetailProducts(state) {
      return state.cartProducts.map(item => {
        return {
          ...item,
          product: products.find(p => p.id == item.productId)
        }
      })
    },
    cartTotalPrice(state, getters) {
      return getters.cartDetailProducts.reduce((acc, item) => (item.product.price * item.amount) + acc, 0)
    },
  }
});
