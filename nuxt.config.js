export default {
  debug: false,
  mode: 'universal',
  head: {
    title: 'Туроператор FYТУР - туры в эксклюзивные отели по супер ценам',
    htmlAttrs: {
      lang: 'en'
    },
    hid: null,
    etag: true,
    meta: [
      {charset: 'utf-8'},
      {name: 'viewport', content: 'width=device-width, initial-scale=1'},
      {hid: 'description', name: 'description', content: ''},
      {name: 'format-detection', content: 'telephone=no'},
      {hid: 'cache-control', name: 'Cache-Control', content: 'max-age=3600'}
    ],
    link: [
      {rel: 'icon', type: 'image/x-icon', href: '/images/f.ico'},
      {
        rel: 'stylesheet',
        type: 'text/css',
        href: 'https://fonts.googleapis.com/css2?family=Source+Sans+Pro:ital,wght@0,300;0,400;0,600;0,700;1,300;1,400;1,600&display=swap'
      }
    ],
    script: [
      {src: '/js/jquery.js'},
      {src: '//code.jivo.ru/widget/aRd358PNU6', async: true}
    ]
  },
  css: [
    '~assets/scss/global.scss'
  ],
  server: {
    host: '0.0.0.0',
    port: 3000,
    timing: {
      total: true
    },
    proxy: {
      '/api': process.env.API_URL
    }
  },
  plugins: [
    '~/plugins/axios',
    '~/plugins/storage-local',
    '~/plugins/dd',
    '~/plugins/cookies',
    '~/plugins/v-mask',
    {src: '~/plugins/click-outside', mode: 'client'},
    '~/plugins/vue-clipboard',
    {src: '~/plugins/lazy', mode: 'client'},
    {src: '~/plugins/swiper', mode: 'client'},
    {src: '~/plugins/validator', mode: 'client'},
    {src: '~/plugins/scroll', mode: 'client'}
  ],
  fallback: true,
  modules: [
    '@nuxtjs/dotenv',
    'cookie-universal-nuxt',
    '@nuxtjs/robots',
    '@nuxtjs/axios',
    '@nuxtjs/proxy',
    '@nuxtjs/yandex-metrika'
  ],
  buildModules: ['@nuxtjs/tailwindcss'],
  yandexMetrika: {
    id: 96759432,
    webvisor: true,
    clickmap: true,
    trackLinks: true,
    accurateTrackBounce: true
  },
  proxy: [[process.env.API_URL, {ws: true}]],
  render: {
    http2: {
      push: true
    }
  },
  cache: false,
  loading: false,
  router: {
    base: '/',
    mode: 'history',
    middleware: 'cookie'
  },
  dotenv: {
    path: process.cwd(),
    filename: '.env',
    systemvars: true
  },
  robots: {
    UserAgent: '*',
    Disallow: ['/admin/', '/private/'],
    Sitemap: process.env.BASE_URL + '/sitemap.xml',
    Host: process.env.BASE_URL
  },
  generate: {
    async routes() {
      try {
        const store = require('./store').default; // Подключаем store

        await store.dispatch('setHotelList');
        const helps = store.state.help_categories;
        const sales = store.state.hotel;
        const step = store.state.step;
        const unique = store.state.unique;
        const request = store.state.request;
        let hotelRoutes = [];
        if (sales.length > 0) {
          hotelRoutes = sales.map((sale) => `/sale/${sale.id}/${sale.slug}`);
        }

        const bookingRoutes = [`/booking/${request}/step/${step}`];
        const helpCategories = [`/help/member_account/${helps.id}`];
        const orderRoutes = [`/order/${unique}`];
        const ordersRoutes = [`/orders/${unique}`];
        const allRoutes = [...hotelRoutes, ...bookingRoutes, ...helpCategories, ...orderRoutes, ...ordersRoutes];

        allRoutes.push({
          route: 'robots.txt',
          payload: `
      User-agent: *
      Disallow: /admin/
      Disallow: /private/
    `
        });

        return allRoutes;
      } catch (e) {
        return null
      }
    }
  }

}

