<template>
  <div class="card" style="border-radius: 1rem">
    <div class="card-header" style="box-shadow: none">
      <div class="card-header-title is-flex is-justify-content-space-between">
        <textLine :size="0.5" :weight="0.5">Add to your feed</textLine>
      </div>
    </div>
    <div class="card-content pt-0">
      <div class="profile-list">
        <WikiProfileVanity category="person" v-for="(item, index) in profiles" :key="index" :name="item.name" :role="item.role" />

      </div>
    </div>
    <div class="card-footer is-flex is-justify-content-center py-2">
      <Button><span>View all recommendations</span></Button>
    </div>
  </div>
</template>

<script>
import Button from "../button/Button.vue";
import textLine from "../text/textLine.vue";
export default {
  name: "FollowSuggestion",
  components: {
    Button,
    textLine,
  },

  data() {
    return {
      profiles: [
        {
          name: "Atlassan",
          role: "Project Management Company",
        },
        {
          name: "John Morrison Doe",
          role: "Senior Project Manager at Google",
        },
        {
          name: "SourceTree",
          role: "Project Management Company",
        },
      ],
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
