<template>
  <v-layout row>
    <v-flex>
      <v-toolbar flat dense class="transparent">
        <v-toolbar-title class="">
          <h1 class="body-2">Cardiology Specialist in Canada</h1>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <span class="grey--text">1254 found</span>
      </v-toolbar>

      <v-container fluid grid-list-sm class="pa-0 pl-3">

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
      class="black--text"

    >
      List of trusted professionals available to help with plumbing issues. An experienced plumber can help you with garbage disposal unblocking, bathroom repair and drain replacement to keep your project running smoothly.
    </v-alert>
      <v-container fluid grid-list-sm class="pa-2">
        <v-layout row wrap>
          <v-flex md6 xs12 v-for="r in 2" :key="r">
            <v-card class="elevation-1">
              <v-img
                height="200px"
                :src="`https://picsum.photos/300/250?random=${Math.floor(Math.random() * 100) + r}`"
                class="pa-2 image"
                alt="lorem"
              >
                <v-container fill-height fluid>
                  <v-layout fill-height>
                    <v-flex xs12 align-end flexbox></v-flex>
                  </v-layout>
                </v-container>
              </v-img>
              <v-card-title>
                <div>
                  <nuxt-link
                    to="#"
                    class="title-2 font-weight-medium 1red--text"
                  >Best Quality mobile tempered protector</nuxt-link>
                  <div class="text-muted caption mt-2">{{text}}</div>
                </div>
              </v-card-title>
              <v-card-actions>
                <v-btn depressed color="primary">Contact Us</v-btn>
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
          <v-card class="elevation-0 mb-1" style="background-color:#f4faff">
            <v-layout row wrap>
              <v-flex xs12 md4>
                <img
                  :src="`https://picsum.photos/300/200?random=${Math.floor(Math.random() * 100) + i}`"
                  class="image pa-2"
                  alt="lorem"
                >
              </v-flex>
              <v-flex xs12 md8>
                <v-card-text class="pb-0">
                  <div class="pb-0 mb-1 grey--text caption">Sponsored</div>
                  <nuxt-link
                    to="#"
                    class="title-2 font-weight-medium"
                  >Plastic Bottle, Best price gurentee</nuxt-link>
                  <div class="text-muted caption mt-2">{{text}}</div>
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
                <v-list-tile-avatar tile color="grey darken-3">
                  <v-img
                    class="elevation-0"
                    src="https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light"
                  ></v-img>
                </v-list-tile-avatar>

                <v-list-tile-content class="hidden-xs">
                  <v-list-tile-title class="text-muted caption">
                    <nuxt-link to="company-profile#">Matrix Infoline Private Limited</nuxt-link>
                  </v-list-tile-title>
                  <div class="text-muted caption">Siliguri, West Bengal</div>
                </v-list-tile-content>

                <v-btn depressed small class="ml-2">
                  <v-icon class="mr-2">call</v-icon>
                </v-btn>
                <v-btn depressed small class="ml-2">
                  <v-icon class="mr-2">email</v-icon>
                </v-btn>
              </v-list-tile>
            </v-card-actions>
            <v-divider></v-divider>
          </v-card>
        </v-flex>
      </v-container>

      <v-container fluid grid-list-sm class="pa-2">
        <v-flex v-for="i in 10" :key="i">
          <v-card flat class="elevation-0 mb-1">
            <v-layout row wrap>
              <v-flex xs12 md4>
                <img
                  :src="`https://picsum.photos/300/200?random=${Math.floor(Math.random() * 100) + i}`"
                  class="pa-2 image"
                  alt="lorem"
                >
              </v-flex>
              <v-flex xs12 md8>
                <v-card-text>
                  <nuxt-link
                    to="#"
                    class="title-2 font-weight-medium"
                  >Best Quality mobile tempered protector</nuxt-link>
                  <div class="text-muted caption mt-2">{{text}}</div>
                  <v-card-actions class="px-0">
                    <v-icon color="primary">star_border</v-icon>
                    <v-icon color="primary">star_border</v-icon>
                    <v-icon color="primary">star_border</v-icon>
                    <v-icon>star_border</v-icon>
                    <v-icon>star_border</v-icon>136 reviews
                    <v-spacer></v-spacer>

                    <v-tooltip top color="primary">
                      <template v-slot:activator="{ on }">
                        <v-icon size="34" color="secondary" v-on="on">verified_user</v-icon>
                      </template>
                      <span>Verified Business</span>
                    </v-tooltip>
                  </v-card-actions>
                </v-card-text>
              </v-flex>
            </v-layout>

            <v-card-actions class="px-0">
              <v-list-tile class="grow">
                <v-list-tile-avatar tile color="grey darken-3">
                  <v-img
                    class="elevation-0"
                    src="https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light"
                  ></v-img>
                </v-list-tile-avatar>

                <v-list-tile-content class="hidden-xs">
                  <v-list-tile-title class="text-muted caption">
                    <nuxt-link to="company-profile#">Matrix Infoline Private Limited</nuxt-link>
                  </v-list-tile-title>
                  <v-list-tile-subtitle class="text-muted caption">Siliguri, West Bengal</v-list-tile-subtitle>
                </v-list-tile-content>

                <v-btn flat icon color="grey">
                  <v-icon>call</v-icon>
                </v-btn>
                <v-btn flat icon color="grey">
                  <v-icon>email</v-icon>
                </v-btn>
              </v-list-tile>
            </v-card-actions>
            <v-divider></v-divider>
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
      notifications: null,
      infobox:true,
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
  }
}
</script>
