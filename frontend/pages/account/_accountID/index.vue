  <template>
  <div>
    <b-modal v-model="init">
      <WikiProfileModalFormBackground
        class="account-modal"
        @submit="updateForm"
        v-show="index === 0"
      />
      <WikiProfileModalFormContact
        class="account-modal"
        @submit="updateForm"
        v-show="index === 1"
      />
      <WikiProfileModalFormPhoto
        class="account-modal"
        @submit="updateForm"
        v-show="index === 2"
      />
    </b-modal>
  </div>
</template>

<script>
export default {
  data() {
    return {
      init: this.$route.query.init,
      index: null,
      formData: {
        role: "b61a2ccb-fcca-4a3d-a006-9713994449ba",
      },
    };
  },

  mounted() {
    this.index = 0;
  },

  methods: {
    updateForm(data) {
      this.formData = { ...this.formData, ...data };
      this.index++;

      if (this.index === 3) {
        this.attemptUpdateUser();
      }
    },

    async attemptUpdateUser() {
      this.$store.dispatch("user/updateUser", this.formData);
    },
  },
};
</script>

<style lang="scss" scoped>
.account-modal {
  margin-left: auto !important;
  margin-right: auto !important;
  
  @include desktop {
    margin-top: 120px !important;
  }
}
</style>
