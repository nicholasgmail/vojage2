<template>
  <div class="city-picker">
    <span v-show="hidden" class="city-title dropdown-section-title">Город вылета</span>
    <div class="city-content">
      <div class="city-list dropdown-section-list">
        <div class="city-list__section clearfix">
          <template v-for="(item, index) in city_1">
            <span
              @click="getIndex1(index)"
              :class="{ selected: item.selected }"
              class="dropdown-section-option active ">
																						<input type="checkbox">
																						<label class="city-checkbox"
                                                   :for="index"></label>
																						<label class="city-label"
                                                   :for="index">{{ item.name }}</label>
																					</span>
          </template>
        </div>
        <div v-show="city_2_length" class="city-list__section full-list__section clearfix hidden-desktop">
          <template v-for="(item, index) in city_2">
            <span
              @click="getIndex2(index)"
              :class="{ selected: item.selected }"
              class="dropdown-section-option active ">
																						<input type="checkbox">
																						<label class="city-checkbox"
                                                   :for="index"></label>
																						<label class="city-label"
                                                   :for="index">{{ item.name }}</label>
																					</span>
          </template>
        </div>
        <div v-show="city_2.length > 0 && !active || !hidden" class="city-list__more-cities">
          Альтернативные аэропорты вылета будут
          предлагаться во всех предложениях в режиме
          реального времени.
        </div>
        <button @click="isActive" v-show="city_2.length > 0 && active" class="city-list__toggle">Показать все
          доступные города<i
            class="icon line-icon-angle-down"></i>
        </button>
        <button @click="isActive" v-show="city_2.length > 0 && !active" class="city-list__toggle">
          Скрыть доступные города<i class="icon line-icon-angle-up"></i></button>
      </div>
    </div>
  </div>
</template>
<script>
import allFunctions from '~/mixins/all_function.js';

export default {
  name: "CityPicker",
  mixins: [allFunctions],
  props: {
    hidden: Boolean
  },
  data() {
    return {
      city_1: [],
      city_2: [],
      query_duration: {},
      cities: [],
      active: true,
      index: '',
      text_1: '',
      text_2: '',
      text: '',
      city_2_length: false,
      query: {}
    }
  },
  watch: {
    city_1(newValue, oldValue) {
      return newValue;
    },
    city_2(newValue, oldValue) {
      return newValue;
    }
  },
  computed: {},
  mounted() {
    const query = this.queryParams;
    const str = query["depature_city"];
    const response = this.$api.$get('/api/v01/hotel/depature-cities/');
    response.then((data) => {
      this.city_1 = data.slice(0, 6);
      this.city_2 = data.slice(6, data.length);
      if (this.city_2.length > 0)
        this.city_2_length = true
      if (typeof str !== 'undefined') {
        const arr = str.split(',')
          .map(item => item.replace(/\s+/g, ''))
          .filter(value => {
            if (value !== null) return value;
          });
        this.city_1 = Object.entries(this.city_1).map(([key, value]) => {
          arr.map((val) => {
            if (value["name"] === val) {
              value['selected'] = true;
            }
          });
          return value;
        });
        this.city_2 = Object.entries(this.city_2).map(([key, value]) => {
          arr.map((val) => {
            if (value["name"] === val) {
              value['selected'] = true;
            }
          });
          return value;
        });
        this.emitFilters();
      }
    }).catch((error) => {
      console.error(error);
    });
    //this.$emit('query_city', this.query_duration);
  },
  methods: {
    isActive() {
      this.active = !this.active;
    },
    getIndex1(index) {
      this.text_1 = '';
      const values = Object.values(this.city_1);
      values[index].selected = !values[index].selected;

      this.city_1 = values;

      this.text_1 = values
        .filter(value => value.selected)
        .map(value => value.name)
        .join(', ');
      this.emitFilters()
    },
    getIndex2(index) {
      this.text_2 = '';
      const values = Object.values(this.city_2);
      values[index].selected = !values[index].selected;

      this.city_2 = values;

      this.text_2 = values
        .filter(value => value.selected)
        .map(value => value.name)
        .join(', ');
      this.emitFilters()
    },
    updateCity() {
      this.city_1 = Object.values(this.city_1).map((value, key) => {
        value["selected"] = false;
        return value;
      });
      this.city_2 = Object.values(this.city_2).map((value, key) => {
        value["selected"] = false;
        return value;
      });
      this.text = '';
      this.text_1 = '';
      this.text_2 = '';

    },
    emitFilters() {
      let arr_1 = Object.entries(this.city_1);
      let arr_2 = Object.entries(this.city_2);
      let text_out = '';
      if (this.text_1 !== '' && this.text_2 !== '') {
        this.text = this.text_1 + ', ' + this.text_2;
      } else if (this.text_1 !== '' && this.text_2 === '') {
        this.text = this.text_1;
      } else if (this.text_1 === '' && this.text_2 !== '') {
        this.text = this.text_2;
      }
      this.query = [...arr_1, ...arr_2];
      this.$emit('query_city', this.query);
    },
  },
}
</script>

<style lang="scss" scoped>
@media only screen and (max-width: 1024px) {
  #SearchContainer {
    .city-list__toggle {
      display: none;
    }

    .city-list__more-cities {
      max-width: 100%;
      margin: 0-10px;
    }
  }
}
</style>
