<template>
  <footer class="footer">
    <div class="content pb-3">
      <span v-if="lastEdit">This page was last edited on {{ lastEdit }}</span>
      <div class="is-flex is-justify-content-space-between is-align-items-center">
        <div class="footer-links is-flex">
          <ul>
            <li><span class="has-text-weight-semibold has-text-white">WikiProfile</span></li>
            <li><a href="/cookies">Cookie policy</a></li>
            <li><a href="/privacy">Privacy policy</a></li>
            <li><a href="/user-agreement">User agreement</a></li>
          </ul>
          <ul>
            <li><span class="has-text-weight-semibold has-text-white">Wikisoft Corp.</span></li>
            <li><a href="/about">About</a></li>
            <li><a href="/contact">Contact</a></li>
            <li><a href="/investors">Investor relations</a></li>
            <li><a href="/disclaimers">Disclaimers</a></li>
          </ul>
        </div>
        <div class="footer-vanity-wrapper is-flex is-align-items-center">
          <WikiFooterIcon class="logo mr-1 mt-1" />
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

  .footer-links {
    ul {
      list-style: none;
    }

    @include mobile {
      flex-direction: column;
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
    @include mobile {
      max-width: 150px;
    }
  }
}
</style>
