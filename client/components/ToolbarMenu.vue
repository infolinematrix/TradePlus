<template>
  <v-layout>
    <v-spacer></v-spacer>

    <v-btn icon nuxt to="/">
      <v-icon>home</v-icon>
    </v-btn>
    <v-toolbar-items class="hidden-sm-and-down">
      <v-btn flat text class="text-capitalize" nuxt to="/requirements">Requirement</v-btn>
      <v-btn flat text class="text-capitalize" nuxt to="/business/create">Add Business</v-btn>
    </v-toolbar-items>

    <v-menu class="hidden-md-and-up" bottom left open-on-hover>
      <v-toolbar-side-icon slot="activator"></v-toolbar-side-icon>
      <v-list>
        <v-list-tile nuxt to="/requirements">
          <v-list-tile-content>
            <v-list-tile-title>Requirement</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile nuxt to="/business/create">
          <v-list-tile-content>
            <v-list-tile-title>Add Business</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-menu>

    <v-menu bottom left open-on-hover v-if="user">
      <template v-slot:activator="{ on }">
        <v-btn icon v-on="on">
          <v-icon>person</v-icon>
        </v-btn>
      </template>


      <v-list>
        <v-list-tile nuxt to="/auth">
          <v-list-tile-title>Dashboard</v-list-tile-title>
        </v-list-tile>

        <v-list-tile nuxt to="/business/create">
          <v-list-tile-title>Business</v-list-tile-title>
        </v-list-tile>
        <v-list-tile @click="logout()">
          <v-list-tile-title>Logout</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-menu>

    <v-menu bottom left open-on-hover v-else>
      <template v-slot:activator="{ on }">
        <v-btn icon v-on="on">
          <v-icon>person</v-icon>
        </v-btn>
      </template>


      <v-list>
        <v-list-tile nuxt to="/auth/register">
          <v-list-tile-title>Register</v-list-tile-title>
        </v-list-tile>
        <v-list-tile nuxt to="/auth/login">
          <v-list-tile-title>Login</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-menu>
  </v-layout>
</template>


<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters({
      user: 'auth/user'
      //user_role: "auth/user_role"
    })
  },

  methods: {
    async logout() {
      // Log out the user.
      await this.$store.dispatch('auth/logout')

      // Redirect to login.
      this.$router.push({ name: 'auth-login' })
    }
  }
}
</script>

