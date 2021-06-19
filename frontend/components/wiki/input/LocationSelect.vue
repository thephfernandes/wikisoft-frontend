<template>
  <div @blur="selectItem(key)" :class="{ 'location-selector-wrapper': true, active: is_selected }">
    <div class="location-display" @click="is_selected ? selectItem(key) : (is_selected = true)">
      {{ selected_item }}
    </div>
    <div
      v-show="is_selected"
      @scroll="handleScroll"
      :class="{ 'location-list-popup': true, active: is_selected, 'scrolled-to-bottom': scrolled_to_bottom }"
    >
      <ul>
        <li v-for="(item, key) in items" :key="key" v-show="filtered_items.includes(item)" @click="selectItem(key)">
          {{ item }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      required: false,
      default: function () {
        return [
          "The World",
          "Europe",
          "America",
          "Asia",
          "The Pasific",
          "The US",
          "China",
          "India",
          "Russia",
          "France",
          "Germany",
          "England",
        ];
      },
    },
  },
  created() {
    this.selected_item = this.items[0];
  },
  methods: {
    selectItem(key) {
      this.key = key;
      this.selected_item = this.items[this.key];
      this.is_selected = false;
      this.scrolled_to_bottom = false;
      this.$emit("input", this.selected_item);
    },
    handleScroll({ target: { scrollTop, clientHeight, scrollHeight } }) {
      if (scrollTop + clientHeight >= scrollHeight) {
        this.scrolled_to_bottom = true;
      } else {
        this.scrolled_to_bottom = false;
      }
    },
  },
  computed: {
    filtered_items: function () {
      const index = this.key;
      const items = this.items;
      let res = [];
      for (let i = 0; i < items.length; i++) {
        const element = items[i];
        if (i != index) {
          res.push(element);
        }
      }
      return res;
    },
  },
  data() {
    return {
      selected_item: "",
      is_selected: false,
      key: 0,
      scrolled_to_bottom: false,
    };
  },
};
</script>
<style lang="scss" scoped>
.location-selector-wrapper {
  z-index: 10;

  border-top-left-radius: $default-border-radius;
  border-top-right-radius: $default-border-radius;
  font-size: 26px;

  &.active {
    color: white;
    background: rgba(0, 0, 0, 0.653);
    backdrop-filter: saturate(180%) blur(20px);
    // transition: 0.5s;
  }
  width: 145px;
  position: relative;
}
.location-list-popup {
  z-index: 10;
  display: hidden;
  padding-left: 0.4em;
  color: white;
  li {
    z-index: 10;
  }
  li:hover {
    font-weight: 600;
  }
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  &::-webkit-scrollbar {
    display: none;
  }
  width: 145px;
  height: 185px;
  font-size: 18px;
  position: absolute;
  ul {
    z-index: 10;

    display: none;
  }

  &.active {
    ul {
      display: block;
    }
    display: block;

    background: linear-gradient(
      180deg,
      rgba(0, 0, 0, 0.653) 0%,
      rgba(0, 0, 0, 0.653) 85%,
      rgba(0, 0, 0, 0.20211834733893552) 100%
    );
    // transition: 0.5s;
    &.scrolled-to-bottom {
      transition: 0.1ms;
      background: rgba(0, 0, 0, 0.653);
    }
    backdrop-filter: saturate(180%) blur(20px);
  }
  overflow-y: scroll;
  border-bottom-left-radius: $default-border-radius;
  border-bottom-right-radius: $default-border-radius;
}
.location-display {
  z-index: 1;
  &:hover {
    font-weight: 600;
  }
  padding-left: 0.4em;

  opacity: 1;
}
</style>
