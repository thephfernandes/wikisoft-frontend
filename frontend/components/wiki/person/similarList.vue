<template>
  <div class="similiar-people__list">
    <WikiCardPrimary footerBorder>
      <template v-slot:header>
        <WikiHeaderPrimary :size="2" :semantic="3">
          Similar people
        </WikiHeaderPrimary>
      </template>

      <template v-slot:content>
        <div class="similar-people__list--content">
          <div
            class="similiar-people__list--items"
            v-if="similarPeople.length > 0"
          >
            <div
              class="similiar-people__list--item"
              v-for="(item, i) in similarPeople"
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
                      <nuxt-link :to="`/people/${item.full_name}`">{{
                        item.full_name
                      }}</nuxt-link>
                    </p>
                  </div>
                  <div class="item-details">
                    <p class="is-size-7-mobile">
                      {{ item.founder_of }} {{ item.company }}
                    </p>
                    <p class="is-size-7-mobile">{{ item.location }}</p>
                  </div>
                </div>

                <div class="list--item__action">
                  <WikiButtonBased
                    outlined
                    @click="$emit('toggleFollow')"
                    class="follow-button"
                    :type="isFollowing ? 'is-sucess' : 'is-success is-light'"
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
              No similar people found
            </p>
          </div>
        </div>
      </template>

      <template v-slot:footer>
        <div class="footer-button-wrapper is-flex is-justify-content-center">
          <a href="/people" type="button" class="has-text-weight-medium">
            explore</a
          >
        </div>
      </template>
    </WikiCardPrimary>
  </div>
</template>

<script>
import peopleData from "~/assets/data/featured-people.json";

export default {
  props: {
    person: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      similarPeople: [],
      isFollowing: false,
    };
  },

  methods: {
    findSimilarPeople() {
      this.similarPeople = peopleData.filter(
        (item) =>
          (item.industry =
            this.person.industry && item.full_name !== this.person.full_name)
      );
    },
  },

  mounted() {
    this.findSimilarPeople();
  },
};
</script>

<style>
.footer-button-wrapper {
  width: 100%;
}

.similar-people__list--item:last-child > hr {
  margin-bottom: 0;
}

.similar-people__list--content {
  min-height: 5rem;
  justify-content: center;
  display: flex;
  flex-direction: column;
}
</style>