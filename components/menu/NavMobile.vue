<template>
  <div
    v-show="open_menu"
    class="nav-mobile">
    <div class="nav-mobile__head">
      <a href="/static"><img class="logo" alt="FYТУР" width="234" src="/images/logo-vp-white.png"></a>
      <button
        @click="openMenu()"
        class="close-btn"><i class="icon-close"></i></button>
    </div>
    <div class="nav-mobile__content">
      <ul id="menu-mobile" class="menu-list">
        <li class="menu-item">
          <NuxtLink to="/"><i class="line-icon-home"></i>На главную</NuxtLink>
        </li>
        <li class="menu-item">
          <NuxtLink to="/favourites" class="menu-link"><i
            :class="{'notification': favourites}"
            class="notificat line-icon-heart"></i><span>Избранное</span>
            <span
              v-show="favourites > 0"
              class="sublabel">({{ favourites }})</span></NuxtLink>
        </li>
        <li class="menu-item  ">
          <a href="/orders-search" class="  "><i
            class="false line-icon-suitcase"></i><span>Ваши бронирования</span></a>
        </li>
        <li class="menu-item menu-link-item ">
          <div role="button" class="collapsed">
            <a href="/helpers" class="menu-link"><i
              class="false line-icon-comment"></i><span>Новости и акции</span></a>
          </div>
        </li>
        <li class="menu-item menu-link-item ">
          <div role="button">
            <button
              @click="entrance"
              v-if="!button_l_r"
              v-show="!button_l_r"
            ><i class="line-icon-user"></i><span>{{ in_out }}</span></button>
          </div>
          <div role="button">
            <a
              v-if="button_l_r"
              v-show="button_l_r"
              href="/account-information"
            ><i class="line-icon-user"></i><span>{{ in_out }}</span></a>
          </div>
        </li>
      </ul>
    </div>
    <div class="nav-mobile__footer nav-mobile__link">
      <link-first/>
    </div>
    <LoginRegister ref="loginRegister"/>
  </div>
</template>

<script>
import AccountMenu from "./AccountMenu.vue";
import LinkFirst from "./LinkFirst.vue";
import LoginRegister from "../modals/LoginRegister.vue";

export default {
  name: 'NavMobile',
  components: {LoginRegister, LinkFirst, AccountMenu},
  data() {
    return {
      ulClass: 'submenu-list',
      open_arrow: false,
      open_menu: false,
      button_l_r: false,
    };
  },
  watch: {
    open_menu(newValue, oldValue) {
      return newValue;
    },
  },
  computed: {
    in_out: {
      get() {
        if (this.$store.state.is_login || this.$store.state.is_register) {
          this.button_l_r = true;
          return 'Аккаунт'
        } else {
          this.button_l_r = false;
          return 'Войти'
        }
      }
    },
    favourites: {
      get() {
        try {
          if (process.client) {
            const fv = this.$getLcStorage('favorites');
            if (fv)
              return fv.length
          }
          return []
        } catch (e) {
          return []
        }
      }
    }
  },
  methods: {
    handleCloseMenu(data) {
      this.open = data;
    },
    openMenu() {
      this.open_menu = !this.open_menu;
    },
    open() {
      this.$refs.accountMenu.openMenu();
      this.isActiveArrow()
    },
    isActiveArrow() {
      this.open_arrow = !this.open_arrow;
    },
    entrance() {
      this.$refs.loginRegister.closeDial();
    }
  }
}
</script>

<style lang="scss">
button.close {
  left: 90% !important;
  color: black;
  top: 2px;
}

.nav-mobile__link a {
  font-size: 18px
}

.dropdown-section-option button.selected i,
.dropdown-section-option button.selected span,
.dropdown-section-list .dropdown-section-option button:hover i,
.dropdown-section-list .dropdown-section-option button:hover span {
  color: #bd1343;
}

.notificat {
  background-color: transparent !important;
  top: 0 !important;
  padding: 0 !important;
  color: #fff !important;
  border: none !important;
}
</style>
