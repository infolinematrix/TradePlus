<template>
  <div id="application">
    <v-app>
      <v-navigation-drawer
        width="250"
        fixed
        :clipped="$vuetify.breakpoint.mdAndUp"
        app
        v-model="drawer"
        class="inner-border pa-2"
      >
        <v-flex class="font-weight-medium">
          <v-subheader>Quick Navigation</v-subheader>
          <v-container class="pt-0">
            <v-flex class="mb-2">
              <nuxt-link to="business-profile#">Dashboard</nuxt-link>
            </v-flex>
            <v-flex class="mb-2">
              <nuxt-link to="business-profile#">Inbox</nuxt-link>
            </v-flex>
          </v-container>
          <v-divider></v-divider>
        </v-flex>

        <v-flex class="font-weight-medium">
          <v-subheader>Business</v-subheader>
          <v-container class="pt-0">
            <v-flex class="mb-2">
              <nuxt-link to="/business/edit">Profile</nuxt-link>
            </v-flex>
          
            <v-flex class="mb-2">
              <nuxt-link to="/business/about">About</nuxt-link>
            </v-flex>
            <v-flex class="mb-2">
              <nuxt-link to="/business/credential">Credential</nuxt-link>
            </v-flex>
            <v-flex class="mb-2">
              <nuxt-link to="/business/social">Social</nuxt-link>
            </v-flex>
          </v-container>
          <v-divider></v-divider>
        </v-flex>
        <v-flex class="font-weight-medium">
          <v-subheader>Products/Services</v-subheader>
          <v-container class="pt-0">
            <v-flex class="mb-2">
              <nuxt-link to="/business/post/service/create">Create</nuxt-link>
            </v-flex>
            <v-flex class="mb-2">
              <nuxt-link to="business-profile#">About</nuxt-link>
            </v-flex>
            <v-flex class="mb-2">
              <nuxt-link to="business-profile#">Location</nuxt-link>
            </v-flex>
            <v-flex class="mb-2">
              <nuxt-link to="business-profile#">Working Hours</nuxt-link>
            </v-flex>
          </v-container>
          <v-divider></v-divider>
        </v-flex>

        <v-flex class="font-weight-medium">
          <v-subheader>Promotions</v-subheader>
          <v-container class="pt-0">
            <v-flex class="mb-2">
              <nuxt-link to="business-profile#">Create</nuxt-link>
            </v-flex>
            <v-flex class="mb-2">
              <nuxt-link to="business-profile#">My Promotions</nuxt-link>
            </v-flex>
            <v-flex class="mb-2">
              <nuxt-link to="business-profile#">My Balance</nuxt-link>
            </v-flex>
          </v-container>
          <v-divider></v-divider>
        </v-flex>

      </v-navigation-drawer>

      <v-toolbar
        color="white"
        app
        :clipped-left="$vuetify.breakpoint.mdAndUp"
        :clipped-right="$vuetify.breakpoint.mdAndUp"
        fixed
        flat
        class="border-bottom"
      >
        <v-toolbar-title class="mr-4 pl-0">
          <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
          <span class="hidden-sm-and-down">Trade Plus</span>
        </v-toolbar-title>
        <v-text-field
          append-icon="mic"
          flat
          solo
          prepend-inner-icon="search"
          class="mx-3 toolbar-search"
          readonly
          v-model="search_text"
        ></v-text-field>

        <toolbar-menu></toolbar-menu>
      </v-toolbar>

      <v-content>
        <nuxt></nuxt>
      </v-content>
    </v-app>
  </div>
</template>

<script>

import ToolbarMenu from '~/components/ToolbarMenu'
export default {

  //middleware: "auth",

  components: {
    ToolbarMenu
  },
  data() {
    return {
      drawer: true,
      notifications: null,
      search_text: 'Lather Mobile Cover',

      right: true,
      rightDrawer: true,
      title: 'Vuetify.js'
    }
  }
}
</script>
