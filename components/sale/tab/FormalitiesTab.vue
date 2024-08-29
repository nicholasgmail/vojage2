<script>
export default {
  name: "FormalitiesTab",
  props: ["formalities"],
  mounted() {
  }
}
</script>

<template>
  <div id="tab-content-formalities"
       class="tab-content formalities">
    <div class="paragraphs">
      <div class="clearfix paragraph-formality">
        <h4>О стране и курорте <em>—</em></h4>
        <div class="p">
          <div
            v-html="formalities"
            class="block"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
