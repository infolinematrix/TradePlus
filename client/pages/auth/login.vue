<template>
  <v-layout align-center justify-center row fill-height>
    <v-flex xs12 sm8 md8>
      <v-container grid-list-lg>
        <v-card>
          <v-toolbar flat>
            <v-toolbar-title>Login</v-toolbar-title>
          </v-toolbar>
          <v-subheader>Login with your email &amp; Password</v-subheader>
          <v-alert v-model="alert" dismissible type="info">{{ message }}</v-alert>
          <v-layout row wrap>
            <v-flex sm6 md6 xs12>
              <v-card-text>
                <v-form @submit.prevent="login">
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
                  <v-text-field
                    v-model="form.password"
                    name="Password"
                    label="Password"
                    type="password"
                    required
                    v-validate="'required|min:6|max:35'"
                    :error-messages="errors.collect('Password')"
                    data-vv-name="Password"
                    outline
                  ></v-text-field>
                  <v-card-actions class="pa-0">
                    <v-btn type="submit" color="primary" depressed large>Login</v-btn>
                  </v-card-actions>
                </v-form>
              </v-card-text>

              <v-card-text>
                  Forgot your Password? &nbsp;
                  <nuxt-link to="auth/forgot_password">Click here</nuxt-link>
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
<script>
import Form from 'vform'
import VeeValidate from 'vee-validate'
import { mapGetters } from 'vuex'

export default {
  head() {
    return {
      title: 'Login',
      titleTemplate: '%s - ' + process.env.appName
    }
  },
  data: () => ({
    alert: false,
    message: null,
    form: new Form({
      email: 'admin@admin.com',
      password: 'matrix0404'
    }),
    remember: true
  }),
  computed: {
    ...mapGetters({
      user: 'auth/user'
    })
  },
  methods: {
    async login() {
      // Submit the form.


      if (!this.form.email || !this.form.password) {
        this.alert = true
        this.message = 'All fields are mandatory'
        return
      }

      const { data } = await this.$axios.post(`login`, this.form)

      if (data.error) {
        this.alert = true
        this.message = data.error
        return
      }
      // Save the token.
      this.$store.dispatch('auth/saveToken', {
        token: data.token,
        remember: this.remember
      })

      // Fetch the user.
      await this.$store.dispatch('auth/fetchUser')

      if (this.user.user.status != 51) {
        this.alert = true
        this.message = 'Sorry! you are not authorised.'
        await this.$store.dispatch('auth/logout')

        return
      }

      // Redirect home.
      this.$router.push('/')
    },


    async socialLogin() {
      this.isProcessing = true
      this.error = {}
      this.$axios
        .$post(`oauth/google`)
        .then(response => {
          if (response.error) {
            this.error = err.response.error
          } else if (response) {
            //console.log(response.url);
            //this.social_callback =  response.url
            window.location.href = response.url
            //this.SocialLogin("google", response.url);
          }
        })
        .catch(err => {
          if (err.response.data.error) {
            this.error = err.response.error
            console.log(this.error)
          }
          this.isProcessing = false
        })
    },

    SocialLogin(provider, resp) {
      //console.log(resp);
      window.location.href = resp
      redirect(301, resp)

      this.$axios.get(resp).then(r => {
        if (r.error) {
          console.log('ERROR')
        } else {
          console.log(r)
        }
      })

      //console.log(sData)
    }
  },
  mounted() {}
}
</script>
