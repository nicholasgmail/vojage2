<template>
  <div>
    <!-- основной контент -->
    <section id="page-container">
      <div
        :class="{'dsp_fl': $store.state.step === '3'}"
        class="page-center">
        <div
          v-show="$store.state.step != '3'"
          id="react-smart-summary">
          <aside class="Summary Summary--bp  ">
            <div class="SummarySection SummarySection--description">
              <div class="SummarySection__picture">
                <img :src="base_url + step.hotel_image"
                     :alt="step.hotel">
              </div>
              <div class="SummaryRecap">
                <div class="SummarySection__recap">
                  <div class="SummarySection__destinationInfo">
                    <div class="SummarySection__destination">{{ step.hotel }} - {{ step.hotel_city }} -
                      {{ step.hotel_country }}
                    </div>
                    <div class="SummarySection__hotel">{{ step.hotel }}</div>
                  </div>
                  <div v-if="step.flights.length > 0" class="SummarySection__transport">Перелет включен</div>
                  <hr class="SummarySeparator only-mobile">
                </div>
                <hr class="SummarySeparator hidden-mobile">
              </div>
            </div>
            <div class="SummarySection SummarySection--details">
              <div class="SummaryDetail SummaryDetail--duration">
                <div v-if="step.departure_city !== null" class="SummaryRecapLine">
                  <span class="SummaryRecapLine__label">Город отправления:</span><span
                  class="SummaryRecapLine__detail">{{ step.departure_city }}</span>
                </div>
                <div class="SummaryRecapLine">
                  <span class="SummaryRecapLine__label">Дата отправления:</span><span class="SummaryRecapLine__detail">
                  {{ start_date }}</span>
                </div>
                <div class="SummaryRecapLine">
                  <span class="SummaryRecapLine__label">Дата окончания:</span><span
                  class="SummaryRecapLine__detail">{{ end_date }}</span>
                </div>
                <div class="SummaryRecapLine">
                  <span class="SummaryRecapLine__label">Продолжительность:</span>
                  <span class="SummaryRecapLine__detail">{{ step.duration }} Ночей</span>
                </div>
              </div>
              <div class="SummaryDetail SummaryDetail--pax">
                <div class="SummaryRecapLine">
                  <span class="SummaryRecapLine__label">Участники:</span><span class="SummaryRecapLine__detail">
                  <span
                    v-if="step.adults >1"
                    class="summary-pax-type">{{ step.adults }} взрослых</span>
                  <span
                    v-else
                    class="summary-pax-type">{{ step.adults }} взрослый</span>
                  <span v-if="step.children" class="summary-pax-type">{{ step.children }}
                    <span v-if="step.children > 1">ребенка</span>
                    <span v-else>ребенок</span></span>
                  <span v-if="step.infants" class="summary-pax-type">{{ step.infants }}
                    <span v-if="step.children > 1">младенец</span>
                    <span v-else>младенца</span>
                    </span></span>
                </div>
              </div>
              <div class="SummaryDetail SummaryDetail--detailsmoreDetails">
                <price-details :details="step['just_for_you']" :not_include="false"/>
              </div>
            </div>
            <hr class="SummarySeparator">
            <div class="SummarySection SummarySection--quotation">
              <div class="SummaryQuotation">
                <div class="SummaryQuotation__label">Всего</div>
                <div class="SummaryQuotation__prices">
                  <span v-if="$store.state.step == 1" class="SummaryQuotation__total">{{ price }} ₽</span>
                  <span v-if="$store.state.step == 2 || $store.state.step == 3"
                        class="SummaryQuotation__total">{{ price }} ₽</span>
                </div>
              </div>
            </div>
          </aside>
        </div>
        <step_1 v-if="$store.state.step == 1" :step="step" :id="id" @get_price="handlePrice"/>
        <step_2 v-if="$store.state.step == 2" :step="step" :id="id" @get_price="handlePrice"/>
        <step_3 v-if="$store.state.step == 3"
                :step="step"
                :id="id"
                :end_date="end_date"
                :start_date="start_date"
        />
        <aside
          v-show="$store.state.step != '3'"
          class="">
          <banner_info/>
        </aside>
      </div>
    </section>
  </div>
</template>

<script>
import {format} from 'date-fns';
import ruLocale from 'date-fns/locale/ru';
import PriceDetails from "../sale/PriceDetails.vue";
import RoomModal from "../modals/RoomModal.vue";
import CardTransport from "./CardTransport.vue";
import arrSorted from '~/mixins/arr_sorted.js';
import Step_1 from "./components/step_1.vue";
import Step_2 from "./components/step_2.vue";
import Step_3 from "./components/step_3.vue";
import Banner_info from "../all/banner_info.vue";
import VoyageSpinner from "../all/voyage_spinner.vue";

export default {
  name: 'RequestBook',
  components: {VoyageSpinner, Banner_info, Step_2, Step_1, Step_3, CardTransport, RoomModal, PriceDetails},
  mixins: [arrSorted],
  props: ["step", "id"],
  data() {
    return {
      open_sum: false,
      rt: {...this.step.room_types},
      bt: {...this.step.board_types},
      tf: {...this.step.transfer_types},
      base_url: process.env.BASE_URL,
      price: 0
    }
  },
  mounted() {
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
      if (this.tf[key]["price"] == null) {
        this.selected_transfer = this.tf[key]["id"]
      }
    }
    this.rt = Object.values(this.rt).map(($v) => {
      if (this.step["selected_room"]["id"] === $v["id"]) {
        $v["selected"] = true;
        this.selected = $v["id"];
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
    if (this.$store.state.step == 2 || this.$store.state.step == 3) {
      this.price = this.$route.query["price"];
    }
    if (this.rt.length > 0)
      setTimeout(() => {
        this.load = true;
      }, 200);
  },
  computed: {
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
    handlePrice(data) {
      this.price = data;
    }
  }
}
</script>
<style>
@media (max-width: 349px) {
  .dnon_sp {
    display: none;
  }
}

@media (max-width: 575.98px) {
  .SmartBP .Lodging__label {
    display: block;
  }

  .Lodging__distribution.is-included .Lodging__price {
    float: right;
  }
}

#page-container > .dsp_fl {
  display: flex;
}

</style>

