<template>
  <ul class="cart__orders">
    <OrderProductsItem v-for="product in products" :key="product.id" :product="product"></OrderProductsItem>
  </ul>
</template>

<script>
  import OrderProductsItem from './OrderProductsItem.vue';
  export default {
    components: {OrderProductsItem},
    props: ['products']
  }
</script>
