<template>
  <section id="page-container" class="logged order-orderList">
    <div id="member-orders-list">
      <div>
        <div id="orders-container">
          <div></div>
          <div class="next-order-list">
            <div class="single-order">
              <a :href="`/order/${unique}`">
                <img class="sale-picture  " alt="Lindner Hotel Prague Castle"
                     :src="`${base_url}${order.hotel.main_image}`">
                <span class="btn black details past-only">Подробнее</span>
              </a>
              <div class="info-block">
                <div class="info-block-content">
                  <div class="order-status paid">
															<span class="status-label">
																<span>Статус :  </span>
                                <span class="status"
                                      v-show="not_paid">Не оплачено</span>
                    <span
                      class="status"
                      v-show="paid">Оплачено</span>
                    <span class="status"
                          v-show="in_process">В обработке</span>
															</span>
                  </div>
                  <div class="order-desti">{{ order.hotel.country }} / {{ order.hotel.city }}</div>
                  <div class="order-hotel">{{ order.hotel.name }}</div>
                  <div class="order-dates">
                    <i class="icon-calendar2andmore"></i>{{ start_date }} - {{ end_date }}
                  </div>
                  <a :href="`/order/${unique}`" class="btn black details next-only">Подробнее</a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="find-my-order">
          <div>
            <button
              @click="getOrders"
              type="button" class="button button--secondary cta--find-my-order">Найти другое бронирование
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import {addDays, format} from "date-fns";
import ruLocale from "date-fns/locale/ru";

export default {
  name: 'request',
  layout: 'Orders',
  data() {
    return {
      base_url: process.env.BASE_URL
    }
  },
  computed: {
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
          let data = format(date, 'dd MMM yyyy', {locale: ruLocale});
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
          let data = format(date, 'dd MMM yyyy', {locale: ruLocale});
          return data.charAt(0).toUpperCase() + data.slice(1);
        } catch (e) {
          // this.$nuxt.$router.push(`/404`);
        }
      }
    }
  },
  methods: {
    getOrders() {
      this.$nuxt.$router.push(`/orders-search`);
    }
  },
  mounted() {
    if (this.$route.name === 'booking-id-step-number') {
      document.body.classList.add('SmartSummary', 'SmartBP', 'BPStep-1', 'useTransportV2', 'useBPOptim')
    }
  },
  async asyncData({params, store}) {
    const unique = params.unique;
    let order = {};
    await store.dispatch('setBookingDetails', unique);
    order = store.state.booking_details;
    return {order, unique};
  },
}
</script>
