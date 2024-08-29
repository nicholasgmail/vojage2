<template>
  <div id="crossSaleCarousel">
    <h3 class="sale-crosssell-header">Найдите свой идеальный отдых просмотрев другие наши предложения.</h3>
    <div class="exclusive-offers-slider">
      <VueSlickCarousel
        v-if="Object.entries(hotels).length > 0"
        v-bind="settings">
        <div
          v-for="(item, index) in hotels"
          :key="index">
          <article class="sale col-6 col-mob-12  sale-block">
            <a :title="item.sale_description"
               :href="getHref(item)">
              <figure class="sale-figure"><img
                class="sale-image lazyloaded" alt=""
                :data-src=item.main_image
                :data-srcset=item.main_image
                loading="lazy"
                :srcset=item.main_image
                :src=item.main_image>
              </figure>
              <div class="sale_content">
                <span class="sale-destination">{{ item.country }}/{{ item.city }}</span><span
                class="sale-name">{{ item.small_description }} </span><span
                class="hotel-name">{{ item.name }}</span>
                <div class="sale-time-remaining  specific-not-near "><i
                  class="line-icon-clock"></i><span
                  class="sale-schedule"><span
                  class="time">{{ item.small_description }}</span></span>
                </div>
              </div>
              <div class="sale_price">
                <div v-if="item.show_price_or_sale === 'price' && item.two_person_price" class="ribbon">
																		<span
                                      class="ribbon-content">
																			<span class="label exclusive ribbon-txt-4 ">
                                        <span class="font-sz-14 price  ribbon-txt-2">
                                          от <br>
                  {{ item.two_person_price }} ₽
                </span>
                                      </span>
																		</span>
                </div>
                <div v-else class="ribbon">
																		<span
                                      class="ribbon-content">
																			<span class="label exclusive ribbon-txt-4 ">
                <span class="font-sz-14 price  ribbon-txt-2">
                  скидки до <br>
                  -{{ item.sale_up_to }}%</span>
                                      </span>
																		</span>
                </div>
              </div>
            </a>
          </article>
        </div>
        <template #prevArrow="">
          <div class="month-nav">
            <i class="icon-arrow-left-t1"></i>
          </div>
        </template>
        <template #nextArrow="">
          <div class="month-nav">
            <i class="icon-arrow-right-t1"></i>
          </div>
        </template>
      </VueSlickCarousel>
    </div>
  </div>
</template>
<script>
import {mapActions} from "vuex";

export default {
  name: "CrossSaleCarousel",
  data() {
    return {
      path: "../../",
      base_url: process.env.BASE_URL,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: false,
        responsive: [
          {
            breakpoint: 767,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 1,
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
        return {...this.$store.state.hotel};
      }
    }
  },
  methods: {
    ...mapActions([
      'setHotelList'
    ]),
    getHref(sale) {
      return this.$router.options.base + `sale/${sale['id']}/${sale['slug']}`;
    },
  },
  mounted() {
    this.setHotelList(this.$store.state.query_sale);
  },
}
</script>

<style scoped lang="scss">
#crossSaleCarousel .slick-slider article .ribbon .ribbon-content {
  .font-sz-14 {
    font-size: 10px;
  }
}

.slick-arrow {
  &.slick-prev {
    &::before {
      content: "\E60B";
      font-family: vpgseticon;
      color: rgba(0, 0, 0, .5);
    }
  }

  &.slick-next {
    &::before {
      content: "\E60A";
      font-family: vpgseticon;
      color: rgba(0, 0, 0, .5);
    }
  }
}

@media (max-width: 575.98px) {
  .month-nav {
    display: none;
  }
}
</style>
