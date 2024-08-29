<template>
  <sale :sale="sale" :id_sale="id"></sale>
</template>
<script>

import Sale from "~/components/Sale.vue";

export default {
  name: "saleId",
  components: {Sale},
  layout: "Dynamic",
  head() {
    return {
      title: `Туры в отель ${this.sale.name} от туроператора по супер ценам`,
      meta: [
        {
          hid: 'description', name: 'description', content: `${this.sale.city}/${this.sale.country},
        ${this.sale.name} от туроператора по супер ценам. ${this.sale.sale_description}`
        },
        {name: 'keywords', content: `${this.sale.city},${this.sale.country},${this.sale.name}`}
      ]
    }
  },
  mounted() {
    if (this.$route.name === "sale-id-slug") {
      document.body.classList.add('perso', 'babyLogin', 'sale-page');
    }
  },
  async asyncData({params, store}) {
    const id = params.id;
    // await store.dispatch('setHotelDetail', id);
    const sale = store.state.sale;
    return {sale, id};
  },
  methods: {}
}
</script>
<style>
@media (max-width: 575.98px) {
  .block-desktop {
    display: none !important;
  }
}
</style>
