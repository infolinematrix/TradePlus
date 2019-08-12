<template>
  <v-layout row wrap>
    <v-toolbar flat>
      <v-toolbar-title class="title-2">Profile</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-subheader>Create</v-subheader>
      <v-btn icon>
        <v-icon>apps</v-icon>
      </v-btn>
    </v-toolbar>

    <v-container grid-list-lg>
      <v-sheet height="auto" color="none">
        <v-subheader class="pl-0">Your Information</v-subheader>

        <v-flex xs12 md8 sm8>
          <v-layout row wrap>
            <v-flex xs12 sm6 md6>
              <v-text-field label="First Name" outline></v-text-field>
            </v-flex>
            <v-flex xs12 sm6 md6>
              <v-text-field label="Last Name" outline></v-text-field>
            </v-flex>
          </v-layout>
        </v-flex>

        <v-subheader class="pl-0">Email & Contact No</v-subheader>

        <v-flex xs12 md8 sm8>
          <v-layout row wrap>
            <v-flex xs12 sm6 md6>
              <v-text-field label="Email" outline></v-text-field>
            </v-flex>

            <v-flex xs6 sm2 md2>
              <v-text-field label="Code" outline></v-text-field>
            </v-flex>
            <v-flex xs6 sm4 md4>
              <v-text-field label="Contact No" outline></v-text-field>
            </v-flex>
          </v-layout>

          <v-flex>
            <v-checkbox v-model="allowSpaces" label="Allow receive News Letter" class="pa-0"></v-checkbox>
          </v-flex>

          <v-flex>
            <v-btn color="error" class="align-right" dark depressed large>
              Update
              <v-icon right dark>cloud_upload</v-icon>
            </v-btn>
          </v-flex>
        </v-flex>
      </v-sheet>
    </v-container>
  </v-layout>
</template>

<script>
export default {
  layout: 'user'
}
</script>

