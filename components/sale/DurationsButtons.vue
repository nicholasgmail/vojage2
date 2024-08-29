<script>
export default {
  name: "DurationsButtons",
  props: {
    with_prices: {
      type: Array,
      default: null
    }
  },
  data() {
    return {
      wp: {...this.with_prices}
    }
  },
  computed: {
    durations: {
      get() {
        return this.wp;
      },
      set(value) {
        this.wp = {...value};
      }
    },
  },
  methods: {
    selected(selected) {
      for (const key in this.wp) {
        if (key == selected) {
          this.wp[key]["selected"] = true;
          this.$emit('days', this.wp[key]["days"]);
        } else {
          if (this.wp[key]["selected"])
            this.wp[key]["selected"] = false;
        }
      }
      this.durations = this.wp;
      this.$emit('open_calendar', true);
    },
    text(nights) {
      let nights_text = ''
      if (nights == 21) {
        nights_text = 'ночь'
      } else {
        nights_text = 'ночей'
      }
      return nights_text;
    }
  }
}
</script>

<template>
  <div class="durations-buttons-list">
    <div
      v-for="(item, index) in durations"
      :key="index"
      @click="selected(index)"
      :class="{'selected-duration':item.selected}"
      class="duration-button packaged">
      <div class="nights">{{ item["days"] }} {{ text(item["days"]) }}</div>
      <div class="price">
        <div class="label">От</div>
        <div class="amount">₽{{ item["price"] }}<span
          class="duration-price-type">/чел <span></span></span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
