<template>
  <WikiCardPrimary class="block">
    <template v-slot:header>
      <WikiProfileVanity
        :name="company.name"
        category="companies"
        :id="company.id"
      />
    </template>
    <template v-slot:content>
      <p class="has-text-grey company-headquarters">
        {{ company.city ? `${company.city},` : "" }} {{ company.country }} 
      </p>
      <WikiTextCollapsible :fullText="company.description" />
    </template>
    <template v-slot:footer>
      <div class="company-card__footer is-flex is-align-items-flex-start is-justify-content-space-between">
        <WikiProfileTag
          v-if="company.industry || company.data_industry"
          :tag="company.industry || company.data_industry"
        />
        <div v-else></div>
        <WikiButtonBased
        outlined
        :size="$device.isMobile ? 'is-small' : ''"
        type="is-success is-light"
        class="follow-button"
      >
        <span class="is-uppercase">follow</span>
      </WikiButtonBased>
      </div>
    </template>
  </WikiCardPrimary>
</template>

<script>
export default {
  name: "WikiCompanyCard",

  props: {
    company: Object,
    profileImage: String,
    name: String,
    maxLength: {
      type: Number,
      default: 200,
      required: false,
    },
  },

  computed: {
    exceeds: function () {
      return this.company.description.length > this.maxLength;
    },
  },

  data() {
    return {
      readMoreActive: false,
    };
  },
};
</script>

<style lang="scss" scoped>
.card {
  border-radius: 0.6em;
  border: 1px solid lightgrey;
  box-shadow: none;

  .card-header {
    box-shadow: none;
  }

  .card-content {
    padding-top: 0.5rem;
  }

  .card-footer {
    border-top: none;
  }
}

.profile-image {
  max-width: 70px;
  max-height: 70px;
}
.profile-name:hover {
  text-decoration: underline;
}

.is-rounded {
  border-radius: 0.75em;
}
.card-wrapper {
  @include desktop {
    max-width: 350px;
  }
  @include tablet {
    max-width: 300px;
  }
}

.company-card__footer {
  width: 100%;
}

.follow-button {
  border-radius: 3px;
}
</style>
