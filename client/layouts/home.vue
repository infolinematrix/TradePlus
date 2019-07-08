<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" fixed app>
      <v-list>
        <v-list-tile v-for="(item, i) in items" :key="i" :to="item.to" router exact>
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="item.title"/>
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

    <v-sheet>
      <v-img class="white--text" height="500px" src="hero1.png">
        <v-container grid-list-lg fill-height class="grey--text">
          <v-layout column justify-center align-center mt-5>
            <div class="display-2 font-weight-thin mb-4">Discover business in your area</div>
            <v-toolbar dense floating class="py-2" style="width:500px">
              <v-btn icon>
                <v-icon>subject</v-icon>
              </v-btn>
              <v-spacer></v-spacer>
              <v-text-field
                hide-details
                prepend-icon="search"
                label="Outline"
                placeholder="What are you looking for?"
                single-line
                full-width
                style="width:375px"
              ></v-text-field>

              <v-toolbar-items class="hidden-sm-and-down">
                <v-btn icon>
                  <v-icon>my_location</v-icon>
                </v-btn>
              </v-toolbar-items>
            </v-toolbar>

            <div class="mt-5">
              <v-btn depressed color="primary" large nuxt to="browse">Explore</v-btn>
            </div>
          </v-layout>
        </v-container>
      </v-img>
    </v-sheet>



    <v-content>
      <v-container grid-list-lg>
        <nuxt/>
      </v-container>
    </v-content>
    <v-navigation-drawer v-model="rightDrawer" :right="right" temporary fixed>
      <v-list>
        <v-list-tile @click.native="right = !right">
          <v-list-tile-action>
            <v-icon light>compare_arrows</v-icon>
          </v-list-tile-action>
          <v-list-tile-title>Switch drawer (click me)</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
   <footer-nav></footer-nav>
  </v-app>
</template>

<script>
import ToolbarMenu from '~/components/ToolbarMenu'
import FooterNav from "~/components/Footer.vue";

export default {
  components: {
    ToolbarMenu,
    FooterNav
  },
  data() {
    return {
      drawer: false,
      fixed: true,
      items: [
        {
          icon: 'apps',
          title: 'Welcome',
          to: '/'
        },
        {
          icon: 'bubble_chart',
          title: 'Inspire',
          to: '/inspire'
        }
      ],
      right: true,
      rightDrawer: false,
      title: 'Vuetify.js'
    }
  }
}
</script>
