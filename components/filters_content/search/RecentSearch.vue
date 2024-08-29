<template>
  <div class="recent-search-list">
    <div v-show="recent !== null" class="recent-search-title dropdown-section-title">
      Последние поиски
    </div>
    <div class="recent-searches destination-list">
      <div v-for="(item, index) in recent"
           :key="index"
           class="recent-search destination">
          <span
            @click="clickHotel(item.query, item.text)"
            v-if="item.type === 'city'">
            <i class="recent-search-img icon-city"></i> {{ item.text }}</span>
        <span @click="clickHotel(item.query, item.text)" v-else>
            <i class="recent-search-img icon-earth"></i> {{ item.text }}</span>
      </div>
    </div>
  </div>
</template>
<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "RecentSearch",
  data() {
    return {
      text: '',
    }
  },
  computed: {
    ...mapGetters(['recent']),
  },
  mounted() {
  },
  methods: {
    ...mapActions([
      'setHotelList',
    ]),
    clickHotel(query, text) {
      this.setHotelList(query);
      this.text = text;
      this.emitFilters();
      this.$parent.closeMenuSearch();
    },
    emitFilters() {
      this.$emit('get_text', this.text)
    }
  }
}
</script>

<style scoped>

</style>
