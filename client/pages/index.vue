<template>
  <section>
    <v-layout row wrap justify-center align-center mt-5>
      <v-flex xs12 sm8 md9>
        <v-layout row wrap>
          <v-flex xs6 md3>
            <v-sheet class="transparent">
              <div class="text-xs-center">
                <v-avatar size="75"  tile>
                  <img src="/icons/trust.svg"  alt="avatar" />
                </v-avatar>
              </div>
              <div class="text-xs-center pa-2">
                <div class="display-1">12541</div>
                <div class="text-muted pt-1">Truested business</div>
              </div>
            </v-sheet>
          </v-flex>
          <v-flex xs6 md3>
            <v-sheet class="transparent">
              <div class="text-xs-center">
                <v-avatar size="75" tile>
                  <img src="/icons/product.svg" alt="avatar" />
                </v-avatar>
              </div>
              <div class="text-xs-center pa-2">
                <div class="display-1">12541</div>
                <div class="text-muted pt-1">Products & Services</div>
              </div>
            </v-sheet>
          </v-flex>
          <v-flex xs6 md3>
            <v-sheet class="transparent">
              <div class="text-xs-center">
                <v-avatar size="75"  tile>
                  <img src="/icons/service.svg"  alt="avatar" />
                </v-avatar>
              </div>
              <div class="text-xs-center pa-2">
                <div class="display-1">24x7 Help</div>
                <div class="text-muted pt-1">Call us now</div>
              </div>
            </v-sheet>
          </v-flex>
          <v-flex xs6 md3>
            <v-sheet class="transparent">
              <div class="text-xs-center">
                <v-avatar size="75"  tile>
                  <img src="/icons/graph.svg"  alt="avatar" />
                </v-avatar>
              </div>
              <div class="text-xs-center pa-2">
                <div class="display-1">125K +</div>
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
            class="text-muted pt-1">
            <span
                class="font-weight-bold red--text"
                @click.stop="category_dialog = true"
              >
          View All Category
            </span>
          </div>
        </div>

      </v-sheet>

      <v-flex
        @mouseenter="$refs.mySwiper.swiper.autoplay.stop()"
        @mouseleave="$refs.mySwiper.swiper.autoplay.start()"
      >
        <swiper :options="swiperOption" ref="mySwiper" class="my-swiper">
          <!-- slides -->
          <swiper-slide v-for="category in categories" :key="category" class="swiper-slide">

            <nuxt-link :to="'/browse/'+ category.slug" class="black--text" :title="category.title">
            <v-card flat>
              <v-card-actions class="pa-3">
                <v-layout column justify-center align-center>
                  <v-img :src="category.icon" contain width="60" />
                </v-layout>
              </v-card-actions>

              <v-card-actions>
                <v-layout column justify-center align-center>
                  {{ category.title}}
                </v-layout>
              </v-card-actions>
            </v-card>
            </nuxt-link>
          </swiper-slide>

          <!-- Optional controls -->
          <div class="swiper-pagination hidden-xs-only" slot="pagination"></div>
        </swiper>
      </v-flex>
    </v-layout>
      <!-- Category Popup -->
      <category-popup-2 :isActive="category_dialog" @category="update_category"></category-popup-2>
      <!-- End of Category Popup -->

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
          <v-flex xs12 md4 v-for="business in businesses" :key="business">
            <v-card>
              <nuxt-link :to="'/browse/company/'+ business.slug">
                <v-img :src="business.coverimage" height="200"></v-img>
              </nuxt-link>

              <v-list two-line>
                <template>
                  <v-list-tile avatar>
                    <nuxt-link :to="'/browse/company/'+ business.slug">
                      <v-list-tile-avatar>
                        <img :src="business.profileimage" />
                      </v-list-tile-avatar>
                    </nuxt-link>

                    <v-list-tile-content>
                      <v-list-tile-title class="font-weight-medium">
                        <nuxt-link
                          :to="'/browse/company/'+ business.slug"
                          class="black--text"
                        >{{ business.title }}</nuxt-link>
                      </v-list-tile-title>
                      <v-list-tile-sub-title>{{ business.location }}</v-list-tile-sub-title>
                    </v-list-tile-content>
                  </v-list-tile>
                </template>
              </v-list>
              <v-divider></v-divider>
              <v-card-title primary-title>
                <div>
                  <div class="font-weight-light">{{ business.description }}</div>
                </div>
              </v-card-title>

              <v-card-actions class="pa-3">
                {{ business.reviews }} reviews
                <v-spacer></v-spacer>
                <v-rating :value="business.rating"
                      readonly dense color="red accent-3"
                      class="pa-0">
                      </v-rating>
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
            <nuxt-link
              :to="'/browse/'+ location.slug"
              class="black--text font-weight-bold"
              :title="location.title"
            >{{location.title}}
            </nuxt-link>
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
            <recent-products :limit="3"></recent-products>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </section>
</template>

<script>
import RecentProducts from '~/components/RecentProducts.vue'
import CategoryPopup2 from '~/components/CategoryPopup2.vue'
import { mapGetters } from 'vuex'

export default {
  layout: 'home',

  components: {
    RecentProducts,
     'category-popup-2': CategoryPopup2,
  },

  async asyncData({ $axios }) {
    let categories = await $axios.get('categories')
    let locations = await $axios.get('locations')
    let buz = await $axios.get('get-business')
    return {
      categories: categories.data,
      locations: locations.data,
      businesses: buz.data
    }
  },

  data() {
    return {
      r: '',
      category_dialog: false,

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

   methods: {
    update_category() {
      this.category_dialog = false
    }
  },
  computed: {
    ...mapGetters({
      category: 'app/category'
    })
  }
}
</script>
