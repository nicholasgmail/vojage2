<template>
  <div id="navigationBar">
    <div id="header-container" class="header-container-logged"
         :class="headerClasses">
      <header id="header" class="common logged merchsdv"
              :class="loggedClasses">
        <div class="branch-journeys-top"></div>
        <div class="page-center logged clearfix">
          <div class="logo-container">
            <div class="backSDV">
              <a href="/"><i class="line-icon-arrow-left"></i></a>
            </div>
            <a href="/" id="logo" class="logo" aria-label="Home" target="" rel="noreferrer noopener">
              <figure class="logo-figure">
                <img class="dark white" alt="FYТУР" width="234" src="/images/logo-vp-white.png">
              </figure>
            </a>
            <nav class="header-right-mobile">
              <div>
                <NuxtLink to="/favourites" class=" shortcut "><i class="false line-icon-heart"></i></NuxtLink>
                <button
                  @click="openNavMobile()"
                  class="shortcut"><i class="line-icon-bars"></i></button>
              </div>
            </nav>
          </div>
          <!-- Навигация в шапке -->
          <header-menu/>
          <nav-mobile
            ref="navMobile"
          />
        </div>
      </header>
    </div>
  </div>
</template>

<script>
import HeaderMenu from "./menu/HeaderMenu.vue";
import NavMobile from "./menu/NavMobile.vue";

export default {
  name: 'HeaderAll',
  components: {NavMobile, HeaderMenu},
  head() {
    let link;
    link = [
      {rel: 'stylesheet', type: 'text/css', href: '/css/login.css'}
    ]
    return {
      link: link,
    }
  },
  computed: {
    headerClasses() {
      if (this.$route.path === "/")
        return 'homepage';
      return 'order';
    },
    loggedClasses() {
      if (this.$route.path !== "/")
        return 'white fixed-bar';
    },
  },
  methods: {
    openNavMobile() {
      this.$refs.navMobile.openMenu();
    }
  }
}
</script>

<style lang="scss">
.nav-mobile {
  display: block;
}
</style>
