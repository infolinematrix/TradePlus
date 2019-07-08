<template>
  <div>
    <v-footer class="footer" height="auto" inset>
      <v-container grid-list-lg>
        <v-layout row wrap>
          <v-flex md10 xs12>
            <v-layout row wrap>
              <v-card flat>
                <v-subheader pa-0>Company</v-subheader>
                <v-card-text class="pt-0">
                  <v-item-group multiple pl-5>
                    <v-item>
                      <nuxt-link to="/about-us" class="mr-3 black--text">About us</nuxt-link>
                    </v-item>
                    <v-item>
                      <nuxt-link to="/help-support" class="mr-3 black--text">Help & Support</nuxt-link>
                    </v-item>
                    <v-item>
                      <nuxt-link to="/privacy-policy" class="mr-3 black--text">Privacy policy</nuxt-link>
                    </v-item>
                    <v-item>
                      <nuxt-link to="/cookie-policy" class="mr-3 black--text">Cookie policy</nuxt-link>
                    </v-item>
                    <v-item>
                      <nuxt-link to="/conditions-of-use" class="mr-3 black--text">Conditions of use</nuxt-link>
                    </v-item>
                    <v-item>
                      <nuxt-link to="/legal" class="mr-3 black--text">Legal</nuxt-link>
                    </v-item>
                    <v-item>
                      <nuxt-link to="/reviews-policy" class="mr-3 black--text">Reviews policy</nuxt-link>
                    </v-item>
                  </v-item-group>
                </v-card-text>
              </v-card>
            </v-layout>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
        <v-layout row wrap justify-center pa-5>Copyrights "Company Name"</v-layout>
      </v-container>
    </v-footer>
  </div>
</template>


<script>
export default {
  mounted() {
    this.$store.dispatch('fetchSettings')
  }
}
</script>
