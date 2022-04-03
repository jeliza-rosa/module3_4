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

        <div class="content__row">
            <h1 class="content__title">
            Оформление заказа
            </h1>
        </div>
        </div>

        <section class="cart">
            <form class="cart__form form" action="#" method="POST" @submit.prevent="order">
                <div class="cart__field">
                <div class="cart__data">
                    <label class="form__label">
                        <input class="form__input" v-model="formData.name" type="text" name="name" placeholder="Введите ваше полное имя">
                        <span class="form__value">ФИО</span>
                        <span class="form__error" v-if="formError.name">{{ formError.name }}</span>
                    </label>

                    <label class="form__label">
                        <input class="form__input" v-model="formData.address" type="text" name="address" placeholder="Введите ваш адрес">
                        <span class="form__value">Адрес доставки</span>
                        <span class="form__error" v-if="formError.address">{{ formError.address }}</span>
                    </label>

                    <label class="form__label">
                        <input class="form__input" v-model="formData.phone" type="tel" name="phone" placeholder="Введите ваш телефон">
                        <span class="form__value">Телефон</span>
                        <span class="form__error" v-if="formError.phone">{{ formError.phone }}</span>
                    </label>

                    <label class="form__label">
                        <input class="form__input" v-model="formData.email" type="email" name="email" placeholder="Введи ваш Email">
                        <span class="form__value">Email</span>
                        <span class="form__error" v-if="formError.email">{{ formError.email }}</span>
                    </label>

                    <label class="form__label">
                        <textarea class="form__input form__input--area" v-model="formData.comment" name="comments" placeholder="Ваши пожелания"></textarea>
                        <span class="form__value">Комментарий к заказу</span>
                    </label>
                </div>

                <div class="cart__options">
                    <h3 class="cart__title">Доставка</h3>
                    <ul class="cart__options options">
                        <li class="options__item" v-for="del in deliveryType" :key="del.id">
                            <label class="options__label">
                                <input class="options__radio sr-only" type="radio" name="delivery" :value="del.id" v-model="formData.deliveryTypeId">
                                <span class="options__value">
                                    {{ del.title }}
                                    <b v-if="del.price != 0">{{ del.price }} ₽</b>
                                    <b v-else>бесплатно</b>
                                </span>
                            </label>
                        </li>
                    </ul>

                    <h3 class="cart__title">Оплата</h3>
                    <ul class="cart__options options">
                        <li class="options__item" v-for="pay in paymentTypes" :key="pay.id">
                            <label class="options__label">
                            <input class="options__radio sr-only" type="radio" name="pay" :value="pay.id" v-model="formData.paymentTypeId">
                            <span class="options__value">
                                {{ pay.title }}
                            </span>
                            </label>
                        </li>
                    </ul>

                </div>
                <span class="form__error form__error-payment-delivery" v-if="formError.paymentTypeId">{{ formError.paymentTypeId }}</span>
                </div>

                <div class="cart__block">
                    <OrderProductsList :products="products"/>

                    <div class="cart__total">
                        <p>Доставка: <b v-if="formData.deliveryTypeId == 1">бесплатно</b> <b v-if="formData.deliveryTypeId == 2"> {{ deliveryType[1].price }} ₽</b></p>
                        <p>Итого: <b>{{ amountProducts(products) }}</b> товара на сумму <b v-if="deliveryType[formData.deliveryTypeId - 1]">{{ totalPrice + Number(deliveryType[formData.deliveryTypeId - 1].price) }} ₽</b></p>
                    </div>

                    <button class="cart__button button button--primery" type="submit">
                        Оформить заказ
                    </button>
                </div>
                <div class="cart__error form__error-block" v-if="formErrorMessage">
                    <h4>Заявка не отправлена!</h4>
                    <p>
                        Похоже произошла ошибка. Попробуйте отправить снова или перезагрузите страницу.
                    </p>
                </div>
            </form>
        </section>
    </main>
</template>

<script>
    import axios from 'axios';
    import { mapGetters } from 'vuex';
    import OrderProductsList from '@/components/OrderProductsList.vue';
    import { API_BASE_URL } from '../config';

    export default {
        data() {
            return {
                formData: {paymentTypeId: 1, deliveryTypeId: 1},
                formError: {},
                formErrorMessage: '',
                orderSendLoading: false,
                orderSendFailed: false,

                deliveryTypes: null,
                paymentTypes: null
            }
        },
        methods: {
            amountProducts(arr) {
                let sum = 0;
                arr.forEach((el) => {
                    sum = sum + el.amount;
                })
                return sum;
            },
            order() {
                this.orderSendLoading = true;
                this.orderSendFailed = false;

                this.formErrorMessage = '';
                this.formError = {};
                axios.post(API_BASE_URL + `/api/orders`, {
                    ...this.formData
                }, {
                    params: {
                        userAccessKey: this.$store.state.userAccessKey
                    }
                })
                .then(response => {
                    this.$store.commit('resetCart');
                    this.$store.commit('updateOrderInfo', response.data);
                    this.$router.push({name: 'orderInfo', params: {id: response.data.id}})
                })
                .catch(error => {
                    this.formError = error.response.data.error.request || {};
                    this.formErrorMessage = error.response.data.error.message;
                    this.orderSendFailed = true
                })
                .then(() => {
                    this.orderSendLoading = false
                })
            },
            deliveryTypeGet() {
                axios.get(API_BASE_URL + `/api/deliveries`)
                .then(response => this.deliveryTypes = response.data)
            },
            paymentTypeGet() {
                axios.get(API_BASE_URL + `/api/payments`,{
                   params: {
                        deliveryTypeId: 1
                   }
                })
                .then(response => this.paymentTypes = response.data)
            }
        },
        computed: {
            ...mapGetters({products: 'cartDetailProducts', totalPrice: 'cartTotalPrice'}),
            deliveryType() {
                return (this.deliveryTypes != null) ? this.deliveryTypes : 0;
            },
            paymentType() {
                return (this.paymentTypes != null) ? this.paymentTypes : 0;
            }
        },
        components: {
            OrderProductsList
        },
        created() {
            this.deliveryTypeGet()
            this.paymentTypeGet()
        }
    }
</script>
