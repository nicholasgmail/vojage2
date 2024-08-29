<script>
import ReviewDialog from "./ReviewDialog.vue";
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css'

mapboxgl.accessToken = 'pk.eyJ1Ijoidm95YWdldm95YWdlMSIsImEiOiJjbG5vY2pnbjgwaDNoMmtvZGhld2dtamxlIn0.I1ZefmSbGwtDxyexzf-8-A';
export default {
  name: "Map",
  components: {ReviewDialog},
  props: ['sale'],
  data() {
    return {
      close: false,
      base_url: process.env.BASE_URL
    }
  },

  mounted() {
  },
  methods: {
    closeDial() {
      this.close = !this.close;
      if (this.close) {
        document.body.classList.add('hidden_body');
        setTimeout(this.genMap, 100);
      } else {
        document.body.classList.remove('hidden_body');
        var markerMapBox = document.getElementById("markerMapBox");
        if (markerMapBox) markerMapBox.remove();
        var popupMapBox = document.querySelector(".mapboxgl-popup");
        if (popupMapBox) popupMapBox.remove();
      }
    },
    updateMap(longitude, latitude) {
      let map = new mapboxgl.Map({
        container: "mapboxgl-map",
        style: 'mapbox://styles/mapbox/outdoors-v11',
      }).jumpTo({
        center: [longitude, latitude],
        zoom: 13,
      });
      let controls = map._controlPositions;
      controls["bottom-left"].innerHTML = '';
      controls["bottom-right"].innerHTML = '';
      var markerMapBox = document.getElementById("markerMapBox");
      if (markerMapBox) markerMapBox.remove();
      var popupMapBox = document.querySelector(".mapboxgl-popup");
      if (popupMapBox) popupMapBox.remove();
      var marker = document.createElement('div');
      const image = new Image();
      image.src = '/images/f_map.svg';
      image.width = 25;
      marker.appendChild(image);
      marker.className = 'marker';
      marker.setAttribute("id", "markerMapBox")
      const hotel1 = new mapboxgl
        .Marker(marker)
        .setLngLat([this.sale.longitude, this.sale.latitude])
        .setPopup(new mapboxgl.Popup().setHTML("<div id='popupMapBox' class=\"container-tooltip\">" +
          "<div class=\"map-tooltip-clearfix clearfix userSelectZone\">" +
          "<div><img class=\"  \" alt=\"\" width=\"100%\" height=\"205px\" " +
          "src=\"" + this.base_url + this.sale.main_image + "\"><div>" +
          "<div class=\"distanceOrCategory\">HOTEL</div></div><div style=\"padding: 10px 20px;\">" +
          "<div class=\"tooltip-title\">" + this.sale.name + "</div>" +
          "<div class=\"tooltip-address\"><i class=\"line-icon-map-marker\">" +
          "</i>" + this.sale.country + "/" + this.sale.city + "</div></div></div></div></div>"))
        .addTo(map);
    },
    genMap() {
      let map = new mapboxgl.Map({
        container: "mapboxgl-map",
        style: 'mapbox://styles/mapbox/outdoors-v11',
        center: [this.sale.longitude, this.sale.latitude],
        zoom: 13,
      });
      let controls = map._controlPositions;
      controls["bottom-left"].innerHTML = '';
      controls["bottom-right"].innerHTML = '';
      var markerMapBox = document.getElementById("markerMapBox");
      if (markerMapBox) markerMapBox.remove();
      var popupMapBox = document.querySelector(".mapboxgl-popup");
      if (popupMapBox) popupMapBox.remove();
      var marker = document.createElement('div');
      const image = new Image();
      image.src = '/images/f_map.svg';
      image.width = 25;
      marker.appendChild(image);
      marker.className = 'marker';
      marker.setAttribute("id", "markerMapBox")
      const hotel1 = new mapboxgl.Marker(marker)
        .setLngLat([this.sale.longitude, this.sale.latitude])
        .setPopup(new mapboxgl.Popup().setHTML("<div id='popupMapBox' class=\"container-tooltip\">" +
          "<div class=\"map-tooltip-clearfix clearfix userSelectZone\">" +
          "<div><img class=\"  \" alt=\"\" width=\"100%\" height=\"205px\" " +
          "src=\"" + this.base_url + this.sale.main_image + "\"><div>" +
          "<div class=\"distanceOrCategory\">HOTEL</div></div><div style=\"padding: 10px 20px;\">" +
          "<div class=\"tooltip-title\">" + this.sale.name + "</div>" +
          "<div class=\"tooltip-address\"><i class=\"line-icon-map-marker\">" +
          "</i>" + this.sale.country + "/" + this.sale.city + "</div></div></div></div></div>"))
        .addTo(map);
    }
  }
}
</script>

<template>
  <div
    v-show="close"
    role="dialog">
    <div class="fade modal-backdrop in"></div>
    <div role="dialog" tabindex="-1" class="fade modalV2 modal--map in modal" style="display: block;">
      <div class="fullscreen-modal modal-dialog">
        <div class="modal-content" role="document">
          <button
            @click="closeDial"
            class="close showArrow"><span class="hidden-mobile hidden-tablet">Закрыть</span><i
            class="line-icon-times hidden-mobile hidden-tablet"></i>
            <div class="preview-arrow-mobile hidden-only-desktop"><i
              class="line-icon-arrow-left interest-point-line-icon-times"></i></div>
          </button>
          <div class="Mapbox flexSideBar" id="mapContainerElement"
               style="width: 100%; height: 100%; padding: 0px; border: 0px;">
            <div>
              <div class="sideBarBlock " style="">
                <div class="nearHotel hidden-mobile hidden-tablet">Отель</div>
                <div class="separator hidden-mobile hidden-tablet"></div>
                <div class="sizingSideBarList">
                  <div id="scrollableSideBar" class="saleList sale map-sale scrollableSideBar  slide">
                    <div class="spaceMobSideBar hidden-only-desktop"></div>
                    <div
                      @click="updateMap(sale.longitude, sale.latitude)"
                      id="frameBlockContent-marker-388368-46.270999148672-6.0209682933189">
                      <div class="viewportBloc
                        frameBlockContent" dataid="388368">
                        <div class="textSideBarBlock">
                          <p class="nameSideBarBlock">{{ sale.name }}</p>
                          <p class="nameSideBarBlock description">{{ sale.country }}/{{ sale.city }}</p>
                        </div>
                        <div class="imageCategorySideBarBlock">
                          <img class="  " alt=""
                               :src="base_url + sale.main_image"
                               style="height: 100%; object-fit: cover;"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div style="position: relative; width: 100%; height: 100%">
              <div id="mapboxgl-map" class="mapboxgl-map"
                   style="position: relative; width: 100%; height: 100%; overflow: hidden; visibility: inherit;">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">

.nameSideBarBlock {
  &.description {
    padding-top: 0;
    color: inherit;
    font-weight: normal;
    font-size: 12px;
  }
}

button.close {
  left: 5% !important;
}

.hidden_body {
  overflow: hidden;
}

.marker {
  cursor: pointer;
  z-index: 9999;
}

.map-tooltip-clearfix {
  width: auto;
}

.mapboxgl-popup-content {
  width: 18rem;
  height: 18rem;
}

.mapboxgl-popup-close-button {
  transform: translate(-17px, 13px) scale(2.5);
}

.Mapbox .mapboxgl-popup {
  top: -2.5rem;
}

@media only screen and (max-width: 1024px) {
  .Mapbox .distanceOrCategory {
    margin-top: 10px;
  }
}
</style>
