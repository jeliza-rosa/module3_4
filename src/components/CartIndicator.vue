<template>
    <router-link :to="{name: 'cart'}" class="header__cart" aria-label="Корзина с товарами">
        <svg width="19" height="24">
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