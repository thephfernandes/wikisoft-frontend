<template>
  <h1>Account slug: {{ this.slug }}</h1>
</template>

<script>
  export default {
    async asyncData({ params }) {
      const slug = params.slug;
      return { slug }
    }
  }
</script>
