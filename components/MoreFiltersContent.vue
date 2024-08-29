<template>
  <div
    class="more_filters_content">
    <div class="more_filters">
      <city-picker
        :hidden=true
        ref="cityPicker"
        @query_city="handleQueryCity"/>
      <duration-picker
        :hidden=true
        ref="durationPicker"
        @query_duration="handleQueryDurations"/>
      <range-picker
        :hidden=true
        ref="rangePicker"
        @query_range="handleQueryRange"
      />
      <stay-picker
        :hidden=true
        ref="stayPicker"
        @query_stay="handleQueryStay"/>
      <capacity-picker
        :hidden=true
        ref="capacityPicker"
        @query_capacity="handleQueryCapacity"/>
    </div>
    <div class="buttons sales">
      <button @click="ResetAllOptions(true)" class="btn reset">Сбросить</button>
      <button
        @click="fetchData(true)"
        v-show="hotel_length > 1" class="btn pink valid ">Посмотреть <span id="htlLnCn">{{ hotel_length }}</span>
        {{ pluralize(hotel_length, "тур", "тура", "туров") }}
      </button>
      <button
        @click="fetchData(true)"
        v-show="hotel_length <= 1" class="btn pink valid ">Посмотреть все туры
      </button>
    </div>
  </div>
</template>
<script>
import DurationPicker from "./filters_content/DurationPicker.vue";
import StayPicker from "./filters_content/StayPicker.vue";
import CityPicker from "./filters_content/CityPicker.vue";
import {mapActions, mapGetters} from "vuex";
import allFunctions from '~/mixins/all_function.js';
import RangePicker from "./filters_content/RangePicker.vue";
import DURATION from '~/api/duration';
import CapacityPicker from "./filters_content/CapacityPicker.vue";
import allFilter from "~/mixins/all_filter";

export default {
  name: "MoreFiltersContent",
  mixins: [allFunctions, allFilter],
  components: {CapacityPicker, RangePicker, CityPicker, StayPicker, DurationPicker},
  data() {
    return {
      alertVisible: false,
      query_duration: {},
      query_capacity: {},
      query_stay: {},
      city_all: '',
      query_city: [],
      query_range: [],
      text: [],
    }
  },
  computed: {
    ...mapGetters(['query_keys', "query", "hotel", "hotel_length"]),
  },
  created() {
    const query = {...this.queryParams, ...this.$store.state.query};
    this.$store.commit('GET_QUERY_LIST', query);
  },

  mounted() {
    //this.setHotelList();
  },
  watch: {
    hotel_length(newValue, oldValue) {
      return newValue;
    },
  },
  methods: {
    pluralize(count, singular, genitive, plural) {
      count = Math.abs(count);
      const remainder10 = count % 10;
      const remainder100 = count % 100;

      if (remainder10 === 1 && remainder100 !== 11) {
        return singular;
      } else if (
        (remainder10 >= 2 && remainder10 <= 4) &&
        !(remainder100 >= 12 && remainder100 <= 14)
      ) {
        return genitive;
      } else {
        return plural;
      }
    },
    fetchData(get_hotel) {
      this.city_all = '';
      this.city_all = this.query_city.filter(([, value]) => value.selected)
        .map(([, value]) => value.name)
        .join(', ')
      if (this.city_all.length > 0) {
        this.city_all = {'depature_city': this.city_all}
      }
      const store_query = this.$store.state.query_all;
      let query = {
        ...store_query,
        ...this.query_duration,
        ...this.query_stay,
        ...this.city_all,
        ...this.query_range,
        ...this.query_capacity
      };
      this.setHotelCount(query);
      if (get_hotel) {
        let text = this.getTextRecent();
        if (text !== '')
          this.$store.commit("SET_RECENT", [{
            text: text,
            type: 'all',
            query: query,
          }])
        this.setHotelList(query);
        this.setHotelCount(query);
        this.emitClose();
      }
      this.setQueryRoute(query);
    },
    emitClose() {
      this.$emit('close_dropdown', '')
    },
  }
}
</script>

<style>

</style>
