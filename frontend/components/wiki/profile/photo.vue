<template>
  <div class="profile-photo">
    <figure :class="`image ${size} is-1by1`">
      <img
        :src="photoSrc || 'https://bulma.io/images/placeholders/256x256.png'"
        :alt="`${$auth.user.first_name} profile photo`"
        class="profile-photo__image is-rounded"
      />
    </figure>
  </div>
</template>

<script>
export default {
  props: {
    dimensions: {
      type: String,
      required: false,
      //16, 32, 64, 128, 256
      default: "128x128",
    },
  },

  computed: {
    size() {
      return `is-${this.dimensions}`;
    },
  },

  data() {
    return {
      photoSrc: undefined,
    };
  },

  methods: {
    async getProfilePhoto() {
      try {
        const file = await this.$directus.files.read(this.$auth.user.avatar);
        if (file.data) {
          this.photoSrc = await this.$directus
            .items("assets")
            .read(file.data.id);
        }
      } catch (error) {
        console.error(error);
      }
    },
  },

  async mounted() {
    await this.getProfilePhoto();
  },
};
</script>
<style>
</style>