<template>
  <v-layout align-center justify-center row fill-height>
    <v-flex xs12 sm8 md8>
      <v-container grid-list-lg>
        <v-card>
          <v-toolbar flat>
            <v-toolbar-title>Reset Your Password</v-toolbar-title>
          </v-toolbar>
          <v-layout row wrap>
            <v-flex sm6 md6 xs12>
              <v-card-text>
<v-form @submit.prevent="reset">
                       <v-text-field 
                type="password"
                v-model="form.password" 
                name="password" 
                label="Password"
                v-validate="'required|min:6|max:35'"
                :error-messages="errors.collect('Password')"
                data-vv-name="Password"
                ref="password"
                required
                outline
                ></v-text-field>

             <v-text-field 
                type="password"
                v-model="form.password_confirmation" 
                name="password_confirmation" 
                label="Confirm"
                v-validate="'required|confirmed:password'"
                :error-messages="errors.collect('Confirm Password')"
                data-vv-name="Confirm Password"
                required
                outline
                ></v-text-field>

                <div class="text-xs-center">
    <v-dialog
      v-model="dialog"
      hide-overlay
      persistent
      width="300"
    >
    <v-card
        color="primary"
        
    >
    <v-card-text>
          Please stand by
          <v-progress-linear
            indeterminate
            color="blue"
            class="mb-0"
          ></v-progress-linear>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>

                  <v-card-actions class="pa-0">
                    <v-btn type="submit" color="info" depressed large>Update</v-btn>
                      <v-btn type="submit" color="primary" depressed large nuxt to="/auth/login">Log In</v-btn>
                  
                  </v-card-actions>
                </v-form>
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
import VeeValidate from "vee-validate";
import swal from "sweetalert2";

export default {
  data: () => ({
      dialog: false,
      form: new Form({
      password: null,
    }),
  }),

 methods: {

      async reset() {
        let email = this.$route.params.email;
        
        this.dialog = true;
        this.$validator.validateAll().then(result => {
        if (result) {
         this.$axios
            .post(`password/reset/`+email, this.form)
            .then(response => {
            if (response.data == "invalid") {
               this.dialog = false;
            swal.fire({
            title: "Invalid",
            type: "warning",
            animation: true,
            showCloseButton: true
            });
              } else {
                this.dialog = false;
            swal.fire({
            title: "You have successfully reset your password. Please Login",
            type: "success",
            animation: true,
            showCloseButton: true
            });
                
            }
          })
        }else{
          this.dialog = false;

        }
      });
      
    },
    }
};
</script>