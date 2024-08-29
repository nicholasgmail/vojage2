<script>
export default {
  name: "WillShare",
  props: ['sale'],
  data() {
    return {
      close: false,
      base_url: process.env.BASE_URL,
      copy: false,
      message: '',
    }
  },
  mounted() {
    this.message = window.location.href;
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
    onCopy: function (e) {
      this.copy = true;
    },
    onError: function (e) {
    },
  }
}
</script>

<template>
  <div
    v-show="close"
    role="dialog">
    <div class="fade modal-backdrop in"></div>
    <div role="dialog" tabindex="-1" class="fade modalV2 share in modal">
      <div class="modal-dialog">
        <div class="modal-content" role="document" style="color: black">
          <button type="button"
                  @click="closeDial"
                  class="close" data-dismiss="modal" aria-hidden="true">
            <i class="icon-close-light" style="color: black"></i>
          </button>
          <div class="clearfix modal-body" style="padding: 0"><span
            class="text-white font-bold text-2xl text-center px-8 mt-20 absolute">
            Поделитесь этим предложением с друзьями и семьей</span>
            <article
              class="container">
              <div class="flex flex-col">
                <div><img class="room_image" alt="" :src="base_url + sale['main_image']">
                </div>
                <div class="w-full p-4">
                  <div class="flex flex-col">
                    <div class="border-solid  border-b border-neutral-200">
                      <div class="sale-destination  border-neutral-200">
                      <span>{{ sale["country"] }} / {{
                          sale["city"]
                        }}</span><span
                        class="hotel-name" style="border:0">{{ sale["name"] }}</span>
                      </div>
                      <div>
                        <span class="ribbon-content" style="border:0; height: 49px;"><span
                          class="label pct ribbon-txt-1 ">Скидка до</span> <span
                          class="price  ribbon-txt-2">-{{ sale["sale_up_to"] }}%</span> </span>
                      </div>
                    </div>
                    <div>
                      <div class="flex flex-col sm:flex-row p-2 text-lg">
                        <a
                          v-clipboard:copy="message"
                          v-clipboard:success="onCopy"
                          v-clipboard:error="onError"
                          class="first checked center_block mb-4 mr-3"><i class="icon-link"></i><span
                          class="button-text ml-3 underlined-text underline-offset-8">Копировать!</span>
                          <i v-show="copy"
                             class="icon-check"></i></a>
                        <a href="https://wa.me/79804136407/?text=FYТУР"
                           class="center_block mb-4 mr-3"
                           target="_blank">
                          <i class="icon-whatsapp"></i><span
                          class=" ml-3 underlined-text underline-offset-8">WhatsApp</span></a>
                        <a class="center_block mb-4"
                           href="https://t.me/Futturdv" title="instagram" target="_blank">
                          <svg viewBox="0 -24 512 512"
                               style="width: 22px; margin-right: 10px;"
                               xmlns="http://www.w3.org/2000/svg">
                            <path
                              d="m512 0-512 217.628906 134.222656 53.269532 47.78125 179.605468 87.980469-85.246094 143.132813 98.855469zm-323.023438 293.921875-5.167968 46.828125-19.839844-74.589844 186.898438-127.296875zm168.003907-195.472656-212.082031 144.449219-66.070313-26.21875zm-147.609375 283.816406 6.039062-54.703125 29.433594 20.332031zm17.527344-83.179687 239.648437-229.535157-73.371094 344.375zm0 0"/>
                          </svg>
                          <span class="button-text underlined-text underline-offset-8">Telegram</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.modalV2.share .modal-content .modal-body button svg {
  font-size: 22px;
  float: left;
  margin: 10px;
}

.center_block {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.nameSideBarBlock {
  &.description {
    padding-top: 0;
    color: inherit;
    font-weight: normal;
    font-size: 12px;
  }
}

.hidden_body {
  overflow: hidden;
}

.room_image {
  width: 100%;
  height: 100%;
  object-fit: none;
}

.modal-body {
  figure {
    height: 65%;
  }
}

@media (max-width: 575.98px) {
  .modal-body {
    figure {
      height: auto;
    }

    .button_first {
      width: auto !important;
      font-size: 15px;
      padding-right: 5px;

      &::after {
        content: none !important;
      }
    }
  }
}

button.close {
  left: 90% !important;
}
</style>
