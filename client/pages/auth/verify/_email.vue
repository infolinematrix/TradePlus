<template>
  <v-layout align-center justify-center row fill-height>
    <v-flex xs12 sm8 md8>
      <v-container grid-list-lg>
        <v-card>
          <v-toolbar flat>
            <v-toolbar-title>Verified</v-toolbar-title>
          </v-toolbar>
          <v-layout row wrap>
            <v-flex sm12 md12 xs12>
              <v-card-text>
                  <span v-if="email == 'verified'">
                <div class="title font-weight-normal mb-1">Your Account Successfully verified...</div>

                
                <div class="grey--text">
                  <nuxt-link to="/auth/login">Click here to Login</nuxt-link>
                </div>
                </span>
                    <span v-if="email == 'invalid'">
                <div class="title font-weight-normal mb-1">Oops! Invalid Input</div>
                 <div class="grey--text">
                  <nuxt-link to="/auth/register">Click here to Register</nuxt-link>
                </div>
                </span>
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
  async asyncData({ $axios,params }) {
    const e = await $axios.get(`register/verify/${params.email}`);
    return {
      email: e.data
    };
  },
 
};
</script>