<template>
  <div class="similar-companies__list">
    <WikiCardPrimary>
      <template v-slot:header>
        <div class="card-header-title px-0">
          <WikiHeaderPrimary :size="2" :semantic="3">
            Similar companies
          </WikiHeaderPrimary>
        </div>
      </template>

      <template v-slot:content>
        <div
          class="similar-companies__list--items"
          v-if="similarCompanies.length > 0"
        >
          <div
            class="similar-companies__list--item"
            v-for="(item, i) in similarCompanies"
            :key="i"
          >
            <div
              class="wrapper is-flex is-justify-content-space-between"
              style="width: 100%"
            >
              <div class="list--item__content" style="width: 100%">
                <div class="item-name">
                  <p
                    class="
                      has-text-weight-semibold has-text-black
                      is-size-7-mobile
                    "
                  >
                    <nuxt-link :to="`/companies/${item.company_name}`">
                      {{ item.company_name }}
                    </nuxt-link>
                  </p>
                </div>
                <div class="item-details">
                  <p class="is-size-7-mobile">{{ item.data_industry }}</p>
                  <p class="is-size-7-mobile">{{ item.data_headquarters }}</p>
                </div>
              </div>

              <div class="list--item__action">
                <WikiButtonBased
                  outlined
                  @click="$emit('toggleFollow')"
                  class="follow-button"
                  :type="isFollowing ? 'is-success' : 'is-success is-light'"
                  size="is-small"
                >
                  <span
                    class="
                      is-size-7-mobile is-uppercase
                      has-text-weight-semibold
                    "
                  >
                    {{ isFollowing ? "unfollow" : "follow" }}
                  </span>
                </WikiButtonBased>
              </div>
            </div>
            <hr />
          </div>
        </div>

        <div v-else>
          <p class="has-text-grey has-text-weight-semibold">
            No similar companies found
          </p>
        </div>
      </template>

      <template v-slot:footer>
        <div class="footer-button-wrapper is-flex is-justify-content-center">
          <a type="button" class="has-text-weight-medium" href="/companies">
            explore</a
          >
        </div>
      </template>
    </WikiCardPrimary>
  </div>
</template>

<script>
import companyData from "~/assets/data/featured-companies.json";

export default {
  props: {
    company: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      similarCompanies: [],
      isFollowing: false,
    };
  },

  methods: {
    findSimilarCompanies() {
      this.similarCompanies = companyData.filter(
        (item) =>
          item.industry === this.company.industry &&
          item.company_name !== this.company.company_name
      );
    },
  },

  mounted() {
    this.findSimilarCompanies();
  },
};
</script>

<style lang="scss" scoped>
.footer-button-wrapper {
  width: 100%;
}

.similar-companies__list--item:last-child > hr {
  margin-bottom: 0;
}
</style>