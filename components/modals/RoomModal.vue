<script>
export default {
  name: "RoomModal",
  props: ["room"],
  data() {
    return {
      close: false,
      base_url: process.env.BASE_URL
    }
  },
  methods: {
    closeDial() {
      this.close = !this.close;
      if (this.close) {
        document.body.classList.add('hidden_body');
      } else {
        document.body.classList.remove('hidden_body');
      }
    },
    adultsRoom(room) {
      if (room['adults_capacity'] + room['children_capacity'] > 0) {
        return room['adults_capacity'] + room['children_capacity']
      }
    },
    numberMeter(number) {
      if (number) {
        const lastParenthesisIndex = number.lastIndexOf('(');

        if (lastParenthesisIndex !== -1) {
          const areaString = number.slice(lastParenthesisIndex + 1, -3);
          return parseInt(areaString, 10);
        }
      }
    }
  }
}
</script>

<template>
  <!-- модальное окно детальнее -->
  <div v-show="close">
    <div class="">
      <div class="modal fade show" role="dialog" tabindex="-1" style="display: block;">
        <div class="modal-dialog room-details-dialog" role="document">
          <div class="modal-content">
            <button
              @click="closeDial"
              type="button" class="Modal__btn-close" data-dismiss="modal" aria-hidden="true">
								<span>
									<span class="Modal__btn-close__text hidden-mobile">Закрыть</span>
									<i class="Modal__btn-close__icon line-icon-times"></i>
								</span>
            </button>
            <div class="RoomDetails__modal modal-body">
              <div class="RoomDetails__details">
                <div class="RoomDetails__picture left">
                  <div class="modal-room-slider">
                    <div>
                      <img class="lazyload" alt=""
                           :data-src="base_url + room['image']"
                           :data-srcset="base_url + room['image']"
                           :src="base_url + room['image']">
                    </div>
                    <div>
                      <img class=" lazyload " alt=""
                           data-src="https://images2.bovpg.net/fw/media/1/5/3/7/6/537611.jpg"
                           data-srcset="https://images2.bovpg.net/fw/media/1/5/3/7/6/537611.jpg 1x, https://images2.bovpg.net/fw2x/media/1/5/3/7/6/537611.jpg 2x"
                           src="https://images2.bovpg.net/fw/media/1/5/3/7/6/537611.jpg">
                    </div>
                  </div>
                </div>
                <div class="RoomDetails__content">
                  <div class="RoomDetails__title">{{ room['name'] }}</div>
                  <div class="RoomDetails__textDescription">
                    <p>{{ room['description'] }}</p>
                  </div>
                  <div class="RoomDetails__flex">
                    <div class="RoomDetails__property">
                      <div><i class="line-icon-bed-double"></i></div>
                      <div>1 double bed ou 2 single beds</div>
                    </div>
                    <div class="RoomDetails__property">
                      <div><i class="line-icon-bed-double"></i></div>
                      <div>1 double bed ou 2 single beds</div>
                    </div>
                    <div class="RoomDetails__property">
                      <div><i class="line-icon-area"></i></div>
                      <div>{{ numberMeter(room["name"]) }} m2</div>
                    </div>
                    <div class="RoomDetails__property">
                      <div><i v-for="item in adultsRoom(room)"
                              class="line-icon-family-adult"></i></div>
                      <div>{{ adultsRoom(room) }} гостя максимум</div>
                    </div>
                    <div v-if="room['infants']" class="RoomDetails__property">
                      <div>
                        <i class="line-icon-bed-baby"></i></div>
                      <div>детская кроватка</div>
                    </div>
                  </div>
                  <div class="RoomDetails__equipment__title">Equipment</div>
                  <ol class="RoomDetails__liste">
                    <li>Air conditioning</li>
                    <li>Safe</li>
                    <li>Shower</li>
                    <li>Minifridge</li>
                    <li>TV</li>
                    <li>Hairdryer</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="modal-backdrop fade show"></div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.hidden_body {
  overflow: hidden;
}

</style>
