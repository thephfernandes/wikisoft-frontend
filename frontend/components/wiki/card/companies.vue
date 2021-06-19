<template>
  <div
    :class="{
      'company-card animate__animated animate__fadeIn': true,
      inactive:
        (data.img_url === null || data.img_url === '' || data.img_url === undefined) &&
        (data.description === '' || data.description === undefined || data.description === null),
    }"
  >
    <div
      v-if="data.img_url !== null"
      :class="{
        'company-icon block': true,
        active: data.img_url !== null,
      }"
    >
      <img :src="'https://api.wikiprofile.com/assets/' + data.img_url" alt="logo" v-if="data.img_url" />
    </div>
    <div class="company-header">
      <NuxtLink :to="`/companies/${data.link}/`">
        {{ data.name }}
      </NuxtLink>
    </div>
    <div class="company-industries">
      <div class="main-industries">
        <span class="tag-wrapper-replacement" type="is-light">{{ data.industry }}</span>
      </div>
      <div class="sub-industries">
        <span
          class="tag-wrapper-replacement"
          size="is-small"
          type="is-light"
          v-if="data.founded !== '' && data.founded !== undefined && data.founded != null"
          >{{ data.founded.split("/")[2] }}</span
        >
        <span
          class="tag-wrapper-replacement"
          type="is-light"
          v-if="
            data.number_of_employees !== 0 &&
            data.number_of_employees !== '' &&
            data.number_of_employees !== undefined &&
            data.number_of_employees != null
          "
          >{{ data.number_of_employees }}</span
        >
      </div>
    </div>
    <div
      :class="{
        'company-description': true,
        inactive:
          (data.img_url === null || data.img_url === '' || data.img_url === undefined) &&
          (data.description === '' || data.description === undefined || data.description === null),
      }"
    >
      <WikiTextCollapsible :fullText="data.description" />
    </div>
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
<style lang="scss" scoped>
.company-card {
  grid-gap: 0.7em;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 68px;
  grid-template-rows: auto auto auto;
  grid-template-areas:
    "heading icon"
    "industries icon"
    "description icon";
  &.inactive {
    grid-gap: 0.7em;
    width: 100%;
    display: grid;
    grid-template-columns: auto;
    height: 36px;
    grid-template-rows: auto auto repeat(0px);
    grid-template-areas:
      "heading"
      "industries";
  }
}
.company-icon {
  &:active {
    display: hidden;
  }
  height: 56px;
  width: 56px;
  padding: 4px;
  grid-area: icon;
  margin-right: 4px;
}
.company-header {
  line-height: 0.9;
  align-self: center;
  font-size: 14px !important;
  grid-area: heading;
}
.company-description {
  &.inactive {
    margin-bottom: 0px;
    height: 0px;
  }
  color: rgb(32, 32, 32);
  margin-top: -8px;
  grid-area: description;
  font-size: 12px;
  line-height: 1.1;
  text-align: left;
}
.company-industries {
  .main-industries {
    margin-right: 4px;
  }
  display: flex;
  grid-area: industries;
  margin-top: -12px;
}
.tag-wrapper-replacement {
  border-radius: 8px;
  padding: 2px;
  padding-left: 4px;
  padding-right: 4px;
  height: 12px;
  padding-top: -2px;
  font-size: 10px;
  background-color: #eeeeee;
}
</style>
