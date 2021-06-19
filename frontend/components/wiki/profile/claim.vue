<template>
  <b-dropdown position="is-bottom-left">
    <template v-slot:trigger>
      <b-button>
        <span class="is-uppercase">claim</span>
      </b-button>
    </template>

    <b-dropdown-item custom>
      <p>
        Wikiprofile has a profile matching your name, address and job. Would you
        like to claim it?
      </p>
      <br />
      <b-message type="is-info">
        By claiming this profile you won't be able to make other profiles with
        your email. <a role="button">I understand</a>.
      </b-message>
    </b-dropdown-item>
  </b-dropdown>
</template>

<script>
export default {};
</script>

<style>
</style>