<script>
import {format, parse, addDays} from "date-fns";
import ruLocale from "date-fns/locale/ru";
import CardTransport from "../booking/CardTransport.vue";

export default {
  name: "OrderDetails",
  components: {CardTransport},
  props: ["order", "unique"],
  data() {
    return {
      base_url: process.env.BASE_URL,
      tour: {},
      message: '',
      message_out: [],
      text: '',
      valide: false,
      open_dock: false
    }
  },
  mounted() {
  },
  computed: {
    agreement_file: {
      get() {
        return this.order.agreement_file;
      }
    },
    invoice_file: {
      get() {
        return this.order.invoice_file;
      }
    },
    vaucher_file: {
      get() {
        return this.order.vaucher_file;
      }
    },
    not_paid: {
      get() {
        return this.order.payment_status === 'not_paid';
      }
    },
    paid: {
      get() {
        return this.order.payment_status === 'paid';
      }
    },
    in_process: {
      get() {
        return this.order.payment_status === 'in_process';
      }
    },
    start_date: {
      get() {
        try {
          const date = new Date(this.order.departure_date);
          let data = format(date, 'eeeeee dd MMM yyyy', {locale: ruLocale});
          return data.charAt(0).toUpperCase() + data.slice(1);
        } catch (e) {
          // this.$nuxt.$router.push(`/404`);
        }
      }
    },
    end_date: {
      get() {
        try {
          const date_in = new Date(this.order.departure_date);
          const date = addDays(date_in, this.order.duration);
          let data = format(date, 'eeeeee dd MMM yyyy', {locale: ruLocale});
          return data.charAt(0).toUpperCase() + data.slice(1);
        } catch (e) {
          // this.$nuxt.$router.push(`/404`);
        }
      }
    }
  },
  methods: {
    closeOpen(event) {
      if (!event.target.closest("#dropDock")
        && !event.target.closest("#parentMenu")) {
        this.open_dock = false;
      }
    },
    openDock() {
      this.open_dock = !this.open_dock;
    },
    pluralize(count, singular, genitive, plural) {
      count = Math.abs(count);
      const remainder10 = count % 10;
      const remainder100 = count % 100;

      if (remainder10 === 1 && remainder100 !== 11) {
        return singular;
      } else if (
        (remainder10 >= 2 && remainder10 <= 4) &&
        !(remainder100 >= 12 && remainder100 <= 14)
      ) {
        return genitive;
      } else {
        return plural;
      }
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
    async pushMessage() {
      if (!this.$validator.isEmpty(this.message)) {
        await this.$store.dispatch('setHelpMessage',
          {
            "tour": this.order.id,
            "text": this.message
          })
        this.message_out = this.$store.state.help_message;
        if (this.message_out.id) {
          this.message = '';
          this.text = this.message_out.text;
          this.valide = true;
          setInterval(() => {
            this.text = ''
          }, 5000);
        }
      }
    }
  }
}
</script>

<template>
  <div class="Order">
    <div class="content OrderHeader">
      <div id="header_block">
        <div id="header_picture">
          <div class="overlay-header"></div>
          <img class="header-img  " alt="Lindner Hotel Prague Castle"
               :src="`${base_url}${order.hotel.main_image}`">
          <div class="top-image-header">
            <div class="left-info-header">
              <div class="ref-number">
                <span class="label">Бронирование №</span>
                <span class="value">{{ unique }}</span>
              </div>
            </div>
            <div class="right-info-header">
              <div class="total">
                <span class="label">Всего</span>
                <span class="value">₽ {{ order.price }}</span>
              </div>
            </div>
          </div>
          <div class="center-info-header">
            <span class="destination">{{ order.hotel.country }}/{{ order.hotel.city }}</span>
            <div class="destinationHotel">
              <span class="hotel">{{ order.hotel.name }}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="OrderNavigation unset">
        <div class="OrderNavigation__subnav">
          <div class="cta_date">
            <div class="button button--white noHover">
              <i class="line-icon-calendar"></i><span>{{ start_date }} - {{ end_date }}</span>
            </div>
          </div>
          <div class="cta_pax">
            <div class="OrderDropdown PaxsDropdown dropdown">
              <div
                class="OrderDropdown__button PaxsDropdown__button button button--white desktop btn btn-secondary">
                <div class="paxBlock">
                  <i class="line-icon-user-friend"></i>
                  <div class="pax-numbers" style="display: flex; flex-direction: row;">
                    <p v-show="order.adults">{{ order.adults }}
                      {{ pluralize(order.adults, 'взрослый', 'взрослых', 'взрослых') }}</p>
                    <span v-show="order.children">,</span>
                    <p v-show="order.children">{{ order.children }}
                      {{ pluralize(order.children, 'ребёнок', 'ребёнка', 'детей') }}</p>
                    <span v-show="order.infants">,</span>
                    <p v-show="order.infants">{{ order.infants }}
                      {{ pluralize(order.infants, 'младенец', 'младенца', 'младенцев') }}</p>
                  </div>
                </div>
              </div>
              <div tabindex="-1" role="menu" aria-hidden="false"
                   class="OrderDropdown__menu PaxsDropdown__menu desktop dropdown-menu"
                   style="position: absolute; will-change: transform; top: 0px; left: 0px; transform: translate3d(0px, 46px, 0px);"
                   x-placement="bottom-start">
              </div>
            </div>
          </div>
        </div>
        <div class="OrderNavigation__btnContainer">
          <div class="OrderNavigation__navBtn">
            <div class="OrderDropdown DocumentsDropdown dropdown">
              <button type="button" aria-haspopup="true" aria-expanded="false"
                      @click="openDock"
                      id="dropDock"
                      class="OrderDropdown__button DocumentsDropdown__button button button--white desktop btn btn-secondary">
                <span>Документы<i class="line-icon-angle-down"></i></span>
              </button>
              <div
                v-show="open_dock"
                id="document_ml"
                v-click-outside="closeOpen"
                tabindex="-1" role="menu" aria-hidden="true"
                class="OrderDropdown__menu DocumentsDropdown__menu desktop dropdown-menu"
                style="position: absolute; will-change: transform; top: 3px; left: 0px; transform: translate3d(0px, 45px, 0px);"
                x-placement="bottom-start">
                <div class="DocumentsDropdown__item description"></div>
                <a
                  v-if="vaucher_file"
                  :href="`${base_url}${vaucher_file}`"
                  @click="openDock()"
                  class="OrderDropdown__item DocumentsDropdown__item" target="_blank"
                  rel="noreferrer noopener">
                  <span>Ваучер</span><i data-content="" class="line-icon-document-file"></i>
                </a>
                <a
                  v-if="invoice_file"
                  :href="`${base_url}${invoice_file}`"
                  @click="openDock()"
                  class="OrderDropdown__item DocumentsDropdown__item" target="_blank"
                  rel="noreferrer noopener">
                  <span>Счет</span><i data-content="" class="line-icon-document-file"></i>
                </a>
                <a
                  v-if="agreement_file"
                  :href="`${base_url}${agreement_file}`"
                  @click="openDock()"
                  class="OrderDropdown__item DocumentsDropdown__item" target="_blank"
                  rel="noreferrer noopener">
                  <span>FYТУР : Договор &amp; соглашения</span><i data-content=""
                                                                  class="line-icon-document-file"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="content-background">
      <div id="new_help_and_contact" class="content content-new_help_and_contact">
        <div class="NewHelpAndContact">
          <section>
            <h2 class="NewHelpAndContact__subtitle">Статус заказа</h2>
            <div class="NewHelpAndContact__block">
              <div class="NewHelpAndContact__text">
                <div class="NewHelpAndContact__header">
                  <div style="margin-right: 10px">
                    <i class="line-icon-information-circle"
                       style="font-size: 30px"></i>
                  </div>
                  <div class="NewHelpAndContact__header__title">
                    <span class="CardPresta__label"
                          style="background-color: #bd1343;"
                          v-show="not_paid">Не оплачено</span>
                    <span
                      class="CardPresta__label"
                      style="background-color: #13bd43;"
                      v-show="paid">Оплачено</span>
                    <span class="CardPresta__label"
                          style="background-color: #bd9513;"
                          v-show="in_process">В обработке</span>
                  </div>
                </div>
                <div class="NewHelpAndContact__info">
                    <span>
                      Поздравляем, Ваша заявка на бронирование успешно создана. Номер Вашего бронирования
                      <strong>{{ unique }}</strong>  В ближайшее время наш менеджер свяжется с Вами для уточнения деталей
                    </span></div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
    <div class="content-background">
      <div id="itinerary" class="content content-itinerary">
        <div class="Prestation">
          <div class="Prestation__list">
            <div class="CardPrestaList">
              <div id="tab1Toggle" data-tab="#tab1"
                   class="CardPresta CardPresta--hotel is-active is-clickable">
                <div
                  v-if="order.with_flight"
                  class="CardPresta__link">
                  <div class="CardPresta__label">Перелет</div>
                  <div v-if="order.flight.direct_1" class="PrestaDetailItineraryDetail__included" style="margin: 0">
                      <span
                        class="PrestaDetailItineraryDetail__label">
                        {{ order.flight.origin }}
                      -
                        {{ order.flight.destination }}
                      </span>
                  </div>
                  <div v-else class="PrestaDetailItineraryDetail__included" style="margin: 0">
                      <span
                        class="PrestaDetailItineraryDetail__label">
                        {{ order.flight.origin }}
                      -
                        {{ order.flight.transfer_1_airport }}
                      -
                        {{ order.flight.destination }}
                      </span>
                  </div>
                  <div class="CardPresta__info destination" style="margin: 0">
                    <span class="desti">{{ start_date }}</span>
                  </div>
                  <div v-if="order.flight.direct_2" class="PrestaDetailItineraryDetail__included"
                       style="margin: 0; margin-top: 5px">
                      <span
                        class="PrestaDetailItineraryDetail__label">
                        {{ order.flight.destination }}
                      -
                        {{ order.flight.origin }}
                      </span>
                  </div>
                  <div v-else class="PrestaDetailItineraryDetail__included" style="margin: 0; margin-top: 5px">
                      <span
                        class="PrestaDetailItineraryDetail__label">
                        {{ order.flight.destination }}
                      -
                        {{ order.flight.transfer_2_airport }}
                      -
                        {{ order.flight.origin }}
                      </span>
                  </div>
                  <div class="CardPresta__info destination" style="margin: 0">
                    <span class="desti">{{ end_date }}</span>
                  </div>
                </div>
                <div class="CardPresta__link">
                  <div class="CardPresta__label">Отель</div>
                  <div class="CardPresta__title">
                    {{ order.hotel.name }} <br>
                    <p>
                      <span>{{ order.hotel_room.name }}, {{
                          order.adults + order.children + order.infants
                        }}х чел</span>
                    </p>
                  </div>
                  <div class="CardPresta__info">
                    <div class="CardPresta__info"><i class="icon line-icon-calendar"></i>{{ start_date }} -
                      {{ end_date }}
                    </div>
                  </div>
                  <i class="CardPresta__icon line-icon-angle-right"></i>
                </div>
                <div class="CardPresta__link">
                  <div class="CardPresta__label">Питание</div>
                  <div class="CardPresta__title">{{ order.hotel_board.name }}</div>
                  <i class="CardPresta__icon line-icon-angle-right"></i>
                </div>
                <div class="CardPresta__link">
                  <div class="CardPresta__label">Трансфер</div>
                  <div class="CardPresta__title">{{ order.hotel_transfer.name }}</div>
                  <i class="CardPresta__icon line-icon-angle-right"></i>
                </div>
              </div>
            </div>
          </div>
          <div id="tab1" class="Prestation__detail active-detail">
            <div class="PrestaDetail">
              <div class="PrestaDetail__title">Отель</div>
              <div class="PrestaDetailHotel">
                <div class="PrestaDetail__info column">
                  <div class="name">{{ order.hotel.name }}</div>
                </div>
                <div
                  v-if="order.contact_name !== null"
                  class="PrestaDetail__info">
                  <div>
                    <div class="PrestaDetailInfo__title">Бронирование</div>
                    <div class="PrestaDetailItineraryDetail__included">
                      <span
                        class="PrestaDetailItineraryDetail__label">
                        {{ order.contact_name }} {{ order.contact_surname }}</span>
                    </div>
                  </div>
                </div>
                <div class="PrestaDetail__info">
                  <div class="PrestaDetailInfo">
                    <div class="PrestaDetailInfo__title">Заезд</div>
                    <div class="PrestaDetailInfo__content">{{ start_date }}</div>
                  </div>
                  <div class="PrestaDetailInfo">
                    <div class="PrestaDetailInfo__title">Выезд</div>
                    <div class="PrestaDetailInfo__content">{{ end_date }}</div>
                  </div>
                </div>
                <div
                  v-if="order.with_flight"
                  class="PrestaDetail__info">
                  <div>
                    <div class="PrestaDetailInfo__title">Перелет</div>
                    <div class="PrestaDetailItineraryDetail__included">
                      <span class="PrestaDetailItineraryDetail__tag">туда</span>
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
                      <span class="PrestaDetailItineraryDetail__tag">обратно</span>
                      <span
                        class="PrestaDetailItineraryDetail__label">
                        {{ order.flight.airline_info.name }},
                        {{ end_date }},
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
                <div class="PrestaDetail__info">
                  <div>
                    <div class="PrestaDetailInfo__title">НОМЕР</div>
                    <div class="PrestaDetailItineraryDetail__included">
                      <span class="PrestaDetailItineraryDetail__tag">включено</span>
                      <span
                        class="PrestaDetailItineraryDetail__label">
                        {{ order.hotel_room.name }},
                        {{ order.adults + order.children + order.infants }}х чел</span>
                    </div>
                  </div>
                </div>
                <div class="PrestaDetail__info">
                  <div>
                    <div class="PrestaDetailInfo__title">Питание</div>
                    <div class="PrestaDetailItineraryDetail__included">
                      <span class="PrestaDetailItineraryDetail__tag">Включено</span>
                      <span class="PrestaDetailItineraryDetail__label">{{ order.hotel_board.name }}</span>
                      <span class="PrestaDetailItineraryDetail__sublabel">- {{
                          order.adults + order.children + order.infants
                        }} чел</span>
                    </div>
                  </div>
                </div>
                <div class="PrestaDetail__info">
                  <div>
                    <div class="PrestaDetailInfo__title">Трансфер</div>
                    <div class="PrestaDetailItineraryDetail__included">
                      <span class="PrestaDetailItineraryDetail__tag">Включено</span>
                      <span class="PrestaDetailItineraryDetail__label">{{ order.hotel_transfer.name }}</span>
                      <span class="PrestaDetailItineraryDetail__sublabel">- {{
                          order.adults + order.children + order.infants
                        }} чел</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div id="CustomerRequest__Bloc">
      <div class="content-background">
        <div id="messaging_light" class="content content-messaging_light"></div>
      </div>
      <div class="content-background">
        <div id="new_help_and_contact" class="content content-new_help_and_contact">
          <div class="NewHelpAndContact">
            <section>
              <h2 class="NewHelpAndContact__subtitle">Обратитесь в справочный центр</h2>
              <div class="NewHelpAndContact__block">
                <div class="NewHelpAndContact__text">
                  <div class="NewHelpAndContact__header">
                    <img alt="iconService" class="NewHelpAndContact__icon" src="/images/union.svg">
                    <div class="NewHelpAndContact__header__title">

                      <span>Нужна помощь?</span>
                    </div>
                  </div>
                  <div class="NewHelpAndContact__info">
                    <span>Мы готовы помочь вам как до отъезда, так и в течение всего вашего путишествия.
                      Не стесняйтесь обращаться в нашу службу поддержки.</span>
                  </div>
                </div>
                <div class="button button--primary">
                  <a href="https://wa.me/79804136407/?text=FYТУР" target="_blank"
                     data-v-0d2d6594=""><span class="underlined-text">Свяжитесь с нами</span></a></div>
              </div>
            </section>
          </div>
        </div>
      </div>
      <div class="content-background">
        <div id="new_special_requests" class="content content-new_special_requests">
          <div class="SpecialRequests" id="SpecialRequests__form">
            <div class="SpecialRequests__subtitle">Связаться с отелем</div>
            <div class="SpecialRequestsCreation">
              <div class="SpecialRequestsCreation__leftBlock">
                <img alt="iconService" class="SpecialRequestsCreation__iconService"
                     src="/images/icone-service.svg">
                <div class="SpecialRequestsCreation__littleTitle">Отправить сообщение с особенными пожеланиями по поводу
                  Вашего отдыха.
                </div>
                <div class="SpecialRequestsCreation__text">
                  Мы позаботимся чтобы Ваш запрос дошёл до адресата
                </div>
              </div>
              <div class="SpecialRequestsCreation__rightBlock SpecialRequestsForm">
                <div id="form-null">
                  <div
                    v-show="!$validator.isEmpty(text)"
                    class="NewHelpAndContact__header__title">
                    <span>Ваше сообщение получено, в ближайшее время наш менеджер свяжется с Вами.
                    </span></div>
                  <section class="section giftCard">
                    <div class="pax-infos">
                      <div class="section-data gc-message">
                        <label for="giftcard-message" class="label-form">Персональное сообщение</label>
                        <span id="charNum"></span>
                        <textarea id="giftcard-message"
                                  v-model="message"
                                  name="giftcard-message" placeholder=""
                                  rows="3"></textarea>
                        <label v-show="!$validator.isEmpty(message) && valide" id="details-lastname-error" class="error"
                               for="details-lastname">Напишите нам сообщение</label>
                      </div>
                    </div>
                  </section>
                  <div class="action">
                    <button
                      @click="pushMessage"
                      class="button button--primary SpecialRequests__submit" type="submit">Отправить
                      запрос
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.unset {
  .button {
    &:hover {
      color: #000;
      background-color: #fff;
    }

    &:focus {
      color: #000;
      background-color: #fff;
    }

    &:active {
      color: #000;
      background-color: #fff;
    }
  }
}

.pax-numbers {
  span {
    margin-right: 5px;
  }
}
</style>
