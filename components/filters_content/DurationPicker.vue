<template>
  <div class="bloc-duration-picker">
    <span v-show="hidden" class="duration-picker-title dropdown-section-title">Длительность</span>
    <div class="duration-picker dropdown-section-list">
      <div class="duration-block dropdown-section-option"
           v-for="(item, index) in durations_out" :key="index"
      >
        <button @click="getDuration(item.type)"
                class="duration-button active"
                :class="{ selected: isActive(item['selected'])}"
        >
          <div v-html="item.icon" style="display: inline"></div>
          <span class="duration-label">{{ item.name }}</span>
        </button>
      </div>

    </div>
  </div>
</template>
<script>
import DURATION from '~/api/duration';
import allFunctions from '~/mixins/all_function.js';

export default {
  name: "DurationPicker",
  mixins: [allFunctions],
  props: {
    hidden: Boolean
  },
  data() {
    return {
      text: '',
      query_duration: {},
      durations: DURATION.getDurationBlock,
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
        }
        if (!obj["selected"]) {
          delete query[value["type"]];
        }
        value = {...obj};
      }
      return value
    })
    this.durations = entries;
    this.$emit('query_duration', query);
  },
  methods: {
    getDuration(duration) {
      this.durations = Object.values(this.durations).map((val) => {
        let obj = {...val};
        if (duration === obj["type"]) {
          this.query_duration[duration] = obj["type"] === duration;
          obj["selected"] = true
          this.text = obj["name"];
        } else {
          obj["selected"] = false
        }
        if (!obj["selected"]) {
          delete this.query_duration[obj["type"]];
        }
        val = {...obj};
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
    updateDuration() {
      this.durations = DURATION.getDurationBlock
      this.text = ''
    },
    emitFilters() {
      this.$emit('query_duration', this.query_duration)
    }
  }
}
</script>

<style>

</style>
