<template>
  <v-app>
    <v-toolbar
        color="white"
        app
        :clipped-left="$vuetify.breakpoint.mdAndUp"
        :clipped-right="$vuetify.breakpoint.mdAndUp"
        fixed
        flat
        class="border-bottom"
      >
      <v-toolbar-side-icon></v-toolbar-side-icon>

      <v-toolbar-title>Trading Plus</v-toolbar-title>



      <toolbar-menu></toolbar-menu>

    </v-toolbar>

    <v-content>
      <v-container grid-list-lg>
      <nuxt/>
      </v-container>
    </v-content>

    <footer></footer>

  </v-app>
</template>

<script>
import ToolbarMenu from '~/components/ToolbarMenu'
import Footer from "~/components/Footer.vue";

export default {
  components: {
    ToolbarMenu,
    Footer
  },
  data() {
    return {
      drawer: false,
      items: [
        {
          icon: 'apps',
          title: 'Welcome',
          to: '/'
        },
        {
          icon: 'bubble_chart',
          title: 'Inspire',
          to: '/inspire'
        }
      ],
      right: true,
      rightDrawer: false,
      title: 'Vuetify.js'
    }
  }
}
</script>
