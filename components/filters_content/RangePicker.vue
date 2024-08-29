<template>
  <div class="bloc-budget-picker clearfix">
    <span v-show="hidden" class="budget-picker-title dropdown-section-title">Цена на человека
      <span v-show="active"
            class="dropdown-section-title_message">Для более точного результата выберите <b>дату</b> и желаемый <b>город</b> вылета</span></span>
    <div v-show="active" class="budget-content">
      <div class="budget-picker dropdown-section-list">
        <div class="PriceFilter">
          <div class="PriceFilter__histogram">
            <histogram
              :closest="closestNumber"
              :price="price"
              ref="histogram"/>
          </div>
          <div class="PriceFilter__range price__range">
            <div class="custom-slider rangeslider--theme-2">
              <input
                id="rangePicker"
                v-model="value"
                @mousemove="RangePicker"
                @mouseup="emitFilters"
                @mouseover="onMouseOver"
                @mouseleave="onMouseOver"
                @touchmove="RangePicker"
                @touchup="emitFilters"
                @touchstart="onMouseOver"
                @touchend="touchEndC"
                type="range"
                :min="min"
                :max="max"
                class="slider"
                ref="rangeSlider"
              />
              <div ref="sliderValue"
                   v-show="isHovered"
                   class="slider-value rangeslider__handle-tooltip">
                <span><div><b>₽ {{ closestNumber }}</b> /человек</div></span>
              </div>
            </div>
            <div class="rangeslider--theme-2">
              <ul class="rangeslider__labels">
                <li @click="changeValue('max')" class="rangeslider__label-item"> {{ get_max }} ₽
                </li>
                <li @click="changeValue('min')" class="rangeslider__label-item"> {{ get_min }} ₽
                </li>
              </ul>
            </div>
          </div>
          <div class="PriceFilter__mention">
            Ориентировочная цена при 2-х местном
            размещении
          </div>
        </div>
      </div>
    </div>
    <div v-show="!active" class="budget-content">
      <div class="budget-picker dropdown-section-list">
        <div class="PriceFilter">
          <div class="PriceFilter__range">
            <div class="rangeslider rangeslider-horizontal rangeslider--theme-2 is-disabled" aria-valuemin="0"
                 aria-valuemax="15" aria-valuenow="16" aria-orientation="horizontal">
              <div class="rangeslider__fill" style="width: 312px;"></div>
              <div class="rangeslider__handle" tabindex="0" style="left: 312px;">
                <div class="rangeslider__handle-label"></div>
              </div>
              <ul class="rangeslider__labels"></ul>
            </div>
          </div>
          <div class="PriceFilter__mention">
            Ориентировочная цена при 2-х местном
            размещении
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

import allFunctions from '~/mixins/all_function.js';
import {mapActions, mapGetters} from "vuex";
import Histogram from "./components/histogram.vue";

