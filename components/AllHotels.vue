<!-- Please remove this file from your project -->
<template>
  <section id="page-container" class="homepage-homepage">
    <div class="page-center">
      <section id="wrapper_container">
        <main class="page-col-right">
          <div id="app">
            <div id="headerPersonalization">
              <div id="head" class="head head--dataCollect">
                <div class="headBg">
                  <picture class="headBg__figure">
                    <source media="(max-width: 767px)"
                            data-srcset="/images/quiz2-m.webp"
                            srcset="/images/quiz2-m.webp">
                    <source media="(max-width: 1024px)"
                            data-srcset="/images/quiz2.webp"
                            srcset="/images/quiz2.webp">
                    <source media="(min-width: 1025px)"
                            data-srcset="/images/quiz2.webp"
                            srcset="/images/quiz2.webp">
                    <img data-src="/images/quiz2.webp"
                         alt="" class="headBg__img lazyloaded" loading="lazy"
                         src="/images/quiz2.webp">
                  </picture>
                </div>
                <div class="messages show dataCollect">
                  <div>
                    <span class="header_title">Акционные предлдожения <br>напрямую от туроператора.</span>
                    <span class="header_message">Для подбора тура свяжитесь с отделом бронирования
                      по номеру <br>+7 (901) 468-01-68, в
                      <a href="https://t.me/Futturdv" target="_blank" style="color: #fff"><u>Telegram</u></a> или
                      <a href="https://wa.me/79804136407/?text=FYТУР" target="_blank"
                         style="color: #fff"><u>Whatsapp</u></a> <span
                        class="spaceAfter"></span>
												</span>
                    <div class="header_step1">
                      <div class="header_step1_form">
                        <form></form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div id="searchBar-top"></div>
            <!-- Блок поиска -->
            <search-bar/>
            <!-- Всплывающая информация (оповещение) -->
            <div class="alert-banner-block"></div>
            <!-- Контент с предложениями -->
            <div id="saleroom-container">
              <div>
                <div class="generic-width">
                  <div class="sdv-filters">
                    <div class="page-center">
                      <div id="pagination-top" class="pagination top page-center clearfix"></div>
                      <div id="sorter" class="section-title">
                        <div>
                          <span>Лучшие предложения, отсортированные по:</span>
                          <OrderButton/>
                          <div class="separator-rectangle"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <section id="sdv-container" class="wrapper_container">
                  <div>
                    <div class="sdv-section-container">
                      <section-now :hotel="hotels"/>
                    </div>
                  </div>
                </section>
                <div id="bottom-sdv">
                  <div id="reset-dedicated-showroom" class="page-center clearfix"></div>
                </div>
              </div>
              <div class="generic-width">
                <div class="sdv-filters">
                  <div class="page-center">
                    <div id="pagination-top" class="pagination top page-center clearfix"></div>
                    <div id="sorter" class="section-title">
                      <div>
                        <span>Все предложения</span>
                        <div class="separator-rectangle"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <!-- Прокрутка вверх -->
              <button class="scroll-up" aria-label="Top" style="right: 128px;"><i class="line-icon-arrow-top"></i>
              </button>
            </div>
            <section id="saleroom-container" class="px-4">
              <div class="container mx-auto px-4 pb-8">
                <div v-for="(item, index) in hotels_page"
                     :key="index">
                  <client-only>
                    <section-min-hotels :hotel="item"/>
                  </client-only>
                </div>
              </div>
            </section>
          </div>
        </main>
      </section>
    </div>
  </section>
</template>

<script>
import SectionNow from "./SectionNow.vue";
import MoreFiltersContent from "./MoreFiltersContent.vue";
import OrderButton from "./filters_content/OrderButton.vue";
import StayPicker from "./filters_content/StayPicker.vue";
import SectionNext from "./SectionNex.vue";
import SearchFilters from "./SearchFilters.vue";
import SearchBar from "./SearchBar.vue";
import {mapActions, mapGetters} from "vuex";
import SectionMinHotels from "./SectionMinHotels.vue";

export default {
  name: 'AllHotels',
  components: {
    SectionMinHotels,
    SearchBar, SearchFilters, SectionNext, StayPicker, OrderButton, MoreFiltersContent, SectionNow
  },
  data() {
    return {
      active: null,
      search: '',
      hl: []
    }
  },
  computed: {
    ...mapGetters(['hotel', 'query', 'hotel_min']),
    hotels: {
      get() {
        const hotel = [...Object.values(this.hotel)];
        this.hl = {...hotel};
        if (this.search.length > 0) {
          this.hl = Object.values(this.hotel).filter((v) => {
            return v["city"].toLowerCase().includes(this.search)
              || v["country"].toLowerCase().includes(this.search);
          })
        } else {
          this.hl = {...hotel};
        }
        return this.hl;
      },
      set(search) {
        this.search = search;
      }
    },
    hotels_page: {
      get() {
        const arr = [...this.hotel_min];
        const pageSize = 16;
        const totalPages = Math.ceil(arr.length / pageSize);
        const paginatedData = [];
        for (let i = 0; i < totalPages; i++
        ) {
          const startIndex = i * pageSize;
          const endIndex = startIndex + pageSize;
          const pageData = arr.slice(startIndex, endIndex);
          paginatedData.push(pageData);
        }
        return paginatedData;
      }
    }
  },
  mounted() {
  }
}
</script>
<style>
</style>
