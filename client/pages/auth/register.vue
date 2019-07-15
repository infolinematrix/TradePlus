<template>
  <v-layout align-center justify-center row fill-height>
    <v-flex xs12 sm7 md7>
      <v-container grid-list-lg class="pa-5">
        <v-card class="elevation-1">
          <v-toolbar flat >
            <v-toolbar-title>Register</v-toolbar-title>

          </v-toolbar>
          <v-flex class="font-weight-bold grey--text">
          If you previously had a ResearcherID account or already have an account with one of the above products, please sign in with your credentials for that service to start using Publons.

          </v-flex>
          <v-layout row wrap>
            <v-flex>
              <v-card-text>
        <v-form @submit.prevent="register">
                            <v-layout row wrap>
                    <v-flex md6 sm6 xs12>
                      <v-text-field 
                      v-model="form.first_name"
                      label="First Name" 
                      v-validate="'required'"
                      :error-messages="errors.collect('First Name')"
                      data-vv-name="First Name"
                      required
                      ></v-text-field>
                    </v-flex>
                    <v-flex md6 sm6 xs12>
                      <v-text-field 
                      v-model="form.last_name"
                      label="Last Name" 
                      v-validate="'required'"
                      :error-messages="errors.collect('Last Name')"
                      data-vv-name="Last Name"
                      required
                      >
                      </v-text-field>
                    </v-flex>
                  </v-layout>

                  <v-layout row wrap>
                    <v-flex md6 sm6 xs12>
                      <v-text-field 
                      v-model="form.email"
                      v-validate="'required|email'"
                      :error-messages="errors.collect('Email')"
                      data-vv-name="Email"
                      required
                      label="Email" 
                      >
                      </v-text-field>
                    </v-flex>
                    <v-flex md6 sm6 xs12>
                      <v-layout row wrap>
                        <v-flex md4 sm4 xs12>
                          <v-select 
                           v-model="form.code"
                           v-validate="'required'"
                           :error-messages="errors.collect('Code')"
                           data-vv-name="Code"
                           required
                           item-text = code
                           item-value = code 
                           :items="country_code" 
                           label="Code">
                          </v-select>
                        </v-flex>
                        <v-flex md8 sm8 xs12>
                          <v-text-field 
                           v-model="form.phone"
                           v-validate="'required'"
                           :error-messages="errors.collect('Phone')"
                           data-vv-name="Phone"
                           required
                           label="Phone"
                          >
                          </v-text-field>
                        </v-flex>
                      </v-layout>
                    </v-flex>
                  </v-layout>

                  <v-layout row wrap>
                    <v-flex md6 sm6 xs12>
                      <v-text-field 
                        type="password"
                        label="Password" 
                        v-model="form.password" 
                        v-validate="'required|min:6|max:35'"
                        :error-messages="errors.collect('Password')"
                        data-vv-name="Password"
                        ref="password"
                        required
                        >
                      </v-text-field>
                    </v-flex>
                    <v-flex md6 sm6 xs12>
                      <v-text-field
                        label="Confirm Password" 
                        type="password"
                        v-model="form.password_confirmation" 
                        v-validate="'required|confirmed:password'"
                        :error-messages="errors.collect('Confirm Password')"
                        data-vv-name="Confirm Password"
                        required
                      ></v-text-field>
                    </v-flex>
                  </v-layout>
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
                  <v-layout row wrap>
                    <v-flex md6 sm6 xs12>
                      <v-checkbox 
                      label="I read the Terms &amp; Conditions"
                      v-model="form.agree" 
                      v-validate="'required'"
                      :error-messages="errors.collect('Terms & Conditions')"
                      data-vv-name="Terms &amp; Conditions"
                      required
                      ></v-checkbox>
                      <v-btn type="submit" depressed large color="secondary">Register</v-btn>
                    </v-flex>
                    <v-flex md6 sm6 xs12>
                      <v-layout justify-center align-center row column class="mt-5">
                        <div class="title mb-2">Already Registered?</div>
                        <nuxt-link to="/auth/forgot-password">Click here to login</nuxt-link>
                      </v-layout>
                    </v-flex>
                  </v-layout>
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
import json from "~/static/CountryCodes.json"; 
import Form from "vform";
import swal from "sweetalert2";
import VeeValidate from "vee-validate";
export default {
  data() {
    return {
      dialog: false,
      country_code: json,
      form: new Form({
      first_name: null,
      last_name: null,
      email: null,
      code: null,
      phone:  null,
      password: '',
      password_confirmation: '',
      agree: null
    }),
  }
},

methods: {

      async register() {
        if(this.form.agree == false){
            this.form.agree = null;
        }
        this.dialog = true;
        this.$validator.validateAll().then(result => {
        if (result) {
         this.$axios
            .post(`register`, this.form)
            .then(response => {
            if (response.data == "exist") {
            this.dialog = false;
            swal.fire({
            title: "Email Already Exist!",
            type: "warning",
            animation: true,
            showCloseButton: true
            });
              } else {
            this.dialog = false;
            swal.fire({
            title: "Please check your email, we have send you a activation link",
            type: "success",
            animation: true,
            showCloseButton: true
            }).then(result => {
              if (result.value) {
              this.$root.$router.push({path: '/'})
            }
            });
          }
          })
        }else{
          this.dialog = false;

        }
      });
      }
  }

 
}
</script>
