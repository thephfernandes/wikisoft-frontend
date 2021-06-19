<template>
  <NuxtLink v-if="links !== '' && links !== undefined && links !== null" :to="links">
    <b-button
      @click="$emit('click')"
      :type="type"
      :disabled="disabled"
      :inverted="inverted"
      :rounded="rounded"
      :expanded="expanded"
      :loading="loading"
      :outlined="outlined"
      :size="size"
      :icon-left="iconLeft"
      :icon-right="iconRight"
      :icon-pack="'fad'"
      :class="{ 'is-square' : squared }"
    >
      <slot> </slot>
    </b-button>
  </NuxtLink>
  <b-button
    @click="$emit('click')"
    :type="type"
    :disabled="disabled"
    :inverted="inverted"
    :rounded="rounded"
    :expanded="expanded"
    :loading="loading"
    :outlined="outlined"
    :size="size"
    :icon-left="iconLeft"
    :icon-right="iconRight"
    :icon-pack="'fad'"
    :class="{ 'is-square' : squared }"
    v-else
  >
    <slot> </slot>
  </b-button>
</template>
<script>
import lerp from "../../../utils/lerp";
export default {
  name: "based",
  inject: ["size", "type"],
  props: {
    size: {
      default() {
        const Lerp = new lerp();

        return Lerp.buefySizeSwitch(this.size);
      },
    }, // sm, md, bg, ...
    disabled: Boolean,
    inverted: Boolean,
    rounded: Boolean,
    expanded: Boolean,
    loading: Boolean,
    outlined: Boolean,
    iconLeft: String,
    iconRight: String,
    links: String,
    squared: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      default: "is-default"
    }, // pri, light, dark
  },
};
</script>

<style lang="scss" scoped>
.is-square {
  border-radius: 0;
}

</style>
