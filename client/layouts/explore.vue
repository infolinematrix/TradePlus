<template>
  <div id="application">
    <v-app>
      <v-navigation-drawer
        width="250"
        fixed
        :clipped="$vuetify.breakpoint.mdAndUp"
        app
        v-model="drawer"
        class="inner-border border-top1"
      >
        <v-list subheader>
          <v-subheader>User Controls</v-subheader>

          <v-list-tile class="height-mid">
            <v-list-tile-action>
              <v-checkbox v-model="notifications"></v-checkbox>
            </v-list-tile-action>

            <v-list-tile-content @click.prevent="notifications = !notifications">
              <v-list-tile-title>Manufacturer</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile class="height-mid">
            <v-list-tile-action>
              <v-checkbox v-model="notifications"></v-checkbox>
            </v-list-tile-action>

            <v-list-tile-content @click.prevent="notifications = !notifications">
              <v-list-tile-title>Wholeseller</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile class="height-mid">
            <v-list-tile-action>
              <v-checkbox v-model="notifications"></v-checkbox>
            </v-list-tile-action>

            <v-list-tile-content @click.prevent="notifications = !notifications">
              <v-list-tile-title>Retailer</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>

        <v-list>
          <v-divider></v-divider>
          <v-subheader>Filter by Category</v-subheader>
          <v-list-tile avatar v-for="i in 10" :key="i">
            <v-list-tile-content>
              <v-list-tile-title>
                <nuxt-link to="browse#">Parent of Category</nuxt-link>
              </v-list-tile-title>
              <v-list-tile-sub-title class="font-weight-thin caption">1600 item found</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
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
        <div id="application" class="application">
        <nuxt></nuxt>
        </div>
      </v-content>

      <v-navigation-drawer right clipped app :width="300" class="inner-border">
        <v-img mg
                height="200px" :src="`https://picsum.photos/300/200?random=${Math.floor(Math.random() * 100) + i}`"  alt="lorem"
                class="image"/>

        <v-divider></v-divider>
        <v-container fluid grid-list-sm class="pa-2">
          <v-card flat>
            <v-list two-line>
              <template>
                <v-list-tile avatar ripple>
                  <v-list-tile-content>
                    <v-list-tile-title>Best Quality mobile tempered protector</v-list-tile-title>
                    <v-list-tile-sub-title class="text--primary">item.headline</v-list-tile-sub-title>
                    <v-list-tile-sub-title>item.subtitle</v-list-tile-sub-title>
                  </v-list-tile-content>
                  <v-list-tile-action>
                    <v-list-tile-action-text>item.action</v-list-tile-action-text>
                    <v-icon color="grey lighten-1">star_border</v-icon>
                  </v-list-tile-action>
                </v-list-tile>
                <v-divider></v-divider>
              </template>
            </v-list>
          </v-card>

          <v-card flat class="elevation-0 mb-1" v-for="i in 5" :key="i">
            <v-layout row wrap>
              <v-card-title class="title-1 font-weight-medium mb-0 pb-0">
                <nuxt-link to="#">Best Quality mobile tempered protector</nuxt-link>
              </v-card-title>

              <v-card-actions class="px-0">
                <v-list-tile class="grow">
                  <v-list-tile-avatar tile color="grey darken-3" size="50">
                    <v-img class="elevation-0" src="https://picsum.photos/300/250?random=3"></v-img>
                  </v-list-tile-avatar>

                  <v-list-tile-content class="hidden-xs">
                    <v-list-tile-title class="text-muted caption">
                      <nuxt-link to="company-profile#">Matrix Infoline Private Limited</nuxt-link>
                    </v-list-tile-title>
                    <v-list-tile-subtitle class="text-muted caption">Siliguri, West Bengal</v-list-tile-subtitle>
                  </v-list-tile-content>
                </v-list-tile>
              </v-card-actions>
            </v-layout>
            <v-divider></v-divider>
          </v-card>
        </v-container>
      </v-navigation-drawer>
    </v-app>
  </div>
</template>

<script>
import ToolbarMenu from '~/components/ToolbarMenu'
export default {
   components: {
    ToolbarMenu
  },
  data() {
    return {
      drawer: true,
      notifications: null,
      search_text: 'Lather Mobile Cover',
      items: [
        { header: 'Today' },
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
          title: 'Brunch this weekend?',
          subtitle:
            "<span class='text--primary'>Ali Connors</span> &mdash; I'll be in your neighborhood doing errands this weekend. Do you want to hang out?"
        },
        { divider: true, inset: true },
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
          title: 'Summer BBQ <span class="grey--text text--lighten-1">4</span>',
          subtitle:
            "<span class='text--primary'>to Alex, Scott, Jennifer</span> &mdash; Wish I could come, but I'm out of town this weekend."
        },
        { divider: true, inset: true },
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
          title: 'Oui oui',
          subtitle:
            "<span class='text--primary'>Sandra Adams</span> &mdash; Do you have Paris recommendations? Have you ever been?"
        }
      ],
      right: true,
      rightDrawer: true,
      title: 'Vuetify.js'
    }
  }
}
</script>
