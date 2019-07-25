<template>
  <v-layout align-center justify-center row fill-height>
    <v-flex xs12 sm8 md8>
      <v-container grid-list-lg>
        <v-card>
          <v-toolbar flat>
            <v-toolbar-title>Contact</v-toolbar-title>
          </v-toolbar>
          <v-subheader>Feel free to Drop Your Message via the contact form below. Our representative will contact you soon</v-subheader>
          <v-alert v-model="alert" dismissible type="info">Message</v-alert>
          <v-layout row wrap>
            <v-flex sm8 md8 xs12>
              <v-card-text>
                <v-form>
                  <v-layout row wrap>
                    <v-flex md6 xs12>
                      <v-text-field label="First name" outline></v-text-field>
                    </v-flex>
                    <v-flex md6 xs12>
                      <v-text-field label="Last name" outline></v-text-field>
                    </v-flex>
                  </v-layout>

                  <v-layout row wrap>
                    <v-flex md6 xs12>
                      <v-text-field label="Email" outline></v-text-field>
                    </v-flex>
                    <v-flex md6 xs12>
                      <v-text-field label="Contact no" outline></v-text-field>
                    </v-flex>
                  </v-layout>

                  <v-layout row wrap>
                    <v-flex md12 xs12>
                      <v-text-field label="Purpose" outline></v-text-field>
                    </v-flex>
                  </v-layout>

                  <v-layout row wrap>
                    <v-flex md12 xs12>
                      <v-textarea label="Purpose" outline></v-textarea>
                    </v-flex>
                  </v-layout>

                  <v-btn large color="primary" class="ml-0" depressed>Submit</v-btn>
                </v-form>
              </v-card-text>
            </v-flex>

            <v-flex sm4 md4 xs12>
              <v-card-text>
                <div class="title font-weight-normal mb-3">Reach us</div>
                <div class="black--text">Matrix Infoline</div>
                <div>Hakimpara, Siliguri, West bengal, 734001, India</div>
              </v-card-text>
              <v-divider></v-divider>

              <v-card-text>
                <div class="title font-weight-normal mb-1">Call us</div>
                <div class="black--text">+91 98328 93116</div>
              </v-card-text>

              <v-divider></v-divider>
              <v-card-text>
                <v-layout row wrap>
                  <v-flex>
                    <nuxt-link to="#">
                      <v-avatar color="grey lighten-4" tile size="35">
                        <img src="icons/fb.svg" alt="Facebbok" />
                      </v-avatar>
                    </nuxt-link>
                  </v-flex>
                  <v-flex>
                    <nuxt-link to="#">
                      <v-avatar color="grey lighten-4" tile size="35">
                        <img src="icons/gplus.svg" alt="Facebbok" />
                      </v-avatar>
                    </nuxt-link>
                  </v-flex>
                  <v-flex>
                    <nuxt-link to="#">
                      <v-avatar color="grey lighten-4" tile size="35">
                        <img src="icons/twitter.svg" alt="Facebbok" />
                      </v-avatar>
                    </nuxt-link>
                  </v-flex>
                  <v-flex>
                    <nuxt-link to="#">
                      <v-avatar color="grey lighten-4" tile size="35">
                        <img src="icons/linkdin.svg" alt="Facebbok" />
                      </v-avatar>
                    </nuxt-link>
                  </v-flex>
                  <v-flex>
                    <nuxt-link to="#">
                      <v-avatar color="grey lighten-4" tile size="35">
                        <img src="icons/pinnterest.svg" alt="Facebbok" />
                      </v-avatar>
                    </nuxt-link>
                  </v-flex>
                </v-layout>
              </v-card-text>
            </v-flex>
          </v-layout>
        </v-card>
      </v-container>
    </v-flex>
  </v-layout>
</template>
<script>
import Form from 'vform'
import VeeValidate from 'vee-validate'
import { mapGetters } from 'vuex'

export default {
  head() {
    return {
      title: 'Contact us',
      titleTemplate: '%s - ' + process.env.appName
    }
  },
  data: () => ({}),

  mounted() {}
}
</script>
