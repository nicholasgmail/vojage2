<template>
  <div id="searchBar"
       :class="{ 'margin_0': $route.name == 'map'}">
    <!-- поиск на моб устройствах -->
    <div :class="{open: open, hidden: hidden}"
         class="fullscreen">
      <button
        @click="openSearch"
        v-show="button_close"
        :class="{ 'display_none': all_close}"
        class="fh-close-popup mode-back  ">
        <i class="line-icon-arrow-left"></i></button>
      <button
        @click="isOpen"
        v-show="!button_close"
        :class="{ 'display_none': all_close}"
        class="fh-close-popup mode-back">
        <i class="line-icon-arrow-left"></i></button>
      <div id="fullscreen-hoc-bloc">
        <div id="fh-title" class="fh-title smd">{{ name }}</div>
        <div id="fh-content">
          <div id="SearchContainer">
            <!-- первоначальное меню поиска на моб устройствах -->
            <div
              :class="{ 'state-open': all_close}"
              class="searchFilterMobile search-result-dashboard">
              <div>
                <div
                  class="dashboardButton"
                  :class="[item.class_dashboard, item.active]"
                  v-for="(item, index) in menu" :key="index">
                  <button
                    @click="openSearch(item.type, item.title)"
                    :class="item.class_button">
                    <div v-html="item.icon" style="display: inline"></div>
                    <div class="overflow_wd-60 textButton"><span
                      class="label">{{ item.title }}</span>
                      <div v-html="getDescription(item.type, item.description)"
                           :id="`menuMob${index+1}`"
                           style="display: inline"
                           class="description"></div>
                    </div>
                  </button>
                  <span
                    v-show="activated(item.active)"
                    @click="clearQuery(item.type)"
                    class="clearButton"><i
                    class="icon-close"></i></span>
                </div>
                <div class="stacked-bottom">
                  <button @click="ResetAllOptions" class="btn reset">Сбросить</button>
                  <button
                    @click="fetchData"
                    v-show="hotel_length > 1" class="btn pink valid ">Посмотреть <span id="htlLnCn">{{
                      hotel_length
                    }}</span>
                    {{ pluralize(hotel_length, "тур", "тура", "туров") }}
                  </button>
                  <button
                    @click="fetchData(true)"
                    v-show="hotel_length <= 1" class="btn pink valid ">Посмотреть все туры
                  </button>
                </div>
              </div>
            </div>
            <!-- вкладка  Место назначения -->
            <div
              :class="{ 'state-open': destination}"
              class="searchFilterMobile search-result-dashboard">
              <div>
                <div class="searchButton desti searchBar-section">
                  <i class="icon-search-2"></i><input type="input"
                                                      class="searchInputDestination "
                                                      placeholder="Пункт назначения (страна)"
                                                      v-model="search_list">
                </div>
                <search-filters
                  :search_list="search_list"
                  ref="searchFilter"
                  @close_text="handleClose"
                />
              </div>
            </div>

            <!-- Вкладка дата отправления-->
            <div
              :class="{ 'state-open': calendar}"
              id="parent_cl"
              v-click-outside="closeOpen"
              class="searchFilterMobile search-result-dashboard">
              <calendar/>
              <button
                @click="openSearch"
                class="btn pink valid pink_valid_block ">Поиск
              </button>
            </div>

            <!-- вкладка город отправления -->
            <div
              :class="{ 'state-open': plane}"
              class="searchFilterMobile search-result-dashboard">
              <div class="more_filters_content">
                <div class="more_filters">
                  <city-picker
                    :hidden=false
                    ref="cityPicker"
                    @query_city="handleQueryCity"/>
                  <button
                    @click="openSearch"
                    class="hidden-desktop submit stacked-bottom">
                    Поиск
                  </button>
                </div>
              </div>
            </div>

            <!-- вкладка  длительность-->
            <div
              :class="{ 'state-open': duration}"
              class="searchFilterMobile search-result-dashboard">
              <div class="more_filters_content">
                <div class="more_filters">
                  <duration-picker
                    :hidden=false
                    ref="durationPicker"
                    @query_duration="handleQueryDurations"/>
                </div>
                <div class="buttons sales">
                  <button
                    @click="openSearch"
                    class="btn pink valid ">Поиск
                  </button>
                </div>
              </div>
            </div>

            <!-- вкладка цена за человека -->
            <div
              :class="{ 'state-open': budget}"
              class="searchFilterMobile search-result-dashboard">
              <div class="more_filters_content">
                <div class="more_filters">
                  <range-picker
                    :hidden=false
                    ref="rangePicker"
                    @query_range="handleQueryRange"
                  />
                </div>
                <div class="buttons sales">
                  <button
                    @click="openSearch"
                    class="btn pink valid ">Поиск
                  </button>
                </div>
              </div>
            </div>

            <!-- вкладка тип отдыха -->
            <div
              :class="{ 'state-open': map}"
              class="searchFilterMobile search-result-dashboard">
              <div class="more_filters_content">
                <div class="more_filters">
                  <stay-picker
                    :hidden=false
                    ref="stayPicker"
                    @query_stay="handleQueryStay"/>
                </div>
                <button
                  @click="openSearch"
                  class="hidden-desktop submit stacked-bottom">
                  Поиск
                </button>
              </div>
            </div>

            <!-- вкладка вместимость номера -->
            <div
              :class="{ 'state-open': capacity}"
              class="searchFilterMobile search-result-dashboard">
              <div class="more_filters_content">
                <div class="more_filters">
                  <capacity-picker
                    :hidden=false
                    ref="capacityPicker"
                    @query_capacity="handleQueryCapacity"/>
                </div>
                <div class="buttons sales">
                  <button
                    @click="openSearch"
                    class="btn pink valid ">Поиск
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
    <!-- поиск на десктопах -->
    <div id="SearchContainer">
      <div
        :class="{'pin': $route.name == 'map', 'stacked': $route.name == 'map'}"
        class="searchResult">
        <div class="searchContent">
          <div class="searchInput search_open">
            <!-- Ввод данных для поиска -->
            <div class="dropdown searchDestinationDropdown">
              <a class="dropdown__trigger ">
                <div class="searchButton desti searchBar-section">
                  <i class="icon-search-2"></i><input type="input"
                                                      @click="isOpen"
                                                      readonly
                                                      id="inputSearchD"
                                                      class="searchInputDestination"
                                                      placeholder="Пункт назначения (страна)"
                                                      value="">
                </div>
              </a>
            </div>
          </div>
          <div class="searchInput search_hidden">
            <!-- Ввод данных для поиска -->
            <div
              :class="{ 'dropdown--active': dropdown_active === 'search'}"
              id="dropCloseActive"
              class="dropdown searchDestinationDropdown">
              <a class="dropdown__trigger ">
                <div
                  @click="handleClose('search')"
                  class="searchButton desti searchBar-section">
                  <i class="icon-search-2"></i>
                  <input type="input"

                         class="searchInputDestination"
                         placeholder="Пункт назначения (страна)"
                         v-model="search_list">
                </div>
              </a>
              <div v-click-outside="closeOpen">
                <search-filters
                  :search_list="search_list"/>
              </div>
            </div>
            <!-- Календарь -->
            <div
              id="parentMenu"
              @click="handleClose('date')"
              :class="{ 'dropdown--active': dropdown_active === 'date'}"
              class="dropdown departureDateDropdown">
              <a class="dropdown__trigger ">
                <div
                  class="filterButton date searchBar-section only-desktop">
                  <button
                    id="calendarDate"
                    class="btn-date"><i
                    class="icon-calendar-empty"></i>Дата отправления
                  </button>
                  <button
                    id="calendarDateClose"
                    class="close-btn only-desktop"
                    style="display:none;background: white;"
                  ><i class="icon-close"></i></button>
                </div>
              </a>
              <div
                id="parent_cl"
                v-click-outside="closeOpen" class="dropdown__content ">
                <calendar/>
              </div>
            </div>
            <!-- Фильтры -->
            <div
              id="parentMenu"
              :class="{ 'dropdown--active': dropdown_active === 'more'}"
              class="dropdown moreFiltersDropdown">
              <a
                class="dropdown__trigger ">
                <div
                  class="filterButton searchBar-section more-filters only-desktop ">
                  <button
                    @click="handleClose('more')"
                    class="btn-criterias"><span
                    class="countFilter"><i
                    class="icon-filters2"></i></span>Все фильры
                  </button>
                </div>
              </a>
              <div
                id="parent"
                v-click-outside="closeOpen"
                class="dropdown__content">
                <more-filters-content
                  ref="moreFiltersContent"
                  @close_dropdown="handleClose"/>
              </div>
            </div>
          </div>
          <!-- Карта -->
          <div id="map-pin">
            <button
              v-show="$route.name == 'map'"
              @click="$router.push('/')"
            ><i class="icon-sdv"></i><span class="map-pin-text">Показать списком</span></button>
            <button
              v-show="$route.name !== 'map'"
              @click="$router.push('/map')"
            ><i class="line-icon-map"></i><span
              class="map-pin-text">На карте</span></button>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import MoreFiltersContent from "./MoreFiltersContent.vue";
