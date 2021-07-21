<template>
  <div class="card block" :class="{ borderless: borderless, featured: featured }">
    <div class="card-header" v-if="!contentOnly" :class="{ borderBottom: headerBorder, featured: featured }">
      <slot name="header"></slot>
    </div>
    <div class="card-content" :class="{ featured: featured   }">
      <slot name="content"></slot>
    </div>
    <div class="card-footer" v-if="!contentOnly" :class="{ borderTop: footerBorder, featured: featured }">
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

    featured: {
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
    },

    contentOnly: {
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

.card.featured {
  @include desktop {
    height: 420px;
    min-width: 320px;
  }
}

.card {
  border-radius: 0.6em;
  border: 1px solid lightgrey;
  box-shadow: none;

  display: flex;
  flex-direction: column;

  .card-header, .card-content, .card-footer {
    padding: 0.5rem 1rem;
    flex-grow: 1;

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

  .featured {
    width: 100%;
  }
  
  .card-header.borderBottom {
      border-bottom: 1px solid lightgrey;
  }

  .card-header.featured {
    height: 30%;
  }

  .card-content.featured {
    height: 50%;
    display: flex;
    align-items: center;
  }

  .card-footer {
    border-top: none;
  }

  .card-footer.featured {
    height: 20%;
  }

  .card-footer.borderTop {
    border-top: 1px solid lightgrey;
  }
}
</style>
