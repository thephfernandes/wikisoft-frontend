<template>
  <b-dropdown position="is-bottom-left">
    <template v-slot:trigger>
      <a role="button" class="is-flex is-align-items-center">
        <div class="claim-icon"></div>
        <span class="is-size-7 has-text-grey has-text-weight-semibold claim-text">Is this your company?</span>
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
    height: 16px;
    width: 16px;
    border-radius: 100%;
    background: rgb(255, 109, 42);
    margin-right: 0.25em;

    @include mobile {
      display: none;
    }
}

.claim-text {
  white-space: nowrap;
}
</style>