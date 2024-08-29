<script>
export default {
  name: "DetailsDouble",
  props: ['sale'],
  data() {
    return {
      without_flight: this.sale.min_price_price_without_flight.price,
      with_flight: this.sale.min_price_price_with_flight.price,
      up_to: this.sale.sale_up_to,
      with_flight_duration: this.sale.min_price_price_with_flight.duration,
      without_flight_duration: this.sale.min_price_price_without_flight.duration,
    }
  }
}
</script>

<template>
  <div class="block-details block-details-double">
    <div class="details details-left">
      <h4>Без перелёта</h4>
      <div class="best-price-details">
        <span class="offer-label"> От</span>
        <div style="display: inline-flex;">
          <span class="offer-price details-price pound">
            ₽{{ Math.trunc(without_flight) }}
          </span>
          <span class="price-type">/чел <span></span></span>
        </div>
        <div class="clearfix"></div>
        <div class="offer-insteadOf">вместо
          <del><strong>
            ₽{{ Math.trunc(without_flight + without_flight * up_to / 100) }}
          </strong></del>
        </div>
        <div v-if="without_flight_duration > 1" class="offer-duration">за
          <span>{{ without_flight_duration }} ночей</span></div>
        <div v-else class="offer-duration">за <span>{{ Math.trunc(without_flight_duration) }} ночь</span></div>
      </div>
    </div>
    <div class="details details-right">
      <h4>С перелётом<i class="line-icon-plane"></i></h4>
      <div class="best-price-details">
        <span class="offer-label"> От</span>
        <div style="display: inline-flex;">
          <span class="offer-price details-price pound">
            ₽{{ Math.trunc(with_flight) }}
          </span><span
          class="price-type">/чел <span></span></span>
        </div>
        <div class="clearfix"></div>
        <div class="offer-insteadOf">вместо
          <del><strong>₽{{ Math.trunc(with_flight + with_flight * up_to / 100) }}</strong></del>
        </div>
        <div v-if="with_flight_duration > 1" class="offer-duration">за
          <span>{{ with_flight_duration }} ночей</span></div>
        <div v-else class="offer-duration">за
          <span>{{ with_flight_duration }} ночь</span>
        </div>
      </div>
    </div>
    <div class="clear-both"></div>
  </div>
</template>

<style scoped>

</style>
