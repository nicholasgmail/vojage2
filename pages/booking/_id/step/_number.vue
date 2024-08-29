<template>
  <div>
    <request-book :step="step" :id="id"/>
  </div>
</template>

<script>
import RequestBook from "../../../../components/booking/RequestBook.vue";

export default {
  components: {RequestBook},
  name: 'request',
  layout: 'Booking',
  data() {
    return {
      number: 1,
    }
  },
  mounted() {
    if (this.$route.name === 'booking-id-step-number') {
      document.body.classList.add('SmartSummary', 'SmartBP', 'BPStep-1', 'useTransportV2', 'useBPOptim')
    }
    this.number = this.$store.state.step;
  },
  async asyncData({params, store, $cookies, redirect}) {
    let id = params.id;
    let tour_id = $cookies.get('tour_id');
    if (!tour_id) return redirect('/404');
    if (id !== tour_id) {
      id = tour_id;
      params.id = id;
    }
    store.state.step = params.number;
    let step = {};
    await store.dispatch('setHotelTourId', {"tour_id": id});
    step = store.state.tour_get;
    return {step, id};
  },
}
</script>
