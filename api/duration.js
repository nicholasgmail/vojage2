let getOrderBlock = [
  {
    type: 'recommended',
    name: 'Скидке'
  },
  {
    type: 'newest',
    name: 'Самые новые'
  }
]
let getDurationBlock = [
  {
    type: 'duration_short',
    name: 'Короткий период',
    icon: '<i class="icon-calendarwend duration-icon"></i>',
    selected: false
  }, {
    type: 'duration_from_5_to_7',
    name: 'от 5 до 7 дней',
    icon: '<i class="icon-calendar1week duration-icon"></i>',
    selected: false
  }, {
    type: 'duration_from_7_to_14',
    name: 'от 7 до 14 дней',
    icon: '<i class="icon-calendar2week duration-icon"></i>',
    selected: false
  }, {
    type: 'duration_from_14',
    name: '14 дней и более',
    icon: '<i class="icon-calendar2andmore duration-icon"></i>',
    selected: false,
  },
]
let getStayBlock = [
  {
    type: 'holiday_type_sun_beach',
    name: 'Солнце / Пляж',
    icon: '<i class="line-icon-beach"></i>',
    class_button: "sb",
    selected: false
  },
  {
    type: 'holiday_type_all_inclusive',
    name: 'Все включено',
    icon: '<i class="line-icon-theme-allinclusive"></i>',
    class_button: "ai",
    selected: false
  },
  {
    type: 'holiday_type_family',
    name: 'Семейный',
    icon: '<i class="line-icon-family"></i>',
    class_button: "fm",
    selected: false
  },
  {
    type: 'holiday_type_city',
    name: 'Городской отдых',
    icon: '<i class="line-icon-building-city"></i>',
    class_button: "cb",
    selected: false
  },
  {
    type: 'holiday_type_relax',
    name: 'Релакс',
    icon: '<i class="line-icon-spa-lotus"></i>',
    class_button: "wel",
    selected: false
  },
  {
    type: 'holiday_type_tour_cruise',
    name: 'Тур / Круиз',
    icon: '<i class="line-icon-pin-step"></i>',
    class_button: "tac",
    selected: false
  },
  {
    type: 'holiday_type_gourmet',
    name: 'Гурман',
    icon: '<i class="line-icon-gastronomy"></i>',
    class_button: "co",
    selected: false
  },
  {
    type: 'holiday_type_lake',
    name: 'Озеро',
    icon: '<i class="line-icon-lake"></i>',
    class_button: "lak",
    selected: false
  },
  {
    type: 'holiday_type_mountains_ski',
    name: 'Горы / Лыжи',
    icon: '<i class="line-icon-nature-moutain"></i>',
    class_button: "mou",
    selected: false
  },
]
export default {getDurationBlock, getStayBlock, getOrderBlock};
