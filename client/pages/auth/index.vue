<template>
  <v-layout row wrap>
    <v-toolbar flat prominent>
      <v-icon color="primary">apps</v-icon>
      <v-toolbar-title class="title-2">Dashboard</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>


      <v-card flat   class="bg-white">

        <v-card-text>
          <div class="font-weight-medium">Welcome, Subha Sundar Das</div>
          <div class="grey--text">Since 14th April, 2017</div>
        </v-card-text>
      </v-card>

  </v-layout>
</template>

<script>
export default {
  layout: 'user',
  data() {
    return {
      profile_value: 74
    }
  }
}
</script>

