<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" fixed app>
      <v-list>
        <v-list-tile v-for="(item, i) in items" :key="i" :to="item.to" router exact>
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="item.title" />
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>

    <v-toolbar dense fixed flat color="white">
      <v-toolbar-side-icon></v-toolbar-side-icon>
      <v-toolbar-title>Trading Plus</v-toolbar-title>
      <v-spacer></v-spacer>
      <toolbar-menu></toolbar-menu>
    </v-toolbar>

    <v-sheet class="hidden-xs-only">
      <v-img class="white--text" height="600px" src="hero/hero7.jpg" cover>
        <v-container grid-list-lg fill-height class="grey--text">
          <v-layout column justify-center align-center>
            <div class="mb-2">
              <v-layout row wrap>
                <v-flex xs6 md4>
                  <v-sheet class="transparent">
                    <div class="text-xs-center">
                      <v-avatar size="75" tile>
                        <img src="/icons/finder.svg" alt="avatar" />
                      </v-avatar>
                    </div>
                  </v-sheet>
                </v-flex>
              </v-layout>
            </div>

            <div
              class="display-2 1font-weight-bold mb-4 hidden-xs-only black--text"
            >Discover Business in your Area</div>
            <v-toolbar floating dense extense class="py-2">
              <v-layout row wrap>
                <v-text-field
                  hide-details
                  prepend-icon="search"
                  label="Keywords"
                  placeholder="What are you looking for?"
                  single-line
                  full-width
                  style="width:450px"
                ></v-text-field>

                <v-toolbar-items class="hidden-sm-and-down">
                  <v-btn icon @click.stop="location_dialog = true">
                    <v-icon color="primary">my_location</v-icon>
                  </v-btn>
                </v-toolbar-items>
              </v-layout>
            </v-toolbar>

            
          </v-layout>
        </v-container>
      </v-img>

      <!-- Location Popup -->
      <location-popup-2 :isActive="location_dialog" @location="update_location"></location-popup-2>
      <!-- End of Location Popup -->
    </v-sheet>

    <v-content style="min-height:250px">
      <v-container grid-list-lg>
        <nuxt />
      </v-container>
    </v-content>

    <footer-nav class="footer"></footer-nav>
  </v-app>
</template>

<script>
import ToolbarMenu from '~/components/ToolbarMenu'
import FooterNav from '~/components/Footer.vue'
import LocationPopup2 from '~/components/LocationPopup2.vue'

import { mapGetters } from 'vuex'

export default {
  components: {
    ToolbarMenu,
    FooterNav,
    'location-popup-2': LocationPopup2,
  },
  data() {
    return {
      drawer: false,
      fixed: true,
      location_dialog: false,

      title: 'Vuetify.js',
      text:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
    }
  },

  methods: {
    update_location() {
      this.location_dialog = false
    }
  },
  computed: {
    ...mapGetters({
      location: 'app/location'
    })
  }
}
</script>
