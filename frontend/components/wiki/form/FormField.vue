<template>
  <b-field :label="label">
    <slot></slot>
  </b-field>
</template>

<script>
export default {
  props: {
    label: String,
  },
};
</script>
