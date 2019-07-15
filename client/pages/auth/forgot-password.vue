<template>
  <v-layout align-center justify-center row fill-height>
    <v-flex xs12 sm8 md8>
      <v-container grid-list-lg>
        <v-card>
          <v-toolbar flat>
            <v-toolbar-title>Forgot Your Password</v-toolbar-title>
          </v-toolbar>
          <v-subheader>Enter your email address and we will send you a link to reset your password.</v-subheader>
          <v-layout row wrap>
            <v-flex sm6 md6 xs12>
              <v-card-text>
                <v-form @submit.prevent="forgot">
                  <v-text-field
                    v-model="form.email"
                    name="Email"
                    label="Email"
                    required
                    v-validate="'required|email'"
                    :error-messages="errors.collect('Email')"
                    data-vv-name="Email"
                    outline
                  ></v-text-field>

                   <div class="text-xs-center">
            <v-dialog v-model="dialog" hide-overlay persistent width="300">
              <v-card color="primary">
                <v-card-text>
                  Please stand by
                  <v-progress-linear indeterminate color="blue" class="mb-0"></v-progress-linear>
                </v-card-text>
              </v-card>
            </v-dialog>
          </div>

                  <v-card-actions class="pa-0">
                    <v-btn type="submit" color="primary" depressed large>Send Link</v-btn>
                  </v-card-actions>
                </v-form>
              </v-card-text>

              <v-card-text>
                  Already have an Account? &nbsp;
                  <nuxt-link to="/auth/login">Click here</nuxt-link>
              </v-card-text>
            </v-flex>

            <v-flex sm6 md6 xs12>
              <v-card-text>
                <div class="title font-weight-normal mb-1">Don't have account?</div>
                <div class="grey--text">
                  <nuxt-link to="/auth/register">Click here to Register</nuxt-link>
                </div>
              </v-card-text>
              <v-divider></v-divider>
              <v-card-text>
                <div>Have Social Media account? Login with</div>

                <v-btn large block depressed color="primary">
                  <v-icon left dark>cloud_upload</v-icon>Facebook
                </v-btn>
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
      email: null
    })
  }),

  methods: {
    async forgot() {
      this.dialog = true;
      this.$validator.validateAll().then(result => {
        if (result) {
          this.$axios.post(`password/forgot`, this.form).then(response => {
            if (response.data == "not_exist") {
              this.dialog = false;
              swal.fire({
                title: "Invalid Email",
                type: "warning",
                animation: true,
                showCloseButton: true
              });
            } else {
              this.dialog = false;
              swal.fire({
                title: "Please check your email, we have send you reset link",
                type: "success",
                animation: true,
                showCloseButton: true
              }).then(result => {
              if (result.value) {
              this.$root.$router.push({path: '/'})
            }
            });
            }
          });
        } else {
          this.dialog = false;
        }
      });
    }
  }
};
</script>