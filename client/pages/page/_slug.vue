<template>
  <v-container grid-list-lg>
    <v-layout row wrap fill-height justify-center align-start>
      <v-flex xs12 md8>
        <v-card flat>
          <p class="display-1">{{ page.title }}</p>
          <blockquote class="blockquote pl-0" v-html="page.content"></blockquote>
        </v-card>
      </v-flex>

    </v-layout>
  </v-container>
</template>
<script>
export default {
  async asyncData({ $axios, params }) {
    let page = await $axios.get(`page/${params.slug}`)
    return {
      page: page.data
    }
  }
}
</script>
