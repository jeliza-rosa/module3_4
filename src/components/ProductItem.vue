<template>
    <li class="catalog__item">
        <router-link :to="{name: 'product', params: {id: product.id}}" class="catalog__pic">
            <img :src="getImage[currentColor]" alt="Название товара">
        </router-link>

        <h3 class="catalog__title">
        <a href="#">
            {{ product.title }}
        </a>
        </h3>

        <span class="catalog__price">
        {{ product.price }} ₽
        </span>

        <ul class="colors colors--black">
            <li class="colors__item" v-for="(color, index) in product.colors" :key="index">
                <label class="colors__label">
                <input class="colors__radio sr-only" type="radio" name="color-1" :value="index" v-model="currentColor">
                <span class="colors__value" :class="{'checked-color': index == currentColor }" :style="'background-color:' + color.color.code">
                </span>
                </label>
            </li>
        </ul>
    </li>
</template>

<script>
import { NOT_IMAGE } from '../config';
    export default {
        data() {
          return {
            currentColor: 0
          }
        },
        props: ['product', 'images'],
        computed: {
          getImage() {
            const images = this.product.colors.map(img => {
              if (img.gallery) {
                return img.gallery[0].file.url;
              } else {
                return NOT_IMAGE;
              }
            })
            return images;
          }
        }
    }
</script>
