import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import mutations from './mutations'
import actions from './actions'
import $cooki from 'vue-cookies'
import $validator from '../plugins/validator.js'

export const strict = false
const createStore = () => {
  let store = new Vuex.Store({
    state: {
      token: null,
      is_register: false,
      is_login: false,
      csrf: '',
      query: {
        'recommended': true,
        'limit': 10,
        'offset': 0
      },
      query_all: {
        'recommended': true,
        'limit': 10,
        'offset': 0
      },
      query_sale: {
        'recommended': true,
        'limit': 10,
        'offset': 0
      },
      tour: [],
      query_keys: null,
      help_categories: null,
      hotel_length: 0,
      limit: 0,
      offset: 0,
      userType: null,
      userId: null,
      status: '',
      hotel: [],
      hotel_min: [],
      recent: null,
      hotel_news: [],
      cities: [],
      destinations: [],
      state: {},
      step: 1,
      step2: 0,
      request: 2,
      tour_get: [],
      tour_all: [],
      tour_id: null,
      unique: null,
      update_password: '',
      booking_details: [],
      help_message: [],
      inf_account: []
    },
    getters: getters,
    mutations: mutations,
    actions: actions
  });
  return store;
}

export default createStore;

