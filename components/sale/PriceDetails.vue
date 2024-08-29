<script>
export default {
  name: "PriceDetails",
  props: {
    details: {
      type: String
    },
    not_include: {
      type: Boolean,
      default: true,
    },
  },
  mounted() {
    var elements = [...this.$refs.detailsPrice.children];
    if (elements.length > 0) {
      elements[0].classList.add('offer-block-list', 'SummaryDetail__list', 'offer-price-list');
      let children = [...elements[0].children];
      for (var i = 0; i < children.length; i++) {
        children[i].classList.add('offer-block-list-item');
      }
    }
  }
}
</script>

<template>
  <div class="price-details  expanded">
    <h5 class="include SummaryDetail__title">Цена предложения включает :</h5>
    <div ref="detailsPrice" v-html="details">
    </div>
    <h5 v-if="not_include" class="exclude">Цена предложения не включает :</h5>
    <ul v-if="not_include" class="offer-block-list offer-price-list">
      <li class="offer-block-list-item">Экскурсии и дополнительные услуги,
        если не указано иное
      </li>
      <li class="offer-block-list-item">Личное страхование путешественников
      </li>
      <li class="offer-block-list-item">Местные налоги и сборы, если не указано иное
      </li>
    </ul>
  </div>
</template>

<style scoped>

</style>
