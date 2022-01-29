<template>
  <router-link class="header__cart" :to="{name: 'cart'}" aria-label="Корзина с товарами">
    <svg width="30" height="21" fill="currentColor">
      <use xlink:href="#icon-cart"></use>
    </svg>
    <span class="header__count" aria-label="Количество товаров">{{ amountProducts() }}</span>
  </router-link>
</template>

<script>

  export default {
    methods: {
      amountProducts() {
        let sum = 0;
        this.$store.state.cartProducts.forEach((el) => {
        sum = sum + el.amount;
        })
        return sum;
      }
    }
  }
</script>
