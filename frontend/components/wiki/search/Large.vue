<template>
  <div class="card" style="border-radius: 1rem">
    <template v-if="hasLocation">
      <div class="level is-mobile">
        <div class="level-left">
          <b-field expanded>
            <Input :rounded="true" :expanded="true" />
            <Input :rounded="true" :expanded="true" />
            <b-button size="is-medium" :label="'search'"></b-button>
          </b-field>
        </div>
      </div>
    </template>
    <template v-else>
      <div class="box px-5 py-5" style="border-radius: 1rem">
        <template v-if="Page === 'home'">
          <WikiHeaderPrimary :semantic="1" :size="4"> Search for a person you know</WikiHeaderPrimary>
        </template>
        <br />
        <b-field expanded>
          <b-autocomplete
            rounded
            v-model="lhsSearch"
            :data="filteredDataArray"
            :placeholder="`search for ${Page !== 'home' ? Page : 'person'}`"
            icon="magnify"
            clearable
            expanded
            @select="(option) => (selected = option)"
          >
            <template #empty>No results found</template>
          </b-autocomplete>
          <RounderButton type="primary" size="default" :roundleft="false">Search</RounderButton>
        </b-field>
      </div>
    </template>
  </div>
</template>
ewe
<script>
import Input from "../input/Input";
import RounderButton from "../button/RounderButton";
import lerp from "../../../utils/lerp";
export default {
  props: {
    whichPageAmI: {
      type: String,
      default: "people",
    },
    hasLocation: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    Input,
    RounderButton,
  },
  data() {
    return {
      lhsSearch: "",
      rhsSearch: "",
      data: [],
    };
  },
  computed: {
    filteredDataArray() {
      return this.data.filter((option) => {
        return option.toString().toLowerCase().indexOf(this.lhsSearch.toLowerCase()) >= 0;
      });
    },
    Page: {
      get: function () {
        const Lerp = new lerp();
        const page = this.whichPageAmI;
        const _comp = Lerp.whichPageAmIOn(page) ? Lerp.whichPageAmIOn(page) : page;
        return _comp;
      },
    },
  },
  watch: {
    lhsSearch: function () {
      this.push();
    },
    rhsSearch: function () {
      this.push();
    },
  },
  methods: {
    push() {
      this.$emit("input", {
        lhs: this.lhsSearch,
        rhs: this.rhsSearch,
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.card,
.box {
  background-color: $boundingbox-secondary-col;
  box-shadow: none;
}

.card {
  border: 1px solid lightgrey;
}
</style>
