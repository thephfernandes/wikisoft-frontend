<template>
  <div class="card">
    <div class="card-header">
      <div class="card-header-title">
        <p class="is-size-4">Create new post</p>
      </div>
    </div>
    <div class="card-content">
      <div class="tile">
        <div class="tile is-8 pr-5">
          <b-field style="width: 100%">
            <Input :rounded="true" icon="pencil" placeholder="share an idea..." />
          </b-field>
        </div>
        <div class="tile is-4 media-options">
          <Button rounded outlined v-for="(item, index) in mediaOptions" :key="index">
            <Wicon :icon="item" size="medium" style="display: flex; align-items: center" />
          </Button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Button from "../button/Button";
import Input from "../input/Input";
import Wicon from "../icon/Wicon.vue";
export default {
  name: "CreatePost",

  components: {
    Button,
    Input,
    Wicon,
  },

  data() {
    return {
      mediaOptions: ["camera-outline", "video-outline", "file-outline"],
    };
  },
};
</script>

<style lang="scss" scoped>
.card {
  border-radius: 1rem;
  background-color: $boundingbox-secondary-col;
  border: 1px solid lightgrey;
  box-shadow: none;

  .card-header {
    border-radius: 1rem;
    box-shadow: none;
  }

  .card-content {
    padding-top: 0;

    .media-options {
      align-items: center;
      justify-content: space-evenly;
    }
  }
}
</style>
