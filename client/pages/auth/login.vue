<template>
  <v-layout align-center justify-center row fill-height>
    <v-flex xs12 sm8 md8>
      <v-container grid-list-lg>
        <v-card>
          <v-toolbar flat>
            <v-toolbar-title>Login</v-toolbar-title>
          </v-toolbar>
          <v-subheader>Login with your email &amp; Password</v-subheader>

          <v-layout row wrap>
            <v-flex sm6 md6 xs12>
              <v-card-text>
                <v-form>
                  <v-text-field prepend-icon="person" name="login" label="Login" type="text"></v-text-field>
                  <v-text-field
                    id="password"
                    prepend-icon="lock"
                    name="password"
                    label="Password"
                    type="password"
                  ></v-text-field>
                  <v-checkbox label="Remember me"></v-checkbox>
                  <v-btn block depressed large color="secondary">Login</v-btn>
                </v-form>
              </v-card-text>

              <v-card-text>
                <v-layout justify-center align-center row >
                  Forgot your Password? &nbsp;
                  <nuxt-link to="auth/forgot_password"> Click here</nuxt-link>
                </v-layout>
              </v-card-text>
            </v-flex>

            <v-flex sm6 md6 xs12>
              <v-card-text>
                <div class="title font-weight-normal mb-1">Don't have account?</div>
                <div class="grey--text">
                  <nuxt-link to="auth/register">Click here to Register</nuxt-link>
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
