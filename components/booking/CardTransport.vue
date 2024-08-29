<script>
import {format, parse, addMinutes} from "date-fns";
import ruLocale from "date-fns/locale/ru";
import arrSorted from '~/mixins/arr_sorted.js';
import Segment_detail from "./components/segment_detail.vue";
import Segment_logo from "./components/segment_logo.vue";

export default {
  name: "CardTransport",
  components: {Segment_logo, Segment_detail},
  props: ["flights", "sl_first"],
  data() {
    return {
      base_url: process.env.BASE_URL,
      fl: {...this.flights},
      selected: this.sl_first,
    }
  },

  mounted() {
    var spans = this.$el.querySelectorAll("[data-descr]");
    for (var i = 0; i < spans.length; ++i) {
      var span = spans[i];
      span.addEventListener("mouseenter", this.ShowTooltip);
      span.addEventListener("mouseleave", this.HideTooltip);
    }

    for (const key in this.fl) {
      if (this.fl[key]["extra_price"] === 0) {
        this.selected = this.fl[key]["id"]
      }
    }
    this.fl = Object.values(this.fl).map(($v) => {
      if ($v['extra_price'] === 0) {
        $v["selected"] = true;
        this.$parent.id_flights = $v['id']
      }
      return $v;
    }).slice().sort((a, b) => {
      const priceA = parseInt(a.extra_price);
      const priceB = parseInt(b.extra_price);

      return priceA - priceB;
    }).sort(this.compare);
    this.flights_types = this.fl;
  },
  computed: {
    flights_types: {
      get() {
        return this.fl;
      },
      set(value) {
        this.fl = {...value};
      }
    },
  },
  methods: {
    dateNext(date, flight, time) {
      const dateAll = new Date(date);
      const [hours, minutes, seconds] = time.split(":").map(Number);
      dateAll.setHours(hours, minutes, seconds);
      const difference = addMinutes(dateAll, flight);
      let date_in = format(difference, 'eeeeee dd MMM', {locale: ruLocale});
      return date_in.charAt(0).toUpperCase() + date_in.slice(1);
    },
    ShowTooltip(e) {
      var elm = e.target;
      var tt = this.$refs.tooltip;
      tt.style.left = elm.offsetLeft + 'px';
      tt.style.top = (elm.offsetTop + elm.offsetHeight + 5) + 'px';
      tt.textContent = elm.dataset.descr;
      tt.classList.remove("invisible");
    },

    HideTooltip(e) {
      var tt = this.$refs.tooltip;
      tt.classList.add("invisible");
    },
    departureDate(date) {
      const date_out = new Date(date);
      let date_in = format(date_out, 'eeeeee dd MMM', {locale: ruLocale});
      date_in = date_in.charAt(0).toUpperCase() + date_in.slice(1);
      return date_in
    },
    durationTime(time) {
      const hours = Math.floor(time / 60);
      const remainingMinutes = time % 60;
      return format(new Date().setHours(hours, remainingMinutes), "HHч mmм");
    },
    timeToFrom(time) {
      const parsedTime = parse(time, 'HH:mm:ss', new Date());
      return format(parsedTime, 'HH:mm');
    },
    setFlights(selected) {
      for (const key in this.fl) {
        if (this.fl[key]["id"] == selected) {
          this.fl[key]["selected"] = true;
          this.selected = this.fl[key]["id"]
          if (this.fl[key]["id"] === selected) {
            this.$emit('price_flights', this.fl[key]['extra_price'] ?? 0)
            this.$emit('id_flights', selected)
          } else {
            this.$emit('price_flights', 0)
          }
        } else {
          if (this.fl[key]["selected"])
            this.fl[key]["selected"] = false;
        }
      }
    },
  },
}
</script>

