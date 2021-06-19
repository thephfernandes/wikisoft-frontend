<template>
  <div class="employer-overview">
    <WikiCardPrimary>
      <template v-slot:header>
        <div class="card-header-title">
          <p>{{ employer.name }}</p>
        </div>
      </template>

      <template v-slot:content>

      </template>
    </WikiCardPrimary>
  </div>
</template>

<script>
export default {
  props: {
    employer: Object,
  }
};
</script>

<style>
</style>