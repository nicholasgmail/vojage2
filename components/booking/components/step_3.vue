<script>
import sale from "../../Sale.vue";
import {mapGetters, mapActions} from 'vuex';
import {format, parse} from "date-fns";
import ruLocale from "date-fns/locale/ru";

export default {
  name: "step_3",
  props: ['step', 'id', "start_date", "end_date"],
  data() {
    return {
      lite_form: false,
    }
  },
  mounted() {
    this.getBK();
    this.lite_form = this.$cookies.get("lite_form");
  },
  computed: {
    ...mapGetters(['booking_details']),
    booking_detail: {
      get() {
        return this.booking_details;
      }
    },
    order: {
      get() {
        return this.$store.state.booking_details;
      }
    },
    sale() {
      return sale;
    },
    pax_count: {
      get() {
        return this.step.adults + this.step.children + this.step.infants;
      }
    },
    price: {
      get() {
        return this.step["price"];
      }
    }
  },
  methods: {
    ...mapActions(['setBookingDetails']),
    async getBK() {
      this.$store.state.unique = this.step.unique_id;
      await this.$store.dispatch("setBookingDetails", this.step.unique_id);
    },
    flightTru(flight) {
      return !!flight;
    },
    Continue() {
      this.$cookies.remove("lite_form");
      this.$cookies.remove("tour_id");
    },
    timeToFrom(time) {
      const parsedTime = parse(time, 'HH:mm:ss', new Date());
      return format(parsedTime, 'HH:mm');
    },
    durationTime(time) {
      const hours = Math.floor(time / 60);
      const remainingMinutes = time % 60;
      return format(new Date().setHours(hours, remainingMinutes), "HHч mmм");
    },
    departureDate(date) {
      const date_out = new Date(date);
      let date_in = format(date_out, 'eeeeee dd MMM', {locale: ruLocale});
      date_in = date_in.charAt(0).toUpperCase() + date_in.slice(1);
      return date_in.slice(0, -1)
    },
  }
}
</script>

