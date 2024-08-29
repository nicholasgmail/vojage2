<script>
import PartnersModal from "../components/modals/PartnersModal.vue";

export default {
  name: "partner",
  components: {PartnersModal},
  layout: 'Partners',
  data() {
    return {
      all_time: true
    }
  },
  mounted() {
    if (this.$route.name === 'map') {
      document.body.classList.add('perso', 'babyLogin', 'map-open');
    }
  },
  methods: {
    entrance() {
      this.$refs.partnersModal.closeDial();
    }
  },
}
</script>

<template>
  <section class="Presentation">
    <div class="Testimonial__section--picture">
      <div class="container">
        <h1 class="Presentation__title">
          Уважаемые коллеги!</h1>
        <p v-show="all_time" class="Presentation__subtitle">
          Для заключения договора-оферты необходимо зарегистрироваться на нашем сайте.</p>
        <p v-show="!all_time" class="Presentation__subtitle">
          Спасибо за Ваше обращение! Наш менеджер по работе с агенствами свяжется с Вами в ближайшее время!</p>
        <div id="Presentation__partner-form-opener">
          <button
            v-show="all_time"
            @click="entrance"
            class="Button"><i class=""></i>Стать партнером
          </button>
          <a
            v-show="!all_time"
            href="/"
            class="Button"><i class=""></i>На главную
          </a>
        </div>
      </div>
    </div>
    <partners-modal ref="partnersModal"/>
  </section>
</template>

<style lang="scss">
.Presentation {
  margin: 0;
  height: 100%;
}

@media only screen and (max-width: 767px) {
  #header.header_all .container {
    height: 116px !important;
    background-color: #fff;
  }
}

@media (max-width: 575.98px) {
  .Testimonial__section--picture .container {
    height: 75%;
  }

  .Presentation #Presentation__partner-form-opener {
    position: relative;
  }
}

</style>
