<template>
  <v-footer class="footer" height="auto" inset>
    <v-container grid-list-md>
      <v-layout row wrap>
        <v-flex md2 xs12>
          <v-card flat>
            <v-subheader class="title black--text pl-2">Company</v-subheader>

            <v-card-text class="pa-2">
              <v-layout row wrap>
                <v-flex>
                  <nuxt-link to="/page/about-us" class="mr-3 black--text">About us</nuxt-link>
                </v-flex>
                <v-flex>
                  <nuxt-link to="/page/help-support" class="mr-3 black--text">Help & Support</nuxt-link>
                </v-flex>
              </v-layout>
            </v-card-text>
          </v-card>
        </v-flex>

        <v-flex md2 xs12>
          <v-card flat>
            <v-subheader class="title black--text pl-2">Legal</v-subheader>
            <v-card-text class="pa-2">
              <v-layout row wrap>
                <v-flex lg12>
                  <nuxt-link to="/page/privacy-policy" class="mr-3 black--text">Privacy policy</nuxt-link>
                </v-flex>
                <v-flex lg12>
                  <nuxt-link to="/page/cookie-policy" class="mr-3 black--text">Cookie policy</nuxt-link>
                </v-flex>
                <v-flex lg12>
                  <nuxt-link to="/page/cookie-policy" class="mr-3 black--text">Terms &amp; Conditions</nuxt-link>
                </v-flex>
                <v-flex lg12>
                  <nuxt-link to="/page/reviews-policy" class="mr-3 black--text">Review Policy</nuxt-link>
                </v-flex>
              </v-layout>
            </v-card-text>
          </v-card>
        </v-flex>

        <v-flex md2 xs12>
          <v-card flat>
            <v-subheader class="title black--text pl-2">Link</v-subheader>

            <v-card-text class="pa-2">
              <v-layout row wrap>
                <v-flex lg12>
                  <nuxt-link to="/page/advertise-with-us" class="mr-3 black--text">Advertise with us</nuxt-link>
                </v-flex>
              </v-layout>
            </v-card-text>
          </v-card>
        </v-flex>

        <v-flex md3 xs12>
          <v-card flat>
            <v-subheader class="title black--text pl-2">Follow us</v-subheader>

            <v-card-text class="pa-2">
              <v-layout row wrap>
                <v-flex>
                  <nuxt-link to="#">
                    <v-avatar color="grey lighten-4" tile size="40">
                      <img src="icons/fb.svg" alt="Facebbok" />
                    </v-avatar>
                  </nuxt-link>
                </v-flex>
                <v-flex>
                  <nuxt-link to="#">
                    <v-avatar color="grey lighten-4" tile size="40">
                      <img src="icons/gplus.svg" alt="Facebbok" />
                    </v-avatar>
                  </nuxt-link>
                </v-flex>
                <v-flex>
                  <nuxt-link to="#">
                    <v-avatar color="grey lighten-4" tile size="40">
                      <img src="icons/twitter.svg" alt="Facebbok" />
                    </v-avatar>
                  </nuxt-link>
                </v-flex>
                <v-flex>
                  <nuxt-link to="#">
                    <v-avatar color="grey lighten-4" tile size="40">
                      <img src="icons/linkdin.svg" alt="Facebbok" />
                    </v-avatar>
                  </nuxt-link>
                </v-flex>
                <v-flex>
                  <nuxt-link to="#">
                    <v-avatar color="grey lighten-4" tile size="40">
                      <img src="icons/pinnterest.svg" alt="Facebbok" />
                    </v-avatar>
                  </nuxt-link>
                </v-flex>
              </v-layout>
            </v-card-text>

            <v-subheader class="title black--text pl-2">Subscribe</v-subheader>
            <v-text-field
              append-icon="send"
              class="ml-2 mr-3"
              value="mail@you.com"
              label="Your email"
            ></v-text-field>
          </v-card>
        </v-flex>

        <v-flex md3 xs12>
          <v-card flat>
            <v-subheader class="title black--text pl-2">Contact</v-subheader>

            <v-card-text class="pa-2">
              <v-layout row wrap>
                <v-flex class="pb-1" md12>
                  <div class="black--text">24/6, {{ getSetting('address')}}</div>
                </v-flex>
                <v-flex class="pb-1" md12>
                  <div class="black--text">{{ getSetting('phone')}} (Toll free)</div>
                </v-flex>
                <v-flex class="pb-1" md12>
                  <div class="black--text">{{ getSetting('email_from_email')}}</div>
                </v-flex>
                <v-flex class="pb-1" md12>
                  <v-btn depressed color="primary" class="white--text ml-0" nuxt to="/contact">
                    Reach us
                    <v-icon right dark>email</v-icon>
                  </v-btn>
                </v-flex>
              </v-layout>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>

      <v-layout row wrap>
        <v-card flat>
          <v-subheader class="ml-0">Disclaimer</v-subheader>
          <v-card-text
            class="pt-0 caption"
          >The opinions expressed within Reviews are those of the author and not the views or opinions of Our { Company }. Registered Office: { Address }. Registered in {Country}. Tax Number: { Tax NO }. © { COMPANY } Limited 2019. All rights reserved.</v-card-text>
        </v-card>
      </v-layout>
    </v-container>
  </v-footer>
</template>


<script>
import { mapGetters } from "vuex";
export default {

  computed: {
    ...mapGetters({
      settings: "app/settings"
    })
  },
   methods: {
    getSetting(varible) {
      let filtered = this.settings.filter(m => m.variable === varible);

      if (filtered.length > 0) return filtered[0].value;
    }
  },
  mounted() {
    this.$store.dispatch("app/updateSettings");
  }
}
</script>
