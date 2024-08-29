<template>
  <transition name="fade" mode="out-in">
    <ul id="menu-list"
        @mouseleave="openMenuDesc(false)"
        @click="closeMenu()"
        v-show="open"
        :class="ulClass">
      <li class="menu-list__item menu-list__item--title"><span><span>Alex1</span></span></li>
      <li class="menu-list__item" v-for="(item, index) in menu" :key="index">
        <NuxtLink :to="item.href" :id="item.id" :class="{ active: isActive(item.href) }">
          <span>{{ item.name }}</span></NuxtLink>
      </li>
      <li><span class=" " style="cursor: pointer;"></span></li>
      <li class="menu-list__item menu-list__item--secondary logout-button-link"><a
        @click="outRegister"
        href="/"><span>Выход</span></a></li>
    </ul>
  </transition>
</template>

<script>
import API from '~/api/aside';

export default {
  name: 'AccountMenu',
  props: ['ulClass'],
  data() {
    return {
      open: false,
    };
  },
  computed: {
    menu() {
      return API.getMenuAccount;
    },
  },
  watch: {
    open(newValue, oldValue) {
      return newValue;
    }
  },
  methods: {
    outRegister() {
      this.$cookies.remove('token');
      this.$cookies.remove('email');
    },
    isActive(route) {
      return this.$route.path === route;
    },
    openMenu() {
      this.open = !this.open;
    },
    openMenuDesc(open) {
      this.open = open;
    },
    closeMenu() {
      this.$emit('close_menu', false);
    }
  },
}
</script>

<style>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s ease-in-out;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
