<template>
  <v-layout row>
      <v-card flat>
        <v-card-title>
          <div>
            <h3 class="headline">My Posts</h3>
            <div class="text-muted">{{ text_short }}</div>
          </div>
        </v-card-title>
        <v-layout row justify-center align-center>
          <v-sheet height="200">
            <div class="text-xs-center mt-3">
              <v-icon size="50" color="primary">graphic_eq</v-icon>
            </div>
            <div class="text-xs-center">
              <div class="headline">No post found..</div>
              <div
                class="text-muted pt-1"
              >Post your requirement for FREE! Get matching products/services in your mail box</div>
              <div class="mt-2">
                <v-btn outline large depressed color="primary">Post now</v-btn>
              </div>
            </div>
          </v-sheet>
        </v-layout>
        <v-container grid-list-md class="pa-3" >
          <v-tabs height="60" v-model="active" color="grey lighten-3" slider-color="yellow">
            <v-tab ripple class="text-capitalize">All</v-tab>
            <v-tab ripple class="text-capitalize">Products</v-tab>
            <v-tab ripple class="text-capitalize">Services</v-tab>
            <v-tab ripple class="text-capitalize">Offers</v-tab>
            <v-tab ripple class="text-capitalize">Promotion</v-tab>
            <v-tab-item class="pl-0 pr-0 bg-light" v-for="i in 5" :key="i">
              <v-card-text>
                <v-layout row wrap>
                  <v-flex xs12 sm6 v-for="i in 4" :key="i">
                    <v-card>
                      <v-img
                        src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
                        height="200px"
                      ></v-img>

                      <v-card-title>
                        <div>
                          <div
                            class="subheading lh1 font-weight-medium text-truncate text-wrap"
                          >Top western road trips Top western road trips</div>
                          <span class="grey--text">1,000 miles of wonder</span>
                        </div>
                      </v-card-title>

                      <v-card-actions class="pl-0">
                        <v-btn depressed color="blue lighten-5" class="text-capitalize">View</v-btn>
                        <v-btn depressed color="blue-grey lighten-5" class="text-capitalize">Promote</v-btn>
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
              </v-card-text>
            </v-tab-item>
          </v-tabs>
        </v-container>
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
