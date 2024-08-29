<script>
import {format} from 'date-fns';
import ruLocale from 'date-fns/locale/ru';
import CALENDAR from '~/api/calendar';

export default {
  name: "calendar",
  data() {
    return {
      currentDate: new Date(),
      daysOfWeek: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'],
      calendar: [],
      currentDayOfWeek: new Date().getDay(),
      fd: {},
      fd_out: false,
      tab_cal: false,
      crfl: ''
    };
  },
  computed: {
    currentMonthName() {
      return format(this.currentDate, 'LLLL', {locale: ruLocale});
    },
    currentYear() {
      return format(this.currentDate, 'yyyy', {locale: ruLocale});
    },
    flexible_day: {
      get() {
        return this.fd;
      },
      set(id) {
        this.getCountDay()
        this.fd = this.fd.map(item => {
          item["active"] = false;
          if (item.id === id)
            item["active"] = true;
          return item;
        })
        return this.fd;
      }
    },
    current_flexible: {
      get() {
        if (this.fd.length > 0) {
          let one = this.fd.find(item => item.active === true);
          if (one)
            return one["name"];
          return 'Гибкие даты';
        }
      }
    }
  },
  methods: {
    getDaysText(days) {
      let dayString = 'день';
      if (typeof days === "number") {
        if (days >= 5 && days <= 20) {
          dayString = 'дней';
        } else {
          const lastDigit = days % 10;

          if (lastDigit === 1) {
            dayString = 'день';
          } else if (lastDigit >= 2 && lastDigit <= 4) {
            dayString = 'дня';
          } else {
            dayString = 'дней';
          }
        }
        return `± ${days} ${dayString}`;
      }
      return days;
    },
    tabCalendar() {
      this.tab_cal = !this.tab_cal;
    },
    getCountDay() {
      this.fd_out = !this.fd_out;
    },
    shuffleArray(array) {
      const newArray = Object.values(array).slice();
      for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
      }
      return Object.values(newArray);
    },
    dayDay(day) {
      return Number(format(this.currentDate, 'd')) > Number(format(day, 'd'))
        && this.currentDate.getMonth() === new Date().getMonth();
    },
    clickNewMonth() {
      this.currentDate = this.getNextMonth(this.currentDate);
    },
    clickBackMonth() {
      this.currentDate = this.getReturnMonth(this.currentDate);
    },
    getNextMonth(currentDate) {
      const nextMonthDate = new Date(currentDate);
      nextMonthDate.setMonth(currentDate.getMonth() + 1);
      if (nextMonthDate.getMonth() === 0) {
        nextMonthDate.setFullYear(currentDate.getFullYear() + 1);
      }
      return nextMonthDate;
    },
    getReturnMonth(currentDate) {
      const nextMonthDate = new Date(currentDate);
      nextMonthDate.setMonth(currentDate.getMonth() - 1);
      if (nextMonthDate.getMonth() === 0) {
        nextMonthDate.setFullYear(currentDate.getFullYear() - 1);
      }
      return nextMonthDate;
    },
    async updateCalendat() {
      await this.$store.dispatch('setHotelList');
      this.$store.state.hotel = this.shuffleArray(this.$store.state.hotel);
      this.$parent.active = false;
      this.$parent.calendar = true;
      this.$parent.dropdown_active = 'false';
      this.$parent.text_calendar = 'Любое время в этом месяце';
      this.$parent.openSearch('calendar', 'Любое время в этом месяце')
      let fr_date = document.getElementById('calendarDate');
      fr_date.innerHTML = `<i class="icon-calendar-empty"></i>Любое время в этом месяце`
      let fr_date_close = document.getElementById('calendarDateClose');
      fr_date_close.style.display = 'block';
    },
    getDateOut(date) {
      return format(date, 'EEEE, d MMMM yyyy', {locale: ruLocale});
    },
    generateCalendar() {
      const startDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), 1);
      const endDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1, 0);

      let currentDate = startDate;
      let week = [];
      let calendar = [];

      while (currentDate <= endDate) {
        week.push({day: format(currentDate, 'd'), date: currentDate});
        if (currentDate.getDay() === 6) {
          let i = 7 - week.length;
          if (i > 0) {
            let new_week = [];
            while (i) {
              new_week.push({
                date: 0,
                day: 0
              });
              i--;
            }
            week = [...new_week, ...week];
          }
          calendar.push(week);
          week = [];
        }
        currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 1);
      }
      if (week.length > 0) {
        calendar.push(week);
      }
      this.calendar = calendar;
    },
    async selectDate(date) {
      await this.$store.dispatch('setHotelList');
      this.$store.state.hotel = this.shuffleArray(this.$store.state.hotel);
      this.$parent.active = false;
      this.$parent.calendar = true;
      this.$parent.dropdown_active = 'false';
      this.$parent.text_calendar = date;
      this.$parent.openSearch('calendar', this.getDateOut(date))

      const formattedDate = format(date, 'dd/MM/yyyy', {awareOfUnicodeTokens: true});
      const formattedDateMob = format(date, 'dd MMM yyyy', {locale: ruLocale});

      let fr_date = document.getElementById('calendarDate');
      let mn_mobile = document.getElementById('menuMob2');
      fr_date.innerHTML = `<i class="icon-calendar-empty"></i>${formattedDate} ${this.crfl}`
      if (mn_mobile)
        mn_mobile.innerHTML = `${formattedDateMob} ${this.crfl}`
      let fr_date_close = document.getElementById('calendarDateClose');
      fr_date_close.style.display = 'block';
    },
    async selectDateAll(date) {
      await this.$store.dispatch('setHotelList');
      this.$store.state.hotel = this.shuffleArray(this.$store.state.hotel);
      this.$parent.active = false;
      this.$parent.calendar = true;
      this.$parent.dropdown_active = 'false';
      this.$parent.text_calendar = date;
      this.$parent.openSearch('calendar', date)

      let fr_date = document.getElementById('calendarDate');
      fr_date.innerHTML = `<i class="icon-calendar-empty"></i>${date}`
      let fr_date_close = document.getElementById('calendarDateClose');
      fr_date_close.style.display = 'block';
    },
    flexibleDay(flex) {
      this.flexible_day = flex.id
      this.crfl = flex.name.replace("Гибкий", "");
    }
  },
  watch: {
    currentDate() {
      this.generateCalendar();
    },
  },
  mounted() {
    let getFD = CALENDAR.getFlexibleDay;
    this.fd = getFD.map(item => {
      item["name"] = this.getDaysText(item["name"]);
      return item;
    });
    this.generateCalendar();
  },
}
</script>

