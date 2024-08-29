<script>
export default {
  name: "segment_detail",
  props: ['item']
}
</script>

<template>
  <div class="Segment__detail SegmentInfo">
    <span class="SegmentInfo__companyName">{{ item['airline_info']['name'] }}</span>&nbsp; - &nbsp;<span
    class="SegmentInfo__transportNumber">{{ item['airline_info']['code'] }} {{ item['flight_number'] }}</span>
  </div>
</template>

<style scoped>

</style>
