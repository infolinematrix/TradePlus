<template>
  <v-layout  row >
    <v-flex xs12 md7>
      <v-card flat>
        <v-card-title>
          <div>
            <h3 class="headline">Create Post</h3>
            <div class="text-muted">{{ text_short }}</div>
          </div>
        </v-card-title>

        <v-container grid-list-md class="pa-3">
          <v-tabs height="60" v-model="active" color="grey lighten-3" slider-color="yellow">
            <v-tab ripple class="text-capitalize">Product</v-tab>
            <v-tab ripple class="text-capitalize">Service</v-tab>
            <v-tab ripple class="text-capitalize">Offer</v-tab>

            <v-tab-item class="pl-0 pr-0 bg-light">
              <v-img
                :aspect-ratio="16/9"
                src="https://cdn.vuetifyjs.com/images/parallax/material.jpg"
              >
                <v-layout pa-2 column fill-height class="lightbox white--text">
                  <v-spacer></v-spacer>
                  <v-flex shrink>
                    <v-btn icon>
                      <v-icon color="primary">camera_enhance</v-icon>
                    </v-btn>
                  </v-flex>
                </v-layout>
              </v-img>
              <v-card flat>
                <v-card-text>
                  <div class="text-muted">{{ text_short }}</div>
                </v-card-text>
                <v-card-text>
                  <v-form @submit.prevent="services">
                    <v-layout row wrap>
                      <v-flex xs12>
                        <v-text-field v-model="form.service_title" label="Title" placeholder="What service you provide?" outline></v-text-field>
                      </v-flex>
                    </v-layout>

                    <v-layout row wrap>
                      <category-popup  :title="form.title" @eId="update_id" @eTitle="update_title"></category-popup>
                    </v-layout>


                    <v-layout row wrap>
                      <v-flex xs12>
                        <v-textarea
                          v-model="form.description"
                          outline
                          name="input-7-4"
                          label="Outline textarea"

                        ></v-textarea>
                      </v-flex>
                    </v-layout>
                    <v-flex xs12>
                      <v-checkbox v-model="chkbox" label="I agree"></v-checkbox>
                    </v-flex>

                    <v-card-actions class="pa-0">
                      <v-btn type="submit" large depressed color="primary">Update</v-btn>
                    </v-card-actions>
                  </v-form>
                </v-card-text>
              </v-card>
            </v-tab-item>
            <v-tab-item class="pl-0 pr-0">
              <v-card flat>
                <v-card-text>{{ text_short }}</v-card-text>
              </v-card>
            </v-tab-item>
          </v-tabs>
        </v-container>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import CategoryPopup from "~/components/CategoryPopup.vue";

export default {
  layout:'user',
  components: {
    CategoryPopup
  },
  data() {
    return {
      active: true,
      category_dialog:false,
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
        title:'Category from Parent',
        id:null
      },
      text:
        'Lorem ipsum dolor sit amet, mel at clita quando. Te sit oratio vituperatoribus, nam ad ipsum posidonium mediocritatem, explicari dissentiunt cu mea. Repudiare disputationi vim in, mollis iriure nec cu, alienum argumentum ius ad. Pri eu justo aeque torquatos.',
      text_short:
        'Lorem ipsum dolor sit amet, mel at clita quando. Te sit oratio vituperatoribus, nam ad ipsum posidonium mediocritatem, explicari dissentiunt cu mea.'
    }
  },
  methods: {
    update_title(value){
      this.form.title = value
    },
    update_id(value){
      this.form.id = value
    },

     async services() {

        let formData = new FormData();
        formData.append("title", this.form.service_title);
        formData.append("description", this.form.description);
        formData.append("category", this.form.id);
        
         this.$axios
            .post(`post-services`, formData)
            .then(response => {
            let service = response.data;  
            this.$root.$router.push({path: '/business/post/'+service.node_id+'/edit/'+service.source_id})
          })
     }
        
  }
}
</script>
