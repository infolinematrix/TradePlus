<template>
  <v-card flat>
    <div>
      <v-tabs slider-color="primary" style="border:1px solid #dfdfdf">
        <v-tab ripple>Reviews</v-tab>
        <v-tab ripple>Write review</v-tab>

        <v-tab-item>
          
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
          <v-form @submit.prevent="post_review" ref="form1">
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
                    v-model="review.name"
                    :rules="nameRules"
                    required
                  ></v-text-field>
                </v-flex>

                <v-flex xs12 md6>
                  <v-text-field 
                  label="E-mail" 
                  v-model="review.email" 
                  :rules="emailRules"
                  required>
                  </v-text-field>
                </v-flex>

                <v-flex xs12 md12>
                  <v-text-field 
                  :counter="80" 
                  label="Title" 
                  v-model="review.title"
                  :rules="titleRules"
                  required></v-text-field>
                </v-flex>

                <v-flex xs12 md12>
                  <v-textarea
                    name="input-7-1"
                    label="Message"
                    v-model="review.description"
                    hint="Hint text"
                    :rules="messageRules"
                    required
                  ></v-textarea>
                </v-flex>

                <v-flex xs12>
                  <div>How do you rate?</div>
                  <v-rating v-model="review.rating" dense color="pink accent-2"></v-rating>
                </v-flex>

                <v-flex xs12>
               <v-btn 
              depressed 
              class="ma-0" color="primary"
              @click="loader = 'loading'"
              :loading="loading"
              :disabled="loading" 
              type="submit" >Submit
              </v-btn>
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
import Form from "vform";
import swal from "sweetalert2";
export default {
  props: ['node_id'],
  data() {
    return {
      message: null,
      reviews: [],
       /*Rules*/
      nameRules: [
        v => !!v || 'Name is required',
      ],
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
      titleRules: [
        v => !!v || 'Title is required',
      ],
      messageRules: [
        v => !!v || 'Message is required',
      ],

      loader: null,
      loading: false,

      review: new Form({
        node: this.node_id,
        name: null,
        email: null,
        title: null,
        description: null,
        rating: 1
      })
    }
  },

  methods: {
     async post_review() {
     
      const l = this.loader
      this[l] = !this[l]
      
      this.dialog = true;
      let formData = new FormData();
      formData.append('node', this.review.node)
      formData.append('name', this.review.name)
      formData.append('email', this.review.email)
      formData.append('title', this.review.title)
      formData.append('description', this.review.description)
      formData.append('rating', this.review.rating)
        
        if (this.$refs.form1.validate()) {
          this.snackbar = true
         this.$axios
            .post(`review/submit`, formData)
            .then(response => {
            setTimeout(() => (
            this[l] = false,
            swal.fire({
            title: "Review submited, waiting for modaration",
            type: "info",
            animation: true,
            showCloseButton: true
            })
        ), 1500),
        this.reset();
          })
         }else{

      setTimeout(() => (
            this[l] = false,
            swal.fire({
            title: "Invalid Input!",
            type: "warning",
            animation: true,
            showCloseButton: true
            })
        ), 500)
      }
     // });
      
      },

      reset () {
        this.$refs.form1.reset()
      },

  
  },
  mounted() {
    
    this.$axios.get(`reviews/${this.node_id}`).then(res => {
      this.reviews = res.data
    })
  }
}
</script>
