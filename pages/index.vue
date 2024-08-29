<template>
  <all-hotels/>
</template>

<script>
import AllHotels from "../components/AllHotels.vue";


export default {
  components: {AllHotels},
  layout: 'Default',
  name: 'Index',
  mounted() {
    if (this.$route.name === '/') {
      document.body.classList.remove('perso', 'babyLogin', 'map-open');
    }
  },
  methods: {},
}
</script>
