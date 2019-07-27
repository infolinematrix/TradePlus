<template>
  <v-layout row>
    <v-flex>
      <v-toolbar flat dense class="transparent" style="height:40px">
        <v-toolbar-title class>
          <h1 class="body-2">{{ meta_data.category }} in {{ meta_data.location }}</h1>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <span class="grey--text">1254 found</span>
      </v-toolbar>

      <v-container fluid grid-list-sm class="pa-0 pl-3 border-bottom">
        <v-breadcrumbs :items="breadcrumb" class="pl-0 pt-0 mt-0">
          <template v-slot:divider>
            <v-icon>chevron_right</v-icon>
          </template>
        </v-breadcrumbs>
      </v-container>

      <v-alert
        v-model="infobox"
        dismissible
        color="default"
        class="grey--text mt-0"
      >List of trusted professionals available to help with plumbing issues. An experienced plumber can help you with garbage disposal unblocking, bathroom repair and drain replacement to keep your project running smoothly.</v-alert>

      <v-tabs centered color="white" icons-and-text show-arrows class="mt-2 mb-2">
        <v-tabs-slider color="white"></v-tabs-slider>

        <v-tab href="#tab-product">
          <v-sheet>
            <v-img src="/icons/product.svg" contain alt="Product list"></v-img>
            <span class="font-weight-bold text-capitalize">Products</span>
          </v-sheet>
        </v-tab>

        <v-tab href="#tab-service">
          <v-sheet>
            <v-img src="/icons/service.svg" contain alt="Service list"></v-img>
            <span class="font-weight-bold text-capitalize">Services</span>
          </v-sheet>
        </v-tab>

        <v-tab-item :value="'tab-product'" class="pt-3">
          <v-container fluid grid-list-sm class="pa-2">
            <v-layout row wrap>
              <v-flex md6 xs12 v-for="r in 2" :key="r">
                <v-img
                  height="200px"
                  :src="`https://picsum.photos/300/200?random=${Math.floor(Math.random() * 100) + i}`"
                  alt="lorem"
                  class="image"
                ></v-img>
                <v-card class="elevation-1">
                  <v-card-title>
                    <div>
                      <nuxt-link
                        to="#"
                        class="title-2 font-weight-medium red--text"
                      >Best Quality mobile tempered protector</nuxt-link>
                      <div class="text-muted caption mt-2">fdsfdf</div>
                    </div>
                  </v-card-title>

                  <v-card-actions class="px-0">
                    <v-list-tile class="grow">
                      <v-list-tile-avatar color="grey darken-3">
                        <v-img
                          src="https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light"
                        ></v-img>
                      </v-list-tile-avatar>

                      <v-list-tile-content class="hidden-xs text-truncate">
                        <v-list-tile-title class="text-muted caption">
                          <nuxt-link
                            to="company-profile#"
                          >{{ $helpers.text_truncate('Matrix Infoline Private Limited',25) }}</nuxt-link>
                        </v-list-tile-title>
                        <div
                          class="text-muted caption"
                        >{{ $helpers.text_truncate('Siliguri, West Bengal',25) }}</div>
                      </v-list-tile-content>
                    </v-list-tile>

                    <v-spacer></v-spacer>
                    <v-btn icon>
                      <v-icon>phone</v-icon>
                    </v-btn>
                    <v-btn icon>
                      <v-icon>mail_outline</v-icon>
                    </v-btn>
                    <v-btn icon>
                      <v-icon>share</v-icon>
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-flex>
            </v-layout>
          </v-container>

          <v-container fluid grid-list-sm class="pa-2">
            <v-img src="/banner1.jpg" contain alt="lorem"></v-img>
          </v-container>

          <v-container fluid class="pa-2">
            <v-flex v-for="product in products" :key="product">
              <v-card class="elevation-1 mb-3">
                <v-layout row wrap>
                  <v-flex xs12 md3>
                    <v-img :src="product.image" aspect-ratio="1.5"></v-img>
                  </v-flex>
                  <v-flex xs12 md8>
                    <v-card-text class="pb-0">
                      <div class="pb-0 mb-1 grey--text caption">Sponsored</div>
                      <nuxt-link to="#" class="title-2 font-weight-bold">{{ product.title }}</nuxt-link>

                      <div class="mt-2 grey--text">
                        {{ $helpers.text_truncate(product.description,100) }}
                      </div>

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
                  </v-flex>
                </v-layout>
                <v-card-actions class="px-0">
                  <v-list-tile class="grow">
                    <v-list-tile-avatar color="grey lighten-1">
                      <v-img
                        :src="product.logo"
                      ></v-img>
                    </v-list-tile-avatar>

                    <v-list-tile-content class="hidden-xs text-truncate">
                      <v-list-tile-title class="text-muted caption">
                        <nuxt-link
                          to="company-profile#"
                        >{{ $helpers.text_truncate(product.company,25) }}</nuxt-link>
                      </v-list-tile-title>
                      <div
                        class="text-muted caption"
                      >{{ $helpers.text_truncate(product.company_location,25) }}</div>
                    </v-list-tile-content>
                  </v-list-tile>

                  <v-spacer></v-spacer>
                  <v-btn icon>
                    <v-icon>phone</v-icon>
                  </v-btn>
                  <v-btn icon>
                    <v-icon>mail_outline</v-icon>
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-flex>
          </v-container>
        </v-tab-item>

        <v-tab-item :value="'tab-service'" class="pt-3">
          <v-container fluid grid-list-sm class="pa-2">
            <v-layout row wrap>
              <v-flex md6 xs12 v-for="r in 2" :key="r">
                <v-img
                  height="200px"
                  :src="`https://picsum.photos/300/200?random=${Math.floor(Math.random() * 100) + i}`"
                  alt="lorem"
                  class="image"
                ></v-img>
                <v-card class="elevation-1">
                  <v-card-title>
                    <div>
                      <nuxt-link
                        to="#"
                        class="title-2 font-weight-medium 1red--text"
                      >Best Quality mobile tempered protector</nuxt-link>
                      <div class="text-muted caption mt-2">dfsdfd</div>
                    </div>
                  </v-card-title>

                  <v-card-actions class="px-0">
                    <v-list-tile class="grow">
                      <v-list-tile-avatar color="grey darken-3">
                        <v-img
                          src="https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light"
                        ></v-img>
                      </v-list-tile-avatar>

                      <v-list-tile-content class="hidden-xs text-truncate">
                        <v-list-tile-title class="text-muted caption">
                          <nuxt-link
                            to="company-profile#"
                          >{{ $helpers.text_truncate('Matrix Infoline Private Limited',25) }}</nuxt-link>
                        </v-list-tile-title>
                        <div
                          class="text-muted caption"
                        >{{ $helpers.text_truncate('Siliguri, West Bengal',25) }}</div>
                      </v-list-tile-content>
                    </v-list-tile>

                    <v-spacer></v-spacer>
                    <v-btn icon>
                      <v-icon>phone</v-icon>
                    </v-btn>
                    <v-btn icon>
                      <v-icon>mail_outline</v-icon>
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-flex>
            </v-layout>
          </v-container>

          <v-container fluid grid-list-sm class="pa-2">
            <v-img src="banner1.jpg" contain alt="lorem"></v-img>
          </v-container>

          <v-container fluid class="pa-2">
            <v-flex>
              <v-card class="elevation-1 mb-3">
                <v-layout row wrap>
                  <v-flex xs12 md4>
                    <v-img src="https://picsum.photos/600/400?random" aspect-ratio="1.5"></v-img>
                  </v-flex>
                  <v-flex xs12 md8>
                    <v-card-text class="pb-0">
                      <div class="pb-0 mb-1 grey--text caption">Sponsored</div>
                      <nuxt-link
                        to="#"
                        class="title-2 font-weight-bold"
                      >Plastic Bottle, Best price gurentee</nuxt-link>
                      <div class="font-weight-medium mt-2 grey--text">sfsdfds</div>
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
                  </v-flex>
                </v-layout>
                <v-card-actions class="px-0">
                  <v-list-tile class="grow">
                    <v-list-tile-avatar color="grey lighten-1">
                      <v-img
                        src="https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light"
                      ></v-img>
                    </v-list-tile-avatar>

                    <v-list-tile-content class="hidden-xs text-truncate">
                      <v-list-tile-title class="text-muted caption">
                        <nuxt-link
                          to="company-profile#"
                        >{{ $helpers.text_truncate('Matrix Infoline Private Limited',25) }}</nuxt-link>
                      </v-list-tile-title>
                      <div
                        class="text-muted caption"
                      >{{ $helpers.text_truncate('Siliguri, West Bengal',25) }}</div>
                    </v-list-tile-content>
                  </v-list-tile>

                  <v-spacer></v-spacer>
                  <v-btn icon>
                    <v-icon>phone</v-icon>
                  </v-btn>
                  <v-btn icon>
                    <v-icon>mail_outline</v-icon>
                  </v-btn>
                  <v-btn icon>
                    <v-icon>share</v-icon>
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-flex>
          </v-container>
        </v-tab-item>
      </v-tabs>
    </v-flex>
  </v-layout>
</template>
<script>

export default {
  layout: 'explore',
  data() {
    return {
      infobox: true,
      products: [],
      meta_data:null,
      breadcrumb: [
        {
          text: 'Home',
          disabled: false,
          href: '/'
        },
        {
          text: 'Browse',
          disabled: false,
          href: '/browse'
        },
        {
          text: 'Link 2',
          disabled: true,
          href: 'breadcrumbs_link_2'
        }
      ]
    }
  },

  async asyncData({ $axios, params }) {
    let products = await $axios.get('browse/' + params.slug +'/'+params.source)
    return {
      products: products.data.products,
      meta_data: products.data.meta_data
    }
  }

}
</script>

