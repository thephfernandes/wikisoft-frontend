<template>
  <footer class="footer">
    <div class="content">
      <span v-if="lastEdit">This page was last edited on {{ lastEdit }}</span>
      <div class="footer-links is-flex">
        <span class="link">
          <a href="">Privacy policy</a>
        </span>
        <span class="link">
          <a href="">About WikiProfile</a>
        </span>
        <span class="link">
          <a href="">Disclaimers</a>
        </span>
        <span class="link">
          <a href="">Mobile view</a>
        </span>
      </div>
      <div class="media-wiki-icon"></div>
    </div>
  </footer>
</template>

<script>
export default {
  name: "Footer",
  props: {
    lastEdit: String,
  },
};
</script>

<style lang="scss" scoped>
.footer {
  background-color: $boundingbox-primary-col !important;
  margin: 0px !important;
  padding: 0em !important;
  .footer-links {
    padding: 1em 0;

    .link {
      margin-right: 1.5em;
    }
  }
}
</style>
