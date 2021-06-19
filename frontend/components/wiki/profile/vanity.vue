<template>
  <div class="vanity-card-wrapper">
    <div class="card-header-title">
      <div class="card-header-icon">
        <figure class="is-128x128">
          <a @click.prevent="redirectToSelected(name)">
            <img
              class="profile-image is-rounded"
              :src="
                profileImage ||
                'https://bulma.io/images/placeholders/128x128.png'
              "
              alt="profile picture"
            />
          </a>
        </figure>
      </div>
      <div class="is-flex is-flex-direction-column header-title-contents">
        <a @click.prevent="redirectToSelected()" style="color: black">
          <p class="is-size-5 profile-name is-size-6-tablet is-size-6-mobile">{{ name }}</p>
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
}

.card-header-icon {
  padding-left: 0;
  padding-right: 0;
  min-width: 70px;
  @include mobile {
    min-width: 60px;
  }

  .profile-image {
    height: 70px;
    width: 70px;

    @include mobile {
      height: 45px;
      width: 45px;
    }
  }
}

.card-header-title {
  padding-top: 0;

  @include mobile {
    padding-left: 0;
  }
  
  @include tablet {
    padding-left: 1em;
  }

  .header-title-contents {
    height: 100%;
    width: 100%;
    justify-content: center;
    @include desktop {
      padding-left: 1.25em;
    }
  }
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
</style>