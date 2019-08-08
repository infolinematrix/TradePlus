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
            <v-form @submit.prevent="subscribs" ref="form">
            <v-text-field
              append-icon="send"
              @click:append="subscribe"
              class="ml-2 mr-3"
              label="Your email"
              v-model="email"
              :rules="emailRules"
              required
              @click="loader = 'loading'"
              :loading="loading"
              :disabled="loading" 
            ></v-text-field>
            <v-card-text class="pa-2">
              <v-layout row wrap>
                <v-flex class="pb-1" md12>
                  <div :class="text">{{ message }}</div>
                </v-flex>
              </v-layout>
            </v-card-text>
            </v-form>
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
import Form from "vform";
import { mapGetters } from "vuex";
export default {

  computed: {
    ...mapGetters({
      settings: "app/settings"
    })
  },

  data() {
    return {
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
      loader: null,
      loading: false,
      email: null,
      text: null,
      message: null
    }
  },
   methods: {
    getSetting(varible) {
      let filtered = this.settings.filter(m => m.variable === varible);

      if (filtered.length > 0) return filtered[0].value;
    },

    subscribe(){
      if (this.$refs.form.validate()) {
       this.subscribs();

      }
    },


    async subscribs() {
      
      
      const l = this.loader
      this[l] = !this[l]
      
      this.dialog = true;
      let formData = new FormData();
      formData.append('email', this.email)
     
     if (this.$refs.form.validate()) {
          this.snackbar = true
         this.$axios
            .post(`post-subscribe`, formData)
            .then(response => {
            setTimeout(() => (
            this[l] = false,
            this.text = "blue--text",
            this.message = 'Thank You'
        ), 1500),
        this.reset();
          })
         }else{


      setTimeout(() => (
           this[l] = false,
           this.text = "red--text",
           this.message = 'Invalid'
        ), 500)
      }
     // });
      
      },

      reset () {
        this.$refs.form.reset()
      },
  },
  mounted() {
    this.$store.dispatch("app/updateSettings");
  }
}
</script>
