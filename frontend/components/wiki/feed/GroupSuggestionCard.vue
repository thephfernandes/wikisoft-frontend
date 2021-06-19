<template>
  <div class="card" style="border-radius: 1rem">
    <div class="card-header" style="box-shadow: none">
      <div class="card-header-title is-flex is-justify-content-space-between">
        <textLine :size="0.5" :weight="0.5">Groups</textLine>
        <Button><span class="is-uppercase">create group</span></Button>
      </div>
    </div>
    <div class="card-content pt-0">
      <div class="group-list">
        <router-link class="group is-flex is-align-items-center" v-for="(item, index) in groups" :key="index" to="/">
          <Wicon icon="group" />
          <textLine :size="0.4" :weight="0.5" class="ml-2">{{ item }}</textLine>
        </router-link>
      </div>
    </div>
    <div class="card-footer is-flex is-justify-content-center py-2">
      <Button><span>Show more</span></Button>
    </div>
  </div>
</template>

<script>
import Button from "../button/Button.vue";
import Wicon from "../icon/Wicon.vue";
import textLine from "../text/textLine.vue";
export default {
  name: "GroupSuggestion",
  components: {
    Button,
    Wicon,
    textLine,
  },

  data() {
    return {
      groups: ["Hiring with WikiProfile", "Future of Retail Experiences", "SEO wizkids"],
    };
  },
};
</script>

<style lang="scss" scoped>
.card {
  border: 1px solid lightgrey;
  box-shadow: none;
}
</style>
