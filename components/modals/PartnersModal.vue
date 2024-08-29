<script>
export default {
  name: "PartnersModal",
  data() {
    return {
      close: false,
      base_url: process.env.BASE_URL,
      copy: false,
      message: '',
      name: '',
      surname: '',
      phone: '',
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
      } else {
        document.body.classList.remove('hidden_body');
      }
    },
    async postPartners() {
      this.valide = true;
      if (!this.$validator.isEmpty(this.phone) &&
        this.$validator.isEmail(this.email)
        && !this.$validator.isEmpty(this.firm)
        && !this.$validator.isEmpty(this.text)
        && !this.$validator.isEmpty(this.name)
        && !this.$validator.isEmpty(this.surname)) {
        await this.$store.dispatch('pushPartner', {
          "first_name": this.name,
          "last_name": this.surname,
          "phone": this.phone,
          "email": this.email,
          "company_name": this.firm,
          "company_site": this.website,
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
                Стать партнером
              </div>
              <div class="contact-us-separator partner"></div>
              <div class="contact-us-content partner">
                <div id="form-null">
                  <form class="contact-form">
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
                                <div class="tableRow"><span class="label">Фамилия</span>
                                  <div class="FormInput"><input type="text" placeholder=" " class="" v-model="surname">
                                    <label v-show="$validator.isEmpty(surname) && valide"
                                           class="error"
                                           for="details-lastname">Укажите фамилию</label>
                                  </div>
                                </div>
                                <div class="FormError"></div>
                              </div>
                            </div>
                            <div class="FormInput tableRow">
                              <div>
                                <div class="tableRow"><span class="label">Email</span>
                                  <div class="FormInput"><input type="text" placeholder=" " class="" v-model="email">
                                    <label v-show="!$validator.isEmail(email) && valide"
                                           class="error"
                                           for="details-lastname">Укажите почту</label>
                                  </div>
                                </div>
                                <div class="FormError"></div>
                              </div>
                            </div>
                            <div class="FormInput tableRow">
                              <div>
                                <div class="tableRow"><span class="label">Номер телефона</span>
                                  <div class="FormInput"><input type="text" placeholder=" " class="" v-model="phone">
                                    <label v-show="$validator.isEmpty(phone) && valide"
                                           class="error"
                                           for="details-lastname">Укажите почту</label>
                                  </div>
                                </div>
                                <div class="FormError"></div>
                              </div>
                            </div>
                            <div class="FormInput tableRow">
                              <div>
                                <div class="tableRow"><span class="label">Фирма</span>
                                  <div class="FormInput"><input type="text" placeholder=" " class="" v-model="firm">
                                    <label v-show="$validator.isEmpty(firm) && valide"
                                           class="error"
                                           for="details-lastname">Укажите почту</label>
                                  </div>
                                </div>
                                <div class="FormError"></div>
                              </div>
                            </div>
                            <div class="FormInput tableRow">
                              <div>
                                <div class="tableRow"><span class="label">Сайт</span>
                                  <div class="FormInput"><input type="text" placeholder=" " class="" v-model="website">
                                  </div>
                                </div>
                                <div class="FormError"></div>
                              </div>
                            </div>
                            <div class="FormInput tableRow">
                              <div>
                                <div class="tableRow"><span class="label">Содержание вашего сообщения</span>
                                  <div class="FormInput"><textarea type="text"
                                                                   v-model="text"
                                                                   placeholder=" " class=""></textarea>
                                    <label v-show="$validator.isEmpty(text) && valide"
                                           class="error"
                                           for="details-lastname">Укажите почту</label>
                                  </div>
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
                      class="button button--primary" type="button">Отправить
                    </button>
                    <button
                      @click="closeDial"
                      type="button" class="resetForm">Отменить
                    </button>
                    <div class="observable"></div>
                  </form>
                </div>
                <p class="formLegal">Отправляя эту форму, вы соглашаетесь с тем,
                  что менеджер может связаться с вами по поводу вашей
                  Регистрация.</p></div>
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
