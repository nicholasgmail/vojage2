<template>
  <!-- Актуальные предложения -->
  <section id="section-next" class="saleroom-section section-white">
    <div class="generic-width always-visible">
      <h2 class="section-title"><span
        class="sdv-title">В ближайшее время</span></h2>
      <h3 class="section-subtitle">Не пропустите ни одно из этих событий.
        Зарегистрируйтесь для напоминания! </h3>
      <div class="separator-rectangle"></div>
    </div>
    <div class="saleList page-center container_12 sales-container clearfix">
      <template v-for="item in hotel_next">
        <article :id="item.id" class="sale col-6 col-mob-12 now sale-block "
                 data-position="1">
          <a :title="item.small_description"
             href="/">
            <figure class="sale-figure"><img
              class="sale-image lazyloaded" :alt="item.name"
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
                class="sale-schedule"><span class="time">6 days remaining</span></span>
              </div>
            </div>
            <div class="sale_price">
              <div
                v-if="item.show_price_or_sale === 'price'"
                class="ribbon"><span class="ribbon-content"><span
                class="label pct ribbon-txt-1 ">От</span>
                <span class="price  ribbon-txt-2">
                  {{ item.two_person_price }} ₽
                </span></span>
              </div>
              <div
                v-if="item.show_price_or_sale === 'sale'"
                class="ribbon"><span class="ribbon-content"><span
                class="label pct ribbon-txt-1 ">Скидка до</span>
                <span class="price  ribbon-txt-2">
                  -{{ item.sale_up_to }}%</span></span>
              </div>
            </div>
          </a>
        </article>
      </template>
    </div>
  </section>
</template>
<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: 'SectionNext',
  data() {
    return {
      query: {
        newest: true,
        limit: 4,
      }
    }
  },
  computed: {
    ...mapGetters(['hotel_news']),
    hotel_next() {
      return {...this.hotel_news};
    },
  },
  created() {
    this.setHotelNews(this.query);
  },
  methods: {
    ...mapActions([
      'setHotelNews'
    ])
  }
}
</script>
<style lang="scss">
.saleList .ribbon .ribbon-content .ribbon-txt-2 {
  font-size: 21px;
}
</style>

