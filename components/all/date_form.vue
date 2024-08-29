<script>
import API from '~/api/info_account';

export default {
  name: "date_form",
  props: ['name', 'index_key'],
  data() {
    return {
      month: '',
      day: '',
      year: '',
      months: [...API.getInfoAccount]
    }
  },
  methods: {
    pushDate() {
      let date = ''
      if (this.day.length === 1) {
        date = `${this.year}-${this.month}-0${this.day}`;
      } else {
        date = `${this.year}-${this.month}-${this.day}`;
      }
      if (this.$validator.isDate(date, 'yyyy-MM-dd')) {
        this.$emit('push_date', {'date': date, 'key': this.index_key});
      } else {
        this.$emit('push_date', false);
      }
    }
  }
}
</script>

<template>
  <div class="birthdate tableForm datepicker">
    <span class="label">{{ name }}</span>
    <div class="FormInput day tableForm">
      <div>
        <div class="day tableForm">
          <span class="label"></span>
          <div class="FormInput">
            <input type="text"
                   inputmode="numeric"
                   pattern="[0-9]*"
                   v-mask="['#', '##']"
                   placeholder="День"
                   @input="pushDate"
                   v-model="day">
          </div>
        </div>
      </div>
    </div>
    <div class="FormInput">
      <div>
        <div>
          <div class="month tableForm">
            <span class="label"></span>
            <div class="FormInput">
              <select
                @input="pushDate"
                v-model="month">
                <option v-for="item in months"
                        :disabled="item.disabled"
                        :value="item.number"
                        :selected="item.selected">{{ item.name }}
                </option>
              </select>
            </div>
          </div>
        </div>
        <div></div>
      </div>
    </div>
    <div class="FormInput year tableForm">
      <div>
        <div class="year tableForm">
          <span class="label"></span>
          <div class="FormInput">
            <input type="text" inputmode="numeric"
                   pattern="[0-9]*" placeholder="Год"
                   @input="pushDate"
                   v-mask="'####'"
                   v-model="year">
          </div>
        </div>
        <div class="FormError"></div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
