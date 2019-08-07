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
                  <v-list-tile-title> <nuxt-link to="/business/service/create">Service</nuxt-link></v-list-tile-title>

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
      <v-tabs height="60" v-model="active" color="grey lighten-3" slider-color="primary">
        <v-tab ripple class="text-capitalize">All</v-tab>
        <v-tab ripple class="text-capitalize">Products</v-tab>
        <v-tab ripple class="text-capitalize">Services</v-tab>
        <v-tab ripple class="text-capitalize">Offers</v-tab>
        <v-tab ripple class="text-capitalize">Promotion</v-tab>
        
        <div class="text-xs-center">


                      <v-dialog v-model="dialog" hide-overlay persistent width="300">
                        <v-card color="primary">
                          <v-card-text>
                            Please stand by
                            <v-progress-linear indeterminate color="blue" class="mb-0"></v-progress-linear>
                          </v-card-text>
                        </v-card>
                      </v-dialog>
                    </div>
        <v-tab-item class="pl-0 pr-0 bg-light">
          <v-container grid-list-md class="pa-3">
           <v-alert v-model="all_alert" dismissible :type="this.type">{{ all_message }}</v-alert>

            <v-layout row wrap>
              
              <v-flex xs12 sm6 v-for="post in posts" :key="post">
                

                <v-card flat class="bg-white">
                  <v-img :src="post.image"  height="200" content></v-img>

                  <v-card-title>

                      <div
                        class="title-2 lh1 font-weight-medium  line-1 text-no-wrap"
                      >{{ post.title }}</div>
                      <span class="grey--text">1,000 views in this month</span>

                  </v-card-title>

                  <v-card-actions>
                    <v-btn flat class="bg-light text-capitalize" nuxt :to="{path: '/business/post/promotion/'+post.slug}">
                      <v-icon class="pr-2" color="primary">outlined_flag</v-icon>Promote
                    </v-btn>
                    <v-btn icon>
                      <v-icon color="secondary">multiline_chart</v-icon>
                    </v-btn>
                    <v-spacer></v-spacer>
                    <v-btn v-if="post.type == 'business'" icon nuxt to="/business/edit">
                      <v-icon>edit</v-icon>
                    </v-btn>
                    <v-btn v-if="post.type == 'producttype'" 
                    icon nuxt :to="{path: '/business/post/product/'+post.id+'/edit/'+post.source_id}">
                      <v-icon>edit</v-icon>
                    </v-btn>

                     <v-btn v-if="post.type == 'servicetype'" 
                    icon nuxt :to="{path: '/business/post/service/'+post.id+'/edit/'+post.source_id}">
                      <v-icon>edit</v-icon>
                    </v-btn>
                    
                     <v-btn v-if="post.type != 'business'" icon @click="delete_post(post.id)">
                      <v-icon>delete</v-icon>
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

        <v-tab-item class="pl-0 pr-0 bg-light">
        <v-container grid-list-md class="pa-3">
         <v-alert v-model="pro_alert" dismissible :type="this.type">{{ pro_message }}</v-alert>

            <v-layout row wrap>
            
              <v-flex xs12 sm6 v-for="product in products" :key="product">
                <v-card flat class="bg-white">
                  <v-img :src="product.image" height="200px"></v-img>

                  <v-card-title>

                      <div
                        class="title-2 lh1 font-weight-medium  line-1 text-no-wrap"
                      >{{ product.title }}</div>
                      <span class="grey--text">{{ product.description }}</span>

                  </v-card-title>

                  <v-card-actions>
                    <v-btn flat class="bg-light text-capitalize"
                    nuxt :to="{path: '/business/post/promotion/'+product.slug}">
                      <v-icon class="pr-2" color="primary">outlined_flag</v-icon>Promote
                    </v-btn>
                    <v-btn icon>
                      <v-icon color="secondary">multiline_chart</v-icon>
                    </v-btn>
                    <v-spacer></v-spacer>
                    <v-btn icon nuxt :to="{path: '/business/post/product/'+product.id+'/edit/'+product.source_id}">
                      <v-icon>edit</v-icon>
                    </v-btn>
                    <v-btn icon @click="delete_product(product.id)">
                      <v-icon>delete</v-icon>
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

         <v-tab-item class="pl-0 pr-0 bg-light">
        <v-container grid-list-md class="pa-3">
          <v-alert v-model="serv_alert" dismissible :type="this.type">{{ serv_message }}</v-alert>

            <v-layout row wrap>
              <v-flex xs12 sm6 v-for="service in services" :key="service">
                <v-card flat class="bg-white">
                  <v-img :src="service.image" height="200px"></v-img>

                  <v-card-title>

                      <div
                        class="title-2 lh1 font-weight-medium  line-1 text-no-wrap"
                      >{{ service.title }}</div>
                      <span class="grey--text">{{ service.description }}</span>

                  </v-card-title>

                  <v-card-actions>
                    <v-btn flat class="bg-light text-capitalize"  nuxt :to="{path: '/business/post/promotion/'+service.slug}">
                      <v-icon class="pr-2" color="primary">outlined_flag</v-icon>Promote
                    </v-btn>
                    <v-btn icon>
                      <v-icon color="secondary">multiline_chart</v-icon>
                    </v-btn>
                    <v-spacer></v-spacer>
                    <v-btn ico nuxt :to="{path: '/business/post/service/'+service.id+'/edit/'+service.source_id}">
                      <v-icon>edit</v-icon>
                    </v-btn>
                     <v-btn icon @click="delete_service(service.id)">
                      <v-icon>delete</v-icon>
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


                 <v-tab-item class="pl-0 pr-0 bg-light">
                </v-tab-item>

          <v-tab-item class="pl-0 pr-0 bg-light">
        <v-container grid-list-md class="pa-3">
          <v-alert v-model="prom_alert" dismissible :type="this.type">{{ prom_message }}</v-alert>

            <v-layout row wrap>
              <v-flex xs12 sm6 v-for="promotion in promotions" :key="promotion">
                <v-card flat class="bg-white">
                  <v-img :src="promotion.image" height="200px"></v-img>

                  <v-card-title>

                      <div
                        class="title-2 lh1 font-weight-medium  line-1 text-no-wrap"
                      >{{ promotion.title }}</div>
                  <span class="grey--text">
                    CPC : {{ promotion.cpc }}, Max Clicks : {{ promotion.max_click }}, Click : {{ promotion.clicked }}  

                  </span>
                  </v-card-title>

                  <v-card-actions>
                     <v-btn flat class="bg-light text-capitalize">
                      <v-icon class="pr-2" color="primary">calendar_today</v-icon>Expire On : 
                      {{ promotion.expire }}
                    </v-btn>
                    
                    <v-spacer></v-spacer>
                    
                     <v-btn icon @click="delete_promotion(promotion.id)">
                      <v-icon>delete</v-icon>
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
import swal from "sweetalert2";

