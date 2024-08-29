<template>
  <div class="recent-search-list">
    <div v-show="recent !== null" class="recent-search-title dropdown-section-title">
      Поиск
    </div>
    <div class="recent-searches destination-list">
      <div v-for="(item, index) in recent"
           @click="getHotel(search, item['city'], item['country'])"
           v-if="item['country'] || item['city']"
           :key="index"
           class="recent-search destination">
        <span
          v-if="searchIcon(item, search)">
           <i class="recent-search-img icon-city"></i> {{ item["city"] }}</span>
        <span v-else>
           <i class="recent-search-img icon-earth"></i> {{ item["country"] }}</span>
      </div>
    </div>
  </div>
</template>
<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "AllSearch",
  props: ['search'],
  data() {
    return {
      text: '',
      hl: [],
    }
  },
  computed: {
    ...mapGetters(['hotel']),
    recent: {
      get() {
        return this.hl;
      },
      set(search) {
        this.hl = Object.values(this.hotel).filter((v) => {
          if (v["city"] !== null || v["country"] === null) {
            return v["city"].toLowerCase().includes(search);
          } else if (v["city"] === null || v["country"] !== null) {
            return v["country"].toLowerCase().includes(search);
          }
          return v["city"].toLowerCase().includes(search) || v["country"].toLowerCase().includes(search);
        }).filter((v, index, self) => {
          if (v["city"] !== null || v["country"] === null) {
            return self.findIndex((t) => t["city"] === v["city"]) === index;
          } else if (v["city"] === null || v["country"] !== null) {
            return self.findIndex((t) => t["country"] === v["country"]) === index;
          }
          return (
            self.findIndex((t) => t["city"] === v["city"] || t["country"] === v["country"]) === index
          );
        });
        return this.hl;
      }
    }
  },
  watch: {
    search(newValue, oldValue) {
      this.recent = newValue;
      if (newValue.length <= 0)
        this.$parent.$parent.$parent.hotels = '';
      return newValue;
    }
  },
  async mounted() {
    //if (this.hotel)
    //await this.setHotelList(this.query);
    const hotel = [...Object.entries(this.hotel)];
    this.hl = {...hotel};

  },
  methods: {
    ...mapActions(["setHotelList"]),
    searchIcon(item, search) {
      if (item['city'] !== null)
        return item['city'].toLowerCase().includes(search);
      return false;
    },
    getHotel(search, city, country) {
      this.$parent.handleSearch(`${city}/${country}`);
      this.$parent.$parent.handleClose(true);
      this.$parent.$parent.isOpen();
      this.$parent.$parent.$parent.hotels = search;
    }
  }
}
</script>

<style scoped>

</style>
