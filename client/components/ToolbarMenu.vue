<template>
  <v-layout row wrap>
    <v-spacer></v-spacer>
    <v-btn icon to="/">
      <v-icon>home</v-icon>
    </v-btn>
    <v-menu bottom left open-on-hover>
      <template v-slot:activator="{ on }">
        <v-btn icon v-on="on">
          <v-icon>apps</v-icon>
        </v-btn>
      </template>

      <v-list>
        <v-list-tile nuxt to="/auth/register">
          <v-list-tile-title>Register</v-list-tile-title>
        </v-list-tile>
        <v-list-tile nuxt to="/auth/login">
          <v-list-tile-title>Login</v-list-tile-title>
        </v-list-tile>
        <v-list-tile nuxt to="/business/create">
          <v-list-tile-title>Business</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-menu>

    <v-menu bottom left open-on-hover>
      <template v-slot:activator="{ on }">
        <v-btn icon v-on="on">
          <v-icon>person</v-icon>
        </v-btn>
      </template>

      <v-list>
        <v-list-tile nuxt to="/auth/register">
          <v-list-tile-title>Register</v-list-tile-title>
        </v-list-tile>
        <v-list-tile nuxt to="/auth/login">
          <v-list-tile-title>Login</v-list-tile-title>
        </v-list-tile>
        <v-list-tile nuxt to="/business/create">
          <v-list-tile-title>Business</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-menu>



<v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-top-transition">


        <v-toolbar flat color="white" class="pl-0">


           <v-text-field
          append-icon="mic"
          flat
          solo
          prepend-inner-icon="search"
          class="mx-3 ml-0 mr-0 toolbar-search"
          readonly
          v-model="search_text"
        ></v-text-field>
          <v-spacer></v-spacer>
          <v-toolbar-items>
             <v-btn icon  @click="dialog = false">
            <v-icon>close</v-icon>
          </v-btn>
          </v-toolbar-items>
        </v-toolbar>



    </v-dialog>
  </v-layout>
</template>


<script>
export default {
  data(){
    return {
      dialog: false,
      search_text: 'Air Conditioner maintanence'
    }
  }
}
</script>
