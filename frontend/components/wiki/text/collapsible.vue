<template>
  <article class="has-text-black py-3">
    <p v-if="!readMoreActive"> {{ fullText.slice(0, maxLength) }}<span v-if="exceeds">...</span> </p>

    <p v-else>
      {{ fullText }}
    </p>
    <p class="pt-2" v-if="exceeds"
      ><a @click="readMoreActive = !readMoreActive">Read {{ !readMoreActive ? "more" : "less" }}</a></p
    >
  </article>
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
