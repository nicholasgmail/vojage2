import Vue from 'vue';
import VueSlickCarousel from 'vue-slick-carousel';
import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css';

Vue.component('VueSlickCarousel', VueSlickCarousel);

export default ({app}, inject) => {
  const slickCarouselConfig = {
    dots: false,
    autoplay: true,
    speed: 500,
  };

  inject('slickCarouselConfig', slickCarouselConfig);
};
