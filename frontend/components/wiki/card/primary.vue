<template>
  <div class="card block" :class="{ borderless: borderless }">
    <div class="card-header " :class="{ borderBottom: headerBorder  }">
      <slot name="header"></slot>
    </div>
    <div class="card-content">
      <slot name="content"></slot>
    </div>
    <div class="card-footer" :class="{ borderTop: footerBorder }">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "WikiCard",

  props: {
    borderless: {
      type: Boolean,
      default: false,
      required: false,
    },

    headerBorder: {
      type: Boolean,
      default: false,
      required: false,
    },

    footerBorder: {
      type: Boolean,
      default: false,
      required: false,
    }
  }
};
</script>

<style lang="scss" scoped>
.card.borderless {
  border: none;
}

.card {
  border-radius: 0.6em;
  border: 1px solid lightgrey;
  box-shadow: none;

  .card-header, .card-content, .card-footer {
    padding: 0.5rem 1rem;

    @include mobile {
      padding: 0.5rem;
    }
  }

  .card-header {
    box-shadow: none;

    .card-header-title {
      @include mobile {
        padding: 0.5rem;
      }
    }
  }

  .card-header.borderBottom {
      border-bottom: 1px solid lightgrey;
  }

  .card-footer {
    border-top: none;
  }

  .card-footer.borderTop {
    border-top: 1px solid lightgrey;
  }
}
</style>
