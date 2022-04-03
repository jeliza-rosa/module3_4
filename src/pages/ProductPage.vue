<template>
    <main class="content container" v-if="!productData">
        <div id="cube-loader-product">
        <div class="caption">
          <div class="cube-loader">
            <div class="cube loader-1"></div>
            <div class="cube loader-2"></div>
            <div class="cube loader-4"></div>
            <div class="cube loader-3"></div>
          </div>
        </div>
      </div>
    </main>
    <main class="content container" v-else>
        <div class="content__top">
            <ul class="breadcrumbs">
                <li class="breadcrumbs__item">
                    <router-link :to="{name: 'main'}" class="breadcrumbs__link">
                        Каталог
                    </router-link>
                </li>
                <li class="breadcrumbs__item">
                    <router-link class="breadcrumbs__link" :to="{name: 'main'}">
                        {{ category }}
                    </router-link>
                </li>
                <li class="breadcrumbs__item">
                    <a class="breadcrumbs__link">
                        {{ product.title }}
                    </a>
                </li>
            </ul>
        </div>

        <section class="item">
            <div class="item__pics pics">
                <div class="pics__wrapper">
                    <img width="570" height="570" :src="images[indexColor]" alt="Название товара">
                </div>
                <ul class="pics__list">
                    <li class="pics__item" v-for="(image, index) in images" :key="index">
                        <a class="pics__link" :class="{'pics__link--current': index == indexColor}" @click.prevent="changeImage(index); currentColor = product.colors[index].color.id">
                            <img width="98" height="98" :src="image" alt="Название товара">
                        </a>
                    </li>
                </ul>
            </div>

            <div class="item__info">
                <span class="item__code">Артикул: {{ product.id }}</span>
                <h2 class="item__title">
                {{ product.title }}
                </h2>
                <div class="item__form">
                <form class="form" action="#" method="POST" @submit.prevent="addToCart">
                    <div class="item__row item__row--center">
                    <div class="form__counter">
                        <button type="button" aria-label="Убрать один товар" @click.prevent="reduceAmount">
                            <svg width="12" height="12" fill="currentColor">
                                <use xlink:href="#icon-minus"></use>
                            </svg>
                        </button>

                        <input type="number" min="1" v-model.number="productAmount" name="count" oninput="validity.valid||(value='');">

                        <button type="button" aria-label="Добавить один товар" @click.prevent="increaseAmount">
                            <svg width="12" height="12" fill="currentColor">
                                <use xlink:href="#icon-plus"></use>
                            </svg>
                        </button>
                    </div>

                    <b class="item__price">
                        {{ product.price * productAmount }} ₽
                    </b>
                    </div>

                    <div class="item__row">
                    <fieldset class="form__block">
                        <legend class="form__legend">Цвет</legend>
                        <ul class="colors colors--black">
                            <li class="colors__item" v-for="(color, index) in product.colors" :key="index">
                                <label class="colors__label">
                                <input class="colors__radio sr-only" type="radio" name="color-item" :value="color.color.id" v-model="currentColor" @click="indexColor = index">
                                <span class="colors__value" :style="'background-color:' + color.color.code">
                                </span>
                                </label>
                            </li>
                        </ul>
                    </fieldset>


                    <fieldset class="form__block">
                        <legend class="form__legend">Размер</legend>
                        <label class="form__label form__label--small form__label--select">
                        <select class="form__select" type="text" name="category" v-model="currentSize">
                            <option :value="size.id" v-for="(size, index) in product.sizes" :key="index">{{ size.title }}</option>
                        </select>
                        </label>
                    </fieldset>
                    </div>

                    <button class="item__button button button--primery" type="submit">
                    В корзину
                    </button>
                    <div v-if="productAdded">Товар добавлен в корзину</div>
                      <div v-if="productAddSending">
                          <div class="content-add">
                            <div class="load-wrapp">
                              <div class="load-3">
                                <div class="line"></div>
                                <div class="line"></div>
                                <div class="line"></div>
                              </div>
                            </div>
                          </div>
                      </div>
                </form>
                </div>
            </div>

            <div class="item__desc">
                <ul class="tabs">
                <li class="tabs__item">
                    <a class="tabs__link" :class="{'tabs__link--current': currentTab == 0}" @click.prevent="changeTab(0)">
                    Информация о товаре
                    </a>
                </li>
                <li class="tabs__item">
                    <a class="tabs__link" :class="{'tabs__link--current': currentTab == 1}" @click.prevent="changeTab(1)">
                    Доставка и возврат
                    </a>
                </li>
                </ul>

                <div class="item__content" v-if="currentTab == 0">
                    <h3>Состав:</h3>

                    <p>
                        60% хлопок<br>
                        30% полиэстер<br>
                    </p>

                    <h3>Уход:</h3>

                    <p>
                        Машинная стирка при макс. 30ºC короткий отжим<br>
                        Гладить при макс. 110ºC<br>
                        Не использовать машинную сушку<br>
                        Отбеливать запрещено<br>
                        Не подвергать химчистке<br>
                    </p>
                </div>

                <div class="item__content" v-if="currentTab == 1">
                    <h3>Доставка:</h3>

                    <p>
                        1. Курьерская доставка по Москве и Московской области – 290 ₽<br>
                        2.Самовывоз из магазина. Список и адреса магазинов Вы можете посмотреть здесь<br>
                    </p>

                    <h3>Возврат:</h3>

                    <p>
                        Любой возврат должен быть осуществлен в течение Возвраты в магазине БЕСПЛАТНО.<br>
                        Вы можете вернуть товары в любой магазин. Магазин должен быть расположен в стране, в которой Вы осуществили покупку.
                        БЕСПЛАТНЫЙ возврат в Пункт выдачи заказов.<br>
                        Для того чтобы вернуть товар в одном из наших Пунктов выдачи заказов, позвоните по телефону 8 800 600 90 09<br>
                    </p>

                </div>
            </div>
        </section>
    </main>
