<script>
import Before_details from "./before_details.vue";
import {format, parse} from "date-fns";
import Date_form from "../../all/date_form.vue";
import intlTelInput from 'intl-tel-input';

export default {
  name: "step_2",
  components: {Date_form, Before_details},
  props: ['step', 'id'],
  data() {
    return {
      email: '',
      valid: false,
      load: false,
      name: '',
      surname: '',
      phone: '+7',
      dob: '',
      name_br: 'Дата рождения *',
      lite_form: false,
      date_valid: false,
      error_dob_usr: false,
      error_dob: false,
      passport_number: '',
      passport_expire_date: '',
      passengers: Array.from({length: this.step.adults + this.step.children + this.step.infants},
        (item, key) => ({
          [`name${key}`]: '',
          [`surname${key}`]: '',
          [`dob${key}`]: '',
          [`passport_number${key}`]: '',
          [`passport_expire_date${key}`]: ''
        })),
    }
  },
  mounted() {
    const input = document.querySelector("#phone");
    intlTelInput(input, {
      initialCountry: "ru",
      showSelectedDialCode: false,
      allowDropdown: true,
      placeholderNumberType: 'mobile',
      nationalMode: false,
      autoInsertDialCode: true,
      countrySearch: false,
      onlyCountries: ['kz', 'ru', "by"],
      autoPlaceholder: 'aggressive',
      utilsScript: "/js/intlTel.js?1707906286003",
    });

    this.lite_form = this.$cookies.get("lite_form");
  },
  computed: {
    pax_count: {
      get() {
        return this.step.adults + this.step.children + this.step.infants;
      }
    },
    price: {
      get() {
        return this.$route.query["price"];
      },
      set(val) {
        return val;
      }
    }
  },
  methods: {
    formatDate(inputDate, inputFormat, outputFormat) {
      const parsedDate = parse(inputDate, inputFormat, new Date());
      return format(parsedDate, outputFormat);
    },
    async submit(event) {
      event.preventDefault();
      this.valid = true;
      if (!this.$validator.isEmpty(this.phone) &&
        this.$validator.isEmail(this.email) &&
        !this.$validator.isEmpty(this.phone)
        && !this.$validator.isEmpty(this.name)
        && !this.$validator.isEmpty(this.surname)) {
        await this.$store.dispatch('setStep3', {
          "contact_name": this.name,
          "contact_surname": this.surname,
          "contact_email": this.email,
          "contact_phone": this.phone,
          "tour_id": this.id
        })
      }

      let isValid = this.passengers.some((passenger, index) => {
        return (
          this.$validator.isEmpty(passenger[`passport_number${index}`]) ||
          this.$validator.isDate(this.formatDate(passenger[`passport_expire_date${index}`], 'dd-MM-yyyy', 'yyyy-MM-dd'), 'dd-MM-yyyy') ||
          this.$validator.isEmpty(passenger[`name${index}`]) ||
          this.$validator.isEmpty(passenger[`surname${index}`])
        );
      });
      if (isValid) return null;
      isValid = this.passengers.find((passenger, index) => {
        return !this.$validator.isDate(this.passengers[index][`dob${index}`], 'yyyy-MM-dd');
      })
      if (isValid) return null;
      await this.passengers.forEach((passenger, index) => {
          this.$store.dispatch('setPassengerUpdate', {
            "tour": this.id,
            "first_name": passenger[`name${index}`],
            "last_name": passenger[`surname${index}`],
            "dob": passenger[`dob${index}`],
            "passport_number": passenger[`passport_number${index}`],
            "passport_expire_date": this.formatDate(passenger[`passport_expire_date${index}`], 'dd-MM-yyyy', 'yyyy-MM-dd'),
          })
        }
      );
      this.$store.dispatch('fullBooking', {"tour": this.id})
      this.price = this.$route.query["price"];
      this.$parent.$parent.$parent.$parent.load = false
      this.$nuxt.$router.push(`/booking/${this.id}/step/3/?tour_id=${this.id}&price=${this.price}`);
      this.$store.state.step = 3;
    },
    async submit_2(event) {
      event.preventDefault();
      this.valid = true;
      if (!this.$validator.isEmpty(this.phone) &&
        this.$validator.isEmail(this.email) &&
        !this.$validator.isEmpty(this.phone)
        && !this.$validator.isEmpty(this.name)
        && !this.$validator.isEmpty(this.surname)) {
        await this.$store.dispatch('setStep3', {
          "contact_name": this.name,
          "contact_surname": this.surname,
          "contact_email": this.email,
          "contact_phone": this.phone,
          "tour_id": this.id
        })
      } else {
        return null;
      }
      this.$store.dispatch('partialBooking', {"tour": this.id})
      this.$parent.$parent.$parent.$parent.load = false
      this.$nuxt.$router.push(`/booking/${this.id}/step/3/?tour_id=${this.id}&price=${this.price}`);
      this.$store.state.step = 3;
    },
    updateDate(data) {
      if (data) {
        this.passengers[data['key']][`dob${data['key']}`] = data["date"]
      } else {
        this.date_valid = true;
      }
    }
  }
}
</script>

