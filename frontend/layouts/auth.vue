<template>
  <div class="auth-container">
    <div class="desktop-jumbopic-container">
      <div class="profile-text-float">
        <img src="../assets/wikiprofile-logo-square-white.svg" />
      </div>
      <div class="desktop-jumbopic">
        <WikiHeaderPrimary
          v-if="$device.isMobile"
          :size="2"
          :semantic="6"
          :style="{ color: 'whitesmoke' }"
          >Get your free professional profile now!</WikiHeaderPrimary
        >
        <WikiHeaderPrimary
          v-else
          :size="2"
          :semantic="6"
          :style="{ color: 'whitesmoke' }"
          >Get your free professional profile included <br />
          in the official business encyclopaedia.</WikiHeaderPrimary
        >
        <img src="../assets/wikiprofile-logo-icon.svg" />
      </div>
    </div>
    <div class="auth-form"><nuxt /></div>
  </div>
</template>

<script>
export default {
  name: "auth",
};
</script>
<style lang="scss" scoped>
.auth-from {
  min-width: 500px;
  height: 100%;
  display: grid;
  justify-items: center;
  align-items: center;
}
.auth-container {
  display: grid;

  @include mobile {
    grid-template-rows: 10vh 90vh;
    grid-template-columns: 100vw;
    grid-template-areas: "picture" "form";
  }

  @include tablet {
    grid-template-rows: 100vh;
    grid-template-columns: 3fr 4fr;
    grid-template-areas: "picture form";
  }

  @include desktop {
    grid-template-rows: 100vh;
    grid-template-columns: 1fr auto;
    grid-template-areas: "picture form";
    .auth-form {
      max-width: 628px;
    }
  }

  .block * {
    background-color: $boundingbox-secondary-col;
  }
  background-color: $boundingbox-secondary-col;
}
.desktop-jumbopic-container {
  @include mobile {
    hr {
      display: none;
    }
  }
  grid-area: picture;
  display: grid;
  background-color: $primary;
  justify-items: center;
  align-items: center;
}
.desktop-jumbopic {
  max-width: 60vw;
  text-align: center;
  img {
    margin-top: 25px;
    height: 30vw;
    width: 30vw;
    @include mobile {
      display: none;
    }
  }
}
.profile-text-float {
  img {
    height: 42px;
    width: auto;
    @include mobile {
      max-width: 50vw;
    }
  }
  position: absolute;
  @include desktop {
    left: 35px;
    top: 20px;
  }
  @include tablet {
    left: 35px;
    top: 20px;
  }
  @include mobile {
    top: 1.25rem;
    left: 0.5rem;
  }
}

.auth-form {
  padding: 25px;
  grid-area: form;
  height: 100%;
  width: 100%;
}
</style>
