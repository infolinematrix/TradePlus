<template>
  <v-layout row wrap>
     <v-spacer></v-spacer>
    <v-toolbar-items>
      <v-btn flat text class="text-capitalize" nuxt to="/">Home</v-btn>
      <requirement-popup ></requirement-popup>
      <v-btn flat text class="text-capitalize" nuxt to="/business/create">Add Business</v-btn>
    </v-toolbar-items>

    <v-menu bottom left open-on-hover>
      <template v-slot:activator="{ on }">
        <v-btn icon v-on="on">
          <v-icon>apps</v-icon>
        </v-btn>
      </template>

      <v-list>
        <v-list-tile nuxt to="/auth/register">
          <v-list-tile-title>Register</v-list-tile-title>
        </v-list-tile>
        <v-list-tile nuxt to="/auth/login">
          <v-list-tile-title>Login</v-list-tile-title>
        </v-list-tile>
        <v-list-tile nuxt to="/business/create">
          <v-list-tile-title>Business</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-menu>

    <v-menu bottom left open-on-hover>
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
        <v-list-tile nuxt to="/business/create">
          <v-list-tile-title>Business</v-list-tile-title>
        </v-list-tile>
        <v-list-tile nuxt to="/business/create">
          <v-list-tile-title>Logout</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-menu>





  </v-layout>
</template>


<script>
import RequirementPopup from '~/components/RequirementPopup.vue'

export default {
  components: {
    'requirement-popup': RequirementPopup,
  },
  data() {
    return {
      requirement_dialog: false,
    }
  }
}
</script>
