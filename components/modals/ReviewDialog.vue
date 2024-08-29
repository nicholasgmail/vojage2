<template>
  <!-- всплывающее окно -->
  <div role="dialog" class="review-dialog">
    <div class="fade modal-backdrop in"></div>
    <div role="dialog" tabindex="-1" class="fade modalV2 modal-reviews in modal" style="display: block;">
      <div class="modal-dialog">
        <div class="modal-content" role="document">
          <button type="button" class="close close-review" data-dismiss="modal" aria-hidden="true"><span
            class="hidden-mobile">Закрыть</span><i class="line-icon-times"></i></button>
          <div class="modal-body">
            <div class="review-modal-header">
              <span class="reviews-modal-title">{{ sale.name }}</span><em>—</em>
            </div>
            <section id="reviews">
              <div class="reviews-content reviews-content-vp">
                <div class="review-summary">
                  <div class="review-summary-block review-average">
                    <div class="review-average-title">Средний балл</div>
                    <div class="review-average-score">{{ sale.avg_score }}/10</div>
                  </div>
                  <div class="review-summary-block review-recommendation">
                    <div class="review-recommendation-score">{{ Math.round((sale.avg_score / 10) * 100) }}%</div>
                    <div class="review-recommendation-title">туристов оценили отель на 10 из 10</div>
                  </div>
                </div>
                <div class="review-testimonials">
                  <div class="review-testimonials-title">{{ reviews.length }} клиентов дают отзыв</div>
                  <div class="review-testimonials-container">
                    <div class="translation-testimonials">
                      <div class="notice">{{ reviews.length }}
                        оставили свой отзыв об отеле на нашем сайте
                      </div>
                      <span class="traduction"></span>
                      <span class="google"></span>
                    </div>
                    <div class="review-testimonial"
                         v-for="(item, index) in reviews" :key="index">
                      <div class="review-testimonial-summary">
                        <div class="review-testimonial-summary-label">Оценка</div>
                        <div class="review-testimonial-summary-mark">{{ item['total_score'] }}</div>
                      </div>
                      <div class="review-testimonial-details">
                        <div class="review-testimonial-details-comment">
                          <div class="review-testimonial-details-comment-label">Что мне понравилось</div>
                          <div v-if="item['what_like']" class="review-testimonial-details-comment-content">
                            {{ item['what_like'] }}
                          </div>
                          <div v-else class="review-testimonial-details-comment-content">Клиент не оставил комментарий
                          </div>
                        </div>
                        <div class="review-testimonial-details-comment">
                          <div class="review-testimonial-details-comment-label">Что мне не понравилось</div>
                          <div v-if="item['what_dislike']" class="review-testimonial-details-comment-content">
                            {{ item['what_dislike'] }}
                          </div>
                          <div v-else class="review-testimonial-details-comment-content">Клиент не оставил комментарий
                          </div>
                        </div>
                        <em>—</em>
                        <div class="review-testimonial-customer">
                          <span class="review-testimonial-customer-name">{{ item['name'] }}</span>
                          <span class="review-testimonial-comment-date">
                            Рассмотрено {{ formatDate(item['review_date']) }}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <button
                    v-show="reviews_count > count"
                    @click="showMoreReviews"
                    id="testimonials-more-button" class="btn black">Смотреть все
                  </button>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
export default {
  name: 'ReviewDialog',
  data() {
    return {
      sale: this.$store.state.sale,
      count: 5,
      reviews_count: 0
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
