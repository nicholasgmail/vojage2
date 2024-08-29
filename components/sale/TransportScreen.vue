<script>
export default {
  name: "TransportScreen",
  // props: ["dcwp"],
  data() {
    return {
      dc: {}
    }
  },
  computed: {
    transport_all: {
      get() {
        return this.dc;
      },
      set(value) {
        this.dc = {...value};
      }
    },
  },
  methods: {
    selected(selected) {
      for (const key in this.dc) {
        if (key == selected) {
          this.dc[key]["selected"] = true;
          this.$emit('city', this.dc[key]["city"]);
        } else {
          if (this.dc[key]["selected"])
            this.dc[key]["selected"] = false;
        }
      }
      this.transport_all = this.dc;
    }
  }
}
</script>

<template>
  <div class="transport-screen">
    <div
      v-for="(item, key) in transport_all"
      @click="selected(key)"
      :class="{'transport-selected': item['selected']}"
      class="transport-item"><i class="line-icon-plane"></i>
      <div class="modal-option transport-option">
        <div class="city">{{ item["city"] }}</div>
        <div class="price-block">от <span
          :class="{'best': item['selected']}"
          class="price">₽{{ item["price"] }}</span></div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
