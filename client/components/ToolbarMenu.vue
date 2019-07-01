<template>
  <v-layout row wrap>
    <v-spacer></v-spacer>
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
    <v-btn icon>
      <v-icon>notifications</v-icon>
    </v-btn>
    <v-btn icon>
      <v-avatar size="20px" tile>
        <img src="/avatar.png" alt="Vuetify">
      </v-avatar>
    </v-btn>
  </v-layout>
</template>
