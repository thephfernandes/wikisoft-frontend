<template>
  <div>
    hello world
    <div id="map"></div>
  </div>
</template>

<script>
const apiKey = process.env.GOOGLE_API_KEY;

export default {
  props: {
    place: {
      type: String,
      required: true,
    },
  },

  head() {
    return {
      script: [
        { 
          src: `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`,
          async: true,
        }
      ]
    }
  },

  methods: {
    initMap() {
      let map =  window.google.maps.Map(
        document.getElementById('map')
      );

      const request = {
        query: this.place,
        fields: ["name", "geometry"],
      };

      let service = window.google.maps.places.PlacesService(map);
      service.findPlaceFromQuery(request, (results, status) => {
        if (status === window.google.maps.places.PlaceServiceStatus.OK) {
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