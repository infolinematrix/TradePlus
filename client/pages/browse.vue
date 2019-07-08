<template>
  <v-layout row>
    <v-flex>
      <v-toolbar flat dense class="transparent">
        <v-toolbar-title class>
          <h1 class="body-2">Cardiology Specialist in Canada</h1>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <span class="grey--text">1254 found</span>
      </v-toolbar>

      <v-container fluid grid-list-sm class="pa-0 pl-3 border-bottom">
        <v-breadcrumbs :items="items" class="pa-0 mb-1">
          <template v-slot:divider>
            <v-icon>chevron_right</v-icon>
          </template>
        </v-breadcrumbs>
      </v-container>

      <v-alert
        v-model="infobox"
        dismissible
        color="default"
        class="grey--text"
      >List of trusted professionals available to help with plumbing issues. An experienced plumber can help you with garbage disposal unblocking, bathroom repair and drain replacement to keep your project running smoothly.</v-alert>

      <v-tabs centered color="white" icons-and-text show-arrows class="mt-2 mb-2">
        <v-tabs-slider color="white"></v-tabs-slider>

        <v-tab href="#tab-1">
          <v-sheet>
            <v-img src="product.png" contain alt="lorem"></v-img>
            <span class="font-weight-bold text-capitalize">Products</span>
          </v-sheet>
        </v-tab>

        <v-tab href="#tab-2">
           <v-sheet>
            <v-img src="service.png" contain alt="lorem"></v-img>
            <span class="font-weight-bold text-capitalize">Services</span>
          </v-sheet>
        </v-tab>

        <v-tab href="#tab-2">
           <v-sheet>
            <v-img src="coupon.png" contain alt="lorem"></v-img>
            <span class="font-weight-bold text-capitalize">Coupon</span>
          </v-sheet>
        </v-tab>


        <v-tab href="#tab-2">
           <v-sheet>
            <v-img src="sale.png" contain alt="lorem"></v-img>
            <span class="font-weight-bold text-capitalize">Coupon</span>
          </v-sheet>
        </v-tab>

        <v-tab-item v-for="i in 4" :key="i" :value="'tab-' + i" class="pt-3">
          <v-card flat>
            <v-card-text>{{ text }}</v-card-text>
          </v-card>
        </v-tab-item>
      </v-tabs>

      <v-container fluid grid-list-sm class="pa-2">
        <v-layout row wrap>
          <v-flex md6 xs12 v-for="r in 2" :key="r">
            <v-img
              height="200px"
              :src="`https://picsum.photos/300/200?random=${Math.floor(Math.random() * 100) + i}`"
              alt="lorem"
              class="image"
            >
              <v-container fill-height fluid class="pa-0">
                <v-layout fill-height>
                  <v-flex xs12 align-end flexbox>DFRERDF FDS</v-flex>
                </v-layout>
              </v-container>
            </v-img>
            <v-card class="elevation-1">
              <v-card-title>
                <div>
                  <nuxt-link
                    to="#"
                    class="title-2 font-weight-medium 1red--text"
                  >Best Quality mobile tempered protector</nuxt-link>
                  <div class="text-muted caption mt-2">{{text}}</div>
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
        <v-img src="banner1.jpg" contain alt="lorem"></v-img>
      </v-container>

      <v-container fluid class="pa-2">
        <v-flex v-for="i in 2" :key="i">
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
    </v-flex>
  </v-layout>
</template>
<script>
export default {
  layout: 'explore',
  data() {
    return {
      i: 1,
      notifications: null,
      infobox: true,
      text:
        'The API will return 30 items per page by default. To request another page, use the ?page parameter.',
      items: [
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

  mounted() {
    console.log(
      this.$helpers.text_truncate('We are doing JS string exercises.', 15, '!!')
    )
  }
}
</script>

