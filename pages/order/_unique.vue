<template>
  <section id="page-container" class="logged  order-orderDetails">
    <div class="page-center-order">
      <section id="wrapper_container">
        <div id="aside-menu"></div>
        <main class="page-col-right">
          <div id="member-orders-list">
            <order-details :order="order" :unique="unique"/>
          </div>
        </main>
      </section>
    </div>
    <div id="hubContainer"></div>
  </section>
</template>

<script>
import OrderDetails from "../../components/order/OrderDetails.vue";

export default {
  name: 'request',
  components: {OrderDetails},
  layout: 'Orders',
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