export default {
  name: "RangePicker",
  components: {Histogram},
  mixins: [allFunctions],
  props: {
    hidden: Boolean
  },
  data() {
    return {
      value: 50,
      active: true,
      min: 0,
      max: 100,
      max_old: 100,
      closestNumber: 0,
      price: [0],
      range_query: {},
      text: '',
      step: '',
      isHovered: false
    }
  },
  computed: {
    ...mapGetters(["hotel", "hotel_length", "query"]),
    get_max: function () {
      const all_arr = []
      for (const key in this.hotel) {
        all_arr.push(this.hotel[key]["two_person_price"]);
      }
      this.price = [...all_arr];
      const max = Math.max(...all_arr);
      return max;
    },
    get_min: function () {
      const all_arr = []
      for (const key in this.hotel) {
        all_arr.push(this.hotel[key]["two_person_price"]);
      }
      const min = Math.min(...all_arr);
      return min;
    }
  },
  updated() {
    if (this.price.length > 1) {
      this.active = true;
    } else {
      this.active = false;
    }
  },
  mounted() {
    var range = document.getElementById('rangePicker');
    range.addEventListener('touchmove', this.RangePicker);
    if (this.price.length > 0) {
      let max = Math.max(...this.price);
      this.closestNumber = max;
      this.value = max * 50 / 100;
    }
    this.RangePicker();
  },
  watch: {
    value(newValue, oldValue) {
      const sliderValueElement = this.$refs.sliderValue;
      const slider = this.$refs.rangeSlider;
      const sliderWidth = slider.offsetWidth - slider.offsetWidth * 30 / 100;
      sliderValueElement.style.left = `${(newValue / 100) * sliderWidth}px`;
      return newValue;
    },
    price(newValue, oldValue) {
      return oldValue;
    },
    closestNumber(newValue, oldValue) {
      return newValue;
    },
    step(newValue, oldValue) {
      return newValue;
    }
  },
  methods: {
    ...mapActions(["setHotelList"]),
    touchEndC() {
      this.onMouseOver();
      this.emitFilters();
    },
    onMouseOver() {
      this.isHovered = !this.isHovered;
    },
    changeValue(val) {
      switch (val) {
        case "min":
          const min = Math.min(...this.price);
          const max = Math.max(...this.price);
          this.value = 100 * min / max;
          break;
        case "max":
          this.value = 100;
          break
        default:
          this.value = 50;
      }
      this.RangePicker();
    },
    RangePicker(event) {
      let x1 = 100 * this.value / this.max;
      let x2 = 100 - x1;
      this.step = x1;
      let color = `linear-gradient(90deg, #bd1343 ${x1}%, #bd1343 ${x2}%)`;
      let size = `${x1}% auto`;
      if (this.$refs.rangeSlider) {
        let element = this.$refs.rangeSlider;
        element.style.setProperty('--background_color', color);
        element.style.setProperty('--background_size', size);
      }
      this.changeNumber();
      if (this.$refs.histogram) {
        this.$refs.histogram.$data.value = this.value
      }
    },
    changeNumber() {
      const numbers = [...this.price];
      const max = Math.max(...numbers);
      const sum = numbers.reduce((acc, num) => acc + num, 0);
      const thirtyPercent = (max / 100) * this.value;
      if (this.$refs.histogram) {
        this.$refs.histogram.$data.value = this.value
      }
      let closestNumber = numbers[0];
      let closestDifference = Math.abs(thirtyPercent - numbers[0]);
      for (let i = 1; i < numbers.length; i++) {
        const difference = Math.abs(thirtyPercent - numbers[i]);
        if (difference < closestDifference) {
          closestNumber = numbers[i];
          closestDifference = difference;
        }
      }
      this.closestNumber = closestNumber;
      if (closestNumber > 0)
        this.text = `Сумма ${closestNumber}/чел.`
    },
    updateRange() {
      this.value = 50;
      this.text = '';
      this.closestNumber = 0;
      this.setHotelList(this.query);
    },
    emitFilters() {
      this.$emit('query_range', {"two_person_price__lte": this.closestNumber})
    }
  }
}
</script>

<style lang="scss">
.slider-container {
  position: relative;
}

.slider {
  width: 100%;
}

.slider-value {
  position: absolute;
  z-index: 99;
  bottom: 21px;
}

:root {
  --trackHeight: 3px;
  --thumbRadius: 1rem;
  --background_color: linear-gradient(90deg, #bd1343 50%, #bd1343 50%);
  --background_size: 50% 50%;
}

.price__range {
  margin-top: 0;
  padding: 0;
  width: 120%;
  margin-left: -9%;
}

.slider {
  -webkit-appearance: none;
  display: block;
  background: var(--background_color);
  height: var(--trackHeight);
  background-size: var(--background_size);
  background-repeat: no-repeat;
  width: 100%;
  border-radius: 999px;
  outline: none;
  -webkit-transition: 0.2s;
  transition: opacity 0.2s;
}

.custom-slider {
  content: "";
  position: relative;
  width: var(--ProgressPercent, 100%);
  height: 100%;
  background: #d3d3d3;
  pointer-events: none;
  border-radius: 999px;
}

.custom-slider input[type="range"]::-webkit-slider-runnable-track {
  appearance: none;
  background: var(--background_color);
  background-size: var(--background_size);
  background-repeat: no-repeat;
  height: var(--trackHeight);
  border-radius: 999px;
}

.custom-slider input[type="range"]::-moz-range-track {
  appearance: none;
  background: var(--background_color);
  background-size: var(--background_size);
  background-repeat: no-repeat;
  height: var(--trackHeight);
  border-radius: 999px;
}

.custom-slider input[type="range"]::-webkit-slider-thumb {
  position: relative;
  top: 50%;
  transform: translate(0, -50%);
  width: 24px;
  height: 24px;
  background: #bd1343;
  border-radius: 999px;
  box-shadow: 0 0 5px 0 rgb(0 0 0 / 40%);
  pointer-events: all;
  appearance: none;
  z-index: 1;
}
</style>