import SearchFilters from "./SearchFilters.vue";
import MENU from '~/api/mobile_nav';
import {mapActions, mapGetters} from "vuex";
import allFunctions from '~/mixins/all_function.js';
import CityPicker from "./filters_content/CityPicker.vue";
import DurationPicker from "./filters_content/DurationPicker.vue";
import StayPicker from "./filters_content/StayPicker.vue";
import CapacityPicker from "./filters_content/CapacityPicker.vue";
import RangePicker from "./filters_content/RangePicker.vue";
import DURATION from '~/api/duration';
import allFilter from "~/mixins/all_filter";
import Calendar from "./all/calendar.vue";

export default {
  name: "SearchBar",
  mixins: [allFunctions, allFilter],
  components: {
    Calendar,
    RangePicker, CapacityPicker, StayPicker, DurationPicker, CityPicker, SearchFilters, MoreFiltersContent
  },
  props: ["hotels"],
  data() {
    return {
      menus: MENU.getMenu,
      all_close: true,
      destination: false,
      calendar: false,
      plane: false,
      duration: false,
      map: false,
      capacity: false,
      budget: false,
      active: null,
      dropdown_active: null,
      name: 'Поиск',
      open: false,
      hidden: true,
      button_close: false,
      alertVisible: false,
      query_duration: {},
      query_capacity: {},
      query_stay: {},
      city_all: '',
      query_city: [],
      query_range: [],
      text: [],
      text_range: '',
      text_stay: '',
      text_capacity: '',
      text_calendar: '',
      text_duration: '',
      text_city: '',
      text_destination: '',
      search_list: '',
      clickOutside: true,
      vcoConfig: {
        handler: this.closeOpen,
        detectIFrame: false,
      },
    };
  },
  watch: {
    open(newVal, oldVal) {
      return newVal;
    },
    //hotel_length(newValue, oldValue) {
    //  return newValue;
    //},
    dropdown_active(newValue, oldValue) {
      return oldValue;
    },
  },
  created() {
    const query = {...this.queryParams, ...this.$store.state.query};
    this.$store.commit('GET_QUERY_LIST', query);
  },
  computed: {
    ...mapGetters(['query_keys', "query", "hotel", "hotel_length"]),
    menu: {
      get() {
        return this.menus;
      },
      set(data) {
        this.menus = data;
        return data;
      }
    }
  },
  mounted() {
    // this.setHotelList();
    let fr_date_close = document.getElementById('calendarDateClose');
    fr_date_close.addEventListener('click', this.closeDialData);
  },
  methods: {
    closeDialData() {
      let fr_date = document.getElementById('calendarDate');
      let fr_date_close = document.getElementById('calendarDateClose');
      fr_date.innerHTML = `<i class="icon-calendar-empty"></i>Дата отправления`
      fr_date_close.style.display = 'none';
    },
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
    closeOpen(event) {
      if (event)
        if (!event.target.closest("#dropCloseActive")
          && !event.target.closest("#parentMenu")
          && !event.target.closest("#parent") && !event.target.closest("#parent_cl")) {
          this.active = false;
          this.dropdown_active = 'false';
        }
    },
    handleClose(data) {
      this.clickOutside = false;
      if (data) {
        this.destination = true;
        this.button_close = false;
        this.all_close = true;
      }
      this.dropdown_active = data;
      let dropCloseActive = document.getElementById('dropCloseActive');
      if (data === 'search' && !dropCloseActive.classList.contains('dropdown--active')) {
        dropCloseActive.classList.add('dropdown--active')
      }
    },
    async fetchData(get_hotel) {
      this.city_all = '';
      this.query_city.map(([key, value]) => (value)).map((value) => {
        if (value["selected"]) {
          this.city_all = value["name"] + ', ' + this.city_all;
        }
        return value;
      }, {});
      if (this.city_all.length > 0) {
        this.city_all = {'depature_city': this.city_all}
      }
      const store_query = this.query;
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
        let text_out = this.getTextRecent();
        let text = '';
        if (typeof text_out !== 'string') {
          text = text_out.then((result) => {
            return result;
          }).catch((error) => {
            console.error(error);
          });
        } else {
          text = text_out;
        }
        if (text !== '')
          this.$store.commit("SET_RECENT", [{
            text: text,
            type: 'all',
            query: query,
          }])
        await this.setHotelList(query);
        await this.setHotelCount(query);
        this.isOpen();
      }
      await this.setQueryRoute(query);
      this.emitUpdateMap();
    }
    ,
    emitUpdateMap() {
      this.$emit('update_map', true)
    }
  }

}
</script>
<style lang="scss" scoped>
#searchBar.margin_0 {
  margin: 0;
}

.fullscreen.open .dashboardButton button .overflow_wd-60 {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 60%;
}

#SearchContainer {
  .display_none {
    display: none !important;
  }

  .display_block {
    display: block !important;
  }

  .search_open {
    display: none;
  }
}

@media only screen and (max-width: 1024px) {
  #SearchContainer {
    .search_hidden {
      display: none;
    }

    .search_open {
      display: block;
    }
  }
}
</style>
