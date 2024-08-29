<template>
  <!-- всплывающее окно -->
  <div role="dialog"
       v-show="close">
    <div class="fade modal-backdrop in"></div>
    <div id="modal-mosaic"
         role="dialog" tabindex="-1"
         v-show="close"
         class="fade modalV2 modal--mosaic modal-animated-from-bottom
                 in modal" style="padding-left: 15px;">
      <div class="fullscreen-modal modal-dialog">
        <div class="modal-content" role="document">
          <div class="full-content-mosaic">
            <section class="header sticky">
              <div class="content-actions">
                <div class="left">
                  <i
                    @click="closeDial"
                    class="line-icon-arrow-left" style="font-weight: normal;"></i></div>
              </div>
            </section>
            <div>
              <div class="page-center content-section-mosaic show-after-300ms">
                <section class="section-mosaic"><h4>
                  {{ sale.name }}
                </h4>
                  <div class="mosaic-grid last-big">
                    <div
                      v-for="item in sale.images"
                      class="item">
                      <div class="mosaic-picture">
                        <img class="indent-alt  " :alt="sale.name"
                             :src="`${base_url}${item.image}`">
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
export default {
  name: 'ImageGalery',
  props: ['sale'],
  data() {
    return {
      count: 5,
      base_url: process.env.BASE_URL,
      reviews_count: 0,
      close: false
    }
  },
  computed: {
    reviews() {
      let reviews = this.sale['hotel_reviews'];
      this.reviews_count = reviews.length;
      return reviews.slice(0, this.count);
    }
  },
  mounted() {
  },
  methods: {
    closeDial() {
      this.close = !this.close;
      if (this.close) {
        document.body.classList.add('hidden_body');
      } else {
        document.body.classList.remove('hidden_body');
      }
    },
    showMoreReviews() {
      this.count += 5;
    },
    formatDate(date_in) {
      const date = new Date(date_in);
      const year = date.getFullYear();
      const month = date.getMonth();
      const day = date.getDate();

      return `${day}/${month}/${year}`;
    },
    formatDateText(date_in) {
      const months = [
        "января", "февраля", "марта", "апреля", "мая", "июня",
        "июля", "августа", "сентября", "октября", "ноября", "декабря"
      ];
      const date = new Date(date_in);
      const year = date.getFullYear();
      const month = months[date.getMonth()];
      const day = date.getDate();

      return `${day} ${month} ${year}`;
    }
  }
}
</script>

<style scoped>

</style>
