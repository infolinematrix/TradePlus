<template>
  <v-card flat>
    <div>
      <v-tabs slider-color="primary" style="border:1px solid #dfdfdf">
        <v-tab ripple>Reviews</v-tab>
        <v-tab ripple>Write review</v-tab>

        <v-tab-item>
          <v-card flat>
            <v-card-text class="pb-0">
              <div class="body-2">Kripa's Printed Cushions Cover</div>
              <div
                class="body-1 mt-2 font-weight-light"
              >The Woodman set to work at once, and so sharp was his axe that the tree was soon chopped nearly through.</div>
            </v-card-text>

            <v-card-actions class="pl-3">
              <span class="text-muted caption">Subha Sundar Das ~ 14th April, 2019</span>
              <v-spacer></v-spacer>
              <v-rating value="4" readonly dense color="pink accent-3" class="pa-0"></v-rating>
            </v-card-actions>
            <v-divider></v-divider>
          </v-card>

          <v-card flat v-for="review in reviews" :key="review">
            <v-card-text class="pb-0">
              <div class="body-2">{{ review.title }}</div>
              <p class="text--primary">{{ review.description }}</p>
            </v-card-text>

            <v-card-actions class="pl-3">
              <span class="text-muted">{{ review.posted_by}} ~ {{ review.posted_on}}</span>
              <v-spacer></v-spacer>
              <v-rating :value="review.rating" readonly dense color="pink accent-3" class="pa-0"></v-rating>
            </v-card-actions>
            <v-divider></v-divider>
          </v-card>
        </v-tab-item>

        <v-tab-item>
          <v-form>
            <v-container>
              <v-catd-text class="text-muted">
                Product review create a more consistent user experience. They can also help buyers
                make more informed shopping decisions. Submit your review.
              </v-catd-text>

              <v-layout row wrap v-if="!message">
                <v-flex xs12 md6>
                  <v-text-field
                    :counter="25"
                    label="Full name"
                    v-model="review.first_name"
                    required
                  ></v-text-field>
                </v-flex>

                <v-flex xs12 md6>
                  <v-text-field label="E-mail" v-model="review.email" required></v-text-field>
                </v-flex>

                <v-flex xs12 md12>
                  <v-text-field :counter="80" label="Title" v-model="review.title" required></v-text-field>
                </v-flex>

                <v-flex xs12 md12>
                  <v-textarea
                    name="input-7-1"
                    label="Default style"
                    v-model="review.description"
                    hint="Hint text"
                  ></v-textarea>
                </v-flex>

                <v-flex xs12>
                  <div>How do you rate?</div>
                  <v-rating v-model="review.rating" dense color="pink accent-2"></v-rating>
                </v-flex>

                <v-flex xs12>
                  <v-btn @click.stop="post_review()" class="ma-0" color="primary" depressed>Submit</v-btn>
                </v-flex>
              </v-layout>

              <v-layout v-else>{{message}}</v-layout>
            </v-container>
          </v-form>
        </v-tab-item>
      </v-tabs>
    </div>
  </v-card>
</template>

<script>
import Form from 'vform'
export default {
  props: ['node_id'],
  data() {
    return {
      message: null,
      reviews: [],
      review: new Form({
        node: this.node_id,
        first_name: null,
        last_name: null,
        email: null,
        title: null,
        description: null,
        rating: 1
      })
    }
  },

  methods: {
    async post_review() {
      const { data } = await this.$axios.post(`review/submit`, this.review)
      this.message = data.message
    }
  },
  mounted() {
    this.$axios.get(`reviews/${this.node_id}`).then(res => {
      this.reviews = res.data
    })
  }
}
</script>
