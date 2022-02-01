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
        Корзина
      </h1>
      <span class="content__info">
        {{ amountProducts(products) }} товара
      </span>
    </div>

    <section class="cart">
      <div v-if="orderSendLoading">
        <div id="cube-loader-send-order">
          <div class="caption">
            <div class="cube-loader">
              <div class="cube loader-1"></div>
              <div class="cube loader-2"></div>
              <div class="cube loader-4"></div>
              <div class="cube loader-3"></div>
            </div>
          </div>
        </div>
      </div>
      <form class="cart__form form" action="#" method="POST" @submit.prevent="order">
        <div class="cart__field">
          <div class="cart__data">

            <BaseFormText v-model="formData.name" title="ФИО" :error="formError.name" placeholder="Введите ваше полное имя"/>

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
              <input class="form__input" v-model="formData.email" type="text" name="email" placeholder="Введи ваш Email">
              <span class="form__value">Email</span>
              <span class="form__error" v-if="formError.email">{{ formError.email }}</span>
            </label>

            <BaseFormTextarea title="Комментарий к заказу" v-model="formData.comment" :error="formError.comment" placeholder="Ваши пожелания"/>
          </div>

          <div class="cart__options">
            <h3 class="cart__title">Доставка</h3>
            <ul class="cart__options options">
              <li class="options__item">
                <label class="options__label">
                  <input class="options__radio sr-only" type="radio" name="delivery" value="0" checked="">
                  <span class="options__value">
                    Самовывоз <b>бесплатно</b>
                  </span>
                </label>
              </li>
              <li class="options__item">
                <label class="options__label">
                  <input class="options__radio sr-only" type="radio" name="delivery" value="500">
                  <span class="options__value">
                    Курьером <b>500 ₽</b>
                  </span>
                </label>
              </li>
            </ul>

            <h3 class="cart__title">Оплата</h3>
            <ul class="cart__options options">
              <li class="options__item">
                <label class="options__label">
                  <input class="options__radio sr-only" type="radio" name="pay" value="card">
                  <span class="options__value">
                    Картой при получении
                  </span>
                </label>
              </li>
              <li class="options__item">
                <label class="options__label">
                  <input class="options__radio sr-only" type="radio" name="pay" value="cash">
                  <span class="options__value">
                    Наличными при получении
                  </span>
                </label>
              </li>
            </ul>
          </div>
        </div>

        <div class="cart__block">
          <!-- <ul class="cart__orders" v-for="product in products" :key="product.id">
            <li class="cart__order">
              <h3>{{ product.product.title }}</h3>
              <b>{{ product.product.price | numberFormat  }} ₽</b>
              <span>Артикул: {{ product.product.id }}</span>
            </li>
          </ul> -->
          <OrderProductsList :products="products"/>

          <div class="cart__total">
            <p>Доставка: <b>500 ₽</b></p>
            <p>Итого: <b>{{ amountProducts(products) }}</b> товара на сумму <b>{{ totalPrice | numberFormat }} ₽</b></p>
          </div>

          <button class="cart__button button button--primery" type="submit">
            Оформить заказ
          </button>
        </div>
        <div class="cart__error form__error-block" v-if="formErrorMessage">
          <h4>Заявка не отправлена!</h4>
          <p>
            {{ formErrorMessage }}
          </p>
        </div>
      </form>
    </section>
  </main>
</template>

<script>
  import BaseFormText from '../components/BaseFormText';
  import BaseFormTextarea from '../components/BaseFormTextarea';
  import axios from 'axios';
  import { API_BASE_URL } from '../config';
  import { mapGetters } from 'vuex';
  import numberFormat from '@/helpers/numberFormat';
  import OrderProductsList from '@/components/OrderProductsList.vue';

  export default {
    filters: {numberFormat},
    components: {BaseFormText, BaseFormTextarea, OrderProductsList},
    data() {
      return {
        formData: {},
        formError: {},
        formErrorMessage: '',
        orderSendLoading: false,
        orderSendFailed: false,
      }
    },
    computed: {
      ...mapGetters({products: 'cartDetailProducts', totalPrice: 'cartTotalPrice'}),
    },
    methods: {
      order() {
        this.orderSendLoading = true;
        this.orderSendFailed = false;

          this.formErrorMessage = '';
          this.formError = {};
          axios.post(API_BASE_URL + '/api/orders', {
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
      amountProducts(arr) {
        let sum = 0;
        arr.forEach((el) => {
          sum = sum + el.amount;
        })
        return sum;
      }
    },
  }
</script>
