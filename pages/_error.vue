<script>
export default {
  name: "error",
  layout: "Help",
  head() {
    return {
      link: [
        {rel: 'stylesheet', type: 'text/css', href: 'css/error.css'},
      ]
    }
  },
}
</script>

<template>
  <div>
    <div class="bkg-img">
    </div>
    <div class="error_message">
      <h1 class="error_message_title">
        Страница, которую вы ищете, не может быть найдена.</h1>
      <em>___</em>

      <p class="error_message_txt">
        Зайдите на наш веб-сайт, чтобы ознакомиться с нашим исключительным выбором предложений!</p>

      <a :href="$router.options.base" class="btn black">
        Ознакомьтесь с нашими последними предложениями
      </a>
    </div>
  </div>
</template>
