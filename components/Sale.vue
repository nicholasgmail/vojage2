<!-- Please remove this file from your project -->
<template>
  <section id="page-container"
           class="sale-sale">
    <div class="page-center">
      <section id="wrapper_container">
        <div id="aside-menu"></div>
        <main class="page-col-right">
          <div id="app">
            <section>
              <div id="sale-banner">
                <section id="sale-description">
                  <div
                    v-if="sale.images"
                    id="PPslider" class="sliderContainer">
                    <div id="slider-sale">
                      <div id="FSslider">
                        <!-- Информационные элементы слайдера -->
                        <div class="content-bottom-left">
                          <div id="mask"></div>
                          <div class="slide-description">
																<span class="image-description">
																	<span class="number-legend"><span class="current-slide">{{ index_slide }}</span>/
                                    <span
                                      v-if="sale.images.length > 3"
                                      class="total-slides">{{ sale.images.length }}</span>
                                    <span
                                      v-else
                                      class="total-slides">{{ sale.images.length * 2 }}</span></span>
																</span>
                          </div>
                          <button
                            @click="closeDialGalery"
                            class="slide-description-mosaic">
																<span class="all-image-legend">
																	<span class="text-legend">Посмотреть все фотографии</span>
																</span>
                          </button>
                        </div>
                        <!-- Слайдер -->
                        <div class="single-item">
                          <VueSlickCarousel
                            v-bind="settings_one"
                            @afterChange="currentSlide">
                            <div
                              v-for="item in sale_images"
                              class="open-modal--mosaic">
                              <img :src="`${base_url}${item.image}`" :title="sale.sale_description">
                            </div>
                            <template v-if="sale_images.length <= 3">
                              <div v-for="(item, index) in sale_images" :key="index"
                                   class="open-modal--mosaic">
                                <img :src="`${base_url}${item.image}`"
                                     :title="sale.sale_description">
                              </div>
                            </template>

                          </VueSlickCarousel>
                        </div>
                      </div>
                    </div>
                  </div>
                  <!-- кнопки поделиться и избранное -->
                  <div class="sale-share-fav">
                    <button class="sale-favorite vpgTooltip-link noguest guestOriginFavorites"
                            @click="addFavorites"
                            data-tooltip="Добавить в избранное"><span><i class="line-icon-heart"></i></span>
                    </button>
                    <button
                      @click="closeDialShare"
                      class="sale-share vpgTooltip-link share-button" data-tooltip="Поделиться"><span><i
                      class="line-icon-share"></i></span></button>
                  </div>
                  <!-- краткая информация на слайдере -->
                  <div class="sale-helmet-right sale-helmet-offer-bloc">
                    <div class="sale-time-price">
                      <div class="sale-time-remaining  specific-not-near ">
                        <i class="line-icon-clock"></i>
                        <span v-if="sale.sale_description" class="sale-schedule">
															<span class="time sale_description">
                                {{ sale.sale_description.substring(0, 54) }}</span>
														</span>
                      </div>
                      <div class="offer-price-tag-middle ribbonChild">
														<span class="ribbon-content">
															<span class="label pct ribbon-txt-1 ">скидки до </span>
															<span class="price  ribbon-txt-2">-{{ sale.sale_up_to }}%</span> <span></span>
														</span>
                      </div>
                    </div>
                  </div>
                  <!-- Заголовок -->
                  <div class="sale-helmet-left">
                    <div class="sale-title">
                      <h2>{{ sale.country }} / {{ sale.city }}</h2>
                      <h1>{{ sale.name }}</h1>
                    </div>
                    <div class="sale-helmet-left__links">
                      <div
                        @click="closeDial"
                        class="sale-map"><i class="line-icon-map"></i><span>Посмотреть местоположение</span>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
              <section id="sale-content" class="clearfix">
                <div class="block-mobile">
                  <reviews v-if="sale.avg_score > 0" :hotel_reviews="sale.hotel_reviews"/>
                </div>
                <div id="content-panel">
                  <!-- левая панель -->
                  <section id="left-panel" class="sale-container">
                    <div class="block-desktop">
                      <reviews v-if="sale.avg_score > 0" :hotel_reviews="sale.hotel_reviews"/>
                    </div>
                    <div
                      v-if="sale.we_love"
                      id="opinion">
                      <div class="welike">
                        <span style="font-size: 0px;"></span>
                        <h4>Преимущества отеля<em>—</em></h4>
                        <div v-html="sale.we_love"></div>
                      </div>
                    </div>
                    <section id="content-tabs">
                      <div class="tab">
                        <button class="tab-button open" title="presentation" data-tab="tab-content-presentation">
                          <span>Об отеле</span></button>
                      </div>
                      <div v-if="sale.details !== null" class="tab">
                        <button class="tab-button " title="details" data-tab="tab-content-details">
                          <span>Детали</span></button>
                      </div>
                      <div v-if="sale.formalities !== null" class="tab">
                        <button class="tab-button " title="formalities" data-tab="tab-content-formalities"><span>О стране и курорте</span>
                        </button>
                      </div>
                    </section>
                    <!-- подменю прижатое к верху, появляется при прокрутке -->
                    <section
                      id="content-tabs-stacked">
                      <div class="page-center">

                        <div
                          class="sale-container">
                          <div class="tab">
                            <button
                              class="tab-button open"
                              data-tab="tab-content-presentation"
                              title="presentation"><span>Об отеле</span></button>
                          </div>
                          <div class="tab">
                            <button class="tab-button " data-tab="tab-content-details" title="details">
                              <span>Детали</span>
                            </button>
                          </div>
                          <div class="tab">
                            <button class="tab-button " data-tab="tab-content-formalities" title="formalities">
                              <span>О стране и курорте</span></button>
                          </div>
                        </div>
                        <div class="sale-helmet-right" id="sale-description">
                          <div class="sale-time-price">
                            <div class="sale-time-remaining  specific-not-near ">
                              <i class="line-icon-clock"></i><span class="sale-schedule"><span
                              class="time">{{ sale.small_description }}</span><span
                              class="time-notice">{{ sale.sale_description.substring(0, 54) }}</span></span>
                            </div>
                            <div class="offer-price-tag-middle ribbonChild">
                                    <span class="ribbon-content"><span class="label pct ribbon-txt-1 ">Скидка до </span> <span
                                      class="price  ribbon-txt-2">-{{ sale.sale_up_to }}%</span> <span></span></span>
                            </div>
                          </div>
                        </div>
                        <!--v-show="offer_block"-->
                        <div
                          id="openOfferBlock"
                          style="display: none"
                          class="open-offer-block">
                          <div class="offerblock-header hidden-mobile"><h2> Бронирование тура</h2></div>
                          <div class="new-offer-bloc">
                            <div class="offer-box-details">
                              <div class="block-details-container">
                                <div>
                                  <details-double
                                    :sale="sale"/>
                                </div>
                                <div class="clear-both"></div>
                              </div>
                              <a
                                @click="scrollToTop"
                                class="btn pink seo-signup">К просчету стоимости</a></div>
                          </div>
                          <div id="react-shareButton" class="block-desktop">
                            <button
                              @click="closeDialShare"
                              data-tooltip="Поделиться" class="sale-share vpgTooltip-link share-button">
                              <span><i class="line-icon-share"></i></span></button>
                          </div>
                          <banner_info2/>
                        </div>
                      </div>
                    </section>
                    <!--  -->
                    <div v-once id="tab-content">
                      <div id="tab-content-presentation" class="tab-content presentation">
                        <div>
                          <div class="paragraphs">
                            <div
                              v-for="(item, index) in hotel_text_blocks"
                              :key="index"
                              v-if="item.youtube_link && item.images == null"
                              class="clearfix paragraph-video">
                              <h4>{{ item.title }} <em>—</em></h4>
                              <div
                                ref="iframeYoutube"
                                v-html="item.youtube_link"
                                class="video">
                              </div>
                            </div>
                            <template
                              v-if="!item.youtube_link || item.youtube_link == null"
                              v-for="(item, index) in hotel_text_blocks">
                              <div
                                v-if="item.text !== null"
                                class="clearfix paragraph-title tag-rendezVous">
                                <div class="title-only title-with-triplabel"><h4>{{ item.title }} <em>—</em></h4>
                                </div>
                              </div>
                              <div class="clearfix paragraph-imageText">
                                <div v-show="item.image !== null" class="left image">
                                  <img class="lazyloaded" :src=getImageUrl(item.image)>
                                </div>
                                <div v-if="item.text !== null" class="p">
                                  <div class="block" v-html="item.text">
                                  </div>
                                </div>
                              </div>
                              <template v-if="index === 0">
                                <template v-if="sale.longitude && sale.latitude">
                                  <div class="clearfix paragraph-title tag-location">
                                    <div class="title-only title-with-triplabel">
                                      <h4>Географическое положение <em>—</em></h4>
                                    </div>
                                  </div>
                                  <div class="clearfix paragraph-imageText tag-locationMapPicture">
                                    <div class="left image"><img class="lazyloaded" alt=""
                                                                 loading="lazy"
                                                                 :src="`https://api.mapbox.com/styles/v1/mapbox/streets-v12/static/pin-s+555555(${sale.longitude},${sale.latitude})/${sale.longitude},${sale.latitude},13,0/500x400?access_token=pk.eyJ1Ijoidm95YWdldm95YWdlMSIsImEiOiJjbG5vY2pnbjgwaDNoMmtvZGhld2dtamxlIn0.I1ZefmSbGwtDxyexzf-8-A`">
                                      <div id="mapDial" class="mapZoom"><span>Открыть карту</span></div>
                                    </div>
                                    <div class="p"><span class="block"></span></div>
                                  </div>
                                </template>
                                <div class="clearfix paragraph-title tag-tripTo">
                                  <div class="title-only title-with-triplabel">
                                    <h4>{{ sale.name }}<em>—</em></h4>
                                  </div>
                                </div>
                                <div class="clearfix paragraph-subtitle">
                                  <div class="subtitle">ПЕРЕЛЁТ:</div>
                                </div>
                                <div class="clearfix paragraph-text">
                                  <div class="left">
                                    <div>
                                      <figure class="icon"><i class="line-icon-plane"></i></figure>
                                    </div>
                                  </div>
                                  <div class="right">
                                    <div class="p ">
                                      <span class="block"><p><strong>
                                        При бронировании тура с перелётом на следующем этапе Вы сможете выбрать один из доступных рейсов в данный отель.</strong>
                                        Рейс может включать промежуточную посадку.
                                        Посадка может быть технической (без смены воздушного судна) или транзитной (со сменой воздушного судна).   </p></span>
                                    </div>
                                  </div>
                                </div>
                                <div class="clearfix paragraph-subtitle">
                                  <div class="subtitle">ТРАНСФЕР:</div>
                                </div>
                                <div class="clearfix paragraph-text">
                                  <div class="left">
                                    <div>
                                      <figure class="icon"><i class="icon-bus"></i></figure>
                                    </div>
                                  </div>
                                  <div class="right">
                                    <div class="p">
                                      <span class="block"><p><strong>
                                       При бронировании тура с перелётом в данный отель трансфер в обе стороны включен в стоимость.</strong>
                                        Тип трансфера зависит от местоположения отеля. Информация о трансфере указана в разделе "Только для Вас". В аэропорту прибытия Вас встретит представитель отеля или транспортной компании.
                                        Повысить категорию трансфера (при наличии такой возможности) Вы сможете на следующем этапе бронирования.
                                      </p></span>
                                    </div>
                                  </div>
                                </div>
                                <div class="clearfix paragraph-subtitle">
                                  <div class="subtitle">Информация о багаже</div>
                                </div>
                                <div class="clearfix paragraph-text">
                                  <div class="left">
                                    <div>
                                      <figure class="icon"><i class="line-icon-suitcase"></i></figure>
                                    </div>
                                  </div>
                                  <div class="right">
                                    <div class="p">
																			<span class="block">
                                        <p>Ваш тариф включает провоз  зарегистрированного багажа и ручной клади в салоне самолёта. </p>
                                        <p>Максимально допустимый вес указан на странице выбора авиакомпании. </p>
                                        <p>За питание и другие услуги на борту некоторых рейсов может взиматься плата.   </p>
                                        <p>После бронирования Вы получите всю необходимую информацию для регистрации на рейсы не позднее 72 часов до даты вылета</p>
																			</span>
                                    </div>
                                  </div>
                                </div>
                              </template>
                            </template>
                            <div class="clearfix paragraph-title tag-room">
                              <div class="title-only title-with-triplabel">
                                <h4>Варианты размещения<em>—</em></h4>
                              </div>
                            </div>
                            <div class="clearfix paragraph-text">
                              <div class="p">
																		<span class="block">
																			<p>Это предложение основано на выборе между
                                        <strong v-for="(item, index) in room_types">{{ item["name"] }}, </strong>.</p>
																		</span>
                              </div>
                            </div>
                            <template
                              v-for="(item, index) in room_types">
                              <div class="clearfix paragraph-subtitle">
                                <div class="subtitle">{{ item["name"] }}</div>
                              </div>
                              <div class="clearfix paragraph-imageText">
                                <div class="left image">
                                  <div class="room-slider">
                                    <div><img class="lazyloaded" loading="lazy"
                                              :data-src=getImageUrl(item)
                                              :data-srcset=getImageUrl(item)
                                              :src=getImageUrl(item)></div>
                                  </div>
                                </div>
                                <div class="p"><span class="block"><p>
                                  {{ item["description"] }}
                                </p></span>
                                </div>
                              </div>
                              <div class="clearfix paragraph-occupancy">
                                <div class="inline">
                                  <div class="p">
                                    <span class="block">Максимальная вместимость номера</span>
                                  </div>
                                  <span class="occupancy-paxs">
                                    <span v-if="item['adults_capacity_option'] > 0" class="pax adult">
                                      <i v-for="(it, index) in item['adults_capacity_option']" :key="index"
                                         class="line-icon-family-adult"></i>
                                      <span class="pax-name">{{ item['adults_capacity_option'] }} взрослых</span></span>
																		</span>
                                  <span v-if="item['adults_capacity_option'] > 0" class="occupancy-separator">или</span>
                                  <span v-if="item['adults_capacity'] > 0" class="pax adult">
                                    <i
                                      v-for="(it, index) in item['adults_capacity']" :key="index"
                                      class="line-icon-family-adult"></i>
																				<span class="pax-name">{{ item['adults_capacity'] }} взрослых</span>
																			</span>
                                  <span v-if="item['children_capacity'] > 0" class="plus">+</span>
                                  <span v-if="item['children_capacity'] > 0" class="pax child"><i
                                    v-for="(it, index) in item['children_capacity']" :key="index"
                                    class="line-icon-family-child"></i>
																				<span
                                          v-if="item['children_capacity'] === 1"
                                          class="pax-name">{{ item["children_capacity"] }} ребёнок</span>
																				<span
                                          v-else
                                          class="pax-name">{{ item["children_capacity"] }} ребёнка</span>
																			</span>
                                </div>
                              </div>
                            </template>
                          </div>
                        </div>
                      </div>
                      <details-tab v-if="sale.details !== null" :details="sale.details"/>
                      <formalities-tab v-if="sale.formalities !== null" :formalities="sale.formalities"/>
                    </div>

                    <div class="mobile_on">
                      <a
                        @click="scrollToSumm()"
                        style="display: none; cursor:pointer"
                        id="best-offer">К просчёту стоимости</a>
                    </div>
                    <div id="commitments">
                      <div>
                        <h2 class="section-title">Ваши гарантии</h2>
                        <figure class="commitments-figure"><img :src="path + 'images/picto-commitments-uk.png'"
                                                                alt="commitment"></figure>
                        <ul class="bullet-points">
                          <li>Мы являемся официально зарегистрированным туроператором</li>
                          <li>Туристический продукт, приобретенный у нашей компании, застрахован и покрывается
                            банковской гарантией на сумму 10 000 000₽
                          </li>
                          <li>Менеджер неотложной помощи нашим туристам в случае форс мажора работает круглосуточно и
                            без выходных
                          </li>
                        </ul>
                        <div class="more-text-container">
                          <a target="cgv"
                             href="https://tourism.gov.ru/reestry/reestr-turoperatorov/show.php?id=99861">
                            <button
                              style="color: #bd1343;"
                              class="commitments-guideline-expend underlined-text">
                              Мы в реестре туроператоров
                            </button>
                          </a>
                        </div>
                      </div>
                    </div>
                    <div id="helpMe">
                      <div>
                        <h2 class="ph-title section-title">Нужна помощь?</h2>
                        <p class="ph_content">
                          <span class="left-content"><i class="line-icon-phone"></i></span>
                          <span class="right-content">
																<span class="text-content">За помощью и консультацией обращайтесь  к <a
                                  href="https://wa.me/79804136407/?text=FYТУР" class="underline">Нашим специалистам</a>.
                                  Они приложат все усилия чтобы удовлетворить ваш запрос.</span>
															</span>
                        </p>
                      </div>
                    </div>
                  </section>
                  <!-- правая панель -->
                  <section id="right-panel"
                           :class="{'al-self': ds_flex}"
                           class="sale-container">
                    <div>
                      <div id="react-offerblocks">
                        <div class="offer_block_list">
                          <div id="fullscreen-hoc"
                               :class="{'open': open_fullscreen}"
                               v-show="open_fullscreen"
                               class="fullscreen">
                            <button
                              @click="isOpen"
                              class="fh-close-popup mode-back"><i class="line-icon-arrow-left"></i></button>
                            <div id="fullscreen-hoc-bloc">
                              <div id="fh-title" class="fh-title OFFER">Бронирование тура</div>
                              <div v-if="tour_durations" id="fh-content">
                                <div id="offer-block-1" class="offer-block-1 offer-block offer-block-mobile">
                                  <div class="searchFilterMobile search-result-dashboard state-open">
                                    <div id="mobCont" class="offer_sections block-visible">
                                      <div id="section-transport"
                                           :class="{'completedSection': depature_city}"
                                           class="section-transport box-section activeSection">
                                        <div class="head">
                                          <div class="heading-bar">
                                            <div
                                              @click="hiddenTransport"
                                            >
                                              <h5 class="heading-bar-head">Перелёт</h5>
                                              <div class="heading-bar-info">
                                                <div v-show="transport == 'XXX--'" class="city">Без перелёта</div>
                                                <div v-show="transport == 'plane'" class="city">Отправление из
                                                  {{ plane }}
                                                </div>
                                              </div>
                                            </div>
                                            <div
                                              :class="{'rotate-arrow': open_transport}"
                                              class="etape"><i class="icon-arrow-down-t1"></i>
                                            </div>
                                          </div>
                                        </div>
                                        <div
                                          v-show="transport_hidden"
                                          class="transport">
                                          <div
                                            @click="transportType('XXX--')"
                                            class="transport-type without_transport">
                                            <input type="radio"
                                                   id="without_transport-1" name="transport-2"
                                                   class="choice"
                                                   v-model="transport"
                                                   value="XXX--"><label
                                            for="without_transport-1">Без перелёта</label>
                                          </div>
                                          <div
                                            @click="transportType('plane')"
                                            class="transport-type">
                                            <input type="radio" id="plane-1"
                                                   v-model="transport"
                                                   name="transport-1"
                                                   class="choice"
                                                   value="plane"><label
                                            for="plane-1">Рейсы из</label>
                                            <div
                                              @click="openTransport"
                                              class="Select">
                                              <div class="Select-control">
                                                <div class="Select-multi-value-wrapper">
                                                  <div v-show="!plane" class="Select-placeholder">Город отправления
                                                  </div>
                                                  <div v-show="plane" class="Select-placeholder">{{ plane }}</div>
                                                </div>
                                                <span class="Select-arrow-zone"><span
                                                  class="Select-arrow"></span></span>
                                              </div>
                                            </div>
                                          </div>
                                          <div class="section-warning">На следующей странице процесса
                                            бронирования Вы сможете выбрать авиакомпанию и время вылета
                                          </div>
                                        </div>
                                      </div>
                                      <div id="section-duration" class="section-duration box-section">
                                        <div class="head">
                                          <div
                                            @click="openDuration"
                                            class="heading-bar">
                                            <div>
                                              <h5 class="heading-bar-head">Продолжительность и дата отъезда</h5>
                                              <div
                                                v-show="!heading_bar_info"
                                                v-html="filled_label"
                                                class="heading-bar-info">
                                              </div>
                                            </div>
                                            <div
                                              :class="{'rotate-arrow': open_duration}"
                                              class="etape"><i class="icon-arrow-down-t1"></i>
                                            </div>
                                          </div>
                                          <div
                                            :class="{'hidden': !section_duration}"
                                            v-if="tour"
                                            v-show="get_duration"
                                            class="duration">
                                            <voyage-spinner
                                              v-show="Object.entries(tour.durations_with_prices).length <= 0"/>
                                            <durations-buttons
                                              v-show="Object.entries(tour.durations_with_prices).length > 0"
                                              ref="durationsButtonsMob"
                                              :with_prices="with_prices"
                                              @days="handleDays"
                                              @open_calendar="handleCalendar"
                                            />
                                            <voyage-spinner
                                              v-show="Object.entries(tour.dates_with_prices).length <= 0"/>
                                            <react-calendar
                                              v-show="Object.entries(tour.dates_with_prices).length > 0"
                                              ref="reactCalendarMobile"
                                              :to="to_mobile"
                                              @set_day="handleSetDay"
                                              @mobile="handleSetMobile"
                                              :dates_with_prices="tour.dates_with_prices"/>

                                          </div>
                                        </div>
                                      </div>
                                      <div id="sectionMobile"
                                           v-if="sale.room_types.length > 0"
                                           class="section-room_type box-section activeSection">
                                        <div class="head">
                                          <div
                                            @click="isOpenRoom"
                                            class="heading-bar">
                                            <div><h5 class="heading-bar-head">Размещение</h5>
                                              <div
                                                v-html="room_name"
                                                class="heading-bar-info"></div>
                                            </div>
                                            <div
                                              :class="{'rotate-arrow': open_room}"
                                              class="etape"><i class="icon-arrow-down-t1"></i>
                                            </div>
                                          </div>
                                        </div>
                                        <div
                                          v-show="open_room"
                                          class="room_type">
                                          <room-type
                                            :to="to_desktop"
                                            :room_type="sale.room_types"
                                            @set_price="handleSetPrice"
                                            @set_name_room="handleNameRoom"
                                            @set_id="handleSetId"
                                          />
                                        </div>
                                      </div>
                                      <div id="section-room_type"
                                           v-if="sale.board_types.length > 0"
                                           class="section-room_type box-section activeSection">
                                        <div
                                          @click="isOpenBoard"
                                          class="head">
                                          <div class="heading-bar">
                                            <div><h5 class="heading-bar-head">Питание</h5>
                                              <div
                                                v-html="board_name"
                                                class="heading-bar-info"></div>
                                            </div>
                                            <div
                                              :class="{'rotate-arrow': open_board}"
                                              class="etape"><i class="icon-arrow-down-t1"></i>
                                            </div>
                                          </div>
                                        </div>
                                        <div
                                          v-show="open_board"
                                          class="room_type">
                                          <board-type
                                            :to="to_desktop"
                                            :board_type="sale.board_types"
                                            @set_board_price="handleSetBoardPrice"
                                            @set_name_board="handleNameBoard"
                                            @set_board_id="handleSetBoardId"
                                            @set_click="handleBoardClick"
                                          />
                                        </div>
                                      </div>
                                      <div id="section-pax"
                                           class="section-pax box-section activeSection">
                                        <div
                                          @click="isOpenPax"
                                          class="head">
                                          <div class="heading-bar">
                                            <div><h5 class="heading-bar-head">Участники</h5>
                                              <div
                                                v-show="pax_count"
                                                class="heading-bar-info">
                                                {{ pax_count }} чел.
                                              </div>
                                            </div>
                                            <div
                                              :class="{'rotate-arrow': open_pax}"
                                              class="etape"><i class="icon-arrow-down-t1"></i>
                                            </div>
                                          </div>
                                        </div>
                                        <div
                                          v-show="open_pax"
                                          class="pax">
                                          <pax-selectors
                                            :sale="sale"
                                            @pax="handlePax"
                                          />
                                        </div>
                                      </div>
                                      <div class="price-box">
                                        <div class="vp-price">
                                          <div v-show="price > 0" class="price-container">
                                            <div class="price-block">
                                                <span class="offer-price">₽{{
                                                    price + plus_price + plus_board_price
                                                  }}</span>
                                              <span class="price-type">/чел<span></span></span>
                                            </div>
                                            <div class="real-price clear-both" style="margin-left: 3px">вместо <span>₽
                                              {{
                                                Math.trunc(price + plus_board_price + plus_price + (price + plus_price) * sale.sale_up_to / 100)
                                              }}
                                              </span></div>
                                          </div>
                                          <button
                                            @click="calculateCost"
                                            v-show="price > 0 && pax['adults'] > 0" class="submit_price-block">
                                            Рассчитать стоимость
                                          </button>
                                        </div>
                                        <strong id="price-type-label"><strong
                                          class="offerblock__notice first">
                                          Ориентировачная стоимость тура.
                                          Точная стоимость будет указана на следующей странице после выбора
                                          авиабилетов. Цена апгрейда питания указана из расчёта проживания двух человек
                                          в номере.</strong></strong>
                                        <price-details
                                          v-show="open_details"
                                          :details="sale['just_for_you']"/>
                                        <button
                                          @click="openDetails"
                                          class="show-price-details"><span
                                          v-show="!open_details"
                                          class="label">Показать детали цены</span><span
                                          v-show="open_details"
                                          class="label">Скрыть детали</span>
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                  <div class="">
                                    <banner_info3/>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div id="fullscreen-hoc"
                               :class='{"open": hoc_close}'
                               class="fullscreen">
                            <button
                              @click="openTransport"
                              v-show="hoc_close"
                              class="fh-close-popup mode-close"><i
                              class="line-icon-times"></i></button>
                            <div id="fullscreen-hoc-bloc">
                              <div id="fh-title"
                                   :class='{"TRANSPORT": hoc_close}'
                                   class="fh-title">
                                Город отправления
                              </div>
                              <div id="fh-content">
                                <div id="offer-block-1" class="offer-block-1 offer-block">
                                  <div
                                    :class='{"state-close": !hoc_close, "state-open": hoc_close}'
                                    class="searchFilterMobile search-result-dashboard">
                                    <transport-screen
                                      ref="dCwP"
                                      @city="handleCity"/>
                                  </div>
                                  <div
                                    v-show="!open_fullscreen"
                                  >
                                    <div class="new-offer-bloc">
                                      <div class="offer-box-details">
                                        <div class="block-details-container">
                                          <details-double
                                            :sale="sale"/>
                                        </div>
                                        <div class="block-durations-container">
                                          <i class="line-icon-calendar"></i>Доступные продолжительности:<b>
                                          {{ tour_durations }}
                                          ночь</b>
                                        </div>
                                        <h4
                                          v-if="sale.just_for_you"
                                          class="list-title">Эксклюзивно для Вас</h4>
                                        <em v-if="sale.just_for_you">—</em>
                                        <div ref="justForYou" v-html="sale.just_for_you"></div>
                                        <div
                                          v-if="tour_durations"
                                          class="last-places">Последние номера со скидкой
                                        </div>
                                        <div class="block-mobile">
                                          <button id="offerblock-open-button"
                                                  @click="isOpen"
                                                  class="continue">Просчитать стоимость
                                          </button>
                                        </div>
                                      </div>
                                      <div v-if="tour_durations" class="offer_sections block-visible block-desktop">
                                        <div id="section-transport"
                                             :class="{'completedSection': depature_city}"
                                             class="section-transport box-section activeSection">
                                          <div @click="hiddenTransport" class="head">
                                            <div
                                              class="heading-bar">
                                              <div>
                                                <h5 class="heading-bar-head">Перелёт</h5>
                                                <div class="heading-bar-info">
                                                  <div v-show="transport == 'XXX--'" class="city">Без перелёта</div>
                                                  <div v-show="transport == 'plane'" class="city">Отправление из
                                                    {{ plane }}
                                                  </div>
                                                </div>
                                              </div>
                                              <div
                                                :class="{'rotate-arrow': open_transport}"
                                                class="etape"><i class="icon-arrow-down-t1"></i>
                                              </div>
                                            </div>
                                          </div>
                                          <div
                                            v-show="transport_hidden"
                                            class="transport">
                                            <div class="transport-type without_transport">
                                              <input type="radio"
                                                     id="without_transport-1" name="transport-1"
                                                     class="choice"
                                                     v-model="transport"
                                                     @click="transportType"
                                                     value="XXX--"
                                                     checked=""><label
                                              for="without_transport-1">Без перелёта</label>
                                            </div>
                                            <div class="transport-type ">
                                              <input type="radio" id="plane-1"
                                                     v-model="transport"
                                                     name="transport-1"
                                                     @click="transportType"
                                                     class="choice"
                                                     checked=""
                                                     value="plane"><label
                                              for="plane-1">Рейсы из</label>
                                              <div
                                                @click="openTransport"
                                                class="Select">
                                                <div class="Select-control">
                                                  <div class="Select-multi-value-wrapper">
                                                    <div v-show="!plane" class="Select-placeholder">Город отправления
                                                    </div>
                                                    <div v-show="plane" class="Select-placeholder">{{ plane }}</div>
                                                  </div>
                                                  <span class="Select-arrow-zone"><span
                                                    class="Select-arrow"></span></span>
                                                </div>
                                              </div>
                                            </div>
                                            <div v-show="transport == 'plane'" class="section-warning">На следующей
                                              странице процесса
                                              бронирования Вы сможете выбрать авиакомпанию и время вылета
                                            </div>
                                          </div>
                                        </div>
                                        <div id="section-duration"
                                             :class="{'activeSection': section_duration, 'completedSection':section_duration}"
                                             class="section-duration box-section">
                                          <div class="head">
                                            <div
                                              @click="openDuration"
                                              class="heading-bar">
                                              <div>
                                                <h5 class="heading-bar-head">Продолжительность и дата отъезда</h5>
                                                <div
                                                  v-show="!heading_bar_info"
                                                  v-html="filled_label"
                                                  class="heading-bar-info">
                                                </div>
                                              </div>
                                              <div
                                                :class="{'rotate-arrow': open_duration}"
                                                class="etape"><i class="icon-arrow-down-t1"></i>
                                              </div>
                                            </div>
                                            <div
                                              :class="{'hidden': !section_duration}"
                                              v-if="tour"
                                              v-show="get_duration"
                                              class="duration">
                                              <voyage-spinner
                                                v-show="Object.entries(tour.durations_with_prices).length <= 0"/>
                                              <durations-buttons
                                                v-show="Object.entries(tour.durations_with_prices).length > 0"
                                                :with_prices="with_prices"
                                                ref="durationsButtonsDesk"
                                                @days="handleDays"
                                                @open_calendar="handleCalendar"
                                              />
                                              <voyage-spinner
                                                v-show="Object.entries(tour.dates_with_prices).length <= 0"/>
                                              <react-calendar
                                                v-show="Object.entries(tour.dates_with_prices).length > 0"
                                                ref="reactCalendar"
                                                :to="to_desktop"
                                                @set_day="handleSetDay"
                                                :dates_with_prices="tour.dates_with_prices"/>
                                            </div>
                                          </div>
                                        </div>
                                        <div id="section-room_type"
                                             v-if="Object.entries(sale.room_types).length > 1"
                                             class="section-room_type box-section activeSection">
                                          <div class="head">
                                            <div
                                              @click="isOpenRoom"
                                              class="heading-bar">
                                              <div><h5 class="heading-bar-head">Размещение</h5>
                                                <div
                                                  v-html="room_name"
                                                  class="heading-bar-info"></div>
                                              </div>
                                              <div
                                                :class="{'rotate-arrow': open_room}"
                                                class="etape"><i class="icon-arrow-down-t1"></i>
                                              </div>
                                            </div>
                                          </div>
                                          <div
                                            v-show="open_room"
                                            class="room_type">
                                            <room-type
                                              :to="to_desktop"
                                              :room_type="sale.room_types"
                                              @set_price="handleSetPrice"
                                              @set_name_room="handleNameRoom"
                                              @set_id="handleSetId"
                                            />
                                          </div>
                                        </div>
                                        <div id="section-room_type"
                                             v-if="sale.board_types.length > 0"
                                             class="section-room_type box-section activeSection">
                                          <div
                                            @click="isOpenBoard"
                                            class="head">
                                            <div class="heading-bar">
                                              <div><h5 class="heading-bar-head">Питание</h5>
                                                <div
                                                  v-html="board_name"
                                                  class="heading-bar-info"></div>
                                              </div>
                                              <div
                                                :class="{'rotate-arrow': open_board}"
                                                class="etape"><i class="icon-arrow-down-t1"></i>
                                              </div>
                                            </div>
                                          </div>
                                          <div
                                            v-show="open_board"
                                            class="room_type">
                                            <board-type
                                              :to="to_desktop"
                                              :board_type="sale.board_types"
                                              @set_board_price="handleSetBoardPrice"
                                              @set_name_board="handleNameBoard"
                                              @set_board_id="handleSetBoardId"
                                              @set_click="handleBoardClick"
                                            />
                                          </div>
                                        </div>
                                        <div id="section-pax-2"
                                             class="section-pax box-section activeSection">
                                          <div
                                            @click="isOpenPax"
                                            class="head">
                                            <div class="heading-bar">
                                              <div><h5 class="heading-bar-head">Участники</h5>
                                                <div
                                                  v-show="pax_count"
                                                  class="heading-bar-info">
                                                  {{ pax_count }} чел.
                                                </div>
                                              </div>
                                              <div
                                                :class="{'rotate-arrow': open_pax}"
                                                class="etape"><i class="icon-arrow-down-t1"></i>
                                              </div>
                                            </div>
                                          </div>
                                          <div
                                            v-show="open_pax"
                                            class="pax">
                                            <pax-selectors
                                              :sale="sale"
                                              @pax="handlePax"
                                            />
                                          </div>
                                        </div>
                                        <div class="price-box">
                                          <div class="vp-price">
                                            <div v-show="price > 0" class="price-container">
                                              <div class="price-block">
                                                <span class="offer-price">₽{{
                                                    price + (plus_price + plus_board_price)
                                                  }}</span>
                                                <span class="price-type">/чел<span></span></span>
                                              </div>
                                              <div class="real-price clear-both" style="margin-left: 3px">вместо <span>₽
                                              {{
                                                  Math.trunc(price + (plus_board_price + plus_price) + (price + plus_price) * sale.sale_up_to / 100)
                                                }}
                                              </span></div>
                                            </div>
                                            <button
                                              @click="calculateCost"
                                              v-show="price > 0 && pax['adults'] > 0" class="submit_price-block">
                                              Просчитать стоимость
                                            </button>
                                          </div>
                                          <strong id="price-type-label"><strong class="offerblock__notice first">
                                            Ориентировачная стоимость тура.
                                            Точная стоимость будет указана на следующей странице после выбора
                                            авиабилетов. Цена апгрейда питания указана из расчёта проживания двух
                                            человек в номере.</strong></strong>
                                          <price-details
                                            v-show="open_details"
                                            :details="sale['just_for_you']"/>
                                          <button
                                            @click="openDetails"
                                            class="show-price-details"><span
                                            v-show="!open_details"
                                            class="label">Показать детали цены</span><span
                                            v-show="open_details"
                                            class="label">Скрыть детали</span>
                                          </button>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div id="react-shareButton" class="block-desktop">
                          <button
                            @click="closeDialShare"
                            class="sale-share vpgTooltip-link share-button"
                            data-tooltip="Поделиться">
                            <span><i class="line-icon-share"></i></span></button>
                        </div>
                        <banner_info/>
                        <div
                          :class="{'button_hidden': ds_flex}"
                          ref="scrollTriggerStart" class="scroll-trigger"></div>
                      </div>
                    </div>
                  </section>
                </div>
                <div class="clearfix"></div>
                <section id="sale-container-bottom">
                  <cross-sale-carousel/>
                  <div id="back-showroom">
                    <a class="button button--primary" href="/">Посмотреть все предложения</a></div>
                </section>
              </section>
            </section>
          </div>
        </main>
        <div ref="scrollTriggerEnd" class="scroll-trigger"></div>
      </section>
    </div>
    <ReviewDialog/>
    <Map ref="mapDial" :sale="sale"/>
    <WillShare ref="willShare" :sale="sale"/>
    <ImageGalery ref="imageGalery" :sale="sale"/>
  </section>
