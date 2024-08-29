<template>
  <div class="capacity-picker clearfix">
    <span v-show="hidden" class="capacity-title dropdown-section-title">Вместимость</span>
    <div class="capacity-list dropdown-section-list" style="width: 100%;">
      <div class="explanation">Какое желаемое количество
        человек в номере?
      </div>
      <span class="dropdown-section-option adults-capacity">Взрослые
																				<span class="number-picker">
																					<button
                                            @click="decrement('adults')"
                                            class="decrease disabled"> - </button>
																					<span class="value">{{ adults }}</span>
																					<button
                                            @click="increment('adults')"
                                            class="increase "> + </button>
																				</span>
																			</span>
      <span class="dropdown-section-option kids-capacity">Дети (от 2 до 16 лет)
																				<span class="number-picker">
																					<button
                                            @click="decrement('children')"
                                            class="decrease disabled"> - </button>
																					<span class="value">{{ children }}</span>
																					<button
                                            @click="increment('children')"
                                            class="increase "> + </button>
																				</span>
																			</span>
    </div>
  </div>
</template>
<script>
export default {
  name: "CapacityPicker",
  props: {
    hidden: Boolean
  },
  data() {
    return {
      adults: 2,
      children: 0,
      query: {},
      text: '',
      all: 0,
    }
  },
  methods: {
    increment(person) {
      switch (person) {
        case 'children':
          if (this.children < 4) {
            this.children++;
            this.query = {
              ...this.query,
              ...{max_room_capacity_children: this.children},
            }
          }
          break;
        case 'adults':
          if (this.adults < 4) {
            this.adults++;
            this.query = {
              ...this.query,
              ...{max_room_capacity_adults: this.adults},
            }
          }
          break;
      }
      if (this.adults > 0 || this.children > 0) {
        this.all = this.adults + this.children;
        this.getText();
        this.emitFilters();
      }
    },
    decrement(person) {
      switch (person) {
        case 'children':
          if (this.children > 0)
            this.children--;
          if (this.children > 0) {
            this.query = {
              ...this.query,
              ...{max_room_capacity_children: this.children},
            }
          }
          break;
        case 'adults':
          if (this.adults > 1)
            this.adults--;
          if (this.adults > 0) {
            this.query = {
              ...this.query,
              ...{max_room_capacity_adults: this.adults},
            }
          }
          break;
      }
      if (this.adults > 0 || this.children > 0) {
        this.all = this.adults + this.children;
        this.getText();
        this.emitFilters();
      }
    },
    updateCapacity() {
      this.adults = 2;
      this.children = 0;
      this.all = 0;
      this.text = '';
    },
    getText() {
      if (this.adults > 0 && this.children <= 0) {
        this.text = `${this.adults}/взрослых`;
      } else if (this.adults > 0 && this.children > 0) {
        this.text = `${this.adults}/взрослых ${this.children}/детских`;
      } else if (this.adults <= 0 && this.children > 0) {
        this.text = `${this.children}/детских`;
      } else {
        this.text = '';
      }
    },
    emitFilters() {
      this.$emit('query_capacity', this.query)
    }
  }
}
</script>
