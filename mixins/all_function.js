export default {
  computed: {
    queryParams: {
      get() {
        return this.$route.query;
      },
      set(query) {
        this.$route.push({query: query});
      }
    },
  },
  methods: {
    filterObject(obj, get_key) {
      const filteredObj = {};
      for (const key in obj) {
        if (obj.hasOwnProperty(get_key)) {
          filteredObj[get_key] = obj[get_key];
        }
      }
      return filteredObj;
    },
    getQuery(obj, durations) {
      const filteredObj = {};
      durations.map(function (values) {
        for (const key in obj) {
          if (obj.hasOwnProperty(values['type'])) {
            filteredObj[values['type']] = true;
          }
        }
        return values;
      });
      return filteredObj;
    },
    //sum object
    sumObjectValues(obj) {
      let sum = 0;

      for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
          const value = obj[key];
          if (typeof value === 'number') {
            sum += value;
          }
        }
      }

      return sum;
    },
    multiplyValues(obj, percent) {
      for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
          const value = obj[key];
          if (typeof value === 'number') {
            obj[key] = value * percent;
          }
        }
      }
      return obj;
    }
  }
}

