let getMenu = [
  {
    type: 'destination',
    title: 'Место назначения',
    description: 'В любом месте',
    icon: '<i class="line-icon-search"></i>',
    class_dashboard: 'dashboardButton-fulldestination',
    class_button: 'button-fulldestination'
  },
  {
    type: 'calendar',
    title: 'Дата отправления',
    description: 'Любое время',
    icon: '<i class="line-icon-calendar"></i>',
    class_dashboard: 'dashboardButton-date',
    class_button: 'button-date'
  },
  {
    type: 'plane',
    title: 'Город отправления',
    description: 'Из любого',
    icon: '<i class="line-icon-plane"></i>',
    class_dashboard: 'dashboardButton-city',
    class_button: 'button-city'
  },
  {
    type: 'duration',
    title: 'Длительность',
    description: 'Любая продолжительность',
    icon: '<i class="line-icon-calendar-xl"></i>',
    class_dashboard: 'dashboardButton-duration',
    class_button: 'button-city'
  },
  {
    type: 'budget',
    title: 'Цена за человека',
    description: 'Любая',
    icon: '<i class="line-icon-budget-euro"></i>',
    class_dashboard: 'dashboardButton-prices',
    class_button: 'button-prices'
  },
  {
    type: 'map',
    title: 'Тип отдыха',
    description: 'Любой',
    icon: '<i class="line-icon-map-globe"></i>',
    class_dashboard: 'dashboardButton-stayType',
    class_button: 'button-prices'
  },
  {
    type: 'capacity',
    title: 'Вместимость номера',
    description: 'Любая',
    icon: '<i class="line-icon-family"></i>',
    class_dashboard: 'dashboardButton-capacity',
    class_button: 'button-capacity'
  },
]
export default {getMenu};
