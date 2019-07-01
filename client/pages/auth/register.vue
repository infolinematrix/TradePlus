<template>
  <v-layout align-center justify-center row fill-height>
    <v-flex xs12 sm7 md7>
      <v-container grid-list-lg class="pa-5">
        <v-card class="elevation-1">
          <v-toolbar flat >
            <v-toolbar-title>Register</v-toolbar-title>

          </v-toolbar>
          <v-subheader>Registration is quick and free. It allows you to personalize your profile.</v-subheader>
          <v-layout row wrap>
            <v-flex>
              <v-card-text>
                <v-form>
                  <v-layout row wrap>
                    <v-flex md6 sm6 xs12>
                      <v-text-field id="password" label="First Name" type="text"></v-text-field>
                    </v-flex>
                    <v-flex md6 sm6 xs12>
                      <v-text-field label="Last Name" type="text"></v-text-field>
                    </v-flex>
                  </v-layout>

                  <v-layout row wrap>
                    <v-flex md6 sm6 xs12>
                      <v-text-field name="login" label="Email" type="text"></v-text-field>
                    </v-flex>
                    <v-flex md6 sm6 xs12>
                      <v-layout row wrap>
                        <v-flex md4 sm4 xs12>
                          <v-select :items="country_code" label="Code"></v-select>
                        </v-flex>
                        <v-flex md8 sm8 xs12>
                          <v-text-field label="Phone no" type="text"></v-text-field>
                        </v-flex>
                      </v-layout>
                    </v-flex>
                  </v-layout>

                  <v-layout row wrap>
                    <v-flex md6 sm6 xs12>
                      <v-text-field id="password" name="password" label="Password" type="password"></v-text-field>
                    </v-flex>
                    <v-flex md6 sm6 xs12>
                      <v-text-field
                        id="password"
                        name="password"
                        label="Conform Password"
                        type="password"
                      ></v-text-field>
                    </v-flex>
                  </v-layout>

                  <v-layout row wrap>
                    <v-flex md6 sm6 xs12>
                      <v-checkbox label="I read the Terms &amp; Conditions"></v-checkbox>
                      <v-btn depressed large color="secondary">Register</v-btn>
                    </v-flex>
                    <v-flex md6 sm6 xs12>
                      <v-layout justify-center align-center row column class="mt-5">
                        <div class="title mb-2">Already Registered?</div>
                        <nuxt-link to="auth/forgot_password">Click here to login</nuxt-link>
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
export default {
  data() {
    return {}
  }
}
</script>
