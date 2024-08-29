<template>
  <!-- Настройками файлов cookie -->
  <div id="cookieBanner" style="display: none;">
    <div class="BannerContainer">
      <div class="BannerContainer__description">
        <span>Управляйте настройками файлов cookie</span>
        <p>
          Нажимая «принять», вы соглашаетесь на использование аналитических файлов cookie, позволяющих нам
          отслеживать работу веб-сайта и с целью персонализации маркетингового контента и рекламы. Нажав <span
          class="cookie-usage">здесь</span>, вы можете управлять параметрами, которые вы хотите принять или
          отклонить, и получить дополнительную информацию о файлах cookie, которые мы используем.
        </p>
      </div>
      <div class="BannerContainer__buttons">
        <button class="Button Button--light Button--accept">Принять</button>
        <button class="Button Button--transparent Button--reject">Отклонить</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CookieBanner'
}
</script>

<style scoped>

</style>
