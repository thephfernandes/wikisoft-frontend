<template>
  <div>
    <div id="map"></div>
  </div>
</template>

<script>
export default {
  props: {
    place: {
      type: String,
      required: true,
    },
  },

  methods: {
    initMap() {
      let map =  new google.maps.Map(
        document.getElementById('map')
      );

      const request = {
        query: this.place,
        fields: ["name", "geometry"],
      };

      let service = new google.maps.places.PlacesService(map);
      service.findPlaceFromQuery(request, (results, status) => {
        if (status === google.maps.places.PlaceServiceStatus.OK) {
          // for (let i = 0; i < results.length; i++) {
          //   createMarker(results[i]);
          // }
          createMarker(results[0]);
          map.setCenter(results[0].geometry.location);
        }
      });
    },
  },

  created() {
    this.initMap();
  }
};
</script>

<style lang="scss" scoped>
</style>