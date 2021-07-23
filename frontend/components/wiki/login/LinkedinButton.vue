<template>
  <a
    ref="linkedin"
    id="linkedin"
    :class="{
      'linkedin-button': true,
      '--hover': linkedin_btn.hover,
      '--pre-hover': prehvr,
    }"
    @mouseover="linkedin_btn.hover ? (prehvr = false) : (prehvr = true)"
    @mouseleave="prehvr = false"
    @click="linkedin_button_handle"
  >
    <template v-if="$device.isMobile">
      <img
        @blur="linkedin_btn.focus = true"
        @focus="linkedin_btn.focus = false"
        @mouseover="linkedin_btn.hover = true"
        @mouseleave="linkedin_btn.hover = false"
        v-show="linkedin_btn.focus === true"
        src="../../../static/signin_with_linkedin-buttons/Retina/Sign-In-Small---Active.png"
      />
      <img
        @blur="linkedin_btn.focus = true"
        @focus="linkedin_btn.focus = false"
        @mouseover="linkedin_btn.hover = true"
        @mouseleave="linkedin_btn.hover = false"
        v-show="linkedin_btn.focus === false && linkedin_btn.hover === false"
        src="../../../static/signin_with_linkedin-buttons/Retina/Sign-In-Small---Default.png"
      />
      <img
        @blur="linkedin_btn.focus = true"
        @focus="linkedin_btn.focus = false"
        @mouseover="linkedin_btn.hover = true"
        @mouseleave="linkedin_btn.hover = false"
        v-show="linkedin_btn.hover === true && linkedin_btn.focus === false"
        src="../../../static/signin_with_linkedin-buttons/Retina/Sign-In-Small---Hover.png"
      />
    </template>
    <template v-else>
      <img
        @blur="linkedin_btn.focus = true"
        @focus="linkedin_btn.focus = false"
        @mouseover="linkedin_btn.hover = true"
        @mouseleave="linkedin_btn.hover = false"
        v-show="linkedin_btn.focus === true"
        src="../../../static/signin_with_linkedin-buttons/Non-Retina/Sign-In-Large---Active.png"
      />
      <img
        @blur="linkedin_btn.focus = true"
        @focus="linkedin_btn.focus = false"
        @mouseover="linkedin_btn.hover = true"
        @mouseleave="linkedin_btn.hover = false"
        v-show="linkedin_btn.focus === false && linkedin_btn.hover === false"
        src="../../../static/signin_with_linkedin-buttons/Non-Retina/Sign-In-Large---Default.png"
      />
      <img
        @blur="linkedin_btn.focus = true"
        @focus="linkedin_btn.focus = false"
        @mouseover="linkedin_btn.hover = true"
        @mouseleave="linkedin_btn.hover = false"
        v-show="linkedin_btn.hover === true && linkedin_btn.focus === false"
        src="../../../static/signin_with_linkedin-buttons/Non-Retina/Sign-In-Large---Hover.png"
      />
    </template>
  </a>
</template>

<script>
export default {
  data() {
    return {
      prehvr: false,
      linkedin_btn: {
        focus: false,
        hover: false,
      },
    };
  },
  methods: {
    linkedin_button_handle() {
      this.$set(this.linkedin_btn, "focus", true);
      this.$emit("click");
    },
  },
};
</script>

<style lang="scss" scoped>
a {
  border-radius: 5px;
  box-shadow: 1px 1px 4px black;
  img {
    padding: 0;
    margin: 0;
    margin-bottom: -6px;
  }
  padding: 0;
  margin: 0;
  background: #0377b5;
  transition: 0.25s;
  &.--hover {
    background: #0377b5e3;
    transition: 0.1s;
  }
  &.--pre-hover {
    background: #0377b5b9;
    transition: 0.2s;
  }
}
</style>
