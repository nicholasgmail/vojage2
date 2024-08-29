<template>
  <div class="dropdown__content ">
    <recent-search
      v-show="hidden_search"
      ref="recentSearch"
      @get_text="handleSearch"
    />
    <top-destination
      v-show="hidden_search"
      ref="topDestination"
      @get_text="handleDestination"
    />
    <geographical-area
      v-show="hidden_search"
      ref="geographicalArea"
      @get_text="handleArea"
    />
    <div v-show="!hidden_search">
      <all-search
        ref="allSearch"
        :search="search_list"/>
    </div>
  </div>
</template>
<script>
import RecentSearch from "./filters_content/search/RecentSearch.vue";
import TopDestination from "./filters_content/search/TopDestination.vue";
import GeographicalArea from "./filters_content/search/GeographicalArea.vue";
import {mapGetters} from "vuex";
import AllSearch from "./filters_content/search/AllSearch.vue";

export default {
  name: 'SearchFilters',
  components: {AllSearch, GeographicalArea, TopDestination, RecentSearch},
  props: ["search_list"],
  data() {
    return {
      text: '',
      hidden_search: true,
    }
  },
  watch: {
    search_list(newVal, oldVal) {
      if (newVal.length > 0) {
        this.hidden_search = false;
      } else {
        this.hidden_search = true;
      }
      return newVal;
    }
  },
  methods: {
    handleSearch(data) {
      this.text = data;
      //this.$emit('close_text', true);
      //this.$parent.openSearch();
      this.closeMenuSearch();
      this.$parent.hidden = true;
    },
    handleDestination(data) {
      this.text = data;
      this.closeMenuSearch();
      this.$parent.hidden = true;
    },
    handleArea(data) {
      this.text = data;
      this.closeMenuSearch();
      this.$parent.hidden = true;
    },
    closeMenuSearch() {
      let drop_all = document.querySelectorAll('.moreFiltersDropdown');
      drop_all.forEach(element => {
        element.classList.remove('dropdown--active');
      });
      let dropCloseActive = document.getElementById('dropCloseActive');
      if (dropCloseActive) {
        dropCloseActive.classList.remove('dropdown--active');
      }
      this.$parent.open = false
    },
    updateSearch() {
      if (this.$refs.geographicalArea)
        this.$refs.geographicalArea.$data.text = '';
      if (this.$refs.topDestination)
        this.$refs.topDestination.$data.text = '';
      if (this.$refs.recentSearch)
        this.$refs.recentSearch.$data.text = '';
      if (this.$refs.allSearch) {
        this.$refs.allSearch.$data.text = '';
        this.$refs.allSearch.$data.hl = [];
      }
    }
  }
}
</script>

<style scoped>

</style>
