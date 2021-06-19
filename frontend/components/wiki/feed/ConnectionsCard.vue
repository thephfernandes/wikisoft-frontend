<template>
  <div class="card" style="border-radius: 1rem">
    <div class="card-content">
      <div class="card-header-title px-0">
        <p
          class="is-size-6 has-text-centered"
          style="width: 100%; white-space: nowrap"
        >
          See who you already know on WikiProfile
        </p>
      </div>
      <p class="is-size-6 has-text-grey has-text-centered">
        Import your email contacts to see who you already know on WikiProfile
      </p>
      <b-field>
        <Input icon="mail" placeholder="Enter email" size="medium" />
      </b-field>
      <Button :expanded="true" :type="'is-success'"
        ><span class="is-uppercase">continue</span></Button
      >
      <hr style="border: 1px; background-color: lightgrey" />
      <p class="is-size-6 has-text-weight-bold has-text-centered">
        Invite your network to WikiProfile and get 3 months premium subscription
      </p>
      <Button :expanded="true" :type="'is-success'" :iconLeft="'crown'"
        ><span class="is-uppercase">get free premium</span></Button
      >
    </div>
  </div>
</template>

<script>
import Button from "../button/Button.vue";
import Input from "../input/Input.vue";
export default {
  name: "card",
  components: {
    Button,
    Input,
  },
};
</script>
<style lang="scss" scoped>
.card {
  border: 1px solid lightgrey;
  box-shadow: none;
}
</style>