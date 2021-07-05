<template>
  <WikiCardPrimary class="featured-card" featured>
    <!-- <template v-slot:header>
      <slot name="header"></slot>
    </template>

    <template v-slot:content>
      <slot name="content"></slot>
    </template>

    <template v-slot:header>
      <slot name="content"></slot>
    </template> -->

    <template v-slot:header>
      <div class="featured-card__header">
        <slot name="header"></slot>
      </div>
    </template>

    <template v-slot:content>
      <div class="featured-card__content">
        <slot name="content"></slot>
      </div>
    </template>

    <template v-slot:footer>
      <div
        class="
          featured-card__footer
          is-flex is-align-items-flex-start is-justify-content-space-between
        "
      >
        <slot name="footer"></slot>
        <slot name="action"></slot>
      </div>
    </template>
  </WikiCardPrimary>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
// .featured-card {
//   @include desktop {
//     height: 420px;
//   }
// }

.featured-card {
  max-width: 100%;
  padding: 0.5rem 0.25rem;
}

.featured-card__header,
.featured-card__content,
.featured-card__footer {
  width: 100%;
}

// .featured-card__header {
//   height: 30%;
// }

.featured-card__content {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}

// .featured-card__footer {
//   height: 20%;
// }
</style>