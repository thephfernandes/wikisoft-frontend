<template>
  <div class="person-profile-page">
    <div class="container">
      <div class="tile is-vertical">
        <div class="tile is-parent" v-if="!loading">
          <div class="tile is-8">
            <div
              class="person-wrapper block" style="width: 100%;"
              v-if="featuredPerson || person.person_id || person.id"
            >
              <WikiPersonBanner
                class="block"
                :person="!featuredPerson.full_name ? person : featuredPerson"
              />
              <WikiPersonOverview
                class="block"
                :person="!featuredPerson.full_name ? person : featuredPerson"
              />
              <!-- <WikiCardPrimary
                class="profile-experience block"
                styles="has-borders"
              >
                <template v-slot:header>
                  <div class="card-header-title">
                    <p class="is-size-4">Experience</p>
                  </div>
                </template>
                <template v-slot:content>
                  <div class="experience-list">
                    <div
                      class="experience-item block"
                      v-for="(item, i) in experiences"
                      :key="i"
                    >
                      <WikiProfileVanity
                        :name="item.role"
                        :role="`${item.company}, ${item.hours}`"
                        :since="`${item.startDate} - ${
                          item.isCurrent ? 'Present' : item.endDate
                        }`"
                        category="job"
                      />
                      <WikiTextCollapsible
                        class="job-description"
                        :fullText="item.description"
                        expandDisabled
                      />
                    </div>
                  </div>
                </template>
                <template v-slot:footer>
                  <div
                    class="list-expand is-flex is-justify-content-center py-2"
                    style="width: 100%"
                  >
                    <a href="" style="color: cornflowerblue">
                      <span class="has-text-weight-semibold">Show More</span>
                    </a>
                  </div>
                </template>
              </WikiCardPrimary>

              <WikiCardPrimary
                class="profile-education block"
                styles="has-borders"
                v-if="person.data_educations"
              >
                <template v-slot:header
                  ><div class="card-header-title">
                    <p class="is-size-4">Education</p>
                  </div>
                </template>
                <template v-slot:content>
                  <div class="education-list">
                    <div
                      class="education-item block"
                      v-for="(item, i) in separateCSV(person.data_educations)"
                      :key="i"
                    >
                      <WikiProfileVanity :name="item" category="institute" />
                      <WikiTextCollapsible
                        v-if="item.description"
                        class="education-description"
                        :fullText="item.description"
                        expandDisabled
                      />
                    </div>
                  </div>
                </template>
                <template v-slot:footer>
                  <div
                    class="list-expand is-flex is-justify-content-center py-2"
                    style="width: 100%"
                  >
                    <a href="" style="color: cornflowerblue">
                      <span class="has-text-weight-semibold">Show More</span>
                    </a>
                  </div>
                </template>
              </WikiCardPrimary>

              <WikiCardPrimary
                class="profile-skills block"
                v-if="person.data_skill"
              >
                <template v-slot:header>
                  <div class="card-header-title">
                    <p class="is-size-4">Skills</p>
                  </div>
                </template>
                <template v-slot:content>
                  <div
                    class="
                      skills-list
                      is-flex is-flex-wrap-wrap is-justify-content-space-between
                    "
                  >
                    <div
                      class="skill-item mb-1"
                      v-for="(item, i) in separateCSV(person.data_skill)"
                      :key="i"
                    >
                      <span class="is-uppercase has-text-weight-semibold">{{
                        item
                      }}</span>
                    </div>
                  </div>
                </template>
              </WikiCardPrimary>

              <WikiCardPrimary
                class="profile-interests block"
                v-if="person.data_interested"
              >
                <template v-slot:header>
                  <div class="card-header-title">
                    <p class="is-size-4">Interests</p>
                  </div>
                </template>
                <template v-slot:content>
                  <div class="interest-list is-flex is-flex-wrap-wrap">
                    <div
                      class="interest-item mb-2 mr-2"
                      v-for="(item, i) in person.data_interested"
                      :key="i"
                    >
                      <span class="is-uppercase has-text-weight-semibold">
                        {{ item }}
                      </span>
                    </div>
                  </div>
                </template>
              </WikiCardPrimary>
              <WikiCardPrimary class="profile-recommendations block">
                <template v-slot:header>
                  <div class="card-header-title">
                    <p class="is-size-4">Recommendations</p>
                  </div>
                </template>
                <template v-slot:content>
                  <div class="recommendations-list">
                    <div
                      class="recommendation-item"
                      v-for="(item, i) in recommendations"
                      :key="i"
                    >
                      <WikiProfileVanity
                        :name="item.from"
                        :role="item.role"
                        :since="item.when"
                      />
                      <WikiTextCollapsible
                        class="recommendation-description"
                        :fullText="item.description"
                      />
                    </div>
                  </div>
                </template>
              </WikiCardPrimary> -->
            </div>

            <div v-else>
              <div
                class="
                  block
                  is-flex is-align-items-center is-justify-content-center
                "
              >
                <WikiHeaderPrimary :size="3" :semantic="2">
                  Could not find this person
                </WikiHeaderPrimary>
              </div>
            </div>
          </div>
          <div class="tile is-4">
            <WikiPersonSimilarList
              class="block"
              :person="!featuredPerson ? person : featuredPerson"
            />
          </div>
        </div>
        <div class="tile" v-else>
          <b-progress class="mt-5"></b-progress>
        </div>
      </div>
    </div>

    <b-modal v-model="reportModalActive" has-modal-card can-cancel>
      <template v-slot:default="props">
        <WikiProfileReport @close="props.close" :id="personId" />
      </template>
    </b-modal>
  </div>
</template>

<script>
import peopleData from "~/assets/data/featured-people.json";
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      loading: false,
      personId: this.$route.params.peopleID,
      isMe: this.$route.query.me,
      publicView: this.$route.query.me,
      featuredPerson: {},
      profileImage: "",
      canEdit: false,
      reportModalActive: false,
      interactions: ["message", "download pdf", "recommend"],

      experiences: [
        {
          role: "Head of Design Team",
          company: "Atlassian",
          hours: "Full Time",
          startDate: "May 2020",
          isCurrent: true,
          endDate: "",
          location: "Copenhagen, Denmark",
          description:
            "Lorem ipsum dolor sit amet the post slug goes here yadda yadda yadda no way you're reading this all the way to the end you schmuck. Or maybe you will who knows? Chloroxiphite is a rare olive green to pistacio green lead copper halide mineral. It was first discovered in 1923 in the Mendip Hills, Somerset, England associated with mendipite.",
        },
        {
          role: "Head of Design Team",
          company: "Atlassian",
          hours: "Full Time",
          startDate: "May 2020",
          isCurrent: true,
          endDate: "",
          location: "Copenhagen, Denmark",
          description:
            "Lorem ipsum dolor sit amet the post slug goes here yadda yadda yadda no way you're reading this all the way to the end you schmuck. Or maybe you will who knows? Chloroxiphite is a rare olive green to pistacio green lead copper halide mineral. It was first discovered in 1923 in the Mendip Hills, Somerset, England associated with mendipite.",
        },
        {
          role: "Head of Design Team",
          company: "Atlassian",
          hours: "Full Time",
          startDate: "May 2020",
          isCurrent: true,
          endDate: "",
          location: "Copenhagen, Denmark",
          description:
            "Lorem ipsum dolor sit amet the post slug goes here yadda yadda yadda no way you're reading this all the way to the end you schmuck. Or maybe you will who knows? Chloroxiphite is a rare olive green to pistacio green lead copper halide mineral. It was first discovered in 1923 in the Mendip Hills, Somerset, England associated with mendipite.",
        },
      ],
      recommendations: [
        {
          from: "James Francis Bean",
          role: "Best practice AI Council Member",
          when: "October 19, 2019",
          description:
            "Let me tell tell you something about this person; if you need something, ANYTHING done, this is your guy. I'm talking babysitting, construction work, tax evasion, marketing consultancy you name it. John Pablo Escobar Doe is your guy. One time I saw him bet on black 43 times in a row at a roulette table in Brighton and the mad lad won all 43 times. A priest has legally declared him without a soul.",
        },
      ],
    };
  },

  async created() {
    this.loading = true;
    if (this.isMe && this.publicView) {
      this.$store.commit("people/setSelectedPerson", this.$auth.user);
      this.$store.commit("people/setIsFeatured", false);
    } else {
      if (this.isStatic) {
      this.findFeaturedPerson();
    } else {
        await this.$store.dispatch("people/fetchSelectedPerson", this.personId);
      }
    }
    this.loading = false;
  },

  computed: {
    ...mapGetters({
      isFeatured: "people/getIsFeatured",
      people: "people/getPeople",
      person: "people/getSelectedPerson",
    }),

    isStatic() {
      return (
        this.isFeatured &&
        this.people.filter((item) => item.name === this.personId)
      );
    },

    profilePhotoSrc() {
      return `http://io.wikiprofile.com/assets/${this.person.profile_img}`;
    },
  },

  methods: {
    separateCSV(value) {
      if (value && value !== "" && value != null && value != undefined)
        return value.split(",");
      return [];
    },

    findFeaturedPerson() {
      this.featuredPerson = peopleData.find(
        (item) => item.full_name.toLowerCase() === this.personId.toLowerCase()
      );
    },
  },
};
</script>

<style lang="scss" scoped>
.job-description,
.education-description,
.recommendation-description {
  padding-left: 105px;

  @include mobile {
    padding-left: 0;
  }
}

.interest-item,
.skill-item {
  background-color: #e3f2ff;
  color: cornflowerblue;
  min-width: 7rem;
  padding: 0.5rem;
  text-align: center;
}

.list-expand {
  border-top: 1px solid lightgrey;
}

.claim-wrapper {
  display: flex;
  justify-content: center;
}

.report-button {
  border-radius: 0.1em;
}
</style>
