<script>

export default {
  name: "UpdatePass",
  data() {
    return {
      email: '',
      resetLink: '',
    }
  },
  mounted() {
  },
  methods: {
    async submit(event) {
      event.preventDefault();
      await this.$store.dispatch('setEmailChangeRequest', {
        "email": this.email
      })
      this.$parent.closeDial();
    },

  }
}
</script>

<template>
  <div class="Login__content">
    <div>
      <div class="Login--collect">
        <div>
          <div class="Login__line">
            <div
              style="text-transform: uppercase;"
              class="ShowMoreSocialLoginsButton Button Button--autoWidthMobile Button--noPadding">
              Восстановление доступа
            </div>
          </div>
          <div class="Login__line legalMention">
            <span style="text-transform: uppercase; font-weight: 800;">Адрес электронной почты</span><br>
            на него мы пришлем вам ссылку для смены пароля
          </div>
          <div class="Login__line">
            <input type="email"
                   name="mbre_email"
                   placeholder="Email"
                   autocomplete="username" class=""
                   v-model="email"></div>
          <div class="Login__line Login__line--spaced">
            <button
              @click="submit"
              class="Button Login__submitButton button--primary"
              data-tag="loginForm">Отправить
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.Login__line--error {
  font-size: 12px;
}
</style>
