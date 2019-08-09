<template>
  <v-layout row wrap>
    <v-btn flat text class="text-capitalize" @click.stop="dialog = true">Post Requirement</v-btn>

    <v-dialog v-model="dialog" persistent max-width="550" >
 <v-form @submit.prevent="post_requirement" ref="form">

        <v-card flat >
          <v-toolbar flat>
            <v-toolbar-title>What are you looking for?</v-toolbar-title>

            <v-spacer></v-spacer>

            <v-btn icon @click="dialog = false">
              <v-icon>close</v-icon>
            </v-btn>
          </v-toolbar>



          <v-container grid-list-md class="pa-2" >
            
          <v-card-text>
          <small
              class="caption lh1 grey--text"
            >Let Google help apps determine location. This means sending anonymous location data to Google, even when no apps are running.</small>
            <v-layout wrap>
              <v-flex xs12 sm12 md12>
              <category-popup  :title="form.title" @eId="update_id" @eTitle="update_title"></category-popup>
              </v-flex>
              <v-flex xs12 sm12 md12>
                <v-text-field 
                label="Type your requirement*" 
                v-model="form.post_title"
                :rules="titleRules"
                required
               
                :counter="100">
                </v-text-field>
              </v-flex>
              <v-flex xs12 sm12 md12>
                <v-textarea
                  name="input-7-1"
                  label="Description"
                  hint="Hint text"
                  :counter="250"
                  v-model="form.description"
                 :rules="descriptionRules"
                  required
               
                ></v-textarea>
              </v-flex>
            </v-layout>
          </v-card-text>

          <v-card-text class="bg-light">
            <h3>Your information</h3>
            <v-layout row wrap>
              <v-flex xs12 sm6 md6>
                <v-text-field 
                label="First name*"
                 v-model="form.first_name"
                 :rules="firstnameRules"
                  required
                ></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md6>
                <v-text-field
                  label="Last name*"
                  v-model="form.last_name"
                 :rules="lastnameRules"
                  required
                ></v-text-field>
              </v-flex>

              <v-flex xs12 sm6 md6>
                <v-text-field 
                label="Email*" 
                v-model="form.email"
                :rules="emailRules"
                required
                  ></v-text-field>
              </v-flex>

              <v-flex xs12 sm6 md6>
                <v-text-field 
                label="Phone no*" 
                v-model="form.phone_no"
                :rules="phoneRules"
                required
                ></v-text-field>
              </v-flex>
            </v-layout>
          </v-card-text>
          </v-container>
          <v-card-actions>
            <v-spacer></v-spacer>
 <v-alert v-model="alert" dismissible type="info">{{ message }}</v-alert>
            <v-btn depressed text @click="dialog = false">Cancel</v-btn>
           <v-btn v-if="user"
              depressed 
              color="primary"
              @click="loader = 'loading'"
              :loading="loading"
              :disabled="loading" 
              type="submit" >Send
              </v-btn>

              <v-btn v-if="!user"
              color="primary"
              nuxt to="/auth/login"
              >Login
              </v-btn>

          </v-card-actions>
        
        </v-card>
 </v-form>
    </v-dialog>
  </v-layout>
</template>
<script>
import CategoryPopup from "~/components/CategoryPopup3.vue";
import swal from "sweetalert2";
import { mapGetters } from 'vuex'

export default {
  components: {
    CategoryPopup
  },

  computed: {
    ...mapGetters({
      user: "auth/user",
    })
  },

  data() {
    return {
      dialog: false,
       /*Rules*/
        titleRules: [
        v => !!v || 'Required',
      ],
       descriptionRules: [
        v => !!v || 'Required',
      ],
       firstnameRules: [
        v => !!v || 'Required',
      ],
      lastnameRules: [
        v => !!v || 'Required',
      ],
      emailRules: [
        v => !!v || 'Required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
      phoneRules: [
        v => !!v || 'Required',
      ],
      
      loader: null,
      loading: false,
      alert: false,

      message: null,
       form: {
        post_title: null,
        description: null,
        first_name: null,
        last_name: null,
        email: null,
        phone_no: null,
        title: null,
        id:null
      },
    }
  },
  methods: {

    update_title(value){
      this.form.title = value
    },
    update_id(value){
      this.form.id = value
    },
    async post_requirement() {
      
      
      const l = this.loader
      this[l] = !this[l]
      
      this.dialog = true;
      let formData = new FormData();
      formData.append('first_name', this.form.first_name)
      formData.append('last_name', this.form.last_name)
      formData.append('email', this.form.email)
      formData.append('contact_no', this.form.phone_no)
      formData.append('title', this.form.post_title)
      formData.append('description', this.form.description)
      formData.append('category', this.form.id)
       
        if (this.$refs.form.validate()) {
          if(this.form.id == null){
            swal.fire({
            title: "Choose Category!",
            type: "warning",
            animation: true,
            showCloseButton: true
            });

         }else{   
          this.snackbar = true
         this.$axios
            .post(`post-requirement`, formData)
            .then(response => {
            setTimeout(() => (
            this[l] = false,
            this.alert = true,
            this.message = 'Successfully Send....'
        ), 3500),
            this.reset();
       })

        }
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


  }
}
</script>
