<template>
  <div class="full-screen-modal-container modal-card">
    <!-- <div class="photo-modal-container modal-card-head">
      <div class="photo-modal-crossbar">
        <button
          class="delete"
          aria-label="delete"
          @click="$emit('close')"
        ></button>
      </div>
    </div> -->
    <div class="photo-modal-form modal-card-body">
      <WikiHeaderPrimary
        :size="3"
        :semantic="1"
        class="has-text-centered modal-header"
        >Add a photo so people can instantly recognize you</WikiHeaderPrimary
      >
      <b-field>
        <b-upload v-model="file" @input="onFileChange" drag-drop expanded>
          <div class="photo-upload-draggable-content">
            <div
              class="photo-upload-wrapper is-flex is-flex-direction-column is-align-items-center is-justify-content-center"
            >
              <div class="preview" v-if="file && url">
                <img :src="url" :alt="file.name" />
              </div>

              <div
                v-else
                class="photo-upload_outer is-flex is-align-items-center is-justify-content-center"
              >
                <div
                  class="photo-upload_inner is-flex is-align-items-center is-justify-content-center"
                >
                  <p class="has-text-centered">
                    <b-icon icon="camera" size="is-large"></b-icon>
                  </p>
                </div>
              </div>
              <WikiHeaderPrimary :size="4" :semantic="3">{{
                account.public_name
              }}</WikiHeaderPrimary>
              <p class="has-text-grey">
                {{ account.city ? `${account.city},` : "" }}
                {{ account.country ? account.country : "" }}
              </p>
            </div>
          </div>
        </b-upload>
      </b-field>

      <b-field class="file">
        <b-upload v-model="file" v-if="!file" expanded>
          <a class="button is-upload-button is-primary is-fullwidth">
            <span>Set Profile Pic</span>
          </a>
        </b-upload>
        <WikiButtonBased v-else type="is-primary" expanded squared>
          <span>Finish</span>
        </WikiButtonBased>
      </b-field>

      <b-field>
        <WikiButtonBased outlined expanded squared>
          <p>
            <b-icon icon="google"></b-icon>
            <span>Use your Google photo</span>
          </p>
        </WikiButtonBased>
      </b-field>

      <b-field>
        <WikiButtonBased outlined expanded squared>
          <p>
            <b-icon icon="facebook"></b-icon>
            <span>Use your Facebook photo</span>
          </p>
        </WikiButtonBased>
      </b-field>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      account: {},
      file: null,
      url: null,
    };
  },

  created() {
    this.account = this.$store.getters["user/getAccount"];
  },

  methods: {
    onFileChange($event) {
      console.log($event);
      this.url = URL.createObjectURL($event);
    }
  }
};
</script>
<style lang="scss" scoped>
.modal-header {
  margin-bottom: 3em;
}

.is-upload-button {
  border-radius: 0;
}

.photo-upload-wrapper {
  width: 100%;
  transform: translateY(-35%);
}

.photo-upload_outer {
  border: 1px solid lightgrey;
  border-radius: 100%;

  @include desktop {
    height: 5.5em;
    width: 5.5em;
  }

  @include mobile {
    height: 3.5em;
    width: 3.5em;
  }
}

.photo-upload_inner {
  border: 1px solid $logo-blue;
  background: rgba($logo-blue, 50%);
  border-radius: 100%;

  @include desktop {
    width: 5em;
    height: 5em;
  }

  @include mobile {
    width: 3.2em;
    height: 3.2em;
  }
}

.round-profile-pic-container {
  img {
    height: 5.5em;
    width: 5.5em;
    border-radius: 50%;
  }
}
</style>