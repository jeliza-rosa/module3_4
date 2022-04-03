<template>
    <main class="content container">
        <div class="content__top">
        <ul class="breadcrumbs">
            <li class="breadcrumbs__item">
            <a class="breadcrumbs__link" href="index.html">
                Каталог
            </a>
            </li>
            <li class="breadcrumbs__item">
            <a class="breadcrumbs__link">
                Корзина
            </a>
            </li>
        </ul>

        <div class="content__row">
            <h1 class="content__title">
                Корзина
            </h1>
            <span class="content__info">
                {{ amountProducts(products) }} товара
            </span>
        </div>
        </div>

        <section class="cart">
        <form class="cart__form form" action="#" method="POST">
            <div class="cart__field">
            <ul class="cart__list">
                <CartItem v-for="(item, index) in products" :key="index" :item="item"/>
            </ul>
            </div>

            <div class="cart__block">
            <p class="cart__desc">
                Мы&nbsp;посчитаем стоимость доставки на&nbsp;следующем этапе
            </p>
            <p class="cart__price">
                Итого: <span>{{ totalPrice }} ₽</span>
            </p>

            <router-link tag="button" :to="{name: 'order'}" class="cart__button button button--primery" type="submit">
                Оформить заказ
            </router-link>
            </div>
        </form>
        </section>
    </main>
</template>

<script>
    import { mapGetters } from 'vuex';
    import CartItem from '@/components/CartItem';

    export default {
        computed: {
          ...mapGetters({products: 'cartDetailProducts', totalPrice: 'cartTotalPrice'}),
        },
        methods: {
            amountProducts(arr) {
                let sum = 0;
                arr.forEach((el) => {
                    sum = sum + el.amount;
                })
                return sum;
            },
        },
        components: {
            CartItem
        }
    }
</script>
