<script>
export default {
  name: "segment_logo",
  props: ['item'],
  data() {
    return {
      base_url: process.env.BASE_URL
    }
  }
}
</script>

<template>
  <div class="Segment__logo">
    <img :src="base_url + item['airline_info']['logo']"
         :alt="item['airline_info']['name']" class="Segment__img">
  </div>
</template>

<style scoped>

</style>
