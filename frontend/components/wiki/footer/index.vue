<template>
  <footer class="footer">
    <div class="content">
      <span v-if="lastEdit">This page was last edited on {{ lastEdit }}</span>
      <div class="is-flex is-justify-content-space-between is-align-items-center">
        <div class="footer-links is-flex">
          <span class="link has-text-weight-semibold">
            <a href="/privacy">Privacy policy</a>
          </span>
          <span class="link has-text-weight-semibold icon2-wrapper">
            <a href="/about">About</a>
          </span>
          <span class="link has-text-weight-semibold">
            <a href="/disclaimer">Disclaimer</a>
          </span>
        </div>
        <div class="footer-vanity-wrapper is-flex is-align-items-baseline">
          <WikiFooterIcon class="logo" />
          <WikiTextTLine :size="0.35" class="has-text-white">from Wikisoft</WikiTextTLine>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  props: {
    lastEdit: String,
  },
};
</script>

<style lang="scss" scoped>
.footer {
  background: #808da3;
  box-shadow: inset 0px 2px 2px rgba(0, 0, 0, 0.25);
  width: 100%;
  margin: 0px !important;
  padding: 0.25em 2em !important;

  position: fixed;
  bottom: 0;

  .footer-links {
    @include mobile {
      flex-direction: column;
    }

    .link {
      margin-right: 1.5em;

      @include mobile {
        margin-bottom: 1em;
      }
    }

    a {
      color: white;
    }
  }

  .footer-vanity-wrapper {
    @include mobile {
      padding: 1em 0;
    }

    .has-text-white {
      @include mobile {
        display: none;
      }
    }
  }

  .logo {
    @include desktop {
      padding-top: 2px;
      position: absolute;
      bottom: 8px;
      right: 9em;
      width: 93.13px;
      height: 17px;
    }
    @include tablet {
      position: absolute;
      bottom: 6px;
      right: 8.4em;
      width: 93.13px;
      height: 17px;
    }

    @include mobile {
      max-width: 150px;
    }
  }
}
</style>
