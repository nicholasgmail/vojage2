<script>
export default {
  name: "RegisterContent",
  data() {
    return {
      pass_sow: false,
      email: '',
      password: '',
      email_false: false,
      password_false: false,
      inputType: 'password',
    }
  },
  methods: {
    isShow() {
      this.pass_sow = !this.pass_sow;
      this.inputType = this.inputType === 'password' ? 'text' : 'password';
    },
    async submit(event) {
      event.preventDefault();
      if (this.$validator.isEmail(this.email)) {
        this.email_false = false;
      } else {
        this.email_false = true;
      }
      if (this.$validator.isStrongPassword(this.password,
        {
          minLength: 8,
          minLowercase: 1,
          minUppercase: 1,
          minNumbers: 1,
          minSymbols: 0,
          returnScore: false,
          pointsPerUnique: 0,
          pointsPerRepeat: 0,
          pointsForContainingLower: 0,
          pointsForContainingUpper: 0,
          pointsForContainingNumber: 0,
          pointsForContainingSymbol: 0
        })) {
        this.password_false = false;
      } else {
        this.password_false = true;
      }
      if (!this.password_false && !this.email_false) {
        await this.$store.dispatch('setRegister', {
          "email": this.email,
          "password": this.password
        })
        this.$parent.closeDial();
        this.$nuxt.$router.push(`/`);
      }
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
            <input type="email"
                   name="mbre_email"
                   placeholder="Email"
                   autocomplete="username" class=""
                   v-model="email"></div>
          <div class="Login__line passwordContainer">
            <div class="meterContainer">
              <input :type="inputType"
                     name="mbre_mot_de_passe"
                     placeholder="Password" autocomplete="current-password"
                     class="InputPassword "
                     v-model="password">
            </div>
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
            <p v-show="email_false"><i class="icon line-icon-exclamation-circle"></i>
              Неверный адрес электронной почты.
            </p>
            <p v-show="password_false"><i class="icon line-icon-exclamation-circle">
            </i>Пароль должен содержать от 8 символов.</p>
            <p v-show="password_false"><i class="icon line-icon-exclamation-circle">
            </i>Пароль должен содержать символ верхнего регистра.</p>
            <p v-show="password_false"><i class="icon line-icon-exclamation-circle">
            </i>Пароль должен содержать цифры.</p>
          </div>
          <div class="Login__line Login__line--spaced">
            <button
              @click="submit"
              class="Button Login__submitButton button--primary"
              data-tag="loginForm">Зарегистрироватся
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
