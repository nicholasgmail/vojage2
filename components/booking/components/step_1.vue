<script>
import CardTransport from "../CardTransport.vue";
import {format} from "date-fns";
import ruLocale from "date-fns/locale/ru";
import arrSorted from '~/mixins/arr_sorted.js';

export default {
  name: "step_1",
  components: {CardTransport},
  mixins: [arrSorted],
  props: ['step', 'id'],
  data() {
    return {
      open_sum: false,
      room: [],
      rt: {...this.step.room_types},
      bt: {...this.step.board_types},
      tf: {...this.step.transfer_types},
      base_url: process.env.BASE_URL,
      selected: null,
      selected_board: null,
      selected_transfer: 1,
      add_price: 0,
      add_price_board: 0,
      add_price_transfer: 0,
      add_price_flights: 0,
      id_flights: 1,
      id_board: 1,
      id_transfer: 1,
      id_room: 1,
      label_one: true,
      label_two: false,
      button_one: true,
      button_two: false,
    }
  },
  mounted() {
    document.body.classList.remove('hidden_body');
    for (const key in this.rt) {
      if (this.rt[key]["extra_charge_for_room"] == null) {
        this.selected = this.rt[key]["id"]
      }
    }
    for (const key in this.bt) {
      if (this.bt[key]["extra_charge"] == null) {
        this.selected_board = this.bt[key]["id"]
      }
    }
    for (const key in this.tf) {
      if (this.tf[key]["price"] == null || this.tf[key]["price"] === 0) {
        this.selected_transfer = this.tf[key]["id"];
        this.id_transfer = this.tf[key]["id"];
      }
    }
    this.rt = Object.values(this.rt).map(($v) => {
      if (this.step["selected_room"]["id"] === $v["id"]) {
        $v["selected"] = true;
        this.selected = $v["id"];
        this.id_room = $v["id"];
        this.add_price = $v["extra_charge_for_room"];
      } else {
        if (!this.step["selected_room"]["id"] && $v['extra_charge_for_room'] === null) {
          $v["selected"] = true;
        }
      }
      return $v;
    }).sort(this.compare);
    this.bt = Object.values(this.bt).map(($v) => {
      if (this.step["selected_board"]["id"] === $v["id"]) {
        $v["selected"] = true;
        this.selected_board = $v["id"];
        this.id_board = $v["id"];
        this.add_price_board = $v["extra_charge"];
      } else {
        if (!this.step["selected_board"]["id"] && $v['extra_charge'] === null) {
          $v["selected"] = true;
        }
      }
      return $v;
    }).sort(this.compare);
    this.tf = Object.values(this.tf).map(($v) => {
      if ($v['price'] === null) {
        $v["selected"] = true;
      }
      return $v;
    }).sort(this.compare);
    this.room_types = this.rt;
    this.board_types = this.bt;
    this.transfer_types = this.tf;

  },
  computed: {
    price: {
      get() {
        this.$emit("get_price", this.step["price"] + this.add_price * this.step.duration + this.add_price_board * this.step.duration + this.add_price_flights * (this.step.adults + this.step.children) + this.add_price_transfer);
        return this.step["price"] + this.add_price * this.step.duration + this.add_price_board * this.step.duration + this.add_price_flights * (this.step.adults + this.step.children) + this.add_price_transfer;
      }
    },
    sl_first: {
      get() {
        let sl_fr = this.step['flights'];
        let id = sl_fr.findIndex(function (element) {
          return element.price === 0;
        });

        if (id === -1) {
          let minPrice = Infinity;
          let minPriceIndex = -1;
          sl_fr.forEach(function (element, index) {
            if (element.price < minPrice) {
              minPrice = element.price;
              minPriceIndex = index;
            }
          });
          id = minPriceIndex;
        }
        return id;
      }
    },
    board_types: {
      get() {
        return this.bt;
      },
      set(value) {
        this.bt = {...value};
      }
    },
    transfer_types: {
      get() {
        return this.tf;
      },
      set(value) {
        this.tf = {...value};
      }
    },
    room_types: {
      get() {
        return this.rt;
      },
      set(value) {
        this.rt = {...value};
      }
    },
    iconClass() {
      return this.open_sum ? 'icon line-icon-angle-up' : 'icon line-icon-angle-down';
    },
    start_date: {
      get() {
        try {
          const date = new Date(this.step.start_date);
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
          const date = new Date(this.step.end_date);
          let data = format(date, 'eeeeee dd MMM yyyy', {locale: ruLocale});
          return data.charAt(0).toUpperCase() + data.slice(1);
        } catch (e) {
          // this.$nuxt.$router.push(`/404`);
        }
      }
    }
  },
  methods: {
    labelTwo() {
      if (!this.label_two) {
        this.label_two = true;
        this.label_one = false;
        this.button_one = false;
        this.button_two = true;
      }
    },
    labelOne() {
      if (!this.label_one) {
        this.label_two = false;
        this.label_one = true;
        this.button_one = true;
        this.button_two = false;
      }
    },
    nextStep(event) {
      event.preventDefault();
      if (this.price)
        this.$store.dispatch('setStep2', {
          "room_type": this.id_room,
          "price": this.price,
          "flight": this.id_flights,
          "board": this.id_board,
          "tour_id": this.id,
          "transfer": this.id_transfer,
        });
      this.$cookies.remove('lite_form')
      this.$parent.$parent.$parent.$parent.load = false
      this.$nuxt.$router.push(`/booking/${this.id}/step/2/?room_type=${this.id_room}&price=${this.price}&flight=${this.id_flights}&board=${this.id_board}&transfer=${this.id_transfer}&tour_id=${this.id}`);
      this.$store.state.step = 2;
    },
    nextStepPreliminarily(event) {
      event.preventDefault();
      if (this.price)
        this.$store.dispatch('setStep2', {
          "room_type": this.id_room,
          "price": this.price,
          "flight": this.id_flights,
          "board": this.id_board,
          "tour_id": this.id,
          "transfer": this.id_transfer,
        });
      this.$cookies.set('lite_form', true, {
        path: '/',
        maxAge: 60 * 60 * 24
      })
      this.$parent.$parent.$parent.$parent.load = false
      this.$nuxt.$router.push(`/booking/${this.id}/step/2/?room_type=${this.id_room}&price=${this.price}&flight=${this.id_flights}&board=${this.id_board}&transfer=${this.id_transfer}&tour_id=${this.id}`);
      this.$store.state.step = 2;
    },
    priceFlights(data) {
      this.add_price_flights = data;
    },
    idFlights(data) {
      this.id_flights = data;
    },
    isLogin(select) {
      return select['extra_charge_for_room'] === null;
    },
    setRoom(selected) {
      for (const key in this.rt) {
        if (this.rt[key]["id"] == selected) {
          this.rt[key]["selected"] = true;
          this.selected = this.rt[key]["id"]
          if (this.rt[key]["id"] === selected) {
            this.add_price = this.rt[key]['extra_charge_for_room'] ?? 0;
            this.id_room = selected;
          } else {
            this.add_price = 0;
          }
        } else {
          if (this.rt[key]["selected"])
            this.rt[key]["selected"] = false;
        }
      }
    },
    setBoard(selected) {
      for (const key in this.bt) {
        if (this.bt[key]["id"] == selected) {
          this.bt[key]["selected"] = true;
          this.selected_board = this.bt[key]["id"]
          if (this.bt[key]["id"] === selected) {
            this.add_price_board = this.bt[key]['extra_charge'] ?? 0;
            this.id_board = selected;
          } else {
            this.add_price_board = 0;
          }
        } else {
          if (this.bt[key]["selected"])
            this.bt[key]["selected"] = false;
        }
      }
    },
    setTransfer(selected) {
      for (const key in this.tf) {
        if (this.tf[key]["id"] == selected) {
          this.tf[key]["selected"] = true;
          this.selected_transfer = this.tf[key]["id"]
          if (this.tf[key]["id"] === selected) {
            this.add_price_transfer = this.tf[key]['price'] ?? 0;
            this.id_transfer = selected;
          } else {
            this.add_price_transfer = 0;
          }
        } else {
          if (this.tf[key]["selected"])
            this.tf[key]["selected"] = false;
        }
      }
    },
    openSumm() {
      this.open_sum = !this.open_sum;
    },
    numberMeter(number) {
      const lastParenthesisIndex = number.lastIndexOf('(');

      if (lastParenthesisIndex !== -1) {
        const areaString = number.slice(lastParenthesisIndex + 1, -3);
        return parseInt(areaString, 10);
      }
    },
    openRoom(room) {
      if (this.$refs.roomModal)
        this.$refs.roomModal.closeDial();
      this.room = room;
    },
  }
}
</script>

