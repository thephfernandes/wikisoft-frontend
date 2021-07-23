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
        src="https://io.wikiprofile.com/assets/f9e12a7f-dc46-4c07-b734-8d64ec77ce45?access_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjZlYmRiNWE4LTMxZDUtNGNlOC1hYTI3LTQ3OGVkN2U5Zjg5NSIsImlhdCI6MTYyNzA0Njg2MywiZXhwIjoxNjI3MDQ3NzYzfQ.RXyfkeCmMWAS5C3ETT-aU-DmjO_KgTRvowdEg66llrs"
      />
      <img
        @blur="linkedin_btn.focus = true"
        @focus="linkedin_btn.focus = false"
        @mouseover="linkedin_btn.hover = true"
        @mouseleave="linkedin_btn.hover = false"
        v-show="linkedin_btn.focus === false && linkedin_btn.hover === false"
        src="https://io.wikiprofile.com/assets/863e2b78-0c0d-4966-9154-58da6893d310?access_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjZlYmRiNWE4LTMxZDUtNGNlOC1hYTI3LTQ3OGVkN2U5Zjg5NSIsImlhdCI6MTYyNzA0Njg2MywiZXhwIjoxNjI3MDQ3NzYzfQ.RXyfkeCmMWAS5C3ETT-aU-DmjO_KgTRvowdEg66llrs"
      />
      <img
        @blur="linkedin_btn.focus = true"
        @focus="linkedin_btn.focus = false"
        @mouseover="linkedin_btn.hover = true"
        @mouseleave="linkedin_btn.hover = false"
        v-show="linkedin_btn.hover === true && linkedin_btn.focus === false"
        src="https://io.wikiprofile.com/assets/f1ba5211-ba1b-4237-9f9d-191ad1739b95?access_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjZlYmRiNWE4LTMxZDUtNGNlOC1hYTI3LTQ3OGVkN2U5Zjg5NSIsImlhdCI6MTYyNzA0Njg2MywiZXhwIjoxNjI3MDQ3NzYzfQ.RXyfkeCmMWAS5C3ETT-aU-DmjO_KgTRvowdEg66llrs"
      />
    </template>
    <template v-else>
      <img
        @blur="linkedin_btn.focus = true"
        @focus="linkedin_btn.focus = false"
        @mouseover="linkedin_btn.hover = true"
        @mouseleave="linkedin_btn.hover = false"
        v-show="linkedin_btn.focus === true"
        src="https://io.wikiprofile.com/assets/7849c9fc-c076-43a4-af29-f599e5157290?access_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjZlYmRiNWE4LTMxZDUtNGNlOC1hYTI3LTQ3OGVkN2U5Zjg5NSIsImlhdCI6MTYyNzA0Njg2MywiZXhwIjoxNjI3MDQ3NzYzfQ.RXyfkeCmMWAS5C3ETT-aU-DmjO_KgTRvowdEg66llrs"
      />
      <img
        @blur="linkedin_btn.focus = true"
        @focus="linkedin_btn.focus = false"
        @mouseover="linkedin_btn.hover = true"
        @mouseleave="linkedin_btn.hover = false"
        v-show="linkedin_btn.focus === false && linkedin_btn.hover === false"
        src="https://io.wikiprofile.com/assets/0a462110-fb4c-4879-8960-95c99fe0e9cc?access_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjZlYmRiNWE4LTMxZDUtNGNlOC1hYTI3LTQ3OGVkN2U5Zjg5NSIsImlhdCI6MTYyNzA0Njg2MywiZXhwIjoxNjI3MDQ3NzYzfQ.RXyfkeCmMWAS5C3ETT-aU-DmjO_KgTRvowdEg66llrs"
      />
      <img
        @blur="linkedin_btn.focus = true"
        @focus="linkedin_btn.focus = false"
        @mouseover="linkedin_btn.hover = true"
        @mouseleave="linkedin_btn.hover = false"
        v-show="linkedin_btn.hover === true && linkedin_btn.focus === false"
        src="https://io.wikiprofile.com/assets/d7a226c7-35f7-4090-884f-d5b2ccf19721?access_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjZlYmRiNWE4LTMxZDUtNGNlOC1hYTI3LTQ3OGVkN2U5Zjg5NSIsImlhdCI6MTYyNzA0Njg2MywiZXhwIjoxNjI3MDQ3NzYzfQ.RXyfkeCmMWAS5C3ETT-aU-DmjO_KgTRvowdEg66llrs"
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
