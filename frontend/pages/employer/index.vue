<template>
  <div class="employer-info-page is-fluid block">
    <br />
    <WikiHeaderPrimary :semantic="5" :size="3"
      >Why you should have a <u>free</u> employer account.</WikiHeaderPrimary
    >
    <WikiHeaderPrimary :semantic="6" :size="3"></WikiHeaderPrimary>
    <br />
    <div class="tile is-parent">
      <div class="tile">
        <div class="tile is-child">
          <WikiCardPrimary class="employer-info-card" featured>
            <template v-slot:header>
              <div class="card-header-title iconlinetexthead">
                <b-icon id="icon" icon="lightbulb-on" size="is-large" />
                <WikiHeaderPrimary id="header" :semantic="5" :size="3"
                  >Employer branding</WikiHeaderPrimary
                >
                <hr class="green-pseudoelement" />
              </div>
            </template>
            <template v-slot:content>
              <div class="expanded">
                <WikiHeaderPrimary :semantic="5" :size="3"
                  >Branding and Visibility on the internet</WikiHeaderPrimary
                >
                <WikiTextMultiLine gray :size="0.33" :weight="0.45">
                  Your Wikiprofile may be the only exposure and branding on the
                  internet. Make the most of it and we will optimize so you get
                  branding and exposure on the internet
                </WikiTextMultiLine>
              </div>
            </template>
            <template v-slot:footer>
              <div class="block get-employer-account-btn">
                <WikiButtonBased
                  :type="'is-link'"
                  size="large"
                  links="/employer/add"
                  >Get Free Account</WikiButtonBased
                >
              </div>
            </template>
          </WikiCardPrimary>
        </div>
      </div>
      <div class="tile">
        <div class="tile is-child">
          <WikiCardPrimary class="employer-info-card" featured>
            <template v-slot:header>
              <div class="card-header-title iconlinetexthead">
                <b-icon id="icon" icon="account-heart" size="is-large" />
                <div v-if="$device.isMobile">
                  <WikiHeaderPrimary id="header" :semantic="5" :size="3"
                    >Explain what you</WikiHeaderPrimary
                  >
                  <WikiHeaderPrimary
                    class="mt-2"
                    id="header"
                    :semantic="5"
                    :size="3"
                    >stand for</WikiHeaderPrimary
                  >
                </div>
                <div v-else>
                  <WikiHeaderPrimary id="header" :semantic="5" :size="3"
                    >Explain what you stand for</WikiHeaderPrimary
                  >
                </div>
                <hr class="green-pseudoelement" />
              </div>
            </template>
            <template v-slot:content>
              <div class="expanded">
                <WikiHeaderPrimary :semantic="5" :size="3"
                  >Jok seekers want to know what you stand
                  for</WikiHeaderPrimary
                >
                <WikiTextMultiLine gray :size="0.33" :weight="0.45">
                  Respond to reviews to give job seekers confidence in your
                  company. Explain what you stand for and provide transparency
                </WikiTextMultiLine>
              </div>
            </template>
          </WikiCardPrimary>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>
<style lang="scss" scoped>
.employer-info-page {
  min-height: 100vh;
}

.employer-info-card {
  @include desktop {
    max-height: 330px;
  }
}

.get-employer-account-btn {
  align-self: flex-end;
}

.expanded {
  width: 100%;
  align-self: flex-start;
}

.iconlinetexthead {
  display: grid !important;
  grid-template-areas:
    "hicon htext"
    "hicon hline";
  grid-template-columns: 64px auto;
  grid-template-rows: 48px 16px;
}
.green-pseudoelement {
  margin: 2px;
  grid-area: hline;
  display: block;
  height: 4px;
  width: 76px;
  background-color: rgb(18, 176, 18);
}
#icon {
  grid-area: hicon;
  color: $primary;
}
#header {
  color: $primary;
  align-self: bottom;
  justify-self: bottom;
  margin-bottom: -16px;
  grid-area: htext;
}
</style>
