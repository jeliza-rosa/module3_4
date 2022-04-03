<template>
    <aside class="filter">
        <form class="filter__form form" action="#" method="get" @submit.prevent="submit">
            <fieldset class="form__block">
                <legend class="form__legend">Цена</legend>
                <label class="form__label form__label--price">
                <input class="form__input" type="text" name="min-price" v-model.number="currentPriceFrom">
                <span class="form__value">От</span>
                </label>
                <label class="form__label form__label--price">
                <input class="form__input" type="text" name="max-price" v-model.number="currentPriceTo">
                <span class="form__value">До</span>
                </label>
            </fieldset>

            <fieldset class="form__block">
                <legend class="form__legend">Категория</legend>
                <label class="form__label form__label--select">
                <select class="form__select" type="text" name="category" v-model.number="currentCategoryId">
                    <option value="0" hidden>Все категории</option>
                    <option :value="category.id" v-for="category in categories" :key="category.id">{{ category.title }}</option>
                </select>
                </label>
            </fieldset>

            <fieldset class="form__block">
                <legend class="form__legend">Цвет</legend>
                <ul class="colors">
                    <li class="colors__item" v-for="color in colors" :key="color.id">
                        <label class="colors__label">
                        <input class="colors__radio sr-only" type="checkbox" name="color" :value="color.id" v-model.number="currentColorId">
                        <span class="colors__value" :style="'background-color: ' + color.code">
                        </span>
                        </label>
                    </li>
                </ul>
            </fieldset>

            <fieldset class="form__block">
                <legend class="form__legend">Материал</legend>
                <ul class="check-list" v-for="material in materials" :key="material.id">
                    <li class="check-list__item">
                        <label class="check-list__label">
                        <input class="check-list__check sr-only" type="checkbox" name="material" :value="material.id" v-model="currentMaterials">
                        <span class="check-list__desc">
                            {{ material.title }}
                            <span>({{ material.productsCount }})</span>
                        </span>
                        </label>
                    </li>
                </ul>
            </fieldset>

            <fieldset class="form__block">
                <legend class="form__legend">Коллекция</legend>
                <ul class="check-list" v-for="season in seasons" :key="season.id">
                    <li class="check-list__item">
                        <label class="check-list__label">
                        <input class="check-list__check sr-only" type="checkbox" name="collection" :value="season.id" v-model="currentSeasons">
                        <span class="check-list__desc">
                            {{ season.title }}
                            <span>({{ season.productsCount }})</span>
                        </span>
                        </label>
                    </li>
                </ul>
            </fieldset>

            <button class="filter__submit button button--primery" type="submit">
                Применить
            </button>
            <button class="filter__reset button button--second" type="button" v-if="btnReset" @click.prevent="reset">
                Сбросить
            </button>
        </form>
    </aside>
</template>

<script>
  import axios from 'axios';
  import { API_BASE_URL } from '../config';

  export default {
      data() {
          return {
              currentPriceFrom: 0,
              currentPriceTo: 0,
              currentCategoryId: 0,
              currentColorId: [],
              currentMaterials: [],
              currentSeasons: [],

              categoriesData: null,
              colorsData: null,
              materialsData: null,
              seasonData: null,
              btnReset: false
          }
      },
      props: ['priceFrom', 'priceTo', 'categoryId', 'colorId', 'seasonId', 'materialId'],
      computed: {
          categories() {
              return this.categoriesData ? this.categoriesData.items : [];
          },

          colors() {
              return this.colorsData ? this.colorsData.items : [];
          },

          seasons() {
              return this.seasonData ? this.seasonData.items : [];
          },

          materials() {
              return this.materialsData ? this.materialsData.items : [];
          },
          btnResetComp() {
              return this.currentPriceFrom != 0 || this.currentPriceTo != 0 || this.currentCategoryId != 0 || this.currentColorId.length !=0 || this.currentMaterials.length !=0 || this.currentSeasons.length !=0;
          }
      },
      methods: {
          submit() {
              this.$emit('update:priceFrom', this.currentPriceFrom);
              this.$emit('update:priceTo', this.currentPriceTo);
              this.$emit('update:categoryId', this.currentCategoryId);
              this.$emit('update:colorId', this.currentColorId);
              this.$emit('update:seasonId', this.currentMaterials);
              this.$emit('update:materialId', this.currentSeasons);
          },
          reset() {
              this.$emit('update:priceFrom', 0);
              this.$emit('update:priceTo', 0);
              this.$emit('update:categoryId', 0);
              this.$emit('update:colorId', []);
              this.$emit('update:seasonId', []);
              this.$emit('update:materialId', []);
              this.currentPriceFrom = 0;
              this.currentPriceTo = 0;
              this.currentCategoryId = 0;
              this.currentColorId = [];
              this.currentMaterials = [];
              this.currentSeasons = [];
          },
          loadParams() {
              axios.get(API_BASE_URL + '/api/productCategories')
              .then(response => this.categoriesData = response.data);

              axios.get(API_BASE_URL + '/api/colors')
              .then(response => this.colorsData = response.data);

              axios.get(API_BASE_URL + '/api/seasons')
              .then(response => this.seasonData = response.data);

              axios.get(API_BASE_URL + '/api/materials')
              .then(response => this.materialsData = response.data);
          },
      },
      watch: {
          currentPriceFrom() {
              this.btnReset = this.btnResetComp;
          },
          currentPriceTo() {
              this.btnReset = this.btnResetComp;
          },
          currentCategoryId() {
              this.btnReset = this.btnResetComp;
          },
          currentColorId() {
              this.btnReset = this.btnResetComp;
          },
          currentMaterials() {
              this.btnReset = this.btnResetComp;
          },
          currentSeasons() {
              this.btnReset = this.btnResetComp;
          },
      },
      created() {
          this.loadParams();
      }
  }
</script>