<template>
  <div id="stepForm" class="Main">
    <div id="errorList"></div>
    <section class="section annexe" style="margin-top: 40px">
      <div class="section-content clearfix">
        <div id="react-package-notice">
          <div class="package-notice">
            <div class="package-notice-title">
              <i class="line-icon-information-circle"></i>
              <span class="title-text">Ваша заявка <span v-if="!lite_form">№ {{ step["unique_id"] }}</span> успешно создана и обрабатывается отделом бронирования.
                Наш менеджер свяжется с вами в самое ближайшее время!</span>
            </div>
            <div v-if="!lite_form" class="package-notice-link">
              <a :href="`/order/${this.step['unique_id']}`" class="popup-link underlined-text">Для просмотра деталей
                перейдите на страницу
                бронирования</a>
            </div>
            <div id="tab1" class="Prestation__detail active-detail" data-v-1d281a1e="">
              <div class="PrestaDetail" data-v-1d281a1e="">
                <div class="PrestaDetail__title" data-v-1d281a1e="">Отель</div>
                <div class="PrestaDetailHotel" data-v-1d281a1e="">
                  <div class="PrestaDetail__info column" data-v-1d281a1e="">
                    <div class="name" data-v-1d281a1e="">{{ step["hotel"] }}</div>
                  </div>
                  <div class="PrestaDetail__info" data-v-1d281a1e="">
                    <div class="PrestaDetailInfo" data-v-1d281a1e="">
                      <div class="PrestaDetailInfo__title" data-v-1d281a1e="">Заезд</div>
                      <div class="PrestaDetailInfo__content" data-v-1d281a1e="">{{ start_date }}</div>
                    </div>
                    <div class="PrestaDetailInfo" data-v-1d281a1e="">
                      <div class="PrestaDetailInfo__title" data-v-1d281a1e="">Выезд</div>
                      <div class="PrestaDetailInfo__content" data-v-1d281a1e="">{{ end_date }}</div>
                    </div>
                  </div>
                  <div
                    v-if="order.with_flight"
                    class="PrestaDetail__info">
                    <div>
                      <div class="PrestaDetailInfo__title">Перелет</div>
                      <div class="PrestaDetailItineraryDetail__included">
                        <span class="PrestaDetailItineraryDetail__tag">Туда</span>
                        <span
                          class="PrestaDetailItineraryDetail__label">
                        {{ order.flight.airline_info.name }},
                        {{ start_date }},
                        {{ timeToFrom(order.flight.flight_1_time_from) }} {{ order.flight.origin }}
                      -
                        {{ timeToFrom(order.flight.flight_1_time_to) }}
                         {{ order.flight.destination }},
                        {{ durationTime(order.flight.flight_2_duration) }}
                      </span>
                      </div>
                      <div v-if="order.flight.direct_1" class="PrestaDetailItineraryDetail__included">
                      <span
                        class="PrestaDetailItineraryDetail__label">
                        {{ order.flight.origin }}
                      -
                        {{ order.flight.destination }}
                      </span>
                      </div>
                      <div v-else class="PrestaDetailItineraryDetail__included">
                      <span
                        class="PrestaDetailItineraryDetail__label">
                        {{ order.flight.origin }}
                      -
                        {{ order.flight.transfer_1_airport }}
                      -
                        {{ order.flight.destination }}
                      </span>
                      </div>
                      <div class="PrestaDetailItineraryDetail__included">
                        <span class="PrestaDetailItineraryDetail__tag">Обратно</span>
                        <span
                          class="PrestaDetailItineraryDetail__label">
                        {{ order.flight.airline_info.name }},
                        {{ departureDate(order.flight.return_date) }},
                        {{ timeToFrom(order.flight.flight_2_time_from) }}
                         {{ order.flight.destination }}
                      -
                        {{ timeToFrom(order.flight.flight_2_time_to) }}
                        {{ order.flight.origin }},
                        {{ durationTime(order.flight.flight_2_duration) }}
                      </span>
                      </div>
                      <div v-if="order.flight.direct_2" class="PrestaDetailItineraryDetail__included">
                      <span
                        class="PrestaDetailItineraryDetail__label">
                        {{ order.flight.destination }}
                      -
                        {{ order.flight.origin }}
                      </span>
                      </div>
                      <div v-else class="PrestaDetailItineraryDetail__included">
                      <span
                        class="PrestaDetailItineraryDetail__label">
                        {{ order.flight.destination }}
                      -
                        {{ order.flight.transfer_2_airport }}
                      -
                        {{ order.flight.origin }}
                      </span>
                      </div>
                    </div>
                  </div>
                  <div class="PrestaDetail__info" data-v-1d281a1e="">
                    <div data-v-1d281a1e="">
                      <div class="PrestaDetailInfo__title" data-v-1d281a1e="">Номер</div>
                      <div class="PrestaDetailItineraryDetail__included" data-v-1d281a1e=""><span
                        class="PrestaDetailItineraryDetail__tag" data-v-1d281a1e="">включено</span> <span
                        class="PrestaDetailItineraryDetail__label"
                        data-v-1d281a1e="">1 x {{ step.selected_room.name }} для
                        {{ step.adults + step.children + step.infants }} гостей</span></div>
                    </div>
                  </div>
                  <div class="PrestaDetail__info" data-v-1d281a1e="">
                    <div data-v-1d281a1e="">
                      <div class="PrestaDetailInfo__title" data-v-1d281a1e="">Питание</div>
                      <div class="PrestaDetailItineraryDetail__included" data-v-1d281a1e=""><span
                        class="PrestaDetailItineraryDetail__tag" data-v-1d281a1e="">Включено</span> <span
                        class="PrestaDetailItineraryDetail__label"
                        data-v-1d281a1e="">{{ step.selected_board.name }}</span></div>
                    </div>
                  </div>
                  <div class="PrestaDetail__info" data-v-1d281a1e="">
                    <div data-v-1d281a1e="">
                      <div class="PrestaDetailInfo__title" data-v-1d281a1e="">Трансфер</div>
                      <div class="PrestaDetailItineraryDetail__included" data-v-1d281a1e=""><span
                        class="PrestaDetailItineraryDetail__tag" data-v-1d281a1e="">Включено</span> <span
                        class="PrestaDetailItineraryDetail__label" data-v-1d281a1e="">{{
                          step.selected_transfer.name
                        }}</span></div>
                    </div>
                  </div>

                  <div class="SummaryRecapLine"></div>

                  <div class="continue-container">
                    <div id="continue-container" class="tooltipstered">
                      <a href="/" id="continue"
                         @click="Continue"
                         style="text-decoration: none;"
                         class="Button Button--primary">Завершить</a></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>

</style>