<template>
  <div class="departureDate">
    <ul class="only-desktop clearfix nav nav-tabs">
      <li
        :class="{'active': !this.tab_cal}"
        @click="tabCalendar"
        role="presentation" class="tab-calendar">
        <a id="dateFilterCalendarTab" role="button">Календарь</a>
      </li>
      <li
        @click="tabCalendar"
        :class="{'active': this.tab_cal}"
        role="presentation" class="tab-time-year">
        <a id="dateFilterPeriodTab" role="button">Время
          года</a>
      </li>
    </ul>
    <div
      :class="{'hidden-desktop': this.tab_cal}"
      class="date-picker">
      <div class="date-flexibility">
        <div class="dropdown btn-group">
          <button id="flexibility" role="button"
                  @click="getCountDay"
                  aria-haspopup="true" aria-expanded="false"
                  type="button"
                  class="dropdown-toggle btn btn-default">
            {{ current_flexible }} <span class="caret"></span>
          </button>
          <ul
            v-show="fd_out"
            role="menu" class="dropdown-menu"
            aria-labelledby="flexibility">
            <li v-for="item in flexible_day" role="presentation"
                :class="{'active': item.active}"
                @click="flexibleDay(item)"
                class="flexibility-label">
              <a role="menuitem" tabindex="-1">{{ item.name }}</a>
            </li>
          </ul>
        </div>
      </div>
      <div class="DayPicker DayPicker--horizontal">
        <div>
          <div class="DayPicker__week-headers"
               aria-hidden="true" role="presentation">
            <div class="DayPicker__week-header">
              <ul class="day_center">
                <li v-for="day in daysOfWeek" :key="day"><small>{{ day }}</small></li>
              </ul>
            </div>
          </div>
          <div class="DayPicker__focus-region" role="region"
               tabindex="-1">
            <div class="DayPickerNavigation DayPickerNavigation--horizontal">
              <button type="button"
                      @click="clickBackMonth"
                      aria-label="Move backward to switch to the previous month"
                      class="DayPickerNavigation__prev DayPickerNavigation__prev--default">
                <svg viewBox="0 0 1000 1000">
                  <path
                    d="M336.2 274.5l-210.1 210h805.4c13 0 23 10 23 23s-10 23-23 23H126.1l210.1 210.1c11 11 11 21 0 32-5 5-10 7-16 7s-11-2-16-7l-249.1-249c-11-11-11-21 0-32l249.1-249.1c21-21.1 53 10.9 32 32z"></path>
                </svg>
              </button>
              <button type="button"
                      @click="clickNewMonth"
                      aria-label="Move forward to switch to the next month"
                      class="DayPickerNavigation__next DayPickerNavigation__next--default">
                <svg viewBox="0 0 1000 1000">
                  <path
                    d="M694.4 242.4l249.1 249.1c11 11 11 21 0 32L694.4 772.7c-5 5-10 7-16 7s-11-2-16-7c-11-11-11-21 0-32l210.1-210.1H67.1c-13 0-23-10-23-23s10-23 23-23h805.4L662.4 274.5c-21-21.1 11-53.1 32-32.1z"></path>
                </svg>
              </button>
            </div>
            <div class="transition-container transition-container--horizontal">
              <div class="CalendarMonthGrid CalendarMonthGrid--horizontal">
                <div class="CalendarMonth CalendarMonth--horizontal"
                     data-visible="false">
                </div>
                <div class="CalendarMonth CalendarMonth--horizontal"
                     data-visible="true">
                  <table>
                    <caption
                      class="CalendarMonth__caption js-CalendarMonth__caption">
                      <strong>{{ currentMonthName }} {{ currentYear }}</strong>
                    </caption>
                    <tbody class="js-CalendarMonth__grid">
                    <tr v-for="(week, index) in calendar" :key="index">
                      <td
                        class="CalendarDay"
                        :class="{'CalendarDay--blocked-out-of-range': dayDay(day.date) }"
                        v-for="(day, index) in week" :key="index" @click="selectDate(day.date)">
                        <button type="button"
                                v-if="day.day !== 0"
                                class="CalendarDay__button"
                                :aria-label="getDateOut(day.date)"
                                tabindex="0">{{ day.day }}
                        </button>
                      </td>
                    </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div>
                <button
                  class="DayPickerKeyboardShortcuts__show DayPickerKeyboardShortcuts__show--bottom-right"
                  type="button"
                  aria-label="Open the keyboard shortcuts panel">
                  <span class="DayPickerKeyboardShortcuts__show_span">?</span>
                </button>
              </div>
            </div>

            <div>
              <button
                class="DayPickerKeyboardShortcuts__show DayPickerKeyboardShortcuts__show--bottom-right"
                type="button"
                aria-label="Open the keyboard shortcuts panel">
                <span class="DayPickerKeyboardShortcuts__show_span">?</span>
              </button>
            </div>
          </div>
        </div>
        <button
          @click="updateCalendat"
          class="date-anyday date-anyday_calendar">Любое время в этом месяце
        </button>
        <div class="buttons sales">
        </div>
      </div>
    </div>
    <div
      :class="{'hidden-desktop': !this.tab_cal}"
      class="period-picker">
      <div class="dropdown-section-title">Время отправления</div>
      <li @click="selectDateAll('Летний отдых')" role="presentation"
          class="period-label">
        <a role="menuitem" tabindex="-1">Летний
          отдых</a>
      </li>
      <li @click="selectDateAll('Зимний отдых')" role="presentation"
          class="period-label">
        <a role="menuitem" tabindex="-1">Зимний отдых</a>
      </li>
      <li @click="selectDateAll('Весенний отдых')" role="presentation"
          class="period-label">
        <a role="menuitem" tabindex="-1">Весенний отдых</a>
      </li>
      <li @click="selectDateAll('Осенний отдых')" role="presentation"
          class="period-label">
        <a role="menuitem" tabindex="-1">Осенний отдых</a>
      </li>
      <li @click="selectDateAll('Новый год и Рождество')" role="presentation"
          class="period-label">
        <a role="menuitem" tabindex="-1">Новый год и Рождество</a>
      </li>
      <li @click="selectDateAll('Пасха')" role="presentation"
          class="period-label"><a
        role="menuitem" tabindex="-1">Пасха</a>
      </li>
    </div>
  </div>
</template>

<style scoped>
.day_center {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.pink_valid_block {
  display: none;
}

.period-label {
  cursor: pointer;
}

@media (max-width: 575.98px) {
  .period-picker {
    display: none;
  }

  .date-anyday_calendar {
    display: none;
  }

  .pink_valid_block {
    display: block;
  }
}
</style>