export default {
  layout: 'user',
  data() {
    return {
      dialog: true,
      active: true,
      type: '',
      all_alert: false,
      pro_alert: false,
      serv_alert: false,
      prom_alert: false,
      all_message: null,
      pro_message: null,
      serv_message: null,
      prom_message: null,
      posts: [],
      products: [],
      services: [],
      promotions: [],
      text:
        'Lorem ipsum dolor sit amet, mel at clita quando. Te sit oratio vituperatoribus, nam ad ipsum posidonium mediocritatem, explicari dissentiunt cu mea. Repudiare disputationi vim in, mollis iriure nec cu, alienum argumentum ius ad. Pri eu justo aeque torquatos.',
      text_short:
        'Lorem ipsum dolor sit amet, mel at clita quando. Te sit oratio vituperatoribus, nam ad ipsum posidonium mediocritatem, explicari dissentiunt cu mea.'
    }
  },

  methods: {

     async delete_product(e) {
          swal.fire({
            title: "Are You Sure",
            type: "warning",
            animation: true,
            showCloseButton: true,
            showCancelButton: true,
            }).then(result => {
              if (result.value) {
              this.$axios
                .post(`delete-post/`+e)
                .then(response => {
               this.pro_alert = true
               this.type = "info"
               this.pro_message = 'Post Deleted....'
               this.$axios.get(`get-products`).then(response => {
                this.products = response.data;
               })  
               this.posts = response.data;
               this.$root.$router.push({path: '/business/post'})
              })
              }
            })
     },

     async delete_service(e) {
          swal.fire({
            title: "Are You Sure",
            type: "warning",
            animation: true,
            showCloseButton: true,
            showCancelButton: true,
            }).then(result => {
              if (result.value) {
              this.$axios
                .post(`delete-post/`+e)
                .then(response => {
               console.log(response.data);     
               this.serv_alert = true
               this.type = "info"
               this.serv_message = 'Post Deleted....'
               
               this.$axios.get(`get-services`).then(response => {
                this.services = response.data;
               })  

               this.posts = response.data;
               this.$root.$router.push({path: '/business/post'})
              })
              }
            })
          },

     async delete_post(e) {
          swal.fire({
            title: "Are You Sure",
            type: "warning",
            animation: true,
            showCloseButton: true,
            showCancelButton: true,
            }).then(result => {
              if (result.value) {
              this.$axios
                .post(`delete-post/`+e)
                .then(response => {

               this.all_alert = true
               this.type = "info"
               this.all_message = 'Post Deleted....'
               
               this.posts = response.data;
              })
              }
            })
     },

     async delete_promotion(e) {
       
          swal.fire({
            title: "Are You Sure",
            type: "warning",
            animation: true,
            showCloseButton: true,
            showCancelButton: true,
            }).then(result => {
              if (result.value) {
              this.$axios
                .post(`delete-promotion/`+e)
                .then(response => {
              
               this.prom_alert = true
               this.type = "info"
               this.prom_message = 'Promotion Deleted....'
               
               this.$axios.get(`get-promotions`).then(response => {
                this.promotions = response.data;
               })  

               this.posts = response.data;
               this.$root.$router.push({path: '/business/post'})
              })
              }
            })
     },
  },

  mounted(){


              this.$axios
                .get(`get-promotions`)
                .then(response => {
                   this.dialog = false;
                  this.promotions = response.data;
                })

              this.$axios
                .get(`get-products`)
                .then(response => {
                   this.dialog = false;
                  this.products = response.data;
                })

                this.$axios
                .get(`get-services`)
                .then(response => {
                   this.dialog = false;
                  this.services = response.data;
                })

                 this.$axios
                .get(`all-posts`)
                .then(response => {
                  this.dialog = false;
                  this.posts = response.data;
                })
  }
  
}
</script>
