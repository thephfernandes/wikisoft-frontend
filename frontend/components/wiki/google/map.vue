<template>
<div>
  <gmap-map 
    ref="mapRef" 
    :center="{ lat: 10.0, lng: 10.0 }" 
    :zoom="7"
    map-type-id="terrain"
    style="width: 100%; height: 300px">
    <gmap-marker :position="{ lat: 10.0, lng: 10.0 }" ref="markerRef" />
  </gmap-map>
</div>
</template>

<script>
import { gmapApi } from "vue2-google-maps";

export default {
  props: {
    place: {
      type: String,
      required: false,
    },
  },

  computed: {
    google: gmapApi
  },

  methods: {
    initMap() {
      const map = new this.google.maps.Map()
      const request = {
        query: this.place,
        fields: ["name", "geometry"],
      };

      let service = new this.google.maps.places.PlacesService(map);
      service.findPlaceFromQuery(request, (results, status) => {
        if (status === this.google.maps.places.PlaceServiceStatus.OK) {
          console.log(results[0].geometry.location);
          // createMarker(results[0]);
          // map.setCenter(results[0].geometry.location);
        }
      });
    },
  },

  created() {
    // this.initMap();
  }
};
</script>

<style lang="scss" scoped>
</style>