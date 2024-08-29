<script>
export default {
  name: "HotelModal",
  data() {
    return {
      close: false,
      base_url: process.env.BASE_URL,
      copy: false,
      message: '',
      date_count: 7,
      name: '',
      surname: '',
      phone: '+7',
      data: '',
      email: '',
      firm: '',
      website: '',
      text: '',
      valide: false
    }
  },
  mounted() {
    this.message = window.location.href;
  },
  methods: {
    closeDial() {
      this.close = !this.close;
      if (this.close) {
        document.body.classList.add('hidden_body');
        document.documentElement.classList.add('hidden_body');
      } else {
        document.body.classList.remove('hidden_body');
        document.documentElement.classList.remove('hidden_body');
      }
    },
    async postPartners() {
      this.text = this.text + `, дата отправления ${this.data}, количество дней ${this.date_count}`;
      this.valide = true;
      if (!this.$validator.isEmpty(this.phone) && this.valide && (this.phone.length >= 16 && this.phone.length < 19)
        && !this.$validator.isEmpty(this.name)) {
        await this.$store.dispatch('pushPartner', {
          "first_name": this.name,
          "last_name": this.surname,
          "phone": this.phone,
          "message": this.text
        })
        this.close = !this.close;
        this.$parent.all_time = false;
      }
    },
    onCopy: function (e) {
      this.copy = true;
    },
    onError: function (e) {
    },
  }
}
</script>

<template>
  <div v-show="close" role="dialog">
    <div class="fade modal-backdrop in"></div>
    <div role="dialog" tabindex="-1" class="fade modalV2 modal-contact guest in modal" style="display: block;">
      <div class="modal-dialog">
        <div class="modal-content" role="document">
          <button type="button"
                  @click="closeDial"
                  class="close" data-dismiss="modal" aria-hidden="true">
            <i class="icon-close-light"></i>
          </button>
          <div class="modal-body">
            <div id="contact-form">
              <div class="contact-us-title partner">
                Уточнить цену
              </div>
              <div class="contact-us-separator partner"></div>
              <div class="contact-us-content partner">
                <div id="form-null">
                  <form class="contact-form flex flex-col">
                    <div class="globalForm">
                      <div>
                        <div class="subForm">
                          <div class="tableForm">
                            <div class="FormInput tableRow">
                              <div>
                                <div class="tableRow"><span class="label">Имя</span>
                                  <div class="FormInput">
                                    <input
                                      type="text" placeholder=" " class="" v-model="name">
                                    <label v-show="$validator.isEmpty(name) && valide"
                                           class="error"
                                           for="details-lastname">Укажите имя</label>
                                  </div>
                                </div>
                                <div class="FormError"></div>
                              </div>
                            </div>
                            <div class="FormInput tableRow">
                              <div>
                                <div class="tableRow"><span class="label">Номер телефона</span>
                                  <div class="FormInput">
                                    <input type="tel"
                                           v-model="phone"
                                           v-mask="['+# ### ###-##-##', '+### ### ###-##-##']"
                                           name="details-phone" value="+7" class="checkPhone" placeholder="">
                                    <label
                                      v-show="valide && $validator.isEmpty(phone) || valide &&  (phone.length < 16 || phone.length > 18)"
                                      class="error"
                                      for="details-phone">Укажите телефон</label>
                                  </div>
                                </div>
                                <div class="FormError"></div>
                              </div>
                            </div>
                            <div class="FormInput tableRow">
                              <div>
                                <div class="tableRow"><span class="label">Желаемая дата отправления</span>
                                  <div class="FormInput">
                                    <input type="text"
                                           v-model="data"
                                           v-mask="'##-##-####'"
                                           placeholder="26-02-2024">
                                    <label v-show="$validator.isEmpty(phone) && valide"
                                           class="error"
                                           for="details-lastname">Укажите дату</label>
                                  </div>
                                </div>
                                <div class="FormError"></div>
                              </div>
                            </div>
                            <div class="FormInput tableRow">
                              <div>
                                <div class="tableRow"><span class="label">Желаемое количество ночей</span>
                                  <div class="FormInput">
                                    <input type="text"
                                           v-model="date_count"
                                           v-mask="['#','##']"
                                           placeholder="">
                                  </div>
                                </div>
                                <div class="FormError"></div>
                              </div>
                            </div>
                            <div class="FormInput tableRow">
                              <div>
                                <div class="tableRow">
                                </div>
                                <div class="FormError"></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <button
                      @click="postPartners"
                      class="button button--primary" type="button">Отправить запрос
                    </button>
                    <div class="observable"></div>
                  </form>
                  <p class="formLegal">Номер телефона нужен исключительно для связи с Вами. Он не передаётся третьим
                    лицам и нигде не публикуется.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@media only screen and (max-width: 767px) {
  .modal-contact .modal-dialog .modal-content .close {
    right: 0 !important;
  }
}

.error {
  font-size: 13px;
}

.center_block {
  display: flex;
  justify-content: center;
  align-items: center;
}

.nameSideBarBlock {
  &.description {
    padding-top: 0;
    color: inherit;
    font-weight: normal;
    font-size: 12px;
  }
}

.hidden_body {
  overflow: hidden;
}

.room_image {
  width: 100%;
  height: 100%;
  object-fit: none;
}
</style>
