<template>
  <b-dropdown position="is-bottom-left">
    <template v-slot:trigger>
      <a role="button" class="is-flex is-align-items-center">
        <div class="claim-icon"></div>
        <span class="has-text-grey has-text-weight-semibold">Is this your company?</span>
      </a>
    </template>
    <b-dropdown-item custom>
      <b-message type="is-info">
        <p>
          <a role="button" @click="$emit('attemptCompanyClaim')"
            >Claim it now!</a
          >
        </p>
      </b-message>
    </b-dropdown-item>
  </b-dropdown>
</template>

<script>
export default {};
</script>

.<style lang="scss" scoped>
.claim-icon {
    height: 20px;
    width: 20px;
    border-radius: 100%;
    background: rgb(255, 109, 42);
    margin-right: 0.25em;
}
</style>