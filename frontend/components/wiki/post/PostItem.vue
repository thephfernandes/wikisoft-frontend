<template>
  <div class="post-wrapper">
    <WikiCard>
      <template v-slot:header>
        <WikiProfileVanity
          class="profile-vanity"
          :name="'John Morrison Doe'"
          :role="'Senior IT Compliance Officer'"
          :since="'3d'"
          category="person"
        />
      </template>
      <template v-slot:content>
        <WikiTextCollapsible :fullText="fullText" />
        <br />
        <div class="card-image">
          <figure>
            <img
              class="is-rounded"
              src="https://bulma.io/images/placeholders/1280x960.png"
              alt="Placeholder image"
            />
          </figure>
        </div>
      </template>
      <template v-slot:footer>
        <div class="post-actions is-flex">
          <Button v-for="(item, index) in postActions" :key="index" type="is-light">
            <Wicon :icon="item.icon" size="small" />
            <span class="is-size-7-mobile has-text-weight-medium">{{ item.name }}</span>
          </Button>
        </div>
      </template>
    </WikiCard>
  </div>
</template>
 
<script>
import Wicon from "../icon/Wicon";
import Button from "../button/Button.vue";

export default {
  name: "PostItem",

  components: {
    Wicon,
    Button,
  },

  data() {
    return {
      fullText:
        "Lorem ipsum dolor sit amet the post slug goes here yadda yadda yadda no way you're reading this all the way to the end you schmuck. Or maybe you will who knows? Chloroxiphite is a rare olive green to pistacio green lead copper halide mineral. It was first discovered in 1923 in the Mendip Hills, Somerset, England associated with mendipite.",
      postActions: [
        {
          name: "like",
          icon: "heart",
        },
        {
          name: "comments",
          icon: "comment",
        },
        {
          name: "share",
          icon: "share",
        },
        {
          name: "send",
          icon: "telegram",
        },
      ],
    };
  },
};
</script>
 
<style lang="scss" scoped>
.profile-vanity {
  padding-left: 1.5rem;
  padding-top: 0.75rem;
}

.post-actions {
  margin-top: -1rem;
  padding: 0.25rem 1.5rem;
  width: 100%;
  justify-content: space-around;

  .button {
    flex-grow: 1;
  }
}
</style>