<template>
  <div id="aside-menu">
    <aside class="aside-menu">
      <header>Аккаунт</header>
      <nav>
        <ul>
          <li :class="item.class" v-for="(item, index) in menu" :key="index">
            <NuxtLink :to="item.href" :id="item.id" :class="{ active: isActive(item.href) }">
              {{ item.name }}<i class="icon-arrow-right-t1 mobile"></i></NuxtLink>
          </li>
        </ul>
      </nav>
    </aside>
  </div>
</template>

<script>
import API from '~/api/aside';

export default {
  name: 'AsideMenu',
  computed: {
    menu() {
      return API.getMenuAccount;
    },
  },
  methods: {
    isActive(route) {
      return this.$route.path === route;
    },
  },
}
</script>

<style>

</style>
