<template>
  <footer class="footer">
    <b-collapse
      animation="slide"
      class="footer-section"
      v-for="(section, i) in sections"
      :key="i"
      :open="false"
    >
      <template v-slot:trigger>
        <div class="footer-section__title">
          {{ section.title }}
        </div>
      </template>
      <template v-slot:default>
        <div class="footer-section__links">
          <div
            class="footer-section__links-item"
            v-for="(link, j) in section.links"
            :key="j"
          >
            <nuxt-link :to="link.to">
              {{ link.title }}
            </nuxt-link>
          </div>
        </div>
      </template>
    </b-collapse>

    <!-- <div class="footer-section" v-for="(section, i) in sections" :key="i">
      <div class="footer-section__title">
        {{ section.title }}
      </div>
      <div class="footer-section__links">
        <div
          class="footer-section__links-item"
          v-for="(link, j) in section.links"
          :key="j"
        >
          <nuxt-link :to="link.to">
            {{ link.title }}
          </nuxt-link>
        </div>
      </div>
    </div> -->
  </footer>
</template>

<script>
export default {
  data() {
    return {
      sections: [
        {
          title: "About WikiProfile",
          links: [
            {
              title: "Privacy policy",
              to: "/privacy",
            },
            {
              title: "Cookie policy",
              to: "/cookies",
            },
            {
              title: "User agreement",
              to: "/user-agreement",
            },
            {
              title: "Code of ethics",
              to: "/ethics",
            },
            {
              title: "Review guidelines",
              to: "/guidelines",
            },
          ],
        },
        {
          title: "Account",
          links: [
            {
              title: "Get a free account",
              to: "/register",
            },
            {
              title: "Get a free employer account",
              to: "/employers",
            },
          ],
        },
        {
          title: "About Wikisoft Corp.",
          links: [
            {
              title: "About",
              to: "/about",
            },
            {
              title: "Contact",
              to: "/contact",
            },
            {
              title: "Investor relations",
              to: "/investor",
            },
            {
              title: "Disclaimers",
              to: "/disclaimers",
            },
          ],
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
.footer {
  border-top: $wikiline;
  display: flex;
  align-items: flex-start;
  justify-content: space-evenly;
  padding: 2.5rem 5rem;

  @include desktop {
    min-height: 245px;
  }

  .footer-section {
    width: 100%;
    flex-grow: 1;
  }
}

.footer-section__title {
  color: $logo-blue;
  font-weight: 500;
}
</style>