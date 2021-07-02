<template>
  <div class="company-overview">
    <WikiCardPrimary>
      <template v-slot:header>
        <div class="card-header-title">
          <p>{{ company.company_name }} Overview</p>
        </div>
      </template>

      <template v-slot:content>
        <div class="overview-fields">
          <div
            class="field"
            :style="{ gridArea: key }"
            v-for="(key, index) in companyInfoKeys"
            :key="index"
          >
            <div class="has-text-weight-semibold">
              {{
                key.slice(5, key.length).charAt(0).toUpperCase() +
                key.slice(6, key.length)
              }}
            </div>
            <span class="has-text-grey">
              <a v-if="key === 'data_website'" :href="companyWebsite">{{ company[key] || "-" }}</a>
              <span v-else-if="key === 'data_competitors'">
                {{ trimmedCompetitors }}
              </span>
              <span v-else>
                {{ company[key] || "-" }}
              </span>
            </span>
          </div>
        </div>
        <WikiTextCollapsible :fullText="company.description" :charLimit="300" expanded />
      </template>
      <template v-slot:footer> </template>
    </WikiCardPrimary>
  </div>
</template>

<script>
export default {
  name: "WikiCompanyOverview",

  props: {
    company: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      loremIpsum:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    };
  },

  computed: {
    companyInfoKeys() {
      const arr = [];
      Object.keys(this.company).forEach((key) => {
        if (key.toLowerCase().includes("data_")) {
          arr.push(key);
        }
      });
      return arr;
    },

    companyWebsite() {
      const website = this.company.data_website;
      if (website) {
        if(website.includes("http")) {
          return website
        } else {
          return `http://${website}`
        }
      }
      return "";
    },

    trimmedCompetitors() {
      const competitors = this.company.data_competitors.split(",");
      if (competitors.length > 3) {
        let str = "";
        for (let i = 0; i < 3; i++) {
          if (i !== 2) {
            str += competitors[i] + ','
          } else {
            str += competitors[i]
          }
        }
        return str;
      } else {
        return this.company.data_competitors;
      }
    }
  },
};
</script>

<style scoped lang="scss">
.overview-fields {
  position: relative;
  display: grid;
  gap: 10px;
  grid-row-gap: 0px;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto auto auto auto;
  grid-template-areas:
    "data_website data_headquarters"
    "data_employees data_founded"
    "data_type data_industry"
    "data_revenue data_competitors";
  .field {
    @include desktop {
      width: 100%;
      display: grid;
      grid-template-columns: auto auto;
      div {
        width: 100%;
        text-align: left;
      }
      span {
        width: 100%;
        text-align: right;
      }
    }
  }
  @include mobile {
    grid-template-columns: 1fr;
    grid-template-rows: repeat(auto);
    grid-template-areas:
      "data_website"
      "data_headquarters"
      "data_employees"
      "data_founded"
      "data_type"
      "data_industry"
      "data_revenue"
      "data_competitors";
  }
}

.comparison-link {
  position: absolute;
  left: 50%;
  bottom: 0%;
  transform: translateY(-100%);
}
</style>
