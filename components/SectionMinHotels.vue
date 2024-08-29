<template>
  <!-- Актуальные предложения -->
  <section class="w-full mb-4">
    <VueSlickCarousel v-bind="settings">
      <div
        v-for="(item, index) in hotels"
        :key="index"
        class="px-2">
        <article
          class="mx-auto max-w-sm overflow-clip bg-white shadow">
          <figure class="aspect-h-3 aspect-w-3 overflow-hidden">
            <img :alt="base_url + item.name"
                 :data-src="base_url + item['image']"
                 :data-srcset="base_url + item['image']" loading="lazy"
                 :srcset="base_url + item['image']"
                 :src="base_url + item['image']" class="sale-image lazyloaded">
          </figure>
          <div class="grid grid-cols-[1fr_auto] items-center gap-4 pt-4 pl-4 pb-4 pr-2">
            <div>
              <div class="text-xs text-slate-600 uppercase font-bold tracking-wider"
                   v-html="text(item)">{{}}
              </div>
              <div class="font-bold text-slate-700 leading-snug">
                <a href="#" class="hover:underline">{{ item.country }}/{{ item.city }}</a>
              </div>
              <div class="mt-2 text-sm text-slate-600" v-html="text2(item)"></div>
            </div>
          </div>
          <div class="relative rounded-xl overflow-auto pb-4">
            <div class="text-center">
              <button type="button"
                      @click="entrance(item)"
                      class="py-2 px-3 bg-cyan-500 hover:bg-cyan-600 text-white text-sm font-semibold rounded-md shadow focus:outline-none"
                      tabindex="-1">
                Уточнить цену
              </button>
            </div>
          </div>
        </article>
      </div>
    </VueSlickCarousel>
    <hotel-modal ref="hotelModal"/>
  </section>
</template>
<script>
import {mapActions, mapGetters} from "vuex";
import Calendar from "./all/calendar.vue";
import VoyageSpinner from "./all/voyage_spinner.vue";
import DurationsButtons from "./sale/DurationsButtons.vue";
import HotelModal from "./modals/HotelModal.vue";
import PartnersModal from "./modals/PartnersModal.vue";

export default {
  name: 'SectionMinHotels',
  components: {PartnersModal, HotelModal, DurationsButtons, VoyageSpinner, Calendar},
  props: ['hotel'],
  data() {
    return {
      base_url: process.env.BASE_URL,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 4,
        responsive: [
          {
            breakpoint: 767,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
            }
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
            }
          }
        ]
      }
    }
  },
  computed: {
    hotels: {
      get() {
        return {...this.hotel};
      }
    }
  },
  mounted() {
  },
  methods: {
    entrance(item) {
      this.$refs.hotelModal.text = `Номер отеля ${item.id}, ${item.name}, ${item.country}/${item.city}`;
      this.$refs.hotelModal.closeDial();
    },
    text(text) {
      const index = text.name.indexOf('*');
      let text0 = text.name.slice(index + 1);
      let text1 = text.name.slice(0, index + 1);
      if (text0.length === 0)
        text0 = "<span class='text-white'> 1</span>";
      if (index >= 32 && index <= 33) {
        text1 = text.name.slice(0, index - 2)
        text0 = text.name.slice(index - 2);
      }
      const newTitle = text1 + '<br>' + text0;
      return newTitle;
    },
    text2(text) {
      let text0 = text.short_description;
      if (text0.length <= 50) {
        let number = 50 - text0.length;
        const newTitle = text0 + '<br> ';
        return newTitle.padEnd(newTitle.length + number, '\u00A0');
      }
      return text0;
    }
  }
}
</script>
<style lang="scss">
.saleList .ribbon .ribbon-content .ribbon-txt-2 {
  font-size: 21px;
}


.sale_text {
  position: relative;
  bottom: 1.5rem;
}

.slick-prev:before,
.slick-next:before {
  color: black;
}
</style>

