<template>
  <div class="stay-type-picker clearfix">
    <span v-show="hidden" class="stay-type-title dropdown-section-title">Тип отдыха</span>
    <div class="stay-type-list dropdown-section-list">
			  <span v-for="(item, index) in durations_out" :key="index"
              :class="item.class_button"
              class="dropdown-section-option active"
        >
			  	<button
            @click="getDuration(item.type)"
            :class="{ selected: isActive(item['selected'])}"
            class="stay-type-button ">
            <div v-html="item.icon" style="display:inline"></div>
            <span class="stay-type-label">{{ item.name }}</span></button>
			  </span>
    </div>
  </div>
</template>
<script>
import DURATION from '~/api/duration';
import allFunctions from '~/mixins/all_function.js';

export default {
  name: "StayPicker",
  mixins: [allFunctions],
  props: {
    hidden: Boolean
  },
  data() {
    return {
      query_duration: {},
      durations: DURATION.getStayBlock,
      text: '',
    }
  },
  computed: {
    durations_out() {
      return this.durations
    }
  },
  mounted() {
    const query = this.queryParams;
    let get_key = Object.keys(query);
    let entries = this.durations.map((value, key) => {
      for (const key in get_key) {
        let obj = {...value};
        if (get_key[key] === value["type"]) {
          obj["selected"] = true
        } else {
          obj["selected"] = false
        }
        if (!obj["selected"]) {
          delete query[value["type"]];
        }
        value = {...obj};
      }
      return value
    })
    this.durations = entries;
    this.$emit('query_stay', query);
  },
  methods: {
    updateStay() {
      this.durations = Object.values(this.durations).map((val) => {
        val["selected"] = false
        return val;
      });
    },
    getDuration(duration) {
      this.durations = Object.values(this.durations).map((val) => {
        if (duration === val["type"]) {
          this.query_duration[duration] = val["type"] === duration;
          val["selected"] = true
          this.text = val["name"];
        } else {
          val["selected"] = false
        }
        if (!val["selected"]) {
          delete this.query_duration[val["type"]];
        }
        return val;
      });
      this.emitFilters();
    },
    updateText() {
      this.durations = Object.values(this.durations).map((val) => {
        if (val["selected"] === true) {
          this.text = val["name"];
        }
        return val;
      });
      this.emitFilters();
    },
    isActive(active) {
      return active;
    },
    emitFilters() {
      this.$emit('query_stay', this.query_duration)
    },
  },
}
</script>

<style>

</style>
