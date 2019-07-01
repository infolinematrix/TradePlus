<template>
  <v-layout row wrap>
    <v-toolbar flat>
      <v-toolbar-title class="title-2">Dashboard</v-toolbar-title>

      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>apps</v-icon>
      </v-btn>
    </v-toolbar>

    <v-container grid-list-lg class="pa-2">
      <v-card flat class="mb-4 border-bottom">
        <v-toolbar flat dense color="white">
          <v-toolbar-title class="title-2 font-weight-regular">
            Hello,
            Subha Sundar Das
          </v-toolbar-title>

          <v-spacer></v-spacer>
          <v-btn icon>
            <v-icon>person</v-icon>
          </v-btn>
        </v-toolbar>

        <v-list two-line>
          <template>
            <v-list-tile avatar ripple>
              <v-list-tile-content>
                <v-list-tile-sub-title class="grey--text">Since 14th April, 2017</v-list-tile-sub-title>
                <v-list-tile-sub-title>
                  Last login :
                  <span
                    class="text--primary"
                  >14th May, 2018 at 22.30:14 from 138.15.54.2</span>
                </v-list-tile-sub-title>
              </v-list-tile-content>

              <v-list-tile-action>
                <v-list-tile-action-text>Profile completed</v-list-tile-action-text>
                <v-progress-circular
                  :size="100"
                  :width="15"
                  :value="profile_value"
                  color="red"
                  class="body-2"
                >{{ profile_value }}</v-progress-circular>
              </v-list-tile-action>
            </v-list-tile>
            <v-btn flat>
              <v-icon left>cloud_upload</v-icon>Update Profile
            </v-btn>
            <v-btn flat>
              <v-icon left>person</v-icon>Change Password
            </v-btn>
          </template>
        </v-list>
      </v-card>

       <v-card flat class="mb-4 border-bottom">
        <v-toolbar flat dense color="white">
          <v-toolbar-title class="title-2 font-weight-regular">
            Hello,
            Subha Sundar Das
          </v-toolbar-title>

          <v-spacer></v-spacer>
          <v-btn icon>
            <v-icon>person</v-icon>
          </v-btn>
        </v-toolbar>

        <v-list two-line>
          <template>
            <v-list-tile avatar ripple>
              <v-list-tile-content>
                <v-list-tile-sub-title class="grey--text">Since 14th April, 2017</v-list-tile-sub-title>
                <v-list-tile-sub-title>
                  Last login :
                  <span
                    class="text--primary"
                  >14th May, 2018 at 22.30:14 from 138.15.54.2</span>
                </v-list-tile-sub-title>
              </v-list-tile-content>

              <v-list-tile-action>
                <v-list-tile-action-text>Profile completed</v-list-tile-action-text>
                <v-progress-circular
                  :size="100"
                  :width="15"
                  :value="profile_value"
                  color="red"
                  class="body-2"
                >{{ profile_value }}</v-progress-circular>
              </v-list-tile-action>
            </v-list-tile>
            <v-btn flat>
              <v-icon left>cloud_upload</v-icon>Update Profile
            </v-btn>
            <v-btn flat>
              <v-icon left>person</v-icon>Change Password
            </v-btn>
          </template>
        </v-list>
      </v-card>

    </v-container>
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