</template>

<script>
import ReviewDialog from "./modals/ReviewDialog.vue";
import ImageGalery from "./modals/ImageGalery.vue";
import Map from "./modals/Map.vue";
import WillShare from "./modals/WillShare.vue";
import DetailsTab from "./sale/tab/DetailsTab.vue";
import FormalitiesTab from "./sale/tab/FormalitiesTab.vue";
import Reviews from "./sale/reviews.vue";
import CrossSaleCarousel from "./sale/CrossSaleCarousel.vue";
import PriceDetails from "./sale/PriceDetails.vue";
import {mapActions, mapGetters} from "vuex";
import DetailsDouble from "./sale/DetailsDouble.vue";
import DurationsButtons from "./sale/DurationsButtons.vue";
import ReactCalendar from "./sale/ReactCalendar.vue";
import TransportScreen from "./sale/TransportScreen.vue";
import {format, differenceInDays} from 'date-fns';
import ruLocale from 'date-fns/locale/ru';
import RoomType from "./sale/RoomType.vue";
import BoardType from "./sale/BoardType.vue";
import PaxSelectors from "./sale/PaxSelectors.vue";
import VoyageSpinner from "/components/all/voyage_spinner.vue";
import _error from "../pages/_error.vue";
import TransferType from "./sale/TransferType.vue";
import Banner_info from "./all/banner_info.vue";
import Banner_info2 from "./all/banner_info2.vue";
import {nextTick} from "vue";
import Banner_info3 from "./all/banner_info3.vue";
import mapboxgl from "mapbox-gl";

