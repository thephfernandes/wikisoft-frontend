<template>
  <article class="has-text-black">
    <p v-if="!expanded && !readMoreActive"> {{ fullText.slice(0, charLimit) }}<span v-if="exceeds">...</span> </p>

    <p v-else>
      {{ fullText }}
    </p>
    <p class="pt-2" v-if="!expanded && exceeds"
      ><a @click="readMoreActive = !readMoreActive">Read {{ !readMoreActive ? "more" : "less" }}</a></p
    >
  </article>
</template>

<script>
export default {
  name: "WikiTextCollapsible",

  props: {
    fullText: {
      type: String,
      required: true,
    },
    
    charLimit: {
      type: Number,
      required: false,
      default: 200,
    },

    expanded: {
      type: Boolean,
      required: false,
      default: false,
    }
  },

  data() {
    return {
      readMoreActive: false,
    };
  },

  computed: {
    /** @return{boolean} */
    exceeds: function () {
      return this.fullText.length > this.charLimit;
    },
  },
};
</script>
