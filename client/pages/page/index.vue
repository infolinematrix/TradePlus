<template>
  <v-container grid-list-lg>
    <v-layout row wrap fill-height justify-center align-start>
      <v-flex xs12 md8>
        <v-card flat v-for="page in pages" :key="page">
        <v-card-title class="pb-1">
          <h2 class="headline">
            <nuxt-link to="#">{{ page.title }}</nuxt-link>
            </h2>
        </v-card-title>
        <v-card-text class="pt-0 grey--text">
          {{ page.meta_description }}
        </v-card-text>

        <v-divider></v-divider>
        </v-card>


      </v-flex>
    </v-layout>
  </v-container>
</template>
</v-list>
      </v-flex>

    </v-layout>
  </v-container>
</template>
<script>
export default {
  async asyncData({ $axios, params }) {
    let pages = await $axios.get(`pages`)
    return {
      pages: pages.data
    }
  }
}
</script>
