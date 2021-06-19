<template>
  <div class="person-profile-page">
    <div class="content-wrapper" v-if="!loading">
      <div class="tile is-8">
        <div class="person-wrapper" v-if="person.person_id">
          <WikiCardPrimary class="profile-banner block">
            <template v-slot:content>
              <div
                class="header-wrapper is-flex is-justify-content-space-between"
                style="width: 100%"
              >
                <div class="photo-name-wrapper is-flex-direction-column">
                  <div class="card-header-icon pl-0">
                    <figure class="image is-128x128">
                      <img
                        class="profile-image is-rounded"
                        :src="
                          profilePhotoSrc ||
                          'https://bulma.io/images/placeholders/128x128.png'
                        "
                        alt="profile picture"
                      />
                    </figure>
                  </div>
                </div>
                <div class="profile-actions is-flex-direction-column">
                  <b-button outlined class="is-link is-light report-button" @click="reportModalActive = true">
                    <div class="button-content is-flex is-align-items-center">
                      <WikiIconWicon icon="flag" />
                      <span class="is-uppercase">report</span>
                    </div>
                  </b-button>
                  <div class="claim-wrapper">
                    <b-dropdown position="is-bottom-left">
                      <template v-slot:trigger>
                        <a role="button">
                          <p
                            class="py-2 has-text-grey has-text-centered has-text-weight-semibold"
                          >
                            Is this you?
                          </p>
                        </a>
                      </template>

                      <b-dropdown-item custom>
                        <b-message type="is-info">
                          <p>
                            If you think this person matches your profile, you
                            can claim it. By claiming this profile you won't be
                            able to make others profiles with your email.
                            <a role="button" @click="attemptPersonProfileClaim"
                              >I understand</a
                            >.
                          </p>
                        </b-message>
                      </b-dropdown-item>
                    </b-dropdown>
                  </div>
                </div>
              </div>
              <div class="is-flex is-flex-direction-column">
                <div class="card-header-title pl-0">
                  <p class="is-size-4">
                    {{ person.data_full_name }}
                  </p>
                </div>
                <p class="has-text-grey">{{ person.data_title }}</p>
                <p class="has-text-grey">{{ person.data_location }}</p>
              </div>
              <div class="is-size-5">
                <p class="has-text-grey has-text-weight-semibold">
                  {{ person.description }}
                </p>
                <p class="has-text-grey has-text-weight-semibold">
                  {{ person.location ? person.location : "" }}
                  <span v-if="person.location">·</span>
                  <a
                    href="
          "
                    >{{
                      person.data_number_of_connections > 500
                        ? "500+"
                        : person.data_number_of_connections
                    }}
                    connections</a
                  >
                  <span v-if="person.data_number_of_connections">·</span>
                  <a href=""><span>Contact Info</span></a>
                </p>
              </div>

              <!-- <div
          class="pt-5 profile-interactions is-flex is-justify-content-space-between"
          style="width: 100%"
        >
          <b-button
            class="is-link is-light py-3"
            v-for="(item, i) in interactions"
            :key="i"
          >
            <p
              class="is-uppercase is-size-5 has-text-centered has-text-weight-medium"
            >
              {{ item }}
            </p>
          </b-button>
        </div> -->
            </template>
          </WikiCardPrimary>

          <WikiCardPrimary
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
                <!-- ignore shitty usage of props -->
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
              <div class="skills-list is-flex is-flex-wrap-wrap is-justify-content-space-between">
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
              <div
                class="interest-list is-flex is-flex-wrap-wrap"
              >
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
          </WikiCardPrimary>
        </div>

        <div v-else>
          <div
            class="block is-flex is-align-items-center is-justify-content-center"
          >
            <WikiHeaderPrimary :size="3" :semantic="2">
              Could not find this person
            </WikiHeaderPrimary>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <b-progress class="mt-5"></b-progress>
    </div>

    <b-modal v-model="reportModalActive" has-modal-card can-cancel>
      <template v-slot:default="props">
        <WikiProfileReport @close="props.close" :id="personId"/>
      </template>
    </b-modal>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      personId: this.$route.params.peopleID,
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
    await this.$store.dispatch("people/fetchSelectedPerson", this.personId);
    this.loading = false;
  },

  computed: {
    person() {
      return this.$store.getters["people/getSelectedPerson"];
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

    async attemptPersonProfileClaim() {
      if (this.$auth.user) {
        await this.$store.dispatch("user/claimProfile", this.personId);
      } else {
        this.$router.push("/login");
      }
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
  background-color: aliceblue;
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
