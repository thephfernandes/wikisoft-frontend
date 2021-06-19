<template>
  <div>
    <b-steps v-model="current" type="is-info">
      <template v-for="(step, index) in steps">
        <b-step-item :ref="step" :key="index" :label="`STEP ${step}`" >
          <slot :name="`step-${step}-content`"></slot>
        </b-step-item>
      </template>
    </b-steps>
  </div>
</template>

<script>
export default {
  name: "WikiStepper",

  props: {
    steps: Number,
  },


  data() {
    return {
      current: 0,
    }
  },

  computed: {
  },

  methods: {

  }
};
</script>
