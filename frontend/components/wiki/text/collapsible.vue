<template>
  <article class="has-text-black" v-if="fullText">
    <p v-if="!expanded && !readMoreActive"> {{ fullText.slice(0, charLimit) }}<span v-if="exceeds">...</span> </p>

    <p v-else>
      {{ fullText }}
    </p>
    <p class="pt-2" v-if="!expanded && exceeds"
      >
      <a @click="handleReadMore">Read {{ !readMoreActive ? "more" : "less" }}</a>
      </p>
  </article>
</template>

<script>
export default {
  name: "WikiTextCollapsible",

  props: {
    fullText: {
      type: String,
      required: false,
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
    },

    redirect: {
      type: Boolean,
      required: false,
      default: false,
    },

    category: {
      type: String,
      required: false,
    },

    id: {
      type: String,
      required: false,
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

  methods: {
    handleReadMore() {
      if (this.redirect) {
        this.$router.push(`/${this.category}/${this.id}`);
      } else {
        this.readMoreActive = !this.readMoreActive
      }
    }
  }
};
</script>