<template>
  <div id="stepForm" class="Main">
    <div id="errorList"></div>
    <section class="section title-before details">
      <div class="section-title ">Ваши контактные данные</div>
      <div class="section-content clearfix">
        <span class="section-title subsection">Контактная информация</span>
        <span
          v-if="lite_form"
          class="paxNotice">Пожалуйста, введите Ваше имя, телефон и Email. Мы свяжемся с Вами в ближайшее время.</span>
        <div class="section-data firstname">
          <label for="details-firstname" class="label-form">Фамилия *</label>
          <input type="text"
                 v-model="surname"
                 id="details-firstname"
                 :class="{'error': $validator.isEmpty(surname) && valid,
                 'valid': !$validator.isEmpty(surname)}"
                 name="details-firstname" value="Alex" class="checkFirstname"
                 placeholder="">
          <label v-show="$validator.isEmpty(surname) && valid" id="details-lastname-error" class="error"
                 for="details-lastname">Это поле
            является
            обязательным.</label>
        </div>
        <div class="section-data lastname">
          <label for="details-lastname" class="label-form">Имя</label>
          <input type="text" v-model="name" id="details-lastname"
                 :class="{'error': $validator.isEmpty(name) && valid,
                 'valid': !$validator.isEmpty(name)}"
                 name="details-lastname"
                 class="checkLastname" placeholder="">
          <label v-show="$validator.isEmpty(name) && valid" id="details-lastname-error" class="error"
                 for="details-lastname">Это поле
            является
            обязательным.</label>
        </div>
        <div class="section-data email flex-mid">
          <label for="details-email" class="label-form">Email *</label>
          <input type="text" id="details-email" name="details-email" v-model="email"
                 :class="{'error': !$validator.isEmail(email) && valid,
                 'valid': $validator.isEmail(email)}"
                 class="checkEmail" placeholder="">
          <label v-show="!$validator.isEmail(email) && valid" id="details-lastname-error" class="error"
                 for="details-lastname">Введите корректный емайл.</label>
        </div>
        <div class="section-data phone flex-mid">
          <label for="details-email" class="label-form">Телефон *</label>
          <input type="tel"
                 v-model="phone"
                 id="phone"
                 v-mask="['+# ### ###-##-##', '+### ### ###-##-##']"
                 :class="{'error': $validator.isEmpty(phone) && valid,
                 'valid': !$validator.isEmpty(phone)}"
                 style="padding-right: 6px; padding-left: 52px; margin-left: 0;"
                 name="details-phone" value="+7" class="checkPhone" placeholder="">
          <label v-show="$validator.isEmpty(phone) && valid" id="details-lastname-error" class="error"
                 for="details-lastname">Введите действительный номер телефона.</label>
        </div>
      </div>
    </section>
    <section
      v-if="!lite_form"
      class="section title-before details pax">
      <div class="section-title ">Данные туристов</div>
      <template v-for="(item, key) in passengers">
        <div class="section-content clearfix">
          <span v-if="key === 0" class="section-title subsection">Турист №1 (основной гость)</span>
          <span v-else class="section-title subsection">Турист №{{ key + 1 }}</span>
          <div class="section-data firstname">
            <label :for="`surname${key}`" class="label-form">Фамилия *</label>
            <input type="text"
                   :id="`surname${key}`"
                   :name="`surname${key}`"
                   v-model="passengers[key][`surname${key}`]"
                   :class="{'error': $validator.isEmpty(passengers[key][`surname${key}`]) && valid,
                 'valid': !$validator.isEmpty(passengers[key][`surname${key}`])}"
                   placeholder="" aria-invalid="false">
            <label v-show="$validator.isEmpty(passengers[key][`surname${key}`]) && valid" id="details-dob-error"
                   class="error"
                   for="details-dob">
              Это поле является обязательным.</label>
          </div>
          <div class="section-data lastname">
            <label :for="`name${key}`" class="label-form">Имя *</label>
            <input :id="`name${key}`"
                   type="text"
                   :name="`name${key}`"
                   v-model="passengers[key][`name${key}`]"
                   class="checkLastname"
                   :class="{'error': $validator.isEmpty(passengers[key][`name${key}`]) && valid,
                  'valid': !$validator.isEmpty(passengers[key][`name${key}`])}"
                   placeholder=""
                   aria-invalid="true">
            <label v-show="$validator.isEmpty(passengers[key][`name${key}`]) && valid" id="details-dob-error"
                   class="error"
                   for="details-dob">
              Это поле является обязательным.</label>
          </div>
          <div class="card" style="width: 100%;padding: 0;">
            <div class="subForm">
              <div class="tableForm">
                <date_form :name="name_br" :index_key=key @push_date="updateDate"></date_form>
              </div>
              <label v-show="$validator.isEmpty(passengers[key][`dob${key}`]) && valid || error_dob_usr"
                     id="details-dob-error"
                     class="error"
                     for="details-dob">
                Это поле является обязательным.</label>
            </div>
          </div>
          <div class="section-data passport_number flex-mid">
            <label for="details-email" class="label-form">Серия и номер загранпаспорта *</label>
            <input type="text"
                   :id="`passport_number${key}`"
                   :name="`passport_number${key}`"
                   v-model="passengers[key][`passport_number${key}`]"
                   :class="{'error': $validator.isEmpty(passengers[key][`passport_number${key}`]) && valid,
                  'valid': !$validator.isEmpty(passengers[key][`passport_number${key}`])}"
                   placeholder="" aria-invalid="false">
            <label v-show="$validator.isEmpty(passengers[key][`passport_number${key}`]) && valid"
                   id="details-passport_number-error" class="error"
                   for="details-passport_number">Это поле является
              обязательным.</label>
          </div>
          <div class="section-data passport_number flex-mid">
            <label for="details-email" class="label-form">Действителен до</label>
            <input type="text"
                   :id="`passport_expire_date${key}`"
                   :name="`passport_expire_date${key}`"
                   v-model="passengers[key][`passport_expire_date${key}`]"
                   v-mask="'##-##-####'"
                   :class="{'error': $validator.isEmpty(passengers[key][`passport_expire_date${key}`]) && valid,
                  'valid': !$validator.isDate(passengers[key][`passport_expire_date${key}`])}"
                   placeholder="26-02-2024">
            <label v-show="$validator.isEmpty(passengers[key][`passport_expire_date${key}`]) && valid"
                   id="details-passport_expire_date-error" class="error"
                   for="details-passport_expire_date">Это поле является
              обязательным.</label>
          </div>
        </div>
        <div style="margin-top: 10px"></div>
      </template>
    </section>
    <section class="section total">
      <div class="section-content price step2 last-child">
        <div id="react-price">
          <div class="section-data clearfix ">
            <div class="sub-section-data clearfix ">
											<span class="section-data-text">
												<span class="font-bold">Всего <span class="font-unbold"></span></span>
												<span class="total-subtitle">(Включая доп. услуги)</span>
											</span>
              <span class="section-data-price" id="price-total">
												<div>
													<span class="price">₽{{ price }}</span>
												</div>
											</span>
            </div>
          </div>
        </div>
      </div>
      <div class="continue-container">
								<span id="continue-container" class="tooltipstered">
									<button
                    v-if="lite_form"
                    onclick="ym(96759432,'reachGoal','сontinue_btn'); return true;"
                    id="continue" class="Button Button--primary"
                    @click="submit_2">Продолжить</button>
									<button
                    v-if="!lite_form"
                    onclick="ym(96759432,'reachGoal','сontinue_btn'); return true;"
                    id="continue" class="Button Button--primary"
                    @click="submit">Продолжить</button>
								</span>
        <figure class="figure-loader" id="continue-button-loader">
          <div class="Loader Loader--circular Loader--pink Loader--sm">
            <div class="Loader__anim">
              <svg class="Loader__svg" viewBox="25 25 50 50">
                <circle class="Loader__svg__path" cx="50" cy="50" r="20" fill="none" strokewidth="2"
                        strokemiterlimit="10"></circle>
              </svg>
            </div>
          </div>
        </figure>
      </div>
    </section>
    <section class="section annexe">
      <div id="react-package-notice">
        <div class="package-notice">
          <div class="package-notice-title">
            <i class="line-icon-information-circle"></i>
            <span class="title-text">Ваша поездка защищена законодательством Российской Федерации.</span>
          </div>
          <div class="package-notice-content">
            Предлагаемая Вам комбинация туристических услуг является "пакетом" в смысле Положения о пакетных поездках
            и
            связанных с ними туристических соглашениях. На Вас распространяются все права применимые к пакетным
            туристам. Договор страхования гражданской ответственности туроператора обеспечивает Публичное АО
            "Страховая
            акционерная компания "ЭНЕРГОГАРАНТ". Сумма страхования составляет 10 000 000 рублей. Туроператор
            будет нести полную финансовую ответственность за надлежащее исполнение пакета в целом. Кроме того, в
            соответствии с требованиями законодательства, туроператор обязан, если в пакет включен транспорт,
            выполнить все необходимые действия для обеспечения Вашей репатриации в случае, если она окажется
            необходимой. Если вы приобретаете отдельные туристические услуги (например только проживание) эта защита
            не
            действует. Дополнительную информацию об ООО "Туристическая фирма "Футур" вы найдете на сайте Федерального
            агенства по туризму в Реестр туроператоров Российской Федерации.
          </div>
          <div class="package-notice-link">
            <a href="https://tourism.gov.ru/reestry/reestr-turoperatorov/show.php?id=99861"
               class="popup-link underlined-text">Сумма
              страхования составляет 10 000 000 рублей.
              Туроператор будет нести полную финансовую ответственность за надлежащее исполнение пакета в
              целом</a>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style>
@import 'intl-tel-input/build/css/intlTelInput.css';

.details .subForm .FormInput .iti__selected-flag {
  padding: 0 8px;
}

@media (max-width: 575.98px) {
  .passport_number {
    width: 100%;
  }

  .section-data .iti.iti--allow-dropdown.iti--show-flags {
    width: 100%;
  }
}
</style>