<template>
  <div id="stepForm"
       class="Main">
    <div id="errorList"></div>
    <section class="section holiday">
      <div class="section__wrapper">
        <div id="notification-top-fixed" class="notification isFixed closed">
          <div class="during-loading">
            <div class="loader">
              <div class="loader-linear"></div>
            </div>
            <span>Мы выбираем лучшие авиакомпании для гарантированного спокойствия.</span>
          </div>
        </div>
        <!-- AB  test-->
        <div id="react-smart-stay">
          <div class="section-title">Ваше размещение</div>
          <div v-for="(item, index) in room_types" class="Stay" :key="index">
            <div class="Lodging">
              <div
                :class="{'is-selected': item['selected']}"
                class="Lodging__option">
                <div class="Lodging__distribution is-selected is-included">
                  <div class="Lodging__label flex flex-col items-start">
                    <div class="w-full">
                     <span v-show="step.room_types.length > 1" class="Lodging__radio">
                     <input type="radio"
                            :value="item['id']"
                            v-model="selected"
                            v-show="step.room_types.length >= 1"
                            :name="'login' + item['id']"
                            @click="setRoom(item['id'])"
                            class="RadioBtnCheck"></span>
                      <span class="Lodging__title"><b>1&nbsp;x</b> <span>{{ item["name"] }}</span></span>
                    </div>
                    <div v-if="item['extra_charge_for_room'] === 0 || item['extra_charge_for_room'] === null"
                         class="Lodging__price w-full">
                      <span class="price float-right">включено в стоимость</span>
                    </div>
                    <div v-else class="Lodging__price  w-full self-end">
                            <span
                              style="color: black"
                              class="price float-right">+ ₽{{ item['extra_charge_for_room'] }} /сутки</span>
                    </div>
                  </div>
                  <div class="Lodging__list">
                    <div class="Lodging__details">
                      <div class="Lodging__picture">
                        <img :src="base_url + item['image']"
                             style="min-width: 100%;">
                      </div>
                      <div class="Lodging__content">
                        <div class="Lodging__title"><b>1&nbsp;x</b>&nbsp;<span>Семейный люкс Делюкс</span>
                        </div>
                        <div class="Lodging__textDescription">
                          <div class="Lodging__property"><i class="line-icon-bed-double"></i>1 двуспальная кровать
                            или 2 односпальные кровати
                          </div>
                          <div class="Lodging__property">
                            <i v-for="item in item['adults_capacity'] + item['children_capacity']"
                               class="line-icon-family-adult"></i>
                            {{ item["adults_capacity"] + item["children_capacity"] }} чел. максимум
                          </div>
                          <div v-if="room['infants']" class="Lodging__property">
                            <i class="line-icon-bed-baby"></i>детская кроватка
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div id="react-smart-board">
          <div class="section-title">Ваше питание</div>
          <div
            v-for="item in board_types"
            class="Stay">
            <div class="BoardType Lodging__distribution"
                 style="display: flex; flex-direction: inherit; align-items: center; padding: 0">
              <div class="BoardType__picto"
                   style="margin-left: 1rem; margin-right:0">
                      <span class="Lodging__radio">
                      <input type="radio"
                             :value="item.id"
                             v-model="selected_board"
                             :name="'board' + item.id"
                             @click="setBoard(item.id)"
                             class="RadioBtnCheck"></span>
              </div>
              <div class="BoardType__infra infrastructure-boardtypes-10958565"
                   style="width:100%;">
                <div class="BoardType__title">{{ item["name"] }}</div>
                <div class="BoardType__picto">
                  <img src="https://images4.bovpg.net/vpi/fr/front/uploaded/bp/bp_boardtype.svg"
                       :alt="item['name']">
                </div>
                <div class="BoardType__optionList">
                  <div class="BoardType__option is-selected is-included">
                    <div v-if="item['extra_charge'] === null || item['extra_charge'] === 0" class="BoardType__label">
                    </div>
                    <div v-else class="BoardType__label">
                      <div>Доплата за номер в сутки</div>
                    </div>
                    <div
                      v-if="item['extra_charge'] === null || item['extra_charge'] === 0"
                      class="BoardType__price">
                      <span class="price">включено в стоимость</span>
                    </div>
                    <div
                      v-else
                      class="BoardType__price">
                      <span class="price" style="color: black">+ ₽{{ item['extra_charge'] }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div id="react-smart-transfer">
          <div class="section-title">Ваш трансфер</div>
          <div
            v-for="item in transfer_types"
            class="Stay">
            <div class="BoardType Lodging__distribution"
                 style="display: flex; flex-direction: inherit; align-items: baseline; padding: 0">
              <div class="BoardType__picto"
                   style="margin-left: 1rem; margin-right:0">
                      <span class="Lodging__radio">
                      <input type="radio"
                             :value="item.id"
                             v-model="selected_transfer"
                             :name="'transfer' + item.id"
                             @click="setTransfer(item.id)"
                             class="RadioBtnCheck"></span>
              </div>
              <div class="BoardType__infra infrastructure-boardtypes-10958565"
                   style="width:100%;">
                <div class="BoardType__title">{{ item["name"] }}</div>
                <div class="BoardType__picto">
                  <figure
                    v-if="item['name'].toLowerCase().indexOf('паром') === -1
                    && item['name'].toLowerCase().indexOf('катер') === -1
                    && item['name'].toLowerCase().indexOf('скоростной') === -1
                    && item['name'].toLowerCase().indexOf('гидросамолет') === -1"
                    class="icon"><i class="line-icon-transport-bus"
                                    style="font-size: 34px"
                  ></i></figure>
                  <figure
                    v-if="item['name'].toLowerCase().indexOf('паром') !== -1
                    || item['name'].toLowerCase().indexOf('катер') !== -1
                    || item['name'].toLowerCase().indexOf('скоростной') !== -1"
                    class="icon">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                      <g>
                        <path fill="none" d="M0 0h24v24H0z"/>
                        <path
                          d="M4 10.4V4a1 1 0 0 1 1-1h5V1h4v2h5a1 1 0 0 1 1 1v6.4l1.086.326a1 1 0 0 1 .682 1.2l-1.516 6.068a4.992 4.992 0 0 1-1.902-.272l1.25-5.352L12 10l-7.6 2.37 1.25 5.351a4.992 4.992 0 0 1-1.902.273l-1.516-6.068a1 1 0 0 1 .682-1.2L4 10.4zm2-.6L12 8l6 1.8V5H6v4.8zM4 20a5.978 5.978 0 0 0 4-1.528A5.978 5.978 0 0 0 12 20a5.978 5.978 0 0 0 4-1.528A5.978 5.978 0 0 0 20 20h2v2h-2a7.963 7.963 0 0 1-4-1.07A7.963 7.963 0 0 1 12 22a7.963 7.963 0 0 1-4-1.07A7.963 7.963 0 0 1 4 22H2v-2h2z"/>
                      </g>
                    </svg>
                  </figure>
                  <figure
                    v-if="item['name'].toLowerCase().indexOf('гидросамолет') !== -1"
                    class="icon">
                    <svg id="Layer_1" enable-background="new 0 0 510 510" viewBox="0 0 510 510"
                         xmlns="http://www.w3.org/2000/svg">
                      <g>
                        <path
                          d="m480 167.5v60h-51.973l-14.011-21.017c-8.131-12.198-20.711-20.403-34.82-23.054l-79.636-170.929h-104.56v186.393l-76.298 12.047-50.843-73.44h-67.859v121.318c0 17.084 6.355 33.431 17.896 46.028 11.541 12.598 27.27 20.357 44.289 21.85l157.815 13.844v51.96h-114.288c-25.206 0-45.712 20.506-45.712 45.712 0 24.444 19.126 44.5 43.543 45.661l286.418 13.61.712.017c30.933 0 61.586-4.678 91.111-13.905 16.877-5.274 28.216-20.698 28.216-38.379 0-17.812-11.952-33.699-29.064-38.634l-7.331-2.115c-27.189-7.843-55.311-11.859-83.604-11.957v-46.288c30.803-2.744 60.927-9.936 89.872-21.514l.128-.051v47.843h30v-205zm-255-125h55.44l65.227 140h-23.008c-15.816 0-31.758 1.251-47.381 3.718l-50.278 7.938zm-195 125h22.141l33.669 48.634-55.81 8.812zm220 175.671 48.689 4.271.654.058h60.657v45h-110zm222.62 92.235c4.346 1.253 7.38 5.287 7.38 9.81 0 4.49-2.879 8.406-7.164 9.745-26.513 8.285-54.037 12.503-81.812 12.539l-286.058-13.593c-8.392-.399-14.966-7.293-14.966-15.695 0-8.664 7.049-15.712 15.712-15.712h283.232c25.836 0 51.521 3.631 76.345 10.791zm-3.89-138.553c-34.253 13.701-70.325 20.647-107.215 20.647h-60.859l-235.85-20.688c-19.842-1.741-34.806-18.075-34.806-37.994v-3.5l249.958-39.467c14.08-2.223 28.446-3.351 42.701-3.351h46.545c7.995 0 15.416 3.971 19.851 10.624l22.918 34.376h68.027v34.845z"/>
                        <path d="m330 250h30v30h-30z"/>
                        <path d="m270 250h30v30h-30z"/>
                      </g>
                    </svg>
                  </figure>
                </div>
                <div class="BoardType__optionList">
                  <div class="BoardType__option is-selected is-included">
                    <div v-if="item['price'] === 0 || item['price'] === null" class="BoardType__label">
                    </div>
                    <div v-else class="BoardType__label">
                      <div>Доплата за транспорт</div>
                    </div>
                    <div
                      v-if="item['price'] === 0 || item['price'] === null"
                      class="BoardType__price">
                      <span class="price">включено в стоимость</span>
                    </div>
                    <div
                      v-else
                      class="BoardType__price">
                      <span class="price" style="color: black">+ ₽{{ item['price'] }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-if="step['with_flight']" id="react-smart-transport">
          <div class="section-title">Ваш перелёт</div>
          <div class="section-content--transport Transport">
            <div>
              <div class="ResumeTransport ">
                <div class="ResumeTransport__destination">
                  <span class="desti">{{ step["departure_city"] }}</span><i
                  class="icon line-icon-arrow-exchange-horizontal"></i><span
                  class="desti">{{ step["arrival_city"] }}</span>
                </div>
                <div class="ResumeBoundInfo ResumeBoundInfo--outbound">
                  <span class="ResumeBoundInfo__title">Туда</span><span
                  class="ResumeBoundInfo__date">{{ start_date }}</span>
                </div>
                <div class="ResumeBoundInfo ResumeBoundInfo--inbound">
                  <span class="ResumeBoundInfo__title">Обратно</span><span
                  class="ResumeBoundInfo__date">{{ end_date }}</span>
                </div>
              </div>
            </div>
            <div class="TabsTransport ">
              <div class="TabsTransport__wrapper is-current">
                <div class="TabsTransport__button"><i
                  class="TabsTransport__button__icon line-icon-plane"></i>Рейсы
                </div>
              </div>
            </div>

            <!-- Вкладка билеты -->
            <div v-if="step['flights'].length > 0" class="ProposalsPanel">
              <card-transport
                :flights="step['flights']"
                :sl_first=sl_first
                @id_flights="idFlights"
                @price_flights="priceFlights"/>
            </div>
            <div v-else class="page-center">
              <div id="rebuildMessage" class="Alert Alert--endSession" role="alert">
                <div class="Alert__icon">
                  <i class="icon line-icon-clock"></i>
                </div>
                <div class="Alert__content">
                  <div class="Alert__description">
                    <strong>Системе не удается подтвердить наличие свободных мест на авиаперелет в этом туре.</strong>
                    Свяжитесь
                    с отделом бронирования по тел. +79014680168 либо оставте свои контактные данные и наш менеджер
                    свяжется с
                    Вами в ближайшее время
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="section optionto" style="display: none">
      <div class="section-title">Запрос бронирования</div>
      <div id="react-optionto">
        <div class="section-content last-child">
          <div class="logo_optionto"><img alt="iconService" src="/images/union.svg"
                                          class="NewHelpAndContact__icon"></div>
          <div class="optionto_description clearfix row-InsuranceBlock__text"><p class="small-InsuranceBlock__text">
            Мы ценим Вашу приватность и предлагаем выбрать какой запрос на бронирования тура вы хотите отправить. Вы
            можете выбрать между "Контактные данные" и "Контактные и паспортные данные туристов".</p>
          </div>
        </div>
      </div>
    </section>
    <section class="section hybridInsuranceFlex">
      <div class="media-Insurance" style="display: none">
        <div class="row-Insurance">
          <div class="row-InsuranceBlock first-InsuranceBlock">
            <label
              @click="labelOne"
              for="insurance-8485014" class="InsuranceTable__label">
              <input type="radio" name="insurance"
                     :checked="label_one"
                     id="insurance-8485014"
                     class="RadioBtnCheck" value="0"></label>
            <div class="InsuranceTable__insurancePicture"><i class="line-icon-shield-check"></i></div>
            <div class="InsuranceTable__insuranceName">Контактные данные для связи</div>
          </div>
          <div class="row-InsuranceBlock info-InsuranceBlock">
            <label><i class="line-icon-check"></i></label>
            <div class="row-InsuranceBlock__text">
              Наш менеджер свяжется с Вами в самое ближайшее время.
              <div class="small-InsuranceBlock__text">
                Запросы, оставленные в нерабочее время обрабатываются на следующий рабочий день.
              </div>
            </div>
          </div>
          <div class="row-InsuranceBlock info-InsuranceBlock">
            <label><i class="line-icon-check"></i></label>
            <div class="row-InsuranceBlock__text">
              Экономия Вашего времени.
              <div class="small-InsuranceBlock__text">
                Для отправки запроса на бронирования требуется только имя, телефон и Email.
              </div>
            </div>
          </div>
          <div class="row-InsuranceBlock info-InsuranceBlock">
            <label><i class="line-icon-check"></i></label>
            <div class="row-InsuranceBlock__text">
              Оптимально для туристов чей паспорт еще не готов.
              <div class="small-InsuranceBlock__text">
                После получения Вами паспорта наш менеджер дозаполнит необходимые данные.
              </div>
            </div>
          </div>
        </div>
        <div class="row-Insurance">
          <div class="row-InsuranceBlock first-InsuranceBlock">
            <label
              @click="labelTwo"
              for="insurance-8485035" class="InsuranceTable__label">
              <input type="radio" name="insurance"
                     :checked="label_two"
                     id="insurance-8485035"
                     class="RadioBtnCheck" value="0"></label>
            <div class="InsuranceTable__insurancePicture"><i class="line-icon-shield-doublecheck"></i></div>
            <div class="InsuranceTable__insuranceName">Контактные и паспортные данные туристов</div>
          </div>
          <div class="row-InsuranceBlock info-InsuranceBlock">
            <label><i class="line-icon-check"></i></label>
            <div class="row-InsuranceBlock__text">
              Возможность забронировать и оплатить тур в нерабочее время.
              <div class="small-InsuranceBlock__text">
                Вы получаете доступ в личный кабинет со всеми деталями вашего бронирования.
                Договор с реквизитами для оплаты также доступен в личном кабинете.
              </div>
            </div>
          </div>
          <div class="row-InsuranceBlock info-InsuranceBlock">
            <label><i class="line-icon-check"></i></label>
            <div class="row-InsuranceBlock__text">
              Доступ в личный кабинет сразу после отправки запроса на бронирование.
              <div class="small-InsuranceBlock__text">
                В личном кабинете вы сможете ознакомиться со всеми деталями Вашего бронирования.
              </div>
            </div>
          </div>
          <div class="row-InsuranceBlock info-InsuranceBlock">
            <label><i class="line-icon-check"></i></label>
            <div class="row-InsuranceBlock__text">
              Оптимально для туристов, которые определились с направлением и отелем.
              <div class="small-InsuranceBlock__text">
                Для бронирования тура Вам не нужно общаться с менеджером.
                Вся информация будет доступна в личном кабинете. Все документы будут созданы автоматически.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="section total">
      <div class="section-content price step1 last-child">
        <div id="react-price">
          <div class="section-data clearfix ">
            <div class="sub-section-data clearfix ">
	                       					<span class="section-data-text">
	                       						<span class="font-bold">Итоговая <span
                                      class="font-unbold">стоимость тура</span></span>
	                       					<span
                                    style="display: none"
                                    class="total-subtitle">(доп. услуги)</span>
		                       				</span>
              <span class="section-data-price" id="price-total">
		                       					<div>
		                       						<span class="price">₽{{ price }}</span>
		                       						<span
                                        style="display: none"
                                        class="price-insteadof">вместо <span
                                        class="price-insteadof-price">£2,028</span></span>
		                       					</div>
		                       				</span>
            </div>
            <div class="sub-section-data advance-price clearfix advance-price-hidden">
		                       				<span class="section-data-text">
		                       					<span class="font-bold">Сумма, выплаченная сегодня</span>
		                       					<span class="total-subtitle">Задолженность в размере £0 может быть погашена несколькими платежами и различными кредитными картами до 31/07/2023. После этой даты сумма задолженности будет автоматически списана с кредитной карты, использованной при бронировании</span>
		                       				</span>
              <span class="section-data-price">
		                       					<span class="amountToPay">£0</span>
		                       				</span>
            </div>
          </div>
        </div>
      </div>
      <div class="continue-container">
	                       		<span id="continue-container">
	                       			<button
                                v-show="button_two"
                                class="Button Button--primary"
                                @click="nextStep">Продолжить</button>
	                       			<button
                                v-show="button_one"
                                class="Button Button--primary"
                                @click="nextStepPreliminarily">Продолжить</button>
	                       		</span>
        <figure class="figure-loader" id="continue-button-loader">
          <div class="Loader Loader--circular Loader--pink Loader--sm">
            <div class="Loader__anim">
              <svg class="Loader__svg" viewBox="25 25 50 50">
                <circle class="Loader__svg__path" cx="50" cy="50" r="20" fill="none" strokewidth="2"
                        strokemiterlimit="10"></circle>
              </svg>
            </div>
          </div>
        </figure>
      </div>
    </section>
  </div>
</template>

<style>
.clearfix::after {
  content: "";
  display: table;
  clear: both;
}

.Schedule[data-tooltip]:after {
  bottom: 90%;
  margin-left: -90px;
  text-align: center;
}

.Schedule[data-tooltip]:before {
  bottom: 90%;
  left: 45%;
}
</style>
