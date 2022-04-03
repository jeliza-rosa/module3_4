<template>
    <li class="cart__item product">
        <div class="product__pic">
            <img :src="getImage(item)" width="120" height="120" >
        </div>
        <h3 class="product__title">
            {{ item.product.title }}
        </h3>
        <p class="product__info product__info--size">
            Размер:
            <span>
            {{ item.size.title }}
            </span>
        </p>
        <p class="product__info product__info--color">
            Цвет:
            <span>
            <i :style="'background-color:' + item.color.color.code"></i>
            {{ item.color.color.title }}
            </span>
        </p>
        <span class="product__code">
            Артикул: {{ item.productId }}
        </span>

        <div class="product__counter form__counter">
            <button type="button" aria-label="Убрать один товар" @click.prevent="updateCart({productId: item.basketItemId, amount: item.amount - 1})">
                <svg width="10" height="10" fill="currentColor">
                    <use xlink:href="#icon-minus"></use>
                </svg>
            </button>

            <input type="number" min="1" step="1" oninput="validity.valid||(value='');" v-model.number="amount" name="count">

            <button type="button" aria-label="Добавить один товар" @click.prevent="updateCart({productId: item.basketItemId, amount: item.amount + 1})">
                <svg width="10" height="10" fill="currentColor">
                    <use xlink:href="#icon-plus"></use>
                </svg>
            </button>
        </div>

        <b class="product__price">
            {{ item.product.price * item.amount }} ₽
        </b>

        <button class="product__del button-del" type="button" aria-label="Удалить товар из корзины" @click.prevent="deleteProduct({basketItemId: item.basketItemId})">
            <svg width="20" height="20" fill="currentColor">
            <use xlink:href="#icon-close"></use>
            </svg>
        </button>
    </li>
</template>

<script>
  import { mapActions } from 'vuex';

    export default {
        props: ['item'],
        computed: {
            amount: {
                get() {
                    return this.item.amount
                },
                set(value) {
                    this.$store.dispatch('updateCartProductAmount', {productId: this.item.basketItemId, amount: value})
                }
            }
        },
        methods: {
            getImage(item) {
                let image = '';
                if (item.color.gallery != null) {
                    image = item.color.gallery[0].file.url;
                } else {
                    image = 'https://www.lionstroy.ru/published/publicdata/U70619SHOP/attachments/SC/products_pictures/nophoto.png';
                }
                return image;
            },
            ...mapActions({deleteProduct: 'deleteCartProduct'}),
            ...mapActions({updateCart: 'updateCartProductAmount'}),
            },
        }
</script>