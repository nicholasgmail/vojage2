export default function ({$axios, redirect, store, route}, inject) {
  store.dispatch('setToken');
  store.dispatch('setCsrf');
  const token = store.getters.token;
  let api = [];
  if (token) {
    api = $axios.create({
      headers: {
        common: {
          Accept: 'application/json, */*',
          Authorization: `Bearer ${token}`,
        },
      },
    });
  } else {
    api = $axios.create({
      headers: {
        common: {
          Accept: 'application/json, */*',
        },
      },
    });
  }
  api.defaults.xsrfHeaderName = 'x-csrftoken'
  api.defaults.xsrfCookieName = 'csrftoken'
  // api.setBaseURL(process.env.BASE_URL);
  api.setBaseURL(process.env.BASE_URL);

  api.onRequest(config => {
    //console.log('Making request to ' + config.url);
  });
  api.onResponse(response => {
    response.status = response.status || response.statusText;
    store.state.status = response.status || response.statusText;
    return response;
  });

  api.onError(error => {
    const code = parseInt(error.response && error.response.status);
    if (code === 400 || code === 500) {
      if (route.name !== 'orders-search' && route.name !== 'account-settings' && route.name !== 'booking-id-step-number') {
        redirect('/404');
      }
    }
    store.state.status = code;
  });
  inject('api', api);
}
