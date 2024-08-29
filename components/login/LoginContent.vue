<script>
export default {
  name: "LoginContent",
  data() {
    return {
      pass_sow: false,
      email: '',
      password: '',
      email_false: false,
      validate: false,
      password_false: false,
      inputType: 'password',
    }
  },
  mounted() {
  },
  methods: {
    isShow() {
      this.pass_sow = !this.pass_sow;
      this.inputType = this.inputType === 'password' ? 'text' : 'password';
    },
    async submit(event) {
      event.preventDefault();
      await this.$store.dispatch('setLogin', {
        "email": this.email,
        "password": this.password
      })
      if (this.$store.state.is_login) {
        this.validate = false;
        this.$nuxt.$router.push(`/`);
        if (this.$route.name !== '/')
          location.reload();
      } else {
        this.validate = true;
      }
    },
    updatePass() {
      this.$parent.login_register = false;
    }
  }
}
</script>

<template>
  <div class="Login__content">
    <form>
      <div class="Login--collect">
        <div>
          <div class="Login__line"><input type="email" name="mbre_email" placeholder="Email"
                                          autocomplete="username" class="" v-model="email"></div>
          <div class="Login__line passwordContainer">
            <div class="meterContainer"><input :type="inputType" name="mbre_mot_de_passe"
                                               placeholder="Password" autocomplete="current-password"
                                               class="InputPassword " v-model="password"></div>
            <button
              @click="isShow"
              type="button" class="showPassword">
              <i
                v-show="!pass_sow"
                class="line-icon-eyes"></i>
              <i
                v-show="pass_sow"
                class="line-icon-eye-hidden"></i>
            </button>
          </div>
          <div class="Login__line--error">
            <p v-show="validate"><i class="icon line-icon-exclamation-circle"></i>
              Ведите корректные даные
            </p>
          </div>
          <div class="Login__line Login__line--spaced"
               style="display:flex;align-items:center;justify-content: flex-end"
          >
            <a
              @click="updatePass"
              style="cursor: pointer"
              class="popup-link underlined-text">Восстановить пароль</a>
          </div>
          <div class="Login__line Login__line--spaced">
            <button
              @click="submit"
              class="Button Login__submitButton button--primary"
              data-tag="loginForm">Войти
            </button>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<style scoped>

</style>
