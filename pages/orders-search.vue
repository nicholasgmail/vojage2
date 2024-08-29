<template>
  <section id="wrapper_container">
    <main class="page-col-right">
      <div id="member-no-order">
        <div>
          <div class="no-order-title">Здесь вы найдете информацию о Ваших бронированиях.</div>
          <div
            v-show="unique_false"
            id="details-lastname-error" class="error"> Неверный номер бронирования.
          </div>
          <div class="back-sdv recent-search">
            <div class="placeholder-container">
              <div style="display: inline-block" class="placeholder-title">
                <input
                  v-model="unique"
                  placeholder="Номер бронирования"
                  style="width: 100%; height: 2rem; border: none;">
              </div>
              <span
                class="placeholder"></span></div>
            <div
              @click="openOrders"
              class="btn pink btn_pink cursor-pointer">Открыть
            </div>
          </div>
          <div class="reassurance">
            <div class="detail-container">
              <div style="display: inline-block" class="detail-title"><i
                class="icon-macaron"></i>Вдохновляющие предложения для путешествий
              </div>
              <div class="detail-text"><span>Тщательно подобранные роскошные туристические предложения</span></div>
            </div>
            <div class="detail-container">
              <div style="display: inline-block" class="detail-title"><i class="icon-label">
              </i>Лучшие скидки
              </div>
              <div class="detail-text"><span>Эксклюзивные цены и исключительные <br> скидки до 70%</span></div>
            </div>
            <div class="detail-container">
              <div style="display: inline-block" class="detail-title">
                <i class="icon-expert"></i>Наши специалисты всегда помогут
              </div>
              <div class="detail-text"><span>По всем вопросам обращайтесь в наш справочный центр, который работает круглосуточно и без выходных.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </section>
</template>

<script>
export default {
  name: 'OrdersSearch',
  layout: 'Orders',
  data() {
    return {
      base_url: process.env.BASE_URL,
      unique: '',
      unique_false: false
    }
  },
  mounted() {
    if (this.$route.name === 'orders-search') {
      document.body.classList.add('perso', 'babyLogin');
    }
  },
  methods: {
    async openOrders() {
      let order = {};
      await this.$store.dispatch('setBookingDetails', this.unique);
      order = this.$store.state.booking_details;
      if (order.id) {
        this.$nuxt.$router.push(`/orders/${this.unique}`);
      } else {
        this.unique_false = true
      }
    }
  }
}
</script>

<style scoped>
@media (max-width: 575.98px) {
  #member-no-order .back-sdv.recent-search .btn.btn_pink {
    padding: 0 50px;
  }

  #member-no-order .back-sdv.recent-search {
    width: 90%;
  }

  #member-no-order .back-sdv.recent-search .placeholder-container .placeholder-title {
    width: 100%;
  }
}
</style>
