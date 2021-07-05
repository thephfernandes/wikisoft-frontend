<template>
  <footer class="footer">
    <div class="columns">
      <div class="column is-one-fifth"></div>
      <div class="column has-links">
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
                <a :href="link.to">
                  {{ link.title }}
                </a>
              </div>
            </div>
          </template>
        </b-collapse>
      </div>
    </div>
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
              to: "https://www.wikiprofile.com/pdf/021521_Wikisoft-privacy-policy.pdf",
            },
            {
              title: "Cookie policy",
              to: "https://www.wikiprofile.com/pdf/021521_Cookie-policy.pdf",
            },
            {
              title: "User agreement",
              to: "https://www.wikiprofile.com/pdf/021621_-Terms-of-Use.pdf",
            },
            {
              title: "Code of ethics",
              to: "https://www.wikiprofile.com/pdf/021521_Code-of-ethics_.pdf",
            },
            {
              title: "Review guidelines",
              to: "https://www.wikiprofile.com/pdf/Review_guidelines_wikiprofile.pdf",
            },
          ],
        },
        {
          title: "Account",
          links: [
            {
              title: "Get a free account",
              to: "/auth/sign-up",
            },
            {
              title: "Get a free employer account",
              to: "/employer",
            },
          ],
        },
        {
          title: "About Wikisoft Corp.",
          links: [
            {
              title: "About",
              to: "https://wikisoft.com",
            },
            {
              title: "Contact",
              to: "https://wikisoft.com/contact",
            },
            {
              title: "Investor relations",
              to: "https://wikisoft.com/press",
            },
            {
              title: "Disclaimers",
              to: "https://www.wikiprofile.com/pdf/Website-Disclaimers.pdf",
            },
          ],
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
.columns {
  width: 100%;

  .column.has-links {
    width: 100%;
    display: flex;
  }
}
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