<template>
  <div class="google-map">
    <WikiCardPrimary>
      <template v-slot:header>
        <slot name="header"></slot>
      </template>
      <template v-slot:content>
        <GmapMap
          ref="mapRef"
          :center="{ lat: 10, lng: 10 }"
          :zoom="10"
          map-type-id="terrain"
          style="width: 100%; height: 300px"
        >
          <GmapMarker ref="mapMarkerRef" :position="location" />
        </GmapMap>
      </template>
    </WikiCardPrimary>
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

  data() {
    return {
      location: {},
    };
  },

  computed: {
    google: gmapApi,
  },

  methods: {
    async initMap(map) {
      const request = {
        query: this.place,
        fields: ["name", "geometry"],
      };

      let service = new this.google.maps.places.PlacesService(map);

      await service.findPlaceFromQuery(request, (results, status) => {
        if (status === this.google.maps.places.PlacesServiceStatus.OK) {
          map.setCenter(results[0].geometry.location);
          this.location = results[0].geometry.location;
        }
      });
    },
  },

  mounted() {
    window.setTimeout(() => {
      this.$refs.mapRef.$mapPromise.then((map) => {
        this.initMap(map);
      });
    }, 100)
  },
};
</script>

<style lang="scss" scoped>
</style>