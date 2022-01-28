<template>
      <li class="catalog__item">
      <router-link class="catalog__pic" :to="{name: 'product', params: {id: product.id}}">
        <img :src="product.image" :alt="product.title">
      </router-link>

      <h3 class="catalog__title">
        <a href="#">
          {{product.title}}
        </a>
      </h3>

      <span class="catalog__price">
        {{ product.price | numberFormat}} ₽
      </span>

      <ul class="colors colors--black">
        <li class="colors__item" v-for="(colorId, index) in product.colors" :key="index">
          <label class="colors__label">
          <input class="colors__radio sr-only" type="radio" :value="colorCode(colorId, colors).code.substr(18)" v-model="color">
          <span class="colors__value" :style="colorCode(colorId, colors).code">
          </span>
          </label>
        </li>
      </ul>
    </li>
</template>

<script>
import colors from '../data/colors.js';
import gotoPage from "@/helpers/gotoPage";
import numberFormat from '../helpers/numberFormat';
import colorCode from '../helpers/colors';

  export default {
    data() {
      return {
        color: '#73B6EA',
      }
    },
    methods: {
      gotoPage,
      colorCode
    },
    props: ['product'],
    filters: {
      numberFormat
    },
    computed: {
      colors() {
        return colors;
      },
    },
  }
</script>
