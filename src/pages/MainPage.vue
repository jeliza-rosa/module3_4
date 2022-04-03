<template>
    <main class="content container">
      <div class="content__top">

        <div class="content__row">
          <h1 class="content__title">
            Каталог
          </h1>
          <span class="content__info">
            {{ products.length }} товара
          </span>
        </div>
      </div>

      <div class="content__catalog">

        <ProductFilter :price-from.sync="filterPriceFrom" :price-to.sync="filterPriceTo" :category-id.sync="filterCategoryId" :color-id.sync="filterColorId" :season-id.sync="filterSeasonId" :material-id.sync="filterMaterialId" />

        <section class="catalog">
          <div v-if="productsLoading == true">
            <div id="cube-loader">
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
        <div v-if="productsLoadingFailed == true">Произошла ошибка<button @click.prevent="loadProducts">Попробовать еще раз</button></div>


          <ProductList :products="products"/>

          <BasePagination v-model="page" :count="countProducts" :per-page="productsPerPage"/>
        </section>
      </div>
    </main>
</template>

<script>
  import axios from 'axios';
  import ProductFilter from '@/components/ProductFilter';
  import ProductList from '@/components/ProductList';
  import BasePagination from '@/components/BasePagination';
  import { API_BASE_URL } from '../config';

  export default {
      data() {
        return {
          filterCategoryId: 0,
          filterPriceFrom: 0,
          filterPriceTo: 0,
          filterColorId: [],
          filterMaterialId: [],
          filterSeasonId: [],
          currentColor: 1,

          page: 1,
          productsPerPage: 12,

          productsData: null,
          productsLoading: false,
          productsLoadingFailed: false,
        }
      },
      methods: {
        loadProducts() {
          this.productsLoading = true;
          this.productsLoadingFailed = false;

          clearTimeout(this.loadProductsTimer);
          this.loadProductsTimer = setTimeout(() => {
            axios.get(API_BASE_URL + '/api/products', {
              params: {
                page: this.page,
                limit: this.productsPerPage,
                categoryId: this.filterCategoryId,
                minPrice: this.filterPriceFrom,
                maxPrice: this.filterPriceTo,
                colorIds: this.filterColorId,
                materialIds: this.filterMaterialId,
                seasonIds: this.filterSeasonId,
              }
            })
            .then(response => this.productsData = response.data)
            .catch(() => this.productsLoadingFailed = true)
            .then(() => this.productsLoading = false)
          }, 1000)
        }
      },
      computed: {
        products() {
        return this.productsData
        ? this.productsData.items.map(product => {
          for (let i = 0; i < product.colors.length; i++) {
            if (product.colors[i].gallery != null) {
              return {
                ...product,
                image: product.colors[i].gallery[0].file.url
              }
            }
          }
        })
        : [];
        },
        images() {
          let images = [];
          if (this.productsData) {
            images = []
            for (let i = 0; i < this.products.length; i++) {
              let obj = {img: []};
              for (let j = 0; j < this.products[i].colors.length; j++) {
                if (this.products[i].colors[j].gallery != null) {
                  obj.img.push(this.products[i].colors[j].gallery[0].file.url)
                }
              }
              images.push(obj)
            }
          }

          return images;
        },
        countProducts() {
          return this.productsData ? this.productsData.pagination.total : 0;
        }
      },
      components: {
        ProductFilter,
        ProductList,
        BasePagination
      },
      watch: {
        page() {
          this.loadProducts();
        },
        filterPriceFrom() {
          this.loadProducts();
        },
        filterPriceTo() {
          this.loadProducts();
        },
        filterCategoryId() {
          this.loadProducts();
        },
        filterColorId() {
          this.loadProducts();
        },
        filterMaterialId() {
          this.loadProducts();
        },
        filterSeasonId() {
          this.loadProducts();
        },
      },
      created() {
        this.loadProducts();
      }
  }
</script>
