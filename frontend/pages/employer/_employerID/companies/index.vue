<template>
  <div class="columns">
    <div class="column is-fullheight"></div>
  </div>
</template>

<script>
  export default {
    async asyncData({ params }) {
      console.log('unused', params);
      return '';
    },
  };
</script>
