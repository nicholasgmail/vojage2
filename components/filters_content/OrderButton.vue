<template>
  <span class="order-button">
			<span
        @click="listOrder">{{ text }}</span>
        <i @click="listOrder" class="icon-arrow-down"></i>
		<div
      v-show="close_list"
      class="list-order">
			<div v-for="(item, index) in durations" :key="index"
           @click="getDuration(item.type)"
           class="sorter-title-li">{{ item.name }}</div>
		</div>
	</span>
</template>
<script>
import DURATION from '~/api/duration';
import allFunctions from '~/mixins/all_function.js';
import {mapActions, mapGetters} from "vuex";

export default {
  name: "OrderButton",
  mixins: [allFunctions],
  data() {
    return {
      query_duration: {},
      text: 'Скидке',
      close_list: false,
    }
  },
  computed: {
    ...mapGetters(['query']),
    durations() {
      return DURATION.getOrderBlock;
    }
  },
  methods: {
    ...mapActions(["setHotelList", "setQueryRoute"]),
    isActive(duration) {
      return this.query_duration[duration];
    },
    listOrder() {
      this.close_list = !this.close_list;
    },
    getDuration(duration) {
      switch (duration) {
        case 'recommended':
          this.text = 'Скидке';
          delete this.query["newest"]
          let query_recommended = {...this.query, ...{'recommended': true}};
          this.$store.commit("SET_QUERY", query_recommended)
          break;
        case 'newest':
          this.text = 'Самые новые';
          delete this.query["recommended"]
          let query_new = {...this.query, ...{'newest': true}};
          this.$store.commit("SET_QUERY", query_new)
          break;
      }
      this.setQueryRoute(this.query);
      this.$store.dispatch('setHotelList', this.query);
      if (Object.keys(this.query_duration).length !== 0) {
        let keys_duration = Object.keys(this.query_duration);
        this.$store.commit('SET_QUERY_KEYS', keys_duration);
      }
      this.query_duration[duration] = !this.query_duration[duration];
      this.query_duration = this.filterObject(this.query_duration, duration);
      this.active = this.isActive(this.query_duration);
      this.close_list = !this.close_list;
      this.$store.state.limit = 0;
      this.$store.state.offset = 0;
    },
  }
}
</script>

<style>

</style>
