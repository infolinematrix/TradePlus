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
          <v-subheader>Filter</v-subheader>

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
          <v-list-tile v-for="category in this.categories" :key="category" class="pb-0 mb-0">
            <v-list-tile-content>
              <v-list-tile-title>
                <a v-on:click="getFilterresult(category.slug)">{{ category.title }}</a>

              </v-list-tile-title>
              <v-list-tile-sub-title
                class="font-weight-thin caption"
              >{{ $helpers.text_truncate('filter.location.slug',10) }}</v-list-tile-sub-title>
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
       <v-toolbar-side-icon></v-toolbar-side-icon>
      <v-toolbar-title>Trading Plus</v-toolbar-title>
      <v-spacer></v-spacer>
      <toolbar-menu></toolbar-menu>
    </v-toolbar>

      <v-content>
        <div id="application" class="application">
          <nuxt></nuxt>
        </div>
      </v-content>

      <v-navigation-drawer right clipped app :width="300" class="inner-border">
        <v-card-text class="pb-0">
          <div class="pb-0 mb-1 grey--text caption">Sponsored</div>
          <nuxt-link to="#" class="title-2 font-weight-bold">Plastic Bottle, Best price gurentee</nuxt-link>
          <div class="font-weight-medium mt-2 grey--text">{{text}}</div>
          <v-card-actions class="px-0">
            <v-icon color="red">stars</v-icon>
            <v-icon color="red">stars</v-icon>
            <v-icon color="red">stars</v-icon>
            <v-icon>star_border</v-icon>
            <v-icon>star_border</v-icon>136 reviews
            <v-spacer></v-spacer>

            <v-icon>star_border</v-icon>
          </v-card-actions>
        </v-card-text>
        <v-divider></v-divider>
        <v-container fluid grid-list-sm class="pa-2">
          <v-card flat class="elevation-0 mb-1">
            <v-layout row wrap >
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
                    <div class="text-muted caption">Siliguri, West Bengal</div>
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
import { mapGetters } from 'vuex'
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
      i: 0,
      categories: null,
      parent: 0
    }
  },
  computed: {
    ...mapGetters({
      filter: 'app/filter'
      //user_role: "auth/user_role"
    })
  },
  methods: {
    getFilterresult(e) {
     let param = this.$route.params
      if (param.slug != undefined && param.source != undefined) {
        this.$root.$router.push('/browse/' + param.slug + '/' + e)
      } else {
        this.$root.$router.push('/browse/' + e)
      }
    }
  },

  async mounted() {
    this.$axios.get('categories/' + this.parent).then(response => {
      this.categories = response.data
    });

  }
}
</script>
