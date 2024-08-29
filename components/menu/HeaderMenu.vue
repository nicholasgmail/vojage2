<template>
  <nav class="header-menu">
    <ul id="menu">
      <li class="menu-item" :class="{ active: isActive('/favourites') }">
        <NuxtLink to="/favourites" class="menu-link"><i
          :class="{'notification': favourites}"
          class="line-icon-heart notificat"></i><span>Избранное</span></NuxtLink>
      </li>
      <li class="menu-item" :class="{ active: isActive('/orders-search') }">
        <NuxtLink to="/orders-search" class="menu-link"><i
          class="false line-icon-suitcase"></i><span>Бронь</span></NuxtLink>
      </li>
      <li class="menu-item" :class="{ active: isActive('helpers') }">
        <NuxtLink to="helpers" class="menu-link"><i
          class="false line-icon-comment"></i><span>Новости</span></NuxtLink>
      </li>
      <li class="menu-item menu-link-item" :class="
      { active: isActive('account-information') || isActive('account-companions') || isActive('account-messages') || isActive('account-travelmap') || isActive('account-settings') || isActive('account-alerts') || isActive('account-referrals') || isActive('account-credit') || isActive('account-card')}">
        <div>
          <div
            @click="entrance"
            v-if="!button_l_r"
            v-show="!button_l_r"
            class="menu-link">
            <i class="false line-icon-user"></i><span>
            <span>{{ in_out }}</span></span>
          </div>
          <a
            v-if="button_l_r"
            v-show="button_l_r"
            href="/account-information"
            class="menu-link">
            <i class="false line-icon-user"></i><span>
            <span>{{ in_out }}</span></span>
          </a>
        </div>
      </li>
    </ul>
    <LoginRegister ref="loginRegister"/>
  </nav>
</template>

<script>
import AccountMenu from "./AccountMenu.vue";
import LoginRegister from "../modals/LoginRegister.vue";

export default {
  name: 'HeaderMenu',
  components: {LoginRegister, AccountMenu},
  data() {
    return {
      ulClass: 'menu-list',
      isMenuVisible: false,
      button_l_r: false,
    };
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
            if (fv && this.$route.name !== 'favourites') {
              return fv.length > 0;
            }
            return false;
          }
        } catch (e) {
          return false;
        }
      }
    }
  },
  methods: {
    isActive(route) {
      return this.$route.path === route;
    },
    entrance() {
      this.$refs.loginRegister.closeDial();
    }
  },
}
</script>

<style lang="scss">
.notificat {
  background-color: transparent !important;
  top: 0 !important;
  padding: 0 !important;
  color: #fff !important;
  border: none !important;
}
</style>
