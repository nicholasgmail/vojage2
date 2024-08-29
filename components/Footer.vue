<template>
  <!-- footer -->
  <div id="footerContainer">
    <footer id="footer">
      <div class="page-center">
        <section id="footer-detail" class="footer-detail clearfix">
          <div class="footer-detail-container">
            <span class="footer-detail-title"><i class="icon-macaron"></i><span>Контакты</span></span>
            <ul class="list-unstyled">
              <li class="footer_tell">
                <a class="underlined-text" href="https://wa.me/79804136407/?text=FYТУР" target="_blank">связаться в
                  Whatsapp</a>
                <a class="underlined-text" href="https://t.me/Futturdv" target="_blank">связаться в Telegram</a>
              </li>
            </ul>
            <ul class="list-unstyled">
              <li class="footer_mail"><i class="fa fa-envelope" aria-hidden="true"></i> <a class="underlined-text"
                                                                                           href=""
                                                                                           onclick="javascript:window.open('mailto:info@futturdv.ru', 'Mail');event.preventDefault()">info@futturdv.ru</a>
              </li>
            </ul>
            <div class="work_time_all fl">
              <i class="fa fa-map-marker" aria-hidden="true"></i>
              <ul class="list-unstyled">
                <li class="work_time adress">
                  +7 (901) 468-01-68
                </li>
              </ul>
            </div>
          </div>
          <div class="footer-detail-container">
            <span class="footer-detail-title"><i class="icon-label"></i><span>Лучшие скидки</span></span>
            <p class="footer-detail-text">Эксклюзивные цены и исключительные <br> скидки до 70%</p>
          </div>
          <div class="footer-detail-container">
            <a target="cgv"
               href="https://tourism.gov.ru/reestry/reestr-turoperatorov/show.php?id=99861">
              <span class="footer-detail-title"><i
                class="icon-expert"></i><span
                class="underlined-text">Мы в реестре туроператоров<br> РТО 019920</span></span>
            </a>
          </div>
        </section>
        <section id="footer-link" class="footer-link clearfix">
          <div class="footer-link-container hidden-tablet menu-link-first">
            <link-first/>
          </div>
          <div class="footer-link-container payment hidden-phone">
            <p class="payment-title"></p>
          </div>
        </section>
        <section id="footer-atol" class="footer-atol clearfix">
          <div class="footer-atol-text">
            <p style="margin-top: 15px"><strong>Общество с ограниченной ответственностью</strong>
              <a target="cgv"
                 class="underlined-text"
                 href="https://tourism.gov.ru/reestry/reestr-turoperatorov/show.php?id=99861">
                "Туристическая фирма "Футур",<br> ИНН 2540151512 ОГРН 1092540000618
              </a>
            </p>
          </div>
        </section>
      </div>
    </footer>
    <client-only>
      <!-- Yandex.Metrika counter -->
      <script type="text/javascript">
        (function (m, e, t, r, i, k, a) {
          m[i] = m[i] || function () {
            (m[i].a = m[i].a || []).push(arguments)
          };
          m[i].l = 1 * new Date();
          for (var j = 0; j < document.scripts.length; j++) {
            if (document.scripts[j].src === r) {
              return;
            }
          }
          k = e.createElement(t), a = e.getElementsByTagName(t)[0], k.async = 1, k.src = r, a.parentNode.insertBefore(k, a)
        })
        (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

        ym(96759432, "init", {
          clickmap: true,
          trackLinks: true,
          accurateTrackBounce: true,
          webvisor: true,
          ecommerce: "dataLayer"
        });
      </script>
      <noscript>
        <div><img src="https://mc.yandex.ru/watch/96759432" style="position:absolute; left:-9999px;" alt=""/></div>
      </noscript>
      <!-- /Yandex.Metrika counter -->
    </client-only>
  </div>
</template>

<script>
import LinkFirst from "./menu/LinkFirst.vue";
import LinkSecond from "./menu/LinkSecond.vue";

export default {
  name: 'FooterAll',
  components: {LinkSecond, LinkFirst},
}
</script>

<style lang="scss" scoped>
@media (max-width: 575.98px) {
  #footer .footer-link .footer-link-container.menu-link-first, #footer .footer-link .footer-link-container.menu-link-second {
    display: flex;
    align-items: center;
    width: 100%;
    justify-content: center;
  }
  .footer-link-container {
    ul {
      align-items: center;
      line-height: 3px;
    }
  }
}
</style>
