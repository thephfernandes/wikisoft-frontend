<template>
  <div class="people-card">
    <WikiHeaderPrimary :semantic="1" :size="2" @click="$router.push('/people/' + data.id + '/')">{{
      data.fullname
    }}</WikiHeaderPrimary>
    <WikiTextCollapsible :fullText="data.description" />
  </div>
</template>

<script>
export default {
  props: {
    expanded: {
      type: Boolean,
      default: false,
      required: false,
    },
    data: {
      type: Object,
      required: true,
    },
  },
  methods: {
    emit_expand: function () {},
  },
};
</script>

<style></style>