export default {
  name: 'Sale',
  components: {
    Banner_info3,
    Banner_info,
    Banner_info2,
    TransferType,
    PaxSelectors,
    RoomType,
    BoardType,
    TransportScreen,
    ReactCalendar,
    DurationsButtons,
    VoyageSpinner,
    WillShare,
    ImageGalery,
    DetailsDouble, PriceDetails, CrossSaleCarousel, Reviews, ReviewDialog, Map, DetailsTab, FormalitiesTab
  },
  props: ['sale', 'id_sale'],
  data() {
    return {
      path: "../../",
      base_url: process.env.BASE_URL,
      to_mobile: "mobile",
      to_desktop: "desktop",
      hoc_close: false,
      transport: "",
      open_duration: false,
      plane: '',
      section_duration: false,
      get_duration: false,
      nights: 1,
      departure_date: null,
      section_duration_open: true,
      section_duration_info: false,
      open_fullscreen: false,
      heading_bar_info: false,
      transport_hidden: true,
      open_transport: false,
      open_details: false,
      open_board: false,
      open_room: false,
      open_pax: false,
      offer_block: false,
      ds_flex: false,
      al_self: false,
      favorites_checked: false,
      index_slide: 1,
      room_name: '',
      board_name: '',
      pax_count: 2,
      section_duration_buttons: false,
      button_show: false,
      filled_label: '',
      depature_city: 'Москва',
      price: null,
      room_id: 1,
      plus_price: null,
      plus_board_price: null,
      board_id: 1,
      pax: {'adults': 2},
      duration: 7,
      departure: '',
      payload: {
        hotel: this.id_sale,
        with_flight: false,
      },
      dwp: {},
      wp: {},
      settings_one: {
        "dots": false,
        "edgeFriction": 0.35,
        "speed": 500,
        "slidesToShow": 1,
        "slidesToScroll": 1
      },
      tour_all: [],
      tour_out: [],
      v_show: false,
    }
  },
  watch: {
    transport(newValue, oldValue) {
      if (newValue == "XXX--") {
        this.depature_city = '';
        this.payload.depature_city = '';
      }
      return newValue;
    },
    pax(newValue, oldValue) {
      this.pax_count = newValue["adults"] + newValue["children"] + newValue["infants"];
      return newValue
    },
    duration(newValue, oldValue) {
      return newValue;
    },
    nights(newValue, oldValue) {
      return newValue;
    },
    departure(newValue, oldValue) {
      return newValue;
    },
  },
  mounted() {
    this.duration = this.sale.min_price_price_without_flight.duration;
    this.nights = this.sale.min_price_price_without_flight.duration;
    this.payload.duration = this.sale.min_price_price_without_flight.duration;
    nextTick(() => {
      $(document).ready(function () {
        function handleScroll() {
          let bestOffer3 = $('#best-offer');
          if ($('#best-offer').length > 0) {
            let openOfferBlock = $('#openOfferBlock');
            const top_t = $(window).scrollTop();
            let percent = Math.round((top_t / document.body.clientHeight) * 100)
            if (top_t > 960) {
              bestOffer3[0].style.display = 'block';
            } else {
              bestOffer3[0].style.display = 'none';
            }
            if (top_t > 2800 && percent < 76) {
              openOfferBlock[0].style.display = 'block';
            } else {
              openOfferBlock[0].style.display = 'none';
            }
          }
        }

        $(window).on('scroll', handleScroll);
        $(window).on('beforeunload', function () {
          $(window).off('scroll', handleScroll);
        });
      })
    })
    let element = this.$refs.justForYou;
    if (element) {
      if (element.children.length > 0) {
        let children_1 = element.children[0];
        let children_2 = children_1.children;
        if (children_1) {
          children_1.classList.add("offer-block-list")
        }
        if (children_2.length > 0)
          for (var i = 0; i < children_2.length; i++) {
            children_2[i].classList.add("offer-block-list-item");
          }
      }
    }
    const element2 = this.$refs.iframeYoutube;
    if (element2) {
      let children = element2[0].children;
      if (children.length > 0)
        children[0].width = '100%'
    }
    const map_dial = document.getElementById('mapDial');
    if (map_dial)
      map_dial.addEventListener('click', this.closeDial);
    this.setHotelTour({
      'hotel': this.id_sale,
      'with_flight': false,
      'duration': this.nights
    });
  },
  updated() {
    let inputObject = this.tour;
    if (!!inputObject) {
      let inputObject = this.tour["depature_cities_with_prices"];
      if (this.$refs.dCwP)
        this.$refs.dCwP.dc = Object.keys(inputObject).map(key => {
          const obj = {};
          obj["city"] = key;
          obj["price"] = inputObject[key];
          return obj;
        });
    }
  },
  computed: {
    ...mapGetters(["tour"]),
    get_cities: {
      get() {
        return this.$store.state.cities
      }
    },
    tour_durations: {
      get() {
        if (this.tour.durations)
          if (this.tour.durations.length > 0)
            return this.tour.durations.join(", ")
        return '';
      }
    },
    sale_images: {
      get() {
        if (this.sale["images"])
          return this.sale["images"]
        return []
      }
    },
    with_prices: {
      get() {
        const inputObject = this.tour["durations_with_prices"];
        const newObject = Object.keys(inputObject).map(key => {
          const obj = {};
          obj["days"] = key;
          obj["price"] = inputObject[key];
          return obj;
        });
        return newObject.map(v => {
          if (v["days"] == this.nights) {
            v["selected"] = true;
          }
          return v;
        });
      },
      set(value) {
        this.wp = {...value};
      }
    },
    hotel_text_blocks() {
      let hotel_text_blocks = this.sale.hotel_text_blocks
      return this.sortBy(hotel_text_blocks);
    },
    room_types() {
      let room_types = this.sale.room_types.slice().sort(function (a, b) {
        return a.id - b.id;
      });
      return room_types;
    },

  },
  beforeDestroy() {
    this.destroyObserver();
  },
  methods: {
    ...mapActions([
      'setTour',
      'setHotelTour',
      'setBooking'
    ]),
    getImageUrl(item) {
      const timestamp = format(new Date(), 'T');
      if (item !== null && !!item["image"])
        return `${this.base_url}${item["image"]}?v=${timestamp}`;
      return null;
    },
    sortBy(obj) {
      let keysWithVideo = Object.values(obj).filter(value => value["youtube_link"] !== null && value["youtube_link"] !== '');
      let keysWithoutVideo = Object.values(obj).filter(value => value["youtube_link"] === null || value["youtube_link"] === '');
      return [...keysWithoutVideo, ...keysWithVideo];
    },
    currentSlide(event) {
      this.index_slide = event + 1;
    },
    destroyObserver() {
      if (this.observer) {
        if (this.$refs.scrollTriggerStart) {
          this.observer.unobserve(this.$refs.scrollTriggerStart);
        }
        this.observer.disconnect();
      }
    },
    scrollToTop(top = 0) {
      window.scrollTo({
        top: top,
        behavior: 'smooth'
      });
    },
    scrollToSumm() {
      this.$scrollTo("#react-offerblocks");
    },
    addFavorites() {
      this.favorites_checked = !this.favorites_checked;
      let favorites = [];
      try {
        if (process.client)
          favorites = this.$getLcStorage('favorites') ?? [];
      } catch (e) {
        favorites = [];
      }
      let arr = [];
      if (!this.favorites_checked) {
        arr = favorites.filter(item => item !== this.id_sale);
      } else {
        arr = [...favorites, this.id_sale];
      }
      this.$setLcStorage('favorites', arr);
    },
    async calculateCost() {
      const data = {
        "hotel": this.id_sale,
        "with_flight": this.payload.with_flight,
        "board": this.board_id,
        "duration": this.payload.duration * 1,
        "departure_date": this.departure_date,
        "adults": this.pax["adults"],
        "children": this.pax["children"] ?? 0,
        "infants": this.pax["infants"] ?? 0,
        "room_type": this.room_id,
        "departure_city": this.payload.depature_city ?? ''
      }

      this.$parent.$parent.$parent.loadNext()
      this.isOpen()
      this.$store.state.step = 1;
      await this.setBooking(data);
      let id = await this.$store.state.tour_id;
      if (id) {
        this.$nuxt.$router.push(`/booking/${id["tour_id"]}/step/1`);
        this.$cookies.set('tour_id', id["tour_id"], {
          path: '/',
          maxAge: 60 * 60 * 24
        })
      }
    },
    isOpen() {
      this.open_fullscreen = !this.open_fullscreen;
      if (this.open_fullscreen) {
        document.body.classList.add('hidden_body');
      } else {
        document.body.classList.remove('hidden_body');
      }

    },
    hiddenTransport() {
      this.open_transport = !this.open_transport;
      this.transport_hidden = !this.transport_hidden;
    },
    async transportType(transport) {
      this.tour.durations_with_prices = {};
      if (transport === "XXX--") {
        this.transport = "XXX--"
        this.payload.with_flight = false;
        this.hoc_close = false;
      }
      if (transport === "plane") {
        this.transport = "plane"
        this.hoc_close = true;
        await this.setHotelTour({
          'hotel': this.id_sale,
          'with_flight': true,
          'duration': this.nights ?? this.duration
        });
        this.get_duration = false;
      }
      if (this.transport === "XXX--") {
        this.depature_city = '';
        await this.setHotelTour({
          'hotel': this.id_sale,
          'with_flight': false,
          'duration': this.nights ?? this.duration
        });
        this.section_duration = true;
        this.section_duration_buttons = true;
        this.get_duration = true;
      }
      if (this.$refs.durationsButtonsMob)
        this.$refs.durationsButtonsMob.wp = this.with_prices;
      if (this.$refs.durationsButtonsDesk)
        this.$refs.durationsButtonsDesk.wp = this.with_prices;
      if (this.$refs.reactCalendarMobile) {
        this.$refs.reactCalendarMobile.dwp = {...this.tour.dates_with_prices};
        this.$refs.reactCalendarMobile.mounted_new();
      }
      if (this.$refs.reactCalendar) {
        this.$refs.reactCalendar.dwp = {...this.tour.dates_with_prices};
        this.$refs.reactCalendar.mounted_new();
      }
    },
    openDetails() {
      this.open_details = !this.open_details;
    }
    ,
    handlePax(data) {
      this.pax = data;
    }
    ,
    isOpenBoard() {
      this.open_board = !this.open_board;
    }
    ,
    isOpenRoom() {
      this.open_room = !this.open_room;
    }
    ,
    isOpenPax() {
      this.open_pax = !this.open_pax;
    }
    ,
    handleSetPrice(data) {
      this.plus_price = data * this.nights;
      this.open_board = true;
      this.open_room = false;
    }
    ,
    handleSetId(data) {
      this.room_id = data;
    }
    ,
    handleNameRoom(data) {
      this.room_name = data;
    }
    ,
    handleNameBoard(data) {
      this.board_name = data;
    }
    ,
    handleSetBoardPrice(data) {
      this.plus_board_price = data * this.nights;
      this.open_board = false;
    }
    ,
    handleSetBoardId(data) {
      this.board_id = data;
    }
    ,
    handleBoardClick(data) {
      this.open_pax = data;
    }
    ,
    handleSetMobile(data) {
      if (data) {
        const fd = document.getElementById("fullscreen-hoc")
        this.$scrollTo("#sectionMobile", {
          container: fd,
          offset: -800,
        });
      }
    }
    ,
    handleSetDay(data) {
      this.departure_date = format(data["starting_date"], 'yyyy-MM-dd')
      const in_day = format(data["starting_date"], 'd MMMM', {locale: ruLocale});
      const out_day = format(data["end_date"], 'd MMMM', {locale: ruLocale});
      let nights_text = ''
      if (this.nights == 21) {
        nights_text = 'ночь'
      } else {
        nights_text = 'ночей'
      }
      this.filled_label = `<div class="filled-label">С ${in_day} по ${out_day} <br> ${this.nights} ${nights_text} / ${data["number_days"]} дней</div>`
      this.price = data["price"];
      this.open_room = true;
      this.open_board = true;
      this.open_pax = true;
      this.section_duration = false;
      this.open_duration = false;
    }
    ,
    async handleDays(data) {
      this.tour.dates_with_prices = {}
      this.nights = data;
      this.payload.duration = data;
      if (this.transport === "XXX--") {
        await this.setHotelTour({
          'hotel': this.id_sale,
          'with_flight': false,
          'duration': data ?? this.duration
        });
      } else {
        await this.setHotelTour({
          'hotel': this.id_sale,
          'with_flight': true,
          'depature_city': this.depature_city,
          'duration': data ?? this.duration
        });
      }
      if (this.$refs.reactCalendarMobile) {
        this.$refs.reactCalendarMobile.dwp = {...this.tour.dates_with_prices};
        this.$refs.reactCalendarMobile.mounted_new();
      }
      if (this.$refs.reactCalendar) {
        this.$refs.reactCalendar.dwp = {...this.tour.dates_with_prices};
        this.$refs.reactCalendar.mounted_new();
      }
      this.transport_hidden = false;
    },
    async handleCity(data) {
      this.tour.durations_with_prices = {};
      this.payload.depature_city = data;
      this.depature_city = data;
      this.hoc_close = !this.hoc_close;
      this.payload.with_flight = true;
      this.section_duration_buttons = true;
      this.plane = data;
      await this.setHotelTour({
        'hotel': this.id_sale,
        'with_flight': true,
        'depature_city': data,
        'duration': this.nights ?? this.duration
      });
      this.heading_bar_info = false;
      this.section_duration = true;
      this.get_duration = true;
      this.open_duration = true;
      if (this.$refs.reactCalendarMobile) {
        this.$refs.reactCalendarMobile.dwp = {...this.tour.dates_with_prices};
        this.$refs.reactCalendarMobile.mounted_new();
      }
      if (this.$refs.reactCalendar) {
        this.$refs.reactCalendar.dwp = {...this.tour.dates_with_prices};
        this.$refs.reactCalendar.mounted_new();
      }
      if (this.$refs.durationsButtonsMob)
        this.$refs.durationsButtonsMob.wp = this.with_prices;
      if (this.$refs.durationsButtonsDesk)
        this.$refs.durationsButtonsDesk.wp = this.with_prices;
    }
    ,
    handleCalendar(data) {
      this.section_duration_info = data;
    }
    ,
    openDuration() {
      this.open_duration = !this.open_duration;
      this.section_duration = !this.section_duration;
    }
    ,
    closeDial() {
      this.$refs.mapDial.closeDial();
    }
    ,
    closeDialShare() {
      this.$refs.willShare.closeDial();
    }
    ,
    closeDialGalery() {
      this.$refs.imageGalery.closeDial();
    }
    ,
    openTransport() {
      this.hoc_close = !this.hoc_close;
      this.section_duration_open = false;
      this.transport = 'plane';
    }
  }
}
</script>
<style lang="scss">
.mapZoom {
  right: 10%;
}

