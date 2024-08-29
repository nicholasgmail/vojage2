<template>
  <div class="top-destination-list">
    <div class="top-destination-title dropdown-section-title">
      Популярные направления
    </div>
    <div class="top-destinations clearfix">
      <template v-for="(item, index) in destinations">
        <span
          @click="destination(item.name)"
          class="top-destination">{{ item.name }}</span>
      </template>
    </div>
  </div>
</template>
<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "TopDestination",
  computed: {
    ...mapGetters(["destinations"]),

  },
  data() {
    return {
      text: ''
    }
  },
  mounted() {
    this.setDestinations();
  },
  methods: {
    ...mapActions(["setHotelList", "setQueryRoute", "setDestinations"]),
    destination(dst) {
      const query = {
        destination: dst,
      }
      let searchInputDestination = document.querySelectorAll('.searchInputDestination');
      searchInputDestination.forEach(function (input) {
        input.placeholder = dst;
      });
      this.$store.commit("SET_RECENT", [{
        text: dst,
        type: 'city',
        query: query
      }])
      this.text = dst;
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
<style>

</style>
