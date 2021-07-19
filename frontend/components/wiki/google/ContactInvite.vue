<template>
  <div>
    <WikiHeaderPrimary :size="1" :semantic="3">
      Invite your contacts to Wikiprofile
    </WikiHeaderPrimary>
    <WikiButtonBased @click="isInviteContactsActive = true">
      <span class="icon"></span>
      <span class="text">Invite your network</span>
    </WikiButtonBased>

    <b-modal has-modal-card trap-focus v-model="isInviteContactsActive">
      <div class="modal-card">
        <div class="modal-card-body">
          <WikiHeaderPrimary :size="3" :semantic="1">
            Invite your google contacts to join Wikiprofile
          </WikiHeaderPrimary>
        </div>

        <div class="google-contacts-list">
          <div class="google-contacts-list__item" v-for="(item, i) in uninvitedGoogleContacts" :key="i">
            <div class="google-contact">
              {{ item }}
            </div>
            <button>invite</button>
          </div>
        </div>
      </div>
    </b-modal>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isInviteContactsActive: false,
      googleContacts: [],
    }
  },

  computed: {
    uninvitedGoogleContacts() {
      return this.googleContacts;
    }
  },

  async mounted() {
    const gapi = await this.$gapi.getGapiClient();
    const res = await gapi.client.people.people.connections.list({
      'resourceName': 'people/me',
      'personFields': 'names'
    });
    if (res.body.connections) {
      this.googleContacts = res.body.connections;
    }
  }
}; 
</script>

<style lang="scss" scoped>
.icon {
  background-image: url(https://developers.google.com/identity/images/g-logo.png);
  background-size: 26px 26px;
  background-repeat: no-repeat;
  background-position: center center;
  display: inline-block;
  vertical-align: middle;
  padding-left: 8px;
  width: 42px;
  height: 42px;
}

.text {
  display: inline-block;
  vertical-align: middle;
  padding-left: 24px;
  padding-right: 24px;
  font-size: 14px;
  font-weight: bold;
  font-family: "Roboto", sans-serif;
}
</style>