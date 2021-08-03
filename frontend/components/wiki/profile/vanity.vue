<template>
  <div class="card-header-title pl-0 pr-0 pt-0">
    <div class="card-header-icon">
      <a @click.prevent="redirectToSelected(name)">
        <div class="profile-image__container">
          <img
            class="profile-image__content is-rounded"
            :src="
              profileImage || 'https://bulma.io/images/placeholders/128x128.png'
            "
            alt="profile picture"
          />
        </div>
      </a>
    </div>
    <div class="is-flex is-flex-direction-column header-title-contents">
      <a @click.prevent="redirectToSelected()" style="color: black">
        <p class="is-size-5 profile-name is-size-6-tablet is-size-6-mobile">
          {{ name }}
        </p>
      </a>
      <p
        class="is-size-6 is-size-7-mobile has-text-weight-normal has-text-grey"
      >
        {{ role }}
      </p>
      <p
        class="is-size-6 is-size-7-mobile has-text-weight-normal has-text-grey"
        v-if="since"
      >
        {{ since }}
      </p>
      <p
        class="is-size-6 is-size-7-mobile has-text-weight-normal has-text-grey"
        v-if="edited"
      >
        Edited
      </p>
    </div>
    <div class="card-action">
      <slot name="action"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "WikiProfileVanity",

  props: {
    id: String,
    profileImage: String,
    category: String,
    name: String,
    role: String,
    since: String,
    edited: Boolean,
  },

  computed: {
    sanitizedName: function () {
      return this.name.replace(/\//g, "-");
    },
  },

  methods: {
    redirectToSelected: function () {
      // this.$store.dispatch("companies/setCompany", company);
      this.$router.push(`/${this.category}/${this.id}`);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../../assets/styles/global.scss";

.vanity-card-wrapper {
  display: flex;
  width: 100%;
  padding: 0 0.25rem;
}

.card-header-icon {
  padding-left: 0;
  padding-right: 0;

  @include mobile {
    min-width: 60px;
  }
}

.header-title-contents {
  height: 100%;
  width: 100%;
  justify-content: center;
  padding-left: 1rem;
}

.post-options {
  margin-right: 1.5rem;
}

.is-rounded {
  border-radius: 0.75em;
}

.profile-name:hover {
  text-decoration: underline;
}

.profile-image__container {
  @include desktop {
    width: 85px;
    height: 85px;
  }

  @include tablet {
    width: 67px;
    height: 67px;
  }

  @include mobile {
    width: 50px;
    height: 50px;
  }
}

.profile-image__content {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
