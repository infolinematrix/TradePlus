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
        <v-list class="mb-3">
          <div class="pl-3 font-weight-medium grey--text">Quick Navigation</div>
          <v-list-tile router exact class="height-30" nuxt to="/auth">
            <v-list-tile-content>
              <v-list-tile-title>Dashboard</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile router exact class="height-30" nuxt to="/business/post">
            <v-list-tile-content>
              <v-list-tile-title>My Posts</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>

        <v-flex class="font-weight-medium">
          <v-subheader>Business</v-subheader>
          <v-container class="pt-0">
            <v-flex class="mb-2">
              <nuxt-link to="/business/edit">Profile</nuxt-link>
            </v-flex>

            <v-flex class="mb-2">
              <nuxt-link to="/business/post">Posts</nuxt-link>
            </v-flex>
          </v-container>
          <v-divider></v-divider>
        </v-flex>
        <v-flex class="font-weight-medium">
          <v-subheader>Products/Services</v-subheader>
          <v-container class="pt-0">
            <v-flex class="mb-2">
              <nuxt-link to="/business/post/service/create">Service</nuxt-link>
            </v-flex>
            <v-flex class="mb-2">
              <nuxt-link to="/business/post/product/create">Product</nuxt-link>
            </v-flex>
          </v-container>
          <v-divider></v-divider>
        </v-flex>

        <v-flex class="font-weight-medium">
          <v-subheader>Promotions</v-subheader>
          <v-container class="pt-0">
            <v-flex class="mb-2">
              <nuxt-link to="/business/post">Create</nuxt-link>
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
        <v-layout row wrap>
          <v-flex xs12 md8 sm8>
            <nuxt></nuxt>
          </v-flex>
          <v-flex xs12 md4 sm4>
            <v-card flat>
              <v-toolbar flat>
                <v-toolbar-title class="title">Message</v-toolbar-title>

                <v-spacer></v-spacer>
              </v-toolbar>

              <div>
                <v-list two-line>
                  <div v-for="i in 10" :key="i" class="mb-3">
                    <v-list-tile avatar ripple>
                      <v-list-tile-content>
                        <v-list-tile-sub-title class="caption">23 days ago, Administrator</v-list-tile-sub-title>
                        <v-list-tile-title class="body-2">
                          <nuxt-link to="#">{{text_short }}</nuxt-link>
                        </v-list-tile-title>
                        <v-list-tile-sub-title class="text--muted">{{text_short }}</v-list-tile-sub-title>
                      </v-list-tile-content>
                      <v-list-tile-action>
                        <v-icon size="40" color="grey lighten-3">question_answer</v-icon>
                      </v-list-tile-action>
                    </v-list-tile>
                    <v-divider></v-divider>
                  </div>
                </v-list>
              </div>
            </v-card>
          </v-flex>
        </v-layout>
      </v-content>
    </v-app>
  </div>
</template>

<script>
import ToolbarMenu from '~/components/ToolbarMenu'
import { mapGetters } from 'vuex'

export default {
  middleware: 'auth',

  components: {
    ToolbarMenu
  },
  data() {
    return {
      drawer: true,
      notifications: null,
      right: true,
      rightDrawer: true
    }
  },

  computed: {
    ...mapGetters({
      user: 'auth/user'
    })
  },



  mounted() {
    // Fetch the user.
    this.$store.dispatch('auth/fetchUser')
  }
}
</script>
