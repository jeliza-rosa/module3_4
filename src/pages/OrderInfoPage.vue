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
            <a class="breadcrumbs__link" href="cart.html">
                Корзина
            </a>
            </li>
            <li class="breadcrumbs__item">
            <a class="breadcrumbs__link">
                Оформление заказа
            </a>
            </li>
        </ul>

        <h1 class="content__title">
            Заказ оформлен <span>№ {{ getOrderInfo.id }}</span>
        </h1>
        </div>

        <section class="cart">
        <form class="cart__form form" action="#" method="POST">
            <div class="cart__field">
            <p class="cart__message">
                Благодарим за&nbsp;выбор нашего магазина. На&nbsp;Вашу почту придет письмо с&nbsp;деталями заказа. 
                Наши менеджеры свяжутся с&nbsp;Вами в&nbsp;течение часа для уточнения деталей доставки.
            </p>

            <ul class="dictionary">
                <li class="dictionary__item">
                <span class="dictionary__key">
                    Получатель
                </span>
                <span class="dictionary__value">
                    {{ getOrderInfo.name }}
                </span>
                </li>
                <li class="dictionary__item">
                <span class="dictionary__key">
                    Адрес доставки
                </span>
                <span class="dictionary__value">
                    {{ getOrderInfo.address }}
                </span>
                </li>
                <li class="dictionary__item">
                <span class="dictionary__key">
                    Телефон
                </span>
                <span class="dictionary__value">
                    {{ getOrderInfo.phone }}
                </span>
                </li>
                <li class="dictionary__item">
                <span class="dictionary__key">
                    Email
                </span>
                <span class="dictionary__value">
                    {{ getOrderInfo.email }}
                </span>
                </li>
                <li class="dictionary__item">
                <span class="dictionary__key">
                    Способ оплаты
                </span>
                <span class="dictionary__value">
                    {{ getOrderInfo.paymentType }}
                </span>
                </li>
            </ul>
            </div>

            <div class="cart__block">
            <ul class="cart__orders">
                <li class="cart__order" v-for="(product, index) in basketItems" :key="index">
                    <h3>{{ product.product.title }}</h3>
                    <b>{{ product.product.price * product.quantity }} ₽</b>
                    <span>Артикул: {{ product.product.id }}</span>
                </li>
            </ul>
            
            <div class="cart__total">
                <p>Доставка: <b v-if="getOrderInfo.deliveryType && getOrderInfo.deliveryType.id == 1">бесплатно</b><b v-if="getOrderInfo.deliveryType && getOrderInfo.deliveryType.id == 2">{{ getOrderInfo.deliveryType.price }} ₽</b></p>
                <p>Итого: <b>{{ amountProducts(basketItems) }}</b> товара на сумму <b>{{ getOrderInfo.totalPrice }} ₽</b></p>
            </div>
            </div>
        </form>
        </section>
    </main>
</template>

<script>
    export default {
        created() {
            if (this.$store.state.orderInfo && this.$store.state.orderInfo.id === this.$route.params.id) {
            return;
            }

            this.$store.dispatch('loadOrderInfo', this.$route.params.id);
        },
        computed: {
            getOrderInfo() {
                return this.$store.state.orderInfo;
            },
            basketItems() {
                return this.getOrderInfo && this.getOrderInfo.basket ? this.getOrderInfo.basket.items : [];
            }
        },
        methods: {
            amountProducts(arr) {
                let sum = 0;
                arr.forEach((el) => {
                    sum = sum + el.quantity;
                })
                return sum;
            }
        }
    }
</script>