<template>
    <ul class="cart__orders">
        <OrderProductsItem v-for="(product, index) in products" :key="index" :product="product"/>
    </ul>
</template>

<script>
    import OrderProductsItem from '@/components/OrderProductsItem.vue';

    export default {
        components: {
            OrderProductsItem
        },
        props: ['products']
    }
</script>