<template>
  <div>
    <div class="overlay" @click="toggleNavigationDrawer"></div>
    <header class="toolbar">
      <div class="toolbar__content">
        <WikiProfilePhoto dimensions="32x32" />
        <div class="toolbar__input">
          <b-field expanded>
            <b-input @input="$emit('search')" rounded></b-input>
          </b-field>
        </div>
        <button
          class="toolbar__button button--icon"
          @click="toggleNavigationDrawer"
        >
          <div class="button_content">
            <WikiIconWicon icon="menu" size="medium" />
          </div>
        </button>
      </div>
    </header>
    <nav
      @click="toggleNavigationDrawer"
      class="
        navigation-drawer navigation-drawer--close navigation-drawer--fixed
      "
    >
      hello world
    </nav>
  </div>
</template>

<script>
export default {
  methods: {
    toggleNavigationDrawer() {
      const navDrawer = document.querySelector(".navigation-drawer");
      const overlay = document.querySelector(".overlay");
      navDrawer.classList.toggle("navigation-drawer--close");
      navDrawer.classList.toggle("navigation-drawer--active");
      overlay.classList.toggle("overlay--active");
    },
  },
};
</script>

<style lang="scss" scoped>
.toolbar {
  height: 75px;
  margin-top: 0;
  left: 0;
  right: 0;
  transform: translateY(0px);
}

.toolbar__content {
  height: 75px;
  display: flex;
  align-items: center;
  position: relative;
  z-index: 0;

  @include mobile {
    padding: 4px 16px;
  }

  ::before,
  ::after {
    box-sizing: inherit;
  }
}

.toolbar__input {
  width: 100%;
  padding: 12px;
  margin-right: auto;
  margin-left: auto;
}

.toolbar__button {
  border-style: none;
  background-color: transparent;
}

.navigation-drawer {
  background: #ffffff;
  height: 100vh;
  top: 0;
  right: 0;
  transform: translateX(100%);
  width: 320px;
  display: flex;
  flex-direction: column;
  max-width: 100%;
  overflow: hidden;
  transition-duration: 0.2s;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-property: transform, visibility, width;
}

.navigation-drawer--active {
  transform: translateX(0%);
}

.navigation-drawer--close {
  visibility: hidden;
}

.navigation-drawer--fixed {
  position: fixed;
  z-index: 2;
}

.overlay {
  opacity: 0;
  background-color: rgb(33, 33, 33);
  border-color: rgb(33, 33, 33);
  position: absolute;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  transition-duration: 0.2s;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-property: transform, opacity;
  will-change: opacity;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
}

.overlay--active {
  opacity: 0.5;
}
</style>