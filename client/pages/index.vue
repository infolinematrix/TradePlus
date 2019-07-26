<template>
  <section>
    <v-layout row wrap justify-center align-center mt-2>
      <v-flex xs12 sm8 md10>
        <v-layout row wrap>
          <v-flex xs6 md3>
            <v-sheet class="transparent">
              <div class="text-xs-center">
                <v-icon size="60" color="primary">verified_user</v-icon>
              </div>
              <div class="text-xs-center pa-2">
                <div class="title font-weight-thin">12541</div>
                <div class="text-muted pt-1">Truested business</div>
              </div>
            </v-sheet>
          </v-flex>
          <v-flex xs6 md3>
            <v-sheet class="transparent">
              <div class="text-xs-center">
                <v-icon size="60" color="primary">ballot</v-icon>
              </div>
              <div class="text-xs-center pa-2">
                <div class="title font-weight-thin">12541</div>
                <div class="text-muted pt-1">Products & Services</div>
              </div>
            </v-sheet>
          </v-flex>
          <v-flex xs6 md3>
            <v-sheet class="transparent">
              <div class="text-xs-center">
                <v-icon size="60" color="primary">perm_phone_msg</v-icon>
              </div>
              <div class="text-xs-center pa-2">
                <div class="title font-weight-thin">12541</div>
                <div class="text-muted pt-1">Lead Generated</div>
              </div>
            </v-sheet>
          </v-flex>
          <v-flex xs6 md3>
            <v-sheet class="transparent">
              <div class="text-xs-center">
                <v-icon size="60" color="primary">timeline</v-icon>
              </div>
              <div class="text-xs-center pa-2">
                <div class="title font-weight-thin">12541</div>
                <div class="text-muted pt-1">Monthly Search</div>
              </div>
            </v-sheet>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>

    <v-layout row wrap justify-center align-center class="mt-5">
      <v-sheet height="200">
        <div class="text-xs-center pa-3">
          <v-icon size="70" color="primary">list</v-icon>
        </div>
        <div class="text-xs-center">
          <div class="display-1 font-weight-bold">Popular Categories</div>
          <div
            class="text-muted pt-1"
          >Post your requirement for FREE! Get matching products/services in your mail box</div>
        </div>
      </v-sheet>

      <swiper :options="swiperOption" ref="mySwiper" class="my-swiper">
        <!-- slides -->
        <swiper-slide v-for="category in categories" :key="category" class="swiper-slide">
          <v-card flat>
            <v-card-actions class="pa-3">
              <v-layout column justify-center align-center>
                <v-img :src="category.icon" contain width="60" />
              </v-layout>
            </v-card-actions>

            <v-card-actions>
              <v-layout column justify-center align-center>
                <nuxt-link :to="'/browse/'+ category.slug" class="black--text">{{ category.title}}</nuxt-link>
              </v-layout>
            </v-card-actions>
          </v-card>
        </swiper-slide>

        <!-- Optional controls -->
        <div class="swiper-pagination hidden-xs-only" slot="pagination"></div>
      </swiper>
    </v-layout>

    <v-layout column justify-center align-center class="mt-5">
      <v-flex xs12 sm8 md6>
        <v-layout column justify-center align-center>
          <v-flex xs6 md3>
            <v-sheet>
              <div class="text-xs-center pa-2">
                <div
                  class="display-1 font-weight-bold default--text text-default"
                >The Businesses growing with us</div>
                <div
                  class="text-muted pt-1"
                >Post your requirement for FREE! Get matching products/services in your mail box</div>
              </div>
            </v-sheet>
          </v-flex>
        </v-layout>
        <v-layout row wrap>
          <v-flex xs12 md4 v-for="i in 3" :key="i">
            <v-card>
              <v-img
                :src="`https://picsum.photos/250/150?random=${Math.floor(Math.random() * 100) + r}`"
              >
                <v-layout column fill-height>
                  <v-card-title>
                    <v-btn dark icon>
                      <v-icon>chevron_left</v-icon>
                    </v-btn>

                    <v-spacer></v-spacer>

                    <v-btn dark icon class="mr-3">
                      <v-icon>edit</v-icon>
                    </v-btn>

                    <v-btn dark icon>
                      <v-icon>more_vert</v-icon>
                    </v-btn>
                  </v-card-title>

                  <v-spacer></v-spacer>
                </v-layout>
              </v-img>

              <v-list two-line>
                <template>
                  <v-list-tile avatar>
                    <v-list-tile-avatar>
                      <img src="https://cdn.vuetifyjs.com/images/lists/ali.png" />
                    </v-list-tile-avatar>

                    <v-list-tile-content>
                      <v-list-tile-title class="font-weight-medium">Matrix Infoline Private Limited</v-list-tile-title>
                      <v-list-tile-sub-title>Siliguri, West Bengal</v-list-tile-sub-title>
                    </v-list-tile-content>
                  </v-list-tile>
                </template>
              </v-list>
              <v-divider></v-divider>
              <v-card-title primary-title>
                <div>
                  <div class="font-weight-light">{{ text }}</div>
                </div>
              </v-card-title>

              <v-card-actions class="pa-3">
                1245 reviews
                <v-spacer></v-spacer>
                <v-icon color="primary">star_border</v-icon>
                <v-icon color="primary">star_border</v-icon>
                <v-icon color="primary">star_border</v-icon>
                <v-icon>star_border</v-icon>
                <v-icon>star_border</v-icon>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>

    <v-layout row wrap justify-center align-center class="mt-5">
      <v-flex xs12 sm10 md10>
        <v-layout column justify-center align-center>
          <v-flex xs6 md3>
            <v-sheet>
              <div class="text-xs-center pa-2">
                <v-icon size="70" color="primary">pin_drop</v-icon>
              </div>
              <div class="text-xs-center pa-2">
                <div
                  class="display-1 font-weight-bold default--text text-default"
                >Suppliers Location</div>
                <div
                  class="text-muted pt-1"
                >Post your requirement for FREE! Get matching products/services in your mail box</div>
              </div>
            </v-sheet>
          </v-flex>
        </v-layout>
        <v-layout row wrap>
          <v-flex xs4 md2 v-for="location in locations" :key="location" class="text-xs-center">
            <nuxt-link to="#" class="black--text font-weight-bold">{{location.title}}</nuxt-link>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>

    <v-layout column justify-center align-center class="mt-5">
      <v-flex xs6 md3>
        <v-sheet height="300">
          <div class="text-xs-center pa-3">
            <v-icon size="70" color="primary">graphic_eq</v-icon>
          </div>
          <div class="text-xs-center pa-2">
            <div class="display-1 font-weight-bold">Post your requirement</div>
            <div
              class="text-muted pt-1"
            >Post your requirement for FREE! Get matching products/services in your mail box</div>
            <div class="mt-2">
              <v-btn outline large depressed color="primary">Post now</v-btn>
            </div>
          </div>
        </v-sheet>
      </v-flex>
    </v-layout>

    <v-layout row wrap justify-center align-center class="mt-5">
      <v-flex xs12 sm10 md10>
        <v-layout column justify-center align-center>
          <v-flex xs6 md3>
            <v-sheet>
              <div class="text-xs-center pa-2">
                <div class="display-1 font-weight-bold default--text text-default">Recent Activities</div>
                <div
                  class="text-muted pt-1"
                >Recent and On-going Activities, check it out below to see what user been doing!</div>
              </div>
            </v-sheet>
          </v-flex>
        </v-layout>
        <v-layout row wrap>
          <v-flex xs12 md6>
            <recent-products :limit=3></recent-products>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </section>
</template>

<script>
import RecentProducts from '~/components/RecentProducts.vue'

export default {
  layout: 'home',

  components: {
    RecentProducts
  },

  async asyncData({ $axios }) {
    let categories = await $axios.get('categories')
    let locations = await $axios.get('locations')
    return {
      categories: categories.data,
      locations: locations.data
    }
  },

  data() {
    return {
      r: '',

      swiperOption: {
        auto: true,
        slidesPerView: 6,
        spaceBetween: 2,
        mousewheel: true,
        autoplay: {
          delay: 1500,
          disableOnInteraction: false
        },

        breakpoints: {
          1024: {
            slidesPerView: 4,
            spaceBetween: 40
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 30
          },
          640: {
            slidesPerView: 2,
            spaceBetween: 20
          },
          320: {
            slidesPerView: 1,
            spaceBetween: 10
          }
        }
      },
      text:
        'The typography of an application is just as important as its functionality. Vuetify.js uses the Material Design spec Roboto Font.',
      text2:
        'The typography of an application is just as important as its functionality.'
    }
  },

  async mounted() {}
}
</script>
