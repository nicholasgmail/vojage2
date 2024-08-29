<template>
  <!-- Актуальные предложения -->
  <section id="section-now" class="saleroom-section ">
    <div class="saleList page-center container_12 sales-container clearfix">
      <article class="sale col-6 col-mob-12 now sale-block "
               style="background-color: #fff"
               v-for="(item, index) in hotels"
               :key="index"
               data-position="1">
        <a :title="item.name"
           @click="nextNow"
           :href=getHref(item)>
          <figure class="sale-figure">
            <img :alt="item.name"
                 :data-src="item['main_image']"
                 :data-srcset="item['main_image']" loading="lazy"
                 :srcset="item['main_image']"
                 :src="item['main_image']" class="sale-image lazyloaded">
          </figure>
          <div class="sale_content">
            <span class="sale-destination">{{ item.country }}/{{ item.city }}</span><span
            class="sale-name" style="font-weight:800">{{ item.name }}</span><span
            class="hotel-name">{{ item.small_description }}</span>
            <div class="sale-time-remaining  specific-not-near">
              <div
                v-if="!!item.sale_description"
                class="sale_text">
                <i class="line-icon-clock"></i><span
                class="sale-schedule"
                style="width: 80%; font-size: 14px"><span class="time">
                {{ saleDescription(item.sale_description) }}</span></span>
              </div>
            </div>
          </div>
          <div class="sale_price">
            <div v-if="item.show_price_or_sale === 'price'"
                 class="ribbon"><span class="ribbon-content"><span
              class="label pct ribbon-txt-1 ">От</span>
                <span
                  class="price  ribbon-txt-2">
                  {{ item.two_person_price }} ₽
                </span></span>
            </div>
            <div
              v-if="item.show_price_or_sale === 'sale'"
              class="ribbon"><span class="ribbon-content"><span
              class="label pct ribbon-txt-1 ">Скидка до</span>
                <span class="price  ribbon-txt-2">
                  -{{ item.sale_up_to }}%</span> </span>
            </div>
          </div>
        </a>
      </article>
    </div>
    <div ref="scrollTrigger" class="scroll-trigger"></div>
  </section>
</template>
<script>
import {mapActions, mapGetters} from "vuex";
import Calendar from "./all/calendar.vue";
import VoyageSpinner from "./all/voyage_spinner.vue";
import DurationsButtons from "./sale/DurationsButtons.vue";

export default {
  name: 'SectionNow',
  components: {DurationsButtons, VoyageSpinner, Calendar},
  props: ['hotel'],
  data() {
    return {
      observer: null,
      //  limit: 0,
      //offset: 0,
      count: 0,
      udpNext: false,
      time: Math.floor(Math.random() * 12) + 3,
    }
  },
  watch: {
    count(newVal, oldVal) {
      if (newVal > oldVal) {
        this.udpNext = true;
      } else {
        this.udpNext = false;
      }
    },
  },
  computed: {
    ...mapGetters(['query', "limit", "offset"]),
    hotels: {
      get() {
        return {...this.hotel};
      }
    },
  },
  mounted() {
    this.initObserver();
  },
  methods: {
    ...mapActions(["setHotelOut"]),
    nextNow() {
      this.$cookies.remove("lite_form");
    },
    saleDescription(desc) {
      if (!!desc)
        return desc.substring(0, 54);
    },
    imgFigure(item) {
      return `<img
                class="sale-image"
                alt="${item.name}"
                src="${item['main_image']}">`;
    },
    getImageUrl(image) {
      return `${image}?${Date.now()}`;
    },
    getHref(sale) {
      return this.$router.options.base + `sale/${sale['id']}/${sale['slug']}`;
    },
    initObserver() {
      this.observer = new IntersectionObserver(this.handleInterArticke, {
        root: null,
        rootMargin: '0px',
        threshold: 0.1,
      });
      this.observer.observe(this.$refs.scrollTrigger);
    },
    handleInterArticke() {
      this.count = Object.keys(this.hotels).length;
      //  if (this.udpNext) return false;
      this.$store.state.limit = this.limit + 10;
      this.$store.state.offset = this.limit + this.offset;
      let query_in = {
        limit: this.limit,
        offset: this.offset
      };
      let query_out = {...this.query, ...query_in}
      this.setHotelOut(query_out);
    },
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
</style>

