<template>
  <div class="employer-info-page is-fluid">
    <br />
    <WikiHeaderPrimary :semantic="5" :size="3">Why you should have a free account</WikiHeaderPrimary>

    <br />
    <div class="tile is-parent">
      <div class="tile">
        <div class="tile is-child">
          <WikiCardPrimary>
            <template v-slot:header>
              <div class="card-header-title iconlinetexthead">
                <b-icon id="icon" icon="lightbulb-on" size="is-large" />
                <WikiHeaderPrimary id="header" :semantic="5" :size="3">Employer branding</WikiHeaderPrimary>
                <hr class="green-pseudoelement" />
              </div>
            </template>
            <template v-slot:content>
              <WikiHeaderPrimary :semantic="5" :size="3">Branding and Visibility on the internet</WikiHeaderPrimary>
              <WikiTextMultiLine gray :size="0.33" :weight="0.45">
                Your Wikiprofile may be the only exposure and branding on the internet. Make the most of it and we will
                optimize so you get branding and exposure on the internet
              </WikiTextMultiLine>
            </template>
            <template v-slot:footer>
              <div class="block">
                <WikiButtonBased :type="'is-link'" size="large" links="/employer/add">Get Free Account</WikiButtonBased>
              </div>
            </template>
          </WikiCardPrimary>
        </div>
      </div>
      <div class="tile">
        <div class="tile is-child">
          <WikiCardPrimary>
            <template v-slot:header>
              <div class="card-header-title iconlinetexthead">
                <b-icon id="icon" icon="account-heart" size="is-large" />
                <WikiHeaderPrimary id="header" :semantic="5" :size="3">Explain what you stand for</WikiHeaderPrimary>
                <hr class="green-pseudoelement" />
              </div>
            </template>
            <template v-slot:content>
              <WikiHeaderPrimary :semantic="5" :size="3"
                >Jok seekers want to know what your company stands for</WikiHeaderPrimary
              >
              <WikiTextMultiLine gray :size="0.33" :weight="0.45">
                Respond to reviews to give job seekers confidence in your company. Explain what you stand for and
                provide transparency
              </WikiTextMultiLine>
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
