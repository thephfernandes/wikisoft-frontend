<template>
  <div class="job-overview">
    <WikiCardPrimary>
      <template v-slot:header>
        <div class="card-header-title" style="padding-top: 0">
          <div class="card-header-icon">
            <figure class="is-128x128">
              <router-link :to="`/company/${job.company}`">
                <img
                  class="profile-image is-rounded"
                  :src="'https://bulma.io/images/placeholders/128x128.png'"
                  :alt="`${job.company}`"
              /></router-link>
            </figure>
          </div>
          <div class="pl-3">
            <p class="is-size-5 job-title">{{ job.title }}</p>

            <router-link :to="`/company/${job.company}`">
              <p>{{ job.company }}</p>
            </router-link>
          </div>
        </div>
        <WikiIcon class="options" icon="chevron-down" size="is-medium" />
      </template>
      <template v-slot:content>
        <p
          class="is-size-6 has-text-weight-normal has-text-grey"
          style="margin-top: -1rem"
        >
          {{ job.location }}
        </p>
        <div class="categories-wrapper py-2" style="display: flex; width: 100%">
          <div
            class="company-category mr-3"
            style="
              background-color: aliceblue;
              color: cornflowerblue;
              padding: 0.4rem;
            "
            v-for="(item, i) in job.categories"
            :key="i"
          >
            <span class="is-uppercase has-text-weight-semibold">{{
              item
            }}</span>
          </div>
        </div>
        <WikiTextCollapsible
          :fullText="job.description"
          :charLimit="140"
          expandDisabled
        />
        <div class="tags-wrapper py-2" style="display: flex; width: 100%">
          <div
            class="company-tag mr-3"
            style="background-color: #f7f7f6; padding: 0.2rem 0.4rem"
            v-for="(item, i) in job.tags"
            :key="i"
          >
            <span class="has-text-weight-semi-bold has-text-grey">{{
              item
            }}</span>
          </div>
        </div>
      </template>
      <template v-slot:footer>
        <div
          class="job-footer is-flex is-justify-content-space-between is-align-items-center"
          style="width: 100%"
        >
          <p class="has-text-grey">{{ job.postedOn }}</p>
          <b-button class="is-success"
            ><span class="is-uppercase">apply</span>
          </b-button>
        </div>
      </template>
    </WikiCardPrimary>
  </div>
</template>

<script>
export default {
  name: "WikiCompanyJob",

  props: {
    job: Object,
  },
};
</script>

<style lang="scss" scoped>
.card-header-icon {
  padding-left: 0;
  padding-right: 0;

  .profile-image {
    max-height: 70px;
  }
}

.is-rounded {
  border-radius: 0.75em;
}

.options {
  position: absolute;
  right: 1.5rem;
  top: 1rem;
}

.job-footer {
  margin-top: -1rem;
  padding: 1.5rem;
  padding-top: 0;
}
</style>