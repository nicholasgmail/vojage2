import {mapActions} from "vuex";
import DURATION from '~/api/duration';
import {format} from 'date-fns';
import ruLocale from 'date-fns/locale/ru';

export default {
  methods: {
    ...mapActions([
      "setDestinations",
      'setHotelCount',
      'setHotelList',
      'setQueryRoute']),
    getDescription(type, text) {
      switch (type) {
        case 'destination':
          return this.text_destination ? this.text_destination : text;
        case 'calendar':
          // return this.text_calendar ? format(this.text_calendar, 'dd MMM yyyy', {locale: ruLocale}) : text;
          return text;
        case 'plane':
          return this.text_city ? this.text_city : text;
        case 'duration':
          return this.text_duration ? this.text_duration : text;
        case 'budget':
          return this.text_range ? this.text_range : text;
        case 'map':
          return this.text_stay ? this.text_stay : text;
        case 'capacity':
          return this.text_capacity ? this.text_capacity : text;
        default:
          return text;
      }
    },
    handleClose(open) {
      this.active = open;
      switch (open) {
        case 'search':
          this.setDestinations();
          break;
      }
    },
    activated(active) {
      return active ?? false;
    },
    openSearch(search, title) {
      this.$nextTick(() => {
          this.all_close = !this.all_close;
          this.button_close = !this.button_close;
          this.name = title;
          switch (search) {
            case 'destination':
              this.destination = !this.destination;
              break;
            case 'calendar':
              this.calendar = !this.calendar;
              break;
            case 'plane':
              this.plane = !this.plane;
              break;
            case 'duration':
              this.duration = !this.duration;
              break;
            case 'budget':
              this.budget = !this.budget;
              break;
            case 'map':
              this.map = !this.map;
              break;
            case 'capacity':
              this.capacity = !this.capacity;
              this.$refs.capacityPicker.getText();
              break;
            default:
              this.destination = false;
              this.calendar = false;
              this.plane = false;
              this.duration = false;
              this.budget = false;
              this.map = false;
              this.capacity = false;
              this.name = 'Поиск';
          }
          let city_length = 0;
          if (this.$refs.cityPicker) {
            city_length = Object.values(this.$refs.cityPicker.$data.query)
              .filter((value) => {
                return value[1]['selected'];
              }).length;
          }
          let durations_length = 0;
          if (this.$refs.durationPicker) {
            durations_length = Object.values(this.$refs.durationPicker.$data.durations)
              .filter((value) => {
                return value['selected'];
              }).length;
          }
          let map_length = 0;
          if (this.$refs.stayPicker) {
            map_length = Object.values(this.$refs.stayPicker.$data.durations)
              .filter((value) => {
                return value['selected'];
              }).length;
          }
          let range_price = 0;
          if (this.$refs.rangePicker) {
            if (this.$refs.rangePicker.$data.closestNumber) {
              range_price = this.$refs.rangePicker.$data.closestNumber;
              this.text_range = this.$refs.rangePicker.$data.text;
            }
          }
          if (this.$refs.stayPicker) {
            this.text_stay = this.$refs.stayPicker.$data.text;
          }
          let all_people = 0;
          if (this.$refs.capacityPicker) {
            this.text_capacity = this.$refs.capacityPicker.$data.text;
            all_people = this.$refs.capacityPicker.$data.all;
          }
          if (this.$refs.durationPicker) {
            this.text_duration = this.$refs.durationPicker.$data.text;
          }
          if (this.$refs.cityPicker) {
            this.text_city = this.$refs.cityPicker.$data.text;
          }
          if (this.$refs.searchFilter) {
            this.text_destination = this.$refs.searchFilter.$data.text;
          }
          this.menus = Object.values(this.menus).map((value, key) => {
            if (value["type"] === search && city_length) {
              value['active'] = "activated"
            } else if (value["type"] === search && durations_length) {
              value['active'] = "activated"
            } else if (value["type"] === search) {
              value['active'] = "activated"
            } else if (value["type"] === search && map_length) {
              value['active'] = "activated"
            } else if (value["type"] === search && range_price > 0) {
              value['active'] = "activated"
            } else if (value["type"] === search && all_people > 0) {
              value['active'] = "activated"
            } else if (value["type"] === search) {
              value['active'] = "activated"
            }
            return value
          })
        }
      )
      this.destination = false;
    },
    queryLength(search) {
      switch (search) {
        case 'destination':
          if (this.query_duration.length > 0)
            return true;
          break;
        case 'calendar':
          return false;
          break;
        case 'plane':
          if (this.query_city.length > 0)
            return true;
          return false;
        case 'duration':
          if (this.query_duration.length > 0)
            return true;
          break;
        case 'budget':
          return false;
          break;
        case 'map':
          return false;
          break;
        case 'capacity':
          return false;
          break;
      }
    }
    ,
    clearQuery(clear) {
      switch (clear) {
        case 'destination':
          if (this.$refs.searchFilter)
            this.$refs.searchFilter.updateSearch();
          this.text_destination = '';
          this.search_list = '';
          this.getDescription(clear, "В любом месте");
          delete this.query.destination;
          break;
        case 'calendar':
          this.text_calendar = "Любое время"
          let mn_mobile = document.getElementById('menuMob2');
          if (mn_mobile)
            mn_mobile.innerHTML = `${this.text_calendar}`
          this.getDescription(clear, this.text_calendar);
          break;
        case 'plane':
          if (this.$refs.cityPicker)
            this.$refs.cityPicker.updateCity();
          this.text_city = '';
          this.getDescription(clear, "Из любого");
          break;
        case 'duration':
          if (this.$refs.durationPicker)
            this.$refs.durationPicker.updateDuration();
          this.text_duration = '';
          break;
        case 'budget':
          if (this.$refs.rangePicker) {
            this.$refs.rangePicker.updateRange();
            this.$refs.rangePicker.changeValue();
          }
          this.text_range = '';
          break;
        case 'map':
          if (this.$refs.stayPicker)
            this.$refs.stayPicker.updateStay();
          this.text_stay = '';
          break;
        case 'capacity':
          if (this.$refs.capacityPicker)
            this.$refs.capacityPicker.updateCapacity();
          this.text_capacity = '';
          break;
      }
      this.menus = Object.values(this.menus).map(function (value, key) {
        if (value["type"] === clear) {
          delete value['active']
        }
        return value
      })
      this.$router.push({query: ''});
    }
    ,
    isOpen() {
      this.open = !this.open
      this.hidden = !this.hidden
    }
    ,
    handleQueryDurations(data) {
      this.query_duration = data;
      this.fetchData();
    }
    ,
    handleQueryCapacity(data) {
      this.query_capacity = data;
      this.fetchData();
    }
    ,
    handleQueryStay(data) {
      this.query_stay = data;
      this.fetchData();
    }
    ,
    handleQueryCity(data) {
      this.query_city = data ?? [];
      this.fetchData();
    }
    ,
    async handleQueryRange(data) {
      this.query_range = data;
      this.fetchData();
    }
    ,
    getTextRecent() {
      this.$refs.cityPicker.emitFilters();
      const data_city = this.$refs.cityPicker["_data"];
      this.$refs.durationPicker.updateText();
      const data_durations = this.$refs.durationPicker["_data"];
      this.$refs.stayPicker.updateText();
      const data_stay = this.$refs.stayPicker["_data"];
      this.$refs.rangePicker.changeNumber();
      const data_range = this.$refs.rangePicker["_data"];
      let adults = '';
      let children = '';
      if (this.query_capacity.hasOwnProperty("max_room_capacity_adults"))
        adults = [`${this.query_capacity["max_room_capacity_adults"]} взрослый`];
      if (this.query_capacity.hasOwnProperty("max_room_capacity_children"))
        children = [`${this.query_capacity["max_room_capacity_children"]} дети`];
      this.text = [
        ...[data_durations["text"]],
        ...[data_city["text"]],
        ...[data_stay["text"]],
        ...[data_range["text"]],
        ...adults,
        ...children];
      let text_out = this.text.filter(Boolean).join(', ');
      return text_out;
    }
    ,
    async ResetAllOptions() {
      await this.setHotelList("");
      try {
        this.$refs.rangePicker.changeValue();
        this.$refs.cityPicker.updateCity();
        this.$refs.durationPicker.durations = DURATION.getDurationBlock;
        this.$refs.stayPicker.updateStay();
        this.$refs.capacityPicker.updateCapacity();
        this.query_duration = {};
        this.query_stay = {};
        this.city_all = {};
        this.query_range = {};
        this.query_capacity = {};
        this.$store.dispatch('setQueryRoute', {
          'recommended': true,
          'limit': 20,
          'offset': 0
        });
        let drop = document.getElementById('dropCloseActive');
        drop.classList.remove('dropdown--active');
      } catch (e) {
        this.$dd.warn('the filter was not reset')
      }
    }
  }
}

