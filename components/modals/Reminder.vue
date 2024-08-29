<template>
  <!-- всплывающее окно будущих предложений-->

  <div class="reminder-modal" role="dialog">
    <div class="fade modal-backdrop in"></div>
    <div role="dialog" tabindex="-1" class="fade modalV2 push in modal" style="display: block; padding-right: 17px;">
      <div class="modal-dialog">
        <div class="modal-content" role="document">
          <button type="button" class="close close-notification-modal close-reminder" data-dismiss="modal"
                  aria-hidden="true"><i class="icon-close-light"></i></button>
          <div class="modal-body">
            <div>
              <p>Ваш запрос на напоминание был успешно выполнен</p>
              <p>Вы получите электронное письмо, когда откроется продажа</p>
            </div>
          </div>
          <div class="modal-footer">
            <div><em>—</em>
              <button class="btn pink">Получить уведомление</button>
              <span>Нет, спасибо</span></div>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
export default {
  name: 'Reminder'
}
</script>

<style scoped>

</style>
