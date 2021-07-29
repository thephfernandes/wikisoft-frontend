<template>
  <div>
    <p class="has-text-weight-semibold is-size-7 pb-1">
      Invite your contacts to Wikiprofile
    </p>
    <WikiButtonBased @click="isInviteContactsActive = true">
      <span class="icon"></span>
      <span class="text">Invite your network</span>
    </WikiButtonBased>

    <b-modal has-modal-card trap-focus v-model="isInviteContactsActive">
      <div class="modal-card">
        <div class="modal-card-body">
          <WikiHeaderPrimary :size="3" :semantic="1">
            Invite your Google contacts to join Wikiprofile
          </WikiHeaderPrimary>

          <div class="content">
            <div class="google-contacts-list" v-if="googleContacts.length > 0">
              <div
                class="
                  google-contacts-list__item
                  is-flex is-justify-content-space-between
                  px-1
                  py-1
                "
                v-for="(item, i) in googleContacts"
                :key="i"
              >
                <div class="google-contact">
                  {{ item.names[0].displayName }}
                </div>
                <button @click="attemptInviteContact(item)">invite</button>
              </div>
            </div>
            <div class="no-contacts-placeholder" v-else>
              <WikiHeaderPrimary :size="3" :semantic="3" class="has-text-grey">
                Your google contacts will show up here. Currently your contact
                list is empty.
              </WikiHeaderPrimary>
            </div>
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
    };
  },

  methods: {
    attemptInviteContact(contact) {
      console.log("invite sent...", contact.emailAddresses[0].value);
      this.googleContacts.splice(contact);
    },
  },

  mounted() {
    this.$gapi.isSignedIn().then((signedIn) => {
      if (signedIn) {
        this.$gapi.getGapiClient().then((gapi) => {
          gapi.client.people.people.connections
            .list({
              resourceName: "people/me",
              personFields: "names",
            })
            .then((response) => {
              if (response.body.connections) {
                this.googleContacts = response.body.connections;
              }
            });
        });
      }
    });
  },
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
  font-size: 14px;
  font-weight: bold;
  font-family: "Roboto", sans-serif;
}

.content {
  min-height: 10rem;
  display: flex;
  align-items: center;
}
</style>