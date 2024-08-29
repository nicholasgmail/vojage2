<template>
  <div class="geographical-area-list">
    <div class="geographical-area-title dropdown-section-title">
      Местоположение
    </div>
    <div class="geographical-areas clearfix">
      <template v-for="(item, index) in geographicals">
      <span
        @click="geographical_area(item.type, item.name)"
        class="geographical-area geographical-ar">
         <span v-html="item.icon"></span><span>{{ item.name }}</span></span>
      </template>
    </div>
  </div>
</template>
<script>
import SEARCH from '~/api/search';
import {mapActions} from "vuex";

export default {
  name: "GeographicalArea",
  data() {
    return {
      text: ''
    }
  },
  computed: {
    geographicals() {
      return SEARCH.getGeographicalArea;
    }
  },
  methods: {
    ...mapActions(["setHotelList", "setQueryRoute"]),
    geographical_area(area, name) {
      let query = {}
      this.text = name;
      switch (area) {
        case 'indian_ocean':
          query = {
            zone_indian_ocean: true,
          }
          break
        case 'europe':
          query = {
            zone_europe: true,
          }
          break
        case 'turkey_egypt':
          query = {
            zone_turkey_egypt: true,
          }
          break
        case 'exotic':
          query = {
            zone_exotic: true,
          }
          break
        case 'caribbean':
          query = {
            zone_caribbean: true,
          }
          break
      }
      let searchInputDestination = document.querySelectorAll('.searchInputDestination');
      searchInputDestination.forEach(function (input) {
        input.placeholder = name;
      });
      this.$store.commit("SET_RECENT", [{
        text: name,
        type: 'city',
        query: query
      }])
      this.setHotelList(query)
      this.setQueryRoute(query);
      this.emitFilters();
    },
    emitFilters() {
      this.$emit('get_text', this.text)
    }
  }
}
</script>
<style scoped>
</style>
