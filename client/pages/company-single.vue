<template>
  <v-container grid-list-lg>
    <v-layout row wrap>
      <v-flex md8 xs12>
        <v-card flat>
          <v-img src="/cover.jpg" height="250px">
            <v-layout column fill-height>
              <v-card-title>
                <v-btn dark icon>
                  <span>
                    <input type="file" ref="cover_file" style="display: none" />
                    <v-icon dark>camera_alt</v-icon>
                  </span>
                </v-btn>
              </v-card-title>
            </v-layout>
          </v-img>
        </v-card>

        <v-toolbar flat extended dense>
          <v-avatar size="125" tile="false">
            <v-img src="logo.png" alt="avatar"></v-img>
          </v-avatar>

          <v-sheet class="mt-5 ml-3">
            <h1 class="title mb-1">Matrix Infoline Private Limited</h1>
            <div class="display-2">HDLD</div>
          </v-sheet>

          <v-spacer></v-spacer>
          <v-sheet class="mt-5 ml-3">
            <template>
              <v-btn icon>
                <v-icon>home</v-icon>
              </v-btn>
              <v-btn icon>
                <v-icon>person</v-icon>
              </v-btn>
              <v-btn icon>
                <v-icon>persons</v-icon>
              </v-btn>
            </template>
          </v-sheet>
        </v-toolbar>

        <v-card-text style="height: 200px;">sdfdsf</v-card-text>
      </v-flex>
      <v-flex md4 xs12>Right Panel</v-flex>
    </v-layout>
  </v-container>
</template>
<script>
export default {}
</script>