<template>
  <div class="CardTransport" data-page="1" data-pageposition="1">
    <template v-for="(item, index) in flights_types">
      <div class="CardTransport__main">
        <div class="CardTransport__header">
          <label class="CardTransport__radio">
            <input type="radio"
                   :value="item.id"
                   v-model="selected"
                   :name="'flight' + item.id"
                   @click="setFlights(item.id)"
                   class="RadioBtnCheck">
          </label>
          <ul class="CardTransport__tabsClasse">
            <li>
              <button type="button" class="TabClasse is-selected"><span
                v-if="!item.extra_price"
                class="TabClasse__label">Включено в стоимость</span><span
                class="TabClasse__price">+ ₽{{ item.extra_price ?? 0 }}</span></button>
            </li>
          </ul>
        </div>

        <div class="CardTransport__body">
          <div class="CardTransport__bounds">
            <div class="Bound Bound--outbound ">
              <div class="BoundInfos">
                <span class="BoundInfos__boundWay">Туда</span>
                <span class="BoundInfos__date">{{ departureDate(item['departure_date']) }}</span>
                <div class="BoundInfos__logo">
                  <img
                    :src="base_url + item['airline_info']['logo']"
                    :alt="item['airline_info']['name']" class="BoundInfos__img">
                </div>
                <span class="BoundInfos__name">{{ item['airline_info']['name'] }}</span>
              </div>

              <div v-if="!item['direct_1']" class="Schedule"
                   style="z-index: 9999; position: relative;">
                <div class="PlaceTime PlaceTime--departure">
                  <span class="PlaceTime__hour">{{ timeToFrom(item['flight_1_time_from']) }}</span>
                  <span class="PlaceTime__place">{{ item['origin'] }}</span>
                </div>
                <div class="StopoverInfo">
                  <div class="StopoverInfo__duration">{{ durationTime(item["flight_1_duration"]) }}</div>
                  <svg class="StopoverInfo__path Path" width="89" height="10">
                    <g v-if="!item['direct_1']" id="path">
                      <circle cx="4.5" cy="4.5" r="3.5" stroke-width="2" stroke="#d3d3d3" fill="none"></circle>
                      <line x1="9" x2="80" y1="4.5" y2="5" stroke-width="2" stroke="#d3d3d3"></line>
                      <circle cx="84" cy="4.5" r="3.5" stroke-width="2" stroke="#d3d3d3" fill="none"></circle>
                      <circle cx="45" cy="4.5" r="3.5" stroke-width="2" stroke="#d3d3d3" fill="#d3d3d3"></circle>
                    </g>
                    <g v-else id="path">
                      <circle cx="4.5" cy="4.5" r="3.5" stroke-width="2" stroke="#d3d3d3"
                              fill="none"></circle>
                      <line x1="9" x2="80" y1="4.5" y2="5" stroke-width="2" stroke="#d3d3d3"></line>
                      <circle cx="84" cy="4.5" r="3.5" stroke-width="2" stroke="#d3d3d3"
                              fill="none"></circle>
                    </g>
                  </svg>
                  <div class="StopoverInfo__type">
                    <a :href="item['link']" target="_blank" v-if="!item['direct_1']" data-tooltip="пересадка"
                       class="PlaceTime__place"
                       style="z-index: 9999; position: relative;">{{ item['transfer_1_airport'] }}</a>
                  </div>
                </div>
                <div class="PlaceTime PlaceTime--arrival">
                  <span class="PlaceTime__hour">{{ timeToFrom(item['flight_1_time_to']) }}</span>
                  <span class="PlaceTime__place">
                    {{ item['destination'] }}
                  </span>
                </div>
              </div>
              <div v-else
                   class="Schedule"
                   style="z-index: 9999; position: relative;">
                <div class="PlaceTime PlaceTime--departure">
                  <span class="PlaceTime__hour">{{ timeToFrom(item['flight_1_time_from']) }}</span>
                  <span class="PlaceTime__place">{{ item['origin'] }}</span>
                </div>
                <div class="StopoverInfo">
                  <div class="StopoverInfo__duration">{{ durationTime(item["flight_1_duration"]) }}</div>
                  <svg class="StopoverInfo__path Path" width="89" height="10">
                    <g id="path">
                      <circle cx="4.5" cy="4.5" r="3.5" stroke-width="2" stroke="#d3d3d3"
                              fill="none"></circle>
                      <line x1="9" x2="80" y1="4.5" y2="5" stroke-width="2" stroke="#d3d3d3"></line>
                      <circle cx="84" cy="4.5" r="3.5" stroke-width="2" stroke="#d3d3d3"
                              fill="none"></circle>
                    </g>
                  </svg>
                  <div class="StopoverInfo__type">
                    <span>Прямой</span>
                  </div>
                </div>
                <div class="PlaceTime PlaceTime--arrival">
                  <span class="PlaceTime__hour">{{ timeToFrom(item['flight_1_time_to']) }}</span>
                  <span class="PlaceTime__place">
                    {{ item['destination'] }}
                  </span>
                </div>
              </div>
            </div>
            <div class="Bound Bound--inbound ">
              <div class="BoundInfos">
                <span class="BoundInfos__boundWay">Обратно</span>
                <span class="BoundInfos__date">{{ departureDate(item['return_date']) }}</span>
                <div class="BoundInfos__logo">
                  <img
                    :src="base_url + item['airline_info']['logo']"
                    :alt="item['airline_info']['name']" class="BoundInfos__img">
                </div>
                <span class="BoundInfos__name">{{ item['airline_info']['name'] }}</span>
              </div>
              <div v-if="!item['direct_2']" class="Schedule"
                   style="z-index: 9999; position: relative;">
                <div class="PlaceTime PlaceTime--departure">
                  <span class="PlaceTime__hour">{{ timeToFrom(item['flight_2_time_from']) }}</span>
                  <span class="PlaceTime__place">
                    {{ item['destination'] }}
                  </span>
                </div>
                <div class="StopoverInfo">
                  <div class="StopoverInfo__duration">{{ durationTime(item["flight_2_duration"]) }}</div>
                  <svg class="StopoverInfo__path Path" width="89" height="10">
                    <g id="path">
                      <circle cx="4.5" cy="4.5" r="3.5" stroke-width="2" stroke="#d3d3d3" fill="none"></circle>
                      <line x1="9" x2="80" y1="4.5" y2="5" stroke-width="2" stroke="#d3d3d3"></line>
                      <circle cx="84" cy="4.5" r="3.5" stroke-width="2" stroke="#d3d3d3" fill="none"></circle>
                      <circle cx="45" cy="4.5" r="3.5" stroke-width="2" stroke="#d3d3d3" fill="#d3d3d3"></circle>
                    </g>
                  </svg>
                  <div class="StopoverInfo__type">
                    <a :href="item['link']" target="_blank" v-if="!item['direct_1']" data-tooltip="пересадка"
                       class="PlaceTime__place"
                       style="z-index: 9999; position: relative;">{{ item['transfer_2_airport'] }}</a></div>
                </div>
                <div class="PlaceTime PlaceTime--arrival">
                  <span class="PlaceTime__hour">{{ timeToFrom(item['flight_2_time_to']) }}</span><span
                  class="PlaceTime__place">{{ item['origin'] }}</span>
                </div>
              </div>
              <div v-else
                   class="Schedule"
                   style="z-index: 9999; position: relative;">
                <div class="PlaceTime PlaceTime--departure">
                  <span class="PlaceTime__hour">{{ timeToFrom(item['flight_2_time_from']) }}</span>
                  <span class="PlaceTime__place">
                    {{ item['destination'] }}
                  </span>
                </div>
                <div class="StopoverInfo">
                  <div class="StopoverInfo__duration">{{ durationTime(item["flight_2_duration"]) }}</div>
                  <svg class="StopoverInfo__path Path" width="89" height="10">
                    <g id="path">
                      <circle cx="4.5" cy="4.5" r="3.5" stroke-width="2" stroke="#d3d3d3"
                              fill="none"></circle>
                      <line x1="9" x2="80" y1="4.5" y2="5" stroke-width="2" stroke="#d3d3d3"></line>
                      <circle cx="84" cy="4.5" r="3.5" stroke-width="2" stroke="#d3d3d3"
                              fill="none"></circle>
                    </g>
                  </svg>
                  <div class="StopoverInfo__type">
                    <span
                      style="z-index: 9999; position: relative;">Прямой</span></div>
                </div>
                <div class="PlaceTime PlaceTime--arrival">
                  <span class="PlaceTime__hour">{{
                      timeToFrom(item['flight_2_time_to'])
                    }}</span><span
                  class="PlaceTime__place">{{ item['origin'] }}</span>
                </div>
              </div>
            </div>
          </div>
          <div class="CardTransport__infos TransportInfos">
            <div class="Luggages">
              Включенный багаж
              <span class="SuitcaseTooltip"
                    id="luggage-tooltip-ls-1694450100-manherx-81695033000-herdusbt-1695058500-dusman-eco">
																	<span
                                    title="1 место ручной клади до 7кг на человека в туре"
                                    class="Suitcase ">
																		<i class="Suitcase__icon line-icon-suitcase-cabine"></i>
																		<span class="Suitcase__counter">7кг</span>
																	</span>
																	<span class="Suitcase " style="display: none">
																		<i class="Suitcase__icon line-icon-suitcase-cabine-2"></i>
																		<span class="Suitcase__counter">0</span>
																	</span>
																	<span
                                    title="1 место багажа до 20кг на человека в туре"
                                    class="Suitcase Suitcase--isDisabled"><i
                                    class="Suitcase__icon line-icon-suitcase"></i>
																		<span class="Suitcase__counter">20кг</span>
																	</span>
																</span>
            </div>
            <div class="MoreInfos">
              <button type="button" class="MoreInfos__button"><i class="MoreInfos__icon line-icon-angle-down"></i><span
                class="MoreInfos__label">Детали</span></button>
            </div>
          </div>
        </div>
      </div>
      <div class="CardTransport__details CardTransportDetails" style="display: none;">
        <div class="CardTransportDetails__bound BoundDetails BoundDetails--outbound">
          <div class="BoundDetails__title">Туда</div>
          <div v-if="!item['direct_1']" class="Segment">
            <segment_logo :item="item"/>
            <segment_detail :item="item"/>
            <div class="Segment__classe"></div>
            <div class="Segment__schedule way-departure">
              <span class="Segment__time"><span>{{ timeToFrom(item['flight_1_time_from']) }}</span></span>
              <span class="Segment__date">{{ departureDate(item['departure_date']) }}</span>
            </div>
            <div class="Segment__location way-departure"><span class="airport-code">{{ item['origin'] }}</span>
            </div>
            <div class="Segment__location way-arrival"><span
              class="airport-code">{{ item['transfer_1_airport'] }}</span>
            </div>
            <div class="Segment__travelTime"></div>
            <div class="Segment__path">
              <svg class="Path" width="10" height="39">
                <g id="path">
                  <circle cx="4.5" cy="4.5" r="3.5" stroke-width="2" stroke="#d3d3d3" fill="none"></circle>
                  <line x1="4.5" x2="4.5" y1="9" y2="29.5" stroke-width="2" stroke="#d3d3d3"></line>
                  <circle cx="4.5" cy="34" r="3.5" stroke-width="2" stroke="#d3d3d3" fill="none"></circle>
                </g>
              </svg>
            </div>
          </div>
          <div v-if="!item['direct_1']" class="SegmentStopover">
            <a :href="item['link']" target="_blank" class="underlined-text">
              <strong class="SegmentStopover__time">пересадка</strong>&nbsp;
              •
              <span class="airport-code">{{ item['transfer_1_airport'] }}</span>
            </a>
          </div>
          <div v-if="!item['direct_1']" class="Segment">
            <segment_logo :item="item"/>
            <segment_detail :item="item"/>
            <div class="Segment__classe"></div>
            <div class="Segment__schedule way-departure">
              <span class="Segment__time"><span></span></span><span class="Segment__date"></span>
            </div>
            <div class="Segment__location way-departure">
              <span
                class="airport-code">{{ item['transfer_1_airport'] }}</span>
            </div>
            <div class="Segment__schedule way-arrival">
              <span class="Segment__time"><span>{{ timeToFrom(item['flight_1_time_to']) }}</span></span>
              <span
                class="Segment__date">
                {{ dateNext(item['departure_date'], item['flight_1_duration'], item['flight_1_time_from']) }}</span>
            </div>
            <div class="Segment__location way-arrival"><span class="airport-code"> {{ item['destination'] }}</span>
            </div>
            <div class="Segment__travelTime"></div>
            <div class="Segment__path">
              <svg class="Path" width="10" height="39">
                <g id="path">
                  <circle cx="4.5" cy="4.5" r="3.5" stroke-width="2" stroke="#d3d3d3" fill="none"></circle>
                  <line x1="4.5" x2="4.5" y1="9" y2="29.5" stroke-width="2" stroke="#d3d3d3"></line>
                  <circle cx="4.5" cy="34" r="3.5" stroke-width="2" stroke="#d3d3d3" fill="none"></circle>
                </g>
              </svg>
            </div>
          </div>
          <div v-else class="Segment">
            <segment_logo :item="item"/>
            <segment_detail :item="item"/>
            <div class="Segment__classe"></div>
            <div class="Segment__schedule way-departure">
              <span class="Segment__time"><span>{{ timeToFrom(item['flight_1_time_from']) }}</span></span>
              <span class="Segment__date">{{ departureDate(item['departure_date']) }}</span>
            </div>
            <div class="Segment__location way-departure"><span class="airport-code">{{ item['origin'] }}</span>
            </div>
            <div class="Segment__schedule way-arrival">
              <span class="Segment__time"><span>{{ timeToFrom(item['flight_1_time_to']) }}</span></span>
              <span
                class="Segment__date">{{
                  dateNext(item['departure_date'], item['flight_1_duration'], item['flight_1_time_from'])
                }}</span>
            </div>
            <div class="Segment__location way-arrival"><span class="airport-code"> {{ item['destination'] }}</span>
            </div>
            <div class="Segment__travelTime"></div>
            <div class="Segment__path">
              <svg class="Path" width="10" height="39">
                <g id="path">
                  <circle cx="4.5" cy="4.5" r="3.5" stroke-width="2" stroke="#d3d3d3" fill="none"></circle>
                  <line x1="4.5" x2="4.5" y1="9" y2="29.5" stroke-width="2" stroke="#d3d3d3"></line>
                  <circle cx="4.5" cy="34" r="3.5" stroke-width="2" stroke="#d3d3d3" fill="none"></circle>
                </g>
              </svg>
            </div>
          </div>
          <div class="BoundDetails__travelTime"><strong>{{ durationTime(item["flight_1_duration"]) }}&nbsp;</strong>
            &nbsp;Время в пути
          </div>
        </div>
        <div class="CardTransportDetails__bound BoundDetails BoundDetails--inbound">
          <div class="BoundDetails__title">Обратно</div>
          <div v-if="!item['direct_2']" class="Segment">
            <segment_logo :item="item"/>
            <segment_detail :item="item"/>
            <div class="Segment__classe"></div>
            <div class="Segment__schedule way-departure">
              <span class="Segment__time"><span>{{ timeToFrom(item['flight_2_time_from']) }}</span></span>
              <span class="Segment__date">{{ departureDate(item['return_date']) }}</span>
            </div>
            <div class="Segment__location way-departure"><span class="airport-code">{{ item['destination'] }}</span>
            </div>
            <div class="Segment__location way-arrival"><span
              class="airport-code">{{ item['transfer_2_airport'] }}</span>
            </div>
            <div class="Segment__travelTime"></div>
            <div class="Segment__path">
              <svg class="Path" width="10" height="39">
                <g id="path">
                  <circle cx="4.5" cy="4.5" r="3.5" stroke-width="2" stroke="#d3d3d3" fill="none"></circle>
                  <line x1="4.5" x2="4.5" y1="9" y2="29.5" stroke-width="2" stroke="#d3d3d3"></line>
                  <circle cx="4.5" cy="34" r="3.5" stroke-width="2" stroke="#d3d3d3" fill="none"></circle>
                </g>
              </svg>
            </div>
          </div>
          <div v-if="!item['direct_2']" class="SegmentStopover">
            <a :href="item['link']" target="_blank" class="underlined-text">
              <strong class="SegmentStopover__time">пересадка</strong>&nbsp;
              •
              <span class="airport-code">{{ item["transfer_2_airport"] }}</span>
            </a>
          </div>
          <div v-if="!item['direct_2']" class="Segment">
            <segment_logo :item="item"/>
            <segment_detail :item="item"/>
            <div class="Segment__classe"></div>
            <div class="Segment__schedule way-departure">
              <span class="Segment__time"><span></span></span><span class="Segment__date"></span>
            </div>
            <div class="Segment__location way-departure">
              <span
                class="airport-code">{{ item['transfer_2_airport'] }}</span>
            </div>
            <div class="Segment__schedule way-arrival">
              <span class="Segment__time"><span>{{ timeToFrom(item['flight_2_time_to']) }}</span></span><span
              class="Segment__date">{{
                dateNext(item['return_date'], item['flight_2_duration'], item['flight_2_time_from'])
              }}</span>
            </div>
            <div class="Segment__location way-arrival"><span class="airport-code"> {{ item['origin'] }}</span>
            </div>
            <div class="Segment__travelTime"></div>
            <div class="Segment__path">
              <svg class="Path" width="10" height="39">
                <g id="path">
                  <circle cx="4.5" cy="4.5" r="3.5" stroke-width="2" stroke="#d3d3d3" fill="none"></circle>
                  <line x1="4.5" x2="4.5" y1="9" y2="29.5" stroke-width="2" stroke="#d3d3d3"></line>
                  <circle cx="4.5" cy="34" r="3.5" stroke-width="2" stroke="#d3d3d3" fill="none"></circle>
                </g>
              </svg>
            </div>
          </div>
          <div v-else class="Segment">
            <segment_logo :item="item"/>
            <segment_detail :item="item"/>
            <div class="Segment__classe"></div>
            <div class="Segment__schedule way-departure">
              <span class="Segment__time"><span>{{ timeToFrom(item['flight_2_time_from']) }}</span></span>
              <span class="Segment__date">{{
                  departureDate(item['return_date'])
                }}</span>
            </div>
            <div class="Segment__location way-departure"><span class="airport-code">{{ item['destination'] }}</span>
            </div>
            <div class="Segment__schedule way-arrival">
              <span class="Segment__time"><span>{{ timeToFrom(item['flight_2_time_to']) }}</span></span><span
              class="Segment__date">
              {{ dateNext(item['return_date'], item['flight_2_duration'], item['flight_2_time_from']) }}</span>
            </div>
            <div class="Segment__location way-arrival"><span class="airport-code">{{ item['origin'] }} </span>
            </div>
            <div class="Segment__travelTime"></div>
            <div class="Segment__path">
              <svg class="Path" width="10" height="39">
                <g id="path">
                  <circle cx="4.5" cy="4.5" r="3.5" stroke-width="2" stroke="#d3d3d3" fill="none"></circle>
                  <line x1="4.5" x2="4.5" y1="9" y2="29.5" stroke-width="2" stroke="#d3d3d3"></line>
                  <circle cx="4.5" cy="34" r="3.5" stroke-width="2" stroke="#d3d3d3" fill="none"></circle>
                </g>
              </svg>
            </div>
          </div>
          <div class="BoundDetails__travelTime"><strong>{{ durationTime(item["flight_2_duration"]) }}&nbsp;</strong>
            &nbsp;Время в пути
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<style>
span[data-descr] {
  text-decoration: underline;
  color: blue;
  cursor: help;
}

.invisible {
  display: none;
}

.tooltip {
  position: absolute;
  background-color: yellow;
  border: 1px gray solid;
  border-radius: 3px;
  padding: 3px;
}
</style>
