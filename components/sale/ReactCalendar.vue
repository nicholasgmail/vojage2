<script>
import {format, differenceInDays} from 'date-fns';
import ruLocale from 'date-fns/locale/ru';
import MonthSelect from "./MonthSelect.vue";

export default {
  name: "ReactCalendar",
  components: {MonthSelect},
  props: {
    dates_with_prices: {
      type: Object,
      default: null
    },
    to: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      dwp: {...this.dates_with_prices},
      cld: [],
      years: format(new Date(), 'yyyy'),
      to_out: this.to ?? '',
      old_value: '',
    }
  },
  mounted() {
    this.mounted_new();
  },
  computed: {
    with_prices: {
      get() {
        return this.dwp;
      },
      set(value) {
        this.dwp = {...value};
      }
    },
    month: {
      get() {
        let month = [];
        for (const key in this.with_prices) {
          const dateArray = key.split(" - ");
          const date1 = new Date(dateArray[0]);
          const arrId = format(date1, 'LLLLyyyy');
          const textDate = format(date1, 'LLLL yyyy', {locale: ruLocale});
          if (!month[textDate]) month[textDate] = [];
          const foundPerson = month.find(month => month === arrId);
          if (!foundPerson) {
            month[textDate] = arrId;
          }
        }
        return month;
      }
    },
  },
  methods: {
    handleYears(data) {
      this.years = data;
    },
    mounted_new() {
      const cld = [];
      for (const key in this.with_prices) {
        const dateArray = key.split(" - ");
        const date1 = new Date(dateArray[0]);
        const date2 = new Date(dateArray[1]);
        const arr = format(date1, 'eeeeee dd MMM', {locale: ruLocale}).slice(0, -1).split(" ")
        const arrId = format(date1, 'LLLLyyyy');
        const arr2 = format(date2, 'eeeeee dd MMM', {locale: ruLocale}).split(" ");
        const textDate = format(date1, 'LLLL yyyy', {locale: ruLocale});
        // arr2[0] = arr2[0] == 'суб' ? 'сб' : arr2[0].slice(0, -1);
        if (!cld[textDate]) cld[textDate] = [];
        cld[textDate].push({
          "starting_date": date1,
          "end_date": date2,
          "number_days": differenceInDays(date2, date1),
          "price": this.dwp[key],
          "date-week-day": arr[0],
          //"date-week-day": arr[0] == 'суб' ? 'сб' : arr[0].slice(0, -1),
          "date-day": arr[1],
          "date-month": arr[2],
          "text_data_end": `${arr2[0]} ${arr2[1]} ${arr2[2]}`,
          "calendar-shortcut-element": textDate,
        })
      }
      this.cld = {...cld};
      this.$refs.monthSelect.mountDwp();
    },
    setItem(item, index, key) {
      if (item['price'] < 1)
        return null;
      this.years = format(item.starting_date, 'yyyy');
      if (this.old_value) {
        this.cld[this.old_value['index']][this.old_value['key']]['selected'] = false;
      }
      this.old_value = {'index': index, 'key': key};
      this.cld[index][key]['selected'] = true;
      this.cld = {...this.cld}
      this.$emit('set_day', item);
      this.$emit('mobile', true);
    },
    getGreen(price, item) {
      let pricesOnly = item.filter(item => item.price > 0).map(item => item.price);
      pricesOnly.sort((a, b) => a - b);
      let percentCount = Math.ceil(pricesOnly.length * 0.1);
      let percent = pricesOnly.slice(0, percentCount);
      if (percent.includes(price)) {
        return true;
      }
    }
  }
}
</script>

<template>
  <div class="react-calendar">
    <div class="year">{{ years }}</div>
    <month-select
      :to="to"
      ref=monthSelect
      :dwp="with_prices"
      @years="handleYears"
    />
    <div id="listContainer" class="date-list-container">
      <div :id="'dateListContainer' + to_out" class="date-list">
        <div
          v-for="(item, index) in cld"
          :key="index">
          <div class="calendar-shortcut">
            <div :id="month[index] + to_out" class="calendar-shortcut-element">{{ index }}</div>
          </div>
          <div
            v-for="(it, key) in item"
            @click="setItem(it, index, key)"
            :key="key">
            <div class="calendar-date">
              <div class="date-start noavailable ">
                <div class="date-week-day">{{ it["date-week-day"] }}</div>
                <div class="date-day">{{ it["date-day"] }}</div>
                <div class="date-month">{{ it["date-month"] }}</div>
              </div>
              <div
                v-show="it['price'] < 1"
                :class="{'soldout': it['number_days'] < 1,
                'soldout': it['price'] < 1}"
                class="date-content">
                <div class="price-label">
                  <span class="sold-out">Продано</span>
                  <div class="price-original"></div>
                </div>
                <div class="more-info">
                  <div v-show="it['price'] >= 1" class="return-date">Обратно {{ it["text_data_end"] }}</div>
                </div>
              </div>
              <div
                v-show="it['price']>0"
                :class="{'soldout': it['selected']}"
                class="date-content">
                <div class="price-label">
                  <div
                    :class="{'soldout-red': it['selected'] && !getGreen(it['price'], item), 'price-green': getGreen(it['price'], item)}"
                    class="price">
                    <span class="price-num">₽{{ it["price"] }}</span>
                    <span
                      :class="{'soldout-red': it['selected'] && !getGreen(it['price'], item), 'price-green': getGreen(it['price'], item)}"
                      class="price-type">/чел <span></span></span>
                  </div>
                  <div class="price-original"></div>
                </div>
                <div class="more-info">
                  <div v-show="it['price'] >= 1" class="return-date">Обратно {{ it["text_data_end"] }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.soldout-red {
  color: #bd1343 !important;
}

.price-green {
  color: #19bd13 !important;
}
</style>
