<template>
  <div class="big-sidebar-wrapper">
    <div class="big-sidebar-container">
      <div class="sidebar-logo-holder">
        <div class="square-logo-container">
          <img src="../../../assets/wikiprofile-logo-square-white.svg" />
        </div>
      </div>
      <hr />
      <div v-if="$auth.user" class="sidebar-profile-card" @click="$router.push('/people/' + user_id + '/')">
        <div class="round-profile-pic-container">
          <img v-if="img_url" :src="'https://api.wikiprofile.com/assets/' + img_url" alt="user image" />
        </div>
        <textLine :size="0.6" :weight="0.8">{{ user_name }}</textLine>
        <MultiLine :size="0.35">{{ job_title }}</MultiLine>
      </div>
      <hr v-if="$auth.user" />
      <div v-if="$auth.user" class="sidebar-profile-stats">
        <div class="sidebar-stats-list" v-if="statistics_array.length > 0">
          <div v-for="(stat, key) in statistics_array" :key="key" class="sidebar-stats-card">
            <span class="sidebar-stats-card-lhs">
              <textLine :size="0.35">
                {{ stat.key }}
              </textLine>
            </span>
            <span class="sidebar-stats-card-rhs">
              <textLine :size="0.4"> {{ stat.value }} </textLine>
            </span>
          </div>
        </div>
      </div>
      <!-- <hr />
      <div class="sidebar-premium-button">
        <Button :expanded="true" :type="'is-success'" :iconLeft="'crown-outline'">Get Premium</Button>
      </div> -->
      <hr v-if="$auth.user" />
      <div class="sidebar-finish-profile">
        <Button
          :expanded="true"
          :iconLeft="'crown'"
          v-if="$auth.user"
          @click="$router.push('/people/' + user_id + '/settings')"
          >Finish profile</Button
        >
        <Button
          type="is-success"
          :expanded="true"
          :iconLeft="'crown'"
          v-if="!$auth.user"
          @click="$router.push('/auth/sign-up')"
          >Sign up</Button
        >
        <hr />
        <Button type="is-link" :expanded="true" :iconLeft="'crown'" v-if="!$auth.user" @click="$router.push('/login')"
          >Login</Button
        >
      </div>
    </div>
  </div>
</template>

<script>
import textLine from "../text/textLine.vue";
import MultiLine from "../text/MultiLine.vue";
import Button from "../button/Button.vue";

export default {
  props: {
    img_url: {
      type: String,
    },
    user_name: {
      type: String,
    },
    user_id: {
      type: String,
    },
    job_title: {
      type: String,
    },
    statistics_array: {
      type: Array,
      default: () => {
        return [];
      },
    },
    has_premium: {
      type: Boolean,
    },
    has_finished_profile: {
      type: Boolean,
    },
  },
  components: { textLine, MultiLine, Button },
};
</script>

<style lang="scss" scoped>
.big-sidebar-wrapper {
  margin-left: 1.6em;
  margin-right: 1.6em;
  margin-top: 50px;
}
.big-sidebar-container {
  width: 100%;
  height: auto;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: repeat(auto-fill, minmax(100px, 1fr));
}
.sidebar-logo-holder {
  height: 100%;
  width: 100%;
  display: grid;
}
.square-logo-container {
  justify-self: center;
  align-self: center;
  display: grid;
  img {
    justify-self: center;
    align-self: center;
    height: 5.5em;
    width: 5.5em;
  }
  padding: 0.25em;
  height: 8em;
  width: 8em;
  background-color: $logo-blue;
  border-radius: 16px;
}
.sidebar-profile-card {
  .round-profile-pic-container {
    img {
      height: 5.5em;
      width: 5.5em;
      border-radius: 50%;
    }
  }
  text-align: center;
  height: 100%;
  width: 100%;
}
.sidebar-profile-stats {
  height: 100%;
  width: 100%;
}
.sidebar-premium-button {
  height: 100%;
  width: 100%;
}
.sidebar-finish-profile {
  height: 100%;
  width: 100%;
}
hr {
  height: 1px;
  background-color: $primary-light-gray;
}
.sidebar-stats-card {
  display: grid;
  grid-template-columns: 3fr 1fr;
  width: 100%;
  .sidebar-stats-card-lhs {
    text-align: left;
  }
  .sidebar-stats-card-rhs {
    text-align: right;
    color: $logo-blue;
  }
}
</style>
