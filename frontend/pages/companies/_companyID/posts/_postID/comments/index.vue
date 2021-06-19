<template>
  <div class="columns">
    <div class="column is-fullheight">
      <h1>People slug: {{ this.slug }}</h1>

      <Person />
      <div class="box">
        <h1>Education card</h1>
      </div>
      <div class="box">
        <h1>Experience card</h1>
      </div>

      <div class="box">
        <h1>Skills card</h1>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    async asyncData({ params }) {
      const slug = params.slug;
      return { slug };
    },
  };
</script>
