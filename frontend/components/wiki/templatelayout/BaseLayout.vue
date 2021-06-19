<template>
  <div class="site-wrapper">
    <div class="main-nav-container">
      <div class="whitespace" style="grid-area: whitespace"></div>
      <div class="main-sidebar">
        <slot name="sidebar"></slot>
      </div>
      <div class="navbar main-menu">
        <slot name="menu"></slot>
      </div>
      <div class="main-content px-4 py-4 m-0 tile is-ancestor is-vertical is-12 container is-fluid is-fullwidth">
        <slot name="content"></slot>
      </div>
      <div class="main-footer">
        <slot name="footer"></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>
<style lang="scss" scoped>
$nav-height: 55px;
.site-wrapper {
  max-width: 100vw;
  min-height: 100vh;
}
.main-nav-container {
  background-color: $boundingbox-darker-col;
  display: grid;
  height: auto;
  width: 100%;
  max-width: 100vw;
  @include desktop {
    grid-template-columns: 340px auto;
    grid-template-rows: 40px auto 1fr 110px;
    grid-template-areas:
      "sidebar topmenu"
      "sidebar content"
      "whitespace content"
      "footer footer";
  }

  @include tablet {
    grid-template-columns: 100vw;
    grid-template-rows: $nav-height 100% auto 110px;
    grid-template-areas: "sidebar" "content" "footer" "topmenu";
    margin-right: auto;
    margin-left: auto;
    right: 0;
    position: absolute;
  }

  @include mobile {
    grid-template-columns: 100vw;
    grid-template-rows: $nav-height 100% auto 110px;
    grid-template-areas: "sidebar" "content" "footer" "topmenu";
  }
}

.main-menu {
  display: block;
  padding: 0;
  border-left: $wikiline;
  background-image: linear-gradient(to top, #77c1f6 0, #e8f2f8 1px, #ffffff 30%, #ffffff 80px);
  background-color: $boundingbox-primary-col;
  width: 100%;
  height: 100%;
  max-height: 80px;
  grid-area: topmenu;
  @include tablet {
    overflow: hidden;
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 56px;
  }

  @include mobile {
    overflow: hidden;
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 56px;
  }
}
.main-sidebar {
  grid-area: sidebar;
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
  @include desktop {
    max-width: 340px;
    display: block;
  }
  @include tablet {
    display: none;
  }
  @include mobile {
    display: none;
  }
}
.main-content {
  background: linear-gradient(180deg, #ffffff 0%, #e9ebef 100%);

  display: block;
  width: 100% !important;
  flex-grow: 1;
  grid-area: content;
  border-left: $wikiline;
  border-bottom: $wikiline;
}
.main-footer {
  grid-area: footer;
  @include desktop {
    max-height: 200px;
  }
  @include tablet {
    max-height: 200px;
  }
}
</style>
