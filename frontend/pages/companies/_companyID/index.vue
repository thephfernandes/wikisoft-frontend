<template>
  <div class="company-profile-page">
    <div class="container">
      <div
        class="tile is-vertical"
        v-if="featuredCompany.company_name || selectedCompany.company_id"
      >
        <div class="tile is-parent">
          <div class="tile is-child">
            <WikiCompanyBanner
              :company="!featuredCompany ? selectedCompany : featuredCompany"
            />
          </div>
        </div>
        <div class="tile is-parent">
          <div class="tile is-child is-8">
            <WikiCompanyOverview
              class="block"
              :company="!featuredCompany ? selectedCompany : featuredCompany"
            />
          </div>
          <div class="tile is-child is-4">
            <WikiGoogleMap class="block" :place="featuredCompany.headquarters">
              <template v-slot:header>
                <WikiHeaderPrimary :size="3" :semantic="3">
                  Headquarters
                </WikiHeaderPrimary>
              </template>
            </WikiGoogleMap>
            <WikiCompanySimilarList 
              class="block"
              :company="!featuredCompany ? selectedCompany : featuredCompany"
            />
          </div>
        </div>
      </div>

      <div class="tile is-vertical" v-else>
        <b-progress class="mt-5"></b-progress>
      </div>
      </div>
    </div>
  </div>
</template>

<script>
import companyData from "~/assets/data/featured-companies.json";

export default {
  name: "CompanyProfilePage",

  methods: {
    reroute: function () {
      this.$router.push("/");
    },
  },

  data() {
    return {
      companyId: this.$route.params.companyID,
      featuredCompany: {},
      tabs: [
        {
          name: "overview",
        },
        {
          name: "reviews",
          amount: "1.2K",
        },
        {
          name: "jobs",
          amount: "765",
        },
        {
          name: "salaries",
          amount: "1.2K",
        },
        {
          name: "interviews",
          amount: "336",
        },
        {
          name: "benefits",
          amount: "20",
        },
        {
          name: "photos",
          amount: "17",
        },
      ],
      jobs: [
        {
          title: "Head of Finance",
          company: "Atlassian",
          location: "Copenhagen, Denmark",
          categories: ["senior", "full time"],
          description:
            "Oversee and optimise all finance management processes. Lead annual budgeting, reporting and planning process. Oversee and sustain CERT finance and accounting team to ensure timely and accurate monthly, quarterly, and year-end financial reporting. Oversee annual audit process. Keep the CEO abreast of matters affecting the financial status of the company. Deliver concise yet fit for purpose CEO and board briefings on the financial health of the company. Enhancement of financial management processes to drive better decisions in support of accelerated growth. Support the company in its transition towards a software as a service company with subscription-based pricing models",
          tags: ["Finance", "Lead"],
          postedOn: "August 06, 2020",
        },
        {
          title: "Junior Backend Developer",
          company: "Atlassian",
          location: "Amsterdam, Netherlands",
          categories: ["mid-level", "part time"],
          description:
            "For the software development team at Atlassan we are looking for an experienced back-end developer who likes to work in a multi-disciplinary team with front-end, back-end and cloud engineers. Together they use innovative technologies to create state of the art eCommerce software.",
          tags: ["IT", "Algorithm Design"],
          postedOn: "August 06, 2020",
        },
        {
          title: "Technical Sales",
          company: "Atlassian",
          location: "Brighton, United Kingdom",
          categories: ["junior", "full time"],
          description:
            "Are you a talented and ambitious Graduate looking for your first role in Sales? With a global communications technology company in addition to a highly competitive salary? Do you want to make a difference? If the answer is ‘yes’ this could be your next role! With a passion for technology and a real desire to succeed you will be a pivotal part of our fantastic sales team at Atlassan.",
          tags: ["Customer Oriented", "Engaging"],
          postedOn: "August 06, 2020",
        },
      ],
    };
  },

  async created() {
    // if (this.selectedCompany?.company_id === undefined) {
    //   await this.$store.dispatch("companies/fetchSelectedCompany", this.companyId);
    // }
    this.findFeaturedCompany();
  },

  computed: {
    selectedCompany() {
      return this.$store.getters["companies/getSelectedCompany"];
    },

    thumbnailSrc() {
      return `http://io.wikiprofile.com/assets/${this.selectedCompany.thumbnail}`;
    },

    photoSrc() {
      return `http://io.wikiprofile.com/assets/${this.selectedCompany.photo}`;
    },
  },

  methods: {
    findFeaturedCompany() {
      this.featuredCompany = companyData.find(
        (item) =>
          item.company_name.toLowerCase() === this.companyId.toLowerCase()
      );
    },
  },
};
</script>
