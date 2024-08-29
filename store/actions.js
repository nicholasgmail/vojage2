import $validator from '../plugins/validator.js'

export default {
  async nuxtServerInit({commit, dispatch}, context) {

    const {query, params, route, store} = context;
    switch (route.name) {
      case'sale-id-slug':
        let id = params.id;
        await store.dispatch('setHotelDetail', id);
        //  await dispatch('durationsCity', {...store.state.sale, 'id': id});
        break;
      case 'index':
        await dispatch('setHotelList', {
          'recommended': true,
          'limit': 10,
          'offset': 0
        });
        await dispatch('setHotelMin');
        break;
    }
  },
  async durationsCity({commit, dispatch, state}, query) {
    let tour_all = [];
    const sale = query;
    try {
      if (!!sale) {
        for (const duration of sale["durations"]) {
          let qyery_in = {
            'hotel': sale["id"],
            'with_flight': false,
            'duration': duration
          };
          await dispatch('setHotelTour', qyery_in);
          const tour = {...state.tour, 'duration': duration, 'departure': ''};
          tour_all.push(tour);
        }
        commit('SET_TOUR_ALL', tour_all);
        for (const duration of sale["durations"]) {
          for (const city of sale["depature_cities"]) {
            let query_in = {
              'hotel': sale["id"],
              'with_flight': true,
              'departure_city': city["name"],
              'duration': duration
            };
            await dispatch('setHotelTour', query_in);
            const tour = {...state.tour, 'duration': duration, 'departure': city["name"]};
            tour_all.push(tour);
          }
        }
        commit('SET_TOUR_ALL', tour_all);
      }
    } catch (e) {
      console.log(e)
    }
  },
  async setHotelList({commit}, query) {
    try {
      const response = await this.$api.$get('/api/v01/hotel/list/', {
        params: query
      });
      commit('SET_HOTEL_LIST', response);
    } catch (error) {
      console.error('Ошибка запроса', error);
    }
  },
  async setHotelMin({commit}) {
    try {
      const response = await this.$api.$get('/api/v01/hotel/hotel-card/');
      commit('SET_HOTEL_LIST_MIN', response);
    } catch (error) {
      console.error('Ошибка запроса', error);
    }
  },
  async setEmailChangeRequest({commit}, data) {
    try {
      const response = await this.$api.$post('api/v01/help/email-change-request/', data);
      commit('SET_HOTEL_LIST', response);
    } catch (error) {
      console.error('Ошибка запроса', error);
    }
  },
  async setDestinations({commit}) {
    try {
      const response = await this.$api.$get('/api/v01/hotel/destinations/');
      commit('SET_DESTINATION', response);
    } catch (error) {
      console.error('Ошибка запроса', error);
    }
  },
  async setHotelNews({commit}, query) {
    try {
      const response = await this.$api.$get('/api/v01/hotel/list/', {
        params: query
      });
      commit('SET_HOTEL_NEWS_LIST', response);
    } catch (error) {
    }
  },
  async setHotelOut({commit}, query) {
    try {
      const response = await this.$api.$get('/api/v01/hotel/list/', {
        params: query
      });
      commit('SET_HOTEL_OUT', response);
    } catch (error) {
      console.error('Ошибка запроса', error);
    }
  },
  async setHotelCount({commit}, query) {
    try {
      const response = await this.$api.$get('/api/v01/hotel/list/', {
        params: query
      });
      commit('SET_HOTEL_LENGTH', response);
    } catch (error) {
      console.error('Ошибка запроса', error);
    }
  },
  async setHotelDetail({commit}, id) {
    try {
      const response = await this.$api.$get(`/api/v01/hotel/detail/${id}/`);
      commit('SET_HOTEL_DETAIL', response);
      commit('SET_TOUR_ALL', []);
    } catch (error) {
      console.error('Ошибка запроса', error);
    }
  },
  async setDepartureCity({commit}) {
    try {
      const response = await this.$api.$get('/api/v01/hotel/depature-cities/');
      commit('SET_DEPARTURE_CITIES', response);
    } catch (error) {
      console.error('Ошибка запроса', error);
    }
  },
  async setHotelTour({commit}, query) {
    try {
      const response = await this.$api.$get('/api/v01/hotel/tour/', {
        params: query
      });
      commit('SET_HOTEL_TOUR', response);
    } catch (error) {
      this.$router.push("/404");
      console.error('Ошибка запроса', error);
    }
  },
  async setTour({commit, state}, query) {
    try {
      const tour = state.tour_all.find(tour => {
        return tour.duration == query['duration']
          && tour.departure == query['departure_city'];
      });
      commit('SET_HOTEL_TOUR', tour);
    } catch (error) {
      console.error('Ошибка запроса', error);
    }
  },
  async setHotelTourId({commit}, query) {
    try {
      const response = await this.$api.$get('/api/v01/hotel/booking-detail/', {
        params: query
      });
      commit('SET_HOTEL_TOUR_ID', response);
    } catch (error) {
      console.error('Ошибка запроса', error);
    }
  },
  async setHelpCategories({commit}) {
    try {
      const response = await this.$api.$get('/api/v01/help/categories/');
      commit('SET_HELP_CATEGORIES', response);
    } catch (error) {
      console.error('Ошибка запроса', error);
    }
  },
  async setBooking({commit}, data) {
    try {
      const response = await this.$api.$post('/api/v01/hotel/tour/', data);
      commit('SET_BOOKING', response);
    } catch (error) {
      console.error('Ошибка запроса', error);
    }
  },
  async setHelpMessage({commit}, data) {
    try {
      const response = await this.$api.$post('/api/v01/booking/help-message/', data);
      commit('SET_HELP_MESSAGE', response);
    } catch (error) {
      console.error('Ошибка запроса', error);
    }
  },
  async setRegister({commit}, data) {
    try {
      const response = await this.$api.$post('/api/v01/user/register/', data);
      const access = response["access"];
      let register = $validator.isJWT(access);
      if (register) {
        this.$cookies.set('token', `${access}`, {
          path: '/',
          maxAge: 60 * 60 * 2
        })
        this.$cookies.set('email', `${data["email"]}`, {
          path: '/',
          maxAge: 60 * 60 * 2
        })
      }
      commit('SET_REGISTER', register);
      commit('SET_TOKEN', access);
    } catch (error) {
      console.error('Ошибка запроса', error);
    }
  },
  async setLogin({commit}, data) {
    try {
      const response = await this.$api.$post('/api/v01/user/login/', data);
      const access = response["access"];
      let login = $validator.isJWT(access);
      if (login) {
        this.$cookies.set('token', `${access}`, {
          path: '/',
          maxAge: 60 * 60 * 2
        })
        this.$cookies.set('email', `${data["email"]}`, {
          path: '/',
          maxAge: 60 * 60 * 2
        })
      }
      commit('SET_LOGIN', login);
      commit('SET_TOKEN', access);
    } catch (error) {
      console.error('Ошибка запроса', error);
    }
  },
  async setUpdatePassword({commit}, data) {
    try {
      const email = this.$cookies.get('email');
      let response = await this.$api.$post(`/api/v01/user/profile/change_password/${email}/`, data);
      //string2D)
    } catch (error) {
      console.error('Ошибка запроса', error);
    }
  },
  async setStep2({commit}, data) {
    try {
      const response = await this.$api.$post('/api/v01/hotel/booking-detail/', data);
      commit('SET_STEP2', response);
    } catch (error) {
      console.error('Ошибка запроса', error);
    }
  },
  async pushPartner({commit}, data) {
    try {
      const response = await this.$api.$post('/api/v01/help/partner/', data);
      commit('SET_STEP2', response);
    } catch (error) {
      console.error('Ошибка запроса', error);
    }
  },
  async fullBooking({commit}, data) {
    try {
      const response = await this.$api.$post('/api/v01/booking/send-notification-email-full-booking/', data);
    } catch (error) {
      console.error('Ошибка запроса', error);
    }
  },
  async partialBooking({commit}, data) {
    try {
      const response = await this.$api.$post('/api/v01/booking/send-notification-email-partial-booking/', data);
    } catch (error) {
      console.error('Ошибка запроса', error);
    }
  },
  async setStep3({commit}, data) {
    try {
      const response = await this.$api.$post('/api/v01/hotel/booking-contact-info-update/', data);
    } catch (error) {
      console.error('Ошибка запроса', error);
    }
  },
  async setPassengerUpdate({commit}, data) {
    try {
      const response = await this.$api.$post('/api/v01/hotel/passenger-update/', data);
    } catch (error) {
      console.error('Ошибка запроса', error);
    }
  },
  async setInfoAccount({commit}, data) {
    try {
      const response = await this.$api.$get(`/api/v01/user/profile/${data}/`);
      commit('INFO_ACCOUNT', response);
    } catch (error) {
      console.error('Ошибка запроса', error);
    }
  },
  async setUpdateAccount({commit}, data) {
    try {
      const response = await this.$api.$post(`/api/v01/user/profile/${data.email}/`, data);
      commit('INFO_ACCOUNT', response);
    } catch (error) {
      console.error('Ошибка запроса', error);
    }
  },
  async setDeleteAccount({commit}, data) {
    try {
      const response = await this.$api.$get(`/api/v01/user/profile/delete/${data}/`);
      if (response) {
        this.$cookies.remove('token');
        this.$cookies.remove('email');
        this.$nuxt.$router.push(`/`);
      }
    } catch (error) {
      console.error('Ошибка запроса', error);
    }
  },
  async setBookingDetails({commit}, data) {
    try {
      const response = await this.$api.$get(`/api/v01/booking/booking-details/${data}/`);
      if (response)
        commit('SET_BOOKING_DETAILS', response);
    } catch (error) {
      //console.error('Ошибка запроса', error);
    }
  },
  async setQueryRoute({commit}, query) {
    // this.$router.push({query: query});
    commit('GET_QUERY_LIST', query);
  },
  async setToken({commit}, query) {
    const access = await this.$cookies.get('token');
    if (!!access) {
      let login = await $validator.isJWT(access);
      commit('SET_LOGIN', login);
      commit('SET_TOKEN', access);
    }
  },
  async setCsrf({commit}, query) {
    const csrf = await this.$cookies.get('csrftoken');
    if (!!csrf) {
      commit('SET_CSRF', csrf);
    }
  }
}