</template>

<script>
    import axios from 'axios';
    import { mapActions} from 'vuex';
    import { API_BASE_URL, NOT_IMAGE } from '../config';

    export default {
        data() {
            return {
                productAmount: 1,
                currentColor: 1,
                indexColor: 0,
                currentSize: 1,
                currentTab: 0,
                productData: null,
                delivaryData: null,

                productLoading: false,
                productLoadingFailed: false,
                productAdded: false,
                productAddSending: false,
            }
        },
        computed: {
            product() {
                return this.productData ? this.productData : [];
            },
            category() {
                return this.productData ? this.productData.category.title : [];
            },
            images() {
                if (this.productData) {
                  const imagesData = this.product.colors.map(img => {
                    if (img.gallery) {
                      return img.gallery[0].file.url;
                    } else {
                      return NOT_IMAGE;
                    }
                  })
                    return imagesData;
                } else {
                    return [];
                }
            },
            color() {
                return this.productData ? this.productData.colors[0].color.id : 0;
            },
            size() {
                return this.productData ? this.productData.sizes[0].id : 0;
            }
        },
        methods: {
            ...mapActions(['addProductToCart']),
            loadProduct() {
               setTimeout(() => {
                this.productLoading = true;
                this.productLoadingFailed = false;
                axios.get(API_BASE_URL + `/api/products/${this.$route.params.id}`)
                  .then(response => {this.productData = response.data;
                  this.currentColor = this.productData.colors[0].color.id;
                  this.currentSize = this.productData.sizes[0].id})
                  .catch(() => this.productLoadingFailed = true)
                  .then(() => this.productLoading = false)
               }, 2000)
            },
            changeImage(index) {
                this.indexColor = index;
            },
            increaseAmount() {
                this.productAmount += 1
            },
            reduceAmount() {
                if (this.productAmount != 1) {
                    this.productAmount -= 1;
                }
            },
            changeTab(a) {
                this.currentTab = a;
            },
            addToCart() {
              this.productAdded = false;
              this.productAddSending = true;

              this.loadProductTimer = setTimeout(() => {
                this.addProductToCart({productId: this.product.id, color: this.currentColor, size: this.currentSize, amount: this.productAmount})
                .then(() => {
                  this.productAdded = true;
                  this.productAddSending = false;
                })
              }, 1000)
            }
        },
        watch: {
            '$route.params.id': {
                handler() {
                    this.loadProduct();
                },
                immediate: true
            },
        }
    }
</script>
