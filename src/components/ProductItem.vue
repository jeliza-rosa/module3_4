<template>
      <li class="catalog__item">
      <a class="catalog__pic" href="#">
        <img :src="product.image" :alt="product.title">
      </a>

      <h3 class="catalog__title">
        <a href="#">
          {{product.title}}
        </a>
      </h3>

      <span class="catalog__price">
        {{ product.price }} ₽
      </span>

      <ul class="colors colors--black">
        <li class="colors__item" v-for="(colorId, index) in product.colors" :key="index">
          <label class="colors__label">
          <input class="colors__radio sr-only" type="radio" :value="colors[colorId-1].code.substr(18)" v-model="color">
          <span class="colors__value" :style="colors[colorId-1].code">
          </span>
          </label>
        </li>
      </ul>
    </li>
</template>

<script>
import colors from '../data/colors.js';

  export default {
    data() {
      return {
        color: '#73B6EA',
      }
    },
    props: ['product'],
    computed: {
      colors() {
        return colors;
      },
    },
  }
</script>
