<template>
  <div class="Histogram">
    <template v-for="(item, index) in histograms">
      <div
        v-if="length_price < 10"
        class="bar"
        style="height: 0%; display: none"></div>
      <div
        class="bar"
        :class='{"bar--active": isActive(index)}'
        :style='{"height": item + "%"}'
        style="display: none"></div>
      <div
        v-if="length_price < 10"
        class="bar"
        style="height: 0%; display: none"></div>
    </template>
  </div>
</template>

<script>
import allFunctions from '~/mixins/all_function.js';

export default {
  name: "histogram",
  mixins: [allFunctions],
  props: ['price'],
  data() {
    return {
      length_price: 0,
      value: 0,
      percent: 0,
    }
  },
  computed: {
    histograms() {
      return this.histogram_set(this.price);
    },
  },
  watch: {
    closest(newValue, oldValue) {
      return newValue;
    },
  },
  methods: {
    isActive(index) {
      const max = Math.max(...this.price);
      const sum = max + max * 30 / 100;
      const percent = sum * 1 / 100;
      let old = percent * this.value;
      return old > index;
    },
    histogram_set(price) {
      let max = Math.max(...price);
      max = max + max * 10 / 100;
      const numbers = [...price];
      this.length_price = numbers.length;
      let result = this.countElements(numbers);
      const sum_all = this.sumObjectValues(Object.values(result));
      const percent = (1 / sum_all) * 100;
      const multiply = this.multiplyValues(result, percent);
      return {...multiply};
    },
    countElements(arr) {
      const count = {};
      for (const item of arr) {
        if (count[item]) {
          count[item]++;
        } else {
          count[item] = 1;
        }
      }
      return count;
    },
  }
}
</script>