.lazyload-spinner {
  display: none;
  text-align: center;
  padding: 20px;
  font-size: 14px;
  color: #333;
  background-color: #eee;
}

.z-0 {
  z-index: -1;
}

.mobile_on {
  display: none;
}

#geo_sale canvas {
  position: relative;
}

@media (max-width: 575.98px) {
  .mobile_on {
    display: block;
  }
}

@media only screen and (max-width: 767px) {
  #sale-description .sale-time-remaining .sale_description {
    font-size: 10px
  }
  .mapZoom {
    bottom: 10%;
  }
}

@media (min-width: 1200px) {
  #sale-description .sale-time-remaining .sale_description {
    font-size: 13px
  }
  .al-self {
    // transform: translateY(252%);
  }
  .button_hidden {
    display: none;
  }
}

.offerblock-header {
  display: table;
  width: 100%;
  padding: 15px 15px 5px;
  margin-bottom: 0;
  box-sizing: border-box;
  color: #333;
  background: #fff;
  text-align: left;
  @media (max-width: 575.98px) {
    h2 {
      font-weight: 700;
      color: #333;
      font-size: 16px;
    }
  }
}

.open-offer-block {
  margin: 0 auto;
  position: fixed;
  width: 352px;
  top: 74px;
  right: 15%;
}

@media (min-width: 1600px) {
  .open-offer-block {
    right: 23.5%;
  }
}

.submit_price-block {
  float: none;
  background: #bd1343;
  width: 100%;
  margin-left: 0;
  padding: 13px 0;
  margin-top: 13px;
  color: #fff;
  font-size: 16px;
  font-weight: 700;
}

@media (min-width: 1200px) {
  .block-mobile {
    display: none;
  }
  .block-desktop {
    display: block;
  }
}

@media (max-width: 1199px) {
  .block-mobile {
    display: block;
  }
  .block-desktop {
    //display: none;
  }
  #sale-content {
    .sale-container {
      margin-top: 0;
    }
  }
}
</style>



