<template>
  <v-layout row>
    <v-card flat>
      <v-toolbar flat class="bg-white">
        <v-toolbar-side-icon>
          <v-icon size="34" color="primary">receipt</v-icon>
        </v-toolbar-side-icon>
        <v-toolbar-title class="headline ml-0">My Posts</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items class="hidden-sm-and-down">
          <v-menu :close-on-content-click="false" left :nudge-width="100" offset-y>
            <template v-slot:activator="{ on }">
              <v-btn flat class="bg-light" v-on="on">+ Create</v-btn>
            </template>

            <v-card>
              <v-list>
                <v-list-tile avatar>
                  <v-list-tile-avatar>
                    <v-icon size="34" color="primary">receipt</v-icon>
                  </v-list-tile-avatar>

                  <v-list-tile-content>
                    <v-list-tile-title class="title">Create Post</v-list-tile-title>
                  </v-list-tile-content>
                </v-list-tile>
              </v-list>

              <v-divider></v-divider>

              <v-list>
                <v-list-tile>
                  <v-list-tile-action>
                    <v-icon size="24" color="primary light-3">all_inbox</v-icon>
                  </v-list-tile-action>
                  <v-list-tile-title> <nuxt-link to="DFF">Product</nuxt-link></v-list-tile-title>
                </v-list-tile>

                <v-list-tile>


                  <v-list-tile-action>
                    <v-icon size="26" color="red light-3">business_center</v-icon>
                  </v-list-tile-action>
                  <v-list-tile-title> <nuxt-link to="DFF">Service</nuxt-link></v-list-tile-title>

                </v-list-tile>

                <v-list-tile>
                  <v-list-tile-action>
                    <v-icon size="28" color="grey light-3">star_border</v-icon>
                  </v-list-tile-action>
                  <v-list-tile-title> <nuxt-link to="DFF">Offer</nuxt-link></v-list-tile-title>
                </v-list-tile>

              </v-list>
            </v-card>
          </v-menu>
        </v-toolbar-items>
      </v-toolbar>

      <v-card-title>
        <div class="text-muted">{{ text_short }}</div>
      </v-card-title>
      <v-layout row justify-center align-center class="mb-3">
        <v-sheet height="200">
          <div class="text-xs-center mt-3">
            <v-icon size="50" color="primary">graphic_eq</v-icon>
          </div>
          <div class="text-xs-center">
            <div class="title">No post found..</div>
            <div class="text-muted pt-1">Sorry! no post found, Create your first post now..</div>
          </div>
        </v-sheet>
      </v-layout>

      <v-tabs height="60" v-model="active" color="grey lighten-3" slider-color="primary">
        <v-tab ripple class="text-capitalize">All</v-tab>
        <v-tab ripple class="text-capitalize">Products</v-tab>
        <v-tab ripple class="text-capitalize">Services</v-tab>
        <v-tab ripple class="text-capitalize">Offers</v-tab>
        <v-tab ripple class="text-capitalize">Promotion</v-tab>
        <v-tab-item class="pl-0 pr-0 bg-light" v-for="i in 5" :key="i">
          <v-container grid-list-md class="pa-3">
            <v-layout row wrap>
              <v-flex xs12 sm6 v-for="i in 4" :key="i">
                <v-card flat class="bg-white">
                  <v-img src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg" height="200px"></v-img>

                  <v-card-title>

                      <div
                        class="title-2 lh1 font-weight-medium  line-1 text-no-wrap"
                      >Top western road trips Top western road trips</div>
                      <span class="grey--text">1,000 views in this month</span>

                  </v-card-title>

                  <v-card-actions>
                    <v-btn flat class="bg-light text-capitalize">
                      <v-icon class="pr-2" color="primary">outlined_flag</v-icon>Propmote
                    </v-btn>
                    <v-btn icon>
                      <v-icon color="secondary">multiline_chart</v-icon>
                    </v-btn>
                    <v-spacer></v-spacer>
                    <v-btn icon>
                      <v-icon>edit</v-icon>
                    </v-btn>
                  </v-card-actions>

                  <v-slide-y-transition>
                    <v-card-text
                      v-show="show"
                    >I'm a thing. But, like most politicians, he promised more than he could deliver. You won't have time for sleeping, soldier, not with all the bed making you'll be doing. Then we'll go with that data file! Hey, you add a one and two zeros to that or we walk! You're going to do his laundry? I've got to find a way to escape.</v-card-text>
                  </v-slide-y-transition>
                </v-card>
              </v-flex>
            </v-layout>
          </v-container>
        </v-tab-item>
      </v-tabs>
    </v-card>
  </v-layout>
</template>

<script>
import CategoryPopup from '~/components/CategoryPopup.vue'

export default {
  layout: 'user',
  components: {
    CategoryPopup
  },
  data() {
    return {
      active: true,
      category_dialog: false,
      chkbox: true,
      select: { state: 'Florida', abbr: 'FL' },
      categories: [
        { state: 'Florida', abbr: 'FL' },
        { state: 'Georgia', abbr: 'GA' },
        { state: 'Nebraska', abbr: 'NE' },
        { state: 'California', abbr: 'CA' },
        { state: 'New York', abbr: 'NY' }
      ],
      form: {
        service_title: null,
        description: null,
        title: 'Category from Parent',
        id: null
      },
      text:
        'Lorem ipsum dolor sit amet, mel at clita quando. Te sit oratio vituperatoribus, nam ad ipsum posidonium mediocritatem, explicari dissentiunt cu mea. Repudiare disputationi vim in, mollis iriure nec cu, alienum argumentum ius ad. Pri eu justo aeque torquatos.',
      text_short:
        'Lorem ipsum dolor sit amet, mel at clita quando. Te sit oratio vituperatoribus, nam ad ipsum posidonium mediocritatem, explicari dissentiunt cu mea.'
    }
  },
  methods: {
    update_title(value) {
      this.form.title = value
    },
    update_id(value) {
      this.form.id = value
    },

    async services() {
      let formData = new FormData()
      formData.append('title', this.form.service_title)
      formData.append('description', this.form.description)
      formData.append('category', this.form.id)

      this.$axios.post(`post-services`, formData).then(response => {
        this.$root.$router.push({ path: '/business/post/edit' })
      })
    }
  }
}
</script>
