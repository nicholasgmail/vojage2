<template>
  <div class="reviews">
    <div class="reviews-details noTrip">
      <div class="review-summary all">
        <div class="vp-reviews-click">
          <div class="vp-reviews">
            <img class="v" alt="Just for you:" width="30" :src="path + '/images/f.png'">
            <span class="average-note">{{ total_score }}/10</span>
          </div>
          <span class="link reviews-link">
																	<span class="link__txt">{{ hotel_reviews.length }} отзывов</span>
																	<i class="link__icon line-icon-angle-right"></i></span>
        </div>
      </div>
    </div>
    <div
      v-if="text.length > 136"
      class="reviews-comment">
      <div
        @click="toggle"
        :style="{ height: isToggled ? 'auto' : '38px' }" ref="contentBlock"
        style="cursor: pointer; margin-bottom: 0"
        class="main-review overflow-comment">
        « {{ text }} »
      </div>
      <div @click="toggle" v-show="!isToggled" class="city-list__more-cities"
           style="cursor:pointer; display: flex; max-width: 100%; font-size:11px; align-items: center; justify-content: center; line-height: 0.6;">
        Показать больше
      </div>
      <div @click="toggle" v-show="isToggled" class="city-list__more-cities"
           style="cursor:pointer; display: flex; max-width: 100%; font-size:11px; align-items: center; justify-content: center; line-height: 0.6;">
        Скрыть
      </div>
      <div class="date" style="margin-top: 5px">{{ review_date }}</div>
    </div>
    <div
      v-else
      class="reviews-comment">
      <div class="main-review overflow-comment">
        « {{ text }} »
      </div>
      <div class="date">{{ review_date }}</div>
    </div>
  </div>
</template>
<script>
export default {
  name: "reviews",
  props: ['hotel_reviews'],
  data() {
    return {
      path: '../../',
      total_score: '',
      review: {},
      text: '',
      review_date: 'Опубликовано',
      isToggled: false,
    }
  },
  mounted() {
    this.showRandomReview();
    // setInterval(this.showRandomReview, 5000);
  },
  methods: {
    toggle() {
      this.isToggled = !this.isToggled;
    },
    showRandomReview() {
      const randomIndex = Math.floor(Math.random() * this.hotel_reviews.length);
      this.review = this.hotel_reviews[randomIndex];
      this.total_score = this.review['total_score'];
      this.text = this.review['what_like'];
      const date = this.formatDate(this.review['review_date']);
      this.review_date = `Опубликовано ${date} г.`;
    },
    formatDate(date_in) {
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
.overflow-comment {
  overflow: hidden;
  transition: height 0.5s ease-in-out;
}
</style>
