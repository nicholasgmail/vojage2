<script>
import LoginContent from "../login/LoginContent.vue";
import RegisterContent from "../login/RegisterContent.vue";
import UpdatePass from "../login/UpdatePass.vue";

export default {
  name: "LoginRegister",
  components: {UpdatePass, RegisterContent, LoginContent},
  data() {
    return {
      close: false,
      base_url: process.env.BASE_URL,
      copy: false,
      message: '',
      login_select: true,
      login_register: true,
    }
  },
  mounted() {
    this.message = window.location.href;
  },
  methods: {
    isLogin() {
      this.login_select = !this.login_select;
    },
    closeDial() {
      this.close = !this.close;
      this.login_register = true;
      if (this.close) {
        document.body.classList.add('hidden_body');
      } else {
        document.body.classList.remove('hidden_body');
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
  <div
    v-show="close"
    role="dialog">
    <div class="fade modal-backdrop in"></div>
    <div role="dialog" tabindex="-1"
         style="display: block"
         class="fade modalV2 share in modal">
      <div class="modal-dialog">
        <div class="clearfix modal-body">
          <section id="login-container-form" class="login-container-form">
            <div class="page-center page-center--login">
              <div id="reactLogin">
                <div class="Login Login--signin">
                  <div v-show="login_register" class="Login__box">
                    <button type="button"
                            @click="closeDial"
                            style="position: relative;left: 90%;"
                            class="close" data-dismiss="modal" aria-hidden="true">
                      <i class="icon-close-light"></i>
                    </button>
                    <div class="Login__tab">
                      <button
                        :class="{'selected': login_select, 'false': !login_select}"
                        @click="isLogin"
                        data-tag="loginForm">Войти
                      </button>
                      <button
                        :class="{'selected': !login_select, 'false': login_select}"
                        @click="isLogin"
                        data-tag="loginForm">Регистрация
                      </button>
                    </div>
                    <LoginContent
                      v-show="login_select"/>
                    <RegisterContent
                      v-show="!login_select"/>
                  </div>
                  <div v-show="!login_register" class="Login__box">
                    <button type="button"
                            @click="closeDial"
                            style="position: relative;left: 90%;"
                            class="close" data-dismiss="modal" aria-hidden="true">
                      <i class="icon-close-light"></i>
                    </button>
                    <UpdatePass></UpdatePass>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@media (max-width: 767px) {

}

.Login__content {
  line-height: 22px;
  padding: 20px 5px;
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
