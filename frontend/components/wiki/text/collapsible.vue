<template>
  <p>
    <span v-if="!readMoreActive"> {{ fullText.slice(0, maxLength) }}<span v-if="exceeds">...</span> </span>

    <span v-else>
      {{ fullText }}
    </span>
    <span v-if="exceeds"
      ><a @click="readMoreActive = !readMoreActive">Read {{ !readMoreActive ? "more" : "less" }}</a></span
    >
  </p>
</template>

<script>
export default {
  name: "WikiTextCollapsible",

  props: {
    fullText: String,
    charLimit: Number,
  },

  data() {
    return {
      readMoreActive: false,
    };
  },

  computed: {
    /** @return {number} */
    maxLength: function () {
      return this.charLimit || 200;
    },

    /** @return{boolean} */
    exceeds: function () {
      return this.fullText.length > this.maxLength;
    },
  },
};
</script>
