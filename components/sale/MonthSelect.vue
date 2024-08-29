<script>
import {format} from "date-fns";
import ruLocale from "date-fns/locale/ru";

export default {
  name: "MonthSelect",
  props: ["dwp", "to"],
  data() {
    return {
      mt: {},
      month: [],
      to_out: this.to ?? '',
      currentSlide: 1,
      intervalId: null,
      show_slick: false,
      first_mt: true,
      scrollPosition: 0,
      vlt: 0,
      cl_hht: [],
      slickOptions: {
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        dots: true,
      },
      settings: {
        "dots": false,
        "arrows": true,
        "focusOnSelect": true,
        "centerMode": false,
        "infinite": false,
        "slidesToShow": 3,
        "slidesToScroll": 1,
        "touchThreshold": 5
      }
    }
  },
  created() {
    this.mountDwp();
  },
  mounted() {
    this.$nextTick(() => {
      $(document).ready(() => {
        $("#monthSlick .slick-track").addClass("months-list")
      })
      let container = document.getElementById("dateListContainer" + this.to_out);
      container.addEventListener('scroll', this.handleScroll)
      container.addEventListener('touchstart', this.handleScroll);
      //container.addEventListener('touchmove', this.handleScroll);
    })
  },
  beforeDestroy() {
    let container = document.getElementById("dateListContainer" + this.to_out);
    container.removeEventListener('scroll', this.handleScroll);
    container.removeEventListener('touchstart', this.handleScroll);
  },
  computed: {
    months: {
      get() {
        return this.mt;
      },
      set(value) {
        this.mt = {...value};
      }
    },
  },
  methods: {
    handleScroll(event) {
      let container = event.target;
      if (!container.classList.contains('date-list'))
        container = container.closest('.date-list');
      const childHeights = Array.from(container.childNodes)
        .filter(node => node.nodeType === Node.ELEMENT_NODE)
        .map(node => node.offsetTop);
      if (childHeights.length === Object.entries(this.months).length && this.cl_hht.length < 1) {
        this.cl_hht = childHeights;
      }
      let sc_tp = container.scrollTop;
      if (sc_tp <= 0)
        sc_tp = this.scrollPosition;
      let selected = this.fndClsNb(this.cl_hht, sc_tp)
      for (const key in this.mt) {
        if (key == selected && key >= 0 || selected < 0 && key == 0) {
          this.mt[key]["selected"] = true;
          if (this.vlt !== selected && this.vlt > selected) {
            this.vlt = selected < 0 ? 0 : selected;
            this.$refs.slick.prev();
          }
          if (this.vlt !== selected && this.vlt < selected) {
            this.vlt = selected < 0 ? 0 : selected;
            this.$refs.slick.next();
          }
        } else {
          if (this.mt[key]["selected"])
            this.mt[key]["selected"] = false;
        }
      }
      this.months = this.mt;
    },
    fndClsNb(arr, num) {
      arr.sort((a, b) => a - b);

      for (let i = 0; i < arr.length; i++) {
        if (arr[i] >= num) {
          return i - 1;
        }
      }

      return arr.length - 1;
    },
    mountDwp() {
      for (const key in this.dwp) {
        const dateArray = key.split(" - ");
        const date1 = new Date(dateArray[0]);
        const arr = format(date1, 'eeeeee dd MMM', {locale: ruLocale}).split(" ");//.slice(0, -1)
        const textDate = format(date1, 'LLLL yyyy', {locale: ruLocale});
        const foundPerson = this.month.find(month => month.name === arr[2]);
        const arrId = format(date1, 'LLLLyyyy');
        if (!foundPerson) {
          if (this.first_mt) {
            this.month.push({
              'name': arr[2],
              'get': arrId,
              'years': format(date1, 'yyyy'),
              "selected": true
            })
            this.first_mt = false;
          } else {
            this.month.push({
              'name': arr[2],
              'get': arrId,
              'years': format(date1, 'yyyy')
            })
          }
        }
      }
      this.mt = {...this.month};

    },
    selected(selected) {
      let container = document.getElementById("dateListContainer" + this.to_out);
      if (this.to_out == 'mobile') {
        container = document.getElementById("listContainer");
      }
      for (const key in this.mt) {
        if (key == selected) {
          this.mt[key]["selected"] = true;
          this.$scrollTo("#" + this.mt[key]["get"] + this.to_out, {
            container: container,
          });
          this.$emit('years', this.mt[key]["years"])
        } else {
          if (this.mt[key]["selected"])
            this.mt[key]["selected"] = false;
        }
      }
      this.months = this.mt;
    }
  },
}
</script>

<template>
  <div class="react-calendar">
    <VueSlickCarousel
      id="monthSlick"
      ref="slick"
      v-bind="settings">
      <div
        v-for="(item, index) in months"
        :key="index"
        :class="{'selected': item['selected']}"
        @click="selected(index)"
        class="month slides">
        <div v-if="item.name.indexOf('.') == -1">
          {{ item.name === 'мая' ? 'май' : item.name }}
        </div>
        <div v-else>
          {{ item.name === 'мая' ? 'май' : item.name.slice(0, -1) }}
        </div>
      </div>
      <template #prevArrow="">
        <div class="month-nav">
          <i class="icon-arrow-left-t1"></i>
        </div>
      </template>
      <template #nextArrow="">
        <div class="month-nav">
          <i class="icon-arrow-right-t1"></i>
        </div>
      </template>
    </VueSlickCarousel>
  </div>
</template>

<style scoped lang="scss">
@media only screen and (max-width: 500px) {
  .slick-next::before, .slick-prev::before {
    margin-left: 0;
  }
}

.slick-slider.slick-initialized {
  width: 85%;
  margin: 0 auto;
}

.month {
  width: 20%;
  padding-bottom: 5px;
  text-align: center;
  text-transform: uppercase;
  font-weight: 700;
  font-size: 11px;

  &.selected {
    background: inherit;
    border-bottom: 2px solid #bd1343;
    color: #000;
  }
}

.slick-arrow {
  &.slick-prev {
    &::before {
      content: "\E60B";
      font-family: vpgseticon;
      color: rgba(0, 0, 0, .5);
    }
  }

  &.slick-next {
    &::before {
      content: "\E60A";
      font-family: vpgseticon;
      color: rgba(0, 0, 0, .5);
    }
  }
}
</style>
