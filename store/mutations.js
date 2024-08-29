export default {
  SET_HOTEL_LIST(state, payload) {
    let hotel = {...payload};
    for (const key in hotel) {
      if (Object.hasOwnProperty.call(hotel, key)) {
        hotel[key]['main_image'] = process.env.BASE_URL + hotel[key]['main_image'];
      }
      const min = 5;
      const max = 15;
      hotel[key]['random_days'] = Math.floor(Math.random() * (max - min + 1)) + min;
    }
    state.hotel = hotel
  },
  SET_HOTEL_NEWS_LIST(state, payload) {
    let hotel = {...payload};
    for (const key in hotel) {
      if (Object.hasOwnProperty.call(hotel, key)) {
        hotel[key]['main_image'] = process.env.BASE_URL + hotel[key]['main_image'];
      }
      const min = 5;
      const max = 15;
      hotel[key]['random_days'] = Math.floor(Math.random() * (max - min + 1)) + min;

    }
    state.hotel_news = hotel
  },
  GET_QUERY_LIST(state, payload) {
    state.query = payload
  },
  SET_HOTEL_LIST_MIN(state, payload) {
    state.hotel_min = payload
  },
  SET_STEP2(state, payload) {
    state.step2 = payload
  },
  SET_HOTEL_TOUR_ID(state, payload) {
    state.tour_get = payload;
  },
  SET_HELP_CATEGORIES(state, payload) {
    state.help_categories = payload;
  },
  SET_HOTEL_OUT(state, payload) {
    let hotel_out = {...state.hotel};
    const length = Object.keys(hotel_out).length;
    for (const key in payload) {
      if (Object.hasOwnProperty.call(payload, key)) {
        payload[key]['main_image'] = process.env.BASE_URL + payload[key]['main_image'];
      }
      let key_out = key * 1 + length * 1;
      hotel_out[key_out] = payload[key];
    }
    state.hotel = hotel_out;
  },
  SET_QUERY_KEYS(state, payload) {
    state.query_keys = payload;
  },
  SET_TOKEN(state, payload) {
    state.token = payload;
  },
  SET_CSRF(state, payload) {
    state.csrf = payload;
  },
  SET_REGISTER(state, register) {
    state.is_register = register;
  },
  SET_LOGIN(state, register) {
    state.is_login = register;
  },
  SET_HELP_MESSAGE(state, register) {
    state.help_message = register;
  },
  SET_DEPARTURE_CITIES(state, payload) {
    state.cities = payload;
  },
  SET_HOTEL_LENGTH(state, payload) {
    state.hotel_length = payload.length;
  },
  SET_QUERY(state, payload) {
    state.query = payload;
  },
  INFO_ACCOUNT(state, payload) {
    state.inf_account = payload;
  },
  SET_DESTINATION(state, payload) {
    state.destinations = payload;
  },
  SET_HOTEL_DETAIL(state, payload) {
    state.sale = payload;
  },
  SET_HOTEL_TOUR(state, payload) {
    state.tour = payload;
  },
  SET_BOOKING(state, payload) {
    state.tour_id = payload;
  },
  SET_BOOKING_DETAILS(state, payload) {
    state.booking_details = payload;
  },
  SET_TOUR_ALL(state, payload) {
    state.tour_all = payload;
  },
  SET_UPDATE_PASSWORD(state, payload) {
    state.update_password = payload;
  },
  SET_RECENT(state, payload) {
    let recent_out = {...state.recent};
    const length = Object.keys(recent_out).length;
    if (length >= 3) {
      delete recent_out[0]
    }
    recent_out[length + 1] = payload["0"];
    state.recent = Object.values(recent_out);
  }
}
