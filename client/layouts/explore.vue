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
                <nuxt-link :to="$helpers.category_url(category.slug, $store)">{{ category.title}}</nuxt-link>
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
          @click.stop="dialog = true"
        ></v-text-field>

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
        <v-btn icon @click.stop="dialog = true">
          <v-icon>search</v-icon>
        </v-btn>
        <v-btn icon>
          <v-avatar size="20px" tile>
            <img src="/avatar.png" alt="Vuetify" />
          </v-avatar>
        </v-btn>
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

    <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-top-transition">
      <v-toolbar flat color="primary" class="pl-0">
        <v-text-field
          append-icon="mic"
          flat
          solo
          prepend-inner-icon="search"
          class="toolbar-search"
          readonly
          v-model="search_text"
        ></v-text-field>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn icon @click="dialog = false">
            <v-icon>close</v-icon>
          </v-btn>
        </v-toolbar-items>
      </v-toolbar>
    </v-dialog>
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
      dialog: false,
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
    setCategoryParent(e) {
      this.$store.commit('modules/products/SET_FILTER_CATEGORY', e)

      let lslug = this.$route.params.result
      if (
        getData('search_type') == 'locations' ||
        this.$route.params.slug != undefined
      ) {
        this.$root.$router.push('/browse/' + lslug + '/' + e)
      } else {
        this.$root.$router.push('/browse/' + e)
      }
      //
    }
  },

  async mounted() {
    this.$axios.get('categories/' + this.parent).then(response => {
      this.categories = response.data
    })
  }
}
</script>
