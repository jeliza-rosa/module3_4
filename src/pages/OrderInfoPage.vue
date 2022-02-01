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
        Заказ оформлен <span>№ {{ getOrderInfo($route.params.id).id }}</span>
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
                {{ getOrderInfo($route.params.id).name }}
              </span>
            </li>
            <li class="dictionary__item">
              <span class="dictionary__key">
                Адрес доставки
              </span>
              <span class="dictionary__value">
                {{ getOrderInfo($route.params.id).address }}
              </span>
            </li>
            <li class="dictionary__item">
              <span class="dictionary__key">
                Телефон
              </span>
              <span class="dictionary__value">
                {{ getOrderInfo($route.params.id).phone }}
              </span>
            </li>
            <li class="dictionary__item">
              <span class="dictionary__key">
                Email
              </span>
              <span class="dictionary__value">
                {{ getOrderInfo($route.params.id).email }}
              </span>
            </li>
            <li class="dictionary__item">
              <span class="dictionary__key">
                Способ оплаты
              </span>
              <span class="dictionary__value">
                картой при получении
              </span>
            </li>
          </ul>
        </div>

        <div class="cart__block">
          <ul class="cart__orders" v-for="product in getOrderInfo($route.params.id).basket.items" :key="product.id">
            <li class="cart__order">
              <h3>{{ product.product.title }}</h3>
              <b>{{ product.product.price | numberFormat }} ₽</b>
              <span>Артикул: {{ product.product.id }}</span>
            </li>
          </ul>

          <div class="cart__total">
            <p>Доставка: <b>500 ₽</b></p>
            <p>Итого: <b>{{ amountProducts(getOrderInfo($route.params.id).basket.items) }}</b> товара на сумму <b>{{ getOrderInfo($route.params.id).totalPrice | numberFormat}} ₽</b></p>
          </div>
        </div>
      </form>
    </section>
  </main>
</template>

<script>
  import numberFormat from '@/helpers/numberFormat';

  export default {
    filters: {numberFormat},
    created() {
      if (this.$store.state.orderInfo && this.$store.state.orderInfo.id === this.$route.params.id) {
        return;
      }

      this.$store.dispatch('loadOrderInfo', this.$route.params.id)
    },
    methods: {
      getOrderInfo() {
        return this.$store.state.orderInfo;
      },
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
