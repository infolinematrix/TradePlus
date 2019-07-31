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
                <v-form @submit.prevent="contact" ref="form">
                  <v-layout row wrap>
                    <v-flex md6 xs12>
                      <v-text-field 
                      label="First name" 
                      v-model="form.first_name"
                      placeholder="First Name"
                     :rules="firstnameRules"
                      required
                      outline
                      ></v-text-field>
                    </v-flex>
                    <v-flex md6 xs12>
                      <v-text-field 
                      label="Last name" 
                      v-model="form.last_name"
                      placeholder="Last Name"
                      :rules="lastnameRules"
                      required
                      outline>
                      </v-text-field>
                    </v-flex>
                  </v-layout>

                  <v-layout row wrap>
                    <v-flex md6 xs12>
                      <v-text-field 
                      label="Emai" 
                      v-model="form.email"
                      placeholder="Email"
                      :rules="emailRules"
                      required
                      outline>
                      </v-text-field>
                    </v-flex>
                    <v-flex md6 xs12>
                      <v-text-field 
                      label="Contact No" 
                      v-model="form.contact_no"
                      placeholder="Contact No"
                      :rules="contactRules"
                      required
                      outline
                      >
                      </v-text-field>
                    </v-flex>
                  </v-layout>

                  <v-layout row wrap>
                    <v-flex md12 xs12>
                      <v-text-field 
                      label="Purpose" 
                      v-model="form.purpose"
                      placeholder="purpose"
                      :rules="purposeRules"
                      required
                      outline
                      >
                      </v-text-field>
                    </v-flex>
                  </v-layout>

                  <v-layout row wrap>
                    <v-flex md12 xs12>
                      <v-textarea 
                      label="Message" 
                      v-model="form.message"
                      :rules="messageRules"
                      required
                      outline
                      >
                      </v-textarea>
                    </v-flex>
                  </v-layout>

                  <v-btn 
                   @click="loader = 'loading'"
                  :loading="loading"
                  :disabled="loading" 
                  type="submit" 
                  large color="primary" 
                  class="ml-0" 
                  depressed>Submit</v-btn>
                </v-form>
              </v-card-text>
            </v-flex>

            <v-flex sm4 md4 xs12>
              <v-card-text>
                <div class="title font-weight-normal mb-3">Reach us</div>
                <div class="black--text">{{ getSetting('site_title')}}</div>
                <div>{{ getSetting('address')}}</div>
              </v-card-text>
              <v-divider></v-divider>

              <v-card-text>
                <div class="title font-weight-normal mb-1">Call us</div>
                <div class="black--text">{{ getSetting('phone')}}</div>
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
import Form from "vform";
import swal from "sweetalert2";
import VeeValidate from "vee-validate";
import { mapGetters } from 'vuex'

export default {
  
   computed: {
    ...mapGetters({
      settings: "app/settings"
    })
  },
  head() {
    return {
      title: 'Contact us',
      titleTemplate: '%s - ' + process.env.appName
    }
  },
   data() {
    
    return {

      /*Rules*/
       firstnameRules: [
        v => !!v || 'First Name is required',
      ],
      lastnameRules: [
        v => !!v || 'Last Name is required',
      ],
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
      contactRules: [
        v => !!v || 'Contact is required',
      ],
      purposeRules: [
        v => !!v || 'Purpose is required',
      ],
      messageRules: [
        v => !!v || 'Message is required',
      ],

      
    loader: null,
    loading: false,
    form: new Form({
      first_name: null,
      last_name: null,
      email: null,
      contact_no: null,
      purpose: null,
      message: null
      }),

    text:
        'Lorem ipsum dolor sit amet, mel at clita quando. Te sit oratio vituperatoribus, nam ad ipsum posidonium mediocritatem, explicari dissentiunt cu mea. Repudiare disputationi vim in, mollis iriure nec cu, alienum argumentum ius ad. Pri eu justo aeque torquatos.',
      text_short:
        'Lorem ipsum dolor sit amet, mel at clita quando. Te sit oratio vituperatoribus, nam ad ipsum posidonium mediocritatem, explicari dissentiunt cu mea.'
    }
  },

  
   methods: {
      getSetting(varible) {
      let filtered = this.settings.filter(m => m.variable === varible);

      if (filtered.length > 0) return filtered[0].value;
      },

      loader () {
        this.contact();
      
      },
      async contact() {
      
      const l = this.loader
      this[l] = !this[l]
      
      this.dialog = true;
      let formData = new FormData();
      formData.append('first_name', this.form.first_name)
      formData.append('last_name', this.form.last_name)
      formData.append('email', this.form.email)
      formData.append('contact_no', this.form.contact_no)
      formData.append('purpose', this.form.purpose)
      formData.append('message', this.form.message)
        
        if (this.$refs.form.validate()) {
          this.snackbar = true
      //  this.$validator.validateAll().then(result => {
       // if (result) {

        
         this.$axios
            .post(`post-contact`, formData)
            .then(response => {
            

            setTimeout(() => (
            this[l] = false,
            swal.fire({
            title: "Successfully Send....",
            type: "info",
            animation: true,
            showCloseButton: true
            })
        ), 1500),

        this.reset();
          })
       
       
         }else{

      setTimeout(() => (
            this[l] = false,
            swal.fire({
            title: "Invalid Input!",
            type: "warning",
            animation: true,
            showCloseButton: true
            })
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
