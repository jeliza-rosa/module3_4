import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import { API_BASE_URL, NOT_IMAGE } from '../config';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    cartProducts: [],

    userAccessKey: null,

    cartProductsData: [],

    orderInfo: []
  },
  mutations: {
    updateUserAccessKey(state, accessKey) {
      state.userAccessKey = accessKey;
    },
    updateCardProductsData(state, items) {
      state.cartProductsData = items;
    },
    syncCartProducts(state) {
      state.cartProducts = state.cartProductsData.map(item => {
        return {
          productId: item.product.id,
          amount: item.quantity,
          size: item.size,
          color: item.color,
          basketItemId: item.id
        }
      })
    },
    updateCartProductAmount(state, {productId, amount}) {
      const item = state.cartProducts.find(item => item.basketItemId == productId);

      if (item && amount > 0) {
        item.amount = amount;
      }
    },
    resetCart(state) {
      state.cartProducts = [],
      state.cartProductsData = []
    },
    updateOrderInfo(state, orderInfo) {
      state.orderInfo = orderInfo;
    },
  },
  getters: {
    cartDetailProducts(state) {
      return state.cartProducts.map(item => {
        const product = state.cartProductsData.find(p => p.product.id === item.productId).product;

        const images = product.colors.map(c => {
          if (c.gallery) {
            return c.gallery[0].file.url;
          }
          return NOT_IMAGE;
        })
        return {
          ...item,
          product: {
            ...product,
            image: images
          }
        }
      })
    },
    cartTotalPrice(state, getters) {
      return getters.cartDetailProducts.reduce((acc, item) => (item.product.price * item.amount) + acc, 0)
    }
  },
  actions: {
    loadCart(context) {
      return axios.get(API_BASE_URL + `/api/baskets`, {
        params: {
          userAccessKey: context.state.userAccessKey
        }
      })
      .then(response => {
        if (!context.state.userAccessKey) {
          localStorage.setItem('userAccessKey', response.data.user.accessKey);
          context.commit('updateUserAccessKey', response.data.user.accessKey);
        }

        context.commit('updateCardProductsData', response.data.items);
        context.commit('syncCartProducts');
      })
    },
    addProductToCart(context, {productId, color, size, amount}) {
      return axios.post(API_BASE_URL + `/api/baskets/products`, {
        productId: productId,
        colorId: color,
        sizeId: size,
        quantity: amount
      }, {
        params: {
          userAccessKey: context.state.userAccessKey
        }
      })
      .then(response => {
        context.commit('updateCardProductsData', response.data.items);
        context.commit('syncCartProducts');
      })
    },
    updateCartProductAmount(context, {productId, amount}) {
      context.commit('updateCartProductAmount', {productId, amount})

      if (amount < 1) {
        return;
      }

      return axios.put(API_BASE_URL + `/api/baskets/products`, {
        basketItemId: productId,
        quantity: amount
      }, {
        params: {
          userAccessKey: context.state.userAccessKey
        }
      })
      .then(response => {
        context.commit('updateCardProductsData', response.data.items);
      })
      .catch(() => {
        context.commit('syncCartProducts');
      })
    },

    deleteCartProduct(context, {basketItemId}) {

      axios.delete(API_BASE_URL + `/api/baskets/products`, {
        params: {
          userAccessKey: context.state.userAccessKey
        },
        data: {
          basketItemId: basketItemId
        }
      })
      .then(response => {
        context.commit('updateCardProductsData', response.data.items);
        context.commit('syncCartProducts');
      })
    },
    loadOrderInfo(context, orderId) {
      return axios.get(API_BASE_URL + '/api/orders/' + orderId, {
        params: {
          userAccessKey: context.state.userAccessKey
        }
      })
      .then(response => {
        context.commit('updateOrderInfo', response.data)
      })
    },
  },
})
